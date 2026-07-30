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
    id: "lesson_3_2",
    title: "KT3.2: The Problem of Poverty",
    enquiry: "Why did poverty and vagabondage explode into a national crisis during Elizabeth’s reign, and what forced the government to completely change its strategy from brutal punishment to national welfare?",
    teacher_notes: {
        primer: "This lesson covers the economic crisis of Elizabethan England, focusing on population growth, inflation, enclosure, and the Tudor categorization of the poor. It transitions from early brutal punishments to the foundational steps of a national welfare state.",
        objectives: [
            {
                objective: "Understand the economic and demographic causes of the poverty crisis, focusing on population growth, inflation, and the devastating impact of enclosure.",
                primer: "Highlight how the population growth (3m to 4m) acted as a catalyst for inflation and how enclosure exacerbated food shortages and evictions.",
                question: "What agricultural practice involved landlords fencing off common fields, leading to mass evictions?"
            },
            {
                objective: "Analyse contemporary Tudor attitudes towards the poor, specifically the strict division between the 'deserving' (impotent) and 'undeserving' (able-bodied) poor.",
                primer: "Discuss the difference between the Impotent Poor and the Able-Bodied Poor.",
                question: "What term was used to describe the 'deserving' poor who could not work due to old age or severe illness?"
            },
            {
                objective: "Explain the reasons behind the public terror of vagabonds.",
                primer: "Cover the fear of disease, crime, and rebellion, and use Thomas Harman's pamphlet as evidence.",
                question: "What was a 'Counterfeit Crank'?"
            },
            {
                objective: "Evaluate the significance of Elizabeth's changing policies, specifically the 1572 Vagabonds Act and the 1576 Poor Relief Act.",
                primer: "Contrast the brutal punishments of the 1572 Act with the provision of raw materials in the 1576 Act.",
                question: "What highly significant financial system did the 1572 Act introduce to help the impotent poor?"
            }
        ]
    },
    learning_objectives: {
        target: [
            "Understand the economic and demographic causes of the poverty crisis, focusing on population growth, inflation, and the devastating impact of enclosure.",
            "Analyse contemporary Tudor attitudes towards the poor, specifically the strict division between the 'deserving' (impotent) and 'undeserving' (able-bodied) poor.",
            "Explain the reasons behind the public terror of vagabonds.",
            "Evaluate the significance of Elizabeth's changing policies, specifically the 1572 Vagabonds Act and the 1576 Poor Relief Act."
        ],
        scaffolded: [
            "List the main reasons why poverty increased.",
            "Describe the difference between the 'deserving' and 'undeserving' poor.",
            "Explain why people were so afraid of vagabonds.",
            "Describe the difference between the 1572 and 1576 Poor Laws."
        ]
    },
    vocab: [
        { term: "Vagabond / Vagrant", definition: "A homeless, unemployed person who wandered from town to town looking for work or begging." },
        { term: "Enclosure", definition: "The deeply controversial practice of wealthy landlords putting fences around large, open fields to graze sheep, leading to mass rural unemployment." },
        { term: "Impotent Poor", definition: "The 'deserving' poor who genuinely could not work due to old age, severe illness, or because they were too young." },
        { term: "Able-Bodied Poor", definition: "The 'undeserving' poor who were physically capable of working but were unemployed. Often viewed as lazy criminals." },
        { term: "Poor Rate", definition: "A compulsory local tax collected by Justices of the Peace (JPs) to fund financial support for the impotent poor." }
    ],
    narrative: [
        {
            heading: "The Causes of the Poverty Crisis",
            content: "During Elizabeth's reign, the number of people living in extreme poverty rapidly increased. This crisis was driven by a 'perfect storm' of economic and demographic factors. The foundational cause was **population growth**; the population of England rose dramatically from roughly 3 million in 1551 to over 4 million by 1601. This population boom acted as a direct *catalyst for* rampant inflation. Because there were more people, the demand for food and housing skyrocketed, causing prices to rise much faster than wages. Consequently, ordinary labourers found it increasingly impossible to afford basic survival necessities, a situation severely *exacerbated* by a series of disastrously bad harvests in the 1570s that caused acute food shortages.\n\nFurthermore, poverty was *intrinsically linked* to the agricultural shift known as **enclosure**. To make more money, wealthy landowners fenced off shared village land to breed sheep for the lucrative European wool trade. Sheep farming required only one shepherd, whereas traditional crop farming required dozens of labourers. This led to mass evictions, forcing thousands of unemployed, desperate farmers to leave their villages and migrate to towns and cities looking for work, rapidly swelling the ranks of the urban poor. Finally, when the English cloth trade collapsed due to a trade embargo with Antwerp, thousands of weavers and spinners lost their jobs overnight."
        },
        {
            heading: "Attitudes to the Poor and the Fear of Vagabonds",
            content: "The Elizabethan government did not believe it was their job to help the poor; they believed everyone had a fixed, God-given place in the social hierarchy. They strictly divided the poor into two categories. The **'Impotent Poor'** (the sick, elderly, and orphans) were viewed with sympathy as the 'deserving poor' and were helped by local charity and the Church.\n\nHowever, the **'Able-Bodied Poor'** were viewed with intense suspicion and hatred. The authorities believed that if you were physically capable of working but had no job, you were simply lazy and dangerous. The most hated of all were **vagabonds**—homeless beggars who wandered the country. The public was terrified of them. Popular pamphlets, like those written by Thomas Harman, warned the public about deceptive tricksters, such as the 'Counterfeit Crank' (who faked epileptic fits with soap in their mouth to get sympathy money) or the 'Clapper Dudgeon' (who tied arsenic to their skin to create fake, bleeding sores)."
        },
        {
            heading: "Changing Government Action: The Poor Laws",
            content: "Initially, the government's approach to vagabonds was purely brutal. However, as the crisis deepened, the government realised that the threat of mass starvation could lead to a catastrophic peasant rebellion. They had to take national action.\n\n* **The 1572 Vagabonds Act:** This law was heavily punitive. It stated that any vagabond caught wandering could be brutally whipped and have a hole burned through their right ear. If caught a third time, they could be executed. However, it was historically highly significant because it officially introduced the **national Poor Rate**—a compulsory local tax to raise money for the deserving poor. It acknowledged for the first time that the government, not just the Church, had a duty to help the vulnerable.\n* **The 1576 Poor Relief Act:** This act was a revolutionary turning point. It finally recognised a harsh economic reality: some able-bodied people genuinely *wanted* to work but simply could not find any. It ordered JPs to provide raw materials (like wool and hemp) for the unemployed to work with and sell. For those who still stubbornly refused to work, it ordered the creation of **'Houses of Correction'** (strict workhouses) where they would be punished and forced to labour."
        },
        {
            heading: "The Big Picture",
            content: "The Elizabethan era completely transformed how England dealt with poverty. The demographic explosion and the greed of enclosure destroyed the traditional, rural way of life, forcing thousands onto the road as vagabonds. Fear of these 'masterless men' initially led to brutal, violent legislation. However, the sheer scale of the crisis forced Elizabeth’s government to undergo a profound ideological shift. By introducing a compulsory Poor Rate in 1572 and actively providing raw materials for the unemployed in 1576, Elizabeth’s government laid the very first, tentative foundations of a national welfare state—not out of modern compassion, but out of a desperate, pragmatic need to maintain social order and prevent rebellion."
        }
    ],
    exam_practice: [
        {
            type: "12_marks",
            question: "Explain why poverty increased in Elizabethan England.",
            examiner_tip: "To achieve Level 4, you must explain the *interaction* between the different causes of poverty rather than just listing them. \n\n**Paragraph 1 (Population & Inflation):** Explain how the population growing from 3m to 4m acted as a *catalyst for* inflation (demand outstripping supply), meaning wages could no longer cover the rising cost of bread. \n\n**Paragraph 2 (Enclosure):** Explain how the shift from arable farming to sheep farming meant fewer workers were needed, leading to evictions. Link this back to Paragraph 1 by stating this *exacerbated* the food shortages, as less land was being used to grow crops.\n\n**Paragraph 3 (Decline in Cloth Trade):** Explain how the collapse of the Antwerp wool market led to sudden mass unemployment in towns, which combined with the arrival of desperate rural migrants to create an unmanageable crisis. Ensure each paragraph ends with a strong link back to the question."
        }
    ],
    recall_questions: [
        { q: "What happened to the population of England between 1551 and 1601?", a: "It grew rapidly from roughly 3 million to over 4 million" },
        { q: "What economic problem was caused by demand for food outstripping supply?", a: "Rapid inflation (prices rising much faster than wages)" },
        { q: "What agricultural practice involved landlords fencing off common fields?", a: "Enclosure" },
        { q: "Why did landlords prefer breeding sheep over traditional crop farming?", a: "The European wool trade was more lucrative and it required fewer workers to pay" },
        { q: "What happened to unemployed rural workers after they were evicted due to enclosure?", a: "They migrated to towns and cities looking for work, becoming vagrants/vagabonds" },
        { q: "Which major European port city placed a trade embargo on English cloth, causing mass unemployment?", a: "Antwerp" },
        { q: "What term was used to describe the 'deserving' poor (the sick, elderly, and orphans)?", a: "The Impotent Poor" },
        { q: "What term was used to describe the 'undeserving' poor who were physically capable of working?", a: "The Able-bodied Poor" },
        { q: "What was the name given to a homeless, unemployed person who wandered from town to town?", a: "A vagabond or vagrant" },
        { q: "Give two reasons why the authorities were terrified of vagabonds.", a: "They believed they spread disease, committed crimes, and could start a rebellion" },
        { q: "Who wrote a famous pamphlet warning the public about the tricks used by vagabonds?", a: "Thomas Harman" },
        { q: "What was a 'Counterfeit Crank'?", a: "A beggar who faked epileptic fits using soap to get sympathy money" },
        { q: "What physical punishment was dictated by the 1572 Vagabonds Act for a first-time offence?", a: "Being whipped and having a hole burned through the right ear" },
        { q: "Under the 1572 Act, what was the punishment for being caught as a vagabond a third time?", a: "Execution" },
        { q: "What highly significant financial system did the 1572 Act introduce to help the impotent poor?", a: "The national Poor Rate" },
        { q: "Who was responsible for collecting the Poor Rate in local areas?", a: "Justices of the Peace / JPs" },
        { q: "What major economic reality did the 1576 Poor Relief Act finally recognise?", a: "That some able-bodied people wanted to work but simply couldn't find employment" },
        { q: "What did the 1576 Act order JPs to provide for the genuinely unemployed?", a: "Raw materials, like wool and hemp, to work with and sell" },
        { q: "What institutions were created under the 1576 Act to punish those who refused to work?", a: "Houses of Correction" },
        { q: "Why did the government ultimately transition from brutal punishment to national poor relief?", a: "They realised the sheer scale of the crisis could lead to starvation and a massive peasant rebellion if left ignored" }
    ],
    do_now: {
        type: "questions",
        tasks: [
            { q: "What was the name of the inexperienced Spanish commander who led the 1588 Armada?", a: "Duke of Medina Sidonia" },
            { q: "What does the term 'Humanism' mean in the context of Elizabethan education?", a: "A philosophical movement focused on learning, logic, and producing well-rounded scholars instead of just religious study." },
            { q: "Why were the Puritans so fiercely opposed to the theatre?", a: "They believed it encouraged sinful behaviour, drunkenness, and distracted people from prayer." },
            { q: "15 Second Challenge", a: "Try to speak for 15 seconds non-stop about the education of an Elizabethan girl." }
        ]
    }
};

const existingIndex = unitData.lessons.findIndex(l => l.id === "lesson_3_2");
if (existingIndex !== -1) {
    unitData.lessons[existingIndex] = newLesson;
} else {
    unitData.lessons.push(newLesson);
}

unitData.lessons.sort((a, b) => a.id.localeCompare(b.id));

const newIndividuals = [
    {
        "id": "thomas_harman",
        "name": "Thomas Harman",
        "role": "Author and Magistrate",
        "bio": "An Elizabethan magistrate who wrote a famous, sensationalist pamphlet in 1567 titled 'A Caveat for Common Cursitors'. He warned the public about the deceptive tricks used by vagabonds, fuelling a national moral panic.",
        "image": "/assets/placeholder_cover.jpg"
    }
];

newIndividuals.forEach(ind => {
    if (!unitData.key_individuals.find(k => k.id === ind.id)) {
        unitData.key_individuals.push(ind);
    }
});

fs.writeFileSync(dataFilePath, 'export const unitData = ' + JSON.stringify(unitData, null, 4) + ';\n', 'utf8');
console.log("Successfully injected lesson_3_2 to eee/data.js and added Thomas Harman.");
