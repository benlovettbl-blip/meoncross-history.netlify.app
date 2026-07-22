const fs = require('fs');
const path = require('path');

const tsvData = `Ypres Salient	Stood on the most direct routes to English Channel ports such as Calais and Dunkirk, so was vital to keep forces well-supplied	British forces surrounded on three sides by German forces on higher ground such as Hill 60, with British holding onto town of Ypres
1st Battle of Ypres - 1914	Part of the "Race to the Sea" during 1914, held to prevent German forces encircling Allies and entering northern France	British had 58,000 casualties but successfully held onto Ypres, thus forming the Ypres salient
Mines at Hill 60 - 1915	Welsh and Australian miners dug tunnels under No Man's Land, with Germans counter-tunnelling to attempt to prevent them doing so	Five ammonite mines were detonated, blowing the top off of the hill and allowing it to be captured by Allied forces but eventually were forced back and retreated
2nd Battle of Ypres - 1915	First use of chlorine gas by the German Army on the Western Front, Allied troops were completely unprepared with no gas masks	British casualties during the battle totalled 59,000 men, but despite this the Germans failed to capture Ypres
Battle of the Somme - 1916	On the first day alone which was July 1st, the British suffered 60,000 casualties whilst attempting to relieve German pressure on the French at Verdun	First use of tanks in battle to minimal effect, as most of the 6 deployed tanks broke down or became stuck in mud
Battle of Arras - 1917	Chalky soil made tunnelling easy, so existing Roman tunnels and quarries were expanded to create a network underground	An underground hospital was created with space for 700 beds, operating theatres, and its own water and electricity supplies, known as Thompson's Cave
3rd Battle of Ypres/Battle of Passchendaele - 1917	Heavy rain and drainage system being damaged by shell fire led to the ground becoming waterlogged, causing men to drown in mud	British pushed the front back by around 7 miles at the cost of 250,000 casualties, capturing the town of Passchendaele
Battle of Cambrai - 1917	First large-scale use of tanks after initial use at the Somme, with nearly 500 being used during the battle	Changed artillery barrage before British attack giving Germans less warning, but still caused 40,000 casualties
Trench system	Trenches were zig-zagged rather than being straight to prevent long lines of sight, preventing enemies from easily attacking	Were used to cover from machine gun fire and artillery, with dugouts for soldiers to rest and communication trenches to reach other lines of trenches behind
Structure of Trenches	Multiple rows of trenches including the front-line, command, reserve, and support trenches linked by communication trenches	A trench would be roughly 2-2.5 metres deep, with a parapet to fire over, a fire step to stand on and a parados to prevent enemy fire hitting those in trenches further behind
Frontline Trench	Trench nearest to firing line, featured a firing step and dugouts used as shelters during shelling	About 2-2.5 metres deep, dug in a zig-zag pattern to make them more difficult to invade 
Support Trenches	Reserve trenches were located hundreds of metres behind the frontline trench, for reserve troops to launch counter-attacks in case of capture elsewhere	The support trench was located under 100m behind the frontline trench, providing a retreat in case of the frontline trench being captured
Caves and Tunnels at Arras	Had full facilities with running water and electricity, but had to be abandoned in 1917 after this water supply was damaged	A hospital was built inside the tunnels, with 700 beds and operating theatres known as Thompson's Cave
Trench Foot	Caused by standing in cold mud and water, could lead to gangrene and decomposition of tissue.	As it was difficult to treat, prevention was important. Soldiers would have weekly inspections by a medical officer, frequently changed socks, and rubbed whale oil on their feet.
Gas Gangrene	Animal fertilisers used in the fields of France meant there were many bacteria in the soils on the Western Front, some of which would cause gas gangrene - a type of infection which caused gas to be released from wounds	The Carrel-Dakin method involved using a sterilised salt solution to clean the wound that was inserted through a tube. However, it only lasted 6 hours and had to be made as needed, which was difficult during high demand 
Trench Fever	Flu-like symptoms with high temperature, headache, and aching muscles affecting an estimated 500,000 British men during the war	Identified as coming from lice, so delousing methods were established, sometimes done by hand, through steam sterilisation or by washing underclothes in paraffin
Shellshock	Now known as PTSD, causing nightmares, mental breakdown, uncontrollable shaking and loss of speech, affecting at least 80,000 British men but likely many more	The condition was not understood well at the time so many sufferers were accused of cowardice, and therefore punished and sometimes shot
Amputation 	Was the extreme backup method if debridement or the Carrel-Dakin methods had failed to combat infection, preventing death	By 1918, 240,000 men had lost limbs due to amputation, leading to progress in the creation of prosthetic limbs
Types of wound from battle	High-explosive shells and shrapnel caused around 60% of all wounds, killing many soldiers instantly, particularly before the introduction of the steel "Brodie Helmet" in 1915	Whilst causing great panic and fear, gas attacks were only responsible for 6,000 British deaths due to gas masks being issued in 1915
The Problem of Shrapnel	Shrapnel often caused head wounds as the head tended to be most exposed, causing fractures, cuts and brain damage	Shrapnel wounds were messy, taking fabric scraps from uniform into the wound which meant particular risk of infection
Head Injuries	Steel "Brodie Helmets" were introduced in 1915, reducing deaths from head wounds by 80% but meant more men survived, increasing pressure on medical services	60,000 British soldiers received head injuries resulting in disfigurement, meaning advances were made in plastic surgery and facial reconstruction by Harold Gillies, a New Zealander surgeon
Effects of Gas Attacks	Chlorine gas was first used in 1915 by the Germans at the 2nd Battle of Ypres, caused death by suffocation. 	Mustard gas was later introduced by the Germans in 1917, which caused blisters on the skin and lungs and could cause damage through clothing
Transport of the Injured	Nearest to the front, men would be moved by stretcher bearers and the horse-drawn or motor ambulance wagons	Away from the front, men could be moved on hospital trains across land, barges down rivers, and boats to return back to England via the Channel
RAMC	The Royal Army Medical Corps was responsible for medical care, including doctors, ambulance drivers, and stretcher bearers	At the start of the war it had 9,000 members, but this rose to 113,000 by 1918.
FANY	FANY nurses were not permitted to work with the British Army until 1916, so worked with the Belgians and French instead	Worked as ambulance drivers, bringing wounded men away from dressing stations near the front back to larger CCSs and Base Hospitals
Stretcher Bearers	Typically worked at night or during breaks in fighting to retrieve injured men from No Man's Land who could not return to safety by themselves	Typically worked in teams of four stretcher bearers per wounded man, but this rose to 6 or 8 in muddy conditions such as at Passchendaele in 1917
Horse/Motor Ambulance Wagons	Ambulance wagons were often driven by FANY as it was deemed women could not work close to the front due to the violence	Horse-drawn ambulance wagons remained in use despite motor replacements, as they were more effective in muddy terrain such as Ypres
Regimental Aid Post (RAP)	Closest medical station to the front line, either in firing trench or within 200m of front. Often located in dugouts, ruined buildings or simply behind walls	Separated wounded men - those with very minor injuries would be bandaged and sent back to front but more severely injured would be taken to ADS/MDS
Field Ambulances	Large, mobile, medical units that were part of the RAMC. They operated the Dressing Stations (ADS and MDS)	Operating using the system of triage, where men would be split into groups based on the severity of their injuries: either sent back to the front, returned to base hospitals, or made comfortable and allowed to die
Dressing Stations (ADS/MDS)	Supposed to be an ADS 400m from the front then an MDS around 1.5km back, but this was rarely the case. Located in dugouts, buildings, or tents	Operating using the system of triage, where men would be split into groups based on the severity of their injuries: either sent back to the front, returned to base hospitals, or made comfortable and allowed to die
Casualty Clearing Stations (CCS)	Located between 10-20km from the frontline, usually inside a large system of tents or huts but occasionally permanent structures like schools or factories	Well-equipped facilities capable of performing more complex surgery including amputations and X-rays, capable of dealing with up to 1,000 men at a time but often more
Base Hospitals	Usually located in civilian hospitals or large converted buildings near railways to allow for easy transportation of casualties, but could also arrive via barge or motor ambulance wagon	Some Base Hospitals were specialised to deal with specific types of injury, such as gas attacks. This allowed for more effective treatment and specialised staff
Chain of Evacuation	It was made up of 4 sections, which started off with evacuation by stretcher bearers and ended in the most severe cases with treatment at field hospitals 	The main stages were Regimental aid posts, dressing stations (ADS and MDS), clearing casualties station, and base hospitals
The Underground Hospital at Arras	Had capacity for 700 beds, operating theatres, a horse-drawn railway to move supplies, and its own water supply which was destroyed in 1917 leading to its abandonment	Built under the town of Arras near the frontline, with original tunnels dug by Romans then extended by British in WWI as chalky soil made tunnelling easy
Aseptic Surgery	Surgical equipment was sterilised in steam sterilisers before use, as it was found this was even more effective than carbolic acid	Surgical gowns, face masks, and sterilised rubber gloves became used, replacing the ordinary clothes previously used by surgeons
X-Rays	Discovered in 1895 by William Röntgen, and became used by doctors to examine wounds, allowing them to find fractures and shrapnel to then extract or treat	The British had over 500 X-ray machines with 14 of these being mobile, meaning that during large offensives they could be repositioned to cope with the increased numbers of casualties
Blood Transfusions	Preservatives, glass bottles, and refrigeration discovered to prevent blood clotting, for use at a later date. Sodium citrate in 1915 could preserve blood for up to 2 days, and sodium citrate-glucose in 1916 could preserve for up to 4 weeks.	Oswald Hope Robertson created the first blood bank at the Battle of Cambrai in 1917, credited with saving the lives of 11 Canadian soldiers using blood that had been collected up to 26 days earlier.
Thomas Splint	Invented by Hugh Owen Thomas, it pulled on the leg lengthways to prevent broken femur bones grinding on each other and causing death by blood loss.	All Regimental Medical Officers were instructed on how to use the Thomas Splint, allowing it to be used at RAPs and DSs near the front line, reducing death rate for this type of wound from 80% down to 20%
Brain surgery	In 1914, many head injuries were not treated as they were too risky and time could be better spent treating many other men with conventional injuries	A surgeon named Harvey Cushing invented a surgical magnet to remove shrapnel from the brain, helped by X-Rays allowing easier vision of the inside of the head
Plastic surgery	New Zealand doctor Harold Gillies became interested by facial disfigurement, so worked with French surgeons to use skin grafts, wiring, and metal plates to reconstruct faces using pedicle tubes	Nearly 12,000 facial reconstruction surgeries took place, with the key hospital providing this type of surgery being the new Queen's Hospital in Kent`;

