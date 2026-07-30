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
    id: "lesson_2_3",
    title: "KT2.3: Outbreak of war with Spain, 1585–88",
    enquiry: "Why did the 'Cold War' between England and Spain finally escalate into open military conflict in 1585, and how did Robert Dudley's campaign in the Netherlands and Francis Drake's raid on Cadiz shape the coming war?",
    teacher_notes: {
        primer: "This lesson details the transition from cold war to open conflict with Spain, focusing on the deterioration of relations and English direct involvement in the Netherlands via the Treaty of Nonsuch.",
        objectives: [
            {
                objective: "Understand the reasons for deteriorating relations with Spain, focusing on religious shifts, the Genoese Loan, the assassination of William of Orange, and the Treaty of Joinville.",
                primer: "Discuss how early provocations like the Genoese Loan damaged relations, acting as a catalyst for war.",
                question: "What did Elizabeth seize from Italian ships sheltering in English ports in 1568?"
            },
            {
                objective: "Analyse the significance of English direct involvement in the Netherlands through the 1585 Treaty of Nonsuch and the actions of Robert Dudley.",
                primer: "Explain how Dudley's actions in the Netherlands angered Elizabeth but still secured Ostend.",
                question: "What 1585 agreement saw Elizabeth officially pledge military support to the Dutch rebels?"
            },
            {
                objective: "Evaluate the strategic impact of Francis Drake's preemptive raid on Cadiz in 1587 ('Singeing the King of Spain's beard').",
                primer: "Focus on the destruction of seasoned barrel staves and how this bought England vital time.",
                question: "What crucial supply item did Drake destroy at Cadiz that later caused Spanish food to rot?"
            }
        ]
    },
    learning_objectives: {
        target: [
            "Understand the reasons for deteriorating relations with Spain, focusing on religious shifts, the Genoese Loan, the assassination of William of Orange, and the Treaty of Joinville.",
            "Analyse the significance of English direct involvement in the Netherlands through the 1585 Treaty of Nonsuch and the actions of Robert Dudley.",
            "Evaluate the strategic impact of Francis Drake's preemptive raid on Cadiz in 1587 ('Singeing the King of Spain's beard')."
        ],
        scaffolded: [
            "List the reasons why England and Spain became enemies.",
            "Describe what Robert Dudley did in the Netherlands.",
            "Explain how Francis Drake's raid on Cadiz helped England."
        ]
    },
    narrative: [
        {
            heading: "Deteriorating Relations: Religion, Piracy, and the Genoese Loan",
            content: "Under Mary Tudor, England and Spain had been staunch Catholic allies. However, Elizabeth's Protestant Religious Settlement fundamentally soured this relationship. Tensions were further *exacerbated* by political and commercial rivalry. In 1568, Elizabeth seized the **Genoese Loan**—gold lent to Spain by Italian bankers that had sheltered in English ports—arguing it belonged to the bankers, not Spain. Furthermore, English privateers relentlessly raided Spanish colonies in the New World. Between 1577 and 1580, Sir Francis Drake alone captured £400,000 of Spanish gold and silver, humiliating Philip II."
        },
        {
            heading: "The Point of No Return: Direct Involvement in the Netherlands",
            content: "By 1584, the situation in the Netherlands reached a breaking point. The assassination of the Dutch Protestant rebel leader, William of Orange, led Elizabeth to deeply fear that a complete Spanish victory across the Channel was imminent. Her fears were compounded when Spain and Catholic France signed the Treaty of Joinville in 1584, uniting England's two greatest enemies.\n\nFeeling she had no other choice, Elizabeth signed the **Treaty of Nonsuch** in August 1585, officially pledging to finance an army of 7,400 English troops to support the Dutch rebels. By sending an army, commanded by Robert Dudley, Earl of Leicester, to directly fight the Spanish, Elizabeth had effectively declared open war. This bold move was a definitive *catalyst for* the Spanish Armada."
        },
        {
            heading: "The Actions of Robert Dudley (1585–87)",
            content: "Dudley’s expedition in the Netherlands was, overall, a massive military and political failure because the force was poorly supplied. Immediately upon arriving, Dudley accepted the title of 'Governor General' of the Low Countries, which deeply angered Elizabeth. She still hoped to negotiate with Spain; Dudley, conversely, wanted to completely liberate the Netherlands.\n\nThis lack of success was severely *exacerbated* when two of Dudley’s own officers, **William Stanley** and **Rowland York**, defected to the Spanish side, completely destroying the Dutch rebels' trust in the English. However, Dudley did achieve one highly significant victory. He successfully prevented the Spanish commander, the Duke of Parma, from capturing the deep-water port of **Ostend**. This victory was *intrinsically linked* to the later failure of the Spanish Armada, as Parma was left without a suitable port to safely load his invasion troops onto Spanish ships."
        },
        {
            heading: "'Singeing the King of Spain's Beard' (1587)",
            content: "Furious at English interference, Philip II began assembling a massive invasion fleet. To buy England time, Elizabeth ordered Francis Drake to launch a preemptive strike on the heavily fortified Spanish port of Cadiz in April 1587. Drake sailed right into the harbour, completely destroying roughly 30 Spanish ships and vast amounts of supplies.\n\nCrucially, Drake destroyed thousands of seasoned wooden barrel staves. Because of this, the Spanish were later forced to put their food and water into barrels made of new, unseasoned wood, which leaked and caused their provisions to rot long before they reached England. Drake's daring raid—famous as the \"singeing of the King of Spain's beard\"—successfully delayed the Armada's launch by over a year, giving England crucial time to prepare its coastal defences."
        },
        {
            heading: "The Big Picture",
            content: "The period between 1585 and 1588 marked the dramatic transition from cold war to open, state-sponsored conflict. Early provocations like the seizure of the 1568 Genoese Loan and Drake's £400,000 privateering haul severely damaged relations. Ultimately, the Treaty of Nonsuch forced Elizabeth to abandon her preferred strategy of cautious diplomacy. While Robert Dudley’s military campaign in the Netherlands was hampered by defection and a lack of royal funding, his protection of the deep-water port of Ostend laid the invisible groundwork for England's future survival. Ultimately, Francis Drake's aggressive, preemptive strike on Cadiz exposed the logistical vulnerabilities of the Spanish Empire and bought Elizabeth the vital time she needed to prepare for the greatest existential threat of her reign: the Spanish Armada."
        }
    ],
    exam_questions: [
        {
            type: "12_marks",
            question: "Explain why relations between England and Spain became worse in the years 1569–88.",
            examiner_tip: "To achieve Level 4, you must explain how the different causes interacted with each other. For example, explain how early commercial provocations like the **Genoese Loan (1568)** and **Drake's £400,000 theft**  built tension, acting as a *catalyst for* Philip's involvement in Catholic plots. When discussing the Netherlands, be specific: mention how Dudley accepting the title of 'Governor General' angered Philip II. Your third paragraph can focus on Drake's actions in Cadiz; explain how the 1587 raid not only humiliated Philip II but actively destroyed Spanish resources, making open war completely inevitable."
        }
    ],
    recall_questions: [
        { q: "Under which previous monarch were England and Spain actually allies?", a: "Mary Tudor" },
        { q: "What did Elizabeth seize from Italian ships sheltering in English ports in 1568?", a: "The Genoese Loan" },
        { q: "How much Spanish gold and silver did Francis Drake capture between 1577 and 1580?", a: "£400,000" },
        { q: "Which Dutch Protestant rebel leader was assassinated in 1584?", a: "William of Orange" },
        { q: "Which 1584 treaty allied Catholic France and Spain together?", a: "The Treaty of Joinville" },
        { q: "What 1585 agreement saw Elizabeth officially pledge military support to the Dutch rebels?", a: "The Treaty of Nonsuch" },
        { q: "How many soldiers did Elizabeth agree to send to the Netherlands in 1585?", a: "7,400 troops" },
        { q: "Which English commander was sent to lead the troops in the Netherlands?", a: "Robert Dudley, Earl of Leicester" },
        { q: "What title did Robert Dudley accept in the Netherlands that infuriated Elizabeth?", a: "Governor General" },
        { q: "Name one of the English officers who defected to the Spanish side, damaging Dutch trust.", a: "William Stanley or Rowland York" },
        { q: "What deep-water port did Dudley successfully prevent the Spanish from capturing?", a: "Ostend" },
        { q: "Why was the defense of Ostend so important for England's future?", a: "It meant the Spanish Armada wouldn't have a deep-water port to pick up troops from a year later" },
        { q: "In what month and year did Francis Drake launch his preemptive raid on Cadiz?", a: "April 1587" },
        { q: "What famous phrase was used to describe Drake's raid on Cadiz?", a: "\"Singeing the King of Spain's beard\"" },
        { q: "Roughly how many Spanish ships did Drake destroy in Cadiz harbour?", a: "30 ships" },
        { q: "What crucial supply item did Drake destroy at Cadiz that later caused Spanish food to rot?", a: "Seasoned wooden barrel staves" },
        { q: "How long did Drake's raid on Cadiz delay the launch of the Spanish Armada?", a: "By roughly one year" },
        { q: "Why was this delay so significant for Elizabeth's government?", a: "It bought England vital time to prepare their navy and coastal defences" }
    ],
    do_now: {
        type: "questions",
        tasks: [
            { q: "In what year was Francis Drake knighted on the deck of the *Golden Hind*?", a: "1581" },
            { q: "What is a 'privateer'?", a: "A private ship owner authorised by their government to attack and capture enemy ships" },
            { q: "How did the 1584 Bond of Association respond to the Throckmorton Plot?", a: "It stated that if Elizabeth were assassinated, Mary, Queen of Scots would be executed" },
            { q: "15 Second Challenge", a: "Try to speak for 15 seconds non-stop about the reasons why English Catholics became an increasing threat after 1570." }
        ]
    }
};

