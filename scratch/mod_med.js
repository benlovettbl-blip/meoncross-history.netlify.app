const fs = require('fs');

async function updateMed() {
    const medPath = 'c:/Projects/meoncross-history.netlify.app/edexcel_medicine/data.js';
    const medMod = await import('file://' + medPath);
    const data = medMod.unitData;

    const interactiveData = {
        'lesson_1_1': { // KT1.1
            flashcards: [
                { term: 'Miasma', definition: 'The belief that bad air filled with foul-smelling fumes from rotting matter caused disease.' },
                { term: 'Four Humours', definition: 'The theory that the body is made of four liquids: blood, phlegm, yellow bile, and black bile.' },
                { term: 'Astrology', definition: 'The use of planetary alignments and star charts to explain the cause of illness, such as the 1345 alignment.' }
            ],
            draw: {
                title: "Sketch the Four Humours",
                instructions: "Draw the Four Humours wheel, making sure to link each humour to its corresponding season, element, and temperature (e.g. Blood = Spring, Air, Hot/Wet)."
            }
        },
        'lesson_1_2': { // KT1.2
            flashcards: [
                { term: 'Theory of Opposites', definition: 'Galen\'s treatment method of balancing humours by giving the patient the opposite of their symptoms (e.g. hot pepper for a cold).' },
                { term: 'Barber Surgeon', definition: 'Untrained medical practitioners who performed basic surgeries like bloodletting and tooth extraction.' },
                { term: 'Apothecary', definition: 'Medieval pharmacists who mixed herbal remedies and potions based on materia medica.' }
            ],
            draw: {
                title: "The Apothecary's Shop",
                instructions: "Sketch an apothecary mixing herbal remedies. Label at least three common ingredients they might use (like honey, mint, or theriac)."
            }
        },
        'lesson_1_3': { // KT1.3
            flashcards: [
                { term: '1348', definition: 'The year the Black Death first arrived in England, eventually killing around one-third of the population.' },
                { term: 'Flagellants', definition: 'Religious extremists who publicly whipped themselves to show God they were sorry for their sins, hoping to avoid the plague.' },
                { term: 'Quarantine', definition: 'A local government prevention method where infected houses were boarded up for 40 days to stop the spread.' }
            ],
            draw: {
                title: "Plague Symptoms",
                instructions: "Draw a patient suffering from the bubonic plague, clearly labeling the key symptom: a large, dark swelling (bubo) in the armpit or groin."
            }
        },
        'lesson_2_1': { // KT2.1
            flashcards: [
                { term: 'Renaissance', definition: 'Meaning \'rebirth\', a period from c1500 characterised by a revival of classical learning and new scientific inquiry.' },
                { term: 'Andreas Vesalius', definition: 'A pioneering anatomist who published \'On the Fabric of the Human Body\' in 1543, proving Galen had made over 300 mistakes.' },
                { term: 'Printing Press', definition: 'An invention that allowed medical knowledge and anatomical drawings to be spread quickly and accurately across Europe.' }
            ],
            draw: {
                title: "The Printing Press",
                instructions: "Sketch a simple printing press and explain in a speech bubble why this invention was so dangerous to the Catholic Church's control of knowledge."
            }
        },
        'lesson_2_2': { // KT2.2
            flashcards: [
                { term: 'Thomas Sydenham', definition: 'The \'English Hippocrates\' who believed in closely observing symptoms rather than relying on ancient books, famously describing scarlet fever.' },
                { term: 'Royal Society', definition: 'A prestigious scientific organisation founded in 1660 that promoted experiments and the sharing of scientific knowledge.' },
                { term: 'Transference', definition: 'A bizarre Renaissance treatment belief that an illness could be transferred to an animal or object (e.g. rubbing a live toad on a bubo).' }
            ],
            draw: {
                title: "Sydenham at the Bedside",
                instructions: "Draw Thomas Sydenham observing a patient. Instead of a book in his hand, draw him taking notes on the patient's actual symptoms."
            }
        },
        'lesson_2_3': { // KT2.3
            flashcards: [
                { term: 'William Harvey', definition: 'An English physician who proved that blood circulates around the body, pumped by the heart, rather than being constantly created by the liver.' },
                { term: '1665', definition: 'The year of the Great Plague, a devastating epidemic in London that killed roughly 100,000 people.' },
                { term: 'Plague Doctor', definition: 'A physician who wore a distinctive leather bird-like mask stuffed with sweet-smelling herbs to ward off miasma.' }
            ],
            draw: {
                title: "The Plague Doctor",
                instructions: "Draw a 1665 Plague Doctor. Label his protective clothing, including the thick leather cloak, wooden stick, and the beak filled with herbs."
            }
        },
        'lesson_3_1': { // KT3.1
            flashcards: [
                { term: 'Spontaneous Generation', definition: 'The incorrect belief that decaying matter magically created microbes and maggots out of thin air.' },
                { term: 'Germ Theory (1861)', definition: 'Louis Pasteur\'s revolutionary discovery that microbes in the air cause decay and disease, disproving spontaneous generation.' },
                { term: 'Robert Koch', definition: 'A German scientist who proved that specific bacteria cause specific diseases, identifying the microbes for anthrax, TB, and cholera.' }
            ],
            draw: {
                title: "Pasteur's Swan-Neck Flask",
                instructions: "Sketch Louis Pasteur's famous swan-neck flask experiment. Show how the curved neck prevented airborne bacteria from reaching the liquid inside."
            }
        },
        'lesson_3_2': { // KT3.2
            flashcards: [
                { term: 'James Simpson', definition: 'A Scottish doctor who discovered the anesthetic properties of chloroform in 1847.' },
                { term: 'Joseph Lister', definition: 'An English surgeon who pioneered antiseptic surgery by using carbolic acid to spray wounds and surgical instruments in 1865.' },
                { term: 'Florence Nightingale', definition: 'A pioneering nurse who dramatically improved hospital hygiene and ventilation during the Crimean War, drastically reducing death rates.' }
            ],
            draw: {
                title: "The Carbolic Spray",
                instructions: "Draw Joseph Lister operating on a patient while a cumbersome machine sprays carbolic acid over the wound to kill bacteria."
            }
        },
        'lesson_3_3': { // KT3.3
            flashcards: [
                { term: 'Edward Jenner', definition: 'A country doctor who developed the first smallpox vaccine in 1796 by using cowpox pus.' },
                { term: 'John Snow', definition: 'A surgeon who mapped the 1854 cholera outbreak in Soho, proving it was spread by contaminated water, not miasma.' },
                { term: 'Broad Street Pump', definition: 'The specific water pump in Soho that Snow identified as the source of the cholera epidemic, famously removing its handle.' }
            ],
            draw: {
                title: "The Broad Street Pump",
                instructions: "Draw John Snow removing the handle from the Broad Street water pump, while angry locals who still believe in miasma watch on."
            }
        },
        'lesson_4_1': { // KT4.1
            flashcards: [
                { term: 'DNA', definition: 'The molecule carrying genetic instructions, the structure of which was discovered by Watson, Crick, Franklin, and Wilkins in 1953.' },
                { term: 'Rosalind Franklin', definition: 'The scientist who took \'Photograph 51\', an X-ray diffraction image crucial for identifying the double-helix structure of DNA.' },
                { term: 'Human Genome Project', definition: 'A massive international scientific research project (1990-2003) that successfully mapped all human genes.' }
            ],
            draw: {
                title: "The Double Helix",
                instructions: "Sketch the twisted ladder structure of DNA (the double helix). Label it with the names of the four key scientists involved in its discovery."
            }
        },
        'lesson_4_2': { // KT4.2
            flashcards: [
                { term: 'Magic Bullet', definition: 'A chemical cure that targets and kills specific disease-causing microbes in the body without harming the rest of the patient.' },
                { term: 'Salvarsan 606', definition: 'The first \'magic bullet\', discovered by Paul Ehrlich in 1909 to treat the sexually transmitted disease syphilis.' },
                { term: 'Prontosil', definition: 'The second magic bullet (a bacteriostatic antibiotic) discovered by Gerhard Domagk in 1932 to treat blood poisoning.' }
            ],
            draw: {
                title: "The Magic Bullet",
                instructions: "Draw a literal 'magic bullet' flying through the bloodstream, hitting a specific nasty-looking bacteria while ignoring the healthy red blood cells."
            }
        },
        'lesson_4_3': { // KT4.3
            flashcards: [
                { term: 'Alexander Fleming', definition: 'The scientist who accidentally discovered penicillin in 1928 when mold killed staphylococcus bacteria on an unwashed petri dish.' },
                { term: 'Florey and Chain', definition: 'The two scientists at Oxford University who successfully purified and tested penicillin in 1940.' },
                { term: 'US Government Funding', definition: 'Crucial financial support provided by the American government during WWII that allowed penicillin to be mass-produced in deep fermentation tanks.' }
            ],
            draw: {
                title: "Fleming's Petri Dish",
                instructions: "Sketch Alexander Fleming's messy laboratory bench. Show a petri dish with a ring of mold (penicillin) actively killing the surrounding bacteria."
            }
        },
        'lesson_4_4': { // KT4.4
            flashcards: [
                { term: 'Lung Cancer', definition: 'A deadly disease primarily caused by smoking, diagnosed using modern technology like CT scans and bronchoscopies.' },
                { term: 'Radiotherapy', definition: 'A modern medical treatment that uses concentrated beams of radiation to target and shrink cancerous tumours.' },
                { term: 'Government Intervention', definition: 'Actions taken by the state to prevent lung cancer, such as the 2007 smoking ban in public workplaces and plain packaging laws.' }
            ],
            draw: {
                title: "Government Anti-Smoking Campaign",
                instructions: "Design a modern cigarette packet that complies with government regulations (plain packaging, graphic health warnings) to deter people from smoking."
            }
        }
    };

    let modified = 0;
    data.lessons.forEach(lesson => {
        // Find by id (e.g. lesson_1_1) or by matching the title string
        const content = interactiveData[lesson.id];
        if (content) {
            lesson.flashcards = content.flashcards;
            lesson.draw_tasks = content.draw;
            modified++;
        }
    });

    const newDataStr = `export const unitData = ${JSON.stringify(data, null, 4)};\n`;
    fs.writeFileSync(medPath, newDataStr, 'utf8');
    console.log(`Successfully updated Medicine data.js. Modified ${modified} lessons.`);
}

updateMed().catch(console.error);
