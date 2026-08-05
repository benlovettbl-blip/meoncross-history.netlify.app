const fs = require('fs');
const path = require('path');

const file = path.join('early_modern_world', 'data.js');
let raw = fs.readFileSync(file, 'utf8');

let jsonStr = raw.replace('export const unitData = ', '').replace(/;\s*$/, '');
let data = JSON.parse(jsonStr);

const lesson4 = {
    id: 'lesson_4',
    title: "Who controlled Britain: The King, Parliament, or Imperial Profits?",
    enquiry: "Who controlled Britain: The King, Parliament, or Imperial Profits?",
    teacher_notes: {
        primer: "This lesson explores the domestic constitutional crisis of the English Civil War, but uniquely connects it to the emerging Atlantic colonial wealth (sugar/tobacco). Students will evaluate whether political ideals or economic profits were the true drivers of Parliamentary victory and the Commonwealth.",
        objectives: [
            {
                objective: "Analyze why Charles I and Parliament fought the English Civil War (1642–1651).",
                primer: "Direct students to the tabs on 'The Crown' and 'Parliament' to understand the ideological clash between the Divine Right of Kings and Parliamentary consent.",
                question: "What was the 'Divine Right of Kings', and how did it lead Charles I into direct conflict with Parliament?"
            },
            {
                objective: "Evaluate how colonial wealth from sugar and tobacco reshaped British politics during the Commonwealth.",
                primer: "Use the 'Atlantic Merchants' tab and Source B to show how Caribbean sugar profits directly funded the New Model Army.",
                question: "How did the switch to sugar production in Barbados financially impact the outcome of the English Civil War?"
            },
            {
                objective: "Debate who held true power in Britain by 1660: the Monarchy, Parliament, or Atlantic Capitalists.",
                primer: "Use the Historical Interpretations section at the end of the lesson to have students weigh Prof. Hill's political view against Prof. Williams' economic view.",
                question: "Based on the evidence, was the English Civil War ultimately won by religious ideals or by mercantile wealth?"
            }
        ]
    },
    do_now: {
        title: "Do Now: Previous Knowledge",
        type: "questions",
        items: [
            { question: "What was the name of the first permanent English settlement in North America (1607)?", answer: "Jamestown" },
            { question: "Which cash crop saved the Jamestown colony from economic ruin?", answer: "Tobacco" },
            { question: "What type of business model was the East India Company (EIC), where multiple investors pooled money?", answer: "A Joint-Stock Company" },
            { question: "Which powerful Asian empire did Sir Thomas Roe visit in 1615?", answer: "The Mughal Empire" },
            { question: "Why were the English submissive traders in India, but aggressive conquerors in North America?", answer: "Because the Mughal Empire was vastly wealthier and militarily superior, whereas the Native Americans were initially vulnerable to English military tactics." }
        ]
    },
    vocab: [
        { term: "Divine Right of Kings", definition: "The belief that a monarch's authority comes directly from God, making them unaccountable to earthly authorities like Parliament." },
        { term: "New Model Army", definition: "A revolutionary, disciplined, and religiously motivated professional army formed by Parliament during the Civil War." },
        { term: "Commonwealth", definition: "The republic that ruled England from 1649 to 1660 following the execution of Charles I." },
        { term: "Plantation", definition: "An estate on which crops such as coffee, sugar, and tobacco are cultivated by resident labor, frequently enslaved labor." },
        { term: "Navigation Acts", definition: "Laws passed in 1651 requiring all trade between England and its colonies to be carried in English ships, boosting mercantile wealth." }
    ],
    narrative_blocks: [
        {
            title: "Micro-History: The Executioner’s Block (27 January 1649)",
            text: "At 2:00 PM on Tuesday, 30 January 1649, a man in a black velvet coat stepped out of a window of the Banqueting House in Whitehall, London, onto a wooden scaffold draped in black cloth.<br><br>The man was <strong>King Charles I</strong>. Below him stood thousands of silent onlookers, surrounded by ranks of iron-armored cavalry. For seven years, England had been ripped apart by a bloody Civil War that cost the lives of nearly 200,000 people—a higher proportion of the population than died in the First World War.<br><br>Charles put his head on the wooden block. He stretched out his hands—the prearranged signal—and the masked executioner’s axe severed his head with a single blow. The executioner held the dripping head aloft and shouted: <em>\"Behold the head of a traitor!\"</em><br><br>A collective groan echoed through the crowd. Never before in European history had a monarch been put on trial, condemned, and executed by his own Parliament.<br><br><strong>But who was really pulling the strings?</strong> Was this victory brought about by high-minded Parliamentary ideals of liberty? Or was it secretly fueled by a new class of ultra-rich Atlantic merchants whose sugar and tobacco profits were reshaping the British state?",
            image: "/images/charles_i_execution.jpg",
            image_alt: "Engraving of the execution of King Charles I",
            image_caption: "The execution of King Charles I outside the Banqueting House in Whitehall, 1649.",
            tasks: [
                {
                    type: "comprehension",
                    question: "Why was the execution of King Charles I such a shocking event in European history?",
                    model_answer: "It was shocking because never before in European history had a monarch been put on trial, condemned, and legally executed by his own Parliament and people."
                }
            ]
        },
        {
            title: "The Three-Way Tug-of-War for Power (1642–1660)",
            text: "To understand this chaotic era, we must investigate three competing forces battling for the soul—and wealth—of Britain.<br><br>" +
                "<div style=\"display: flex; flex-direction: column; align-items: center; gap: 20px; background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 20px 0;\">" +
                "    <div style=\"background: #ef4444; color: white; padding: 15px; border-radius: 8px; text-align: center; width: 60%; font-weight: bold;\">" +
                "        THE CROWN (Charles I)<br><span style=\"font-size: 0.9em; font-weight: normal;\">\"Divine Right of Kings\"</span>" +
                "    </div>" +
                "    <div style=\"display: flex; width: 100%; justify-content: space-between; align-items: center;\">" +
                "        <div style=\"background: #3b82f6; color: white; padding: 15px; border-radius: 8px; text-align: center; width: 42%; font-weight: bold;\">" +
                "            PARLIAMENT<br><span style=\"font-size: 0.9em; font-weight: normal;\">\"Godly Governance & Rights\"</span>" +
                "        </div>" +
                "        <div style=\"font-size: 1.5rem; font-weight: bold; color: #64748b;\">VS</div>" +
                "        <div style=\"background: #10b981; color: white; padding: 15px; border-radius: 8px; text-align: center; width: 42%; font-weight: bold;\">" +
                "            ATLANTIC MERCHANTS<br><span style=\"font-size: 0.9em; font-weight: normal;\">\"Sugar, Tobacco & Empire\"</span>" +
                "        </div>" +
                "    </div>" +
                "</div>" +
                "<br>" +
                "<div style=\"border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; margin-top: 20px;\">" +
                "    <div style=\"display: flex; background: #f1f5f9; border-bottom: 1px solid #cbd5e1;\">" +
                "        <button id=\"btn1\" onclick=\"document.getElementById('c1').style.display='block'; document.getElementById('c2').style.display='none'; document.getElementById('c3').style.display='none'; document.getElementById('btn1').style.background='#fff'; document.getElementById('btn2').style.background='#f1f5f9'; document.getElementById('btn3').style.background='#f1f5f9';\" style=\"flex: 1; padding: 10px; border: none; background: #fff; cursor: pointer; font-weight: bold; font-size: 1rem;\">1. The Crown</button>" +
                "        <button id=\"btn2\" onclick=\"document.getElementById('c1').style.display='none'; document.getElementById('c2').style.display='block'; document.getElementById('c3').style.display='none'; document.getElementById('btn1').style.background='#f1f5f9'; document.getElementById('btn2').style.background='#fff'; document.getElementById('btn3').style.background='#f1f5f9';\" style=\"flex: 1; padding: 10px; border: none; background: #f1f5f9; border-left: 1px solid #cbd5e1; border-right: 1px solid #cbd5e1; cursor: pointer; font-weight: bold; font-size: 1rem;\">2. Parliament</button>" +
                "        <button id=\"btn3\" onclick=\"document.getElementById('c1').style.display='none'; document.getElementById('c2').style.display='none'; document.getElementById('c3').style.display='block'; document.getElementById('btn1').style.background='#f1f5f9'; document.getElementById('btn2').style.background='#f1f5f9'; document.getElementById('btn3').style.background='#fff';\" style=\"flex: 1; padding: 10px; border: none; background: #f1f5f9; cursor: pointer; font-weight: bold; font-size: 1rem;\">3. Atlantic Merchants</button>" +
                "    </div>" +
                "    <div id=\"c1\" style=\"padding: 20px; display: block;\">" +
                "        <h3 style=\"margin-top: 0;\">Contender 1: The King & \"Divine Right\" (Charles I)</h3>" +
                "        <p>Charles I believed in the <strong>Divine Right of Kings</strong>—the conviction that God alone chose monarchs to rule, making royal authority absolute.</p>" +
                "        <ul><li><strong>The Spark:</strong> Between 1629 and 1640, Charles ruled without calling Parliament at all (<strong>The Eleven Years' Tyranny</strong>). To raise money without Parliament's consent, he forced illegal taxes on the nation, such as <strong>Ship Money</strong>.</li><li><strong>The Explosion:</strong> When Charles marched into the House of Commons with 400 armed soldiers in 1642 to arrest five MP leaders, Parliament revolted. War broke out: <strong>Royalists (Cavaliers)</strong> supporting the King vs. <strong>Parliamentarians (Roundheads)</strong> fighting for parliamentary consent.</li></ul>" +
                "    </div>" +
                "    <div id=\"c2\" style=\"padding: 20px; display: none;\">" +
                "        <h3 style=\"margin-top: 0;\">Contender 2: Parliament & Oliver Cromwell’s New Model Army</h3>" +
                "        <p>Parliament won the Civil War not because of noble speeches, but because of a revolutionary military machine: <strong>The New Model Army</strong>.</p>" +
                "        <p>Led by a strict Puritan country gentleman named <strong>Oliver Cromwell</strong>, this army was built on merit rather than noble birth. Soldiers sang religious psalms as they charged into battle at Naseby (1645) and Preston (1648).</p>" +
                "        <p>When Charles I was executed in 1649, monarchy was abolished. Britain was declared a republic: <strong>The Commonwealth of England</strong>. By 1653, Cromwell dismissed Parliament at swordpoint, taking total power as <strong>Lord Protector</strong>—a military dictator who banned Christmas, theater, and sports.</p>" +
                "    </div>" +
                "    <div id=\"c3\" style=\"padding: 20px; display: none;\">" +
                "        <h3 style=\"margin-top: 0;\">Contender 3: The Atlantic Merchant Elite</h3>" +
                "        <p>While Royalists and Roundheads were hacking each other to pieces on English battlefields, a silent economic revolution was happening in the Caribbean and North America.</p>" +
                "        <p>In the 1640s, English planters in <strong>Barbados</strong> transformed the island from tobacco farming to mass <strong>sugar plantation production</strong> powered by enslaved African labor. Sugar was nicknamed \"white gold.\"</p>" +
                "        <ul><li>A single acre of Barbados sugar produced <strong>ten times more profit</strong> than an acre of English wheat.</li><li>By 1650, Barbados generated more export wealth than all the North American colonies combined.</li></ul>" +
                "        <p><strong>The Hidden Link:</strong> The merchants who grew rich off Caribbean sugar and Virginian tobacco were almost all ardent supporters of Parliament. They hated Charles I because his royal monopolies interfered with their free trade. They poured millions into funding Cromwell’s New Model Army.</p>" +
                "        <p>When Cromwell took power, he used their money to build the <strong>Commonwealth Navy</strong> and passed the <strong>Navigation Acts (1651)</strong>—laws stating that all colonial goods had to be carried on English ships, effectively seizing global trade from the Dutch!</p>" +
                "    </div>" +
                "</div>",
            tasks: [
                {
                    type: "analysis",
                    question: "How did the Atlantic Merchants use their wealth to influence the outcome of the English Civil War?",
                    model_answer: "The Atlantic Merchants, who hated Charles I for his royal monopolies, used the immense profits from Caribbean sugar and Virginian tobacco to fund Parliament's New Model Army, effectively paying for the military machine that defeated the King."
                }
            ]
        },
        {
            title: "Investigation Station: Primary Source Evidence",
            text: "Work like a professional historian. Examine these three rare primary sources from the 1640s and 1650s to identify where the true power lay.<br><br><blockquote><strong>Source A: The Charge Against King Charles I (Read at his Trial, January 1649)</strong><br><em>\"That the said Charles Stuart, being admitted King of England, and therein trusted with a limited power to govern by and according to the laws of the land... hath traitorously and maliciously levied war against the present Parliament and the people therein represented... for the erecting and upholding to himself of an unlimited and tyrannical power.\"</em><br>— <strong>John Bradshaw</strong>, President of the High Court of Justice.</blockquote><br><br><blockquote><strong>Source B: A London Merchant’s Pamphlet on Sugar Profits (1654)</strong><br><em>\"This small island of Barbados doth yield more wealth to the Commonwealth than any kingdom in Europe... Our ships return laden with sweetness, paying thousands in customs to the state, and maintaining hundreds of brave sailors. Without the trade of the West Indies, the New Model Army would starve for want of pay.\"</em><br>— <strong>Adapted from a pamphlet by Martin Noell</strong>, London merchant and slave trader.</blockquote><br><br><blockquote><strong>Source C: Oliver Cromwell’s Speech Dismissing the Rump Parliament (1653)</strong><br><em>\"It is high time for me to put an end to your sitting in this place, which you have dishonoured by your contempt of all virtue... You are an factious crew! Ye are noblemen for gold; ye are lovers of money, not justice! In the name of God, go!\"</em><br>— <strong>Oliver Cromwell</strong>, speaking to MPs on 20 April 1653 before locking the doors of Parliament.</blockquote>",
            tasks: [
                {
                    type: "source_analysis",
                    question: "How does Source B reveal a completely different reason for Parliament’s victory over the King compared to the official reason given in Source A?",
                    model_answer: "Source A gives an official, ideological reason for victory, claiming Parliament was defending the laws of the land against a 'tyrannical' King. Source B reveals the hidden economic truth: Parliament won because of immense wealth generated by Barbados sugar, stating directly that without it, the 'New Model Army would starve for want of pay'."
                },
                {
                    type: "source_analysis",
                    question: "Look at Source C. What does Cromwell accuse MPs of becoming? Why is this ironic given that merchant wealth helped bring Cromwell to power?",
                    model_answer: "Cromwell accuses MPs of becoming 'lovers of money' and corrupt ('noblemen for gold'). This is highly ironic because Cromwell himself relied entirely on the massive financial wealth of the Atlantic merchants to build and fund his New Model Army and secure his rise to power."
                },
                {
                    type: "source_analysis",
                    question: "How reliable is Source A as an objective record of Charles I’s reign?",
                    model_answer: "Source A is highly unreliable as an objective record because it was written by John Bradshaw, the President of the High Court trying the King. It is a highly biased political document designed to justify the predetermined outcome of executing Charles I, portraying him solely as a 'traitor' and 'tyrant'."
                }
            ]
        },
        {
            title: "Visual Analysis: The Great Seal of the Commonwealth (1651)",
            text: "Look closely at the <strong>1651 Great Seal of England</strong>, created after the King’s execution:<br><br><ul><li><strong>No Royal Crown or Arms:</strong> For 600 years, the Great Seal bore the face of the ruling King or Queen on a horse. In 1651, the King’s face was completely erased.</li><li><strong>The House of Commons Side:</strong> Shows hundreds of MPs sitting in Parliament with the motto: <em>\"In the First Year of Freedom by God's Blessing Restored.\"</em></li><li><strong>The Map Side:</strong> Shows a detailed map of England, Ireland, and naval ships sailing in the Atlantic, emphasizing maritime power and imperial expansion over royal bloodlines.</li></ul>",
            image: "/images/oliver_cromwell.jpg",
            image_alt: "Portrait of Oliver Cromwell",
            image_caption: "Portrait of Oliver Cromwell, who ruled as Lord Protector after the execution of King Charles I.",
            tasks: [
                {
                    type: "analysis",
                    question: "What did the design of the 1651 Great Seal signal about Britain's new priorities compared to the previous 600 years?",
                    model_answer: "By replacing the traditional image of the monarch with Parliament and a map showing naval ships, the Great Seal signaled that Britain was no longer defined by royal bloodlines, but by parliamentary governance, maritime strength, and imperial expansion."
                }
            ]
        },
        {
            title: "Historical Interpretations: Who Was the Real Winner?",
            text: "In 1660, after Cromwell died, Britain restored the monarchy, inviting Charles I’s son, <strong>Charles II</strong>, back to the throne (<strong>The Restoration</strong>). But did things really go back to how they were?<br><br><blockquote><strong>Interpretation 1: The Political View (Prof. Christopher Hill, 1961)</strong><br><em>\"The Execution of Charles I permanently smashed the Divine Right of Kings. Though Charles II returned in 1660, no British monarch would ever again rule without Parliament’s consent or impose taxes without their vote.\"</em></blockquote><br><br><blockquote><strong>Interpretation 2: The Imperial/Economic View (Prof. Eric Williams, 1944)</strong><br><em>\"The true victor of the Civil War was neither the King nor Parliament; it was the Atlantic mercantile class. The sugar of Barbados and the tobacco of Virginia created a political force so wealthy that no King or Parliament could ever again govern Britain without prioritizing imperial trade.\"</em></blockquote>",
            tasks: [
                {
                    type: "comprehension",
                    question: "How do Interpretation 1 and Interpretation 2 differ in identifying the true 'winner' of the Civil War?",
                    model_answer: "Interpretation 1 argues that Parliament and democratic political ideals were the winners, as the monarchy could never again rule absolutely without their consent. Interpretation 2 argues that the true winners were neither the King nor Parliament, but the wealthy Atlantic merchants whose colonial profits made them the permanent driving force of British politics."
                }
            ]
        }
    ],
    quiz: [
        {
            q: "What political belief held that kings were chosen directly by God and possessed absolute power?",
            a: "The Divine Right of Kings",
            distractors: ["Constitutional Monarchy", "Papal Infallibility", "Parliamentary Sovereignty"]
        },
        {
            q: "What was the name of the illegal tax on coastal (and later inland) towns revived by Charles I during his Eleven Years' Tyranny?",
            a: "Ship Money",
            distractors: ["The Window Tax", "The Hearth Tax", "The Poll Tax"]
        },
        {
            q: "On what date was King Charles I executed outside the Banqueting House in London?",
            a: "30 January 1649",
            distractors: ["4 July 1776", "5 November 1605", "15 June 1215"]
        },
        {
            q: "What was the name of Parliament’s disciplined, professional military force created during the Civil War?",
            a: "The New Model Army",
            distractors: ["The Royalist Vanguard", "The Continental Army", "The Home Guard"]
        },
        {
            q: "Who served as the commander of the New Model Army and later became 'Lord Protector' of England?",
            a: "Oliver Cromwell",
            distractors: ["Prince Rupert", "Sir Thomas Fairfax", "John Pym"]
        },
        {
            q: "What formal title was given to the English republic that ruled between 1649 and 1660?",
            a: "The Commonwealth of England",
            distractors: ["The United Kingdom", "The First British Empire", "The English Federation"]
        },
        {
            q: "Which Caribbean island became the wealthy engine of the English empire in the 1640s due to mass sugar production?",
            a: "Barbados",
            distractors: ["Jamaica", "Cuba", "Bermuda"]
        },
        {
            q: "What set of maritime trade laws passed in 1651 required all colonial imports to be carried on English ships?",
            a: "The Navigation Acts",
            distractors: ["The Sugar Acts", "The Stamp Acts", "The Trade and Revenue Acts"]
        },
        {
            q: "Which religious group, led by Cromwell, sought to 'purify' the Church of England and banned traditional pastimes like Christmas?",
            a: "The Puritans",
            distractors: ["The Catholics", "The Quakers", "The Methodists"]
        },
        {
            q: "What event in 1660 brought Charles II back to the throne, ending the Commonwealth era?",
            a: "The Restoration",
            distractors: ["The Glorious Revolution", "The Norman Conquest", "The Reformation"]
        }
    ]
};

const idx = data.lessons.findIndex(l => l.id === 'lesson_4');
if (idx !== -1) {
    data.lessons[idx] = lesson4;
} else {
    data.lessons.splice(3, 0, lesson4);
}

const out = `export const unitData = ${JSON.stringify(data, null, 4)};\n`;
fs.writeFileSync(file, out);
console.log("Successfully injected Lesson 4 into early_modern_world/data.js");
