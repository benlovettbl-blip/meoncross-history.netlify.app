import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, 'eee', 'data.js');
let content = fs.readFileSync(dataFilePath, 'utf8');

const newLesson = {
    id: "lesson_3_1",
    title: "KT3.1: Education and leisure",
    enquiry: "How did education and leisure activities reflect the strict social hierarchy of Elizabethan England, and why did the theatre emerge as such a revolutionary—and controversial—cultural phenomenon?",
    teacher_notes: {
        primer: "This lesson explores the strict social hierarchy of Elizabethan England through the lens of education and leisure, culminating in the cultural revolution of the theatre.",
        objectives: [
            {
                objective: "Understand the purpose of Elizabethan education and the influence of Humanist thinking and the printing press.",
                primer: "Highlight the role of Humanism and figures like Roger Ascham in driving educational reform.",
                question: "What movement acted as a catalyst for educational reform in Elizabethan England?"
            },
            {
                objective: "Analyse how the schooling system (Petty schools, Grammar schools, and Universities) was strictly divided by class and gender.",
                primer: "Discuss the stark inequality in education, especially the 10% literacy rate for women.",
                question: "What were the local schools called that provided basic education for young boys and some girls?"
            },
            {
                objective: "Explain the differences in leisure and sports between the nobility and the lower classes, including the universal popularity of 'cruel sports'.",
                primer: "Contrast the exclusive sports of the nobility with the violent pastimes of the lower classes, noting that cruel sports united them.",
                question: "What violent game was played by the lower classes between neighbouring villages?"
            },
            {
                objective: "Evaluate the reasons for the sudden explosion of the Elizabethan theatre and why it provoked such fierce opposition from Puritans and city authorities.",
                primer: "Explain how the ban on religious mystery plays and the 1572 Vagabonds Act shaped the secular theatre and the need for noble patronage.",
                question: "Which 1572 law meant actors could be whipped if they didn't have a noble license?"
            }
        ]
    },
    learning_objectives: {
        target: [
            "Understand the purpose of Elizabethan education and the influence of Humanist thinking and the printing press.",
            "Analyse how the schooling system (Petty schools, Grammar schools, and Universities) was strictly divided by class and gender.",
            "Explain the differences in leisure and sports between the nobility and the lower classes, including the universal popularity of 'cruel sports'.",
            "Evaluate the reasons for the sudden explosion of the Elizabethan theatre and why it provoked such fierce opposition from Puritans and city authorities."
        ],
        scaffolded: [
            "Describe the different types of schools in Elizabethan England.",
            "List some sports played by the nobility and the lower classes.",
            "Explain why the theatre was popular and why some people hated it."
        ]
    },
    do_now: {
        type: "standard",
        items: [
            { question: "Recall: What was the name of the inexperienced Spanish commander who led the 1588 Armada?", answer: "The Duke of Medina Sidonia" },
            { question: "Define: What were 'Dutch flyboats'?", answer: "Small Dutch rebel ships that blockaded the Duke of Parma's forces from meeting the Armada." },
            { question: "Explain: How did the 1584 Treaty of Joinville act as a political motivation for the Armada?", answer: "It formed a Catholic alliance between France and Spain, leaving Elizabeth surrounded and forcing her to sign the Treaty of Nonsuch." },
            { question: "15 Second Challenge: Try to speak for 15 seconds non-stop about the English use of fireships at Calais.", answer: "They were launched at midnight to break the Spanish defensive formation, causing panic and cut anchors." }
        ]
    },
    vocab: [
        { term: "Humanism", definition: "An intellectual movement that believed learning should not just be about religion, but should study human nature, science, and the classical world to produce highly educated, practical citizens." },
        { term: "Petty School", definition: "Small, local schools (often run by a local woman, hence sometimes called 'Dame Schools') where young boys and some girls learned basic reading, writing, and arithmetic." },
        { term: "Hornbook", definition: "A wooden board with a handle, covered in a transparent sheet of animal horn, displaying the alphabet and the Lord’s Prayer, used to teach children to read." },
        { term: "1572 Vagabonds Act", definition: "A strict law stating that anyone wandering the country without a license—including actors—could be severely punished or whipped. This forced actors to seek the protection of powerful nobles." },
        { term: "Cruel Sports", definition: "Highly popular, violent spectator pastimes involving animals, most notably bear-baiting and bull-baiting." }
    ],
    narrative_blocks: [
        {
            type: "text",
            text: "**The Purpose of Education**\nIn Elizabethan England, education was not about equality or social mobility; it was strictly about preparing people for their expected roles in life. The system was completely dominated by the social hierarchy. However, the period did see a slight expansion in education. This was largely driven by **Humanism**, championed by scholars like [Key Individual: Roger Ascham], which acted as a definitive *catalyst for* educational reform. Humanists believed that society could be improved through learning and that the wealthy had a duty to be highly educated to effectively serve the state. Furthermore, the growth of Protestantism encouraged people to learn to read the Bible in English, a trend rapidly accelerated by the invention of the printing press, which made books significantly cheaper."
        },
        {
            type: "task",
            task_type: "questions",
            questions: [
                "Identify the two main reasons why education slightly expanded during the Elizabethan era.",
                "Explain the fundamental difference between the modern view of education and the Elizabethan view."
            ]
        },
        {
            type: "text",
            text: "**The Schooling System: Class and Gender**\nDespite these changes, education remained a strict privilege.\n\n* **Petty Schools:** Children from the lower-middle classes (like prosperous farmers or craftsmen) might attend local Petty schools from the age of six, using a **hornbook** to learn basic literacy and maths. Girls rarely progressed beyond this stage; their education was heavily restricted to domestic skills (spinning, brewing, needlework) to prepare them for marriage.\n* **Grammar Schools:** For the sons of the gentry, merchants, and wealthy professionals, Grammar schools provided a rigorous education from age seven to fourteen. The curriculum was dominated by Latin, Greek, and classical philosophy. Discipline was incredibly harsh, with teachers frequently using the cane.\n* **University:** England had only two universities: Oxford and Cambridge. These were reserved for the sons of the nobility and the brightest scholars, focusing on geometry, music, philosophy, and law.\n\nUltimately, literacy rates rose during Elizabeth's reign (by 1603, roughly 30% of men could read), but the stark inequality remained: only around **10% of women** achieved literacy, and the vast majority of the labouring poor remained entirely uneducated, as their children were needed to work the land."
        },
        {
            type: "task",
            task_type: "questions",
            questions: [
                "Describe the typical curriculum and discipline experienced by a boy attending a Grammar School.",
                "Evaluate how the literacy statistics of 1603 (30% men, 10% women) reflect the gender inequality of Elizabethan schooling."
            ]
        },
        {
            type: "text",
            text: "**Leisure: A Divided Society**\nLeisure in Elizabethan England was *intrinsically linked* to a person's social class. The nobility possessed vast amounts of free time and wealth. Their sports were highly exclusive, including hunting on horseback, hawking (using trained birds of prey), fencing, and 'real tennis' (a complex, indoor version of the modern game).\n\nConversely, the lower classes engaged in brutal, chaotic pastimes. The most famous was **mob football**, a violently aggressive game played between neighbouring villages with almost no rules, which frequently resulted in severe injuries or even death.\n\nHowever, one area of leisure united all classes: **Cruel Sports**. Bear-baiting and bull-baiting (where a chained bear or bull was attacked by a pack of specially bred fighting dogs) were massively popular. Purpose-built arenas, like the Bear Garden in London, drew massive crowds, and even Queen Elizabeth herself was an enthusiastic fan, frequently commanding private exhibitions at court."
        },
        {
            type: "task",
            task_type: "questions",
            questions: [
                "Contrast the types of sports played by the nobility with those played by the lower classes.",
                "Explain why 'cruel sports' were considered a unique form of leisure that bridged the social divide."
            ]
        },
        {
            type: "text",
            text: "**The Golden Age of the Theatre**\nThe most revolutionary cultural shift of the era was the explosion of the theatre. Before Elizabeth's reign, wandering 'strolling players' primarily performed religious mystery plays. Elizabeth banned these plays in the 1570s to prevent Catholic and Protestant conflict. This ban acted as a powerful catalyst for playwrights—such as [Key Individual: Christopher Marlowe] and [Key Individual: William Shakespeare]—to write exciting, secular (non-religious) plays, such as comedies and violent tragedies.\n\nIn 1576, the first purpose-built theatre, **The Theatre**, opened in London, soon followed by The Rose and **The Globe**. The theatre was entirely unique because it mixed all social classes. For just one penny, the poorest citizens (the 'groundlings') could stand in the open-air pit, while the nobility paid to sit in the covered, cushioned galleries above.\n\nHowever, the theatre provoked intense fury from the Puritans, who argued that it was a den of sin that distracted people from prayer. This anger was *exacerbated* by the location of the theatres; they were built in the 'suburbs' outside the strict control of the City of London's Mayor, meaning they attracted thieves and prostitutes, and contributed heavily to the rapid spread of the bubonic plague. Furthermore, the **1572 Vagabonds Act** meant that actors were treated as criminals unless they had a license from a lord. Consequently, the theatre only survived because it was heavily protected by the Queen and powerful nobles who actively sponsored the acting companies, such as the Earl of Leicester's Men and the Lord Chamberlain's Men."
        },
        {
            type: "task",
            task_type: "exam_question",
            exam_format: "edexcel",
            question_type: "12_mark_explain",
            question: "Explain why the theatre became highly popular in Elizabethan England.",
            marks: 12,
            scaffolding: "To secure top marks, ensure you explain the *intersection* of causes rather than just listing facts.\n* **Paragraph 1 (Affordability/Design):** Explain how purpose-built theatres (like The Globe) were designed to accommodate all classes, making it affordable for groundlings (1 penny) while still appealing to the nobility.\n* **Paragraph 2 (Secular Plays):** Explain how the ban on religious mystery plays acted as a catalyst for exciting new secular genres (comedies/tragedies) by writers like Marlowe and Shakespeare, which were vastly more entertaining.\n* **Paragraph 3 (Royal Support):** Explain how the backing of Queen Elizabeth and powerful nobles (e.g., funding companies like the Lord Chamberlain's Men to bypass the 1572 Vagabonds Act) protected the theatres from furious Puritans, allowing them to thrive."
        },
        {
            type: "text",
            text: "### The Big Picture\nElizabethan education and leisure were highly effective mirrors of the era's rigid social hierarchy. Education expanded thanks to Humanism, the printing press, and Protestantism, but it remained fundamentally unequal, strictly ring-fencing opportunities based on gender and wealth. Similarly, sports like real tennis and mob football visually separated the elite from the masses. However, the late 16th century also saw the birth of a unified popular culture. Cruel sports and the booming new theatres provided shared spaces where, for a few hours, the glittering nobility and the illiterate groundlings experienced the exact same entertainment, creating a vibrant, albeit highly controversial, cultural golden age."
        }
    ],
    quiz: [
        { q: "What intellectual movement acted as a catalyst for educational reform in Elizabethan England?", a: "Humanism" },
        { q: "Which prominent Humanist scholar was Queen Elizabeth's personal tutor?", a: "Roger Ascham" },
        { q: "What invention significantly helped increase literacy by making books cheaper?", a: "The printing press" },
        { q: "What type of local school provided basic education for young boys and some girls?", a: "A Petty School / Dame School" },
        { q: "What wooden object covered in a transparent layer was used to teach children the alphabet?", a: "A hornbook" },
        { q: "What type of school did the sons of the gentry and merchants attend from age seven?", a: "A Grammar School" },
        { q: "Which language dominated the curriculum of the Elizabethan Grammar school?", a: "Latin" },
        { q: "Roughly what percentage of men, and what percentage of women, were literate by 1603?", a: "30% of men, 10% of women" },
        { q: "Name one exclusive sport played only by the nobility.", a: "Real tennis / Hawking / Fencing / Hunting on horseback" },
        { q: "What violently aggressive sport was played by the lower classes between neighbouring villages?", a: "Mob football" },
        { q: "Give two examples of 'cruel sports' popular in Elizabethan England.", a: "Bear-baiting and Bull-baiting" },
        { q: "What was the Queen's personal attitude towards bear-baiting?", a: "She loved it and frequently ordered private exhibitions" },
        { q: "What type of plays did Elizabeth ban in the 1570s to avoid religious conflict?", a: "Religious mystery plays" },
        { q: "Name one famous pioneering Elizabethan playwright other than Shakespeare.", a: "Christopher Marlowe" },
        { q: "In what year was the first purpose-built theatre (The Theatre) constructed?", a: "1576" },
        { q: "What was the nickname given to the poorest theatre-goers who stood in the open-air pit?", a: "Groundlings" },
        { q: "Which religious group furiously opposed the theatre, believing it was the work of the devil?", a: "The Puritans" },
        { q: "What 1572 law meant actors could be whipped if they didn't have a noble license?", a: "The Vagabonds Act" },
        { q: "Name one famous acting company sponsored by powerful nobility to protect them from the law.", a: "The Lord Chamberlain's Men / The Earl of Leicester's Men" },
        { q: "Why did the location of the theatres (outside the City walls) exacerbate opposition from authorities?", a: "They attracted crime/prostitutes beyond the Mayor's control and spread the Bubonic Plague" }
    ]
};

