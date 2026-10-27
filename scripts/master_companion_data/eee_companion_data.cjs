/**
 * scripts/master_companion_data/eee_companion_data.cjs
 * Universal 16-Page Master Knowledge Retrieval Companion Data
 * Unit: Early Elizabethan England, 1558–1588 (Paper 2, Option B4)
 */

const fs = require('fs');
const path = require('path');

// Read existing quiz booklet data
const oldScript = fs.readFileSync(path.join(__dirname, '..', 'generate_eee_quiz_booklet.cjs'), 'utf8');
const match = oldScript.match(/const QUIZ_DATA = (\[[\s\S]*?\n\];)/);
let RAW_QUIZ = [];
if (match) {
  RAW_QUIZ = eval(match[1]);
}

const TOPIC_INFOS = [
  { num: 1, kt: 'Key Topic 1', topicCode: 'KT 1.1', title: 'The Situation on Elizabeth’s Accession (1558)', focus: 'Elizabethan government, debt (£300,000), war with France, legitimacy & gender', warning: 'Fatal Examiner Trap: Conflating Elizabeth\'s £300,000 inherited debt with ordinary annual revenue (£286,000). Always cite both figures to demonstrate structural insolvency on accession.', quote: '"Elizabeth inherited £300,000 debt and war with France; master the 1558 accession baseline."' },
  { num: 2, kt: 'Key Topic 1', topicCode: 'KT 1.2', title: 'The Settlement of Religion (1559)', focus: 'Act of Supremacy (Supreme Governor), Act of Uniformity, Book of Common Prayer & Royal Injunctions', warning: 'Fatal Examiner Trap: Writing that Elizabeth took the title "Supreme Head". She deliberately chose "Supreme Governor" to pacify Catholics and moderate Protestants.', quote: '"Supreme Governor, English prayer books, and 12d recusancy fines: understand Elizabeth\'s Middle Way."' },
  { num: 3, kt: 'Key Topic 1', topicCode: 'KT 1.3', title: 'Challenges to the Religious Settlement (1559–1569)', focus: 'Puritan challenge (crucifix & vestment controversies), Papacy, Catholic nobles & Alba in Netherlands', warning: 'Fatal Examiner Trap: Believing Puritans objected to the Bible. They objected specifically to clerical SURPLICES, crucifixes, and kneeling at the altar during communion.', quote: '"Puritans rejected surplices; Alba placed 10,000 veterans in Flanders: pressure mounted from both flanks."' },
  { num: 4, kt: 'Key Topic 1', topicCode: 'KT 1.4', title: 'The Problem of Mary, Queen of Scots (1568–1569)', focus: 'Darnley murder, abdication, arrival in England, Elizabeth\'s dilemma & Casket Letters inquiry', warning: 'Fatal Examiner Trap: Believing Mary arrived as an invading general. She arrived in an open fishing boat at Workington seeking military sanctuary from Elizabeth.', quote: '"Mary arrived in a fishing boat; anointed Catholic queen and living magnet for treason."' },
  { num: 5, kt: 'Key Topic 2', topicCode: 'KT 2.1', title: 'Plots and Revolts at Home (1569–1587)', focus: 'Revolt of the Northern Earls (1569), Ridolfi (1571), Throckmorton (1583), Babington (1586) & Mary’s execution', warning: 'Fatal Examiner Trap: Confusing the sequence of plots. Memorise: Northern Earls (1569), Ridolfi (1571), Throckmorton (1583), Babington (1586). Babington directly led to execution.', quote: '"Durham Mass, Ridolfi, Throckmorton, and Babington: foreign gold and papal bull made loyalty impossible."' },
  { num: 6, kt: 'Key Topic 2', topicCode: 'KT 2.2', title: 'Relations with Spain and the Netherlands (1569–1585)', focus: 'Commercial rivalry, privateering, John Hawkins, Drake’s circumnavigation (1577–80) & Treaty of Joinville', warning: 'Fatal Examiner Trap: Believing Drake operated as an unauthorized pirate. He held royal letters of marque with covert financial backing from Elizabeth and Privy Councillors.', quote: '"Drake seized the Cacafuego; Hawkins fought at San Juan: commercial privateering triggered imperial collision."' },
  { num: 7, kt: 'Key Topic 2', topicCode: 'KT 2.3', title: 'Outbreak of War with Spain (1585–1588)', focus: 'Treaty of Nonsuch (1585), Earl of Leicester in the Netherlands & Drake’s 1587 raid on Cadiz', warning: 'Fatal Examiner Trap: Overlooking the strategic significance of the Cadiz raid. Drake\'s destruction of barrel staves delayed the Armada by a full year, granting essential preparation time.', quote: '"Leicester took sovereign title; Drake singed Philip\'s beard at Cadiz, gaining 12 months for defence."' },
  { num: 8, kt: 'Key Topic 2', topicCode: 'KT 2.4', title: 'The Spanish Armada: Strategy and Defeat (1588)', focus: 'Medina Sidonia, fireships at Calais, Battle of Gravelines, naval guns & the "Protestant Wind"', warning: 'Fatal Examiner Trap: Claiming fireships sank the Armada. Fireships caused panic and broke the defensive crescent; long-range English culverins and the Protestant Wind finished it.', quote: '"Gravelines broadsides and fireships shattered the Enterprise of England; the Protestant Wind finished it."' },
  { num: 9, kt: 'Key Topic 3', topicCode: 'KT 3.1', title: 'Education and Leisure in Elizabethan England (1558–1588)', focus: 'Grammar schools, petty schools, university expansion, bear-baiting, hunting & purpose-built theatres', warning: 'Fatal Examiner Trap: Claiming grammar schools admitted girls. Girls attended petty/dame schools or received home needlework tutoring; grammar schools were strictly for boys.', quote: '"Grammar schools expanded for yeomen and merchants; Paris Garden bear-baiting united all social classes."' },
  { num: 10, kt: 'Key Topic 3', topicCode: 'KT 3.2', title: 'Poverty, Vagrancy and the Poor Laws (1558–1588)', focus: 'Population surge (35%), enclosure, inflation, 1572 Vagabonds Act & 1576 Act for Relief of the Poor', warning: 'Fatal Examiner Trap: Labeling all poor as criminals. Tudor law strictly distinguished the Impotent/Deserving Poor (given poor rates) from the Idle/Sturdy Beggar (whipped and branded).', quote: '"Population surge and sheep enclosures drove poverty; the 1572 Act created the first compulsory Poor Rate."' },
  { num: 11, kt: 'Key Topic 3', topicCode: 'KT 3.3', title: 'Exploration and Global Trade (1558–1588)', focus: 'Race-built galleons, astrolabes, Mercator projection, Muscovy & Eastland Companies, Drake’s voyage', warning: 'Fatal Examiner Trap: Believing English ships were larger than Spanish vessels. Hawkins\' race-built galleons were smaller, lower, faster, and designed for broadsides rather than boarding.', quote: '"Hawkins\' race-built galleons and Mercator charts opened the globe; Drake sailed home with 4,700% profit."' },
  { num: 12, kt: 'Key Topic 3', topicCode: 'KT 3.4', title: 'Raleigh and the Colonisation of Virginia (1584–1590)', focus: 'Walter Raleigh, Arthur Barlowe, Ralph Lane, Chief Wingina, starvation & the Lost Colony of Roanoke', warning: 'Fatal Examiner Trap: Stating Raleigh led the Roanoke colonists in person. Elizabeth strictly forbade Raleigh from leaving court; Richard Grenville and Ralph Lane led the expedition.', quote: '"Wingina offered corn; Lane offered lead: analyse why the Roanoke colony vanished into Croatoan."' }
];

