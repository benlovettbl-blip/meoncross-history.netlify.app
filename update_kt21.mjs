import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, 'eee', 'data.js');

let content = fs.readFileSync(dataFilePath, 'utf8');

let jsonStr = content.replace('export const unitData = ', '').trim();
if (jsonStr.endsWith(';')) {
    jsonStr = jsonStr.slice(0, -1);
}

let unitData;
try {
    unitData = eval('(' + jsonStr + ')');
} catch (e) {
    console.error("Error evaluating data.js", e);
    process.exit(1);
}

const newLesson = {
    id: "lesson_2_1",
    title: "KT2.1: Plots and revolts at home",
    enquiry: "Why did English Catholics continually plot to assassinate Elizabeth between 1569 and 1586, and how did Walsingham’s ruthless spy network ultimately lead to the execution of Mary, Queen of Scots?",
    teacher_notes: {
        primer: "This lesson explores the persistent domestic Catholic threat to Elizabeth, tracking the evolution of plots from the Northern Earls to the Babington Plot, and the vital role of Walsingham's spy network.",
        objectives: [
            {
                objective: "Understand the reasons for, and the significance of, the Revolt of the Northern Earls (1569–70).",
                primer: "Discuss the mixed religious and political motives of the Earls and the brutal suppression of the revolt.",
                question: "Which Protestant Bishop of Durham did the Northern Earls strongly resent?"
            },
            {
                objective: "Analyse the key features and significance of the Ridolfi, Throckmorton, and Babington plots.",
                primer: "Highlight the intersection of domestic plotting and foreign backing in these plots.",
                question: "Which high-ranking English nobleman was executed in 1572 for his involvement in the Ridolfi Plot?"
            },
            {
                objective: "Evaluate the methods used by Sir Francis Walsingham and his use of spies to uncover treason.",
                primer: "Focus on the use of ciphers, code-breakers like Thomas Phelippes, and agents provocateurs like Gilbert Gifford.",
                question: "What term is used for spies, like Gilbert Gifford, who secretly encourage others to commit treason?"
            },
            {
                objective: "Explain the reasons for, and the immense geopolitical significance of, Mary, Queen of Scots' execution in 1587.",
                primer: "Examine the Act for the Preservation of the Queen’s Safety and the immediate consequences of her execution.",
                question: "What specific Act of Parliament was used to try and convict Mary, Queen of Scots?"
            }
        ]
    },
    learning_objectives: {
        target: [
            "Understand the reasons for, and the significance of, the Revolt of the Northern Earls (1569–70).",
            "Analyse the key features and significance of the Ridolfi, Throckmorton, and Babington plots.",
            "Evaluate the methods used by Sir Francis Walsingham and his use of spies to uncover treason.",
            "Explain the reasons for, and the immense geopolitical significance of, Mary, Queen of Scots' execution in 1587."
        ],
        scaffolded: [
            "Describe what happened during the Revolt of the Northern Earls.",
            "List the main Catholic plots against Elizabeth.",
            "Explain how Walsingham used spies to catch plotters."
        ]
    },
    narrative: [
        {
            heading: "The Revolt of the Northern Earls (1569–70)",
            content: "The arrival of Mary, Queen of Scots in England in 1568 provided disgruntled English Catholics with a figurehead. This tension exploded a year later when the Earl of Northumberland (Thomas Percy) and the Earl of Westmorland (Charles Neville) led a major military uprising. Their motives were heavily mixed. Religiously, they resented Elizabeth’s settlement and the appointment of the radical Protestant James Pilkington as Bishop of Durham. Politically, the earls were furious at losing their traditional northern influence to Protestant 'new men' like William Cecil, John Forster, and Robert Dudley.\n\nThe rebels successfully captured Durham Cathedral, celebrating a traditional Catholic Mass. Their goal was to depose Elizabeth, marry Mary to the Duke of Norfolk, and restore Catholicism. However, the revolt failed miserably. Its defeat was a *catalyst for* brutal government reprisals; Elizabeth executed 450 rebels to set a terrifying example."
        },
        {
            heading: "Excommunication and the Catholic Plots",
            content: "Following the 1570 Papal Bull excommunicating Elizabeth, the government began to monitor Catholics much more severely. In **1581**, strict new laws were passed: families could be heavily fined for sheltering secret priests, and it became high treason to convert anyone to Catholicism. Against this tense backdrop, subsequent plots were able to attract widespread Catholic support at home and abroad.\n\n* **The Ridolfi Plot (1571):** Organised by Roberto Ridolfi, an Italian banker and Papal spy. The plan involved murdering Elizabeth and launching a massive Spanish invasion from the Netherlands using 10,000 troops led by the Duke of Alba. William Cecil uncovered the plot, which led directly to the execution of the Duke of Norfolk in 1572.\n* **The Throckmorton Plot (1583):** This plot planned for the French Duke of Guise to invade England, funded by Philip II of Spain and the Pope. Francis Throckmorton acted as the vital go-between for Mary, Queen of Scots. Walsingham's spies discovered papers at Throckmorton's house containing a list of Catholic sympathisers, proving the terrifying reality of the \"enemy within\". Throckmorton was tortured and executed in 1584, and the plot *exacerbated* government paranoia, leading to the Bond of Association and the expulsion of the Spanish Ambassador, Mendoza."
        },
        {
            heading: "The Babington Plot and Walsingham’s Spies",
            content: "Elizabeth survived these relentless threats largely due to her 'Spymaster', Sir Francis Walsingham. He built a formidable intelligence network, employing paid informants in every major town and spies abroad in France, Spain, and Italy. Walsingham routinely used ciphers for correspondence and hired expert code-breakers, like Thomas Phelippes, to decipher enemy messages. He also utilised **agents provocateurs**, such as Gilbert Gifford, who actively encouraged plotters to communicate with Mary so they could be trapped.\n\nThis system triumphed during the **Babington Plot (1586)**. Anthony Babington wrote directly to Mary detailing a plot to murder Elizabeth and invade with the Duke of Guise. Walsingham intercepted the letters, finding irrefutable evidence of Mary's direct approval of the assassination. Babington was hanged, drawn, and quartered."
        },
        {
            heading: "The Execution of Mary, Queen of Scots (1587)",
            content: "With Mary's written involvement exposed, she was tried and convicted under the highly specific **Act for the Preservation of the Queen’s Safety**. Mary remained a severe threat as long as she lived, and her execution was *intrinsically linked* to the very real threat of a Spanish invasion. Despite delaying for months, Elizabeth finally signed the death warrant, and Mary was beheaded at Fotheringhay Castle in February 1587."
        },
        {
            heading: "The Big Picture",
            content: "Between 1569 and 1586, the Catholic threat against Elizabeth fundamentally evolved. It began as a domestic dispute regarding northern noble power and traditional faith (The Northern Earls). However, the Ridolfi, Throckmorton, and Babington plots demonstrated a lethal intersection of English Catholic plotting and direct foreign (Spanish and French) military backing, forcing the government to pass harsh anti-Catholic laws in 1581. Elizabeth’s survival was almost entirely reliant on Sir Francis Walsingham’s sophisticated intelligence network. Ultimately, Mary's execution in 1587 brutally eradicated the domestic threat of a Catholic replacement, but in doing so, it became the definitive trigger for the launch of the Spanish Armada."
        }
    ],
    exam_questions: [
        {
            type: "12_marks",
            question: "Explain why Mary, Queen of Scots was executed in 1587.",
            examiner_tip: "For a 12-mark question, you need three distinct paragraphs, each focusing on a different reason. Do not just tell the story of her death. Start each paragraph with a clear reason (e.g., \"One reason Mary was executed was her direct involvement in the Babington Plot...\"). Support this with specific facts (the intercepted letters, Walsingham's code-breakers), and crucially, finish the paragraph by linking *how* this specific fact gave Elizabeth no choice but to sign the death warrant under the Act for the Preservation of the Queen's Safety. Good alternative paragraphs could focus on the culmination of previous plots (Ridolfi/Throckmorton) and the looming context of the Spanish threat."
        }
    ],
    recall_questions: [
        { q: "Which Protestant Bishop of Durham did the Northern Earls strongly resent?", a: "James Pilkington" },
        { q: "Which two Catholic nobles led the Revolt of the Northern Earls in 1569?", a: "The Earl of Northumberland and the Earl of Westmorland" },
        { q: "What major religious building did the Northern Earls capture to celebrate a Catholic Mass?", a: "Durham Cathedral" },
        { q: "Roughly how many rebels did Elizabeth execute after the Northern Earls' revolt?", a: "450" },
        { q: "What was the theological meaning of the 1570 Papal excommunication?", a: "Being formally excluded from the Catholic Church and unable to receive sacraments" },
        { q: "What strict law was passed in 1581 regarding Catholic conversions?", a: "It became high treason to convert anyone to Catholicism" },
        { q: "Who was the Italian banker that orchestrated a plot in 1571?", a: "Roberto Ridolfi" },
        { q: "Which foreign commander was supposed to lead 10,000 Spanish troops during the Ridolfi Plot?", a: "The Duke of Alba" },
        { q: "Which high-ranking English nobleman was executed in 1572 for his involvement in the Ridolfi Plot?", a: "The Duke of Norfolk" },
        { q: "Which plot in 1583 involved the French Duke of Guise invading England with Spanish money?", a: "The Throckmorton Plot" },
        { q: "What document was created after the Throckmorton Plot stating Mary would be killed if Elizabeth was assassinated?", a: "The Bond of Association" },
        { q: "Who was Elizabeth's Secretary of State and Spymaster?", a: "Sir Francis Walsingham" },
        { q: "What term is used for spies, like Gilbert Gifford, who secretly encourage others to commit treason?", a: "Agents provocateurs" },
        { q: "Who was the expert cryptographer that deciphered Mary's letters for Walsingham?", a: "Thomas Phelippes" },
        { q: "Which 1586 plot provided the final, irrefutable written proof of Mary's guilt?", a: "The Babington Plot" },
        { q: "What specific Act of Parliament was used to try and convict Mary, Queen of Scots?", a: "The Act for the Preservation of the Queen’s Safety" },
        { q: "In what year was Mary, Queen of Scots executed?", a: "1587" },
        { q: "Name two \"new men\" at court whose rise to power angered the old northern nobility.", a: "William Cecil, Robert Dudley, or John Forster" },
        { q: "What did Walsingham find in Francis Throckmorton's house that caused immense panic?", a: "A list of Catholic sympathisers / proof of the \"enemy within\"" },
        { q: "Which Spanish Ambassador was expelled following the discovery of the Throckmorton Plot?", a: "Mendoza" }
    ],
    do_now: {
        type: "questions",
        tasks: [
            { q: "In what year did Mary, Queen of Scots cross the border and arrive in England?", a: "1568" },
            { q: "What is a 'recusant'?", a: "A Catholic who refused to attend the new Protestant Church of England services" },
            { q: "How did the 1559 Religious Settlement attempt to find a \"middle way\"?", a: "It established Protestant doctrine but allowed some traditional Catholic practices to remain" },
            { q: "15 Second Challenge", a: "Try to speak for 15 seconds non-stop about the reasons for the Puritan Choir's opposition to the Elizabethan Church." }
        ]
    }
};