// Check if lesson_3_1 already exists to prevent duplication
if (content.includes('"id": "lesson_3_1"')) {
    console.log("Lesson 3.1 already exists in data.js. Overwriting...");
    // A simple regex might be dangerous here, so for safety we just delete it via careful string manipulation if needed,
    // but typically we can just parse the file, modify the object, and re-stringify.
    // Given data.js is a large string with export const unitData =, let's evaluate it, modify, and stringify.
    let jsonStr = content.replace(/export const unitData = |export default /g, '').trim();
    if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
    
    let unitData = eval('(' + jsonStr + ')');
    const existingIndex = unitData.lessons.findIndex(l => l.id === 'lesson_3_1');
    if (existingIndex !== -1) {
        unitData.lessons[existingIndex] = newLesson;
    } else {
        unitData.lessons.push(newLesson);
    }
    const newContent = 'export const unitData = ' + JSON.stringify(unitData, null, 4) + ';\n';
    fs.writeFileSync(dataFilePath, newContent, 'utf8');
} else {
    // Inject at the end of the lessons array
    const searchString = '        }';
    const lastBraceIndex = content.lastIndexOf('    "key_individuals":');
    let insertIndex = content.lastIndexOf('        }', lastBraceIndex);
    
    if (insertIndex !== -1) {
        const strToInsert = ',\n' + JSON.stringify(newLesson, null, 8).replace(/^/gm, '        ').trimStart();
        content = content.slice(0, insertIndex + 9) + strToInsert + content.slice(insertIndex + 9);
        fs.writeFileSync(dataFilePath, content, 'utf8');
        console.log("Successfully appended lesson_3_1 to eee/data.js");
    } else {
        console.error("Could not find insertion point.");
    }
}
