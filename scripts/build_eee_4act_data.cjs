/**
 * scripts/build_eee_4act_data.cjs
 *
 * History Revision Hub — Publisher-Level Academic Authoring Pipeline
 * Target: units/eee/data.js (Paper 2: Early Elizabethan England, 1558–1588)
 *
 * Upgrades all 12 lessons to the Christine Counsell 4-Act Master Standard:
 * - Act 1: Context & Catalyst (Paragraphs [1.1], [1.2], [1.3])
 * - Act 2: Escalation & Conflict (Paragraphs [2.1], [2.2], [2.3])
 * - Act 3: Forensic Archival Evidence (Paragraphs [3.1], [3.2], [3.3])
 * - Act 4: Historical Verdict & Synoptic Resolution (Paragraphs [4.1], [4.2], [4.3])
 *
 * Guarantees:
 * - 100% Pearson Edexcel GCSE 9-1 specification and textbook vocabulary.
 * - Exciting, dramatic prose with authentic mechanisms and historical suspense.
 * - Master Disciplinary Enquiry Task for every lesson (high-tariff extended writing with structure strips, connectives, and Grade 9 model answers).
 * - Full preservation of existing 20-question recall quizzes, vocab, flashcards, videos, exam practice, and metadata.
 * - Strict institutional neutrality (Zero school names or teacher surnames).
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');
const targetFile = path.join(ROOT_DIR, 'units', 'eee', 'data.js');

// 1. Helper to extract the lessons array from a textbook render script
function getLessonsFromScript(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const start = content.indexOf('const lessons = [');
  if (start === -1) throw new Error(`Could not find 'const lessons = [' in ${filePath}`);

  let depth = 0;
  let end = -1;
  for (let i = start + 16; i < content.length; i++) {
    if (content[i] === '[') depth++;
    else if (content[i] === ']') {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  const code = 'var extracted = ' + content.substring(start + 16, end + 1) + ';';
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.extracted;
}

// 2. Load textbook lessons for KT1, KT2, KT3
console.log('Loading rich textbook narratives from scripts...');
const kt1Textbook = getLessonsFromScript(
  path.join(ROOT_DIR, 'scripts', 'render_standard_textbook_eee_kt1.cjs'),
);
const kt2Textbook = getLessonsFromScript(
  path.join(ROOT_DIR, 'scripts', 'render_standard_textbook_eee_kt2.cjs'),
);
const kt3Textbook = getLessonsFromScript(
  path.join(ROOT_DIR, 'scripts', 'render_standard_textbook_eee_kt3.cjs'),
);

const textbookLessonsMap = {
  lesson_1_1: kt1Textbook[0],
  lesson_1_2: kt1Textbook[1],
  lesson_1_3: kt1Textbook[2],
  lesson_1_4: kt1Textbook[3],
  lesson_2_1: kt2Textbook[0],
  lesson_2_2: kt2Textbook[1],
  lesson_2_3: kt2Textbook[2],
  lesson_2_4: kt2Textbook[3],
  lesson_3_1: kt3Textbook[0],
  lesson_3_2: kt3Textbook[1],
  lesson_3_3: kt3Textbook[2],
  lesson_3_4: kt3Textbook[3],
};

// 3. Load live units/eee/data.js
console.log('Loading current units/eee/data.js...');
const rawLive = fs.readFileSync(targetFile, 'utf8');
const cleanJs = rawLive.replace('export const unitData =', 'var unitData =');
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(cleanJs, sandbox);
const liveData = sandbox.unitData;

// 4. Load Enquiry data & structure strips from enhance_eee_workbook.cjs
const { ENQUIRY_STAGES } = require('./enhance_eee_workbook.cjs');

// 5. High-Tariff Master Disciplinary Enquiry Tasks definitions
const MASTER_ENQUIRY_TASKS = {
  lesson_1_1: {
    title: 'Master Disciplinary Enquiry Task',
    prompt:
      'Explain why Elizabeth’s legitimacy was questioned when she became queen in 1558. [12 marks]',
    type: 'extended_writing',
    scaffolding: {
      sentence_starters: [
        'Elizabeth’s legitimacy was challenged upon her accession primarily because Roman Catholic canon law...',
        'Compounding this theological doubt, Henry VIII’s own legislative actions undermined her status when...',
        'Furthermore, foreign Catholic monarchs and papacy viewed Mary Stuart as the rightful queen because...',
        'Ultimately, this legitimacy crisis directly threatened domestic stability because...',
      ],
      causal_connectives: [
        'Consequently, this meant that',
        'In direct contrast to this',
        'Furthermore, this was compounded by',
        'Crucially, this created enduring doubt because',
        'Ultimately, this demonstrates that',
      ],
      evaluative_criteria: [
        'Analyze the impact of Pope Clement VII’s refusal to annul Henry VIII’s marriage to Catherine of Aragon.',
        'Explain how the 1536 Second Succession Act created statutory ambiguity regarding Elizabeth’s royal title.',
        'Evaluate why Mary Stuart’s rival Catholic claim made the question of legitimacy an existential threat to the Tudor regime.',
      ],
    },
    model_answer:
      'Elizabeth I’s legitimacy was fundamentally questioned upon her accession in November 1558 due to an intractable combination of Roman Catholic theological dogma, Henry VIII’s own contradictory succession legislation, and the existence of a viable Catholic rival in Mary, Queen of Scots.<br><br>The primary cause of the challenge stemmed from Roman Catholic canon law regarding marriage. To devout Catholics across England and Europe, King Henry VIII’s first wife, Catherine of Aragon, remained his only lawful, God-ordained spouse until her death in 1536. Pope Clement VII had steadfastly refused to annul their marriage. Consequently, when Henry broke with Rome and married Anne Boleyn in 1533, Catholic doctrine viewed the union as bigamous, adulterous, and illegal. Elizabeth, born to Anne in September 1533, was therefore branded an illegitimate child with zero divine right to inherit the crown. In an age where monarchs ruled by Divine Right, illegitimacy was not merely a personal insult, but a fatal constitutional barrier.<br><br>Furthermore, this theological objection was reinforced by Henry VIII’s own parliamentary statutes. Following Anne Boleyn’s arrest and execution for treason in May 1536, Parliament passed the 1536 Second Succession Act, which formally declared Elizabeth illegitimate and removed her from the royal succession. Although Henry’s Third Succession Act of 1544 restored Elizabeth to the line of inheritance after Edward and Mary, it pointedly never repealed her legal illegitimacy. Conservative peers in the House of Lords and northern Catholic magnates seized upon this legal contradiction to argue that Elizabeth sat upon the throne merely by parliamentary statute rather than unchallengeable divine law.<br><br>Finally, the crisis was dramatically magnified by the presence of Mary Stuart, Queen of Scots. As the granddaughter of Henry VIII’s elder sister Margaret Tudor, Mary was viewed by strict Roman Catholics as the senior, uncontested, and legitimately born Catholic heir to the English crown. Her marriage to Francis, the Dauphin of France, united French military might with her dynastic pedigree. Ultimately, Elizabeth’s contested legitimacy was far more than an abstract debate; it provided a continuous moral justification for Catholic foreign powers and domestic conspirators to justify rebellion and regicide throughout the first three decades of her reign.',
  },

  lesson_1_2: {
    title: 'Master Disciplinary Enquiry Task',
    prompt:
      'Explain why the Catholic Church opposed Elizabeth’s Religious Settlement of 1559. [12 marks]',
    type: 'extended_writing',
    scaffolding: {
      sentence_starters: [
        'The Catholic Church and papacy fiercely opposed the 1559 Settlement because the Act of Supremacy...',
        'In addition, traditional Catholic clergy objected to the Act of Uniformity and the Book of Common Prayer because...',
        'Furthermore, the Royal Injunctions assaulted traditional Catholic parish piety by...',
        'Consequently, this institutional opposition transformed religious nonconformity into...',
      ],
      causal_connectives: [
        'Primarily because',
        'Crucially, this dismantled',
        'In addition to doctrinal grievances',
        'Consequently, this compelled conservative peers to',
        'Ultimately, this proves that',
      ],
      evaluative_criteria: [
        'Assess the constitutional rejection of the Pope’s supreme jurisdiction over English Christendom.',
        'Examine Catholic outrage at vernacular English liturgy replacing the traditional Latin Mass.',
        'Explain how the destruction of shrines, relics, and images threatened centuries of communal Catholic devotion.',
      ],
    },
    model_answer:
      'The Roman Catholic Church and English Catholic traditionalists opposed Elizabeth I’s Religious Settlement of 1559 because it dismantled papal supremacy, eradicated the sacred Latin Mass, and launched a systematic assault on centuries of parish Catholic devotional practice.<br><br>First and foremost, the Catholic hierarchy rejected the constitutional premise of the Act of Supremacy (1559). Catholic theology dictated that the Pope was the direct successor of Saint Peter and the sole universal head of Christ’s Church on earth. Elizabeth’s decision to sever ties with the Holy See and declare herself ‘Supreme Governor’ of the Church of England was condemned by Rome as a heretical usurpation of divine authority. Every Marian bishop in the House of Lords opposed the legislation during the bitter parliamentary debates of 1559. When the compulsory Oath of Supremacy was administered, all but one Catholic bishop refused to swear fealty to a secular, female sovereign and were stripped of their bishoprics, demonstrating the irreconcilable divide between papal allegiance and royal supremacy.<br><br>Secondly, Catholics fiercely resisted the Act of Uniformity (1559) and its mandatory Book of Common Prayer. For Catholic worshippers, the Latin Mass was not merely a ceremony, but the sacred miracle of transubstantiation, where the bread and wine physically transformed into the real body and blood of Jesus Christ. Replacing Latin with vernacular English and removing the traditional Catholic elevation of the host reduced the service, in Catholic eyes, to an empty Protestant memorial meal. Although Cecil crafted ambiguous communion wording to allow private interpretation, conservative believers viewed attending the parish church as an act of apostasy that endangered their eternal salvation.<br><br>Finally, Catholic hostility was deepened by the Royal Injunctions of 1559, which attacked traditional parish piety. The Injunctions outlawed pilgrimages to holy wells, ordered the destruction of sacred relics, and banned the burning of candles before images of the Virgin Mary and saints. For ordinary conservative parishioners in the North and West, these ancestral rituals provided comfort, identity, and communal solidarity. By imposing a fine of one shilling on recusants who refused to attend church on Sundays, the regime criminalized traditional worship, setting the stage for decades of recusant resistance and armed Catholic revolt.',
  },

  lesson_1_3: {
    title: 'Master Disciplinary Enquiry Task',
    prompt:
      'Explain why the Puritan challenge to the Religious Settlement was significant between 1559 and 1570. [12 marks]',
    type: 'extended_writing',
    scaffolding: {
      sentence_starters: [
        'The Puritan challenge was significant primarily because Puritans held influential positions within...',
        'Specifically, the Crucifix Controversy demonstrated the limits of royal authority when...',
        'Furthermore, the 1566 Vestment Controversy highlighted Puritan resistance because...',
        'Ultimately, while Puritans lacked military force, their ideological challenge was serious because...',
      ],
      causal_connectives: [
        'Most decisively, this was because',
        'Furthermore, this challenged royal policy by',
        'In direct response to this',
        'Consequently, Elizabeth was forced to',
        'This demonstrates that',
      ],
      evaluative_criteria: [
        'Examine Puritan influence within the Church of England hierarchy, Privy Council, and London merchant class.',
        'Analyze the Crucifix and Vestment Controversies as tests of Elizabeth’s royal prerogative and uniformity.',
        'Evaluate why Puritans remained politically loyal to Elizabeth despite their theological fury.',
      ],
    },
    model_answer:
      'The Puritan challenge to Elizabeth I’s Religious Settlement between 1559 and 1570 was highly significant because it emerged from within the Church of England itself, challenged the Queen’s royal prerogative on ceremonial uniformity, and was led by influential Protestant bishops and educated London clergy.<br><br>A central reason for the significance of the Puritan challenge was the institutional influence held by Puritan reformers. Returning from exile in Geneva and Zurich after Mary I’s death, these Marian exiles were appointed to high ecclesiastical offices because Elizabeth desperately needed educated Protestant clergymen to replace the Marian bishops who had refused the Oath of Supremacy. Leaders like Edmund Grindal (Bishop of London) and John Jewel (Bishop of Salisbury) adhered to strict Calvinism, believing the 1559 Settlement was an incomplete compromise that retained the ‘dregs of popery’. Their positions at court, within the Privy Council (supported by Robert Dudley, Earl of Leicester), and in Parliament gave them an institutional platform to challenge royal directives from the inside.<br><br>The significance of this ideological divide erupted in the Crucifix Controversy of 1559–1560. Elizabeth, seeking to comfort conservative Catholic subjects and foreign Catholic diplomats, ordered that a silver crucifix and candles remain in her royal chapel and on parish rood screens. Puritan bishops condemned crucifixes as idolatrous images violating the Second Commandment, threatening to resign their bishoprics en masse if forced to enforce the rule. Lacking educated Protestant ministers to replace them, Elizabeth was forced to compromise: she removed crucifixes from parish churches while stubbornly keeping one in her private chapel. This was a rare, humiliating tactical retreat for the Queen, proving that Puritan bishops could successfully constrain the royal prerogative.<br><br>Furthermore, the 1566 Vestment Controversy proved that Puritan resistance was entrenched among the grassroots London clergy. Puritans argued that the mandatory white linen surplice resembled Catholic mass vestments and implied priestly powers. In 1566, Archbishop Matthew Parker issued the *Book of Advertisements* and summoned 110 London ministers to Lambeth Palace for a dress inspection. Thirty-seven ministers boldly refused to conform and were immediately stripped of their livings. While this demonstrated the regime’s resolve, it also showed that Puritanism had established deep roots in London and Cambridge University. Ultimately, the Puritan challenge was significant because it prevented the Settlement from settling: while Puritans never rebelled militarily because they feared a Catholic successor, their persistent agitation created a permanent fissure within English Protestantism.',
  },

  lesson_1_4: {
    title: 'Master Disciplinary Enquiry Task',
    prompt:
      'Explain why Mary, Queen of Scots, posed a major threat to Elizabeth I between 1568 and 1569. [12 marks]',
    type: 'extended_writing',
    scaffolding: {
      sentence_starters: [
        'Mary, Queen of Scots, posed an immediate dynastic threat upon her arrival in 1568 because...',
        'In addition, Mary’s presence on English soil acted as a magnetic catalyst for...',
        'Furthermore, the mysterious Casket Letters and the Conference of York complicated the crisis because...',
        'Ultimately, Mary represented an insoluble constitutional threat because Elizabeth could neither...',
      ],
      causal_connectives: [
        'Primarily because',
        'Crucially, this meant that',
        'Furthermore, this emboldened',
        'Consequently, this trapped Elizabeth in',
        'Ultimately, this demonstrates that',
      ],
      evaluative_criteria: [
        'Assess Mary Stuart’s dynastic legitimacy compared to Elizabeth under Catholic canon law.',
        'Analyze Mary’s role as an inspiring figurehead for discontented northern Catholic nobles.',
        'Explain how the four-way diplomatic dilemma paralyzed English foreign policy.',
      ],
    },
    model_answer:
      'Mary, Queen of Scots, posed an existential threat to Elizabeth I between 1568 and 1569 because her sudden arrival in England provided English Catholics with a legitimate, charismatic, and living alternative monarch, galvanizing domestic aristocratic rebellion and paralyzing Elizabeth’s conciliar foreign policy.<br><br>The primary cause of the threat was Mary Stuart’s unquestioned dynastic pedigree. As the granddaughter of Henry VIII’s elder sister Margaret Tudor, Mary was Elizabeth’s first cousin once removed. Under Roman Catholic canon law, which viewed Henry’s marriage to Anne Boleyn as invalid and Elizabeth as an illegitimate child, Mary was regarded as the rightful, God-ordained Queen of England. Unlike Elizabeth, Mary had produced a male heir, Prince James, securing dynastic continuity. When Mary fled across the Solway Firth in an open fishing boat in May 1568 following her defeat at Langside, her physical presence on English soil transformed an abstract dynastic rivalry into an urgent, domestic constitutional emergency.<br><br>Secondly, Mary immediately became a magnetic focal point for domestic Catholic conspiracy. In northern England, ancient feudal families like the Percys (Earls of Northumberland) and the Nevilles (Earls of Westmorland) felt alienated by Elizabeth’s centralization of power in the hands of Protestant ‘new men’ like William Cecil. Mary’s captivity at Tutbury and Sheffield under the Earl of Shrewsbury gave northern magnates a champion to rally around. In 1569, conservative peers hatched the Norfolk Marriage Plot, scheming to marry Mary to Thomas Howard, Duke of Norfolk, to force Elizabeth to declare Mary her successor. When Elizabeth uncovered the conspiracy, it triggered the armed Revolt of the Northern Earls in November 1569, where 4,600 Catholic rebels marched to liberate Mary and restore the Latin Mass.<br><br>Finally, Mary created an insoluble diplomatic and legal trap for Elizabeth. As an anointed sovereign, Mary could not be put on trial by English subjects without establishing a dangerous precedent that undermined monarchical sanctity. Elizabeth could not restore Mary to Scotland with English troops without alienating Scotland’s friendly Protestant regents; she could not release Mary to France, where the Catholic Guise family would launch a foreign invasion; and she could not grant her freedom in England without inciting civil war. Even the 1568–1569 Conference of York, which examined the controversial Casket Letters, produced a calculated verdict of ‘not proven’. Ultimately, Mary posed a supreme threat because keeping her in captivity merely transformed her from a discredited Scottish fugitive into a martyr for the Catholic cause, guaranteeing decades of domestic treason.',
  },

  lesson_2_1: {
    title: 'Master Disciplinary Enquiry Task',
    prompt: 'Explain why the Revolt of the Northern Earls failed in 1569. [12 marks]',
    type: 'extended_writing',
    scaffolding: {
      sentence_starters: [
        'The Revolt of the Northern Earls failed primarily due to disastrous military leadership and planning, as...',
        'Furthermore, the rebellion was doomed because the promised foreign military assistance from Spain...',
        'In addition, the rebels failed to secure nationwide support among English Catholics because...',
        'Ultimately, Elizabeth’s decisive military response and the loyalty of southern nobles ensured that...',
      ],
      causal_connectives: [
        'Consequently, this prevented',
        'Crucially, this meant that',
        'In direct contrast to their expectations',
        'Furthermore, this was compounded by',
        'This demonstrates that',
      ],
      evaluative_criteria: [
        'Evaluate the tactical miscalculations of the Earls of Northumberland and Westmorland.',
        'Analyze the failure of Spanish troops from the Netherlands to materialize.',
        'Explain why Catholic gentry across the Midlands and South remained loyal to the Crown.',
      ],
    },
    model_answer:
      'The Revolt of the Northern Earls collapsed in December 1569 due to a combination of indecisive rebel leadership, the total failure of foreign Catholic military intervention, the refusal of the wider English Catholic gentry to mobilize, and Elizabeth I’s swift, overwhelming military retaliation.<br><br>A primary reason for the failure of the uprising was the poor organization and erratic strategy of the rebel leaders, the Earl of Northumberland and the Earl of Westmorland. Although they succeeded in raising 4,600 armed men, capturing Durham Cathedral, and celebrating Catholic Mass, they possessed no coherent long-term military plan. Their initial objective was to march south to Tutbury Castle and liberate Mary, Queen of Scots. However, as soon as the Privy Council received warning of the rebellion, the Earl of Shrewsbury moved Mary further south to Coventry, entirely beyond the rebels’ reach. Deprived of their figurehead, the northern earls hesitated, wasting precious weeks besieging Barnard Castle instead of marching decisively toward London, allowing royal armies time to organize.<br><br>Furthermore, the rebellion was doomed by the complete absence of foreign Catholic support. The northern earls had launched their revolt under the false expectation that King Philip II of Spain would dispatch veteran troops from the Netherlands under the Duke of Alba to seize the deep-water port of Hartlepool and reinforce their campaign. However, Philip II was deeply suspicious of Mary Stuart’s close dynastic ties to the French royal house and had no interest in expending Spanish soldiers and treasure to install a pro-French queen on the English throne. Consequently, Alba never dispatched a single soldier, leaving the northern rebels isolated and unsupported against the full military resources of the Tudor state.<br><br>Finally, the rebellion failed to ignite widespread rebellion across England. The vast majority of English Catholics, particularly across Lancashire, Cheshire, and the Midlands, refused to join the revolt. Despite their religious sympathy for Catholicism, they viewed armed rebellion against an anointed queen as a mortal sin and treason against their country. When the Earl of Sussex and the Earl of Warwick marched north with a massive royal army of 14,000 soldiers, rebel morale disintegrated. The earls fled to Scotland, and Elizabeth exacted brutal retribution, executing approximately 450 ordinary rebels to permanently terrorize the North into submission. Ultimately, the revolt failed because it was a regional, backward-looking feudal uprising that lacked national momentum and foreign backing.',
  },

  lesson_2_2: {
    title: 'Master Disciplinary Enquiry Task',
    prompt: 'Explain why Mary, Queen of Scots, was executed in February 1587. [12 marks]',
    type: 'extended_writing',
    scaffolding: {
      sentence_starters: [
        'Mary, Queen of Scots, was executed primarily because Sir Francis Walsingham obtained undeniable forensic evidence of her treason in...',
        'Furthermore, the political climate had hardened dramatically following the Bond of Association (1584) because...',
        'In addition, foreign geopolitical developments, particularly the Treaty of Nonsuch and war with Spain, meant that...',
        'Ultimately, despite Elizabeth’s personal hesitation, Parliament and the Privy Council insisted on execution because...',
      ],
      causal_connectives: [
        'Most decisively, this was because',
        'Furthermore, this legally bound Parliament to',
        'Consequently, this eliminated',
        'In direct response to this proof',
        'This demonstrates that',
      ],
      evaluative_criteria: [
        'Analyze Walsingham’s intelligence sting that uncovered the Babington Plot of 1586.',
        'Explain the legal mechanism of the Bond of Association and the 1585 Act for the Queen’s Safety.',
        'Evaluate Elizabeth’s personal reluctance to execute an anointed monarch versus conciliar pressure.',
      ],
    },
    model_answer:
      'Mary, Queen of Scots, was executed at Fotheringhay Castle on 8 February 1587 because Sir Francis Walsingham secured undeniable documentary proof of her complicity in the Babington Plot to assassinate Elizabeth, within a political environment where parliament had already legislated for her death and war with Spain made her survival an unacceptable security risk.<br><br>The immediate catalyst for Mary’s execution was the forensic evidence uncovered during the Babington Plot of 1586. Walsingham, Elizabeth’s ruthless spymaster, established a sophisticated double-agent sting operation around Chartley Manor, where Mary was imprisoned under Sir Amias Paulet. Using a double agent named Gilbert Gifford, Walsingham intercepted secret correspondence hidden inside watertight beer barrels travelling between Mary and Catholic conspirator Anthony Babington. When Babington outlined a plot to murder Elizabeth with Spanish backing, Mary wrote back on 17 July 1586 explicitly giving her approval to the assassination. Walsingham’s cipher secretary, Thomas Phelippes, decoded the letter and forged a postscript asking for the conspirators’ names. This provided the undeniable legal evidence of high treason that Cecil and Walsingham had sought for nearly two decades.<br><br>Furthermore, the constitutional framework of England had already been redesigned to ensure Mary’s death. Following the assassination of Dutch Protestant leader William the Silent in 1584, Cecil and Walsingham drafted the **Bond of Association**, signed by thousands of English nobles and gentry, pledging to execute anyone in whose name an assassination attempt on Elizabeth was made. In 1585, Parliament enshrined this into statutory law as the **Act for the Queen’s Safety**. When Mary was tried by a commission of 46 peers at Fotheringhay Castle in October 1586, she was found guilty of plotting Elizabeth’s destruction. Parliament unanimously petitioned Elizabeth for Mary’s immediate execution, arguing that England could never be safe while Mary drew breath.<br><br>Finally, geopolitical realities forced Elizabeth’s hand. By 1586, England and Spain were engaged in open war in the Netherlands under the Treaty of Nonsuch, and Philip II was assembling the Armada. Mary was the designated Catholic successor whom Philip intended to place on the throne. Although Elizabeth was horrified by the terrifying precedent of executing an anointed cousin and hesitated for four months, she signed the death warrant on 1 February 1587. When the Privy Council dispatched it in secret, Mary was beheaded. Ultimately, Mary was executed because her proven willingness to sanction Elizabeth’s murder made her a living weapon in the hands of Catholic Spain.',
  },

  lesson_2_3: {
    title: 'Master Disciplinary Enquiry Task',
    prompt:
      'Explain why relations between England and Spain deteriorated between 1585 and 1588. [12 marks]',
    type: 'extended_writing',
    scaffolding: {
      sentence_starters: [
        'Relations deteriorated into open warfare primarily because Elizabeth signed the Treaty of Nonsuch (1585), which...',
        'Furthermore, commercial and naval aggression severely escalated tensions when Francis Drake...',
        'In addition, the execution of Mary, Queen of Scots, in 1587 removed Philip II’s last diplomatic hesitation because...',
        'Ultimately, Drake’s raid on Cadiz in 1587 confirmed to Philip that England could only be subdued through...',
      ],
      causal_connectives: [
        'Consequently, this transformed',
        'Crucially, this directly challenged',
        'Furthermore, this financial damage compelled',
        'In direct retaliation for this',
        'This demonstrates that',
      ],
      evaluative_criteria: [
        'Analyze the impact of the 1585 Treaty of Nonsuch and Leicester’s military expedition to the Netherlands.',
        'Examine Drake’s privateering rampage across the Caribbean and the preemptive strike on Cadiz.',
        'Evaluate how religious ideology and Mary Stuart’s execution provided the final justification for the Armada.',
      ],
    },
    model_answer:
      'Relations between England and Spain deteriorated rapidly from an undeclared cold war into direct, open naval confrontation between 1585 and 1588 due to direct English military intervention in the Netherlands, destructive privateering raids by Sir Francis Drake, the execution of Mary Stuart, and the humiliation of the Cadiz raid.<br><br>The decisive turning point was Elizabeth I’s signature of the **Treaty of Nonsuch in August 1585**. For nearly two decades, Elizabeth had avoided direct military conflict with Spain, preferring covert funding for Dutch rebels. However, following the 1584 Treaty of Joinville—an alliance between Philip II and the French Catholic League—and the Spanish Duke of Parma’s capture of Antwerp, Protestant survival in the Netherlands faced extinction. Under Nonsuch, Elizabeth crossed the Rubicon, agreeing to send 7,400 English soldiers under Robert Dudley, Earl of Leicester, to fight Spanish forces directly, while taking the cautionary towns of Brill and Flushing as collateral. By committing an English army to fight Spanish troops on European soil, Elizabeth ended any diplomatic ambiguity; Philip II viewed Nonsuch as an explicit declaration of war.<br><br>Secondly, English naval aggression inflicted catastrophic financial and psychological damage on Philip’s global empire. In September 1585, Elizabeth dispatched Sir Francis Drake with 29 warships to raid Spanish colonies in the Caribbean. Drake sacked Santiago in the Cape Verde Islands, captured Santo Domingo in Hispaniola, and seized Cartagena in Colombia, demanding massive ransoms and disrupting the Spanish treasure fleet. This humiliated Philip II, bankrupting major Genoese banks that financed the Spanish Crown and convincing Spanish grandees that English privateering would continue to bleed Spain dry until the Tudor regime was overthrown.<br><br>Finally, the conflict reached an ideological point of no return with the execution of Mary, Queen of Scots, in February 1587 and Drake’s Cadiz raid in April 1587. Mary’s death removed Philip’s diplomatic hesitation: previously, he feared that placing Mary on the English throne would benefit her French relatives; now, Philip claimed the English throne for himself and his daughter, Isabella. Pope Sixtus V promised a massive subsidy of one million gold ducats upon the Armada’s landing. When Drake audaciously sailed into Cadiz harbor in April 1587—‘singeing the King of Spain’s beard’ by destroying 30 Spanish ships and thousands of tons of provisions—he delayed the invasion by a year but cemented Philip’s determination. By 1588, war was inevitable as Philip launched the ‘Enterprise of England’ to crush English Protestantism once and for all.',
  },

  lesson_2_4: {
    title: 'Master Disciplinary Enquiry Task',
    prompt:
      '‘The main reason for the defeat of the Spanish Armada was the English use of fireships at Calais.’ How far do you agree? [16 marks + 4 SPaG]',
    type: 'extended_writing',
    scaffolding: {
      sentence_starters: [
        'It can be argued that the fireships at Calais were the decisive turning point because they shattered...',
        'However, English technological superiority and artillery gunnery were equally significant because...',
        'Furthermore, inherent structural flaws in Philip II’s grand strategy doomed the Armada from the outset because...',
        'Finally, the adverse weather conditions—the famous ‘Protestant Wind’—inflicted the ultimate destruction by...',
      ],
      causal_connectives: [
        'On the other hand',
        'Most decisively, this meant that',
        'Consequently, this tactical blunder resulted in',
        'Furthermore, this was compounded by',
        'Ultimately, in evaluating the balance of causes',
      ],
      evaluative_criteria: [
        'Assess the tactical shock of the midnight fireship attack on 7 August 1588 at Calais Roads.',
        'Analyze the impact of Hawkins’ race-built galleons, maneuverability, and rapid-firing culverin cannons.',
        'Evaluate the communication and logistical breakdown between Medina Sidonia and the Duke of Parma.',
        'Synthesize the role of the gale-force storms that wrecked the Spanish fleet off Scotland and Ireland.',
      ],
    },
    model_answer:
      'The defeat of the Spanish Armada in August 1588 was the defining geopolitical event of the Elizabethan era. While the midnight fireship attack at Calais was unquestionably the tactical catalyst that broke the Armada’s invulnerable crescent formation, it was not the sole reason for defeat. The Spanish enterprise collapsed due to a combination of inherent strategic and logistical planning failures, superior English naval technology and gunnery, and the devastating intervention of adverse weather.<br><br>There is strong evidence that the fireship attack at Calais on the night of 7–8 August 1588 was the decisive operational turning point of the campaign. Throughout its voyage up the English Channel, the Armada maintained an impenetrable, disciplined crescent formation that prevented English warships from inflicting serious damage. However, when the 130 Spanish ships anchored at Calais Roads, Lord Howard of Effingham and Francis Drake dispatched eight ‘hell-burners’—empty wooden hulls filled with tar, gunpowder, and loaded cannons, set ablaze and propelled by wind and tide toward the crowded anchorage. Terrified of being incinerated, Spanish captains panicked, cut their heavy anchor cables, and scattered into the dark North Sea. The crescent was permanently shattered: the Armada never regained its formation, leaving individual galleons vulnerable to coordinated broadside fire at the Battle of Gravelines the following morning.<br><br>However, attributing defeat solely to the fireships ignores the decisive role of English naval technology and tactical gunnery. Under the leadership of Sir John Hawkins, the Royal Navy had revolutionized naval architecture, constructing new ‘race-built’ galleons like the *Revenge* that were faster, sat lower in the water, and were far more maneuverable than the top-heavy Spanish floating fortresses. Crucially, English ships were equipped with long-range culverin cannons mounted on compact truck carriages, allowing English gunners to reload and fire broadsides three to four times faster than their Spanish counterparts. At Gravelines, English warships closed to point-blank range, raking Spanish hulls with devastating iron shot without boarding, inflicting over 1,000 casualties and crippling the flagship *San Mateo*.<br><br>Furthermore, Philip II’s campaign plan suffered from catastrophic structural flaws from its inception. The Duke of Medina Sidonia, a nobleman with zero naval combat experience, was ordered to rendezvous with the Duke of Parma’s army of 27,000 veterans in the Spanish Netherlands. However, Parma lacked a deep-water port, and his transport barges were blockaded inside canals by shallow-draft Dutch flyboats. There was no radio or instant communication: messages between Medina Sidonia and Parma took over forty-eight hours to deliver by horseback. When the Armada arrived off Calais, Parma’s army was not even embarked, rendering the entire rendezvous impossible.<br><br>Finally, the elements played an insurmountable role in completing the destruction. Following Gravelines, a furious south-westerly gale—celebrated by English Protestants as the ‘Protestant Wind’—blew the anchorless Spanish fleet northward into the North Sea, preventing any return through the Channel. Medina Sidonia was forced to order a perilous 2,000-mile circumnavigation around the rocky, uncharted coasts of Scotland and Ireland. Battered by autumn storms, deprived of fresh water, and lacking anchors, dozens of galleons were wrecked on the rocks of Connacht and Ulster, where surviving crews were slaughtered. Barely 65 battered vessels returned to Spain.<br><br>In conclusion, while the Calais fireships were the immediate spark that disrupted the crescent formation and enabled the victory at Gravelines, they succeeded only because Spanish planning was fundamentally flawed. An unworkable rendezvous, coupled with superior English artillery and catastrophic Atlantic weather, meant that the Armada was strategically doomed from the moment it set sail.',
  },

  lesson_3_1: {
    title: 'Master Disciplinary Enquiry Task',
    prompt:
      'Explain why there was a significant expansion in education in Elizabethan England. [12 marks]',
    type: 'extended_writing',
    scaffolding: {
      sentence_starters: [
        'Education expanded significantly under Elizabeth primarily because Renaissance humanism...',
        'In addition, the Protestant Reformation created a powerful religious motive for literacy because...',
        'Furthermore, economic growth and international trade required an educated administrative class of...',
        'Ultimately, the endowment of over 70 new grammar schools by wealthy philanthropists meant that...',
      ],
      causal_connectives: [
        'Primarily driven by',
        'Furthermore, this was compounded by',
        'Consequently, there was an urgent demand for',
        'In addition to religious motives',
        'This demonstrates that',
      ],
      evaluative_criteria: [
        'Analyze the influence of Renaissance humanist philosophy on the ruling class.',
        'Explain Protestant religious imperatives regarding personal vernacular Bible reading.',
        'Evaluate the economic demand for literate merchants, lawyers, clerks, and stewards.',
      ],
    },
    model_answer:
      'Education expanded significantly in Elizabethan England between 1558 and 1588 due to the powerful intellectual influence of Renaissance humanism, Protestant religious imperatives regarding personal Bible reading, the rapid growth of domestic commerce and international trade, and the philanthropic endowment of grammar schools.<br><br>A primary catalyst was the intellectual revolution of **Renaissance humanism**. Humanist scholars like Erasmus argued that education was not merely for Catholic monks, but was essential for training virtuous, civilized gentlemen capable of serving their monarch and society. The Elizabethan nobility and rising gentry embraced the idea that a true leader required education in classical Latin, Greek, history, philosophy, and rhetoric. Wealthy families hired humanist private tutors for their sons and, increasingly, for daughters like Elizabeth herself and Lady Jane Grey. For young gentlemen destined for public office or Parliament, formal education was rounded off at Oxford or Cambridge universities and the Inns of Court in London to study common law.<br><br>Secondly, the **Protestant Reformation** transformed literacy into a sacred religious duty. Protestant theology rejected Catholic Latin services, insisting that every Christian was personally responsible for their own salvation, which required reading the English Bible and understanding the Book of Common Prayer. Parents were urged to teach children the catechism at home. This religious imperative sparked a proliferation of **petty schools**—small local classes often run by parish priests or housewives for children aged four to seven—teaching basic reading, writing, and arithmetic. For the middling sort, literacy was no longer an elite luxury, but a vital spiritual safeguard.<br><br>Furthermore, **economic expansion and commercial bureaucracy** created a pressing practical demand for literate and numerate workers. Elizabethan England experienced a boom in domestic commerce, joint-stock enterprises, and maritime trade. Merchants, estate owners, and magistrates required clerks, account keepers, stewards, and lawyers who could draft legal contracts, maintain financial ledgers, and navigate complex property transactions. A yeoman farmer who could read could avoid being cheated by unscrupulous landlords during enclosure disputes, making education an instrument of practical economic protection and social mobility.<br><br>Finally, this economic surge was channeled into institutional philanthropy. Wealthy merchants and gentry, enriched by the wool trade, established and endowed over **70 new grammar schools** during Elizabeth’s reign. Because these schools were funded by endowments, fees were low or non-existent for bright boys from humble backgrounds, offering scholarships for the sons of yeomen, tradesmen, and craftsmen. While girls and agricultural laborers remained largely excluded, the Elizabethan era witnessed an unprecedented widening of literacy that laid the foundations for England’s administrative and literary golden age.',
  },

  lesson_3_2: {
    title: 'Master Disciplinary Enquiry Task',
    prompt:
      'Explain why poverty and vagabondage increased significantly during the Elizabethan era. [12 marks]',
    type: 'extended_writing',
    scaffolding: {
      sentence_starters: [
        'Poverty and vagrancy increased rapidly primarily because a massive population surge caused...',
        'In addition, agrarian upheaval in the countryside, particularly enclosure and sheep farming, resulted in...',
        'Furthermore, devastating economic shocks, including bad harvests and the collapse of the cloth trade, meant that...',
        'Ultimately, these structural pressures combined to create a permanent underclass of dispossessed vagrants because...',
      ],
      causal_connectives: [
        'Most decisively, this was because',
        'Consequently, this drove up',
        'In direct response to these pressures',
        'Furthermore, this was compounded by',
        'This demonstrates that',
      ],
      evaluative_criteria: [
        'Analyze demographic population growth and inflation (price rise) outstripping wage levels.',
        'Examine the conversion of arable farming to enclosed sheep farming and rack-renting.',
        'Evaluate the impact of catastrophic harvest failures and the dissolution of monastic charity.',
      ],
    },
    model_answer:
      'Poverty and vagrancy increased significantly during the Elizabethan era between 1558 and 1588 due to an explosive demographic population surge that drove runaway inflation, the transformation of arable farmland into enclosed sheep pastures, successive bad harvests, and the long-term absence of monastic charity.<br><br>The foundational cause of growing poverty was a massive **population explosion**. England’s population had plummeted after the Black Death, but during the sixteenth century it surged by 35%, growing from roughly 3 million in 1558 to over 4 million by 1603. This dramatic increase placed overwhelming pressure on finite resources. Food production could not keep pace with demand, causing food prices—especially for bread grain—to skyrocket. At the same time, the surplus of available laborers forced real wages downward, meaning ordinary working families could afford fewer basic necessities. This structural inflation was exacerbated by previous royal debasement of silver coinage, leaving thousands of day-laborers living on the knife-edge of destitution.<br><br>Secondly, agricultural changes dispossessed rural communities through **enclosure and sheep farming**. Historically, peasant farmers shared open communal fields, farming strips of land and grazing livestock on common land. In the sixteenth century, the international boom in raw wool led wealthy landowners to enclose open fields with hedges and fences, converting land from labor-intensive crop farming to sheep grazing. Sheep farming was vastly more profitable and required only a handful of shepherds rather than dozens of agricultural laborers. As landlords evicted tenant farmers and raised rents (‘rack-renting’), hundreds of rural families lost their livelihoods and homes. With no work in the countryside, they were forced on the road as wandering vagabonds.<br><br>Furthermore, the situation was punctuated by catastrophic **harvest failures and trade disruptions**. Bad weather led to failed harvests in the early 1570s, mid-1580s, and throughout the devastating 1590s. When grain failed, bread prices soared to famine levels, leaving urban day-laborers starving. Compounding this, political crises in the Spanish Netherlands caused recurrent collapses in the Antwerp cloth trade, England’s primary export industry, plunging thousands of spinners and weavers into sudden unemployment.<br><br>Finally, this crisis was exacerbated by the historical **dissolution of the monasteries** under Henry VIII in the 1530s. For centuries, religious houses had provided free food, shelter, and medical care for the sick, elderly, and destitute. Without monastic charity, the impoverished had nowhere to turn. By the 1570s, the surging numbers of ‘sturdy beggars’ roaming roads and flooding London created widespread panic among the ruling class, forcing Parliament to pass landmark Poor Laws in 1572 and 1576 to distinguish between the deserving impotent poor and the idle vagabond.',
  },

  lesson_3_3: {
    title: 'Master Disciplinary Enquiry Task',
    prompt:
      'Explain why Drake’s circumnavigation of the globe was significant for Elizabethan England. [12 marks]',
    type: 'extended_writing',
    scaffolding: {
      sentence_starters: [
        'Drake’s circumnavigation was significant primarily because it inflicted immense financial and psychological damage on Spain by...',
        'In addition, the voyage transformed England’s Crown finances and prestige because the treasure brought home...',
        'Furthermore, the voyage demonstrated that English naval design and navigational technology could...',
        'Ultimately, Drake’s success laid the ideological and commercial foundations for...',
      ],
      causal_connectives: [
        'Most decisively, this was because',
        'Consequently, this demonstrated that',
        'In addition to immediate financial wealth',
        'Furthermore, this challenged',
        'This demonstrates that',
      ],
      evaluative_criteria: [
        'Evaluate the physical plundering of Spanish treasure ships in the Pacific (e.g. the Cacafuego).',
        'Analyze the direct financial impact on Queen Elizabeth’s national debt and royal prestige.',
        'Explain the strategic challenge to the Iberian oceanic monopoly and inspiration for future empire.',
      ],
    },
    model_answer:
      'Sir Francis Drake’s circumnavigation of the globe between 1577 and 1580 was an event of monumental historical significance for Elizabethan England, shattering the myth of Spanish imperial invulnerability, transforming royal finances, demonstrating English navigational mastery, and inspiring the birth of an English global empire.<br><br>A primary significance of the circumnavigation was the catastrophic financial and psychological damage it inflicted on the Spanish Empire. Until Drake sailed into the Pacific Ocean through the Straits of Magellan in 1578, Spain considered the western coast of the Americas its private, inviolable sanctuary. Spanish treasure ports in Chile and Peru were completely unfortified, and Spanish merchant ships sailed unarmed. Drake’s lone flagship, the *Golden Hind*, raided port after port with total surprise, culminating in the capture of the royal treasure galleon *Nuestra Señora de la Concepción* (the *Cacafuego*), which yielded eighty pounds of pure gold, thirteen chests of silver coins, and twenty-six tons of unrefined silver bullion. This audacious raid shocked Madrid, panicked foreign investors, and proved that Spain’s vast oceanic trade routes were highly vulnerable to English naval attack.<br><br>Secondly, the voyage had a transformative effect on England’s royal treasury and Elizabeth’s domestic security. Drake returned to Plymouth in September 1580 carrying an estimated £400,000 in plundered treasure—a staggering sum that exceeded the Crown’s entire annual revenue. Elizabeth, who was a principal secret investor in the expedition, received her royal share, enabling her to pay off the entire foreign Crown debt, invest £42,000 in the newly founded Levant Company, and retain a massive surplus in the Exchequer. When Elizabeth boarded the *Golden Hind* at Deptford in April 1581 and knighted Drake on his own quarterdeck in the presence of the French ambassador, she sent an unmistakable diplomatic message that England openly celebrated privateering defiance against Catholic Spain.<br><br>Furthermore, the voyage was a triumph of navigational science and maritime endurance. Drake became the first Englishman to circumnavigate the earth, and only the second commander in human history to complete the voyage alive (unlike Magellan, who died en route). Using cutting-edge navigational tools—such as astrolabes, quadrants, and Mercator charts—Drake successfully navigated uncharted waters, charted northern California (which he claimed for Elizabeth as ‘Nova Albion’), and crossed the Pacific to Ternate in the Moluccas, negotiating a valuable trading treaty with the Sultan for six tons of precious cloves.<br><br>Ultimately, Drake’s circumnavigation was significant because it ignited a new national consciousness. It proved that English ships, seamen, and commanders were capable of operating globally, breaking the Iberian monopoly that had dominated the Age of Discovery and inspiring men like Walter Raleigh to envision an English empire in the Americas.',
  },

  lesson_3_4: {
    title: 'Master Disciplinary Enquiry Task',
    prompt:
      '‘Poor planning and bad leadership was the main reason the Roanoke colony failed in 1585–86.’ How far do you agree? [16 marks + 4 SPaG]',
    type: 'extended_writing',
    scaffolding: {
      sentence_starters: [
        'It can be argued that poor planning and leadership were primarily responsible because the colonists arrived too late in the year and...',
        'Furthermore, the makeup of the colonist group was deeply flawed because gentlemen adventurers refused to...',
        'However, bad luck and environmental disasters played a crucial role when the flagship Tiger ran aground and...',
        'Finally, escalating conflict with the indigenous Secotan people under Chief Wingina was equally critical because...',
      ],
      causal_connectives: [
        'On the other hand',
        'Crucially, this meant that',
        'Consequently, this tactical failure resulted in',
        'Furthermore, this was compounded by',
        'Ultimately, in evaluating the balance of causes',
      ],
      evaluative_criteria: [
        'Assess the strategic and organizational errors of Walter Raleigh, Richard Grenville, and Ralph Lane.',
        'Analyze the impact of the loss of food supplies when the Tiger struck a sandbar.',
        'Evaluate the social composition of the 108 male colonists (lack of farmers, surplus of soldiers and gentlemen).',
        'Synthesize the role of cultural misunderstandings and military violence against Chief Wingina.',
      ],
    },
    model_answer:
      'The failure of the first English settlement at Roanoke Island, Virginia, between 1585 and 1586 is a classic case study in early colonial vulnerability. While poor planning and arrogant military leadership were undeniably foundational causes of the collapse, they interacted fatally with unavoidable environmental misfortune and the complete breakdown of diplomatic relations with the indigenous Algonquian population.<br><br>There is compelling evidence that poor planning and inappropriate social composition doomed the colony from the outset. Sir Walter Raleigh, who organized and financed the expedition under royal patent, recruited a group of 108 men consisting primarily of aristocratic ‘gentlemen adventurers’ and discharged soldiers who had fought in Ireland. The gentlemen considered manual agricultural labor beneath their social dignity, while the soldiers possessed neither the agricultural knowledge nor the patience required to clear land and plant crops. Essential craftspeople, particularly skilled farmers and building laborers, were underrepresented, and there were no women to establish stable domestic family structures. Furthermore, the expedition departed England far too late in the spring, arriving at Roanoke in late summer, meaning it was impossible to plant crops in time for the autumn harvest. The colony was thus completely dependent on imported English provisions or handouts from the local Native Americans.<br><br>However, this structural weakness was drastically accelerated by environmental misfortune and bad luck. When the expedition’s fleet reached the treacherous Outer Banks of North Carolina in June 1585, the flagship *Tiger* struck a shallow sandbar while attempting to navigate the inlet. Seawater flooded the hold, ruining almost the entire supply of seed grain, barreled meat, peas, and flour intended to sustain the settlement through the winter. This single nautical accident instantly transformed a challenging colonization into an immediate struggle for survival, forcing the colonists to turn to the local Secotan tribe for emergency food.<br><br>Furthermore, aggressive and rigid leadership by Governor Ralph Lane turned manageable difficulties into an active crisis. Lane, a veteran military officer who had served in the brutal conquest of Ireland, treated the indigenous peoples not as equal trading partners, but as subjects to be cowed through intimidation. Although the local leader, Chief Wingina, initially welcomed the English and provided food, he soon grew weary of their constant demands, especially as European diseases—against which the indigenous population had no immunity—began devastating nearby villages. Convinced that the English possessed supernatural weapons or were deliberately poisoning his people, Wingina cut off food supplies. Instead of negotiating, Lane launched a preemptive military strike in June 1586, assassinating Wingina and beheading him. This severed any possibility of peaceful coexistence, leaving the colonists trapped inside their fort, terrified of imminent ambush.<br><br>When Sir Francis Drake arrived unexpectedly at Roanoke in late June 1586 after raiding the Spanish Caribbean, a sudden hurricane battered his fleet, destroying promised relief supplies. Utterly demoralized, starving, and terrified of Native American retribution, Lane and his men abandoned the settlement and boarded Drake’s ships for England, leaving behind a deserted outpost.<br><br>In conclusion, while the grounding of the *Tiger* triggered the acute food crisis, the ultimate failure of the 1585 colony was caused by poor planning and defective leadership. Raleigh’s failure to send skilled farmers, his delayed departure, and Lane’s brutal militaristic treatment of Chief Wingina turned a difficult colonial enterprise into a paranoid catastrophe that made survival impossible.',
  },
};

// 6. Build the 12 upgraded lessons
console.log('Upgrading 12 lessons to Christine Counsell 4-Act standard...');

const upgradedLessons = liveData.lessons.map((lesson, idx) => {
  const lessonId = lesson.id;
  const tb = textbookLessonsMap[lessonId];
  if (!tb) {
    console.warn(`[WARN] No textbook found for ${lessonId}, preserving as is`);
    return lesson;
  }

  // Build the 4 Acts with exact [Act.Paragraph] indexing
  const act1Text = `<span class="para-ref">[1.1]</span> ${tb.sec1.paras[0]}<br><br><span class="para-ref">[1.2]</span> ${tb.sec1.paras[1]}<br><br><span class="para-ref">[1.3]</span> ${tb.sec1.paras[2]}`;
  const act2Text = `<span class="para-ref">[2.1]</span> ${tb.sec2.paras[0]}<br><br><span class="para-ref">[2.2]</span> ${tb.sec2.paras[1]}<br><br><span class="para-ref">[2.3]</span> ${tb.sec2.paras[2]}`;
  const act3Text = `<span class="para-ref">[3.1]</span> ${tb.sec3.paras[0]}<br><br><span class="para-ref">[3.2]</span> ${tb.sec3.paras[1]}<br><br><span class="para-ref">[3.3]</span> ${tb.sec3.paras[2]}`;
  const act4Text = `<span class="para-ref">[4.1]</span> ${tb.sec4.paras[0]}<br><br><span class="para-ref">[4.2]</span> ${tb.sec4.paras[1]}<br><br><span class="para-ref">[4.3]</span> ${tb.sec4.paras[2]}`;

  const enquiryTask = MASTER_ENQUIRY_TASKS[lessonId] || {
    title: 'Master Disciplinary Enquiry Task',
    prompt: tb.enquiry,
    type: 'extended_writing',
    scaffolding: {
      sentence_starters: [
        'One major factor was...',
        'Furthermore...',
        'Consequently...',
        'Ultimately...',
      ],
      causal_connectives: [
        'Consequently',
        'Furthermore',
        'Crucially',
        'In direct contrast',
        'This demonstrates that',
      ],
      evaluative_criteria: [
        'Assess the primary causes.',
        'Explain the historical mechanisms.',
        'Evaluate the long-term significance.',
      ],
    },
    model_answer: 'Detailed model answer...',
  };

  const narrative_blocks = [
    {
      act: 1,
      type: 'narrative',
      title: `Act 1: Context & Catalyst (${tb.sec1.title})`,
      theme_heading: `Act 1: Context & Catalyst (${tb.sec1.title})`,
      text: act1Text,
    },
    {
      act: 2,
      type: 'narrative',
      title: `Act 2: Escalation & Conflict (${tb.sec2.title})`,
      theme_heading: `Act 2: Escalation & Conflict (${tb.sec2.title})`,
      text: act2Text,
    },
    {
      act: 3,
      type: 'narrative',
      title: `Act 3: Forensic Archival Evidence (${tb.sec3.title})`,
      theme_heading: `Act 3: Forensic Archival Evidence (${tb.sec3.title})`,
      text: act3Text,
    },
    {
      act: 4,
      type: 'narrative',
      title: `Act 4: Historical Verdict & Synoptic Resolution (${tb.sec4.title})`,
      theme_heading: `Act 4: Historical Verdict & Synoptic Resolution (${tb.sec4.title})`,
      text: act4Text,
      tasks: [enquiryTask],
    },
  ];

  // Preserve & clean up sources
  let cleanSources = lesson.sources || [];
  cleanSources.forEach((src) => {
    // Ensure all context strings end with a targeted Hinge Question
    if (src.source_context && !src.source_context.includes('Hinge Question:')) {
      src.source_context += ` **Hinge Question:** What does this primary source reveal about the central historical challenge facing the Elizabethan regime?`;
    }
  });

  // Ensure teacher notes have high-quality hinge questions
  let cleanTeacherNotes = lesson.teacher_notes || {};
  if (
    cleanTeacherNotes.source_context &&
    !cleanTeacherNotes.source_context.includes('Hinge Question:')
  ) {
    cleanTeacherNotes.source_context += ` **Hinge Question:** How does this evidence illuminate the broader political dilemma facing Queen Elizabeth?`;
  }

  return {
    ...lesson,
    title: tb.title.startsWith('KT') ? tb.title : `${tb.code}: ${tb.title}`,
    enquiry: tb.enquiry,
    enquiry_task: enquiryTask,
    narrative_blocks,
    sources: cleanSources,
    teacher_notes: cleanTeacherNotes,
  };
});

// 7. Assemble final unit data object
const updatedUnitData = {
  ...liveData,
  id: 'eee',
  edition: '2026.1',
  lessons: upgradedLessons,
};

// 8. Write to units/eee/data.js
console.log('Serializing updated curriculum data to units/eee/data.js...');
const outputJs = `export const unitData = ${JSON.stringify(updatedUnitData, null, 2)};\n\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;

fs.writeFileSync(targetFile, outputJs, 'utf8');
console.log('✅ Successfully wrote units/eee/data.js!');

// 9. Validate syntax
console.log('Validating JavaScript syntax of units/eee/data.js...');
execSync(`node --check "${targetFile}"`, { stdio: 'inherit' });
console.log('✅ Syntax validation passed cleanly!');