const existingIndex = unitData.lessons.findIndex(l => l.id === "lesson_2_1");
if (existingIndex !== -1) {
    unitData.lessons[existingIndex] = newLesson;
} else {
    unitData.lessons.push(newLesson);
}

// Sort lessons by ID to ensure lesson_2_1 comes before 2_2
unitData.lessons.sort((a, b) => a.id.localeCompare(b.id));

const newIndividuals = [
    {
        "id": "charles_neville",
        "name": "Charles Neville",
        "role": "6th Earl of Westmorland",
        "bio": "A Catholic noble from the north of England who, alongside Thomas Percy, led the disastrous 1569 Revolt of the Northern Earls against Elizabeth.",
        "image": "/assets/placeholder_cover.jpg"
    },
    {
        "id": "roberto_ridolfi",
        "name": "Roberto Ridolfi",
        "role": "Italian Banker and Papal Spy",
        "bio": "The chief architect of the 1571 Ridolfi Plot, which aimed to assassinate Elizabeth and replace her with Mary, Queen of Scots, backed by Spanish troops.",
        "image": "/assets/placeholder_cover.jpg"
    },
    {
        "id": "francis_throckmorton",
        "name": "Francis Throckmorton",
        "role": "English Catholic Conspirator",
        "bio": "A key figure in the 1583 Throckmorton Plot. He acted as the go-between for Mary, Queen of Scots, and the Spanish Ambassador. He was tortured and executed in 1584.",
        "image": "/assets/placeholder_cover.jpg"
    },
    {
        "id": "anthony_babington",
        "name": "Anthony Babington",
        "role": "English Catholic Conspirator",
        "bio": "The leader of the 1586 Babington Plot. His coded letters to Mary, Queen of Scots were intercepted by Walsingham's spies, directly leading to Mary's execution.",
        "image": "/assets/placeholder_cover.jpg"
    },
    {
        "id": "james_pilkington",
        "name": "James Pilkington",
        "role": "Bishop of Durham",
        "bio": "A radical Protestant appointed by Elizabeth as Bishop of Durham. His strict religious reforms deeply angered traditional northern Catholics, contributing to the 1569 Revolt.",
        "image": "/assets/placeholder_cover.jpg"
    },
    {
        "id": "thomas_phelippes",
        "name": "Thomas Phelippes",
        "role": "Expert Code-breaker and Cryptographer",
        "bio": "Employed by Sir Francis Walsingham, Phelippes was a master at deciphering intercepted messages. He successfully cracked the cipher used in the Babington Plot.",
        "image": "/assets/placeholder_cover.jpg"
    },
    {
        "id": "gilbert_gifford",
        "name": "Gilbert Gifford",
        "role": "Agent Provocateur",
        "bio": "A spy who worked for Walsingham. He infiltrated Catholic circles and acted as a double agent, actively encouraging plotters to communicate with Mary, Queen of Scots so they could be caught.",
        "image": "/assets/placeholder_cover.jpg"
    },
    {
        "id": "bernardino_de_mendoza",
        "name": "Bernardino de Mendoza",
        "role": "Spanish Ambassador",
        "bio": "The Spanish ambassador to England who was deeply involved in Catholic plots against Elizabeth, including the Throckmorton Plot. He was expelled from England in 1584.",
        "image": "/assets/placeholder_cover.jpg"
    }
];

newIndividuals.forEach(ind => {
    if (!unitData.key_individuals.find(k => k.id === ind.id)) {
        unitData.key_individuals.push(ind);
    }
});

fs.writeFileSync(dataFilePath, 'export const unitData = ' + JSON.stringify(unitData, null, 4) + ';\n', 'utf8');
console.log("Successfully injected lesson_2_1 to eee/data.js and added missing individuals.");
