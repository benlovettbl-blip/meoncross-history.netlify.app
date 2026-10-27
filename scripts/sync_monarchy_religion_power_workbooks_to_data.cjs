const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const dataFilePath = path.join(ROOT_DIR, 'units', 'monarchy_religion_power', 'data.js');

// Load original data
const rawDataContent = fs.readFileSync(dataFilePath, 'utf8');
const cleanJsonMatch = rawDataContent.match(/const\s+monarchy_religion_power_data\s*=\s*(\{[\s\S]*\});\s*if\s*\(typeof\s+window/);
if (!cleanJsonMatch) {
  throw new Error('Could not parse units/monarchy_religion_power/data.js JSON structure');
}
const unitData = JSON.parse(cleanJsonMatch[1]);

const mrpExamPractice = [
  // Lesson 1: Henry VIII & The English Reformation (12m Explain Why)
  {
    title: 'Key Stage 3 Disciplinary Writing: Henry VIII & The English Reformation (1517–1534)',
    tariff: '12 marks (Explain Why Causal Analysis)',
    questions: [
      {
        tariff: '12 marks',
        type: 'explain_why_12m',
        question: 'Explain why King Henry VIII broke with the Roman Catholic Church in the period 1527–1534. [12 marks]',
        stimulus: [
          'The succession and Catherine of Aragon',
          'Crown finances and monastic wealth'
        ],
        prompt: 'Explain three distinct causal reasons: the dynastic crisis of securing a male Tudor heir and Pope Clement VII’s refusal to grant an annulment from Catherine of Aragon; the desire to assert absolute national and royal sovereignty over the Church through the advice of Thomas Cromwell and Thomas Cranmer; and the urgent financial temptation to seize the vast wealth of the English monasteries.',
        model: 'One primary reason Henry VIII broke with the Church of Rome was the desperate dynastic necessity of securing a legitimate male heir to protect the Tudor dynasty. Married to Catherine of Aragon for eighteen years, Henry had produced only one surviving child, Princess Mary. Convinced that God had cursed their marriage because Catherine was the widow of his deceased older brother Prince Arthur, Henry cited Leviticus 20:21 to demand an annulment from Pope Clement VII. However, following the 1527 Sack of Rome, Pope Clement was the physical captive of Catherine’s nephew, the Holy Roman Emperor Charles V. Clement could not annul the marriage without provoking Imperial retaliation, leaving Henry’s "Great Matter" deadlocked.<br><br>Furthermore, a second decisive factor was the revolutionary constitutional strategy devised by Henry’s chief minister, Thomas Cromwell. Cromwell convinced Henry that instead of pleading with a foreign Italian bishop, the English monarch possessed imperial sovereignty under God. Cromwell drafted a series of radical parliamentary statutes—including the 1533 Act in Restraint of Appeals (preventing legal appeals to Rome) and the 1534 Act of Supremacy. These acts declared that the King was the "only supreme head in earth of the Church of England", legally extinguishing papal jurisdiction in England and allowing Archbishop Thomas Cranmer to annul the marriage and crown Anne Boleyn Queen.<br><br>Finally, the break with Rome was heavily accelerated by the irresistible financial prize of ecclesiastical wealth. Henry’s treasury was virtually exhausted by disastrous wars in France and lavish renaissance court expenditure. Following the Act of Supremacy, Cromwell conducted the 1535 Valor Ecclesiasticus survey, revealing that the Church owned one-third of all agricultural land in England and generated double the Crown’s annual income. Between 1536 and 1540, Henry dissolved over 800 monasteries, confiscating gold, lead, and lands worth millions of pounds, providing the Crown with the financial windfall needed to build modern coastal artillery fortresses and fund the Royal Navy.',
        scaffolding: {
          acronym: '3-Paragraph Causal Analysis (PEEL)',
          acronym_title: '12-Mark Explain Why Standard',
          steps: [
            { letter: 'REASON 1', name: 'Dynastic Succession & Anne Boleyn', prompt: 'Explain Catherine of Aragon, lack of male heir, Pope Clement VII captive of Charles V.', starter: 'One primary reason Henry broke with Rome was the dynastic crisis of...' },
            { letter: 'REASON 2', name: 'Royal Sovereignty & Cromwell’s Statutes', prompt: 'Explain Thomas Cromwell, 1533 Act in Restraint of Appeals, and 1534 Act of Supremacy.', starter: 'Furthermore, a second decisive factor was the desire for royal sovereignty, such as...' },
            { letter: 'REASON 3', name: 'Monastic Wealth & Crown Finances', prompt: 'Explain Valor Ecclesiasticus 1535, dissolving 800 monasteries, and funding coastal defense.', starter: 'Finally, the break with Rome was accelerated by financial temptation, because...' }
          ],
          sentence_starters: [
            'One primary reason was that...',
            'For example, Henry’s marriage to...',
            'This led directly to the break with Rome because...',
            'Another key factor was Thomas Cromwell’s legislation, such as...',
            'Consequently, this meant that...',
            'Ultimately, this resulted in...'
          ],
          connectives_bank: ['Great Matter', 'Catherine of Aragon', 'Anne Boleyn', 'Pope Clement VII', 'Charles V', 'Thomas Cromwell', 'Act of Supremacy (1534)', 'Dissolution of the Monasteries', 'Valor Ecclesiasticus']
        }
      }
    ]
  },

  // Lesson 2: Elizabeth I & The Middle Way (Explain Difference [4m] & Explain Importance [8m])
  {
    title: 'Key Stage 3 Disciplinary Writing: Elizabeth I & The 1559 Religious Settlement',
    tariff: '12 marks (Explain Difference [4m] & Explain Importance [8m])',
    questions: [
      {
        tariff: '4 marks',
        type: 'explain_difference_4m',
        question: 'Explain one way in which Elizabeth I’s religious policy in 1559 was different from Mary I’s religious policy (1553–1558). [4 marks]',
        prompt: 'Identify one clear difference between Mary’s strict Catholic restoration and Elizabeth’s moderate Protestant "Middle Way", supporting with precise historical evidence.',
        model: 'One way Elizabeth I’s religious policy was different from Mary I’s was her approach toward religious toleration and royal supremacy. Mary I strictly restored papal authority, revived the medieval heresy laws, and violently persecuted Protestants, burning almost 300 individuals (including Archbishop Thomas Cranmer) at the stake. In sharp contrast, Elizabeth I established a moderate Protestant "via media" (Middle Way) in 1559. Elizabeth declared herself "Supreme Governor" rather than "Supreme Head" to placate Catholics, retained bishops, vestments, and church music, and introduced a 1-shilling recusancy fine for missing Sunday church rather than enforcing the death penalty, famously resolving "not to make windows into men’s souls".',
        scaffolding: {
          acronym: 'Point • Mary Fact • Elizabeth Fact • Contrast',
          acronym_title: 'Edexcel Paper 1 Difference Formula (4 Marks)',
          steps: [
            { letter: 'POINT', name: 'Identify Difference', prompt: 'State difference between Mary’s Catholic persecution and Elizabeth’s moderate Middle Way.', starter: 'One major difference was that while Mary I enforced strict Catholic restoration...' },
            { letter: 'MARY', name: 'Mary I Detail', prompt: 'Cite returning to papal authority, heresy laws, and burning 300 Protestants.', starter: 'Specifically, Mary I revived the heresy laws and...' },
            { letter: 'ELIZABETH', name: 'Elizabeth I Detail', prompt: 'Cite Supreme Governor title, 1559 Middle Way, 1-shilling recusancy fine, not making windows into souls.', starter: 'In contrast, Elizabeth I introduced the 1559 Settlement which...' }
          ],
          sentence_starters: [
            'One major way Elizabeth’s policy differed from Mary’s was...',
            'Under Mary I, religious policy focused on...',
            'In contrast, Elizabeth I adopted a moderate approach by...',
            'This was a significant difference because...'
          ],
          connectives_bank: ['Mary I', 'heresy laws', '300 burnings', 'Thomas Cranmer', 'Elizabeth I', 'via media / Middle Way', 'Supreme Governor', 'Act of Uniformity 1559', 'recusancy fines']
        }
      },
      {
        tariff: '8 marks',
        type: 'explain_importance_8m',
        question: 'Explain the importance of the Elizabethan Religious Settlement (1559) for religious stability in England. [8 marks]',
        prompt: 'Explain two distinct reasons why the 1559 settlement was important: first, how its deliberate theological ambiguity defused civil war following twenty years of Tudor religious turmoil; second, how it created long-term challenges from both extreme Puritans and Catholic plots.',
        model: 'One reason the Elizabethan Religious Settlement of 1559 was profoundly important was that it restored immediate domestic peace and avoided religious civil war after decades of whiplash changes under Henry VIII, Edward VI, and Mary I. By passing the Act of Supremacy and Act of Uniformity, Elizabeth established a broad national church designed to be acceptable to the majority of her subjects. The 1559 Book of Common Prayer deliberately fused Protestant theology with traditional Catholic liturgical elements—combining the 1549 and 1552 communion wordings so that believers could interpret the bread and wine spiritually or physically. This theological compromise successfully reconciled moderate English Catholics and conservative gentry, establishing stable governance during the perilous opening decade of Elizabeth’s reign.<br><br>Furthermore, the 1559 Settlement was critical because it created the permanent institutional and political battleground that defined the remainder of the Tudor and Stuart eras. While the settlement satisfied moderates, it alienated hardliners on both sides. Radical Puritans demanded the complete "purification" of the Church, condemning bishops, crucifixes, and the surplice as popish idolatry. Simultaneously, following the 1570 Papal Bull (Regnans in Excelsis) excommunicating Elizabeth, devout Catholics became trapped between loyalty to Queen and loyalty to Pope, provoking Catholic plots (such as the 1586 Babington Plot) and the Spanish Armada. Consequently, the 1559 settlement established the permanent religious architecture of the Church of England, while simultaneously creating the sectarian tensions that eventually exploded in the English Civil War.',
        scaffolding: {
          acronym: 'Importance Point 1 • Importance Point 2',
          acronym_title: 'Edexcel Paper 2 Period Study 8-Mark Importance Standard',
          steps: [
            { letter: 'IMPACT 1', name: 'Restoring Immediate Peace & Avoiding Civil War', prompt: 'Explain broad national church, blended communion wording, and reconciling moderate Catholics.', starter: 'One reason the 1559 Settlement was important was that it restored domestic stability by...' },
            { letter: 'IMPACT 2', name: 'Long-Term Sectarian Battleground (Puritans & Catholic Plots)', prompt: 'Explain Puritan vestment controversy, 1570 Papal Bull, Catholic plots, and foundations of civil war.', starter: 'Furthermore, the settlement was vital because it permanently defined...' }
          ],
          sentence_starters: [
            'One reason why the 1559 Settlement was important was...',
            'In particular, it preserved political order by...',
            'Furthermore, the settlement was critical because...',
            'Consequently, this shaped future English history because...'
          ],
          connectives_bank: ['Act of Supremacy (1559)', 'Act of Uniformity (1559)', 'Book of Common Prayer', 'theological ambiguity', 'via media', 'vestment controversy', 'Puritans', 'Regnans in Excelsis (1570)', 'Babington Plot']
        }
      }
    ]
  },

  // Lesson 3: The Spanish Armada & Naval Power (Feature Drill [4m] & Narrative Account [8m])
  {
    title: 'Key Stage 3 Disciplinary Writing: The Spanish Armada & Elizabethan Naval Power (1588)',
    tariff: '12 marks (Feature Drill [4m] & Narrative Account [8m])',
    questions: [
      {
        tariff: '4 marks',
        type: 'feature_drills_4m',
        question: 'Describe one key feature of the English race-built warships designed by Sir John Hawkins. [4 marks]',
        prompt: 'Identify one major architectural or tactical feature of Hawkins’s race-built galleons, supporting with precise factual detail.',
        model: 'One key feature of the English race-built warships was their lower forecastles and longer, streamlined hull design.<br>Detail: Treasurer of the Navy Sir John Hawkins cut down the towering medieval "castles" at the bow and stern, producing sleek, highly maneuverable ships with low centers of gravity that could sail closer to the wind, enabling English captains to out-sail heavier Spanish galleons while delivering devastating broadsides from long-range culverin naval guns without being boarded.',
        scaffolding: {
          acronym: 'Point + Detail',
          acronym_title: 'Feature Question Formula (4 Marks)',
          steps: [
            { letter: 'POINT', name: 'Identify Feature', prompt: 'State lower forecastle, sleek hull, and fast maneuverability.', starter: 'One key feature was that Hawkins designed race-built warships with...' },
            { letter: 'DETAIL', name: 'Historical Evidence', prompt: 'Add details on low center of gravity, sailing close to wind, and long-range culverin broadsides.', starter: 'Specifically, this involved...' }
          ],
          sentence_starters: [
            'One key feature of Hawkins’s race-built warships was...',
            'Specifically, this involved cutting down...',
            'This gave the English navy a critical tactical advantage because...'
          ],
          connectives_bank: ['Sir John Hawkins', 'race-built galleons', 'low forecastle', 'maneuverability', 'culverins', 'long-range broadsides', 'fast gun carriages']
        }
      },
      {
        tariff: '8 marks',
        type: 'narrative_account_8m',
        question: 'Write a narrative account analysing the key events of the Spanish Armada campaign in the summer of 1588. [8 marks]',
        stimulus: [
          'The crescent formation sailing up the English Channel',
          'The midnight fireship attack off Calais and the Battle of Gravelines'
        ],
        prompt: 'Write a chronological account examining the campaign: the Armada’s arrival in July 1588 in disciplined crescent formation, the critical bottleneck at Calais awaiting the Duke of Parma, the midnight fireship attack scattering the fleet, and the decisive Battle of Gravelines followed by the disastrous voyage around Scotland and Ireland.',
        model: 'In the summer of 1588, Philip II of Spain dispatched 130 warships carrying 30,000 men to invade England, depose Elizabeth I, and restore Catholicism.<br><br>The campaign began in late July 1588 when the Duke of Medina Sidonia steered the Armada into the English Channel in a rigid, impenetrable crescent formation. The outer defensive horns protected slow supply transports and troop carriers, preventing Lord Howard of Effingham and Sir Francis Drake from closing in to board. For eight days, English race-built galleons skirmished at long range past Plymouth and the Isle of Wight, failing to break the Spanish formation but forcing the Armada to exhaust vast supplies of heavy ammunition.<br><br>The decisive turning point occurred on the night of 7–8 August 1588 off Calais. The Armada had anchored awaiting the Duke of Parma’s 30,000-man invasion army from the Netherlands, but Parma’s barges were blockaded by Dutch flyboats. Recognizing the Spanish vulnerability, Drake dispatched eight midnight fireships packed with pitch and gunpowder into the crowded anchorage. In absolute panic, Spanish captains cut their anchor cables and scattered into the dark, permanently disintegrating their protective crescent formation.<br><br>The following morning, 8 August, the English fleet closed in at the Battle of Gravelines. With Spanish crews unable to reload heavy guns quickly in the chaos, English ships battered the drifting Spanish hulls at close range with culverins. Blown northward into the perilous North Sea by south-westerly gales ("the Protestant Wind"), the damaged Armada was forced to attempt a disastrous circumnavigation around Scotland and western Ireland. Over forty galleons were wrecked on the rocky Atlantic coastline, leaving barely half the fleet to limp home, securing England’s sovereign survival and naval prestige.',
        scaffolding: {
          acronym: '3-Stage Chronological Narrative Framework',
          acronym_title: 'Narrative Account Formula (Beginning • Escalation • Climax)',
          steps: [
            { letter: 'STAGE 1', name: 'July 1588 Channel Crescent & Skirmishes', prompt: 'Explain 130 ships, crescent formation, Plymouth to Wight, and long-range firing.', starter: 'Initially, the Armada campaign began in July 1588 when...' },
            { letter: 'STAGE 2', name: 'Calais Fireships & Panic (7 August)', prompt: 'Explain anchoring at Calais, Parma blockaded, Drake’s 8 fireships, and cutting anchors.', starter: 'The decisive turning point occurred on the night of 7 August when...' },
            { letter: 'STAGE 3', name: 'Gravelines Battle & Atlantic Destruction (8 August)', prompt: 'Explain Battle of Gravelines, Protestant Wind, shipwrecks in Ireland, and half fleet returning.', starter: 'Consequently, the climax occurred on 8 August at the Battle of Gravelines when...' }
          ],
          sentence_starters: [
            'Initially, the campaign began in July 1588 when...',
            'Following eight days of skirmishing, the decisive crisis occurred at Calais when...',
            'The following morning, the climax occurred at Gravelines when...',
            'Consequently, this culminated in the destruction of the fleet because...'
          ],
          connectives_bank: ['Medina Sidonia', 'crescent formation', 'Duke of Parma', 'Calais anchorage', 'Drake’s fireships', 'cut anchor cables', 'Battle of Gravelines (8 August)', 'Protestant Wind', 'Irish shipwrecks']
        }
      }
    ]
  },

  // Lesson 4: English Civil War, Regicide & Bill of Rights (12m Explain Why)
  {
    title: 'Key Stage 3 Disciplinary Writing: The English Civil War, Regicide & Bill of Rights',
    tariff: '12 marks (Explain Why Causal Analysis)',
    questions: [
      {
        tariff: '12 marks',
        type: 'explain_why_12m',
        question: 'Explain why Parliament put King Charles I on trial and executed him in January 1649. [12 marks]',
        stimulus: [
          'Charles I’s refusal to accept constitutional limits',
          'The outbreak of the Second Civil War (1648)'
        ],
        prompt: 'Explain three distinct causal reasons: Charles I’s absolutist belief in the Divine Right of Kings and stubborn refusal to negotiate honest constitutional settlements; the treacherous outbreak of the Second Civil War in 1648 when Charles allied with the Scots; and the religious and military radicalization of Oliver Cromwell and the New Model Army, who viewed the King as a "man of blood" who had betrayed his own people.',
        model: 'One primary reason for the trial and execution of King Charles I was his obstinate, dogmatic belief in the Divine Right of Kings and his systematic refusal to accept genuine constitutional limits on his royal power. Even after suffering total military defeat in the First Civil War (1642–1646) and being held captive, Charles viewed all parliamentary negotiations—such as the 1647 Heads of Proposals—as mere tactical delays. Firmly convinced that he was accountable only to God and that monarchical sovereignty could not be shared with Parliament, Charles deliberately played rival factions (Presbyterians, Independents, the Army, and the Scots) against one another, proving to parliamentary leaders that he could never be trusted to uphold a peace treaty.<br><br>Furthermore, the decisive catalyst that sealed Charles’s fate was his treasonous instigation of the Second Civil War in 1648. In December 1647, while imprisoned at Carisbrooke Castle on the Isle of Wight, Charles signed a secret "Engagement" treaty with conservative Scottish covenanters, promising to establish Presbyterianism in England for three years in exchange for a Scottish invasion army to restore him to his throne. When Scottish armies invaded and royalist rebellions erupted across Wales and Essex in the spring of 1648, parliamentary soldiers were forced to fight and bleed all over again to subdue a war they believed had already been won. Consequently, this second war convinced commanders that as long as Charles lived, he would perpetually orchestrate foreign invasions and domestic slaughter.<br><br>Finally, the regicide was driven by the religious radicalization of Oliver Cromwell and the New Model Army. In May 1648, at the Windsor Prayer Meeting, army officers famously resolved that "it was our duty to call Charles Stuart, that man of blood, to an account for the blood he had shed against the Lord’s cause". Drawing upon biblical verses in Numbers 35:33 ("blood defileth the land"), the puritan army believed that God demanded the King’s execution to purge England of divine wrath. In December 1648, Colonel Pride conducted "Pride’s Purge", expelling moderate MPs who favoured continued negotiations. The remaining "Rump Parliament" established a High Court of Justice, convicted Charles of high treason as a "tyrant, traitor, murderer, and public enemy", and beheaded him outside the Banqueting House on 30 January 1649.',
        scaffolding: {
          acronym: '3-Paragraph Causal Analysis (PEEL)',
          acronym_title: '12-Mark Explain Why Standard',
          steps: [
            { letter: 'REASON 1', name: 'Divine Right & Bad Faith Negotiations', prompt: 'Explain Divine Right of Kings, bad faith negotiations, and playing factions against each other.', starter: 'One primary reason Charles I was executed was his stubborn refusal to...' },
            { letter: 'REASON 2', name: 'The Secret Scottish Engagement & 1648 War', prompt: 'Explain Carisbrooke Castle, secret Scottish treaty, and forcing soldiers to fight a second war.', starter: 'Furthermore, the decisive catalyst that sealed Charles’s fate was...' },
            { letter: 'REASON 3', name: 'New Model Army, "Man of Blood" & Pride’s Purge', prompt: 'Explain Windsor prayer meeting, Numbers 35:33, Pride’s Purge, and High Court conviction.', starter: 'Finally, the execution was driven by the puritan army’s conviction that...' }
          ],
          sentence_starters: [
            'One primary reason was that...',
            'For example, Charles I believed that...',
            'This led directly to his trial because...',
            'The critical turning point occurred in 1648 when...',
            'Consequently, this convinced the army that...',
            'Ultimately, this resulted in...'
          ],
          connectives_bank: ['Divine Right of Kings', 'Heads of Proposals', 'Carisbrooke Castle', 'Scottish Engagement', 'Second Civil War (1648)', 'Oliver Cromwell', 'New Model Army', 'man of blood', 'Pride’s Purge (1648)', 'Rump Parliament', 'execution (30 Jan 1649)']
        }
      }
    ]
  },

  // Lesson 5: Crown, Church, or Parliament? (Explain Consequence [4m] & Evaluative Essay [12m])
  {
    title: 'Key Stage 3 Disciplinary Writing: Crown, Church, or Parliament? (1517–1689)',
    tariff: '16 marks (Explain Consequence [4m] & Evaluative Judgement [12m])',
    questions: [
      {
        tariff: '4 marks',
        type: 'consequence_4m',
        question: 'Explain one consequence of the Bill of Rights passed by Parliament in 1689. [4 marks]',
        prompt: 'Focus on how the 1689 Bill of Rights permanently established a constitutional monarchy by forbidding the monarch from suspending laws, levying taxes without Parliament, or maintaining a standing army in peacetime without parliamentary consent.',
        model: 'One significant consequence of the 1689 Bill of Rights was the permanent destruction of royal absolutism and the legal establishment of constitutional monarchy in Britain. Following the Glorious Revolution that overthrew James II, William III and Mary II were required to accept the Bill of Rights as a condition of receiving the crown. The statute made it illegal for the monarch to suspend laws, dismiss judges, levy taxes without parliamentary consent, or maintain a standing army in peacetime. Furthermore, it guaranteed regular parliaments, free elections, and freedom of speech within parliamentary debates. Consequently, this permanently shifted sovereign power from the Crown to Parliament, establishing the foundation of modern British parliamentary democracy.',
        scaffolding: {
          acronym: 'P-F-C (Point • Fact • Consequence)',
          acronym_title: 'High-Yield Consequence Formula (1 Concise Paragraph)',
          steps: [
            { letter: 'POINT', name: 'Identify Consequence', prompt: 'State the shift from royal absolutism to constitutional monarchy and parliamentary sovereignty.', starter: 'One significant consequence of the 1689 Bill of Rights was...' },
            { letter: 'FACT', name: 'Historical Evidence', prompt: 'Cite William & Mary, ban on suspending laws or taxes without Parliament, and peacetime army ban.', starter: 'In particular, the statute legally established that...' },
            { letter: 'CONSEQUENCE', name: 'Explain Result', prompt: 'Explain how this permanently placed Parliament above the Crown in British constitutional law.', starter: 'Consequently, this directly resulted in...' }
          ],
          sentence_starters: [
            'One significant consequence of the Bill of Rights was that...',
            'In particular, this meant that the monarch could no longer...',
            'As a direct result...',
            'Consequently, this transformed English governance because...'
          ],
          connectives_bank: ['Bill of Rights (1689)', 'Glorious Revolution (1688)', 'William III & Mary II', 'constitutional monarchy', 'parliamentary sovereignty', 'taxation consent', 'freedom of speech in parliament']
        }
      },
      {
        tariff: '12 marks',
        type: 'evaluative_essay_12m',
        question: '‘The execution of Charles I in 1649 was the most significant turning point in the struggle between Crown and Parliament.’ How far do you agree? [12 marks]',
        stimulus: [
          'The execution of Charles I and the declaration of the Commonwealth (1649)',
          'The Glorious Revolution and the 1689 Bill of Rights'
        ],
        prompt: 'Construct a balanced evaluative argument: on the one hand, evaluate how the public execution of an anointed king shattered the sacred Divine Right of Kings, proving an English monarch could be put on trial by his own people; on the other hand, evaluate how the Republic collapsed into military dictatorship under Oliver Cromwell, leading to the Restoration of 1660, and why the bloodless Glorious Revolution and 1689 Bill of Rights was the truly permanent constitutional settlement. Reach a weighed conclusion.',
        model: 'To a significant extent, the execution of Charles I in 1649 was the most radical and symbolic turning point in English constitutional history; however, the Glorious Revolution of 1688 and the 1689 Bill of Rights represent the more decisive and permanent turning point because they established an enduring constitutional monarchy that survived, whereas the 1649 regicide collapsed into military dictatorship and royal restoration.<br><br>On the one hand, the public execution of Charles I on 30 January 1649 was an unprecedented revolutionary rupture that permanently shattered the mystique of the Divine Right of Kings. For the first time in European history, an anointed monarch was brought before a court of his own subjects, tried for high treason against his people, and publicly beheaded. Parliament abolished the monarchy and the House of Lords, proclaiming England a "Commonwealth and Free State". This destroyed the ancient feudal assumption that kings were accountable only to God, creating a permanent intellectual precedent: if a monarch betrayed the liberties of his subjects, he was a tyrant subject to the law.<br><br>On the other hand, it can be strongly argued that the 1649 revolution was a failure that was subsequently reversed. Following the regicide, Parliament proved incapable of governing, prompting Oliver Cromwell to dismiss the Rump Parliament with troops in 1653 and rule as Lord Protector through military Major-Generals. Far from establishing liberty, the Protectorate was a repressive puritan military dictatorship that banned theatre, Christmas celebrations, and sport. Following Cromwell’s death, the republican experiment collapsed in chaos. In 1660, the Restoration of Charles II brought back the monarchy, the House of Lords, and the Anglican episcopacy with virtually all royal powers intact, proving that the regicide had not created a stable constitutional system.<br><br>In conclusion, while 1649 established the radical precedent that monarchs were accountable to their people, 1688–1689 was the true decisive turning point. By deposing James II without civil war and placing William III and Mary II on the throne strictly subject to the 1689 Bill of Rights, Parliament permanently subordinated the Crown to the rule of law, creating the parliamentary democracy that endures to this day.',
        scaffolding: {
          acronym: 'PEEL Evaluative Essay Framework',
          acronym_title: '12-Mark Evaluative Statement Essay Standard',
          steps: [
            { letter: 'THESIS', name: 'State Position', prompt: 'State clearly that while 1649 was the radical symbolic shock, 1689 was the permanent constitutional victory.', starter: 'To a significant extent, while 1649 was the most radical rupture, 1688–1689 was the decisive turning point because...' },
            { letter: 'THEME 1', name: '1649 Regicide & Shattering Divine Right', prompt: 'Explain trial of an anointed king, abolishing monarchy, Commonwealth, and creating revolutionary precedent.', starter: 'On the one hand, the execution of Charles I in 1649 was a monumental watershed because...' },
            { letter: 'THEME 2', name: 'Cromwellian Failure & 1688–1689 Bill of Rights', prompt: 'Evaluate military dictatorship, 1660 Restoration, Glorious Revolution, and 1689 Bill of Rights permanence.', starter: 'On the other hand, the 1649 settlement was temporary and failed, whereas 1688–1689...' },
            { letter: 'JUDGMENT', name: 'Weighed Verdict', prompt: 'Synthesize why 1689 created the enduring parliamentary democracy that survived.', starter: 'In conclusion, while 1649 proved an English king could be executed, 1689 was decisive because...' }
          ],
          sentence_starters: [
            'To a significant extent, it can be argued that...',
            'On the one hand, the regicide of 1649 was unprecedented because...',
            'In particular, it shattered the Divine Right of Kings by...',
            'On the other hand, an alternative view emphasizes the Glorious Revolution, such as...',
            'In conclusion, the most permanent turning point was... because...'
          ],
          connectives_bank: ['regicide (1649)', 'Divine Right of Kings', 'Commonwealth', 'Lord Protector', 'Oliver Cromwell', 'Restoration of 1660', 'Glorious Revolution (1688)', 'Bill of Rights (1689)', 'constitutional monarchy']
        }
      }
    ]
  }
];

// Inject into unitData.lessons
unitData.lessons.forEach((lesson, idx) => {
  if (mrpExamPractice[idx]) {
    lesson.exam_practice = mrpExamPractice[idx];
  }
});

// Serialize back to units/monarchy_religion_power/data.js
const serialized = `const monarchy_religion_power_data = ${JSON.stringify(unitData, null, 2)};\n\nif (typeof window !== "undefined") {\n  window.MONARCHY_RELIGION_POWER_DATA = monarchy_religion_power_data;\n}\nexport const unitData = monarchy_religion_power_data;\nexport default monarchy_religion_power_data;\n`;
fs.writeFileSync(dataFilePath, serialized, 'utf8');
console.log('✅ Successfully synchronized all 5 lessons of Monarchy, Religion & Power with workbook examination practice!');
