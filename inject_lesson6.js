const fs = require('fs');
const path = require('path');

const file = path.join('early_modern_world', 'data.js');
let raw = fs.readFileSync(file, 'utf8');

let jsonStr = raw.replace('export const unitData = ', '').replace(/;\s*$/, '');
let data = JSON.parse(jsonStr);

const lesson6 = {
    id: 'lesson_6',
    title: "How 'modern' was Britain by 1750? (Synthesis & Assessment)",
    enquiry: "How 'modern' was Britain by 1750? (Periodisation and synoptic essay synthesis)",
    teacher_notes: {
        primer: "This is the final synoptic assessment lesson for the 1450-1750 unit. It requires students to weigh the 'pro-modern' elements (finance, empire, infrastructure) against the 'un-modern' realities (poverty, slavery, political inequality) and synthesize them into an essay.",
        objectives: [
            {
                objective: "Define what historians mean by a 'modern' state in the context of 18th-century Europe.",
                primer: "Review the '1450 vs 1750' flowchart and prompt students to define modernity.",
                question: "What specific economic and political institutions made Britain look 'modern' by 1750?"
            },
            {
                objective: "Synthesise domestic social realities with imperial/commercial expansion across the period 1450–1750.",
                primer: "Use the toggle tabs ('Argument A' vs 'Argument B') to help students categorize the evidence.",
                question: "How did the wealth of the British Empire contrast with the lives of the poor in London slums?"
            },
            {
                objective: "Construct a high-level, structured synoptic essay evaluating the extent of Britain's 'modernity' by 1750.",
                primer: "Direct students to the Essay Synthesis Builder at the bottom of the page to plan their 4-paragraph essay.",
                question: "What is your nuanced overall judgment regarding Britain's modernity by 1750?"
            }
        ]
    },
    do_now: {
        title: "Do Now: Previous Knowledge",
        type: "questions",
        items: [
            { question: "What is 'chattel slavery'?", answer: "A system where human beings are legally defined as personal property to be bought and sold." },
            { question: "What was the 'Middle Passage'?", answer: "The horrific forced voyage of enslaved Africans across the Atlantic Ocean." },
            { question: "Who were the 'Maroons' in Jamaica?", answer: "Communities of formerly enslaved people who escaped and established free autonomous settlements." },
            { question: "Who was Olaudah Equiano?", answer: "A formerly enslaved African who published a bestselling autobiography exposing the horrors of slavery." },
            { question: "How did the British government compensate slave owners in 1833?", answer: "They paid them £20 million for their 'loss of property'." }
        ]
    },
    vocab: [
        { term: "Modernity", definition: "In history, the transition away from traditional, agricultural, feudal societies towards commercial, secular, and industrialized ones." },
        { term: "Synoptic", definition: "Taking a comprehensive mental view of a wide series of events across a long period of time." },
        { term: "National Debt", definition: "Money borrowed by a government (often via a central bank like the Bank of England) to fund state activities like war." },
        { term: "Rotten Borough", definition: "A tiny parliamentary constituency with very few voters, easily bought or controlled by a wealthy aristocrat." },
        { term: "The Bloody Code", definition: "The harsh 18th-century English legal system which mandated the death penalty for over 200 minor crimes." }
    ],
    narrative_blocks: [
        {
            title: "Micro-History: The Contrast of London Bridge (1750)",
            text: "In October 1750, a French aristocrat named Pierre-Jean Grosley stood on London Bridge and looked out over the River Thames.<br><br>To his right, he saw a forest of wooden masts belonging to over 1,000 merchant ships. These vessels had arrived from Canton, Calcutta, Barbados, and Virginia, packed with tea, silk, raw sugar, and tobacco. Nearby stood the <strong>Bank of England</strong> and the <strong>Royal Exchange</strong>, where stockbrokers traded paper credit, fire insurance, and national debt using complex mathematics that stunned the rest of Europe. London was the financial beating heart of a global, capitalist empire.<br><br>Then Grosley walked off the bridge and turned into the narrow alleys of St. Giles.<br><br>Within five minutes, the scent of expensive Indian spices was replaced by the stench of open sewage, rotting garbage, and cheap gin. He passed desperate mothers pouring raw grain spirit down the throats of crying infants to quiet them. In these slums, 50% of children died before the age of five. Medical care still relied on bloodletting with leeches, public executions at Tyburn Tree drew crowds of 30,000 howling spectators, and women had zero legal rights, remaining the legal property of their husbands.<br><br>Grosley was left with a baffling paradox: <strong>Was Britain in 1750 a hyper-modern global superpower, or a brutal, unequal medieval society wearing a wig?</strong>",
            image: "/images/gin_lane.jpg",
            image_alt: "William Hogarth's Gin Lane",
            image_caption: "William Hogarth's 1751 engraving 'Gin Lane' depicts the horrifying social decay, poverty, and alcohol addiction rampant in 18th-century London slums.",
            tasks: [
                {
                    type: "comprehension",
                    question: "What was the 'baffling paradox' that Grosley observed in London in 1750?",
                    model_answer: "The paradox was the extreme contrast between Britain's hyper-modern global wealth and complex financial systems (seen on the river and at the Bank of England) and the brutal, un-modern, diseased poverty found just streets away in the slums of St. Giles."
                }
            ]
        },
        {
            title: "Macro-History: Weighing the Evidence (1450 vs. 1750)",
            text: "To answer our key enquiry, we must step back and examine the transformation of Britain over the entire 300-year span of this unit.<br><br>" +
                "<div style=\"background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px; font-family: monospace; text-align: center; margin-bottom: 20px;\">" +
                "  <div style=\"background: #475569; color: white; padding: 10px; border-radius: 6px; font-weight: bold;\">1450: FEUDAL & ISOLATED</div>" +
                "  <p style=\"color: #64748b; font-size: 0.9rem;\">• Absolute Monarchy • Subsistence Agriculture • Regional Trade • No Colonies</p>" +
                "  <div style=\"font-size: 1.5rem; color: #94a3b8; margin: 10px 0;\">⬇ [300 YEARS OF TRANSFORMATION] ⬇</div>" +
                "  <div style=\"background: #0f172a; color: white; padding: 10px; border-radius: 6px; font-weight: bold; margin-bottom: 10px;\">1750: THE PRE-INDUSTRIAL STATE</div>" +
                "  <div style=\"display: flex; gap: 10px;\">" +
                "    <div style=\"flex: 1; background: #ecfdf5; border: 1px solid #10b981; padding: 15px; border-radius: 6px; text-align: left;\">" +
                "       <strong style=\"color: #059669;\">✅ PRO-MODERN ELEMENTS</strong><br>" +
                "       <ul style=\"padding-left: 15px; margin: 5px 0; font-size: 0.85rem; line-height: 1.5; color: #065f46;\">" +
                "         <li>Constitutional Monarchy</li><li>Global Commercial Empire</li><li>Financial System (Bank of England)</li><li>Early Infrastructure (Turnpikes)</li>" +
                "       </ul>" +
                "    </div>" +
                "    <div style=\"flex: 1; background: #fef2f2; border: 1px solid #ef4444; padding: 15px; border-radius: 6px; text-align: left;\">" +
                "       <strong style=\"color: #dc2626;\">❌ UN-MODERN REALITIES</strong><br>" +
                "       <ul style=\"padding-left: 15px; margin: 5px 0; font-size: 0.85rem; line-height: 1.5; color: #991b1b;\">" +
                "         <li>Disenfranchisement (<5% vote)</li><li>Brutal 'Bloody Code'</li><li>Empire built on slavery</li><li>Pre-Industrial Technology</li>" +
                "       </ul>" +
                "    </div>" +
                "  </div>" +
                "</div>" +
                "Explore the two sides of the argument below to decide if Britain was truly 'modern':<br><br>" +
                "<div style=\"border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; margin-top: 15px;\">" +
                "    <div style=\"display: flex; background: #f1f5f9; border-bottom: 1px solid #cbd5e1;\">" +
                "        <button id=\"argBtn1\" onclick=\"document.getElementById('arg1').style.display='block'; document.getElementById('arg2').style.display='none'; this.style.background='#fff'; this.nextElementSibling.style.background='#f1f5f9';\" style=\"flex: 1; padding: 12px; border: none; background: #fff; cursor: pointer; font-weight: bold; font-size: 1rem; color: #059669;\">Argument A: Global Wealth (Modern)</button>" +
                "        <button id=\"argBtn2\" onclick=\"document.getElementById('arg1').style.display='none'; document.getElementById('arg2').style.display='block'; this.style.background='#fff'; this.previousElementSibling.style.background='#f1f5f9';\" style=\"flex: 1; padding: 12px; border: none; background: #f1f5f9; border-left: 1px solid #cbd5e1; cursor: pointer; font-weight: bold; font-size: 1rem; color: #dc2626;\">Argument B: Domestic Reality (Un-Modern)</button>" +
                "    </div>" +
                "    <div id=\"arg1\" style=\"padding: 25px; display: block; background: #fff;\">" +
                "        <h3 style=\"margin-top: 0; color: #059669;\">Britain Was Superbly \"Modern\" by 1750</h3>" +
                "        <ul style=\"line-height: 1.8; font-size: 1.05rem;\">" +
                "            <li><strong>Constitutional Balance:</strong> The Civil War (1642–1651) and Glorious Revolution (1688) permanently ended absolute royal tyranny. King George II governed <em>through</em> Parliament.</li>" +
                "            <li><strong>The Financial Revolution:</strong> Founded in 1694, the <strong>Bank of England</strong> invented the modern system of national debt and paper banknotes, allowing Britain to out-finance rivals.</li>" +
                "            <li><strong>Global Economic Integration:</strong> British citizens drank tea from China, sweetened with Caribbean sugar, smoked Virginia tobacco, and wore Bengal cotton.</li>" +
                "            <li><strong>Transport Infrastructure:</strong> By 1750, over 1,500 miles of <strong>Turnpike Roads</strong> (paved toll roads) connected London to provincial towns, cutting travel times in half.</li>" +
                "        </ul>" +
                "    </div>" +
                "    <div id=\"arg2\" style=\"padding: 25px; display: none; background: #fff;\">" +
                "        <h3 style=\"margin-top: 0; color: #dc2626;\">Britain Remained Profoundly \"Un-Modern\" by 1750</h3>" +
                "        <ul style=\"line-height: 1.8; font-size: 1.05rem;\">" +
                "            <li><strong>Political Inequality:</strong> Parliament was controlled entirely by wealthy aristocrats. Less than <strong>5% of the male population</strong> had the right to vote. Rotten boroughs bought and sold elections.</li>" +
                "            <li><strong>The \"Bloody Code\":</strong> The legal system terrorized criminals. Over 200 offenses carried the death penalty, including stealing a sheep or picking a pocket.</li>" +
                "            <li><strong>An Empire Built on Slavery:</strong> Britain’s economic \"modernity\" was completely reliant on the barbaric machinery of the Transatlantic Slave Trade.</li>" +
                "            <li><strong>Pre-Industrial Technology:</strong> In 1750, 80% of the population still lived in rural villages. Factories did not yet exist. Power came from human muscles, horses, wind, and water.</li>" +
                "        </ul>" +
                "    </div>" +
                "</div>",
            image: "/images/royal_exchange.jpg",
            image_alt: "18th-century painting of the Royal Exchange",
            image_caption: "The bustling Royal Exchange in London, where global merchants traded stocks, insurance, and commodities, representing Britain's financial modernity.",
            tasks: [
                {
                    type: "analysis",
                    question: "Using the toggle tabs, identify one piece of political evidence that proves Britain was modern, and one piece of political evidence proving it was un-modern.",
                    model_answer: "Pro-modern political evidence is that the Glorious Revolution ended absolute tyranny and established a Constitutional Monarchy. Un-modern political evidence is that less than 5% of the male population could vote and Parliament was deeply corrupt with 'rotten boroughs'."
                }
            ]
        },
        {
            title: "Primary Source Analysis: The Dual Reality",
            text: "Analyze these two contrasting contemporary accounts written in the mid-18th century.<br><br>" +
                "<blockquote style=\"border-left: 5px solid #3b82f6; padding-left: 15px; margin-left: 0; background: #f8fafc; padding: 15px; border-radius: 4px;\">" +
                "<strong>Source A: From a German Visitor's Diary (Pehr Kalm, 1748)</strong><br>" +
                "<em>\"In England, even the common country people live well and wear clean linen. Their homes are built of brick or stone, not clay. Every village hath its turnpike road, and goods are transported with incredible speed by wagon and barge. The law protects the poorest peasant from the nobleman; no man may be imprisoned without trial. In commerce and freedom of speech, Britain is two hundred years ahead of the continent.\"</em>" +
                "</blockquote>" +
                "<br>" +
                "<blockquote style=\"border-left: 5px solid #ef4444; padding-left: 15px; margin-left: 0; background: #fef2f2; padding: 15px; border-radius: 4px;\">" +
                "<strong>Source B: From a London Magistrate's Report on Crime (Henry Fielding, 1751)</strong><br>" +
                "<em>\"The streets of this great city are daily rendered unsafe by bands of armed footpads and cutpurses... Multitudes of wretches perish annually of sheer cold and gin-poisoning in the cellars of St. Giles, unheeded by any magistrate. Our prisons are foul dens of typhus fever where accused men rot for months before trial. We boast of our liberties, yet our poor live in a state of barbarism lower than the beasts.\"</em>" +
                "</blockquote>",
            image: "/images/turnpike_map.jpg",
            image_alt: "Map of London Turnpikes 1746",
            image_caption: "An 18th-century map showing the expansion of turnpike roads across London and surrounding regions, rapidly increasing the speed of internal trade.",
            tasks: [
                {
                    type: "source_analysis",
                    question: "Reconciling Contradictions: How can Source A and Source B offer completely opposite views of Britain in the late 1740s/1750s without either author necessarily lying?",
                    model_answer: "The sources do not contradict each other; they reflect extreme class and geographical inequality. Source A describes the rising prosperity of the middle classes and infrastructure across the country, while Source B focuses entirely on the extreme, diseased poverty and crime of the urban underclass in London slums."
                },
                {
                    type: "source_analysis",
                    question: "Analyzing Audience & Purpose: Why would Henry Fielding (Source B), a London magistrate, exaggerate the chaos and crime in London in 1751?",
                    model_answer: "As a magistrate, Fielding's purpose was likely to convince Parliament or the government to give him more funding, pass stricter laws, or establish a proper police force to help him control crime."
                },
                {
                    type: "source_analysis",
                    question: "Synthesis Challenge: Combine the insights from Sources A and B with your knowledge of the Atlantic Slave Trade to write a nuanced 3-sentence summary of British society in 1750.",
                    model_answer: "By 1750, Britain was a society of extreme contradictions, boasting a global commercial empire funded by the brutal exploitation of the Transatlantic Slave Trade. While the middle classes enjoyed unprecedented wealth, constitutional rights, and modern infrastructure, the vast majority of the urban poor lived in disease-ridden slums ruled by a terrifying criminal code. Therefore, Britain's 'modernity' was only a glittering veneer applied to a deeply unequal society."
                }
            ]
        },
        {
            title: "Historiographical Debate: 'The First Modern Society'?",
            text: "<div style=\"border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; margin-top: 15px;\">" +
                "    <div style=\"display: flex; background: #f1f5f9; border-bottom: 1px solid #cbd5e1;\">" +
                "        <button id=\"histBtn1\" onclick=\"document.getElementById('hist1').style.display='block'; document.getElementById('hist2').style.display='none'; this.style.background='#fff'; this.nextElementSibling.style.background='#f1f5f9';\" style=\"flex: 1; padding: 12px; border: none; background: #fff; cursor: pointer; font-weight: bold; font-size: 1rem; color: #1e40af;\">Interpretation A: Roy Porter</button>" +
                "        <button id=\"histBtn2\" onclick=\"document.getElementById('hist1').style.display='none'; document.getElementById('hist2').style.display='block'; this.style.background='#fff'; this.previousElementSibling.style.background='#f1f5f9';\" style=\"flex: 1; padding: 12px; border: none; background: #f1f5f9; border-left: 1px solid #cbd5e1; cursor: pointer; font-weight: bold; font-size: 1rem; color: #b45309;\">Interpretation B: J.C.D. Clark</button>" +
                "    </div>" +
                "    <div id=\"hist1\" style=\"padding: 25px; display: block; background: #f0f9ff;\">" +
                "        <h4 style=\"margin-top: 0; color: #1e40af;\">Historian Perspective A: Professor Roy Porter (1990)</h4>" +
                "        <p><em>\"By 1750, Britain was already the world’s first modern, secular, consumer society. It possessed a constitutional government, a vibrant free press, unmatched global trade, and an enterprising middle class that valued property, science, and progress.\"</em></p>" +
                "    </div>" +
                "    <div id=\"hist2\" style=\"padding: 25px; display: none; background: #fff7ed;\">" +
                "        <h4 style=\"margin-top: 0; color: #b45309;\">Historian Perspective B: Professor J.C.D. Clark (1985)</h4>" +
                "        <p><em>\"18th-century Britain was not a 'modern' nation; it was an Ancien Régime—a deeply traditional, aristocratic, and religious society dominated by the Anglican Church, wealthy landowners, and a hereditary monarchy. Most people’s daily lives were governed by ancient custom, local isolated community, and rural poverty.\"</em></p>" +
                "    </div>" +
                "</div>",
            tasks: [
                {
                    type: "comprehension",
                    question: "Which historian focuses on the 'consumer society' and middle class, and which focuses on 'ancient custom' and rural poverty?",
                    model_answer: "Professor Roy Porter focuses on the consumer society and the enterprising middle class. Professor J.C.D. Clark focuses on ancient custom, traditional religion, and rural poverty."
                }
            ]
        },
        {
            title: "Synthesis Essay Planning Task",
            text: "To conclude this entire 1450–1750 unit, you will write a 4-paragraph synoptic essay answering the enquiry question: <strong>\"How 'modern' was Britain by 1750?\"</strong><br><br>" +
                "<div style=\"background: #1e293b; color: #f8fafc; padding: 25px; border-radius: 8px;\">" +
                "  <h3 style=\"margin-top: 0; color: #38bdf8; text-align: center;\">📝 ESSAY SYNTHESIS BUILDER</h3>" +
                "  <p style=\"text-align: center; color: #94a3b8; font-size: 0.9rem; margin-bottom: 20px;\">Use this matrix to plan your overarching argument.</p>" +
                "  <table style=\"width: 100%; border-collapse: collapse; font-size: 0.95rem;\">" +
                "    <thead>" +
                "      <tr style=\"background: #334155;\">" +
                "        <th style=\"padding: 12px; border: 1px solid #475569; text-align: left; width: 20%;\">Paragraph</th>" +
                "        <th style=\"padding: 12px; border: 1px solid #475569; text-align: left; width: 40%;\">Core Argument</th>" +
                "        <th style=\"padding: 12px; border: 1px solid #475569; text-align: left; width: 40%;\">Specific Historical Evidence</th>" +
                "      </tr>" +
                "    </thead>" +
                "    <tbody>" +
                "      <tr>" +
                "        <td style=\"padding: 12px; border: 1px solid #475569; background: #0f172a;\"><strong>1. Introduction</strong></td>" +
                "        <td style=\"padding: 12px; border: 1px solid #475569;\">Define \"modernity\" and state your thesis line.</td>" +
                "        <td style=\"padding: 12px; border: 1px solid #475569; color: #cbd5e1;\">• Period span (1450-1750)<br>• Thesis stance (e.g. largely unmodern despite global veneer)</td>" +
                "      </tr>" +
                "      <tr>" +
                "        <td style=\"padding: 12px; border: 1px solid #475569; background: #0f172a;\"><strong>2. Point 1</strong></td>" +
                "        <td style=\"padding: 12px; border: 1px solid #475569;\">Evidence that Britain WAS modern (Commerce, Finance, Governance).</td>" +
                "        <td style=\"padding: 12px; border: 1px solid #475569; color: #cbd5e1;\">• Bank of England (1694)<br>• Bill of Rights / Parliament<br>• Turnpike network</td>" +
                "      </tr>" +
                "      <tr>" +
                "        <td style=\"padding: 12px; border: 1px solid #475569; background: #0f172a;\"><strong>3. Point 2</strong></td>" +
                "        <td style=\"padding: 12px; border: 1px solid #475569;\">Evidence that Britain WAS NOT modern (Social inequality, Slavery, Pre-ind.).</td>" +
                "        <td style=\"padding: 12px; border: 1px solid #475569; color: #cbd5e1;\">• Dependence on Slave Trade<br>• &lt;5% voting rights / Bloody Code<br>• Poverty in St. Giles / Gin</td>" +
                "      </tr>" +
                "      <tr>" +
                "        <td style=\"padding: 12px; border: 1px solid #475569; background: #0f172a;\"><strong>4. Conclusion</strong></td>" +
                "        <td style=\"padding: 12px; border: 1px solid #475569;\">Nuanced overall judgment.</td>" +
                "        <td style=\"padding: 12px; border: 1px solid #475569; color: #cbd5e1;\">• Synthesis of macro vs micro reality<br>• Bridge to Industrialisation</td>" +
                "      </tr>" +
                "    </tbody>" +
                "  </table>" +
                "</div>",
            tasks: []
        }
    ],
    quiz: [
        {
            q: "In what year was the Bank of England established, revolutionizing British national debt and finance?",
            a: "1694",
            distractors: ["1492", "1600", "1750"]
        },
        {
            q: "What famous 1751 William Hogarth engraving depicted the social decay and poverty caused by alcohol addiction in London slums?",
            a: "Gin Lane",
            distractors: ["Beer Street", "The Rake's Progress", "A Harlot's Progress"]
        },
        {
            q: "Roughly what percentage of the male population had the right to vote in British parliamentary elections in 1750?",
            a: "Less than 5% (approx. 3-5%)",
            distractors: ["Around 20%", "About 50%", "Over 80%"]
        },
        {
            q: "What term was used to describe private toll roads constructed in the 18th century to speed up travel and trade?",
            a: "Turnpike Roads",
            distractors: ["Roman Roads", "Canal Paths", "Macadam Highways"]
        },
        {
            q: "Which two European revolutions (1642-1651 & 1688) permanently reduced the absolute power of the British monarchy?",
            a: "The English Civil War and the Glorious Revolution",
            distractors: ["The French Revolution and the American Revolution", "The Industrial Revolution and the Agrarian Revolution", "The Protestant Reformation and the Renaissance"]
        },
        {
            q: "What informal term was given to the 18th-century English criminal code that carried over 200 capital offenses?",
            a: "The 'Bloody Code'",
            distractors: ["Magna Carta", "The Bill of Rights", "The Napoleonic Code"]
        },
        {
            q: "Which institution, founded in London in 1600, was by 1750 establishing territorial footholds in Mughal India?",
            a: "The East India Company (EIC)",
            distractors: ["The Virginia Company", "The Royal African Company", "The South Sea Company"]
        },
        {
            q: "What was the name given to corrupt parliamentary constituencies with very few voters that were easily bought by aristocrats?",
            a: "Rotten Boroughs",
            distractors: ["Pocket Counties", "Gerrymandered Districts", "Burgage Plots"]
        },
        {
            q: "Name two major consumer goods imported into Britain in 1750 that relied directly on Caribbean plantation slave labor.",
            a: "Sugar and Tobacco",
            distractors: ["Tea and Silk", "Cotton and Wool", "Spices and Porcelain"]
        },
        {
            q: "Which major historical transformation, beginning around 1750, would turn Britain into the 'Workshop of the World'?",
            a: "The Industrial Revolution",
            distractors: ["The Commercial Revolution", "The Scientific Revolution", "The Agricultural Revolution"]
        }
    ]
};

// Insert Lesson 6
const idx = data.lessons.findIndex(l => l.id === 'lesson_6');
if (idx !== -1) {
    data.lessons[idx] = lesson6;
} else {
    data.lessons.splice(5, 0, lesson6);
}

// Global script: Apply `learning_objectives` to ALL lessons so they render on the frontend.
data.lessons.forEach(l => {
    if (l.teacher_notes && l.teacher_notes.objectives) {
        l.learning_objectives = {
            overarching: l.enquiry || l.title,
            scaffolded: l.teacher_notes.objectives.map(obj => obj.objective)
        };
    }
});

const out = `export const unitData = ${JSON.stringify(data, null, 4)};\n`;
fs.writeFileSync(file, out);
console.log("Successfully injected Lesson 6 and applied learning_objectives mapping for all lessons in early_modern_world/data.js");
