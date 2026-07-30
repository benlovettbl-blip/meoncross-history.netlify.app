import fs from 'fs';

const data = {
    "specification_file": "/data/eee_overview.json",
    "title": "From religious division to the Armada: How did Elizabeth secure her throne?",
    "subtitle": "Paper 2: Early Elizabethan England, 1558-88",
    "homepage_background": "/assets/portraits/elizabeth_i.jpg",
    "enquiry": "From religious division to the Armada: How did Elizabeth secure her throne?",
    "enquiry_question": "From religious division to the Armada: How did Elizabeth secure her throne?",
    "desc": "Paper 2",
    "cover_image": "/assets/placeholder_cover.jpg",
    "cover_caption": "Source A: A placeholder image for Early Elizabethan England.",
    "workbooks": [
        {
            "id": "KT1",
            "title": "Key Topic 1: Queen, government and religion, 1558-69",
            "prefix": "lesson_1_"
        }
    ],
    "printable_workbooks": [
        {
            "id": "KT1",
            "title": "Key Topic 1: Queen, government and religion, 1558-69",
            "prefix": "lesson_1_"
        }
    ],
    "key_topics": [],
    "lessons": [
        {
            "id": "lesson_1_1",
            "title": "KT1.1: The situation on Elizabeth’s accession, 1558",
            "enquiry": "From crippling debt to looming foreign invasions: How did a young, inexperienced, and contested queen secure a divided and vulnerable England in 1558?",
            "teacher_notes": {
                "primer": "This lesson establishes the precarious nature of Elizabeth's accession in 1558. It explores the rigid Tudor social hierarchy, the prejudices against female rule, and the immediate crises of state debt and foreign hostility she inherited.",
                "objectives": [
                    {
                        "objective": "Understand the rigid structure of Elizabethan society, the concept of the Great Chain of Being, and the mechanics of Tudor government, including the roles of the Court, Privy Council, and Parliament.",
                        "primer": "Emphasise how hierarchical Tudor society was, and highlight the distinct but complementary roles of the Court (entertainment/display) and the Privy Council (actual administration).",
                        "question": "How did the belief in the 'Great Chain of Being' help the Tudor monarchy maintain order without a permanent army or police force?"
                    },
                    {
                        "objective": "Analyse the intense challenges Elizabeth faced regarding her legitimacy, sixteenth-century gender prejudices against a 'Queen Regnant', and the political dilemma of marriage.",
                        "primer": "Discuss the theological and societal biases against female rulers, forcing students to consider why marriage was both necessary for the dynasty but dangerous for Elizabeth's personal authority.",
                        "question": "Why did sixteenth-century patriarchal society view a 'Queen Regnant' as unnatural, and how did this complicate Elizabeth's marriage prospects?"
                    },
                    {
                        "objective": "Evaluate the interconnected domestic and foreign threats facing England in 1558, specifically severe financial weaknesses, the loss of Calais, and the dangerous 'Auld Alliance' between France and Scotland.",
                        "primer": "Connect the domestic financial ruin (£300k debt) to the foreign threats, demonstrating how Elizabeth's lack of funds severely limited her ability to fight a two-front war against France and Scotland.",
                        "question": "How did the 'Auld Alliance' act as a direct geographical and military threat to an already financially crippled England?"
                    }
                ]
            },
            "do_now": {
                "type": "retrieval",
                "questions": [
                    {
                        "question": "Recall: What vital English territory was lost to France in 1559 under the Treaty of Cateau-Cambrésis?",
                        "answer": "Calais"
                    },
                    {
                        "question": "Define: Queen Regnant",
                        "answer": "A queen who rules in her own right with actual power, rather than just being the wife of a king."
                    },
                    {
                        "question": "Explain: Why was the 'Auld Alliance' viewed as a direct geographical threat to Elizabethan England?",
                        "answer": "It was an alliance between France and Scotland, meaning French Catholic troops could be stationed in Scotland on England's northern border."
                    },
                    {
                        "question": "15 Second Challenge: Try to speak for 15 seconds non-stop about why Catholics viewed Elizabeth as an illegitimate monarch.",
                        "answer": "Verbal response required."
                    }
                ]
            },
            "vocab": [
                {
                    "term": "Great Chain of Being",
                    "definition": "A rigid social hierarchy where inequality was accepted and everyone 'knew their place', with the monarch at the top appointed by God."
                },
                {
                    "term": "Patronage",
                    "definition": "A system where the monarch maintained control and secured loyalty by rewarding followers with land, titles, or monopolies."
                },
                {
                    "term": "Privy Council",
                    "definition": "A group of roughly 19 trusted nobles and advisers responsible for the day-to-day administration of the country."
                },
                {
                    "term": "Queen Regnant",
                    "definition": "A queen who rules in her own right with actual power, rather than just being the wife of a king."
                },
                {
                    "term": "Legitimacy",
                    "definition": "The lawful and rightful claim of a monarch to rule. Catholics rejected Elizabeth's legitimacy as they did not recognise her parents' marriage."
                },
                {
                    "term": "Debasement",
                    "definition": "The process of reducing the amount of precious metal (like silver) in a coin to mint more money, which causes massive inflation."
                },
                {
                    "term": "Auld Alliance",
                    "definition": "The traditional, historical military alliance between France and Scotland, posing a direct threat to England's northern border."
                }
            ],
            "flashcards": [
                {
                    "term": "Great Chain of Being",
                    "definition": "A rigid social hierarchy where inequality was accepted and everyone 'knew their place', with the monarch at the top appointed by God."
                },
                {
                    "term": "Patronage",
                    "definition": "A system where the monarch maintained control and secured loyalty by rewarding followers with land, titles, or monopolies."
                },
                {
                    "term": "Privy Council",
                    "definition": "A group of roughly 19 trusted nobles and advisers responsible for the day-to-day administration of the country."
                },
                {
                    "term": "Queen Regnant",
                    "definition": "A queen who rules in her own right with actual power, rather than just being the wife of a king."
                },
                {
                    "term": "Legitimacy",
                    "definition": "The lawful and rightful claim of a monarch to rule. Catholics rejected Elizabeth's legitimacy as they did not recognise her parents' marriage."
                },
                {
                    "term": "Debasement",
                    "definition": "The process of reducing the amount of precious metal (like silver) in a coin to mint more money, which causes massive inflation."
                },
                {
                    "term": "Auld Alliance",
                    "definition": "The traditional, historical military alliance between France and Scotland, posing a direct threat to England's northern border."
                }
            ],
            "narrative_blocks": [
                {
                    "type": "narrative",
                    "theme_heading": "1. The Structure of Society and Government",
                    "text": "When Elizabeth Tudor ascended to the throne in November 1558, she was just 21 years old and lacked experience. She inherited a violent kingdom with no permanent army or national police force. Society was organised in a rigid hierarchy known as the \"Great Chain of Being\", where inequality was accepted and everyone \"knew their place\". Approximately 90% of the population lived in the countryside, while 10% lived in towns. In rural areas, the nobility (just 1% of the population) sat at the top, followed by the gentry, yeomen, tenant farmers, and landless labourers. In towns, wealthy merchants dominated, followed by professionals, craftsmen, and unskilled labourers.<br><br>Government was inextricably linked to the monarch, who ruled by \"Divine Right\" and maintained control through patronage—rewarding loyalty with land, titles, and monopolies. The Royal Court, made up of nobles, existed to entertain the Queen and display her wealth. Day-to-day administration fell to the Privy Council, a group of roughly 19 trusted nobles and advisers who met several times a week. The most crucial figure here was William Cecil, Elizabeth's Secretary of State. Parliament was less powerful than today and was called only occasionally (just nine times during her entire reign); Elizabeth primarily needed it to grant extraordinary taxation and pass laws. Locally, Justices of the Peace (JPs) and Lord Lieutenants enforced law and order and raised the local militia."
                },
                {
                    "type": "narrative",
                    "theme_heading": "2. The Virgin Queen: Legitimacy, Gender, and Marriage",
                    "text": "Elizabeth faced immediate existential challenges to her authority. Legitimacy refers to a monarch's lawful right to rule. Elizabeth was the daughter of Henry VIII and Anne Boleyn. Because the Pope refused to recognise Henry's divorce from Catherine of Aragon, devout Catholics viewed Elizabeth as illegitimate. Furthermore, Henry VIII had temporarily excluded Elizabeth from the succession after executing her mother in 1536, providing her opponents with legal grounds to challenge her claim.<br><br>Compounding this was her gender. Sixteenth-century Christian traditions dictated that women should follow male authority, and women were largely viewed as second-class citizens without independent property rights. A \"Queen Regnant\"—a queen ruling in her own right with actual power—was viewed with deep suspicion, as people fundamentally believed a woman was incapable of leading a country or an army. Consequently, there was universal pressure for Elizabeth to marry and secure the Tudor dynasty. However, marriage posed a massive political risk: her husband would be expected to govern the country, stripping Elizabeth of her power. Despite these patriarchal prejudices, Elizabeth possessed distinct strengths; she was highly educated, confident, strong-willed, and a committed Protestant."
                },
                {
                    "type": "narrative",
                    "theme_heading": "3. Advanced Analysis: Financial Weaknesses at Home",
                    "text": "Elizabeth inherited a Crown in financial crisis, inheriting a massive debt of £300,000. This was a staggering sum given that her annual Crown revenues had fallen to just £286,667. To make matters worse, £100,000 of this debt was owed to the Antwerp Exchange (foreign moneylenders) who charged a crippling interest rate of 14%.<br><br>This financial black hole was caused by costly wars fought by her predecessors. Mary I had sold off vast amounts of Crown lands to fund these conflicts, severely reducing Elizabeth's rental income and increasing her reliance on Parliament for taxation. Furthermore, since the 1540s, the government had debased the coinage (reducing the silver content to mint more money), which caused widespread inflation. Raising taxes to solve this was risky as it could alienate the landowning classes. Instead, Elizabeth hoarded her income, cut her household expenses by half, and sold some Crown lands (raising £120,000), remarkably claiming the Crown was out of debt by 1574."
                },
                {
                    "type": "narrative",
                    "theme_heading": "4. The Threat from Abroad: France and Scotland",
                    "text": "England was isolated and surrounded by Catholic superpowers. Elizabeth inherited a war with France from Mary I, which ended in the Treaty of Cateau-Cambrésis in 1559, formally surrendering Calais. France remained a dangerous enemy with a larger population and greater wealth.<br><br>Crucially, France was allied with England's northern neighbour, Scotland, through the \"Auld Alliance\". Scotland was ruled by Mary of Guise on behalf of her daughter, Mary, Queen of Scots. French troops were stationed in Scotland, placing a hostile force directly on England's border and creating the threat of a joint invasion. To defuse the immediate French threat, Elizabeth eventually signed the Peace of Troyes in 1564, definitively recognising the French claim to Calais to avoid further war."
                }
            ],
            "quiz": [
                {
                    "question": "How old was Elizabeth when she ascended to the throne in 1558?",
                    "options": [
                        "19",
                        "21",
                        "25",
                        "30"
                    ],
                    "answer": 1
                },
                {
                    "question": "What phrase describes the rigid social hierarchy of Elizabethan England where everyone 'knew their place'?",
                    "options": [
                        "The Feudal System",
                        "The Divine Right",
                        "The Great Chain of Being",
                        "The Patronage System"
                    ],
                    "answer": 2
                },
                {
                    "question": "What percentage of the Elizabethan population lived in the countryside?",
                    "options": [
                        "50%",
                        "75%",
                        "85%",
                        "90%"
                    ],
                    "answer": 3
                },
                {
                    "question": "What system did the monarch use to maintain control by rewarding loyalty with land, titles, and monopolies?",
                    "options": [
                        "Patronage",
                        "Feudalism",
                        "The Privy Council",
                        "Divine Right"
                    ],
                    "answer": 0
                },
                {
                    "question": "Roughly how many trusted nobles and advisers made up the Privy Council?",
                    "options": [
                        "9",
                        "19",
                        "50",
                        "100"
                    ],
                    "answer": 1
                },
                {
                    "question": "Who was Elizabeth's most important minister and Secretary of State?",
                    "options": [
                        "Robert Dudley",
                        "Francis Walsingham",
                        "William Cecil",
                        "Thomas Cromwell"
                    ],
                    "answer": 2
                },
                {
                    "question": "How many times was Parliament called during Elizabeth's entire reign?",
                    "options": [
                        "Every year",
                        "Nine times",
                        "Fifteen times",
                        "It was never called"
                    ],
                    "answer": 1
                },
                {
                    "question": "Why did the Pope view Elizabeth as illegitimate?",
                    "options": [
                        "Because she was a woman",
                        "He refused to recognise Henry VIII's marriage to Anne Boleyn",
                        "Because she was Protestant",
                        "Because her sister Mary I was the true heir"
                    ],
                    "answer": 1
                },
                {
                    "question": "What term was used to describe a female ruler with actual power, rather than just a figurehead?",
                    "options": [
                        "Queen Consort",
                        "Queen Regnant",
                        "Empress",
                        "Queen Mother"
                    ],
                    "answer": 1
                },
                {
                    "question": "Why was Elizabeth reluctant to marry?",
                    "options": [
                        "Her husband would be expected to govern the country, reducing her power",
                        "There were no suitable Catholic princes",
                        "Parliament forbade her from marrying a foreigner",
                        "She was already secretly married to William Cecil"
                    ],
                    "answer": 0
                },
                {
                    "question": "How much debt did Elizabeth inherit in 1558?",
                    "options": [
                        "£100,000",
                        "£200,000",
                        "£300,000",
                        "£500,000"
                    ],
                    "answer": 2
                },
                {
                    "question": "What was the Crown's annual revenue when Elizabeth became queen?",
                    "options": [
                        "£150,000",
                        "£286,667",
                        "£400,000",
                        "£500,000"
                    ],
                    "answer": 1
                },
                {
                    "question": "How much money was owed to the Antwerp Exchange?",
                    "options": [
                        "£50,000",
                        "£100,000",
                        "£200,000",
                        "£300,000"
                    ],
                    "answer": 1
                },
                {
                    "question": "What interest rate did the foreign moneylenders at the Antwerp Exchange charge?",
                    "options": [
                        "5%",
                        "10%",
                        "14%",
                        "20%"
                    ],
                    "answer": 2
                },
                {
                    "question": "What economic process implemented by previous monarchs caused massive inflation?",
                    "options": [
                        "Debasement of the coinage",
                        "Over-taxation",
                        "The selling of monopolies",
                        "The dissolution of the monasteries"
                    ],
                    "answer": 0
                },
                {
                    "question": "How did Elizabeth remarkably clear the Crown's debt by 1574?",
                    "options": [
                        "She raised taxes on the poor",
                        "She cut household expenses by half and sold Crown lands",
                        "She borrowed more money from France",
                        "She discovered gold in the New World"
                    ],
                    "answer": 1
                },
                {
                    "question": "What 1559 treaty ended the war with France and surrendered Calais?",
                    "options": [
                        "Treaty of Nonsuch",
                        "Treaty of Edinburgh",
                        "Treaty of Cateau-Cambrésis",
                        "Peace of Troyes"
                    ],
                    "answer": 2
                },
                {
                    "question": "What was the name of the traditional alliance between France and Scotland?",
                    "options": [
                        "The Catholic League",
                        "The Auld Alliance",
                        "The Treaty of Berwick",
                        "The Northern Alliance"
                    ],
                    "answer": 1
                },
                {
                    "question": "Which Catholic monarch had a strong claim to the English throne and was married to the French heir?",
                    "options": [
                        "Mary I",
                        "Mary of Guise",
                        "Mary, Queen of Scots",
                        "Catherine of Aragon"
                    ],
                    "answer": 2
                },
                {
                    "question": "What 1564 treaty did Elizabeth sign to avoid further war with France by permanently recognising their claim to Calais?",
                    "options": [
                        "Treaty of Edinburgh",
                        "Treaty of Cateau-Cambrésis",
                        "Peace of Troyes",
                        "Treaty of Joinville"
                    ],
                    "answer": 2
                }
            ],
            "exam_practice": {
                "question": "Describe one feature of Elizabeth’s financial problems in 1558. (2 marks)\nDescribe one feature of Elizabeth’s financial problems in 1558. (2 marks)",
                "hint": "Remember the new Edexcel specification asks this as two separate 2-mark questions: 'Describe one feature...' twice. Identify a feature (1 mark) and add supporting detail (1 mark).",
                "model_answer": "**Feature 1:**\nOne feature of Elizabeth's financial problems was the immense debt she inherited from previous monarchs. (1)\nWhen she ascended the throne in 1558, the Crown was £300,000 in debt, with £100,000 owed to foreign moneylenders at the Antwerp Exchange at a crippling 14% interest rate. (1)\n\n**Feature 2:**\nAnother feature was her significantly reduced regular income. (1)\nHer sister Mary I had sold off vast amounts of Crown lands to pay for wars with France, which meant Elizabeth's annual rental income was severely depleted, leaving her with an annual revenue of only £286,667, which was less than her debt. (1)"
            }
        }
    ],
    "key_individuals": [
        {
            "id": "elizabeth_tudor",
            "name": "Queen Elizabeth I",
            "role": "Queen of England (1558–1603)",
            "bio": "Elizabeth was the daughter of Henry VIII and Anne Boleyn. Inheriting a divided and bankrupt nation at age 21, she ruled as a 'Queen Regnant'. Known as the Virgin Queen, she refused to marry to maintain her absolute political authority, steering England through severe religious tensions and the Spanish Armada to forge a Golden Age.",
            "image": "/assets/portraits/elizabeth_i.jpg"
        },
        {
            "id": "william_cecil",
            "name": "William Cecil",
            "role": "Secretary of State",
            "bio": "Elizabeth's most trusted adviser and Secretary of State. Cecil served her for 40 years, playing a crucial role in shaping domestic policy, managing Parliament, and steering the religious settlement. He was highly intelligent and fiercely loyal to the Crown.",
            "image": "/assets/placeholder_cover.jpg"
        },
        {
            "id": "mary_i",
            "name": "Mary I (Mary Tudor)",
            "role": "Queen of England (1553–1558)",
            "bio": "Elizabeth's older half-sister and predecessor. A devout Catholic, she attempted to reverse the English Reformation, burning over 300 Protestants at the stake. She left Elizabeth with a £300,000 debt and an unpopular war with France.",
            "image": "/assets/placeholder_cover.jpg"
        },
        {
            "id": "mary_queen_of_scots",
            "name": "Mary, Queen of Scots",
            "role": "Queen of Scotland",
            "bio": "Elizabeth's Catholic cousin. She had a strong genealogical claim to the English throne. Many English Catholics viewed her as the legitimate queen instead of Elizabeth. Her presence in England later became the focus of numerous plots to assassinate Elizabeth.",
            "image": "/assets/placeholder_cover.jpg"
        },
        {
            "id": "henry_viii",
            "name": "Henry VIII",
            "role": "King of England (1509–1547)",
            "bio": "Elizabeth's father. His desire to divorce Catherine of Aragon and marry Anne Boleyn led to the English Reformation. His execution of Anne Boleyn cast a long shadow over Elizabeth's legitimacy in the eyes of Catholic Europe.",
            "image": "/assets/placeholder_cover.jpg"
        },
        {
            "id": "anne_boleyn",
            "name": "Anne Boleyn",
            "role": "Queen Consort of England",
            "bio": "Elizabeth's mother and Henry VIII's second wife. She was executed for treason and adultery when Elizabeth was just two and a half years old. Catholics refused to recognise her marriage to Henry, branding Elizabeth illegitimate.",
            "image": "/assets/placeholder_cover.jpg"
        },
        {
            "id": "catherine_of_aragon",
            "name": "Catherine of Aragon",
            "role": "Queen Consort of England",
            "bio": "Henry VIII's first wife and mother of Mary I. The Pope's refusal to annul her marriage to Henry caused the Break with Rome. Devout Catholics continued to view Catherine as Henry's only true wife.",
            "image": "/assets/placeholder_cover.jpg"
        },
        {
            "id": "mary_of_guise",
            "name": "Mary of Guise",
            "role": "Queen Regent of Scotland",
            "bio": "A French noblewoman and mother to Mary, Queen of Scots. She ruled Scotland as regent, heavily relying on French troops and reinforcing the 'Auld Alliance', which placed a Catholic military threat directly on England's northern border.",
            "image": "/assets/placeholder_cover.jpg"
        }
    ]
};

const fileContent = 'export const unitData = ' + JSON.stringify(data, null, 4) + ';';
fs.writeFileSync('c:\\\\Projects\\\\meoncross-history.netlify.app\\\\eee\\\\data.js', fileContent);
console.log('Successfully written to eee/data.js');