const EEE_MILESTONES = [
  // 1: Accession
  [
    { date: 'Nov 1558', title: 'Elizabeth Ascends Throne' },
    { date: 'Nov 1558', title: 'Cecil Appointed Secretary' },
    { date: 'Jan 1559', title: 'Coronation of Elizabeth I' },
    { date: 'Apr 1559', title: 'Peace of Cateau-Cambrésis' },
    { date: 'Jul 1560', title: 'Treaty of Edinburgh' }
  ],
  // 2: Settlement
  [
    { date: 'Feb 1559', title: 'Settlement Debated' },
    { date: 'May 1559', title: 'Act of Supremacy' },
    { date: 'May 1559', title: 'Act of Uniformity' },
    { date: 'Jul 1559', title: 'Royal Injunctions' },
    { date: '1563', title: 'Thirty-Nine Articles' }
  ],
  // 3: Challenges to Settlement
  [
    { date: '1563', title: 'Test Act Passed' },
    { date: '1566', title: 'Advertisements Issued' },
    { date: '1566', title: '37 Vicars Deprived' },
    { date: '1567', title: 'Alba in Netherlands' },
    { date: '1568', title: 'Genoese Loan Seized' }
  ],
  // 4: Problem of Mary Queen of Scots
  [
    { date: '1565', title: 'Mary Marries Darnley' },
    { date: 'Feb 1567', title: 'Kirk o\'Field Murder' },
    { date: 'May 1567', title: 'Mary Marries Bothwell' },
    { date: 'May 1568', title: 'Mary Flees to Workington' },
    { date: '1568–69', title: 'Casket Letters Inquiry' }
  ],
  // 5: Plots & Revolts
  [
    { date: 'Nov 1569', title: 'Revolt of Northern Earls' },
    { date: 'Feb 1570', title: 'Papal Bull Excommunication' },
    { date: '1571', title: 'Ridolfi Plot Uncovered' },
    { date: '1583', title: 'Throckmorton Plot Foiled' },
    { date: 'Feb 1587', title: 'Mary Executed at Fotheringhay' }
  ],
  // 6: Relations with Spain & Netherlands
  [
    { date: '1568', title: 'San Juan de Ulúa Attack' },
    { date: '1572', title: 'Sea Beggars Expelled' },
    { date: '1576', title: 'Spanish Fury at Antwerp' },
    { date: '1577–80', title: 'Drake\'s Circumnavigation' },
    { date: 'Dec 1584', title: 'Treaty of Joinville' }
  ],
  // 7: War with Spain
  [
    { date: 'Jun 1584', title: 'William of Orange Murdered' },
    { date: 'Aug 1585', title: 'Treaty of Nonsuch' },
    { date: 'Dec 1585', title: 'Leicester in Low Countries' },
    { date: '1586', title: 'Babington Plot Smashed' },
    { date: 'Apr 1587', title: 'Drake\'s Cadiz Raid' }
  ],
  // 8: Spanish Armada
  [
    { date: 'May 1588', title: 'Armada Leaves Lisbon' },
    { date: '29 Jul 1588', title: 'Sighted off Lizard Point' },
    { date: '7 Aug 1588', title: 'Fireships at Calais' },
    { date: '8 Aug 1588', title: 'Battle of Gravelines' },
    { date: 'Aug–Sep', title: 'Protestant Wind Destroys Fleet' }
  ],
  // 9: Education & Leisure
  [
    { date: '1560', title: 'Westminster School Refounded' },
    { date: '1562', title: 'Grammar Curricula Expanded' },
    { date: '1572', title: 'Actors Licensing Law' },
    { date: '1576', title: 'The Theatre Built' },
    { date: '1587', title: 'The Rose Playhouse Opens' }
  ],
  // 10: Poverty & Poor Laws
  [
    { date: '1563', title: 'Statute of Artificers' },
    { date: '1569', title: 'Census of London Vagrants' },
    { date: '1572', title: 'Compulsory Poor Rate Act' },
    { date: '1576', title: 'Relief of the Poor Act' },
    { date: '1597–01', title: 'Elizabethan Poor Law Code' }
  ],
  // 11: Exploration & Trade
  [
    { date: '1555', title: 'Muscovy Company Chartered' },
    { date: '1562', title: 'Hawkins\' Triangular Voyages' },
    { date: '1569', title: 'Mercator Projection Chart' },
    { date: '1579', title: 'Eastland Company Founded' },
    { date: '1580', title: 'Drake\'s £400k Plunder' }
  ],
  // 12: Virginia & Roanoke
  [
    { date: 'Mar 1584', title: 'Raleigh Granted Royal Patent' },
    { date: 'Jul 1584', title: 'Roanoke Island Scouted' },
    { date: 'Apr 1585', title: 'First Colony Dispatched' },
    { date: 'Jun 1586', title: 'Drake Evacuates Settlement' },
    { date: '1587–90', title: 'Lost Colony of Roanoke' }
  ]
];

