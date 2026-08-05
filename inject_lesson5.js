const fs = require('fs');
const path = require('path');

const file = path.join('early_modern_world', 'data.js');
let raw = fs.readFileSync(file, 'utf8');

let jsonStr = raw.replace('export const unitData = ', '').replace(/;\s*$/, '');
let data = JSON.parse(jsonStr);

const lesson5 = {
    id: 'lesson_5',
    title: "How did enslaved Africans resist the Transatlantic Slave Trade?",
    enquiry: "How did enslaved Africans resist the Transatlantic Slave Trade? (Triangular Trade, Plantation economics, African resistance)",
    teacher_notes: {
        primer: "This lesson aims to dismantle the passive victim narrative of enslaved people by centering their active resistance (both covert and overt) against the mechanics of the Transatlantic Slave Trade and plantation economics. It also highlights how this wealth shaped modern Britain.",
        objectives: [
            {
                objective: "Unpack the mechanics of the Transatlantic Slave Trade and plantation economics.",
                primer: "Direct students to the Triangular Trade flowchart to visually understand the flow of capital and humans.",
                question: "How did the Triangular Trade system depend on both European manufactured goods and enslaved African labor to generate wealth?"
            },
            {
                objective: "Analyze primary sources from formerly enslaved Africans to evaluate different modes of resistance.",
                primer: "Use the interactive tabs for 'Forms of Resistance' alongside the primary sources from Equiano and Thistlewood.",
                question: "Why was day-to-day covert resistance just as important as overt armed rebellion in challenging plantation slavery?"
            },
            {
                objective: "Investigate the Jamaican Maroon Wars and how armed rebellion forced imperial compromises.",
                primer: "Focus on the Micro-History of Queen Nanny to demonstrate successful overt resistance.",
                question: "How did Queen Nanny and the Maroons force the British to compromise and grant them freedom?"
            }
        ]
    },
    do_now: {
        title: "Do Now: Previous Knowledge",
        type: "questions",
        items: [
            { question: "What political belief claimed a monarch was chosen by God and had absolute power?", answer: "The Divine Right of Kings" },
            { question: "Which King was executed by his own Parliament in 1649?", answer: "King Charles I" },
            { question: "What was the name of the strict Puritan commander who led the New Model Army?", answer: "Oliver Cromwell" },
            { question: "Which Caribbean island generated immense wealth for English merchants through sugar plantations?", answer: "Barbados" },
            { question: "How did the Atlantic Merchants influence the outcome of the English Civil War?", answer: "They used their massive profits from colonial trade to fund Parliament's New Model Army." }
        ]
    },
    vocab: [
        { term: "Chattel Slavery", definition: "A system where human beings are legally defined as personal property to be bought, sold, and inherited." },
        { term: "Middle Passage", definition: "The horrific forced voyage of enslaved Africans across the Atlantic Ocean to the Americas." },
        { term: "Maroon", definition: "Communities of formerly enslaved people who escaped and established free autonomous settlements, often in mountainous areas." },
        { term: "Covert Resistance", definition: "Hidden, day-to-day acts of defiance, such as working slowly or breaking tools, that sabatoged the plantation system." },
        { term: "Overt Resistance", definition: "Open, visible acts of defiance against slavery, such as armed rebellions and running away." }
    ],
    narrative_blocks: [
        {
            title: "Micro-History: Queen Nanny and the Blue Mountains (1730s)",
            text: "High in the mist-shrouded Blue Mountains of eastern Jamaica, an English army patrol crept through the dense rainforest in 1734. Suddenly, the trees themselves seemed to come alive.<br><br>Men and women dressed in camouflage woven from forest foliage descended upon the soldiers. The English troops were routed without ever seeing the main body of their enemy. Leading this guerrilla force was a woman whom British colonial officials called a \"rebel witch,\" but whom her people knew as <strong>Queen Nanny of the Maroons</strong>.<br><br>Born in the Gold Coast (modern-day Ghana) around 1686, Nanny was kidnapped, enslaved, and brought to Jamaica. She escaped from a sugar plantation into the rugged interior, joining communities of formerly enslaved people known as <strong>Maroons</strong> (derived from the Spanish <em>cimarrón</em>, meaning \"wild\" or \"untamed\").<br><br>Nanny was an extraordinary military strategist. She established <strong>Nanny Town</strong>, a fortified, self-sufficient mountain sanctuary where freed Africans grew crops, maintained African cultural traditions, and launched lightning raids to free enslaved workers from nearby British sugar plantations.<br><br>For over a decade, British forces tried and failed to conquer Nanny Town. By 1739, the British Crown was forced to do something unthinkable: <strong>sign a peace treaty with former slaves</strong>, recognizing their freedom and granting them 1,500 acres of autonomous land in Jamaica.<br><br>Queen Nanny’s story shatters a persistent historical myth: that enslaved Africans were passive victims who waited silently for white European abolitionists to free them. From the decks of slave ships to the sugar fields of the Caribbean, African resistance was continuous, sophisticated, and relentless.",
            image: "/images/jamaica_maroons.jpg",
            image_alt: "18th-century map of Jamaica",
            image_caption: "An 18th-century map of Jamaica. The rugged interior provided sanctuary for Maroon communities fighting British colonial forces.",
            tasks: [
                {
                    type: "comprehension",
                    question: "How does the story of Queen Nanny challenge the traditional historical narrative about the abolition of slavery?",
                    model_answer: "Queen Nanny's successful armed rebellion challenges the myth that enslaved people were passive victims waiting for white European abolitionists to free them, proving instead that African resistance was active, organized, and capable of forcing imperial powers into treaties."
                }
            ]
        },
        {
            title: "Macro-History: The Triangular Machinery of Exploitation",
            text: "Between 1500 and 1867, over 12.5 million African men, women, and children were kidnapped, forced onto ships, and transported across the Atlantic Ocean. Over 3 million were carried on British ships.<br><br>" +
                "<div style=\"display: flex; flex-direction: column; align-items: center; gap: 15px; background: #e0f2fe; padding: 25px; border-radius: 8px; border: 1px solid #7dd3fc; margin: 20px 0; font-family: sans-serif;\">" +
                "    <div style=\"background: #0284c7; color: white; padding: 15px; border-radius: 8px; text-align: center; width: 60%; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);\">" +
                "        EUROPE (e.g. Bristol, Liverpool, London)<br><span style=\"font-size: 0.85em; font-weight: normal;\">Exports Manufactured Goods (Guns, Alcohol, Textiles)</span>" +
                "    </div>" +
                "    <div style=\"font-size: 1.5rem; color: #0284c7;\">↓</div>" +
                "    <div style=\"display: flex; width: 100%; justify-content: space-between; align-items: center;\">" +
                "        <div style=\"background: #d97706; color: white; padding: 15px; border-radius: 8px; text-align: center; width: 42%; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);\">" +
                "            WEST AFRICA<br><span style=\"font-size: 0.85em; font-weight: normal;\">Forced capture, shattered communities</span>" +
                "        </div>" +
                "        <div style=\"text-align: center; color: #475569; font-weight: bold; font-size: 0.9em;\">THE MIDDLE PASSAGE<br>⟶<br>Enslaved Africans</div>" +
                "        <div style=\"background: #16a34a; color: white; padding: 15px; border-radius: 8px; text-align: center; width: 42%; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);\">" +
                "            THE AMERICAS<br><span style=\"font-size: 0.85em; font-weight: normal;\">Plantation labor (Sugar, Tobacco, Cotton)</span>" +
                "        </div>" +
                "    </div>" +
                "    <div style=\"font-size: 1.5rem; color: #16a34a;\">↑</div>" +
                "    <div style=\"background: #475569; color: white; padding: 15px; border-radius: 8px; text-align: center; width: 60%; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);\">" +
                "        RAW MATERIALS TO EUROPE<br><span style=\"font-size: 0.85em; font-weight: normal;\">European Capital Accumulation</span>" +
                "    </div>" +
                "</div>" +
                "<br><strong>The Mechanics of \"Chattel\" Slavery</strong><br>Unlike historical forms of bondage, Atlantic slavery was <strong>chattel slavery</strong>. Enslaved people were defined by law as personal property, bought, sold, mortgaged, and inherited like cattle or furniture.<br><br>" +
                "<ul><li><strong>The Middle Passage:</strong> A nightmare voyage lasting 6 to 10 weeks across the Atlantic. Humans were crammed below decks in spaces smaller than coffins. Between 15% and 20% of enslaved people died before reaching the Americas.</li>" +
                "<li><strong>Plantation Economics:</strong> Caribbean sugar production was brutal industrial labor. Enslaved workers were forced to cut sugarcane with machetes under burning heat for 18 hours a day, faced disease, and suffered severe punishment from white overseers.</li></ul>",
            image: "/images/triangular_trade.png",
            image_alt: "Map of the Triangular Trade",
            image_caption: "The Triangular Trade linked Europe, Africa, and the Americas in a continuous loop of capitalist exploitation.",
            tasks: [
                {
                    type: "analysis",
                    question: "Based on the flowchart, what specific goods were exchanged for enslaved Africans in West Africa?",
                    model_answer: "European merchants traded manufactured goods such as guns, alcohol, textiles, and metal in exchange for captured African people."
                }
            ]
        },
        {
            title: "The Spectrum of Resistance: How Enslaved People Fought Back",
            text: "Resistance was not always an armed uprising. Enslaved Africans fought back against a dehumanizing system in dozens of calculated ways every single day.<br><br>" +
                "<div style=\"border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; margin-top: 15px;\">" +
                "    <div style=\"display: flex; background: #f1f5f9; border-bottom: 1px solid #cbd5e1;\">" +
                "        <button id=\"resBtn1\" onclick=\"document.getElementById('res1').style.display='block'; document.getElementById('res2').style.display='none'; this.style.background='#fff'; this.nextElementSibling.style.background='#f1f5f9';\" style=\"flex: 1; padding: 12px; border: none; background: #fff; cursor: pointer; font-weight: bold; font-size: 1rem;\">Day-to-Day (Covert) Resistance</button>" +
                "        <button id=\"resBtn2\" onclick=\"document.getElementById('res1').style.display='none'; document.getElementById('res2').style.display='block'; this.style.background='#fff'; this.previousElementSibling.style.background='#f1f5f9';\" style=\"flex: 1; padding: 12px; border: none; background: #f1f5f9; border-left: 1px solid #cbd5e1; cursor: pointer; font-weight: bold; font-size: 1rem;\">Revolutionary (Overt) Resistance</button>" +
                "    </div>" +
                "    <div id=\"res1\" style=\"padding: 25px; display: block; background: #fff;\">" +
                "        <h3 style=\"margin-top: 0; color: #475569;\">Hidden Sabotage</h3>" +
                "        <ul style=\"line-height: 1.8; font-size: 1.05rem;\">" +
                "            <li>Slowing down work pace on the fields to damage profits</li>" +
                "            <li>Breaking tools and expensive plantation machinery on purpose</li>" +
                "            <li>Feigning illness, injury, or ignorance to avoid forced labor</li>" +
                "            <li>Secretly preserving African languages, religions, and music</li>" +
                "            <li>Poisoning overseers' food or livestock using local plants</li>" +
                "        </ul>" +
                "    </div>" +
                "    <div id=\"res2\" style=\"padding: 25px; display: none; background: #fff;\">" +
                "        <h3 style=\"margin-top: 0; color: #b91c1c;\">Armed & Direct Defiance</h3>" +
                "        <ul style=\"line-height: 1.8; font-size: 1.05rem;\">" +
                "            <li>Armed rebellion, assassinations, and plantation burning</li>" +
                "            <li>Shipboard revolts and mutinies during the Middle Passage</li>" +
                "            <li><strong>Marronage:</strong> Escaping permanently to form free, fortified towns</li>" +
                "            <li>Self-emancipation (purchasing own freedom) and publishing memoirs</li>" +
                "            <li>Political activism and speaking tours in European capitals</li>" +
                "        </ul>" +
                "    </div>" +
                "</div>",
            tasks: [
                {
                    type: "comprehension",
                    question: "Give one example of covert resistance and explain why an enslaved person might choose it over overt resistance.",
                    model_answer: "An example of covert resistance is breaking tools or slowing down work. An enslaved person might choose this because it was less likely to result in immediate, fatal punishment compared to an armed rebellion, yet it still effectively harmed the slave owner's profits."
                }
            ]
        },
        {
            title: "Primary Source Deep Dive: Authentic Voices of Resistance",
            text: "To truly understand the experience of the Transatlantic Slave Trade, we must read the words of those who survived it.<br><br>" +
                "<blockquote style=\"border-left: 5px solid #3b82f6; padding-left: 15px; margin-left: 0; background: #f8fafc; padding: 15px; border-radius: 4px;\">" +
                "<strong>Source A: Olaudah Equiano Recounts the Terror of the Ship’s Hold (1789)</strong><br>" +
                "<em>\"The closeness of the place, and the heat of the climate, added to the number in the ship, which was so crowded that each had scarcely room to turn himself, almost suffocated us. This produced copious perspirations, so that the air soon became unfit for respiration, from a variety of loathsome smells, and brought on a sickness among the slaves, of which many died... The shrieks of the women, and the groans of the dying, rendered the whole a scene of horror almost inconceivable.\"</em><br>" +
                "— <strong>Olaudah Equiano</strong>, <em>The Interesting Narrative of the Life of Olaudah Equiano</em> (1789).</blockquote>" +
                "<br>" +
                "<blockquote style=\"border-left: 5px solid #ef4444; padding-left: 15px; margin-left: 0; background: #fef2f2; padding: 15px; border-radius: 4px;\">" +
                "<strong>Source B: Equiano Describes Shipboard Revolts</strong><br>" +
                "<em>\"One day, when we had a smooth sea and moderate wind, two of my wearied countrymen, who were chained together (I was near them at the time), preferring death to such a life of misery, somehow made through the nettings, and jumped into the sea: immediately another quite dejected fellow, who, on account of his illness, was suffered to be out of irons, also followed their example... I believe many more would very soon have done the same, if they had not been prevented by the ship's crew, who were instantly alarmed.\"</em><br>" +
                "— <strong>Olaudah Equiano</strong>, <em>The Interesting Narrative</em> (1789).</blockquote>" +
                "<br>" +
                "<blockquote style=\"border-left: 5px solid #10b981; padding-left: 15px; margin-left: 0; background: #f0fdf4; padding: 15px; border-radius: 4px;\">" +
                "<strong>Source C: A Jamaican Overseer’s Diary Recording Everyday Sabotage (1771)</strong><br>" +
                "<em>\"May 14: The slaves again delayed the grinding of the cane... claim the main waterwheel spindle is broken by accident, but I suspect it was done maliciously by the mill boiler. May 19: Found three cows dead in the lower pasture, poisoned with nightshade root. The Negroes deny all knowledge, but there is a spirit of sullen defiance among them.\"</em><br>" +
                "— <strong>Adapted from the diary of Thomas Thistlewood</strong>, a Jamaican sugar plantation overseer.</blockquote>",
            image: "/images/equiano.jpg",
            image_alt: "Portrait of Olaudah Equiano",
            image_caption: "Olaudah Equiano, an abolitionist who purchased his freedom and exposed the horrors of slavery through his bestselling 1789 autobiography.",
            tasks: [
                {
                    type: "source_analysis",
                    question: "Inferring Motive (Source B): Why did jumping overboard represent a powerful act of resistance for enslaved Africans, even though it resulted in death?",
                    model_answer: "Jumping overboard was a powerful act of resistance because it was a total rejection of their commodification; by taking their own lives, they reclaimed control over their own bodies and actively destroyed the 'property' and profits of the slave traders."
                },
                {
                    type: "source_analysis",
                    question: "Cross-Referencing Utility: How does Source C confirm that \"day-to-day\" resistance was real and effective, even when reported by a hostile white overseer?",
                    model_answer: "Source C shows the overseer constantly suspecting sabotage ('done maliciously', 'poisoned with nightshade root'). Even though Thistlewood is hostile, his diary proves that enslaved people were successfully delaying work and causing economic damage while maintaining plausible deniability ('deny all knowledge')."
                },
                {
                    type: "source_analysis",
                    question: "Evaluating Significance (Source A): Why was Equiano’s autobiography so historically revolutionary when published in London in 1789?",
                    model_answer: "Equiano's autobiography was revolutionary because it was written by an educated African man, which completely destroyed racist European arguments that Africans were intellectually inferior or suited only for brutal labor. It provided undeniable, first-hand evidence of the horrors of slavery directly to the British public."
                }
            ]
        },
        {
            title: "Historical Debates: What Truly Destroyed Slavery?",
            text: "<strong>What Truly Destroyed Slavery—White Abolitionists or Black Resistance?</strong><br><br>" +
                "<div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px;\">" +
                "   <div style=\"background: #fdf4ff; border: 1px solid #f0abfc; padding: 20px; border-radius: 8px;\">" +
                "       <h4 style=\"margin-top:0; color: #a21caf;\">Interpretation A: The Traditional Imperial View</h4>" +
                "       <p><em>\"Britain’s abolition of the slave trade in 1807 was a noble gesture of Christian humanitarianism. It was brought about by the tireless moral campaigning of white parliamentary heroes like William Wilberforce and Thomas Clarkson in London.\"</em></p>" +
                "       <p style=\"text-align:right; margin-bottom:0;\">— <strong>Reginald Coupland, 1933</strong></p>" +
                "   </div>" +
                "   <div style=\"background: #f0fdfa; border: 1px solid #5eead4; padding: 20px; border-radius: 8px;\">" +
                "       <h4 style=\"margin-top:0; color: #0f766e;\">Interpretation B: The Anti-Colonial View</h4>" +
                "       <p><em>\"Slavery was not simply voted away by politicians in London; it was rendered unprofitable and politically unworkable by continuous slave rebellions across the Caribbean... The enslaved freed themselves.\"</em></p>" +
                "       <p style=\"text-align:right; margin-bottom:0;\">— <strong>Dr. Eric Williams, 1944</strong></p>" +
                "   </div>" +
                "</div>" +
                "<br><strong>Modern Resonance: Reparations and Imperial Fortunes</strong><br>" +
                "The profits of Atlantic slavery did not disappear when slavery was abolished in 1833. Modern historians have proven that Caribbean sugar wealth directly funded major British banks (e.g., Barclays), insurance institutions (Lloyd's of London), and railway networks.<br><br>" +
                "<strong>The 1833 Compensation Scandal:</strong> When Britain abolished slavery, the government paid <strong>£20 million</strong> (equivalent to £17 billion today) in compensation—not to the enslaved people, but to the <strong>46,000 white slave owners</strong> for their \"loss of property\"! This debt was so massive that British taxpayers did not finish paying it off until <strong>2015</strong>.",
            image: "/images/brookes_ship.jpg",
            image_alt: "Diagram of the Slave Ship Brookes",
            image_caption: "The famous 1788 abolitionist plan showing the horrific tight stowage on the slave ship Brookes, used to shock the British public.",
            tasks: [
                {
                    type: "comprehension",
                    question: "Why is the 1833 compensation payout considered a 'scandal' by modern historians?",
                    model_answer: "It is considered a scandal because the massive payout (£20 million) was given entirely to the slave owners who had profited from the abuse, while the enslaved people received absolutely nothing for generations of stolen labor and suffering."
                }
            ]
        },
        {
            title: "Digital Research Task: The Legacies of British Slavery",
            text: "To understand how slavery shaped modern Britain, conduct a real-world historical investigation using the Centre for the Study of the Legacies of British Slavery at University College London (UCL).<br><br>" +
                "<div style=\"background: #1e293b; color: #f8fafc; padding: 25px; border-radius: 8px; font-family: monospace;\">" +
                "  <h3 style=\"margin-top: 0; color: #38bdf8;\">🖥️ STUDENT RESEARCH INSTRUCTIONS</h3>" +
                "  <ol style=\"margin-bottom: 20px; line-height: 1.6;\">" +
                "    <li>Open your web browser and navigate to the <strong>UCL Legacies of British Slavery Database</strong> (ucl.ac.uk/lbs).</li>" +
                "    <li>Click on <strong>\"Search the Database\"</strong> and select <strong>\"Commercial & Financial Legacies\"</strong> or search by <strong>Geographic Location</strong> (e.g., Bristol, Liverpool, London).</li>" +
                "  </ol>" +
                "  <div style=\"background: #0f172a; padding: 15px; border-radius: 6px; text-align: center; font-weight: bold; color: #10b981; border: 1px solid #334155;\">" +
                "    [Visit ucl.ac.uk/lbs] ──► [Search Your Region] ──► [Trace Local Wealth]" +
                "  </div>" +
                "  <h3 style=\"margin-top: 25px; color: #f472b6;\">📋 INVESTIGATION WORKSHEET</h3>" +
                "  <ul style=\"line-height: 1.6;\">" +
                "    <li><strong>Task A:</strong> Identify one individual/family who claimed compensation in 1833. Record their name, the number of enslaved people they 'owned', and the payout received.</li>" +
                "    <li><strong>Task B:</strong> Investigate what happened to that wealth. Was it invested in local British buildings, railways, artwork, or bank stocks?</li>" +
                "    <li><strong>Task C:</strong> Write a 150-word summary evaluating how your local area directly benefited from Atlantic plantation economies.</li>" +
                "  </ul>" +
                "</div>",
            tasks: []
        }
    ],
    quiz: [
        {
            q: "What name was given to the leg of the Triangular Trade that transported enslaved Africans across the Atlantic Ocean?",
            a: "The Middle Passage",
            distractors: ["The Columbian Exchange", "The Golden Route", "The Northwest Passage"]
        },
        {
            q: "What legal term described a system of slavery where human beings were treated as personal property to be bought and sold?",
            a: "Chattel Slavery",
            distractors: ["Indentured Servitude", "Feudal Serfdom", "Debt Bondage"]
        },
        {
            q: "Who was the famous female leader of the Windward Maroons in Jamaica who forced the British to sign a 1739 peace treaty?",
            a: "Queen Nanny (Nanny of the Maroons)",
            distractors: ["Mary Prince", "Harriet Tubman", "Sojourner Truth"]
        },
        {
            q: "What name was given to communities of formerly enslaved people who escaped into the mountains or forests of the Caribbean?",
            a: "Maroons",
            distractors: ["The Free Soil Coalition", "The Exodusters", "The Abolitionists"]
        },
        {
            q: "Name the formerly enslaved African author whose 1789 autobiography became an international bestseller and abolitionist weapon.",
            a: "Olaudah Equiano",
            distractors: ["Frederick Douglass", "Toussaint Louverture", "Ignatius Sancho"]
        },
        {
            q: "What cash crop grown in Jamaica and Barbados was so profitable it was nicknamed 'white gold'?",
            a: "Sugarcane (Sugar)",
            distractors: ["Cotton", "Tobacco", "Indigo"]
        },
        {
            q: "Which Caribbean island saw a successful 1791 slave revolution led by Toussaint Louverture, creating the world's first free Black republic?",
            a: "Saint-Domingue (renamed Haiti)",
            distractors: ["Jamaica", "Cuba", "Puerto Rico"]
        },
        {
            q: "In what year did the British Parliament pass the Act for the Abolition of the Slave Trade (banning the trade, though not slavery itself)?",
            a: "1807",
            distractors: ["1776", "1833", "1865"]
        },
        {
            q: "Who received the £20 million compensation payout from the British government when slavery was abolished in 1833?",
            a: "The white slave owners (for their 'loss of property')",
            distractors: ["The formerly enslaved people", "West African governments", "The Royal Navy"]
        },
        {
            q: "Which modern university hosts the 'Legacies of British Slavery' database used to trace slave-ownership wealth?",
            a: "University College London (UCL)",
            distractors: ["Oxford University", "Cambridge University", "London School of Economics (LSE)"]
        }
    ]
};

const idx = data.lessons.findIndex(l => l.id === 'lesson_5');
if (idx !== -1) {
    data.lessons[idx] = lesson5;
} else {
    data.lessons.splice(4, 0, lesson5);
}

const out = `export const unitData = ${JSON.stringify(data, null, 4)};\n`;
fs.writeFileSync(file, out);
console.log("Successfully injected Lesson 5 into early_modern_world/data.js");