const existingIndex = unitData.lessons.findIndex(l => l.id === "lesson_2_3");
if (existingIndex !== -1) {
    unitData.lessons[existingIndex] = newLesson;
} else {
    unitData.lessons.push(newLesson);
}

unitData.lessons.sort((a, b) => a.id.localeCompare(b.id));

const newIndividuals = [
    {
        "id": "william_stanley",
        "name": "William Stanley",
        "role": "English Commander",
        "bio": "An English officer serving under Robert Dudley in the Netherlands who shockingly defected to the Spanish side, heavily damaging the Dutch rebels' trust in their English allies.",
        "image": "/assets/placeholder_cover.jpg"
    },
    {
        "id": "rowland_york",
        "name": "Rowland York",
        "role": "English Officer",
        "bio": "An English officer who, alongside William Stanley, defected to the Spanish while commanding troops in the Netherlands, severely undermining Dudley's campaign.",
        "image": "/assets/placeholder_cover.jpg"
    }
];

newIndividuals.forEach(ind => {
    if (!unitData.key_individuals.find(k => k.id === ind.id)) {
        unitData.key_individuals.push(ind);
    }
});

fs.writeFileSync(dataFilePath, 'export const unitData = ' + JSON.stringify(unitData, null, 4) + ';\n', 'utf8');
console.log("Successfully injected lesson_2_3 to eee/data.js and added missing individuals.");
