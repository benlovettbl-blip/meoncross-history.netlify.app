/**
 * scripts/upgrade_eee_to_5stage_grade9.cjs
 *
 * Upgrades Early Elizabethan England (units/eee/data.js) to the Grade 9 5-Stage Precision Standard:
 * - Converts each of the 12 lessons from 4 acts to exactly 5 narrative blocks (Stage 1 to Stage 5)
 * - 100% synchronized with the 5 stages in scripts/components/eee_enquiry_configs.cjs
 * - Streamlines text to Grade 9 precision prose (high factual density, bold key terms, zero rambling filler)
 * - Provides clean level_4 accessible summaries for differentiation
 * - Preserves Master Disciplinary Enquiry Task on Stage 5
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const EEE_DATA_PATH = path.join(ROOT_DIR, 'units', 'eee', 'data.js');

// 12 Lessons with 5 Stages Each (60 Narrative Blocks Total)
const EEE_5STAGE_NARRATIVES = {
  lesson_1_1: [
    {
      stage: 1,
      act: 1,
      type: 'narrative',
      title: 'Stage 1: [17 NOV 1558] Accession of Elizabeth I',
      theme_heading: 'Stage 1: [17 NOV 1558] Accession of Elizabeth I',
      text: 'In November 1558, twenty-five-year-old <strong>Elizabeth Tudor</strong> ascended the throne following the death of Mary I. She inherited an impoverished realm burdened by an astronomical <strong>£300,000 Crown debt</strong>, largely incurred through costly foreign wars in France. The Crown’s ordinary annual income stood at barely £286,000, forcing heavy borrowing from European financiers on the <strong>Antwerp Exchange</strong> at extortionate interest rates of <strong>14 per cent</strong>. Seeking immediate stability, Elizabeth appointed her most trusted advisor, <strong>Sir William Cecil</strong>, as Principal Secretary on accession day, establishing a partnership that directed English governance for four decades.',
      level_4:
        'Elizabeth became queen in 1558 facing a massive £300,000 debt left by Mary I. She had to borrow money at high interest from Antwerp and appointed William Cecil as her chief advisor to restore stability.',
    },
    {
      stage: 2,
      act: 2,
      type: 'narrative',
      title: 'Stage 2: [NOV–DEC 1558] Features of Elizabethan Government',
      theme_heading: 'Stage 2: [NOV–DEC 1558] Features of Elizabethan Government',
      text: 'Tudor monarchical governance was rooted in the concept of <strong>Divine Right</strong>, but the Crown possessed no standing army or professional police force. Sovereign power was instead maintained through an executive <strong>19-man Privy Council</strong> comprising senior noblemen and statesmen meeting daily to guide defense, finance, and diplomacy. To bind the landed aristocracy and ambitious courtiers to her rule, Elizabeth deployed a sophisticated system of <strong>royal patronage</strong>, distributing titles, offices, leases, and lucrative <strong>commercial monopolies</strong>. By balancing rival political factions at court—most notably between the cautious William Cecil and her favourite, Lord Robert Dudley—the Queen prevented any single noble clique from dominating royal decision-making.',
      level_4:
        'Elizabeth governed with a 19-man Privy Council of trusted nobles and advisors. She used royal patronage, like giving titles and monopolies, to keep rival noble factions loyal and balanced at court.',
    },
    {
      stage: 3,
      act: 3,
      type: 'narrative',
      title: 'Stage 3: [DEC 1558] Challenges of Gender & Legitimacy',
      theme_heading: 'Stage 3: [DEC 1558] Challenges of Gender & Legitimacy',
      text: 'Elizabeth’s right to rule was challenged by deep-seated sixteenth-century patriarchal prejudice and religious doubts over her <strong>legitimacy</strong>. Roman Catholic canon law regarded Henry VIII’s marriage to <strong>Anne Boleyn</strong> as illegal and bigamous, because Pope Clement VII had refused to annul Henry’s first marriage to Catherine of Aragon. Furthermore, following Anne’s execution in 1536, Parliament passed the <strong>Second Succession Act</strong>, legally declaring Elizabeth illegitimate. As an unmarried female ruler—a <strong>Queen Regnant</strong>—contemporary European society considered her inherently incapable of commanding military forces or governing without a husband. Consequently, both Parliament and the Privy Council exerted relentless pressure upon Elizabeth to marry and produce a Protestant heir, a dilemma she navigated by declaring herself married to the English realm.',
      level_4:
        "Catholics questioned Elizabeth's legitimacy because the Pope never recognized Henry VIII's divorce to marry Anne Boleyn. Society also doubted a female ruler, putting intense pressure on Elizabeth to marry and secure an heir.",
    },
    {
      stage: 4,
      act: 4,
      type: 'narrative',
      title: 'Stage 4: [JAN–MAY 1559] Parliament & Local Government',
      theme_heading: 'Stage 4: [JAN–MAY 1559] Parliament & Local Government',
      text: "Beyond Whitehall, the Crown depended entirely on local authorities to execute royal policy across England's counties. County administration was overseen by <strong>Lords Lieutenant</strong>, wealthy magnates responsible for raising local militias during emergencies, and unpaid <strong>Justices of the Peace (JPs)</strong> drawn from the country gentry. These JPs enforced statutory law, collected taxes, repaired roads, and punished petty crime at quarterly sessions. Meanwhile, <strong>Parliament</strong> was an occasional advisory body called only when the monarch required extraordinary <strong>taxation (subsidies)</strong> or statute legislation. While MPs gathered only nine times during Elizabeth’s forty-five-year reign, parliamentary consent was constitutionally mandatory to authorize Crown taxes, granting the Commons significant financial leverage.",
      level_4:
        'In the countryside, unpaid Justices of the Peace and Lords Lieutenant enforced laws and maintained order. Parliament met only when Elizabeth needed new laws or emergency tax subsidies.',
    },
    {
      stage: 5,
      act: 5,
      type: 'narrative',
      title: 'Stage 5: [1558–1560] Foreign Threats: France & Scotland',
      theme_heading: 'Stage 5: [1558–1560] Foreign Threats: France & Scotland',
      text: 'In foreign affairs, England stood isolated and militarily encircled by Catholic powers. In January 1558, French forces had captured <strong>Calais</strong>, England’s last continental possession held since 1347, stripping the realm of its vital trade gateway and strategic Channel outpost. The danger was compounded on the northern border by the historic <strong>Auld Alliance</strong> between France and Scotland. Scotland was ruled by French Catholic regent <strong>Mary of Guise</strong>, who stationed French garrisons on English borders, while her daughter <strong>Mary, Queen of Scots</strong>, married to the French Dauphin, openly quartered the <strong>English royal arms</strong> on her heraldic crest, asserting herself as the lawful monarch of England.',
      level_4:
        "England faced severe foreign threats after losing Calais to France in January 1558. The Auld Alliance between France and Scotland threatened England's northern border, and Mary, Queen of Scots claimed the English throne.",
    },
  ],

  lesson_1_2: [
    {
      stage: 1,
      act: 1,
      type: 'narrative',
      title: 'Stage 1: [NOV 1558–JAN 1559] Religious Divisions in 1558',
      theme_heading: 'Stage 1: [NOV 1558–JAN 1559] Religious Divisions in 1558',
      text: 'Upon her accession, Elizabeth inherited a nation bitterly polarized by decades of religious upheaval. The northern and western shires—dominated by conservative Catholic noble families—remained deeply committed to traditional Latin worship and papal authority. Conversely, London and the southeastern ports had embraced radical <strong>Protestant Reformation</strong> doctrines, fuelled by merchant trade with Europe. The country was still scarred by the trauma of Mary I’s reign, during which nearly <strong>300 Protestants were burned at the stake</strong> for heresy. Elizabeth sought to avoid European-style civil wars by formulating a pragmatic religious compromise—a "Middle Way" that would establish Protestant uniformity while placating moderate Catholic traditionalists.',
      level_4:
        "England was deeply divided in 1558 between a Catholic north and a Protestant southeast. After Mary I's burnings of nearly 300 Protestants, Elizabeth aimed for a moderate religious compromise to avoid civil conflict.",
    },
    {
      stage: 2,
      act: 2,
      type: 'narrative',
      title: 'Stage 2: [MAY 1559] The Act of Supremacy',
      theme_heading: 'Stage 2: [MAY 1559] The Act of Supremacy',
      text: "Passed by Parliament in May 1559, the <strong>Act of Supremacy</strong> re-established England’s formal break with the Papacy in Rome. In a deliberate political compromise to appease Catholics who held the Pope as the only earthly head of the Church, Elizabeth rejected Henry VIII’s title of 'Supreme Head' and assumed the title of <strong>Supreme Governor of the Church of England</strong>. All clergy, judges, and royal officials were legally mandated to swear the <strong>Oath of Supremacy</strong>, swearing allegiance to the Queen's spiritual leadership on pain of losing their offices and facing treason charges. To enforce compliance and punish clerical disobedience, the act established the <strong>Court of High Commission</strong>.",
      level_4:
        'The 1559 Act of Supremacy broke with Rome, naming Elizabeth Supreme Governor of the Church of England. All clergy and royal officials had to swear the Oath of Supremacy or lose their positions.',
    },
    {
      stage: 3,
      act: 3,
      type: 'narrative',
      title: 'Stage 3: [MAY 1559] The Act of Uniformity',
      theme_heading: 'Stage 3: [MAY 1559] The Act of Uniformity',
      text: 'The <strong>Act of Uniformity (May 1559)</strong> established a mandatory national framework for church worship across England. It enforced a single, standardized <strong>Book of Common Prayer</strong> written in English, blending Protestant theology with ambiguous wording regarding the Eucharist to allow Catholics to interpret communion in their own way. Attendance at Anglican parish church services on Sundays and holy days was made compulsory; those who refused were labelled <strong>recusants</strong> and fined <strong>one shilling (12d)</strong> per missed service. However, under the controversial <strong>Ornaments Rubric</strong>, church decorations and traditional clerical <strong>vestments</strong> from the 1548 Edwardian Reformation were retained, provoking immediate outrage among radical Puritans.',
      level_4:
        'The 1559 Act of Uniformity introduced an English Book of Common Prayer and made Sunday church attendance compulsory, fining absent recusants one shilling. It kept traditional vestments to placate Catholics.',
    },
    {
      stage: 4,
      act: 4,
      type: 'narrative',
      title: 'Stage 4: [SUMMER 1559] The Royal Injunctions',
      theme_heading: 'Stage 4: [SUMMER 1559] The Royal Injunctions',
      text: 'In the summer of 1559, William Cecil issued <strong>57 Royal Injunctions</strong> to provide precise administrative instructions for the day-to-day enforcement of the religious settlement. Clergy were instructed to preach royal supremacy at least once every quarter and report anyone praising foreign papal jurisdiction. Every parish church was legally mandated to purchase an <strong>English Bible</strong> accessible to all parishioners. To eradicate traditional Catholic idolatry, pilgrimages, fake miracles, and candle-burning before images were strictly prohibited. Furthermore, clerical marriage was tightly regulated, requiring prospective brides to be vetted and approved by two Justices of the Peace and the local bishop.',
      level_4:
        'The 57 Royal Injunctions detailed how churches must operate, requiring an English Bible in every parish and banning pilgrimages and image worship. Clergy had to preach royal supremacy quarterly.',
    },
    {
      stage: 5,
      act: 5,
      type: 'narrative',
      title: 'Stage 5: [1559–1560s] Enforcing the Settlement & Church Role',
      theme_heading: 'Stage 5: [1559–1560s] Enforcing the Settlement & Church Role',
      text: 'The Elizabethan regime dispatched royal commissioners on nationwide <strong>Visitations in 1559</strong> to inspect parish churches and administer the Oath of Supremacy. While roughly <strong>400 clergy resigned or were deprived</strong> of their livings, the vast majority of ordinary parish priests accepted the settlement to retain their livelihoods. However, the senior Catholic hierarchy refused to compromise: all Marian bishops except one rejected the Oath and were dismissed, allowing Elizabeth to appoint loyal Protestant reformers to key bishoprics. The <strong>Church of England</strong> served as an essential engine of royal authority, utilizing churchwardens and ecclesiastical courts to supervise community morals, distribute poor relief, and reinforce state loyalty from the pulpit.',
      level_4:
        'Royal Visitations enforced the settlement: nearly all Marian bishops refused the Oath and were removed, though most parish clergy complied. The Church of England became a vital instrument for maintaining local social order.',
    },
  ],

  lesson_1_3: [
    {
      stage: 1,
      act: 1,
      type: 'narrative',
      title: 'Stage 1: [1559–1563] The Nature of the Puritan Challenge',
      theme_heading: 'Stage 1: [1559–1563] The Nature of the Puritan Challenge',
      text: 'The religious settlement was immediately contested by zealous English Protestants known as <strong>Puritans</strong>. Having fled England to escape Mary I\'s burnings, these <strong>Marian Exiles</strong> returned from Geneva and Zurich deeply influenced by John Calvin\'s radical theology. They demanded that the Church of England be completely purified of all remaining "popish dregs" and Catholic superstitions. Puritans fiercely objected to traditional church hierarchy, particularly the authority of bishops, with radical <strong>Presbyterians</strong> demanding a democratic church governed by local elders. They rejected kneeling to receive communion, the use of wedding rings, and music in church, arguing that only practices explicitly authorized in scripture were permissible.',
      level_4:
        'Returning Marian exiles, known as Puritans, demanded the complete removal of Catholic practices from the Church of England. They rejected bishops, organ music, and unbiblical traditions like wedding rings.',
    },
    {
      stage: 2,
      act: 2,
      type: 'narrative',
      title: 'Stage 2: [1566] The Crucifix & Vestments Controversy',
      theme_heading: 'Stage 2: [1566] The Crucifix & Vestments Controversy',
      text: 'Clashes between Elizabeth and Puritan reformers erupted over church visuals and clerical dress. Elizabeth insisted on retaining a silver <strong>crucifix</strong> in her Royal Chapel, provoking threats of resignation from newly appointed Puritan bishops who viewed crucifixes as idol worship; Elizabeth eventually compromised by removing the chapel cross. A more serious confrontation unfolded over clerical attire in 1566. Radical Puritans refused to wear the traditional white linen <strong>surplice</strong>, denouncing it as the livery of the Antichrist. In response, Archbishop of Canterbury Matthew Parker issued the <strong>Book of Advertisements (1566)</strong>, mandating uniform clerical dress. When 110 London ministers were summoned to Lambeth Palace to demonstrate compliance, <strong>37 ministers refused and were deprived</strong> of their pulpits.',
      level_4:
        "Puritans protested Elizabeth's retention of church crucifixes and ornate vestments. In 1566, Archbishop Parker insisted all clergy wear the white surplice, resulting in 37 London ministers being stripped of their livings.",
    },
    {
      stage: 3,
      act: 3,
      type: 'narrative',
      title: 'Stage 3: [1559–1568] The Catholic Challenge at Home',
      theme_heading: 'Stage 3: [1559–1568] The Catholic Challenge at Home',
      text: 'Domestic Catholic opposition was widespread but initially cautious. In the conservative northern counties and Lancashire, powerful magnates such as the Earls of Northumberland and Westmorland quietly sheltered Catholic priests. Many wealthy families became <strong>"Church Papists"</strong>, attending Anglican Sunday services to pay lip service to the law and avoid fines, while secretly attending Latin <strong>Mass</strong> in private household chapels. Because Elizabeth declared she had no desire to "make windows into men\'s souls", early enforcement was deliberately lenient: the one-shilling recusancy fines were rarely collected systematically from the gentry, and Pope Pius IV refrained from instructing English Catholics to actively rebel during the first decade of her reign.',
      level_4:
        'Most English Catholics initially conformed as Church Papists, attending Anglican services outwardly to avoid fines while practising Catholic rites in secret. Elizabeth kept enforcement lenient to prevent unrest.',
    },
    {
      stage: 4,
      act: 4,
      type: 'narrative',
      title: 'Stage 4: [1562–1568] Foreign Threats: France & The Netherlands',
      theme_heading: 'Stage 4: [1562–1568] Foreign Threats: France & The Netherlands',
      text: "England's geopolitical security deteriorated dramatically in the 1560s as European religious conflicts intensified. In 1562, civil warfare erupted between Catholics and Huguenots in the <strong>French Wars of Religion</strong>, removing France as an immediate invasion threat but alarming England by demonstrating how religion could rip a kingdom apart. Far more dangerous was the situation across the English Channel in the Spanish Netherlands. In 1566, Dutch Calvinists launched iconoclastic riots against Spanish rule. King Philip II responded in 1567 by dispatching the ruthless <strong>Duke of Alba</strong> with an elite force of <strong>10,000 Spanish troops</strong> to crush the rebellion. Alba's presence on the Channel coast placed a formidable Catholic army within striking distance of England.",
      level_4:
        "Religious wars in France showed the danger of civil conflict, while in 1567 Philip II sent the Duke of Alba and 10,000 Spanish troops to crush Dutch rebels, placing an invasion army on England's doorstep.",
    },
    {
      stage: 5,
      act: 5,
      type: 'narrative',
      title: 'Stage 5: [1568–1569] Escalating Tensions: The Genoese Loan',
      theme_heading: 'Stage 5: [1568–1569] Escalating Tensions: The Genoese Loan',
      text: "Anglo-Spanish relations reached a breaking point in the winter of 1568 over the <strong>Genoese Loan</strong>. Four Spanish transport ships carrying <strong>400,000 florins (gold and silver)</strong> to pay Alba's soldiers in the Netherlands were chased by French privateers and forced to seek shelter in Southampton and Plymouth. Discovering that the bullion belonged to Genoese bankers and had not yet been formally transferred to Spain, William Cecil advised Elizabeth to confiscate the entire treasure and take over the loan herself. Furious at this act of piracy, Alba seized all English merchant ships and goods in Antwerp, and Philip II imposed a total <strong>trade embargo</strong> on English cloth, plunging the London mercantile community into economic depression and pushing both nations toward open hostility.",
      level_4:
        'In 1568, Elizabeth seized 400,000 florins of silver from Spanish ships sheltering in English ports. In retaliation, Spain placed an embargo on English cloth, severely escalating hostility between England and Spain.',
    },
  ],

  lesson_1_4: [
    {
      stage: 1,
      act: 1,
      type: 'narrative',
      title: 'Stage 1: [1560–1565] Mary’s Claim to the English Throne',
      theme_heading: 'Stage 1: [1560–1565] Mary’s Claim to the English Throne',
      text: "<strong>Mary, Queen of Scots</strong>, represented an existential dynastic challenge to Elizabeth I. As the granddaughter of Henry VIII's elder sister Margaret Tudor, Mary held an unassailable hereditary claim to the English crown, and Roman Catholics regarded her as the legitimate rightful sovereign. Following the death of her French husband King Francis II in 1560, Mary returned to rule Presbyterian Scotland. In July 1565, Mary dramatically strengthened her dynastic position by marrying her Catholic cousin, <strong>Henry Stuart, Lord Darnley</strong>, who was also a Tudor descendant. This union united the two strongest Catholic claims to the English throne, stoking intense panic in Whitehall about the succession.",
      level_4:
        'Mary, Queen of Scots held a strong Tudor claim to the English throne and was viewed by Catholics as the rightful queen. Her 1565 marriage to Lord Darnley reinforced her dynastic challenge to Elizabeth.',
    },
    {
      stage: 2,
      act: 2,
      type: 'narrative',
      title: 'Stage 2: [FEB 1567] The Murder of Lord Darnley',
      theme_heading: 'Stage 2: [FEB 1567] The Murder of Lord Darnley',
      text: "Mary’s reign in Scotland quickly unraveled through marital discord and scandal. Darnley was arrogant, violent, and jealous of Mary's Italian private secretary, David Rizzio, whom Darnley and Protestant lords murdered in Mary's presence at Holyrood Palace in 1566. Marital relations collapsed completely. In the early hours of <strong>10 February 1567</strong>, the house at <strong>Kirk o' Field</strong> where Darnley was recuperating from smallpox was destroyed in a massive gunpowder explosion; Darnley’s body was discovered strangled in an adjoining orchard. Public suspicion immediately fell upon the ambitious <strong>Earl of Bothwell</strong>, whom Mary shockingly married in May 1567 under Protestant rites, provoking outrage across Scotland and Europe.",
      level_4:
        "In February 1567, Mary's unpopular husband Lord Darnley was murdered at Kirk o' Field. When Mary married the chief suspect, the Earl of Bothwell, Scottish nobles rebelled against her.",
    },
    {
      stage: 3,
      act: 3,
      type: 'narrative',
      title: 'Stage 3: [1567–1568] Abdication, Lochleven & Escape',
      theme_heading: 'Stage 3: [1567–1568] Abdication, Lochleven & Escape',
      text: "Scottish Protestant lords rose in armed rebellion against Mary and Bothwell, confronting the Queen's forces at <strong>Carberry Hill</strong> in June 1567. Abandoned by her troops, Mary surrendered while Bothwell fled into exile. Imprisoned in the island fortress of <strong>Lochleven Castle</strong>, Mary was subjected to intense intimidation and forced on 24 July 1567 to sign deeds of <strong>abdication</strong> in favour of her one-year-old infant son, who was crowned King <strong>James VI</strong>, with Protestant Earl of Moray ruling as regent. However, with the aid of loyal supporters, Mary made a daring escape from Lochleven in May 1568, raised a 6,000-man army, but suffered decisive military defeat at the <strong>Battle of Langside</strong>.",
      level_4:
        'Mary was imprisoned at Lochleven Castle in 1567 and forced to abdicate for her baby son, James VI. After escaping in May 1568, her forces were defeated at Langside, forcing her to flee.',
    },
    {
      stage: 4,
      act: 4,
      type: 'narrative',
      title: 'Stage 4: [1568–1569] The Inquiry at York & Casket Letters',
      theme_heading: 'Stage 4: [1568–1569] The Inquiry at York & Casket Letters',
      text: 'Fleeing Scotland, Mary crossed the Solway Firth in an open fishing boat, landing at <strong>Workington in Cumberland on 16 May 1568</strong>. Her arrival in England plunged Elizabeth into a severe constitutional dilemma: executing or restoring Mary would provoke foreign intervention, yet releasing her would provide English Catholics with an inspiring leader. To buy time, Elizabeth convened an official inquiry at <strong>York and Westminster (1568–69)</strong> to investigate Darnley’s murder. The Scottish Regent Moray produced eight love letters and sonnets—the controversial <strong>Casket Letters</strong>—allegedly proving Mary\'s complicity in Darnley\'s death. Unwilling to declare a fellow anointed queen guilty of murder, Elizabeth concluded with a deliberate <strong>"not proven" verdict</strong>, keeping Mary detained in legal limbo.',
      level_4:
        "Mary fled to England in May 1568. At the York Inquiry, Moray presented the Casket Letters to accuse Mary of murder; Elizabeth returned a 'not proven' verdict to keep Mary prisoner without formal conviction.",
    },
    {
      stage: 5,
      act: 5,
      type: 'narrative',
      title: 'Stage 5: [1569] Mary’s Imprisonment in England',
      theme_heading: 'Stage 5: [1569] Mary’s Imprisonment in England',
      text: 'With the inquiry concluded, Mary was placed under honourable confinement in remote aristocratic estates, principally under the custody of <strong>George Talbot, Earl of Shrewsbury</strong>, at <strong>Tutbury Castle</strong> and Sheffield Manor. While Elizabeth sought to treat her cousin with royal dignity, Mary’s presence on English soil acted as a permanent catalyst for domestic Catholic conspiracy. William Cecil warned that Mary was a dangerous internal "Trojan horse" around whom disaffected northern magnates and foreign Catholic powers would inevitably coalesce. By the autumn of 1569, Mary had become the focal point of a treasonous conspiracy that would erupt into the Revolt of the Northern Earls.',
      level_4:
        'Mary was held under house arrest under the Earl of Shrewsbury at Tutbury Castle. Her continued presence in England gave disgruntled Catholic nobles a figurehead to plot against Elizabeth.',
    },
  ],

  lesson_2_1: [
    {
      stage: 1,
      act: 1,
      type: 'narrative',
      title: 'Stage 1: [NOV 1569–JAN 1570] The Revolt of the Northern Earls',
      theme_heading: 'Stage 1: [NOV 1569–JAN 1570] The Revolt of the Northern Earls',
      text: 'In November 1569, Catholic discontent exploded into armed rebellion in the north of England, led by <strong>Charles Neville, Earl of Westmorland</strong>, and <strong>Thomas Percy, Earl of Northumberland</strong>. The earls were furious at their loss of political influence at court to upstart Protestants like William Cecil, and angry over Crown control of northern mineral rights. The rebels marched into <strong>Durham Cathedral</strong>, tore down Protestant communion tables, burned English service books, and celebrated traditional Latin Catholic <strong>Mass</strong>. They planned to march south, liberate Mary, Queen of Scots from Tutbury, and marry her to the Duke of Norfolk. However, the rebellion collapsed when the Earl of Sussex mobilized a royal army; the earls fled into Scotland, and Elizabeth ordered the ruthless execution of <strong>450 ordinary rebels</strong>.',
      level_4:
        'In 1569, northern Catholic earls rebelled, restoring Latin Mass at Durham Cathedral and plotting to put Mary on the throne. Royal troops crushed the revolt, and Elizabeth executed 450 rebels.',
    },
    {
      stage: 2,
      act: 2,
      type: 'narrative',
      title: 'Stage 2: [1570–1571] Papal Bull & The Ridolfi Plot',
      theme_heading: 'Stage 2: [1570–1571] Papal Bull & The Ridolfi Plot',
      text: 'In February 1570, Pope Pius V issued the momentous papal bull <strong>Regnans in Excelsis</strong>, excommunicating Elizabeth as a heretic and releasing all English subjects from their oaths of allegiance. This transformed English Catholics into potential traitors in the eyes of the law. Capitalizing on this decree, Italian banker <strong>Roberto Ridolfi</strong> orchestrated a conspiracy in 1571 to assassinate Elizabeth, land 10,000 Spanish soldiers under the Duke of Alba, and place Mary on the throne married to the <strong>Duke of Norfolk</strong>. William Cecil and Walsingham intercepted ciphered messages, exposed the plot, and arrested the conspirators. Ridolfi remained abroad, the Spanish ambassador was expelled, and Norfolk was executed on Tower Hill in June 1572.',
      level_4:
        'In 1570, the Pope excommunicated Elizabeth, encouraging Catholic rebellion. The 1571 Ridolfi Plot aimed to invade with Spanish troops and crown Mary; Cecil uncovered the plot and executed the Duke of Norfolk.',
    },
    {
      stage: 3,
      act: 3,
      type: 'narrative',
      title: 'Stage 3: [1583–1584] The Throckmorton Plot & Bond of Association',
      theme_heading: 'Stage 3: [1583–1584] The Throckmorton Plot & Bond of Association',
      text: "Catholic plots escalated in 1583 with the <strong>Throckmorton Plot</strong>, organized by young Catholic gentleman Francis Throckmorton. The conspiracy planned for the French Catholic <strong>Duke of Guise</strong> to invade England with Spanish financial funding from Philip II, depose Elizabeth, and crown Mary. Sir Francis Walsingham's spy network placed Throckmorton under surveillance, arrested him, and extracted a full confession under torture on the rack. The Spanish ambassador, <strong>Bernardino de Mendoza</strong>, was expelled from England. In response to the growing peril, Cecil and Walsingham drafted the <strong>Bond of Association (1584)</strong>, an oath taken by thousands of Englishmen pledging to execute anyone attempting or benefiting from Elizabeth’s assassination.",
      level_4:
        "The 1583 Throckmorton Plot planned a French invasion backed by Spanish funds to crown Mary. Walsingham caught Throckmorton, leading to the expulsion of Spain's ambassador and the 1584 Bond of Association.",
    },
    {
      stage: 4,
      act: 4,
      type: 'narrative',
      title: 'Stage 4: [1586] The Babington Plot & Walsingham’s Spies',
      theme_heading: 'Stage 4: [1586] The Babington Plot & Walsingham’s Spies',
      text: "In 1586, Catholic gentleman <strong>Anthony Babington</strong> devised a plan to murder Elizabeth and spark an international Catholic invasion to install Mary on the English throne. Mary, now held under strict confinement by Puritan warden Sir Amias Paulet at Chartley Hall, corresponded with Babington through <strong>coded letters hidden inside beer barrels</strong>. However, Walsingham’s double agent <strong>Gilbert Gifford</strong> intercepted every message, which was decoded by cryptanalyst Thomas Phelippes. Crucially, on 17 July 1586, Mary sent a letter explicitly approving the assassination of Elizabeth. Walsingham now possessed the incontrovertible written evidence of regicide required to condemn Mary under the 1585 Act for the Preservation of the Queen's Safety.",
      level_4:
        "In 1586, Anthony Babington plotted to assassinate Elizabeth. Walsingham intercepted ciphered letters inside beer barrels, obtaining Mary's written approval of the murder plot.",
    },
    {
      stage: 5,
      act: 5,
      type: 'narrative',
      title: 'Stage 5: [FEB 1587] The Execution of Mary, Queen of Scots',
      theme_heading: 'Stage 5: [FEB 1587] The Execution of Mary, Queen of Scots',
      text: 'In October 1586, Mary was brought to trial before a commission of forty-six peers at <strong>Fotheringhay Castle</strong> in Northamptonshire and found guilty of high treason. Elizabeth agonized for months over executing an anointed cousin, fearing it would set a dangerous precedent for regicide and provoke retaliation from Catholic Spain and Scotland. Under immense pressure from Parliament and the Privy Council, Elizabeth signed the death warrant on 1 February 1587, but ordered Cecil not to dispatch it immediately. Cecil acted secretly, and on <strong>8 February 1587, Mary was beheaded</strong> in the Great Hall at Fotheringhay. The execution eliminated the domestic Catholic figurehead, but provided Philip II with the ultimate religious justification to launch the Spanish Armada.',
      level_4:
        'Mary was found guilty of treason at Fotheringhay Castle. After agonizing hesitation, Elizabeth signed the warrant, and Mary was beheaded on 8 February 1587, driving Philip II to launch the Armada.',
    },
  ],

  lesson_2_2: [
    {
      stage: 1,
      act: 1,
      type: 'narrative',
      title: 'Stage 1: [1570–1577] Political and Religious Rivalry with Spain',
      theme_heading: 'Stage 1: [1570–1577] Political and Religious Rivalry with Spain',
      text: 'Throughout the 1570s, ideological and geopolitical tensions mounted between Protestant England and Catholic Spain, the undisputed European superpower ruled by <strong>Philip II</strong>. The primary flashpoint was the <strong>Dutch Revolt</strong>, where Protestant rebels led by Prince <strong>William of Orange</strong> fought against Spanish Habsburg rule in the Netherlands. Elizabeth faced a delicate dilemma: direct military intervention risked all-out war with Spain, yet a total Spanish victory would leave the Channel coast under hostile military control. Elizabeth pursued covert proxy diplomacy, allowing Dutch Protestant privateers known as the <strong>Sea Beggars</strong> to shelter in English ports and attack Spanish supply shipping, while secretly sending financial subsidies to Dutch rebels.',
      level_4:
        'Religious and political rivalry grew between Protestant England and Catholic Spain over the Dutch Revolt. Elizabeth secretly funded Dutch rebels and sheltered Dutch Sea Beggar privateers in English ports.',
    },
    {
      stage: 2,
      act: 2,
      type: 'narrative',
      title: 'Stage 2: [1570–1579] Commercial Rivalry in the New World',
      theme_heading: 'Stage 2: [1570–1579] Commercial Rivalry in the New World',
      text: 'Commercial rivalry intensified as English mariners challenged Spain’s strict imperial trade monopoly in the Americas. Under Spanish colonial law, foreign merchants were banned from trading with Spanish settlements in the Caribbean and Central America. English captains, led by <strong>John Hawkins</strong>, defied these bans by pioneering the transatlantic slave trade and smuggling manufactured goods. When Spanish naval forces ambushed Hawkins’ fleet at <strong>San Juan de Ulúa</strong> in 1568, English privateers felt morally justified in waging undeclared piracy. English adventurers, prominently <strong>Francis Drake</strong>, raided Spanish treasure fleets and coastal towns in the West Indies, plundering silver mule trains at Nombre de Dios in 1572.',
      level_4:
        'Spain held a strict trade monopoly in the New World, banning foreign merchants. English privateers like Hawkins and Drake challenged this through illegal trade and raiding Spanish treasure ships.',
    },
    {
      stage: 3,
      act: 3,
      type: 'narrative',
      title: 'Stage 3: [1577–1580] Drake’s Circumnavigation',
      theme_heading: 'Stage 3: [1577–1580] Drake’s Circumnavigation',
      text: "In December 1577, Francis Drake sailed from Plymouth with five ships on a covert mission backed by Elizabeth to disrupt Spanish commerce in the Pacific. After surviving treacherous storms in the <strong>Strait of Magellan</strong>, Drake’s flagship, renamed the <strong>Golden Hind</strong>, sailed up the undefended Pacific coast of South America, plundering Spanish ports in Chile and Peru. In March 1579, Drake captured the Spanish treasure galleon <strong>Nuestra Señora de la Concepción (the 'Cacafuego')</strong>, seizing eighty pounds of gold, thirteen chests of silver coins, and <strong>twenty-six tons of unrefined silver</strong>. Drake sailed across the Pacific and Indian Oceans, returning to Plymouth in September 1580 with <strong>£400,000 in plunder</strong>, single-handedly eliminating the English Crown debt.",
      level_4:
        'Between 1577 and 1580, Drake circumnavigated the globe, plundering undefended Spanish ports and capturing the treasure galleon Cacafuego, bringing home £400,000 in bullion.',
    },
    {
      stage: 4,
      act: 4,
      type: 'narrative',
      title: 'Stage 4: [1581–1584] Escalation & Elizabeth’s Defiance',
      theme_heading: 'Stage 4: [1581–1584] Escalation & Elizabeth’s Defiance',
      text: "In April 1581, Elizabeth made a provocative public statement of defiance against Spain. Flouting Philip II's demands that Drake be handed over as a pirate, the Queen visited the Golden Hind at Deptford and publicly <strong>knighted Sir Francis Drake</strong> on the quarterdeck. Philip was enraged by this royal endorsement of piracy. Spain's geopolitical power grew dramatically in 1580 when Philip inherited the Portuguese throne, acquiring the Portuguese navy and global trading empire. Tensions surged further as Spanish forces made steady military gains in the Netherlands under the brilliant command of the <strong>Duke of Parma</strong>, capturing key Dutch fortresses and pushing the Protestant rebels to the brink of collapse.",
      level_4:
        'In 1581, Elizabeth knighted Drake on the Golden Hind, infuriating Philip II. Meanwhile, Spain annexed Portugal and advanced across the Netherlands under the Duke of Parma.',
    },
    {
      stage: 5,
      act: 5,
      type: 'narrative',
      title: 'Stage 5: [1584–1585] The Treaties of Joinville & Nonsuch',
      theme_heading: 'Stage 5: [1584–1585] The Treaties of Joinville & Nonsuch',
      text: "The crisis reached an emergency in July 1584 when a Catholic fanatic assassinated Dutch leader <strong>William the Silent</strong>, leaving the Dutch revolt leaderless. In December 1584, Philip II signed the secret <strong>Treaty of Joinville</strong> with the French Catholic League, uniting Europe's two Catholic superpowers against Protestantism and eliminating the threat of France attacking Spain. Realizing that England would stand completely isolated if the Netherlands fell, Elizabeth abandoned her policy of covert aid. In August 1585, she signed the <strong>Treaty of Nonsuch</strong>, placing the Dutch Netherlands under English military protection, agreeing to dispatch <strong>7,400 English soldiers</strong> funded by the Crown, and officially entering into direct war with Spain.",
      level_4:
        'The assassination of William of Orange and the Franco-Spanish Treaty of Joinville in 1584 forced Elizabeth to act. In August 1585, she signed the Treaty of Nonsuch, committing troops and going to war with Spain.',
    },
  ],

  lesson_2_3: [
    {
      stage: 1,
      act: 1,
      type: 'narrative',
      title: 'Stage 1: [DEC 1585–1586] Dudley’s Campaign in the Netherlands',
      theme_heading: 'Stage 1: [DEC 1585–1586] Dudley’s Campaign in the Netherlands',
      text: 'Under the terms of the Treaty of Nonsuch, Elizabeth appointed her favourite, <strong>Robert Dudley, Earl of Leicester</strong>, to command the English expeditionary army of 7,000 troops sent to the Netherlands in December 1585. However, the campaign began in political chaos. In January 1586, Leicester accepted the title of <strong>Governor-General of the Low Countries</strong> from the Dutch Estates General. Elizabeth was enraged, viewing this unauthorized acceptance as an intolerable usurpation of sovereign power that implied England sought to annex the Netherlands, and she severely reprimanded Leicester, undermining his authority in the eyes of Dutch allies and Spanish commanders alike.',
      level_4:
        'In December 1585, the Earl of Leicester led 7,000 troops to the Netherlands. He angered Elizabeth by accepting the title of Governor-General, creating friction between England and the Dutch.',
    },
    {
      stage: 2,
      act: 2,
      type: 'narrative',
      title: 'Stage 2: [1586–1587] Military Setbacks: Zutphen & Deventer',
      theme_heading: 'Stage 2: [1586–1587] Military Setbacks: Zutphen & Deventer',
      text: 'Leicester’s military operations were plagued by logistical shortages, tactical blunders, and internal dissension. Elizabeth refused to provide sufficient funding, leaving English soldiers unpaid, diseased, and starving. In September 1586, English forces failed to capture the Spanish supply base at <strong>Zutphen</strong>, a battle famed for the death of poet-soldier <strong>Sir Philip Sidney</strong>. Relations with the Dutch collapsed completely in January 1587 when English Catholic mercenary commanders, Sir William Stanley and Rowland York, defected to Spain and betrayed the key fortresses of <strong>Deventer and the Zutphen sconces</strong> to the Duke of Parma. Deeply humiliated and mistrusted by Dutch leaders, Leicester was recalled to England in December 1587, having achieved negligible military gains.',
      level_4:
        "The English campaign suffered from lack of funds and poor leadership. At Zutphen, Sir Philip Sidney was killed, and the betrayal of Deventer to Spain destroyed English credibility, forcing Leicester's recall.",
    },
    {
      stage: 3,
      act: 3,
      type: 'narrative',
      title: 'Stage 3: [APRIL 1587] Drake’s Raid on Cadiz',
      theme_heading: 'Stage 3: [APRIL 1587] Drake’s Raid on Cadiz',
      text: 'With war now open and Philip assembling a massive invasion armada in Spanish ports, Elizabeth dispatched Sir Francis Drake with twenty-four warships to disrupt Spanish preparations. On <strong>19 April 1587</strong>, Drake audaciously sailed straight into the heavily fortified harbour of <strong>Cadiz</strong>, catching the Spanish fleet unprepared. Over thirty-six hours of daring naval warfare, Drake destroyed or captured <strong>thirty Spanish transport ships and warships</strong>, broke harbour fortifications, and plundered enormous quantities of arms and provisions. Drake famously characterized this pre-emptive strike as <strong>"singeing the King of Spain\'s beard"</strong>, demonstrating English naval supremacy in Spain\'s home waters.',
      level_4:
        "In April 1587, Drake attacked the fortified port of Cadiz in a daring pre-emptive strike. He destroyed 30 Spanish ships, famously boasting he had 'singed the King of Spain's beard'.",
    },
    {
      stage: 4,
      act: 4,
      type: 'narrative',
      title: 'Stage 4: [1587–1588] Impact of the Cadiz Raid',
      theme_heading: 'Stage 4: [1587–1588] Impact of the Cadiz Raid',
      text: 'Drake’s raid on Cadiz inflicted devastating tactical and logistical damage on Spanish war planning. He captured the <strong>San Felipe</strong>, a massive Portuguese East Indiaman carrying £108,000 in spices and treasure, which provided funds for English defense and yielded trade secrets. More critically, Drake sailed along the Portuguese coast destroying fishing fleets and burning <strong>thousands of tons of seasoned oak barrel staves</strong>. This forced the Spanish to construct water barrels from green, unseasoned wood, causing food supplies to rot and drinking water to leak during the 1588 voyage. Most decisively, Drake’s raid delayed the sailing of the Armada by <strong>twelve months</strong>, giving England vital time to fortify coastlines and build warships.',
      level_4:
        "Drake's raid captured vast treasure and destroyed thousands of seasoned barrel staves, causing Spanish supplies to spoil. Crucially, the strike delayed the Armada by a full year, aiding English preparations.",
    },
    {
      stage: 5,
      act: 5,
      type: 'narrative',
      title: 'Stage 5: [MAY–JULY 1588] The Armada Sets Sail',
      theme_heading: 'Stage 5: [MAY–JULY 1588] The Armada Sets Sail',
      text: "In May 1588, the <strong>Spanish Armada (the 'Enterprise of England')</strong> finally set sail from Lisbon under the command of the <strong>Duke of Medina Sidonia</strong>, comprising <strong>130 warships, 8,000 sailors, and 19,000 soldiers</strong>. Philip II's grand strategy was to sail up the English Channel, anchor off the coast of Flanders, and join forces with the <strong>Duke of Parma’s 27,000 veteran soldiers</strong>, who would be ferried across the Channel in flat-bottomed barges under the Armada’s naval escort. However, the plan contained fatal strategic flaws: Medina Sidonia had no deep-water port in the Low Countries to shelter his fleet, and communication between the Armada and Parma's army required overland messengers, creating dangerous delays and coordination failures.",
      level_4:
        "In May 1588, 130 Spanish ships sailed under Medina Sidonia to link with Parma's 27,000 troops in Flanders. The plan had severe flaws, lacking a deep-water port and reliable communications.",
    },
  ],

  lesson_2_4: [
    {
      stage: 1,
      act: 1,
      type: 'narrative',
      title: 'Stage 1: [JULY 1588] Channel Battles: Plymouth to Isle of Wight',
      theme_heading: 'Stage 1: [JULY 1588] Channel Battles: Plymouth to Isle of Wight',
      text: 'On 19 July 1588, the Spanish Armada was sighted off the Lizard in Cornwall, advancing in an impenetrable <strong>seven-mile-wide crescent defensive formation</strong>, with heavily armed galleons protecting unarmed supply storeships in the centre. The English fleet, commanded by <strong>Lord Howard of Effingham</strong> and Sir Francis Drake, sailed out from Plymouth. For a week, running artillery duels took place off Plymouth, Portland Bill, and the <strong>Isle of Wight</strong>. English captains utilized their superior maneuverability to stay upwind and fire long-range <strong>culverin cannons</strong>, avoiding Spanish boarding tactics. While the English failed to break the crescent formation, they successfully prevented the Spanish from seizing a secure anchorage on the Isle of Wight.',
      level_4:
        'The Armada sailed up the Channel in a tight 7-mile crescent. English ships engaged in long-range artillery battles, preventing the Spanish from capturing an anchorage at the Isle of Wight.',
    },
    {
      stage: 2,
      act: 2,
      type: 'narrative',
      title: 'Stage 2: [7–8 AUG 1588] Calais Roads & The Fireships',
      theme_heading: 'Stage 2: [7–8 AUG 1588] Calais Roads & The Fireships',
      text: 'On 6 August, Medina Sidonia anchored the Armada off <strong>Calais Roads</strong>, awaiting news from the Duke of Parma. However, Parma’s army was blockaded in Dunkirk by Dutch flyboats and was not ready to embark. Recognizing the Spanish vulnerability at anchor, Howard launched a daring midnight attack on 7–8 August. The English loaded eight old transport vessels with pitch, tar, and loaded cannons, set them ablaze, and sent these <strong>eight fireships</strong> drifting with the wind and tide into the densely packed Spanish anchorage. Panic swept through the Armada: fearing deadly explosive "hellburners", Spanish captains <strong>severed their anchor cables</strong> and scattered into the darkness. The disciplined crescent formation was permanently broken.',
      level_4:
        'While anchored at Calais, the English launched eight blazing fireships at midnight. Terrified Spanish captains cut their anchor cables and scattered in panic, permanently shattering their defensive crescent.',
    },
    {
      stage: 3,
      act: 3,
      type: 'narrative',
      title: 'Stage 3: [8 AUG 1588] The Battle of Gravelines',
      theme_heading: 'Stage 3: [8 AUG 1588] The Battle of Gravelines',
      text: 'At dawn on <strong>8 August 1588</strong>, English warships attacked the disorganized Spanish fleet off the coast of <strong>Gravelines</strong>. John Hawkins’ modern <strong>race-built galleons</strong>—lower, faster, and more maneuverable than the bulky Spanish vessels—closed to point-blank range, pounding Spanish hulls with continuous broadsides. English gun crews, trained to rapidly reload four-wheeled gun carriages, fired multiple shots for every single Spanish reply. Spanish gunners, crowded with soldiers and armed with mismatched cannons, were unable to reload effectively. Three Spanish galleons were sunk, many were severely crippled, and over <strong>1,000 Spanish sailors were killed</strong>, while the English suffered negligible ship losses.',
      level_4:
        'At Gravelines on 8 August, faster English galleons closed in with rapid broadside fire. English gunnery sank three galleons and shattered Spanish resistance without losing a single ship.',
    },
    {
      stage: 4,
      act: 4,
      type: 'narrative',
      title: 'Stage 4: [AUG–SEPT 1588] The Winds & Atlantic Retreat',
      theme_heading: 'Stage 4: [AUG–SEPT 1588] The Winds & Atlantic Retreat',
      text: 'Following Gravelines, the surviving Armada faced utter destruction. A fierce southwesterly gale—celebrated by Protestants as the <strong>"Protestant Wind"</strong>—prevented the Spanish from reuniting with Parma and drove the fleet into the treacherous North Sea. With their anchor cables severed at Calais, Spanish ships could not shelter in friendly harbours and were forced to undertake a perilous voyage home around the northern coast of Scotland and the western coast of Ireland. Battered by fierce Atlantic storms and lacking fresh water and navigational charts, dozens of ships were wrecked on the rocky cliffs of <strong>Scotland and Ireland</strong>. Surviving sailors who crawled ashore were slaughtered by local clans or English garrisons; barely <strong>sixty-seven battered vessels</strong> returned to Spain.',
      level_4:
        'Driven north by gale-force winds, the Armada was forced to sail around Scotland and Ireland. Lacking anchors, dozens of ships were wrecked in Atlantic storms, and only 67 ships limped home.',
    },
    {
      stage: 5,
      act: 5,
      type: 'narrative',
      title: 'Stage 5: [1588–1589] Consequences of the English Victory',
      theme_heading: 'Stage 5: [1588–1589] Consequences of the English Victory',
      text: 'England\'s triumph over the Armada was celebrated as a divine validation of Protestantism, with Elizabeth issuing commemorative medals inscribed: <em>"God blew and they were scattered"</em>. At the military camp at Tilbury, Elizabeth delivered her iconic address, declaring she had <strong>"the heart and stomach of a king, and of a king of England too"</strong>, cementing her national status as Gloriana. The victory secured English national independence, prevented a catastrophic Catholic restoration, and established England as a formidable maritime power. While war with Spain dragged on until the Treaty of London in 1604, Philip II’s financial credit was battered and the myth of Spanish naval invincibility was permanently shattered.',
      level_4:
        "Defeating the Armada secured English independence and boosted national pride, inspiring Elizabeth's Tilbury speech. It shattered the myth of Spanish naval invincibility and validated the Protestant nation.",
    },
  ],

  lesson_3_1: [
    {
      stage: 1,
      act: 1,
      type: 'narrative',
      title: 'Stage 1: [1558–1580s] Attitudes to Education & Literacy',
      theme_heading: 'Stage 1: [1558–1580s] Attitudes to Education & Literacy',
      text: 'Education in Elizabethan England was shaped by the Renaissance revival of learning known as <strong>Humanism</strong>, which argued that education should develop civilized citizens capable of governing the realm. However, schooling was strictly governed by the <strong>Great Chain of Being</strong>: education was intended to prepare children for their ordained station in life, not to encourage social climbing. Literacy rates rose steadily, with male literacy increasing from 20% to roughly <strong>30% of men</strong> by 1600, while female literacy remained below <strong>10%</strong>. Young children of the middling sort began their education in <strong>Petty Schools</strong> (or Dame Schools for girls), run by local women or clergy, learning basic English reading, writing, and arithmetic before progressing to grammar school or domestic work.',
      level_4:
        'Influenced by Humanism, Elizabethan education expanded, raising male literacy to about 30%. However, schooling was restricted by social class, preparing pupils only for their assigned social station.',
    },
    {
      stage: 2,
      act: 2,
      type: 'narrative',
      title: 'Stage 2: [1558–1580s] Grammar Schools',
      theme_heading: 'Stage 2: [1558–1580s] Grammar Schools',
      text: "The Elizabethan era witnessed a dramatic expansion in secondary education, with over <strong>seventy new endowed Grammar Schools</strong> founded across the realm, including Queen Elizabeth's Grammar School in Blackburn. These schools were independent of church control and charged fees, though funded scholarships allowed bright boys from yeoman and merchant backgrounds to attend. The curriculum was rigorously academic, concentrating on <strong>Latin grammar, classical literature (Cicero, Virgil), Greek, and rhetoric</strong>. School days were intensely demanding, lasting from 6:00 am to 5:00 pm, six days a week, reinforced by strict corporal punishment with the birch rod to instill discipline and deference to authority.",
      level_4:
        'Over 70 new grammar schools provided classical education in Latin and rhetoric for sons of merchants and gentry. The rigorous routine instilled strict social discipline through corporal punishment.',
    },
    {
      stage: 3,
      act: 3,
      type: 'narrative',
      title: 'Stage 3: [1558–1580s] Universities & Noble Education',
      theme_heading: 'Stage 3: [1558–1580s] Universities & Noble Education',
      text: 'For the children of the nobility and landed gentry, formal education was delivered at home by <strong>private tutors</strong>, teaching classical languages, French, history, geography, and gentlemanly accomplishments like horsemanship and fencing. Daughters of noble households were tutored in needlework, music, and foreign languages to prepare them for advantageous marriages. Higher education centered on England’s two ancient universities, <strong>Oxford and Cambridge</strong>, which expanded significantly under Elizabeth to train Anglican clergy, lawyers, and royal administrators. Wealthy young gentlemen frequently completed their education in London at the <strong>Inns of Court</strong>, studying common law and acquiring the cosmopolitan legal skills necessary for managing landed estates and county governance.',
      level_4:
        'Noble children were taught at home by private tutors in academic subjects and courtly skills. Older sons progressed to Oxford, Cambridge, or the London Inns of Court to study law and administration.',
    },
    {
      stage: 4,
      act: 4,
      type: 'narrative',
      title: 'Stage 4: [1558–1580s] Sports and Pastimes by Social Class',
      theme_heading: 'Stage 4: [1558–1580s] Sports and Pastimes by Social Class',
      text: 'Elizabethan leisure pursuits closely mirrored the rigid class structure of society. The nobility indulged in exclusive, expensive sports such as <strong>hunting deer, hawking, real tennis, and fencing</strong>, which reinforced aristocratic chivalry and martial prowess. In contrast, common working people engaged in rowdy, violent community pastimes on holidays, including <strong>football</strong>—an unregulated, brutal brawl between rival villages that frequently resulted in broken limbs and fatal injuries. However, blood sports were enjoyed by all social classes: <strong>bear-baiting, bull-baiting, and cockfighting</strong> drew huge, enthusiastic crowds from nobles to vagrants at purpose-built arenas such as the Paris Garden in Southwark, where spectators gambled heavily on the outcome.',
      level_4:
        'Leisure was sharply divided by class: elites enjoyed hunting, hawking, and tennis, while commoners played violent village football. However, blood sports like bear-baiting were loved by all social ranks.',
    },
    {
      stage: 5,
      act: 5,
      type: 'narrative',
      title: 'Stage 5: [1576–1588] Development of the Theatre',
      theme_heading: 'Stage 5: [1576–1588] Development of the Theatre',
      text: "The Elizabethan era saw the birth of secular commercial drama, evolving from wandering troupes of actors performing in inn-yards to purpose-built permanent playhouses. In 1576, James Burbage erected the first permanent theatre, <strong>The Theatre</strong>, in Shoreditch, outside the City of London's jurisdiction, followed by <strong>The Curtain (1577) and The Rose (1587)</strong>. Playhouses accommodated up to 3,000 spectators and were unique social melting pots: common <strong>groundlings paid one penny</strong> to stand in the open yard, while wealthy gentry paid up to sixpence for cushioned upper galleries. However, the theatre provoked fierce opposition from <strong>Puritan ministers and London authorities</strong>, who condemned plays as sinful breeding grounds for plague, prostitution, and public disorder.",
      level_4:
        "Permanent playhouses like 'The Theatre' (1576) emerged outside London, attracting thousands from penny groundlings to nobles. Puritans and magistrates opposed theatres due to fears of plague and immorality.",
    },
  ],

  lesson_3_2: [
    {
      stage: 1,
      act: 1,
      type: 'narrative',
      title: 'Stage 1: [1558–1580s] Population Growth & Rising Prices',
      theme_heading: 'Stage 1: [1558–1580s] Population Growth & Rising Prices',
      text: 'The fundamental driver of Elizabethan poverty was a massive demographic explosion. England’s population surged from 3 million in 1558 to over <strong>4.2 million by 1600</strong>, driven by falling death rates and higher fertility. Agricultural food production failed to keep pace with this rapid growth, resulting in severe food shortages and spiralling inflation, particularly when compounded by consecutive <strong>bad harvests in the 1570s and 1580s</strong>. The price of basic bread grain escalated far faster than income, causing <strong>real wages to collapse by 50%</strong>. Ordinary labourers, tenant farmers, and urban apprentices were pushed below subsistence levels, sparking a widespread crisis of poverty and hunger across the realm.',
      level_4:
        "England's population grew from 3m to over 4m, causing demand for food to outstrip supply. Bad harvests drove up food prices while real wages fell, plunging thousands into desperate poverty.",
    },
    {
      stage: 2,
      act: 2,
      type: 'narrative',
      title: 'Stage 2: [1558–1580s] Changes in Farming: Enclosure & Sheep',
      theme_heading: 'Stage 2: [1558–1580s] Changes in Farming: Enclosure & Sheep',
      text: 'Agrarian restructuring intensified rural unemployment. Landowners realized that sheep farming for the booming wool and cloth trade—which accounted for <strong>80% of English exports</strong>—was far more profitable than traditional arable grain farming. Consequently, landlords carried out <strong>enclosure</strong>, fencing off open communal fields and common waste land to create large private sheep pastures. Unlike labour-intensive crop cultivation, sheep farming required only a handful of shepherds. Landlords dramatically raised rents (<strong>rack-renting</strong>) and evicted thousands of tenant cottagers and strip farmers, forcing dispossessed rural families to wander the country in search of employment as landless vagrants.',
      level_4:
        'Landlords enclosed common land to graze sheep for the profitable wool trade, which required few workers. Evicted tenant farmers were driven off the land and forced into vagrancy.',
    },
    {
      stage: 3,
      act: 3,
      type: 'narrative',
      title: 'Stage 3: [1558–1570s] Changing Attitudes to the Poor',
      theme_heading: 'Stage 3: [1558–1570s] Changing Attitudes to the Poor',
      text: 'Elizabethan authorities grew terrified of social unrest, viewing the growing masses of wandering beggars as a direct threat to law and order. Society drew a rigid distinction between the <strong>"Impotent Poor"</strong> (the elderly, orphans, and physically sick who were genuinely unable to work) and the <strong>"Idle Poor" or "Sturdy Beggars"</strong> (able-bodied individuals suspected of feigning illness to avoid honest toil). Popular literature, notably Thomas Harman’s sensationalist 1567 book <strong>A Caveat for Common Cursitors</strong>, propagated the fear that vagrants formed organised criminal gangs of "counterfeit cranks" and "hookers", convincing the Elizabethan ruling class that harsh statutory measures were urgently necessary.',
      level_4:
        "Elizabethans distinguished between the deserving 'impotent poor' and the 'idle sturdy beggars'. Influenced by books like Harman's Caveat, authorities feared vagrants would cause riots and crime.",
    },
    {
      stage: 4,
      act: 4,
      type: 'narrative',
      title: 'Stage 4: [1572] The 1572 Vagabonds Act',
      theme_heading: 'Stage 4: [1572] The 1572 Vagabonds Act',
      text: 'Passed by Parliament in response to rising vagrancy, the <strong>1572 Vagabonds Act</strong> combined draconian criminal punishments with the first institutional mechanism for state welfare. To deter vagrancy, any able-bodied person over fourteen caught begging without a licence was to be arrested, <strong>severely whipped, and have a hole burned through their right ear</strong> with a hot iron. Repeat offenders faced death for felony. However, the act introduced a landmark welfare reform: local magistrates were legally required to establish a <strong>compulsory Poor Rate tax</strong> on all local property owners and appoint <strong>Overseers of the Poor</strong> to collect funds and provide weekly financial relief to the impotent poor.',
      level_4:
        'The 1572 Vagabonds Act punished sturdy beggars with whipping and ear-boring, but also introduced a compulsory parish Poor Rate tax and Overseers of the Poor to support the impotent poor.',
    },
    {
      stage: 5,
      act: 5,
      type: 'narrative',
      title: 'Stage 5: [1576] The 1576 Act for Relief of the Poor',
      theme_heading: 'Stage 5: [1576] The 1576 Act for Relief of the Poor',
      text: 'Recognizing that physical punishment alone could not solve systemic unemployment, Parliament enacted the <strong>1576 Act for the Relief of the Poor</strong>. This statute established a new principle: local government had a duty to provide work for the able-bodied unemployed. Justices of the Peace in every county were directed to purchase a communal stock of <strong>raw materials—such as wool, hemp, flax, and iron</strong>—for the unemployed to spin and process in exchange for wages. Furthermore, each town was required to construct a <strong>House of Correction (known as a Bridewell)</strong>, where persistent idle vagrants were compelled to perform hard manual labour under strict discipline, laying the foundation for the landmark 1601 Poor Law.',
      level_4:
        'The 1576 Act ordered JPs to provide raw wool and hemp so the able-bodied poor could earn wages. It established Houses of Correction (Bridewells) to force persistent vagrants into hard labor.',
    },
  ],

  lesson_3_3: [
    {
      stage: 1,
      act: 1,
      type: 'narrative',
      title: 'Stage 1: [1558–1575] New Navigational Technology',
      theme_heading: 'Stage 1: [1558–1575] New Navigational Technology',
      text: 'The Elizabethan golden age of maritime exploration was unlocked by revolutionary advances in navigational instruments and cartography. English captains began using <strong>astrolabes and quadrants</strong> to measure the angular elevation of the sun and the North Star, allowing them to calculate precise <strong>latitude</strong> at sea. The introduction of the magnetic compass, cross-staff, and the "log and line" enabled navigators to measure vessel speed and estimate dead reckoning across open oceans. Furthermore, Gerardus Mercator’s revolutionary <strong>1569 Mercator Projection map</strong> introduced conformal nautical charts with straight lines of constant bearing, enabling English navigators to plot reliable transoceanic courses across the Atlantic and Pacific away from familiar shorelines.',
      level_4:
        "Navigational tools like astrolabes, quadrants, and the magnetic compass allowed sailors to calculate latitude and speed. Mercator's 1569 map projection enabled captains to sail accurately across open oceans.",
    },
    {
      stage: 2,
      act: 2,
      type: 'narrative',
      title: 'Stage 2: [1558–1577] Improvements in Ship Design',
      theme_heading: 'Stage 2: [1558–1577] Improvements in Ship Design',
      text: 'English oceanic voyages were made possible by major transformations in naval architecture led by Sir John Hawkins. Departing from traditional, high-castled Spanish carraks, Hawkins developed the <strong>race-built galleon</strong>—a ship with a longer keel, lower forecastles, and a streamlined hull that reduced water resistance. These ships incorporated triangular <strong>lateen sails</strong> alongside square sails, giving them exceptional maneuverability to "tack" close to the wind in violent Atlantic weather. Crucially, English shipwrights redesigned gun decks to mount heavy <strong>culverin cannons on compact four-wheeled truck carriages</strong>, allowing English crews to fire rapid broadsides through low gunports without destabilizing the ship.',
      level_4:
        "Hawkins designed streamlined 'race-built galleons' with lower forecastles and lateen sails for superior handling. English ships carried heavy culverin cannons on four-wheel carriages for rapid broadside firing.",
    },
    {
      stage: 3,
      act: 3,
      type: 'narrative',
      title: 'Stage 3: [1550s–1570s] The Search for New Trade Routes',
      theme_heading: 'Stage 3: [1550s–1570s] The Search for New Trade Routes',
      text: 'English exploration was primarily propelled by commercial desperation. During the 1550s, the collapse of the European woollen cloth market at <strong>Antwerp</strong> caused severe domestic economic depression, compelling London merchants to establish new global export markets. To finance these risky, capital-intensive expeditions, merchants formed <strong>joint-stock companies</strong>, pooling private capital and sharing financial risk under royal charters. The <strong>Muscovy Company (1555)</strong> opened direct fur and timber trade with Russia, while the <strong>Levant Company (1581)</strong> traded silks and spices in the Mediterranean. Simultaneously, explorers like <strong>Martin Frobisher and John Davis</strong> led multiple Arctic expeditions seeking a <strong>North-West Passage</strong> to China and the East Indies, demonstrating English determination to bypass Spanish trade routes.',
      level_4:
        'The collapse of the Antwerp cloth trade forced English merchants to form joint-stock companies to fund exploration. Adventurers established trade with Russia and searched for an Arctic North-West Passage to Asia.',
    },
    {
      stage: 4,
      act: 4,
      type: 'narrative',
      title: 'Stage 4: [1577–1580] Drake’s Circumnavigation',
      theme_heading: 'Stage 4: [1577–1580] Drake’s Circumnavigation',
      text: 'In December 1577, Francis Drake sailed from Plymouth with five ships on a secret mission backed by Elizabeth to break into the Spanish Pacific. After navigating the treacherous <strong>Strait of Magellan</strong>, where devastating storms sank four ships and drove his flagship south to Cape Horn, Drake renamed his surviving vessel the <strong>Golden Hind</strong>. Navigating the uncharted Pacific coast of South America, Drake plundered Spanish ports in Peru and captured the treasure galleon <em>Cacafuego</em>. In June 1579, Drake landed in California, claimed the territory for Elizabeth as <strong>Nova Albion</strong>, and sailed west across the Pacific, trading for six tons of cloves with the Sultan of Ternate in the Spice Islands before completing the circumnavigation in September 1580.',
      level_4:
        'In 1577-80, Drake sailed the Golden Hind through the Strait of Magellan, plundered Spanish Pacific ports, claimed Nova Albion in California, and traded for spices in the Moluccas, circumnavigating the globe.',
    },
    {
      stage: 5,
      act: 5,
      type: 'narrative',
      title: 'Stage 5: [1580–1588] Significance of Drake’s Voyage',
      theme_heading: 'Stage 5: [1580–1588] Significance of Drake’s Voyage',
      text: "Drake’s triumphant circumnavigation transformed England’s international standing. He returned to Plymouth laden with silver, gold, pearls, and spices worth <strong>£140,000</strong>, delivering a staggering <strong>4,700% return</strong> to his investors and enabling Elizabeth to pay off the entire Crown foreign debt with funds to spare. Drake became the first captain to successfully sail his own ship around the world, proving that English sailors and race-built galleons could master global navigation and challenge Spanish naval hegemony anywhere on earth. The voyage laid the navigational and geopolitical foundation for England's future global empire, inspiring future ventures to establish colonies in North America and direct trade in Asia.",
      level_4:
        "Drake's voyage brought home massive wealth, wiped out the Crown foreign debt, and proved England could challenge Spain on the world's oceans, establishing the blueprint for the British Empire.",
    },
  ],

  lesson_3_4: [
    {
      stage: 1,
      act: 1,
      type: 'narrative',
      title: 'Stage 1: [1584] Raleigh’s Patent & Planning',
      theme_heading: 'Stage 1: [1584] Raleigh’s Patent & Planning',
      text: 'In March 1584, Queen Elizabeth granted courtier and explorer <strong>Sir Walter Raleigh</strong> a royal patent authorizing him to discover, explore, and colonize any "remote, heathen and barbarous lands" not already claimed by a Christian prince. Raleigh and advisor <strong>Richard Hakluyt</strong> published <em>A Discourse on Western Planting</em>, arguing that an American colony would provide a vital forward privateering base to intercept Spanish treasure fleets from the Caribbean. Furthermore, a permanent colony would supply England with exotic timber, sugar, and tobacco, create a new export market for English woollen cloth, and offer productive employment for England\'s surplus impoverished population. Raleigh named the territory <strong>Virginia</strong> in honor of Elizabeth, the Virgin Queen.',
      level_4:
        'In 1584, Elizabeth gave Walter Raleigh a charter to colonize North America, named Virginia. Hakluyt argued the colony would serve as a privateering base against Spain and open new trade markets.',
    },
    {
      stage: 2,
      act: 2,
      type: 'narrative',
      title: 'Stage 2: [1584–1585] Recruiting Colonists & Leaders',
      theme_heading: 'Stage 2: [1584–1585] Recruiting Colonists & Leaders',
      text: 'Raleigh faced severe obstacles in organizing the 1585 colonial expedition to Roanoke Island. Forbidden by Elizabeth from leading the voyage personally, Raleigh appointed his aristocratic cousin, <strong>Sir Richard Grenville</strong>, as fleet commander, and army veteran <strong>Ralph Lane</strong> as colony governor. The expedition’s social composition was fundamentally flawed: the <strong>107 colonists</strong> were predominantly aristocratic "gentlemen" who refused to engage in manual labor, and soldiers accustomed to martial violence rather than farming. Crucially, the party lacked experienced farmers, fishermen, and bricklayers needed to build a self-sufficient colony. However, the expedition included skilled scientist <strong>Thomas Harriot</strong> and surveyor-artist <strong>John White</strong>, accompanied by two Native American translators, <strong>Manteo and Wanchese</strong>.',
      level_4:
        'Raleigh sent 107 colonists led by Richard Grenville and Ralph Lane. The group lacked farmers and was dominated by soldiers and gentlemen who refused manual labour, creating fatal weaknesses.',
    },
    {
      stage: 3,
      act: 3,
      type: 'narrative',
      title: 'Stage 3: [1585–1586] The First Roanoke Colony & Disaster',
      theme_heading: 'Stage 3: [1585–1586] The First Roanoke Colony & Disaster',
      text: 'The 1585 expedition suffered immediate disaster upon arrival off the North Carolina coast in July. The fleet flagship, the <strong>Tiger</strong>, ran aground on a treacherous coastal sandbar, flooding the hold with seawater and destroying the colonists’ seeds, livestock, and primary grain provisions. Forced to settle on <strong>Roanoke Island</strong> with only a fraction of their food, the colonists were unable to cultivate crops because they had arrived too late in the planting season. The English were forced to rely completely on the local <strong>Secotan tribe</strong> and their paramount chief, <strong>Wingina</strong>, demanding food handouts and relying on Indigenous fish weirs. As English demands drained tribal food reserves, relations between the two communities rapidly turned hostile.',
      level_4:
        "The flagship Tiger ran aground in 1585, destroying grain seeds and food supplies. Arriving too late to plant crops, the colonists became completely dependent on food handouts from Chief Wingina's Secotan tribe.",
    },
    {
      stage: 4,
      act: 4,
      type: 'narrative',
      title: 'Stage 4: [1586] Conflict & Evacuation',
      theme_heading: 'Stage 4: [1586] Conflict & Evacuation',
      text: 'Tensions between the Roanoke colonists and the Secotan exploded into open warfare in the spring of 1586. English diseases decimated local villages, leading Indigenous priests to believe the English possessed supernatural weapons. When a silver cup went missing, Grenville burned an entire Native village in retaliation. Convinced Chief Wingina was plotting a coordinated attack to wipe out the settlement, Governor Ralph Lane launched a pre-emptive ambush in June 1586, <strong>killing Chief Wingina</strong> and beheading him. Trapped in a fortified compound without food and facing imminent starvation, the colonists were rescued just days later when <strong>Sir Francis Drake</strong> arrived with his fleet after raiding the Spanish Caribbean, evacuating the desperate survivors back to England.',
      level_4:
        'Conflict erupted when English diseases spread and a village was burned over a stolen cup. Lane ambushed and killed Chief Wingina, and when Drake arrived days later, the starving colonists evacuated.',
    },
    {
      stage: 5,
      act: 5,
      type: 'narrative',
      title: 'Stage 5: [1587–1590] The ‘Lost Colony’ & Significance',
      theme_heading: 'Stage 5: [1587–1590] The ‘Lost Colony’ & Significance',
      text: 'In 1587, Raleigh dispatched a second expedition to Roanoke under <strong>John White</strong>, this time recruiting <strong>118 civilian settlers, including women and children</strong>, to establish a permanent farming community. Shortly after arrival, White’s daughter gave birth to <strong>Virginia Dare</strong>, the first English child born in the Americas. In August 1587, White returned to England for emergency supplies, but his return was blocked for three years because all English shipping was impounded to defend against the <strong>1588 Spanish Armada</strong>. When White finally returned to Roanoke in August 1590, the settlement was entirely deserted, with the single word <strong>"CROATOAN"</strong> carved into a palisade post. Although both attempts failed, Roanoke provided essential navigational charts and agricultural lessons that ensured the successful founding of <strong>Jamestown in 1607</strong>.',
      level_4:
        "In 1587, a second colony of 118 civilian settlers was led by John White. Delayed for three years by the Armada, White returned in 1590 to find the colony vanished, leaving only the word 'CROATOAN'.",
    },
  ],
};

async function run() {
  console.log('Loading units/eee/data.js...');
  const mod = await import('../units/eee/data.js');
  const unitData = mod.default || mod.unitData;

  let totalUpdatedLessons = 0;
  let totalBlocksCreated = 0;

  unitData.lessons.forEach((lesson) => {
    const newStages = EEE_5STAGE_NARRATIVES[lesson.id];
    if (!newStages || newStages.length !== 5) {
      console.warn(`No 5-stage definition found for ${lesson.id}`);
      return;
    }

    // Extract any existing tasks from the previous final block (Act 4)
    let existingTasks = null;
    if (lesson.narrative_blocks && lesson.narrative_blocks.length > 0) {
      const lastBlock = lesson.narrative_blocks[lesson.narrative_blocks.length - 1];
      if (lastBlock.tasks) {
        existingTasks = JSON.parse(JSON.stringify(lastBlock.tasks));
      }
    }

    // Deep clone new stages
    const upgradedBlocks = JSON.parse(JSON.stringify(newStages));

    // Preserve the Master Disciplinary Enquiry Task on Stage 5
    if (existingTasks) {
      upgradedBlocks[4].tasks = existingTasks;
    }

    lesson.narrative_blocks = upgradedBlocks;
    totalUpdatedLessons++;
    totalBlocksCreated += upgradedBlocks.length;
    console.log(`✓ Upgraded ${lesson.id}: 5 narrative blocks created.`);
  });

  // Serialize back to units/eee/data.js
  const serialized = JSON.stringify(unitData, null, 2);
  const fileContent = `// Early Elizabethan England, 1558–88 Unit Data\nconst unitData = ${serialized};\n\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;

  fs.writeFileSync(EEE_DATA_PATH, fileContent, 'utf8');
  console.log(`\nUpgrade completed successfully!`);
  console.log(`Total lessons upgraded: ${totalUpdatedLessons}`);
  console.log(`Total narrative blocks: ${totalBlocksCreated}`);
}

run().catch((err) => {
  console.error('Fatal error during upgrade:', err);
  process.exit(1);
});
