const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'edexcel_medicine', 'data.js');
let code = fs.readFileSync(dataPath, 'utf8');

const newQuestions = {
    "KT1.1: What did Medieval people believe caused illness?": [
        {
            "question": "According to the Theory of the Four Humours, what caused disease?",
            "options": [
                "Microscopic organisms entering the bloodstream",
                "An imbalance of blood, phlegm, yellow bile, and black bile",
                "Evil spirits possessing the body during sleep",
                "Exposure to cold weather and damp conditions"
            ],
            "answer": 1
        },
        {
            "question": "What was 'Miasma' in medieval medical theory?",
            "options": [
                "Bad air filled with harmful smells that caused disease",
                "A type of herbal remedy brought back from the Crusades",
                "A surgical instrument used for bloodletting",
                "The astrological alignment of planets causing plague"
            ],
            "answer": 0
        },
        {
            "question": "Why did the Church heavily support the ideas of Galen?",
            "options": [
                "Galen was a prominent Pope in the 2nd Century",
                "Galen's theory that the body was perfectly designed fit with Christian beliefs about God the Creator",
                "Galen was the first physician to discover that prayer cured leprosy",
                "Galen had explicitly proven that God sent disease as a punishment"
            ],
            "answer": 1
        },
        {
            "question": "How did Astrology influence medieval diagnosis?",
            "options": [
                "Physicians used star charts to determine when to harvest medicinal herbs and perform surgery",
                "Astrologers were the only people legally allowed to prescribe medicine",
                "It was believed that staring at a lunar eclipse would cause instant blindness and leprosy",
                "Astrology completely replaced the Theory of the Four Humours by the 14th century"
            ],
            "answer": 0
        },
        {
            "question": "What did the Church teach about the cause of illness?",
            "options": [
                "It was caused entirely by witches cursing the crops",
                "It was a punishment from God for sin, or a test of faith",
                "It was caused by eating meat on Fridays",
                "It was completely random and impossible to explain"
            ],
            "answer": 1
        }
    ],
    "KT1.2: How did Medieval people try to prevent and treat disease?": [
        {
            "question": "What was the purpose of bleeding or purging a patient?",
            "options": [
                "To punish them for their sins against the Church",
                "To remove excess humours and restore balance to the body",
                "To surgically remove a tumor",
                "To intentionally induce a coma so the body could heal"
            ],
            "answer": 1
        },
        {
            "question": "Who would an ordinary peasant most likely visit for medical treatment?",
            "options": [
                "A university-trained physician",
                "The King",
                "An apothecary or a local wise woman",
                "A highly trained barber-surgeon"
            ],
            "answer": 2
        },
        {
            "question": "What role did hospitals play in Medieval England?",
            "options": [
                "They were advanced centers for complex surgical procedures",
                "They were run by the Church primarily to offer hospitality, rest, and prayer, not medical treatment",
                "They were the main training grounds for apothecaries",
                "They were strict quarantine zones where no visitors were allowed"
            ],
            "answer": 1
        },
        {
            "question": "What was the Regimen Sanitatis?",
            "options": [
                "A strict religious order that banned all medical treatment",
                "A set of instructions on how to maintain good health through diet, exercise, and hygiene",
                "A surgical manual written by Hippocrates",
                "The official oath taken by all medieval doctors"
            ],
            "answer": 1
        }
    ],
    "KT1.3: How did people respond to the Black Death?": [
        {
            "question": "When did the Black Death first arrive in England?",
            "options": [
                "1066",
                "1348",
                "1665",
                "1415"
            ],
            "answer": 1
        },
        {
            "question": "What did the flagellants do to try and stop the Black Death?",
            "options": [
                "They burned barrels of tar in the streets to clear the miasma",
                "They whipped themselves in public to show God they were sorry for their sins",
                "They slaughtered all the cats and dogs in London",
                "They locked themselves inside their homes and painted a red cross on the door"
            ],
            "answer": 1
        },
        {
            "question": "How did local governments attempt to control the spread of the plague?",
            "options": [
                "By ordering the mass production of antibiotics",
                "By passing quarantine laws and ordering the cleaning of streets",
                "By executing anyone who coughed in public",
                "By closing down all the churches permanently"
            ],
            "answer": 1
        },
        {
            "question": "Why did people carry sweet-smelling herbs or posies during the Black Death?",
            "options": [
                "To ward off evil spirits",
                "To purify the air and protect themselves from miasma",
                "As a symbol that they had survived the disease",
                "To feed to the rats to poison them"
            ],
            "answer": 1
        }
    ],
    "KT2.1: Did the Renaissance change beliefs about the causes of illness?": [
        {
            "question": "How did the Royal Society contribute to medical knowledge?",
            "options": [
                "It strictly enforced Galen's teachings across England",
                "It provided a platform for scientists to share, discuss, and publish new discoveries (like 'Philosophical Transactions')",
                "It was a hospital that specialized in treating the King's friends",
                "It legally banned the use of astrology in medicine"
            ],
            "answer": 1
        },
        {
            "question": "What was Thomas Sydenham's key contribution to medicine?",
            "options": [
                "He discovered the circulation of blood",
                "He proved that germs caused disease",
                "He emphasized observing patient symptoms and classifying diseases (like scarlet fever), rather than relying on the Four Humours",
                "He invented the first microscope"
            ],
            "answer": 2
        },
        {
            "question": "What new invention helped spread medical knowledge rapidly during the Renaissance?",
            "options": [
                "The telegraph",
                "The printing press",
                "The stethoscope",
                "The hypodermic needle"
            ],
            "answer": 1
        },
        {
            "question": "Why did the Theory of the Four Humours begin to decline in the Renaissance?",
            "options": [
                "Because the Church officially declared it heretical",
                "Because new anatomical discoveries proved it was physically impossible",
                "Physicians began to realize that treatments based on it (like bleeding) didn't actually cure people",
                "Because a massive shortage of leeches made it impossible to practice"
            ],
            "answer": 2
        }
    ],
    "KT2.2: Did treatments improve during the Renaissance?": [
        {
            "question": "Who was Andreas Vesalius and what did he do?",
            "options": [
                "A surgeon who proved that bleeding was harmful",
                "An anatomist who dissected human bodies and proved Galen had made over 300 mistakes in his anatomical descriptions",
                "An apothecary who discovered the medicinal properties of cinchona bark",
                "The King's personal physician who invented the first vaccine"
            ],
            "answer": 1
        },
        {
            "question": "What famous book did Vesalius publish in 1543?",
            "options": [
                "On the Motion of the Heart and Blood",
                "The Fabric of the Human Body",
                "Micrographia",
                "The Canon of Medicine"
            ],
            "answer": 1
        },
        {
            "question": "What was 'transference' in Renaissance medicine?",
            "options": [
                "Moving a patient to a different climate to heal",
                "The belief that an illness could be transferred to an object or animal (e.g., rubbing a wart on an onion)",
                "Transferring blood from a healthy person to a sick person",
                "Passing a medical license from father to son"
            ],
            "answer": 1
        },
        {
            "question": "How did the dissolution of the monasteries by Henry VIII affect healthcare?",
            "options": [
                "It caused a massive boom in the building of modern hospitals",
                "Most medieval hospitals were closed down, leading to a shortage of care for the sick and elderly",
                "It had no effect, as monasteries did not practice medicine",
                "It forced all monks to become trained physicians"
            ],
            "answer": 1
        },
        {
            "question": "What new ingredients were added to apothecaries' remedies during the Renaissance?",
            "options": [
                "Penicillin and aspirin",
                "New herbs and minerals brought back from the New World (e.g., sarsaparilla, cinchona bark)",
                "Radioactive isotopes for treating cancer",
                "Synthetic chemicals created in laboratories"
            ],
            "answer": 1
        }
    ],
    "KT2.3: How significant were William Harvey and the Great Plague?": [
        {
            "question": "What did William Harvey discover?",
            "options": [
                "That germs cause disease",
                "That the heart acts as a pump, circulating blood in a one-way system around the body",
                "That there are two different types of blood flowing in opposite directions",
                "That blood is created in the liver and consumed by the body"
            ],
            "answer": 1
        },
        {
            "question": "Why was Harvey's discovery highly controversial?",
            "options": [
                "It directly contradicted Galen's teachings, which physicians had trusted for 1,500 years",
                "He refused to publish his findings in English",
                "He claimed that God did not exist",
                "He tested his theories exclusively on human patients without permission"
            ],
            "answer": 0
        },
        {
            "question": "When did the Great Plague strike London?",
            "options": [
                "1348",
                "1665",
                "1854",
                "1918"
            ],
            "answer": 1
        },
        {
            "question": "What was a new method used by the government to control the Great Plague?",
            "options": [
                "They forcibly vaccinated the entire population of London",
                "They locked infected victims in their houses for 40 days and painted a red cross on the door",
                "They dropped chemicals from hot air balloons to kill the miasma",
                "They ordered everyone to evacuate to Scotland immediately"
            ],
            "answer": 1
        }
    ],
    "KT3.1: What breakthrough discoveries changed our understanding of disease causes?": [
        {
            "question": "Who published the Germ Theory in 1861?",
            "options": [
                "Robert Koch",
                "Louis Pasteur",
                "Edward Jenner",
                "John Snow"
            ],
            "answer": 1
        },
        {
            "question": "What did Germ Theory prove?",
            "options": [
                "That miasma was the true cause of disease, but germs made the smell worse",
                "That microbes in the air cause decay and disease, disproving Spontaneous Generation",
                "That germs were spontaneously generated by rotting matter",
                "That all diseases were genetically inherited"
            ],
            "answer": 1
        },
        {
            "question": "How did Robert Koch build upon Pasteur's Germ Theory?",
            "options": [
                "He proved that Germ Theory only applied to liquids like milk, not humans",
                "He developed a method for identifying the specific microbes that caused individual diseases (e.g., Anthrax, Tuberculosis)",
                "He invented the first antibiotic to kill the germs Pasteur found",
                "He was the first person to see a germ using a microscope"
            ],
            "answer": 1
        }
    ],
    "KT3.2: How did the Industrial Revolution transform prevention and treatment?": [
        {
            "question": "Who was Florence Nightingale?",
            "options": [
                "The first female surgeon in Britain",
                "A nurse who dramatically reduced mortality rates in the Crimean War by enforcing strict hygiene and sanitation",
                "The inventor of the hypodermic needle",
                "A politician who passed the Public Health Act"
            ],
            "answer": 1
        },
        {
            "question": "What was James Simpson's major discovery in 1847?",
            "options": [
                "Carbolic acid as an antiseptic",
                "Chloroform as an effective anesthetic",
                "Nitrous oxide (laughing gas)",
                "Penicillin"
            ],
            "answer": 1
        },
        {
            "question": "How did Joseph Lister revolutionize surgery in 1865?",
            "options": [
                "He discovered blood groups, allowing for safe transfusions",
                "He used carbolic acid spray to kill germs in the operating theatre, creating antiseptic surgery",
                "He invented surgical gloves",
                "He was the first surgeon to successfully remove a brain tumor"
            ],
            "answer": 1
        },
        {
            "question": "Why was there initially strong opposition to anesthetics?",
            "options": [
                "They were extremely expensive and only the rich could afford them",
                "Some doctors believed pain was necessary for healing, and religious groups argued pain was God's will (especially in childbirth)",
                "They caused immediate fatal heart attacks in 90% of patients",
                "The government banned them as illegal narcotics"
            ],
            "answer": 1
        }
    ],
    "KT3.3: How significant were Edward Jenner and John Snow?": [
        {
            "question": "What did Edward Jenner discover in 1796?",
            "options": [
                "The Germ Theory of disease",
                "A vaccine for smallpox using the cowpox virus",
                "The cholera microbe",
                "The first anesthetic"
            ],
            "answer": 1
        },
        {
            "question": "Why was Jenner's discovery initially criticized?",
            "options": [
                "He couldn't explain scientifically HOW it worked because Germ Theory hadn't been discovered yet",
                "It was proven to cause severe brain damage",
                "The vaccine cost far too much to mass-produce",
                "The government claimed he stole the idea from Louis Pasteur"
            ],
            "answer": 0
        },
        {
            "question": "What did John Snow discover during the 1854 Broad Street cholera epidemic?",
            "options": [
                "Cholera was caused by a miasma rising from the River Thames",
                "Cholera was a waterborne disease transmitted by a contaminated water pump",
                "Cholera was spread by flea-infested rats",
                "Cholera could be cured by drinking carbolic acid"
            ],
            "answer": 1
        },
        {
            "question": "How did John Snow prove his theory about cholera?",
            "options": [
                "He isolated the cholera microbe under a microscope",
                "He mapped out the deaths in Soho and removed the handle from the Broad Street pump, which stopped the outbreak",
                "He infected himself with cholera and cured it with a vaccine",
                "He successfully sued the government for ignoring the Public Health Act"
            ],
            "answer": 1
        }
    ],
    "KT4.1: How have modern discoveries changed our understanding of illness?": [
        {
            "question": "Who discovered the structure of DNA in 1953?",
            "options": [
                "Watson and Crick (with help from Franklin and Wilkins)",
                "Landsteiner and Fleming",
                "Pasteur and Koch",
                "Florey and Chain"
            ],
            "answer": 0
        },
        {
            "question": "How did the discovery of DNA change medicine?",
            "options": [
                "It allowed doctors to finally cure the common cold",
                "It helped scientists understand genetic diseases and eventually led to treatments like gene therapy",
                "It proved that lifestyle factors (like smoking) do not cause disease",
                "It made all traditional antibiotics obsolete"
            ],
            "answer": 1
        },
        {
            "question": "What lifestyle factor was definitively linked to lung cancer in the 1950s?",
            "options": [
                "Eating too much sugar",
                "Smoking tobacco",
                "Drinking polluted water",
                "Lack of exercise"
            ],
            "answer": 1
        },
        {
            "question": "What technology allowed Rosalind Franklin to photograph DNA?",
            "options": [
                "Electron microscopes",
                "X-ray crystallography",
                "MRI scanners",
                "Ultrasound"
            ],
            "answer": 1
        },
        {
            "question": "What was the Human Genome Project?",
            "options": [
                "A secret government project to create super-soldiers",
                "An international effort to map out all the genes in human DNA, completed in 2003",
                "A charity designed to provide free DNA testing to the public",
                "The original code-name for the cloning of Dolly the Sheep"
            ],
            "answer": 1
        }
    ],
    "KT4.2: How have prevention and treatment advanced in the modern era?": [
        {
            "question": "What major government initiative was launched in 1948 to provide free healthcare for all?",
            "options": [
                "The Public Health Act",
                "The National Health Service (NHS)",
                "The Beveridge Report",
                "The Medical Research Council"
            ],
            "answer": 1
        },
        {
            "question": "Who was the Minister of Health responsible for creating the NHS?",
            "options": [
                "Winston Churchill",
                "Aneurin Bevan",
                "Clement Attlee",
                "William Beveridge"
            ],
            "answer": 1
        },
        {
            "question": "What is a 'magic bullet' in the context of 20th-century medicine?",
            "options": [
                "A chemical cure that attacks specific disease-causing microbes in the body without harming the rest of the body",
                "A highly effective painkiller developed during WW1",
                "A surgical tool used to remove shrapnel",
                "A slang term for the first vaccines"
            ],
            "answer": 0
        },
        {
            "question": "Who discovered the first 'magic bullet', Salvarsan 606, in 1909 to treat Syphilis?",
            "options": [
                "Alexander Fleming",
                "Paul Ehrlich",
                "Gerhard Domagk",
                "Karl Landsteiner"
            ],
            "answer": 1
        }
    ],
    "KT4.3: How was Penicillin discovered and mass-produced?": [
        {
            "question": "Who accidentally discovered Penicillin in 1928?",
            "options": [
                "Howard Florey",
                "Ernst Chain",
                "Alexander Fleming",
                "Paul Ehrlich"
            ],
            "answer": 2
        },
        {
            "question": "What prevented Fleming from developing Penicillin into a usable drug?",
            "options": [
                "He thought it was poisonous to humans",
                "He lacked the funding and chemical expertise to purify it",
                "The British government banned his research",
                "He died shortly after discovering it"
            ],
            "answer": 1
        },
        {
            "question": "Who successfully purified and tested Penicillin on humans in the early 1940s?",
            "options": [
                "Watson and Crick",
                "Florey and Chain",
                "Pasteur and Koch",
                "Simpson and Lister"
            ],
            "answer": 1
        },
        {
            "question": "What major global event provided the funding and urgency to mass-produce Penicillin?",
            "options": [
                "World War I",
                "The Great Depression",
                "World War II",
                "The Cold War"
            ],
            "answer": 2
        }
    ],
    "KT4.4: How has the government tackled the modern epidemic of Lung Cancer?": [
        {
            "question": "Why is lung cancer so difficult to treat?",
            "options": [
                "It is completely immune to chemotherapy",
                "It is usually diagnosed at a very late stage because early symptoms are often ignored",
                "It is highly contagious",
                "There are absolutely no surgical options available"
            ],
            "answer": 1
        },
        {
            "question": "What action did the UK government take in 2007 regarding smoking?",
            "options": [
                "They made all tobacco products illegal",
                "They banned smoking in all enclosed public workspaces",
                "They raised the legal smoking age to 21",
                "They forced tobacco companies to pay for the NHS"
            ],
            "answer": 1
        },
        {
            "question": "How are modern doctors able to diagnose lung cancer more effectively than in the past?",
            "options": [
                "By using the four humours chart",
                "By using advanced imaging techniques like CT scans and PET-CT scans",
                "By relying solely on x-rays, which catch every single tumor instantly",
                "By checking the patient's blood pressure daily"
            ],
            "answer": 1
        },
        {
            "question": "What is one modern treatment option for lung cancer besides surgery?",
            "options": [
                "Bloodletting",
                "Radiotherapy",
                "Amputation",
                "Herbal purges"
            ],
            "answer": 1
        }
    ],
    "KT5.1: What was the historical and medical context of the Western Front?": [
        {
            "question": "Which of these was a major battle on the Western Front resulting in catastrophic casualties?",
            "options": [
                "The Battle of Waterloo",
                "The Battle of the Somme",
                "The Battle of Trafalgar",
                "The Battle of Hastings"
            ],
            "answer": 1
        },
        {
            "question": "What was the 'salient' at Ypres?",
            "options": [
                "A highly advanced underground hospital",
                "A bulge in the frontline surrounded by the enemy on three sides, making it incredibly dangerous",
                "A new type of artillery shell",
                "The headquarters of the RAMC"
            ],
            "answer": 1
        },
        {
            "question": "What made the terrain of the Western Front so difficult for medical evacuation?",
            "options": [
                "It was entirely mountainous and freezing cold",
                "It was completely covered in thick jungle",
                "It was often a sea of deep mud, craters, and destroyed roads due to heavy artillery bombardment",
                "The entire area was highly radioactive"
            ],
            "answer": 2
        },
        {
            "question": "What system of transport was heavily relied upon behind the front lines to move wounded soldiers efficiently?",
            "options": [
                "Helicopters",
                "Hospital trains and canal barges",
                "Commercial airplanes",
                "Submarines"
            ],
            "answer": 1
        }
    ],
    "KT5.2: How did the trench environment create new medical challenges?": [
        {
            "question": "What caused Trench Foot?",
            "options": [
                "A bacterial infection transmitted by rats",
                "Standing for hours in cold, waterlogged trenches without changing boots or socks",
                "Shrapnel wounds to the toes",
                "Wearing boots that were tightly laced to cut off circulation purposely"
            ],
            "answer": 1
        },
        {
            "question": "What was Trench Fever and how was it spread?",
            "options": [
                "A flu-like illness spread by lice living in the seams of uniforms",
                "A severe stomach bug caused by drinking contaminated water",
                "A psychological breakdown caused by artillery fire",
                "A lung infection caused by poison gas"
            ],
            "answer": 0
        },
        {
            "question": "What was 'Shell Shock'?",
            "options": [
                "A physical injury caused by the concussive wave of an explosion",
                "A psychological trauma causing symptoms like tremors, nightmares, and paralysis (now known as PTSD)",
                "A cowardly refusal to fight, which was always punished by execution",
                "An infection caused by dirty shrapnel"
            ],
            "answer": 1
        },
        {
            "question": "How did the army attempt to prevent Trench Foot?",
            "options": [
                "By amputating the toes of soldiers before they went to the front",
                "By issuing orders to rub whale oil on feet and enforcing daily sock changes",
                "By providing everyone with fully waterproof rubber diving suits",
                "By completely draining all water from the Western Front"
            ],
            "answer": 1
        }
    ],
    "KT5.3: What new illnesses and wounds did soldiers face?": [
        {
            "question": "Why were wounds from shrapnel and high-explosive shells so prone to infection?",
            "options": [
                "Because the shells were deliberately coated in biological weapons",
                "Because the explosions drove dirty uniform fabric and heavily manured farmland soil deep into the body",
                "Because the metal used by the Germans was highly toxic",
                "Because field hospitals refused to clean wounds to save time"
            ],
            "answer": 1
        },
        {
            "question": "What was the most feared consequence of a deeply infected mud wound?",
            "options": [
                "Trench fever",
                "Gas Gangrene",
                "Polio",
                "Smallpox"
            ],
            "answer": 1
        },
        {
            "question": "Which weapon caused terrifying, burning blisters and temporary blindness?",
            "options": [
                "Machine guns",
                "Mustard Gas",
                "Shrapnel shells",
                "Bayonets"
            ],
            "answer": 1
        },
        {
            "question": "What piece of equipment was introduced to reduce the number of fatal head wounds?",
            "options": [
                "The Brodie Helmet",
                "The gas mask",
                "The Kevlar vest",
                "The chainmail hood"
            ],
            "answer": 0
        }
    ],
    "KT5.4: How did the RAMC and FANY operate the chain of evacuation?": [
        {
            "question": "What was the first step in the Chain of Evacuation?",
            "options": [
                "The Casualty Clearing Station (CCS)",
                "The Base Hospital",
                "The Regimental Aid Post (RAP)",
                "The Advanced Dressing Station (ADS)"
            ],
            "answer": 2
        },
        {
            "question": "What was the primary role of the FANY (First Aid Nursing Yeomanry)?",
            "options": [
                "To perform complex brain surgery at Base Hospitals",
                "To drive motorized ambulances, often in dangerous conditions, to transport the wounded",
                "To fight on the front lines alongside infantry",
                "To manufacture medical supplies back in Britain"
            ],
            "answer": 1
        },
        {
            "question": "At which stage of the evacuation chain were emergency amputations and major triage operations usually carried out to stop gangrene?",
            "options": [
                "The Regimental Aid Post (RAP)",
                "The Casualty Clearing Station (CCS)",
                "The Base Hospital",
                "The Stretcher Bearers in No Man's Land"
            ],
            "answer": 1
        },
        {
            "question": "Why did Base Hospitals eventually become less important for emergency surgery?",
            "options": [
                "Because the war moved too quickly for them to keep up",
                "Because gangrene developed so quickly that men had to be operated on earlier at the CCS",
                "Because they were constantly bombed by airplanes",
                "Because they ran out of anesthetic"
            ],
            "answer": 1
        }
    ],
    "KT5.5: What incredible medical advances were forged on the Western Front?": [
        {
            "question": "What technique was developed to treat severe flesh wounds and prevent gas gangrene?",
            "options": [
                "The Carrel-Dakin method (using sterilized salt solution to flush the wound)",
                "The immediate use of Penicillin injections",
                "Amputating the limb immediately regardless of the injury size",
                "Sealing the wound entirely with hot wax"
            ],
            "answer": 0
        },
        {
            "question": "What major problem with blood transfusions was solved during WW1?",
            "options": [
                "Blood could not be stored because it clotted; sodium citrate was added so it could be kept in blood banks (e.g. for the Battle of Cambrai)",
                "Doctors didn't know about blood groups, which caused fatal reactions",
                "There was no rubber tubing available to perform the transfusions",
                "Patients refused to accept blood for religious reasons"
            ],
            "answer": 0
        },
        {
            "question": "How was x-ray technology adapted for use on the Western Front?",
            "options": [
                "It wasn't; x-rays were considered too dangerous and fragile",
                "Marie Curie developed mobile x-ray units fitted into ambulances to locate shrapnel closer to the front",
                "Massive x-ray machines were built permanently into the trench walls",
                "X-rays were used offensively to blind enemy soldiers"
            ],
            "answer": 1
        },
        {
            "question": "Who was Harold Gillies?",
            "options": [
                "The inventor of the Thomas Splint",
                "A surgeon who pioneered plastic surgery to rebuild the severe facial injuries caused by shrapnel",
                "The doctor who discovered blood groups",
                "The general in charge of the RAMC"
            ],
            "answer": 1
        }
    ]
};

