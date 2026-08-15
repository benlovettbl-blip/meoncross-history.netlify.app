const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'eee', 'data.js');

let code = fs.readFileSync(dataPath, 'utf8');

// Use a regex to extract the JSON object string
const match = code.match(/export const unitData = (\{[\s\S]+\});/);

if (!match) {
    console.error("Could not find unitData object in data.js");
    process.exit(1);
}

let data;
try {
    data = new Function(`return ${match[1]}`)();
} catch (e) {
    console.error("Failed to parse unitData:", e);
    process.exit(1);
}

const doNows = {
    "lesson_1_1": [
        { "question": "What did William Harvey discover?", "answer": "The circulation of blood." },
        { "question": "In what year did the Black Death arrive in England?", "answer": "1348." },
        { "question": "What did Edward Jenner discover?", "answer": "The smallpox vaccine (1796)." },
        { "question": "Who published the Germ Theory in 1861?", "answer": "Louis Pasteur." },
        { "question": "What was 'miasma'?", "answer": "The medieval belief that bad air or smells caused disease." },
        { "question": "Who was Elizabeth I's father?", "answer": "King Henry VIII." },
        { "question": "What was the Reformation?", "answer": "A 16th-century movement challenging the Catholic Church, leading to the creation of Protestantism." },
        { "question": "Who was the monarch immediately before Elizabeth?", "answer": "Her half-sister, Mary I." },
        { "question": "What religion was Mary I?", "answer": "Strictly Catholic." },
        { "question": "What was the 'Great Chain of Being'?", "answer": "A strict hierarchical structure of all matter and life, decreed by God, with the monarch near the top." }
    ],
    "lesson_1_2": [
        { "question": "What year did Elizabeth I become Queen?", "answer": "1558." },
        { "question": "How much debt did Mary I leave to Elizabeth?", "answer": "£300,000." },
        { "question": "Which French city did England lose in 1559 under the Treaty of Cateau-Cambrésis?", "answer": "Calais." },
        { "question": "What was a 'Queen Regnant'?", "answer": "A queen who ruled in her own right with actual power, not just the wife of a king." },
        { "question": "Who was Elizabeth's mother?", "answer": "Anne Boleyn." },
        { "question": "Why was Elizabeth's legitimacy questioned by Catholics?", "answer": "The Catholic Church didn't recognize Henry VIII's divorce from his first wife, making Elizabeth illegitimate in their eyes." },
        { "question": "What was the 'Auld Alliance'?", "answer": "An alliance between Catholic France and Scotland." },
        { "question": "What did Florence Nightingale improve?", "answer": "Hospital hygiene and nursing standards (during the Crimean War)." },
        { "question": "Who discovered Penicillin by accident?", "answer": "Alexander Fleming." },
        { "question": "What is a 'magic bullet'?", "answer": "A chemical that targets and kills specific germs without harming the body." }
    ],
    "lesson_1_3": [
        { "question": "What two Acts made up Elizabeth's Religious Settlement of 1559?", "answer": "The Act of Supremacy and the Act of Uniformity." },
        { "question": "What title did Elizabeth take in the Act of Supremacy?", "answer": "Supreme Governor of the Church of England." },
        { "question": "What was the Act of Uniformity?", "answer": "It established the appearance of churches and the form of services they had to hold." },
        { "question": "What was the Book of Common Prayer?", "answer": "A set prayer book in English that had to be used in all churches." },
        { "question": "Who were the Puritans?", "answer": "Extreme Protestants who wanted to 'purify' the church of all Catholic traces." },
        { "question": "What were the Royal Injunctions?", "answer": "Instructions to the clergy to reinforce the Settlement (e.g., all clergy must teach the Royal Supremacy)." },
        { "question": "How much debt did Mary I leave to Elizabeth?", "answer": "£300,000." },
        { "question": "Which French city did England lose in 1559?", "answer": "Calais." },
        { "question": "What year did the Black Death arrive in England?", "answer": "1348." },
        { "question": "Who published the Germ Theory in 1861?", "answer": "Louis Pasteur." }
    ],
    "lesson_1_4": [
        { "question": "What was the 'Crucifix Controversy'?", "answer": "Puritans demanded all crucifixes be removed from churches; Elizabeth eventually backed down to avoid losing Puritan bishops." },
        { "question": "What was the 'Vestment Controversy'?", "answer": "Puritans refused to wear the elaborate Catholic-style vestments ordered by Elizabeth." },
        { "question": "Who was the Pope that excommunicated Elizabeth in 1570?", "answer": "Pope Pius V." },
        { "question": "What was the Papal Bull of 1570?", "answer": "A decree by the Pope excommunicating Elizabeth and ordering Catholics not to obey her." },
        { "question": "Why did the Dutch Revolt matter to Elizabeth?", "answer": "She feared a massive Spanish army directly across the Channel in the Netherlands." },
        { "question": "What title did Elizabeth take in the Act of Supremacy?", "answer": "Supreme Governor." },
        { "question": "What was the Book of Common Prayer?", "answer": "The mandatory English prayer book for all church services." },
        { "question": "Who were the Puritans?", "answer": "Extreme Protestants who hated all Catholic decoration and ritual." },
        { "question": "What was a 'Queen Regnant'?", "answer": "A ruling queen with actual power." },
        { "question": "What did Edward Jenner discover?", "answer": "The smallpox vaccine." }
    ],
    "lesson_2_1": [
        { "question": "Why did Mary, Queen of Scots flee to England in 1568?", "answer": "Following a rebellion by Scottish nobles who forced her to abdicate." },
        { "question": "What was Elizabeth's immediate reaction to Mary's arrival?", "answer": "She imprisoned her in the north to prevent her from rallying English Catholics." },
        { "question": "Why was Mary, Queen of Scots a massive threat to Elizabeth?", "answer": "She had a strong, legitimate claim to the English throne and was Catholic." },
        { "question": "What was the Casket Letters affair?", "answer": "Letters allegedly proving Mary was involved in the murder of her husband, Lord Darnley." },
        { "question": "What was the Papal Bull of 1570?", "answer": "The Pope's decree excommunicating Elizabeth." },
        { "question": "What was the 'Crucifix Controversy'?", "answer": "A Puritan protest against Elizabeth's demand for crucifixes in churches." },
        { "question": "What were the Royal Injunctions?", "answer": "Rules enforcing the Religious Settlement on the clergy." },
        { "question": "How much debt did Elizabeth inherit?", "answer": "£300,000." },
        { "question": "What was the 'Auld Alliance'?", "answer": "The Catholic alliance between France and Scotland." },
        { "question": "What did William Harvey discover?", "answer": "The circulation of blood." }
    ],
    "lesson_2_2": [
        { "question": "What was the Revolt of the Northern Earls (1569)?", "answer": "A Catholic rebellion led by the Earls of Northumberland and Westmorland to depose Elizabeth." },
        { "question": "What was the Ridolfi Plot (1571)?", "answer": "A plot to assassinate Elizabeth and replace her with Mary, backed by Spanish troops." },
        { "question": "What was the Throckmorton Plot (1583)?", "answer": "A French Catholic plot backed by Spain to invade England and free Mary." },
        { "question": "What was the Babington Plot (1586)?", "answer": "A plot to assassinate Elizabeth; Mary's coded letters approving the plot were intercepted." },
        { "question": "Who was Francis Walsingham?", "answer": "Elizabeth's spymaster who uncovered the plots against her using ciphers and spies." },
        { "question": "Why did Mary, Queen of Scots flee to England in 1568?", "answer": "She was overthrown by Scottish nobles." },
        { "question": "What was the Casket Letters affair?", "answer": "Letters claiming Mary killed her husband." },
        { "question": "Who was the Pope that excommunicated Elizabeth in 1570?", "answer": "Pope Pius V." },
        { "question": "What was the Act of Uniformity?", "answer": "The 1559 law setting out how church services must look and sound." },
        { "question": "Who published the Germ Theory?", "answer": "Louis Pasteur." }
    ],
    "lesson_2_3": [
        { "question": "Why was Philip II of Spain angry with Elizabeth?", "answer": "She rejected his marriage proposal, turned England Protestant, and supported Dutch rebels." },
        { "question": "What was a 'privateer'?", "answer": "An armed private ship licensed by the government to attack and rob enemy ships." },
        { "question": "Which famous English privateer constantly raided Spanish treasure ships?", "answer": "Sir Francis Drake." },
        { "question": "What was the Treaty of Nonsuch (1585)?", "answer": "Elizabeth officially agreed to send an English army to help the Dutch rebels fight Spain." },
        { "question": "How much gold did Drake capture from the Spanish ship Cacafuego?", "answer": "£140,000." },
        { "question": "Who was Francis Walsingham?", "answer": "Elizabeth's Secretary of State and spymaster." },
        { "question": "What was the Babington Plot (1586)?", "answer": "The final plot that led to Mary, Queen of Scots' execution." },
        { "question": "What was the Revolt of the Northern Earls (1569)?", "answer": "The only major rebellion on English soil against Elizabeth, led by Catholic nobles." },
        { "question": "Why was Mary, Queen of Scots a threat?", "answer": "She was a Catholic figurehead with a strong claim to the throne." },
        { "question": "What was the 'Vestment Controversy'?", "answer": "Puritan priests refusing to wear Catholic-style robes." }
    ],
    "lesson_2_4": [
        { "question": "What did Drake do in Cadiz in 1587?", "answer": "He launched a surprise attack on the Spanish fleet, destroying 30 ships and delaying the Armada." },
        { "question": "What phrase did Drake use to describe his attack on Cadiz?", "answer": "'Singeing the King of Spain's beard.'" },
        { "question": "When was Mary, Queen of Scots executed?", "answer": "February 1587." },
        { "question": "How did Mary's execution affect relations with Spain?", "answer": "It gave Philip II the final moral justification he needed to launch the Armada." },
        { "question": "What was the Treaty of Nonsuch (1585)?", "answer": "Elizabeth's agreement to send troops to support the Dutch Protestant rebels." },
        { "question": "Which English privateer constantly raided Spanish ships?", "answer": "Sir Francis Drake." },
        { "question": "What was the Throckmorton Plot (1583)?", "answer": "A plot for a French invasion backed by Spanish money." },
        { "question": "Why did Mary, Queen of Scots flee to England?", "answer": "She was forced to abdicate by Scottish lords." },
        { "question": "What title did Elizabeth take in the Act of Supremacy?", "answer": "Supreme Governor." },
        { "question": "How much debt did Elizabeth inherit in 1558?", "answer": "£300,000." }
    ],
    "lesson_3_1": [
        { "question": "Who led the Spanish Armada?", "answer": "The Duke of Medina Sidonia." },
        { "question": "What was the Armada's plan?", "answer": "To sail to the Netherlands, pick up the Duke of Parma's army, and transport them to invade England." },
        { "question": "What tactic did the English use to break the Spanish defensive formation at Calais?", "answer": "They sent burning fireships into the Spanish fleet." },
        { "question": "What was the decisive sea battle of the Armada called?", "answer": "The Battle of Gravelines." },
        { "question": "What role did the weather play in defeating the Armada?", "answer": "Strong winds (the 'Protestant Wind') blew the Spanish ships north around Scotland, destroying dozens on the rocks." },
        { "question": "What did Drake do in Cadiz in 1587?", "answer": "He attacked the Spanish fleet, destroying ships and supplies." },
        { "question": "When was Mary, Queen of Scots executed?", "answer": "1587." },
        { "question": "What was the Treaty of Nonsuch?", "answer": "An alliance between England and Dutch Protestant rebels." },
        { "question": "Who was Francis Walsingham?", "answer": "Elizabeth's spymaster." },
        { "question": "What was the Book of Common Prayer?", "answer": "The mandatory Protestant prayer book introduced in 1559." }
    ],
    "lesson_3_2": [
        { "question": "Name two types of schools in Elizabethan England.", "answer": "Petty schools (for young children) and Grammar schools (for older boys of the middling sorts)." },
        { "question": "What was a typical subject studied at Grammar school?", "answer": "Latin or Greek." },
        { "question": "What was a popular cruel animal sport during this period?", "answer": "Bear-baiting or bull-baiting." },
        { "question": "Name one famous Elizabethan theatre.", "answer": "The Globe, The Theatre, or The Rose." },
        { "question": "Were women allowed to act on the Elizabethan stage?", "answer": "No, all female roles were played by young boys." },
        { "question": "Who led the Spanish Armada?", "answer": "The Duke of Medina Sidonia." },
        { "question": "What was the Battle of Gravelines?", "answer": "The major battle where English ships heavily damaged the Armada." },
        { "question": "What phrase did Drake use to describe his attack on Cadiz?", "answer": "'Singeing the King of Spain's beard.'" },
        { "question": "What was the Babington Plot (1586)?", "answer": "The final plot that proved Mary's guilt via coded letters." },
        { "question": "What was the 'Great Chain of Being'?", "answer": "The Tudor belief in a strict, God-given social hierarchy." }
    ],
    "lesson_3_3": [
        { "question": "What was a 'vagrant' or 'vagabond'?", "answer": "A homeless person who wandered from place to place looking for work, heavily feared by the authorities." },
        { "question": "What were the 'deserving poor'?", "answer": "Those who were too old, young, or ill to work and deserved help." },
        { "question": "What were the 'idle poor'?", "answer": "Those who were fit to work but couldn't find a job, often seen as lazy criminals." },
        { "question": "What was the 1572 Vagabonds Act?", "answer": "A harsh law where vagabonds could be whipped and have a hole burned through their ear." },
        { "question": "What caused poverty to rise in this period?", "answer": "Population growth, bad harvests, and the enclosure of farming land for sheep." },
        { "question": "What was a typical subject studied at a Grammar school?", "answer": "Latin." },
        { "question": "Were women allowed to act on stage?", "answer": "No, boys played female roles." },
        { "question": "What tactic did the English use to break the Spanish formation at Calais?", "answer": "Fireships." },
        { "question": "What was a 'privateer'?", "answer": "A state-licensed pirate." },
        { "question": "What was the Act of Supremacy?", "answer": "The law that made Elizabeth Supreme Governor of the Church." }
    ],
    "lesson_3_4": [
        { "question": "Why did English sailors explore the world?", "answer": "To expand trade, bypass Spanish monopolies, and find new trade routes." },
        { "question": "What new technology helped Elizabethan exploration?", "answer": "Astrolabes for navigation, better maps, and more agile ships like galleons." },
        { "question": "Who was the first Englishman to circumnavigate the globe (1577-1580)?", "answer": "Sir Francis Drake." },
        { "question": "Who did Elizabeth give a patent to colonize North America in 1584?", "answer": "Sir Walter Raleigh." },
        { "question": "Why did the first Roanoke settlement (1585) fail?", "answer": "Due to food shortages and conflict with Native Americans." },
        { "question": "What happened to the second Roanoke settlement (1587)?", "answer": "It became the 'Lost Colony'; when a supply ship returned in 1590, everyone had vanished." },
        { "question": "What caused poverty to rise in the Elizabethan period?", "answer": "Population growth and bad harvests." },
        { "question": "What was the 1572 Vagabonds Act?", "answer": "A law punishing vagrants with whipping and ear-burning." },
        { "question": "Who led the Spanish Armada?", "answer": "The Duke of Medina Sidonia." },
        { "question": "What was the Ridolfi Plot (1571)?", "answer": "An assassination plot against Elizabeth backed by Spanish troops." }
    ]
};

data.lessons.forEach(lesson => {
    if (doNows[lesson.id]) {
        lesson.do_now = {
            type: "retrieval",
            questions: doNows[lesson.id]
        };
    }
});

const updatedCode = \`export const unitData = \${JSON.stringify(data, null, 4)};\n\`;
code = code.replace(/export const unitData = \\{[\\s\\S]+\\};/, updatedCode.trim());
fs.writeFileSync(dataPath, code, 'utf8');

console.log("Successfully updated eee/data.js with 10-question 'Do Now' tasks.");