const enquiries = TOPIC_INFOS.map((info, idx) => {
  const rawEnq = RAW_QUIZ[idx] || {};
  const questions = (rawEnq.questions || []).slice(0, 8).map((q, qIdx) => ({
    num: qIdx + 1,
    q: q.q,
    a: q.a,
    exp: q.exp
  }));

  return {
    number: info.num,
    keyTopic: info.kt,
    topicCode: info.topicCode,
    title: info.title,
    focus: info.focus,
    enquiryQuestion: rawEnq.enquiry || info.title,
    examinerWarning: info.warning,
    footerQuote: info.quote,
    milestones: EEE_MILESTONES[idx] || [],
    questions: questions
  };
});

module.exports = {
  unitId: 'eee',
  unitTitle: 'Early Elizabethan England, 1558–1588',
  paperCode: 'Pearson Edexcel GCSE (9–1) History • Paper 2: British Depth Study (Option B4)',
  heroImage: 'images/armada_portrait.jpg',
  heroCaption: 'Source A: The Armada Portrait of Queen Elizabeth I (1588). Attributed to George Gower. National Maritime Museum, Greenwich (ZBA5461).',
  enquiries,
  bankPages: [
    { title: 'Enquiries 1–4: Key Topic 1 Queen, Government & Religion', startQ: 1, endQ: 32, pageNum: 14 },
    { title: 'Enquiries 5–8: Key Topic 2 Plots, Foreign Relations & The Armada', startQ: 33, endQ: 64, pageNum: 15 },
    { title: 'Enquiries 9–12: Key Topic 3 Society, Exploration & Colonisation', startQ: 65, endQ: 96, pageNum: 16 }
  ]
};