try {
    let unitRegex = /(export const unitData = |export default )?(\{[\s\S]*\});?/;
    let jsonStr = code.replace(/import .*?;\n/g, '');
    jsonStr = jsonStr.replace(/export const unitData = |export default /g, '').trim();
    if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
    
    let mock_exams = {}; // In case it's referenced
    let unitData = eval('(' + jsonStr + ')');

    unitData.lessons.forEach(l => {
        if (!l.quiz) l.quiz = [];
        const toAdd = newQuestions[l.title];
        if (toAdd) {
            toAdd.forEach(q => l.quiz.push(q));
            
            // Deduplicate based on question text
            let uniqueQuiz = [];
            let seen = new Set();
            l.quiz.forEach(q => {
                let qText = q.question || q.q;
                if (!seen.has(qText)) {
                    seen.add(qText);
                    uniqueQuiz.push(q);
                }
            });
            l.quiz = uniqueQuiz;
            console.log(`Updated ${l.title}: now has ${l.quiz.length} questions`);
        }
    });

    let newCode = `export const unitData = ${JSON.stringify(unitData, null, 4)};`;
    fs.writeFileSync(dataPath, newCode);
    console.log("Successfully injected new Medicine questions.");
} catch(e) {
    console.error("Error updating file:", e);
}
