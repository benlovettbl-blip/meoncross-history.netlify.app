import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, 'eee', 'data.js');
let data = fs.readFileSync(dataPath, 'utf8');

const doNows = {
    "lesson_1_1": [
        { "question": "Who was Elizabeth I's father?" },
        { "question": "Which religion did Elizabeth's sister, Mary I, ruthlessly enforce during her reign?" },
        { "question": "What is the term used to describe the head of the Catholic Church?" },
        { "question": "Why was England's economy struggling prior to 1558?" },
        { "question": "Why did many Catholics believe Elizabeth was illegitimate and had no right to the throne?" }
    ],
    "lesson_1_2": [
        { "question": "In what year did Elizabeth I become Queen of England?" },
        { "question": "How much debt was the Crown in when Elizabeth took over?" },
        { "question": "Which European superpower, allied with Scotland, posed a massive invasion threat in 1558?" },
        { "question": "Why was Elizabeth's gender considered a serious weakness by 16th-century society?" },
        { "question": "Explain how the French threat and the 'Auld Alliance' forced Elizabeth to be cautious during her first year." }
    ],
    "lesson_1_3": [
        { "question": "What was the name of the peace treaty Elizabeth signed with France in 1559?" },
        { "question": "What title did Elizabeth give herself in the Act of Supremacy to appease both Catholics and Protestants?" },
        { "question": "What did the Act of Uniformity dictate about church services and appearances?" },
        { "question": "How did the Church of England act as a mechanism for social control for the government?" },
        { "question": "Why might a strict Puritan be deeply angered by the compromises made in the Religious Settlement?" }
    ],
    "lesson_1_4": [
        { "question": "What was the role of the 'Royal Visitations' in enforcing the Religious Settlement?" },
        { "question": "Which extreme Protestant group wanted to completely remove all traces of Catholicism from the Church?" },
        { "question": "What was the 'Crucifix Controversy'?" },
        { "question": "Why was the Papal Bull of Excommunication (1570) such a dangerous turning point for Elizabeth?" },
        { "question": "Explain how the Revolt of the Northern Earls (1569) proved that the Catholic threat was severe." }
    ],
    "lesson_2_1": [
        { "question": "How was Mary, Queen of Scots related to Elizabeth I?" },
        { "question": "Why did Mary, Queen of Scots flee to England in 1568?" },
        { "question": "What did the Pope do in 1570 that actively encouraged Catholics to rebel against Elizabeth?" },
        { "question": "Why did Elizabeth choose to imprison Mary rather than execute her or send her back to Scotland?" },
        { "question": "Explain how Mary's presence in England acted as a 'magnet' for Catholic plotters." }
    ],
    "lesson_2_2": [
        { "question": "Which 1569 rebellion was the first major Catholic attempt to overthrow Elizabeth?" },
        { "question": "Who was the mastermind behind the 1571 plot to assassinate Elizabeth and replace her with Mary?" },
        { "question": "How did Francis Walsingham use spy networks to protect the Queen?" },
        { "question": "Why was the Babington Plot (1586) the final straw for Mary, Queen of Scots?" },
        { "question": "Explain how Walsingham's interception of the Babington letters provided the undeniable proof needed for Mary's execution." }
    ],
    "lesson_2_3": [
        { "question": "In what year was Mary, Queen of Scots executed?" },
        { "question": "Who was the powerful Catholic King of Spain during Elizabeth's reign?" },
        { "question": "What was a 'privateer' and how did Elizabeth use them against Spain?" },
        { "question": "Why was Philip II of Spain angered by Elizabeth's support of the Dutch rebels?" },
        { "question": "Explain how Francis Drake's circumnavigation and raids on Spanish treasure ships increased tensions between England and Spain." }
    ],
    "lesson_2_4": [
        { "question": "What was the name of the treaty in 1585 where Elizabeth officially agreed to help the Dutch Protestant rebels?" },
        { "question": "Who did Elizabeth send to the Netherlands to command the English army?" },
        { "question": "What did Francis Drake do at Cadiz in 1587?" },
        { "question": "Why did Drake's raid on Cadiz become known as 'singeing the King of Spain's beard'?" },
        { "question": "Explain how the Treaty of Nonsuch and the raid on Cadiz made open warfare with Spain inevitable." }
    ],
    "lesson_3_1": [
        { "question": "What formation did the Spanish Armada use to sail up the English Channel?" },
        { "question": "What tactic did the English use at the Battle of Gravelines to break the Spanish formation?" },
        { "question": "Who was the commander of the Spanish Armada?" },
        { "question": "Why did the Spanish ships have to flee north around Scotland and Ireland?" },
        { "question": "Explain how the 'Protestant Wind' and English ship design contributed to the catastrophic failure of the Armada." }
    ],
    "lesson_3_2": [
        { "question": "In Elizabethan society, what was the 'Great Chain of Being'?" },
        { "question": "Name one leisure activity enjoyed exclusively by the nobility." },
        { "question": "What was the most popular and affordable form of entertainment for the lower classes in London?" },
        { "question": "Why were the Puritans strongly opposed to the theatre?" },
        { "question": "Explain how education in Elizabethan England was highly dependent on a person's gender and social class." }
    ],
    "lesson_3_3": [
        { "question": "What was the term used to describe homeless people who moved from parish to parish looking for work?" },
        { "question": "Which Elizabethan law categorised the poor into the 'deserving' and the 'idle'?" },
        { "question": "Why did population growth contribute to the poverty crisis?" },
        { "question": "How did the enclosure of land for sheep farming negatively impact rural labourers?" },
        { "question": "Explain why the Elizabethan government was terrified of vagabonds and why they eventually introduced the Poor Law of 1601." }
    ],
    "lesson_3_4": [
        { "question": "Who was the first Englishman to successfully circumnavigate the globe?" },
        { "question": "What was the name of Drake's famous ship?" },
        { "question": "Why was the astrolabe crucial for Elizabethan explorers?" },
        { "question": "How did the desire to break the Spanish monopoly on the New World drive English exploration?" },
        { "question": "Explain how the voyages of discovery not only brought immense wealth to England but also increased international prestige." }
    ]
};

let matchCount = 0;

for (const [lessonId, questions] of Object.entries(doNows)) {
    // We need to inject the do_now object into the lesson object.
    // The lesson object starts with "id": "lessonId",
    const regex = new RegExp(`"id":\\s*"${lessonId}"[\\s\\S]*?(?="enquiry":|teacher_notes|fun_facts)`);
    // Instead of complex AST, let's find the position of "id": "lessonId" and insert after the "title" or "enquiry".
    
    // Find exact block of the lesson
    const lessonStartRegex = new RegExp(`"id":\\s*"${lessonId}",\\s*"title":\\s*"[^"]+",\\s*"enquiry":\\s*"[^"]+",`);
    const match = data.match(lessonStartRegex);
    
    if (match) {
        const doNowObj = {
            type: "retrieval",
            questions: questions
        };
        const doNowStr = `\n            "do_now": ${JSON.stringify(doNowObj, null, 16).replace(/\\n/g, '\n').replace(/                /g, '            ')},`;
        
        data = data.replace(match[0], match[0] + doNowStr);
        matchCount++;
    } else {
        console.log(`Failed to find insertion point for ${lessonId}`);
    }
}

fs.writeFileSync(dataPath, data, 'utf8');
console.log(`Successfully injected ${matchCount} do_now objects.`);