const lines = tsvData.trim().split('\n');
const items = lines.map(line => {
    const parts = line.split('\t');
    return {
        topic: parts[0].trim(),
        f1: parts[1].trim(),
        f2: parts[2].trim()
    }
});

// We have 40 items.
// Section 5 has 5 lessons. 40 / 5 = 8 items per lesson.

const dataPath = path.join(__dirname, '../edexcel_medicine/data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

// Parse the file 
const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

let itemIndex = 0;

unitData.lessons.forEach(lesson => {
    // Only process Western Front lessons (5.1, 5.2, 5.3, 5.4, 5.5)
    if (lesson.id && lesson.id.startsWith('5.')) {
        
        let newItems = [];
        
        for (let i = 0; i < 8; i++) {
            if (itemIndex < items.length) {
                const item = items[itemIndex];
                newItems.push({
                    question: `Name two features of: ${item.topic}.`,
                    answer: `1. ${item.f1} 2. ${item.f2}`
                });
                itemIndex++;
            }
        }
        
        lesson.do_now = {
            type: "questions",
            title: "Western Front Features (Recall & Retrieval)",
            instructions: "Answer these features questions in full sentences. These directly practice the 4-mark exam question.",
            items: newItems
        };
    }
});

const jsContent = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
fs.writeFileSync(dataPath, jsContent);
console.log("Successfully injected Western Front Do Now features!");
