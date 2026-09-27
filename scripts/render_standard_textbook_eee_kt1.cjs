/**
 * History Revision Hub — Publisher-Level Standard Textbook Engine
 *
 * Target: Early Elizabethan England, 1558–1588 (Key Topic 1)
 * Output: public/pdfs/eee_textbook_KT1_PUBLISHER.pdf
 * HTML:   public/units/eee/textbook_KT1_PUBLISHER.html
 *
 * Architectural Standards Enforced:
 * 1. ZERO AI Fluff & Zero Theatrical Jargon.
 * 2. Official Specification Primacy: Header, cover matrix & lesson banners feature authentic Pearson Edexcel 1HI0/B4 spec.
 * 3. Base64 Image Inlining: All archival photos & maps embedded directly as Data URIs.
 * 4. Two-Pillar Master Layout: 100% pure narrative, zero Do Nows, zero task boxes, zero write-in lines.
 * 5. Exact 12-Page Budget (Zero Orphans, Zero Blank Pages, Exactly 3 Folded A3 Sheets):
 *    - Page 1:  Master Front Cover (Photographic Plate, official 4-column spec matrix, QR hub)
 *    - Page 2:  KT 1.1 Accession & Government (1558) - Verso (Sections 1 & 2 + Sources + Vocab)
 *    - Page 3:  KT 1.1 Accession & Government (1558) - Recto (Sections 3 & 4 + Key Figure: William Cecil + Marriage Matrix)
 *    - Page 4:  KT 1.2 The Settlement of Religion (1559) - Verso (Sections 1 & 2 + Sources + Vocab)
 *    - Page 5:  KT 1.2 The Settlement of Religion (1559) - Recto (Sections 3 & 4 + Key Figure: Matthew Parker + Compromise Matrix)
 *    - Page 6:  KT 1.3 Challenge to the Settlement - Verso (Sections 1 & 2 + Sources + Vocab)
 *    - Page 7:  KT 1.3 Challenge to the Settlement - Recto (Sections 3 & 4 + Key Figure: Pope Pius V + Mutation of Dissent)
 *    - Page 8:  KT 1.4 The Problem of Mary Stuart - Verso (Sections 1 & 2 + Sources + Vocab)
 *    - Page 9:  KT 1.4 The Problem of Mary Stuart - Recto (Sections 3 & 4 + Key Figure: Mary Stuart + Four Fatal Options)
 *    - Page 10: Key Topic 1 Synoptic Matrix & Master Chronological Spine (1558–1569)
 *    - Page 11: Edexcel Paper 2 Examination Strategy & Model Answers (Q1 Features, Q2 Explain Why, Q3 Essay)
 *    - Page 12: Master Back Cover (Knowledge Organiser, Core Vocabulary Glossary, 4 Interactive QR Cards)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');

const ROOT_DIR = path.join(__dirname, '..');

/**
 * Robust Base64 Image Inliner
 */
function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'eee', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'eee', 'assets', 'portraits', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'eee', 'assets', 'banners', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'eee', 'assets', path.basename(clean)),
  ];

  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      const ext = path.extname(cand).toLowerCase();
      let mime = 'image/jpeg';
      if (ext === '.png') mime = 'image/png';
      else if (ext === '.webp') mime = 'image/webp';
      else if (ext === '.svg') mime = 'image/svg+xml';
      const buf = fs.readFileSync(cand);
      return `data:${mime};base64,${buf.toString('base64')}`;
    }
  }
  console.warn(`[WARN] Image not found on disk: ${relPath}`);
  return null;
}

function generateQrSvg(url) {
  const qr = QRCode.create(url, { margin: 1 });
  const size = qr.modules.size;
  const data = qr.modules.data;
  let pathD = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (data[r * size + c]) {
        pathD += `M${c},${r}h1v1h-1z `;
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" style="width: 100%; height: 100%;"><path fill="#ffffff" d="M0,0h${size}v${size}H0z"/><path fill="#0f172a" d="${pathD.trim()}"/></svg>`;
}

async function buildPublisherTextbookHtmlKT1() {
  const getKt1Data = require('./eee_textbook_data_kt1.cjs');
  const ktData = getKt1Data({ getBase64Image });
  const { coverConfig, componentBank, leftSources, leftVocab, backCoverData } = ktData;

  const quizUrl = 'https://the-history-revision-hub.netlify.app/?unit=eee&quiz=true&lesson=1';
  const qrDataUrl = await QRCode.toDataURL(quizUrl, {
    width: 140,
    margin: 1,
    color: { dark: '#0f172a', light: '#ffffff' },
  });

  const coverImgData = getBase64Image(coverConfig.coverImage);

  // Helper for rendering Archival Source Boxes
  const renderArchivalSourceBox = (src) => {
    if (!src || !src.title) return '';
    return `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">HISTORICAL SOURCE</span>
            <span class="source-type">${src.type}</span>
          </div>
          <span class="source-date-micro">${src.date}</span>
        </div>
        <div class="archival-title">${src.title}</div>
        ${src.image ? `<img class="archival-image" src="${src.image}" alt="${src.title}">` : ''}
        <div class="archival-context-box">
          <p class="archival-context-text">${src.context}</p>
          <div class="archival-hinge-q"><strong>Hinge Question:</strong> <em>${src.hingeQuestion}</em></div>
        </div>
      </div>
    `;
  };

  // Enriched, authoritative Pearson-aligned narrative chapters for KT1
  const lessons = [
    // Lesson 1: KT 1.1 (Accession 1558)
    {
      num: 1,
      code: 'KT 1.1',
      title: 'The Situation on Elizabeth’s Accession, 1558',
      enquiry:
        'From crippling debt to looming foreign invasion: How did an inexperienced queen secure a divided and vulnerable England in 1558?',
      specRef: '1HI0/B4 &bull; Key Topic 1.1',
      sec1: {
        num: 1,
        title: 'Social Hierarchy & The Structure of Tudor Government',
        paras: [
          `When Elizabeth Tudor ascended the throne on 17 November 1558 at the age of twenty-five, she inherited a deeply fractured nation of roughly three million people. Tudor society was strictly ordered by the <strong>Great Chain of Being</strong>—an immutable cosmic hierarchy ordained by God in which every individual held a fixed rank and owed total obedience to their social superiors. In the countryside, where 90 per cent of the population lived, the social pyramid was crowned by the nobility (roughly fifty peerage families who owned vast estates) and the gentry (wealthy landowners who dominated county society). Beneath them sat yeomen (independent farmers owning their land), tenant farmers, and at the broad base, landless labourers who scraped a subsistence living. In the burgeoning towns, wealthy merchants formed an urban aristocracy, followed by skilled craftsmen, professionals, and unskilled labourers.`,
          `Government centred entirely upon the personal authority of the monarch, who claimed to rule by <strong>Divine Right</strong>. Crucially, the Crown possessed no standing army and no salaried national police force, meaning the monarch governed through a web of aristocratic consent and <strong>royal patronage</strong>. By granting land, hereditary titles, lucrative offices, and trading monopolies, Elizabeth bound powerful nobles to her service. Day-to-day governance was directed by the <strong>Privy Council</strong>, a select cadre of approximately nineteen trusted aristocratic advisers who met multiple times weekly to oversee state finance, foreign diplomacy, and the enforcement of law. At its head stood <strong>Sir William Cecil</strong>, whom Elizabeth appointed Principal Secretary on her accession day, establishing a thirty-year political partnership based on moderation, administrative vigilance, and unwavering Protestant loyalty.`,
          `National legislation and extraordinary finance required the consent of <strong>Parliament</strong>, comprising the House of Lords (hereditary peers and bishops) and the House of Commons (wealthy gentry and burgesses). Unlike modern democracy, Parliament met only when summoned by the Queen—gathering only nine times across her forty-five-year reign, primarily to grant <strong>subsidies</strong> (emergency taxes). In the counties, the monarch’s will was enacted by <strong>Lord Lieutenants</strong>, wealthy nobles appointed to raise county militias in wartime, and unpaid <strong>Justices of the Peace (JPs)</strong>. These voluntary magistrates enforced statutory law, inspected highways, collected local rates, and punished petty crime, providing the essential bridge between Whitehall directives and provincial reality.`,
        ],
      },
      sec2: {
        num: 2,
        title: 'The Virgin Queen: Legitimacy, Gender & Marriage',
        paras: [
          `Elizabeth’s accession was immediately shadowed by existential questions surrounding her <strong>legitimacy</strong>. Under English canon law, only a child born in lawful wedlock could inherit the throne. Devout Catholics throughout Europe and England regarded Elizabeth as illegitimate because they refused to recognize Henry VIII’s unilateral divorce from Catherine of Aragon in 1533. The Pope had refused to annul Henry’s first marriage, meaning Henry’s subsequent marriage to Elizabeth’s mother, Anne Boleyn, was viewed in Rome as adulterous. Furthermore, following Anne Boleyn’s execution for treason in 1536, Henry VIII himself had pressured Parliament into passing the Second Succession Act, legally bastardizing Elizabeth and excluding her from the succession. Although Henry reinstated her in his 1544 will, Catholics argued that an act of Parliament could never override divine law.`,
          `Compounding her disputed birth was sixteenth-century European prejudice against female rulers. Christian tradition, rooted in biblical passages from Saint Paul, taught that women were inherently physically and intellectually inferior to men, created to remain under male submission. A <strong>'Queen Regnant'</strong>—a woman ruling in her own right with sovereign executive power—was widely viewed as unnatural, monstrous, and incapable of commanding armies in battle. The traumatic reign of Elizabeth’s elder half-sister, Mary I, had reinforced these anxieties: Mary’s marriage to Philip of Spain had dragged England into disastrous foreign wars, ignited ferocious domestic rebellions, and subordinated English interests to the Spanish crown.`,
          `Consequently, the Privy Council and Parliament placed intense, immediate pressure upon Elizabeth to marry and produce a legitimate Protestant heir to secure the Tudor dynasty. Yet marriage presented a lethal constitutional impasse. If Elizabeth married a foreign Catholic prince (such as Philip II of Spain or the Archduke Charles of Austria), England risked becoming a satellite of a foreign empire. Conversely, marrying an English nobleman (such as her favourite, Lord Robert Dudley) would trigger murderous factional jealousy among rival courtiers like the Duke of Norfolk and William Cecil. Demonstrating supreme political acumen, Elizabeth transformed this weakness into an asset: by remaining single, she preserved her sovereign independence and weaponized marriage negotiations as diplomatic bait for over twenty years.`,
        ],
      },
      sec3: {
        num: 3,
        title: 'The Financial Crisis: Debt, Debasement & Crown Lands',
        paras: [
          `Elizabeth inherited a royal treasury on the brink of total collapse. Decades of expensive foreign wars waged by Henry VIII, Edward VI, and Mary I in France and Scotland had emptied the Crown exchequer. In November 1558, the Crown stood <strong>£300,000 in debt</strong>—a staggering liability given that the Crown’s ordinary annual income was barely £286,667. Most alarmingly, over £100,000 of this sum was owed to foreign moneylenders on the <strong>Antwerp Exchange</strong>, who demanded crippling interest rates of 14 per cent, leaving England vulnerable to economic blackmail from the Spanish rulers of the Netherlands.`,
          `The Crown’s traditional revenue streams were severely impaired. To finance military campaigns in the 1540s and 1550s, previous monarchs had sold off vast swathes of confiscated monastic lands (Crown lands), permanently reducing royal rental yields. To bridge the deficit, governments had repeatedly resorted to <strong>debasement</strong>—melting down silver coinage and reminting coins with cheap copper alloys. This policy caused catastrophic price inflation: merchant confidence evaporated, domestic food prices skyrocketed, and wages stagnated, sparking intense rural distress. In towns, the essential English cloth export trade to Antwerp fell into deep recession.`,
          `Elizabeth lacked the financial muscle to maintain a permanent mercenary army or construct modern fortifications without parliamentary grants. Yet calling Parliament to levy extraordinary taxation carried severe political risks: taxes were intensely unpopular among the landed gentry, and MPs routinely demanded royal concessions on religion or marriage in exchange for subsidies. Under Cecil’s guidance, Elizabeth adopted rigorous financial austerity. She slashed royal household expenditures by half, sold off non-essential Crown properties (raising £120,000), called in feudal dues, and reformed customs collections. Remarkably, by 1574, through obsessive fiscal caution, Elizabeth cleared the Crown’s debts and accumulated a royal surplus.`,
        ],
      },
      sec4: {
        num: 4,
        title: 'Foreign Geopolitical Threats: France, Calais & The Auld Alliance',
        paras: [
          `Beyond her borders, Elizabeth faced an extraordinarily dangerous international landscape. England was surrounded by Catholic superpowers possessing vast military resources. In 1558, England was formally at war with France, having entered the conflict under Mary I as Spain’s ally. In January 1558, French forces commanded by the Duke of Guise captured <strong>Calais</strong>, England’s last territorial possession on the European mainland, which had been held since 1347. The loss was felt across England as a profound national humiliation: it deprived English merchants of an essential wool-trading port and stripped the navy of a strategic military garrison overlooking the English Channel.`,
          `In April 1559, Elizabeth signed the <strong>Treaty of Cateau-Cambrésis</strong>, bringing the wider European war to an end. Under its terms, France retained Calais for eight years, after which it would be returned to England or France would pay 500,000 crowns—an agreement Elizabeth recognized as a diplomatic smokescreen that permanently ceded the enclave. Even more dangerously, the treaty brought peace between the great Catholic rivals, France and the Holy Roman Empire/Spain. For the first time in sixty years, the two great European superpowers were not at war with each other, raising the terrifying prospect of a united Papal-backed Catholic crusade against Protestant England.`,
          `This danger was amplified on England's northern frontier by the <strong>Auld Alliance</strong> between France and Scotland. Scotland was ruled by the Catholic regent, Mary of Guise, who governed on behalf of her sixteen-year-old daughter, <strong>Mary, Queen of Scots</strong>. French troops were stationed in Scottish garrisons along the border, placing hostile armies within marching distance of Newcastle and York. Crucially, Mary Stuart was married to Francis, the Dauphin of France. When King Henry II died in 1559 and Francis ascended the throne as Francis II, Mary Stuart became Queen of France and Queen of Scotland simultaneously, while openly declaring herself the legitimate Queen of England. England stood caught in a lethal geopolitical pincer movement.`,
        ],
      },
    },

    // Lesson 2: KT 1.2 (The Settlement of Religion, 1559)
    {
      num: 2,
      code: 'KT 1.2',
      title: "The 'Settlement' of Religion, 1559",
      enquiry:
        "How successfully did Elizabeth's 1559 'Middle Way' reconcile intense religious divisions while establishing crown authority across England?",
      specRef: '1HI0/B4 &bull; Key Topic 1.2',
      sec1: {
        num: 1,
        title: 'Religious Divisions & The Search for the "Middle Way"',
        paras: [
          `In November 1558, England stood on the brink of sectarian civil war. For a quarter of a century, the English people had suffered whiplash religious upheavals: Henry VIII’s break with Rome in 1534, Edward VI’s radical Calvinist iconoclasm (1547–1553), and Mary I’s violent Catholic restoration (1553–1558), during which 284 Protestant men and women were burned alive at the stake as heretics. The realm was geographically and ideologically fractured. The North, the West Midlands, Wales, and Lancashire remained staunchly devoted to traditional Roman Catholicism, Latin masses, and the veneration of saints. Conversely, London, East Anglia, and the South-East contained large, educated, and vocal Protestant populations committed to Reformed theology.`,
          `Compounding this division was the return of hundreds of <strong>Marian exiles</strong>—hardline English Protestants who had fled Mary’s burnings to live in Calvinist Geneva, Zurich, and Strasbourg. Returning home in 1558, these zealous reformers expected Elizabeth to sweep away every trace of popery, abolish the hierarchy of bishops, and establish a pure Presbyterian church modelled on John Calvin’s Geneva. Elizabeth herself was an educated Protestant, fluent in Greek and Latin, who revered the English Bible. However, unlike the returning exiles, she was deeply pragmatic: she recognized that imposing a radical Protestant reform on a conservative, Catholic majority would provoke an immediate northern rebellion and invite foreign invasion.`,
          `Elizabeth’s overarching objective was political survival and national stability. She sought to construct a <strong>'Middle Way' (*Via Media*)</strong>—a comprehensive church settlement that was firmly Protestant in its official doctrine and governance, but retained traditional Catholic ceremonial forms, visual liturgy, and episcopal hierarchy. By making the Church inclusive and avoiding aggressive inquisitions into private belief, Elizabeth hoped to secure the outward obedience of moderate Catholics while providing a permanent institutional home for the English Protestant nation.`,
        ],
      },
      sec2: {
        num: 2,
        title: 'The Legal Pillars: Act of Supremacy & Act of Uniformity',
        paras: [
          `In the spring Parliament of 1559, Elizabeth and William Cecil steered two landmark statutes through intense legislative opposition in the House of Lords. The first was the <strong>Act of Supremacy (1559)</strong>, which formally severed England's ties to Rome and restored royal control over the Church. In a stroke of brilliant political diplomacy, Elizabeth abandoned Henry VIII’s controversial title of 'Supreme Head'. Instead, she assumed the title of <strong>'Supreme Governor'</strong> of the Church of England. This subtle alteration appeased moderate Catholics, who believed that only Jesus Christ or the Pope could be head of the Church, as well as Marian exiles who argued that scripture forbade a woman from claiming spiritual headship.`,
          `The Act of Supremacy made an <strong>Oath of Supremacy</strong> mandatory for all public officials, judges, MPs, and clergymen, requiring them to swear allegiance to the Queen as Supreme Governor. Any official refusing the oath was stripped of their office and livelihood. Crucially, while all but one of Mary’s Catholic bishops refused the oath and were replaced with moderate Protestants, the vast majority of parish priests—roughly 9,000 across England—took the oath and kept their livings, guaranteeing administrative continuity across the countryside. The act also established the Court of High Commission to prosecute religious dissent.`,
          `The second pillar was the <strong>Act of Uniformity (1559)</strong>, which dictated that every parish in the kingdom must follow an identical pattern of worship. It mandated the universal use of an updated 1559 <strong>Book of Common Prayer</strong>, written in English. To reconcile conservative Catholics, the wording around the communion service was left deliberately ambiguous: the prayer book combined the 1549 Protestant phrasing acknowledging Christ's sacrifice with traditional Catholic formulas referring to Christ's body and blood, allowing worshippers to interpret the Eucharist according to their own conscience. Church attendance on Sundays and Holy Days was made compulsory: those who failed to attend were labelled <strong>recusants</strong> and subjected to a <strong>1-shilling fine</strong> (equivalent to roughly a week's wages for a skilled labourer).`,
        ],
      },
      sec3: {
        num: 3,
        title: 'The Royal Injunctions & Mechanisms of Enforcement',
        paras: [
          `To enforce the settlement at parish level, William Cecil issued fifty-seven <strong>Royal Injunctions (1559)</strong>. These detailed administrative orders instructed the clergy on how Sunday services must be conducted. The Injunctions struck a careful balance: they commanded priests to teach the Royal Supremacy, denounce the Pope’s usurped authority, and ensure that every parish church purchased a large copy of the Bible in English. To eradicate traditional Catholic 'superstition', pilgrimages were outlawed, fake relics were destroyed, and candle-burning before shrines was banned.`,
          `However, Elizabeth inserted vital ceremonial concessions to reassure conservative parishioners. Church interiors retained an altar table rather than a plain wooden communion board; music and organ-playing were encouraged; kneeling during prayer and bowing at the name of Jesus were enforced; and clergymen were permitted to marry only with the explicit approval of their bishop and two Justices of the Peace. Clergy were required to wear traditional liturgical dress: a white linen surplice during services and an outdoor black cope. Preaching was strictly restricted: to prevent radical puritan or Catholic rabble-rousing, only ministers licensed by the Crown or a bishop were allowed to deliver sermons; unlicensed clergy were required to read approved homilies.`,
          `Enforcement was carried out through nationwide episcopal <strong>visitations</strong>. In the summer of 1559, teams of royal commissioners toured every diocese in England, inspecting church buildings, examining clergy qualifications, checking for English Bibles, and administering the Oath of Supremacy. Approximately 400 Marian priests who refused to conform were deprived of their posts, but the overwhelming majority took the oath. Visitations were repeated every three to four years, ensuring that parish life steadily conformed to the statutory Elizabethan baseline.`,
        ],
      },
      sec4: {
        num: 4,
        title: 'The Church of England as an Instrument of Social Control',
        paras: [
          `In sixteenth-century England, the Church was far more than a spiritual sanctuary; it was the state’s supreme engine for nationwide social control, political indoctrination, and local administration. With no television, radio, or newspapers, the parish pulpit was the Crown’s primary communication network. Every Sunday, thousands of congregations assembled to hear royal proclamations read aloud and recite prayers of thanks for the Queen’s health and the preservation of the realm. Obedience to the monarch was preached as a direct commandment from God; rebellion was branded as the ultimate mortal sin.`,
          `The Church operated its own powerful judicial apparatus known as <strong>Church courts (consistory courts)</strong>. These ecclesiastical tribunals held immense jurisdiction over everyday communal life. While royal common law courts dealt with property disputes and felonies, Church courts policed the moral fabric of society: prosecuting adultery, fornication, slander, witchcraft, public drunkenness, and failure to attend church. They also held legal monopolies over civil administrative functions: validating marriages, proving wills, administering probate, and regulating parish charities and schools.`,
          `Furthermore, the parish church served as the social heartbeat of community life. Churchwardens organized seasonal festivals—such as May Day, harvest suppers, and Easter parish fairs—which reinforced communal solidarity and social cohesion. By preserving the traditional visual splendor of churches, rood screens, and musical liturgy, Elizabeth allowed ordinary peasants to experience the comforting familiarity of their ancestral rituals within a Protestant theological framework. For the first decade of her reign, this pragmatic compromise successfully prevented the catastrophic religious wars that were tearing France apart.`,
        ],
      },
    },

    // Lesson 3: KT 1.3 (Challenges to the Settlement)
    {
      num: 3,
      code: 'KT 1.3',
      title: 'Challenge to the Religious Settlement',
      enquiry:
        'To what extent did radical Puritan resistance and domestic Catholic dissent threaten the stability of the Elizabethan regime by 1570?',
      specRef: '1HI0/B4 &bull; Key Topic 1.3',
      sec1: {
        num: 1,
        title: 'The Puritan Challenge: Crucifixes, Vestments & Prophesyings',
        paras: [
          `While the 1559 Religious Settlement achieved broad national acceptance, it faced fierce ideological resistance from two unyielding extremes. From within Protestant ranks came the challenge of the <strong>Puritans</strong>—zealous reformers who believed Elizabeth’s 'Middle Way' was a cowardly, half-hearted compromise that retained the idolatrous 'dregs of popery'. Puritans adhered to strict Calvinist theology: they believed in double predestination, rejected the authority of bishops, demanded a church governed by elected elders (Presbyterians), and insisted that any practice not explicitly mentioned in the Bible was a sinful invention of the Antichrist.`,
          `The Puritan challenge manifested in two major flashpoints during the 1560s. The first was the <strong>Crucifix Controversy</strong>. Elizabeth insisted on keeping a silver crucifix and burning candles in her royal chapel, and ordered that every parish church retain a crucifix on the rood screen to comfort Catholic parishioners. Puritan bishops, led by Edmund Grindal and John Jewel, fiercely condemned crucifixes as idolatrous images that violated the Second Commandment. Several bishops threatened to resign en masse. Lacking educated Protestant clergymen to replace them, Elizabeth backed down and removed crucifixes from parish churches, though she stubbornly retained one in her private chapel.`,
          `The second crisis was the <strong>Vestment Controversy (1565–1566)</strong>. Puritans rejected the mandatory white linen surplice, arguing that special priestly garments suggested ministers possessed supernatural powers to turn bread into Christ’s body. By 1565, many London preachers were refusing to wear the surplice, dressing in plain black gowns. Elizabeth ordered Archbishop Matthew Parker to enforce uniform dress. In 1566, Parker issued the *Book of Advertisements* and summoned 110 London ministers to Lambeth Palace for a dress inspection. Thirty-seven ministers boldly refused to conform and were summarily dismissed from their livings. Despite their fury, Puritans remained politically loyal to Elizabeth because the only alternative—a Catholic monarch like Mary Stuart—was unthinkable.`,
        ],
      },
      sec2: {
        num: 2,
        title: 'The Domestic Catholic Challenge & Recusancy',
        paras: [
          `The Catholic challenge posed a far graver existential danger. In 1558, a substantial portion of the English population—and perhaps one-third of the nobility—remained devoted to Roman Catholicism. In northern counties such as Yorkshire, Durham, and Lancashire, Catholic influence was entrenched under the protection of ancient feudal families like the Percys (Earls of Northumberland) and the Nevilles (Earls of Westmorland). These magnates maintained private domestic chaplains who celebrated Latin masses in manor house attics, shielded secret priests, and quietly boycotted the local parish church.`,
          `During the early 1560s, Elizabeth pursued a calculated policy of strategic leniency. She instructed county magistrates and JPs not to enforce recusancy fines with excessive severity, famously remarking that she had "no desire to make windows into men's souls." Elizabeth understood that pushing conservative Catholics into a corner would spark a peasant uprising. Moderate Catholics attended Church of England services to avoid fines and show outward loyalty, while privately practicing traditional devotions at home—a group historians describe as 'church papists'.`,
          `However, this delicate balance collapsed in the late 1560s. In 1566, Pope Pius V issued an official instruction forbidding English Catholics from attending Church of England services under pain of mortal sin. Simultaneously, the Catholic northern nobility grew intensely alienated: Elizabeth systematically bypassed ancient Catholic peers in favor of Protestant 'new men' like Cecil, while Protestant bishops aggressively cracked down on traditional northern customs. In November 1569, this resentment exploded into the armed <strong>Revolt of the Northern Earls</strong>, proving that domestic Catholicism could easily mobilize into armed rebellion against the Crown.`,
        ],
      },
      sec3: {
        num: 3,
        title: 'The European Counter-Reformation & Seminary Infiltration',
        paras: [
          `The domestic Catholic threat was dramatically amplified by international developments. Across Western Europe, the Catholic Church launched the <strong>Counter-Reformation</strong>—a militant, highly coordinated campaign to stamp out Protestant heresy and reclaim lost territories for Rome. Spearheaded by the <strong>Council of Trent (1545–1563)</strong>, the Catholic hierarchy reformed Church abuses, standardized Latin theology, and established aggressive missionary orders like the Society of Jesus (Jesuits) to lead the spiritual reconquest.`,
          `A central weapon in this campaign was the training of English Catholic priests in continental Europe. In 1568, an exiled English Catholic scholar, <strong>Cardinal William Allen</strong>, founded a specialized seminary college at Douai in the Spanish Netherlands. The college was established to train English Catholic youths in missionary theology and ordain them as seminary priests. From 1574 onwards, these priests were smuggled into England disguised as merchants, soldiers, and tutors. Sheltered in Catholic manor houses in specialized 'priest holes' built by Nicholas Owen, they traveled from village to village celebrating secret Latin masses, hearing confessions, and stiffening Catholic resistance.`,
          `For the Elizabethan regime, the seminary priests were not mere religious ministers; they were viewed as hostile enemy agents sent by foreign Catholic superpowers. The Spanish Netherlands, lying directly across the English Channel, was garrisoned by 50,000 veteran Spanish troops under the brutal Duke of Alba, who was crushing the Dutch Protestant revolt. English ministers feared that seminary priests were preparing a domestic Catholic fifth column to assist a Spanish invasion fleet, transforming religious faith into a vital front of European geopolitics.`,
        ],
      },
      sec4: {
        num: 4,
        title: 'The 1570 Papal Bull: Regnans in Excelsis & The Treason Threshold',
        paras: [
          `The ultimate turning point in Elizabethan religious history occurred on 25 February 1570, when Pope Pius V issued the fateful Papal Bull <strong>*Regnans in Excelsis*</strong>. This decree was an act of extraordinary spiritual aggression. The Pope officially excommunicated Elizabeth, castigating her as "the pretended Queen of England and the servant of crime." The bull declared Elizabeth a heretic, stripped her of her royal title, and released all English subjects from their oaths of fealty and obedience. Most dangerously, the Pope commanded English Catholics to disobey the Queen’s laws under threat of excommunication.`,
          `*Regnans in Excelsis* placed English Catholics in an impossible, tragic dilemma. Before 1570, a Catholic could remain a loyal subject of Queen Elizabeth while privately practicing their faith. After 1570, the Pope insisted that total loyalty to Rome required active disobedience to the Crown. Conversely, the Elizabethan government could no longer view recusancy as harmless personal eccentricity: anyone who acknowledged the Pope's authority was now, by definition, affirming that Elizabeth was not the lawful queen and that her deposition was a religious duty.`,
          `Parliament responded decisively to the Papal Bull with the <strong>Treasons Act (1571)</strong>. This harsh statute made it high treason, punishable by hanging, drawing, and quartering, to declare that Elizabeth was not the lawful queen, to possess or publish papal bulls, or to convert anyone to the Roman Catholic faith. Anyone leaving England for more than six months without royal permission had their lands confiscated. The 1570 bull permanently shattered Elizabeth’s policy of calculated leniency, forging an unbreakable link between English Protestantism and patriotic national survival.`,
        ],
      },
    },

    // Lesson 4: KT 1.4 (The Problem of Mary, Queen of Scots)
    {
      num: 4,
      code: 'KT 1.4',
      title: 'The Problem of Mary, Queen of Scots, 1568–69',
      enquiry:
        'Why did the dramatic arrival of Mary Stuart in England in 1568 create an insoluble dynastic and security crisis for Elizabeth I?',
      specRef: '1HI0/B4 &bull; Key Topic 1.4',
      sec1: {
        num: 1,
        title: 'Mary Stuart’s Dynastic Pedigree & The Scottish Crisis (1560–1568)',
        paras: [
          `In May 1568, Elizabeth faced the most dangerous crisis of her early reign: the sudden arrival on English soil of her first cousin once removed, <strong>Mary Stuart, Queen of Scots</strong>. Born in 1542, Mary was the granddaughter of Margaret Tudor, Henry VIII’s elder sister. To Catholics throughout Europe who rejected Henry’s marriage to Anne Boleyn, Mary Stuart held a dynastically superior claim to the English crown than Elizabeth herself. Furthermore, since Elizabeth had no children and refused to name a successor, Mary was the universally acknowledged <strong>heir presumptive</strong>.`,
          `Mary’s personal life was marked by dramatic romance and political catastrophe. Following the death of her French husband, King Francis II, in 1560, Mary returned to Scotland in 1561 to rule a turbulent, divided kingdom dominated by Protestant Scottish lords (the Lords of the Congregation). In 1565, Mary married her English cousin, <strong>Henry Stuart, Lord Darnley</strong>, uniting two powerful claims to the English throne and producing a son, James, in 1566. However, the marriage was disastrous. Darnley was arrogant, violent, and jealous: in March 1566, he led a gang of Scottish nobles who burst into Mary’s private chambers at Holyrood Palace and murdered her Italian secretary, David Rizzio, stabbing him fifty-six times in front of the pregnant Queen.`,
          `Eleven months later, in February 1567, Darnley was murdered in a house at <strong>Kirk o’Field</strong> in Edinburgh. The building was blown apart by gunpowder, but Darnley’s body was found strangled in the garden. Scandal turned to outrage when, just three months later, Mary married the chief suspect in Darnley’s murder, the ambitious Protestant <strong>James Hepburn, Earl of Bothwell</strong>. Convinced of Mary’s complicity, the Scottish Protestant nobility rose in armed rebellion. Mary was imprisoned in the island fortress of <strong>Lochleven Castle</strong> and forced to abdicate her throne on 24 July 1567 in favour of her one-year-old son, who became King James VI.`,
        ],
      },
      sec2: {
        num: 2,
        title: 'The Escape, Langside & The Workington Landing (1568)',
        paras: [
          `Mary was not prepared to languish in captivity. In May 1568, with the aid of loyal supporters, she staged a daring midnight escape from Lochleven Castle. Rallying a 6,000-strong royal army, Mary marched to confront the Scottish Regent, her Protestant half-brother, the Earl of Murray. On 13 May 1568, the two armies clashed at the <strong>Battle of Langside</strong> near Glasgow. Mary’s forces were routed in less than an hour, leaving her cause in Scotland completely shattered.`,
          `Fearing recapture and execution, Mary fled south on horseback across wild Scottish moors for three days without rest. Disguised as a common countrywoman, she reached the Solway Firth and made the fateful decision to cross the border into England. On 16 May 1568, in an open fishing boat, Mary landed at <strong>Workington in Cumberland</strong>, penniless and lacking even a change of clothes. She immediately dispatched a passionate letter to Elizabeth, appealing for sisterly protection, royal sanctuary, and an English army to restore her to her Scottish throne.`,
          `Mary’s arrival struck Whitehall like an earthquake. Sir William Cecil recognized immediately that Mary’s physical presence on English soil was an unmitigated disaster for national security. The Queen of Scots was beautiful, charismatic, devoutly Catholic, and possessed an unquestioned royal bloodline. In England, she was an anointed monarch who commanded the immediate sympathy of the Catholic northern gentry. Far from being a helpless refugee, Mary Stuart was a living, breathing replacement for Elizabeth Tudor.`,
        ],
      },
      sec3: {
        num: 3,
        title: 'The Conference of York & The Casket Letters (1568–1569)',
        paras: [
          `Elizabeth found herself trapped in an acute constitutional impasse. She could not return Mary to Scotland with an army, as that would overthrow the friendly Protestant Scottish regents who secured England's northern border. Nor could she send Mary to France, where Catholic armies would use her to launch an invasion across the Channel. Yet setting Mary free in England was equally impossible, as she would tour Catholic estates and rally rebels to seize the English crown. To resolve the crisis, Elizabeth convened a special judicial commission at the <strong>Conference of York (October 1568 – January 1569)</strong>, ostensibly to investigate the Scottish lords' charges against their queen.`,
          `The Scottish Regent Murray arrived at York determined to justify Mary’s forced deposition. He produced the infamous <strong>Casket Letters</strong>—a silver box containing eight letters and love sonnets in French, allegedly written by Mary to Bothwell, which proved she had lured Darnley to Kirk o’Field to be murdered. Mary vehemently denied writing the letters, claiming they were forgeries produced by Murray’s faction. Crucially, Mary refused to enter a formal plea or attend the hearings, arguing that as an anointed sovereign queen, she answered only to God and could not be put on trial by subjects or foreign judges.`,
          `Elizabeth utilized the Conference of York as a masterclass in diplomatic ambiguity. She had no desire to prove Mary guilty of regicide, as declaring that subjects could lawfully depose an anointed monarch would establish a terrifying precedent that could be turned against Elizabeth herself. However, declaring Mary innocent would force Elizabeth to restore her to Scotland. Consequently, Elizabeth delivered a classic verdict of <strong>'not proven'</strong>: she announced that there was insufficient evidence to prove Mary’s guilt, but also insufficient evidence to clear her name. This cynical compromise allowed Elizabeth to refuse Mary an audience at court and justify holding her in English captivity indefinitely.`,
        ],
      },
      sec4: {
        num: 4,
        title: 'The Imprisonment of an Anointed Queen & The Gathering Storm',
        paras: [
          `Following the Conference of York, Mary was transferred into honourable custody under the custody of George Talbot, 6th Earl of Shrewsbury. For the next nineteen years, Mary was moved between remote, damp midland fortresses—including Tutbury Castle, Sheffield Castle, and Wingfield Manor. She was treated as a royal guest: allowed a retinue of thirty Catholic servants, fine French food, horses for exercise, and embroidery materials. Yet behind the gilded bars, she was a closely guarded state prisoner.`,
          `Captivity failed to neutralize the threat; instead, it concentrated it. Mary Stuart became a permanent living magnet for Catholic conspiracy. English Catholic nobles, humiliated by Cecil’s Protestant ascendancy and resentful of the religious settlement, began to look to Mary as their deliverer. Furthermore, foreign ambassadors—most notably Roberto Ridolfi (the Papal agent) and Don Guerau de Spes (the Spanish ambassador)—routinely smuggled secret correspondence to Mary, plotting to marry her to England’s premier Catholic nobleman, Thomas Howard, 4th Duke of Norfolk.`,
          `By the autumn of 1569, Mary’s presence catalyzed the very catastrophe Elizabeth had sought to avoid. In November 1569, the Earls of Northumberland and Westmorland raised the banner of Catholic rebellion, marching five thousand armed men into Durham Cathedral to restore the Latin mass before advancing south to liberate Mary from Tutbury Castle. Although royal forces crushed the revolt, the template was set: for the remainder of her life, Mary Stuart remained the focal point of continuous domestic conspiracies, Spanish invasion plans, and papal assassination plots that pushed Elizabethan England inexorably toward war.`,
        ],
      },
    },
  ];

  // Template HTML Assembly
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Early Elizabethan England (1558–1588) — Key Topic 1 Master Textbook</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Inter:wght@400;500;600;700;800;900&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    *, *:before, *:after { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      background: #e2e8f0;
      font-family: 'Newsreader', Georgia, serif;
      font-size: 9.25pt;
      line-height: 1.44;
      color: #1e293b;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .textbook-page {
      width: 210mm;
      height: 297mm;
      box-sizing: border-box;
      padding: 10mm 12mm 8mm 12mm;
      background: #ffffff;
      margin: 0 auto 10mm auto;
      page-break-after: always;
      break-after: always;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
    }
    @media print {
      body { background: #ffffff; }
      .textbook-page { margin: 0; }
    }
    .page-inner {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }

    /* Lesson Header */
    .lesson-header {
      border-bottom: 2px solid #1e3a8a;
      padding-bottom: 3px;
      margin-bottom: 5px;
      flex-shrink: 0;
    }
    .lesson-badge-strip {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 2px;
      font-family: 'Inter', sans-serif;
    }
    .topic-badge {
      background: #1e3a8a;
      color: #ffffff;
      font-size: 6.6pt;
      font-weight: 800;
      padding: 1.5px 5px;
      border-radius: 2px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .spec-ref-badge {
      font-size: 6.6pt;
      font-weight: 700;
      color: #b45309;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .lesson-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 12.2pt;
      font-weight: 800;
      color: #0f172a;
      margin: 1px 0 1px 0;
      line-height: 1.15;
    }
    .lesson-spec-anchor {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      color: #334155;
      line-height: 1.25;
      background: #f8fafc;
      border-left: 3px solid #1e3a8a;
      padding: 1.5px 5px;
      border-radius: 0 2px 2px 0;
    }

    /* Right Page Header */
    .right-page-header {
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 3px;
      margin-bottom: 5px;
      flex-shrink: 0;
    }
    .rph-meta {
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 6.5pt;
      font-weight: 800;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1px;
    }
    .rph-tag { color: #1e3a8a; }
    .rph-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 10.8pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
    }

    /* 2-Column Prose */
    .two-column-prose {
      column-count: 2;
      column-gap: 16px;
      column-rule: 1px solid #e2e8f0;
      text-align: justify;
      flex: 1;
      overflow: hidden;
      margin-bottom: 4px;
    }

    .section-banner {
      display: flex;
      align-items: center;
      gap: 5px;
      background: #0f172a;
      color: #ffffff;
      padding: 2.5px 6px;
      margin: 0 0 4px 0;
      font-family: 'Inter', sans-serif;
      break-inside: avoid;
    }
    .sb-num {
      background: #b45309;
      color: #ffffff;
      font-size: 6.2pt;
      font-weight: 900;
      padding: 0.5px 4px;
      border-radius: 2px;
      letter-spacing: 0.04em;
    }
    .sb-title {
      font-size: 6.8pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .narrative-p {
      margin: 0 0 5px 0;
      text-indent: 9px;
      font-size: 8.95pt;
      line-height: 1.36;
      color: #1e293b;
    }
    .narrative-p:first-of-type {
      text-indent: 0;
    }
    .para-ref {
      font-family: 'Inter', sans-serif;
      font-size: 6.2pt;
      font-weight: 800;
      color: #1e3a8a;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      padding: 0.5px 3px;
      border-radius: 2px;
      margin-right: 4px;
      display: inline-block;
      text-indent: 0;
      vertical-align: baseline;
    }

    /* Archival Source Box */
    .archival-source-box {
      background: #fafaf9;
      border: 1.2px solid #d6d3d1;
      border-top: 2.5px solid #44403c;
      padding: 4px 6px;
      margin: 4px 0 6px 0;
      break-inside: avoid;
      font-family: 'Inter', sans-serif;
    }
    .archival-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
      border-bottom: 1px solid #e7e5e4;
      padding-bottom: 1px;
    }
    .source-identity { display: flex; gap: 4px; align-items: center; }
    .source-badge {
      background: #0f172a;
      color: #fff;
      font-size: 5.4pt;
      font-weight: 800;
      padding: 1px 3.5px;
      border-radius: 2px;
      text-transform: uppercase;
    }
    .source-type {
      font-size: 5.4pt;
      font-weight: 700;
      color: #78350f;
      text-transform: uppercase;
    }
    .source-date-micro {
      font-size: 5.4pt;
      color: #78716c;
      font-weight: 700;
    }
    .archival-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 7.8pt;
      font-weight: 800;
      color: #1c1917;
      margin: 1px 0;
    }
    .archival-image {
      width: 100%;
      height: 72px;
      object-fit: contain;
      background: #ffffff;
      border: 1px solid #e7e5e4;
      margin: 2px 0;
      display: block;
    }
    .archival-context-box {
      font-size: 6.6pt;
      line-height: 1.26;
      color: #292524;
      background: #f5f5f4;
      padding: 3px 5px;
      border-left: 2px solid #78350f;
      margin-top: 2px;
    }
    .archival-context-text { margin: 0 0 2px 0; }
    .archival-hinge-q {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 7.2pt;
      color: #991b1b;
      font-style: italic;
      border-top: 1px dashed #d6d3d1;
      padding-top: 2px;
      margin-top: 2px;
    }

    /* Key Figure Box */
    .key-figure-box {
      background: #f8fafc;
      border: 1.2px solid #cbd5e1;
      border-top: 2.5px solid #1e3a8a;
      padding: 4px 6px;
      margin: 4px 0 6px 0;
      break-inside: avoid;
      font-family: 'Inter', sans-serif;
    }
    .kf-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 1px;
    }
    .kf-tag {
      font-size: 5.4pt;
      font-weight: 900;
      color: #1e3a8a;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .kf-lifespan {
      font-size: 5.4pt;
      font-weight: 700;
      color: #64748b;
    }
    .kf-identity-row {
      display: flex;
      gap: 6px;
      align-items: center;
      margin-bottom: 2px;
    }
    .kf-portrait {
      width: 42px;
      height: 48px;
      object-fit: cover;
      border-radius: 2px;
      border: 1px solid #cbd5e1;
      flex-shrink: 0;
    }
    .kf-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.8pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.1;
    }
    .kf-role {
      font-size: 6.0pt;
      font-weight: 700;
      color: #b45309;
      line-height: 1.15;
    }
    .kf-significance {
      font-size: 6.6pt;
      line-height: 1.26;
      color: #334155;
      margin-bottom: 2px;
    }
    .kf-actions-title {
      font-size: 5.5pt;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      margin-bottom: 1px;
    }
    .kf-actions-list {
      margin: 0;
      padding-left: 11px;
      font-size: 6.2pt;
      line-height: 1.25;
      color: #334155;
    }
    .kf-actions-list li { margin-bottom: 1px; }

    /* Concept Spotlight */
    .concept-spotlight-box {
      background: #fffbeb;
      border: 1.2px solid #fde68a;
      border-left: 3.5px solid #d97706;
      padding: 4px 6px;
      margin: 4px 0 6px 0;
      break-inside: avoid;
      font-family: 'Inter', sans-serif;
    }
    .csb-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1px;
    }
    .csb-tag {
      font-size: 5.4pt;
      font-weight: 800;
      color: #92400e;
      text-transform: uppercase;
    }
    .csb-category {
      font-size: 5.4pt;
      font-weight: 700;
      color: #b45309;
      background: #ffedd5;
      padding: 1px 3.5px;
      border-radius: 2px;
    }
    .csb-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.4pt;
      font-weight: 800;
      color: #7c2d12;
      margin: 1px 0 1px 0;
      line-height: 1.12;
    }
    .csb-body {
      font-size: 6.8pt;
      line-height: 1.26;
      color: #1e293b;
      margin-bottom: 2px;
    }
    .csb-takeaway {
      font-size: 6.0pt;
      font-weight: 600;
      color: #78350f;
      background: #fef3c7;
      border-left: 2px solid #d97706;
      padding: 1.5px 4.5px;
      border-radius: 0 2px 2px 0;
    }

    /* Bottom Decks */
    .bottom-vocab-box, .bottom-enquiry-box {
      width: 100%;
      box-sizing: border-box;
      flex-shrink: 0;
      margin-top: auto;
      margin-bottom: 1px;
      padding: 4.5px 7px;
      border-radius: 3px;
      font-family: 'Inter', sans-serif;
    }
    .bottom-vocab-box {
      background: #fdfaf6;
      border: 1.2px solid #fed7aa;
      border-top: 2.5px solid #b45309;
    }
    .bvb-header, .beb-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 1px;
    }
    .bvb-title {
      font-size: 6.2pt;
      font-weight: 900;
      color: #92400e;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .bvb-badge, .beb-badge {
      font-size: 5.2pt;
      font-weight: 800;
      background: #0f172a;
      color: #fff;
      padding: 1px 3.5px;
      border-radius: 2px;
      text-transform: uppercase;
    }
    .bvb-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 6px;
      font-size: 6.2pt;
      line-height: 1.25;
      color: #334155;
    }
    .bvb-col strong, .beb-col strong {
      display: block;
      color: #0f172a;
      margin-bottom: 1px;
      text-transform: uppercase;
      font-size: 5.6pt;
    }
    .bottom-enquiry-box {
      background: #f8fafc;
      border: 1.2px solid #cbd5e1;
      border-top: 2.5px solid #1e3a8a;
    }
    .beb-title {
      font-size: 6.2pt;
      font-weight: 900;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .beb-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 6px;
      font-size: 6.2pt;
      line-height: 1.24;
      color: #334155;
    }

    /* Page Footer */
    .page-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 2px;
      margin-top: 3px;
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 6.2pt;
      color: #64748b;
      font-weight: 600;
      flex-shrink: 0;
    }

    /* Front Cover Styles */
    .cover-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 2px solid #0f172a;
      padding: 12px 16px 10px 16px;
      box-sizing: border-box;
      background: #ffffff;
      font-family: 'Inter', sans-serif;
    }
    .cover-top-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 6px;
    }
    .cover-series-pill {
      background: #0f172a;
      color: #ffffff;
      font-size: 6.8pt;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 2px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .cover-spec-code {
      font-size: 7.0pt;
      font-weight: 800;
      color: #b45309;
      letter-spacing: 0.05em;
    }
    .cover-title-group {
      text-align: center;
      margin-bottom: 6px;
    }
    .cover-main-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 20pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.1;
      margin: 0 0 2px 0;
      letter-spacing: -0.02em;
    }
    .cover-sub-title {
      font-size: 9.2pt;
      font-weight: 700;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 0;
    }
    .cover-plate-wrap {
      width: 100%;
      height: 125px;
      border: 1px solid #cbd5e1;
      background: #0f172a;
      margin-bottom: 6px;
      overflow: hidden;
      position: relative;
    }
    .cover-plate-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 25%;
    }
    .cover-plate-caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(15, 23, 42, 0.85);
      color: #ffffff;
      font-size: 6.0pt;
      padding: 2px 8px;
      font-family: 'Inter', sans-serif;
    }
    .cover-enquiry-box {
      background: #f8fafc;
      border: 1.5px solid #1e3a8a;
      border-left: 4px solid #1e3a8a;
      padding: 5px 8px;
      margin-bottom: 6px;
      text-align: left;
    }
    .ceb-label {
      font-size: 6.5pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .ceb-text {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 9.4pt;
      font-style: italic;
      color: #0f172a;
      margin-top: 1px;
      line-height: 1.3;
    }
    .cover-matrix-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 6.5pt;
      margin-top: 2px;
    }
    .cover-matrix-table th {
      background: #0f172a;
      color: #ffffff;
      padding: 4px 6px;
      text-align: left;
      font-weight: 800;
      font-size: 6.2pt;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .cover-matrix-table td {
      border-bottom: 1px solid #e2e8f0;
      padding: 4.5px 6px;
      color: #334155;
      line-height: 1.25;
    }
    .cover-matrix-table tr:nth-child(even) td { background: #f8fafc; }
    .cover-footer {
      border-top: 1.5px solid #0f172a;
      padding-top: 3px;
      display: flex;
      justify-content: space-between;
      font-size: 6.4pt;
      color: #475569;
      font-weight: 700;
    }

    /* Master Back Cover Architecture */
    .back-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 2px solid #0f172a;
      padding: 12px 16px 10px 16px;
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
    }
    .back-section-title {
      font-size: 7.6pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 2px;
      margin: 0 0 3px 0;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .back-timeline-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5px;
      font-size: 6.6pt;
      line-height: 1.3;
    }
    .bt-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #1e3a8a;
      padding: 5px 6px;
      border-radius: 0 2px 2px 0;
    }
    .bt-card strong { color: #1e3a8a; font-weight: 800; }
    .back-vocab-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
      font-size: 6.4pt;
      line-height: 1.25;
    }
    .bvg-col {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-top: 2.5px solid #0f172a;
      padding: 5px 6px;
      border-radius: 2px;
      color: #334155;
    }
    .bvg-col strong {
      display: block;
      color: #0f172a;
      text-transform: uppercase;
      font-size: 6.2pt;
      font-weight: 800;
      margin-bottom: 2px;
    }
    .back-qr-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      margin-top: 2px;
    }
    .bqr-card {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 3px;
      padding: 7px 5px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .bqr-num {
      font-size: 6.2pt;
      font-weight: 900;
      color: #1e3a8a;
      display: block;
      margin-bottom: 1px;
    }
    .bqr-title {
      font-size: 5.6pt;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.15;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 3px;
    }
    .bqr-code-box {
      width: 48px;
      height: 48px;
      margin: 0 auto 3px auto;
    }
    .bqr-footer {
      font-size: 5.0pt;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: MASTER FRONT COVER -->
  <div class="textbook-page" data-page="1">
    <div class="cover-container">
      <div class="cover-top-meta">
        <span class="cover-series-pill">GCSE (9–1) HISTORY MASTER TEXTBOOK SERIES</span>
        <span class="cover-spec-code">EDEXCEL PAPER 2 &bull; OPTION B4 (1HI0/B4)</span>
      </div>

      <div class="cover-title-group">
        <h1 class="cover-main-title">Early Elizabethan England, 1558–1588</h1>
        <div class="cover-sub-title">Key Topic 1: Queen, Government &amp; Religion, 1558–1569</div>
      </div>

      <div class="cover-plate-wrap">
        <img class="cover-plate-img" src="${coverImgData}" alt="Coronation Portrait">
        <div class="cover-plate-caption">${coverConfig.caption}</div>
      </div>

      <div class="cover-enquiry-box">
        <div class="ceb-label">Overarching Enquiry Question</div>
        <div class="ceb-text">"${coverConfig.enquiry}"</div>
      </div>

      <table class="cover-matrix-table">
        <thead>
          <tr>
            <th style="width: 25%;">Enquiry Unit</th>
            <th style="width: 45%;">Core Specification Themes</th>
            <th style="width: 30%;">Exam Skill Focus</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>KT 1.1: Accession (1558)</strong></td>
            <td>Social structure (Great Chain of Being), Court, Privy Council, gender prejudice, £300,000 Crown debt, and French threat.</td>
            <td>Q1 Features &bull; Q2 Causation</td>
          </tr>
          <tr>
            <td><strong>KT 1.2: Settlement (1559)</strong></td>
            <td>The 'Middle Way': Act of Supremacy (Supreme Governor), Act of Uniformity, Prayer Book, visitations, and Church courts.</td>
            <td>Q2 Causation (Why Middle Way?)</td>
          </tr>
          <tr>
            <td><strong>KT 1.3: Challenges</strong></td>
            <td>Crucifix &amp; Vestment controversies, recusancy, Douai seminaries, and the 1570 Papal Bull (*Regnans in Excelsis*).</td>
            <td>Q2 Explain Why &bull; Q3 Essay</td>
          </tr>
          <tr>
            <td><strong>KT 1.4: Mary Stuart</strong></td>
            <td>Mary, Queen of Scots' claim, Scottish crisis, Workington landing, Casket Letters at York, and English captivity.</td>
            <td>Q1 Features &bull; Q3 Evaluative Essay</td>
          </tr>
        </tbody>
      </table>

      <div class="cover-footer">
        <span>The History Department &bull; GCSE History Revision Hub</span>
        <span>Key Topic 1 &bull; 12-Page Complete Master Volume</span>
      </div>
    </div>
  </div>
`;

  // Pages 2 to 9: 4 Enquiries across 8 Pages (2 Pages each: Left Verso + Right Recto)
  lessons.forEach((l, idx) => {
    const leftPageNum = (idx + 1) * 2;
    const rightPageNum = (idx + 1) * 2 + 1;
    const leftSourcesData = leftSources[`p${leftPageNum}`] || {};
    const leftVocabData = leftVocab[`p${leftPageNum}`] || [];
    const bank = componentBank[`p${rightPageNum}`] || {};

    // LEFT PAGE (Verso)
    html += `
  <!-- PAGE ${leftPageNum}: ${l.code} Left Page (Verso) -->
  <div class="textbook-page" data-page="${leftPageNum}">
    <div class="page-inner">
      <div class="lesson-header">
        <div class="lesson-badge-strip">
          <span class="topic-badge">PEARSON EDEXCEL GCSE (9–1) &bull; PAPER 2 (1HI0/B4)</span>
          <span class="spec-ref-badge">${l.specRef}</span>
        </div>
        <h2 class="lesson-title">${l.title}</h2>
        <div class="lesson-spec-anchor">
          <strong>Key Enquiry:</strong> ${l.enquiry} &bull; <em>Sections 1 &amp; 2: Context, Governance &amp; Archival Evidence</em>
        </div>
      </div>

      <div class="two-column-prose">
        <div class="section-banner">
          <span class="sb-num">SECTION 1</span>
          <span class="sb-title">${l.sec1.title}</span>
        </div>
        ${l.sec1.paras.map((p, pIdx) => `<p class="narrative-p"><span class="para-ref">[1.${pIdx + 1}]</span>${p}</p>`).join('')}

        ${renderArchivalSourceBox(leftSourcesData.sourceA)}

        <div class="section-banner">
          <span class="sb-num">SECTION 2</span>
          <span class="sb-title">${l.sec2.title}</span>
        </div>
        ${l.sec2.paras.map((p, pIdx) => `<p class="narrative-p"><span class="para-ref">[2.${pIdx + 1}]</span>${p}</p>`).join('')}

        ${renderArchivalSourceBox(leftSourcesData.sourceB)}
      </div>

      <div class="bottom-vocab-box">
        <div class="bvb-header">
          <span class="bvb-title">CORE DISCIPLINARY TERMINOLOGY &bull; ${l.code}</span>
          <span class="bvb-badge">EDEXCEL PAPER 2 VOCABULARY</span>
        </div>
        <div class="bvb-grid">
          ${leftVocabData
            .map(
              (v) => `
            <div class="bvb-col">
              <strong>${v.term}</strong>
              ${v.def}
            </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <div class="page-footer">
        <span>Early Elizabethan England, 1558–1588 &bull; Key Topic 1: Queen, Government &amp; Religion</span>
        <span>Page ${leftPageNum}</span>
      </div>
    </div>
  </div>

  <!-- PAGE ${rightPageNum}: ${l.code} Right Page (Recto) -->
  <div class="textbook-page" data-page="${rightPageNum}">
    <div class="page-inner">
      <div class="right-page-header">
        <div class="rph-meta">
          <span class="rph-tag">PRIMARY ARCHIVE &amp; HISTORICAL VERDICT &bull; EDEXCEL PAPER 2</span>
          <span class="rph-lesson">${l.code}: SECTIONS 3 &amp; 4</span>
        </div>
        <h3 class="rph-title">${l.title}</h3>
      </div>

      <div class="two-column-prose">
        <div class="section-banner">
          <span class="sb-num">SECTION 3</span>
          <span class="sb-title">${l.sec3.title}</span>
        </div>
        ${l.sec3.paras.map((p, pIdx) => `<p class="narrative-p"><span class="para-ref">[3.${pIdx + 1}]</span>${p}</p>`).join('')}

        ${
          bank.keyFigure
            ? `
        <div class="key-figure-box">
          <div class="kf-header">
            <span class="kf-tag">KEY HISTORICAL INDIVIDUAL</span>
            <span class="kf-lifespan">${bank.keyFigure.lifespan}</span>
          </div>
          <div class="kf-identity-row">
            ${bank.keyFigure.image ? `<img class="kf-portrait" src="${bank.keyFigure.image}" alt="${bank.keyFigure.name}">` : ''}
            <div>
              <div class="kf-name">${bank.keyFigure.name}</div>
              <div class="kf-role">${bank.keyFigure.role}</div>
            </div>
          </div>
          <div class="kf-significance">${bank.keyFigure.significance}</div>
          <div class="kf-actions-title">DECISIVE ACTIONS:</div>
          <ul class="kf-actions-list">
            ${bank.keyFigure.actions.map((a) => `<li>${a}</li>`).join('')}
          </ul>
        </div>`
            : ''
        }

        <div class="section-banner">
          <span class="sb-num">SECTION 4</span>
          <span class="sb-title">${l.sec4.title}</span>
        </div>
        ${l.sec4.paras.map((p, pIdx) => `<p class="narrative-p"><span class="para-ref">[4.${pIdx + 1}]</span>${p}</p>`).join('')}

        ${bank.conceptSpotlight || ''}
      </div>

      ${
        bank.bottomEnquiry
          ? `
      <div class="bottom-enquiry-box">
        <div class="beb-header">
          <span class="beb-title">HISTORICAL ENQUIRY &amp; DISCIPLINARY ASSESSMENT</span>
          <span class="beb-badge">${l.code} SYNTHESIS</span>
        </div>
        <div class="beb-grid">
          <div class="beb-col">
            <strong>1. Knowledge Recall:</strong>
            ${bank.bottomEnquiry.q1}
          </div>
          <div class="beb-col">
            <strong>2. Causal Analysis:</strong>
            ${bank.bottomEnquiry.q2}
          </div>
          <div class="beb-col">
            <strong>3. Historical Evaluation:</strong>
            ${bank.bottomEnquiry.q3}
          </div>
        </div>
      </div>`
          : ''
      }

      <div class="page-footer">
        <span>Early Elizabethan England, 1558–1588 &bull; Key Topic 1: Queen, Government &amp; Religion</span>
        <span>Page ${rightPageNum}</span>
      </div>
    </div>
  </div>
`;
  });

  // PAGE 10: SYNOPTIC MATRIX & MASTER CHRONOLOGY
  html += `
  <!-- PAGE 10: SYNOPTIC MATRIX & CHRONOLOGY -->
  <div class="textbook-page" data-page="10">
    <div class="page-inner">
      <div class="lesson-header">
        <div class="lesson-badge-strip">
          <span class="topic-badge">SYNOPTIC OVERVIEW</span>
          <span class="spec-ref-badge">KEY TOPIC 1 MASTER SYNTHESIS (1558–1569)</span>
        </div>
        <h2 class="lesson-title">Key Topic 1 Synoptic Matrix &amp; Causal Chronology</h2>
        <div class="lesson-spec-anchor">
          <strong>Thematic Synthesis:</strong> Analysing how Elizabeth consolidated royal authority across government, religious settlement, and dynastic security.
        </div>
      </div>

      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 8px;">
        <!-- Comparative Causal Matrix -->
        <table class="cover-matrix-table" style="font-size: 6.8pt;">
          <thead>
            <tr>
              <th style="width: 22%;">Core Crisis Dimension</th>
              <th style="width: 26%;">The Crisis in 1558</th>
              <th style="width: 28%;">Elizabeth's Strategic Response</th>
              <th style="width: 24%;">The Reality by 1569</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Royal Legitimacy &amp; Gender</strong></td>
              <td>Viewed as illegitimate by Catholic Europe; 16th-century prejudice against female 'Queen Regnant'.</td>
              <td>Adopted title 'Supreme Governor'; preserved sovereign independence by remaining unmarried; created cult of Virgin Queen.</td>
              <td>Firm royal authority established; marriage negotiations exploited as diplomatic leverage with Spain and France.</td>
            </tr>
            <tr>
              <td><strong>Crown Finance &amp; Economy</strong></td>
              <td>Crown was £300,000 in debt; £100,000 owed to Antwerp at 14%; debasement causing rampant inflation.</td>
              <td>Cut royal household costs by half; sold Crown lands (£120,000); reminted coinage to restore silver value.</td>
              <td>Debt reduced substantially; Crown credit restored in Antwerp; royal dependency on Parliament minimized.</td>
            </tr>
            <tr>
              <td><strong>Religious Division</strong></td>
              <td>Fractured kingdom: conservative Catholic North/West vs radical Protestant South-East and returning Marian exiles.</td>
              <td>1559 Settlement ('Middle Way'): Act of Supremacy, Act of Uniformity, ambiguous English Prayer Book, 1s recusancy fine.</td>
              <td>Broad outward conformity secured for a decade; Puritan complaints contained; Catholic resistance festering under the surface.</td>
            </tr>
            <tr>
              <td><strong>Foreign Military Threat</strong></td>
              <td>Calais lost (1558); France allied with Scotland (Auld Alliance); French garrisons stationed on northern border.</td>
              <td>Concluded Treaty of Cateau-Cambrésis (1559); supported Scottish Protestant lords in 1560 to expel French troops.</td>
              <td>French troops expelled from Scotland; northern border stabilized until Mary Stuart’s arrival in England in 1568.</td>
            </tr>
          </tbody>
        </table>

        <!-- Master Chronological Spine -->
        <div>
          <div class="back-section-title">
            <span>MASTER CHRONOLOGY: TURNING POINTS (1558–1570)</span>
            <span style="font-size: 6.2pt; color: #1e3a8a; font-weight: 700;">CAUSAL PROGRESSION</span>
          </div>
          <div class="back-timeline-grid">
            <div class="bt-card">
              <strong>17 Nov 1558: Accession of Elizabeth I</strong><br>
              Mary I dies; 25-year-old Elizabeth succeeds; appoints William Cecil Principal Secretary at Hatfield House.
            </div>
            <div class="bt-card">
              <strong>Jan–Apr 1559: The 1559 Settlement</strong><br>
              Parliament passes the Acts of Supremacy &amp; Uniformity; Royal Injunctions enforce national Protestant baseline.
            </div>
            <div class="bt-card">
              <strong>Apr 1559: Treaty of Cateau-Cambrésis</strong><br>
              Peace between France and Spain; England formally surrenders Calais, ending two centuries of English mainland rule.
            </div>
            <div class="bt-card">
              <strong>Mar 1566: Book of Advertisements</strong><br>
              Archbishop Parker enforces clerical vestments; 37 London Puritan ministers dismissed, sparking Vestment Controversy.
            </div>
            <div class="bt-card">
              <strong>16 May 1568: Mary Stuart Lands in England</strong><br>
              Mary escapes Lochleven, flees across Solway Firth in a fishing boat to Workington, Cumberland, seeking English refuge.
            </div>
            <div class="bt-card">
              <strong>Oct 1568 – Jan 1569: Conference of York</strong><br>
              Judicial inquiry into Darnley's murder and Casket Letters concludes with verdict of "not proven"; Mary held captive.
            </div>
          </div>
        </div>

        <!-- Historiographical Verdict Box -->
        <div style="background: #eff6ff; border: 1.2px solid #bfdbfe; border-left: 3.5px solid #1e3a8a; padding: 5px 8px; border-radius: 2px;">
          <div style="font-size: 6.4pt; font-weight: 900; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
            HISTORIOGRAPHICAL PERSPECTIVES &bull; THE SUCCESS OF THE ELIZABETHAN SETTLEMENT
          </div>
          <p style="font-size: 7.0pt; line-height: 1.3; color: #1e293b; margin: 0 0 3px 0;">
            <strong>Traditional View (J.E. Neale):</strong> Elizabeth was a determined moderate forced into a more radical Protestant settlement than she wished by a vocal, well-organized 'Puritan Choir' in the House of Commons. Her Middle Way was a triumphant personal masterpiece of political moderation.
          </p>
          <p style="font-size: 7.0pt; line-height: 1.3; color: #1e293b; margin: 0;">
            <strong>Revisionist View (Christopher Haigh / Norman Jones):</strong> The primary obstacle was not Puritans in the Commons, but conservative Catholic bishops and peers in the House of Lords. The 1559 settlement did not create permanent religious peace; it alienated devout Catholics and Puritans alike, postponing inevitable conflict until foreign intervention in 1570.
          </p>
        </div>
      </div>

      <div class="page-footer">
        <span>Early Elizabethan England, 1558–1588 &bull; Key Topic 1 Master Synthesis</span>
        <span>Page 10</span>
      </div>
    </div>
  </div>

  <!-- PAGE 11: EXAM MASTERCLASS & MODEL ANSWERS -->
  <div class="textbook-page" data-page="11">
    <div class="page-inner">
      <div class="lesson-header">
        <div class="lesson-badge-strip">
          <span class="topic-badge">EXAM STRATEGY MASTERCLASS</span>
          <span class="spec-ref-badge">EDEXCEL PAPER 2 OPTION B4 SPECIFICATION</span>
        </div>
        <h2 class="lesson-title">Edexcel Paper 2: Examination Strategy &amp; Model Answers</h2>
        <div class="lesson-spec-anchor">
          <strong>Examination Blueprint:</strong> Deconstructing Question 1 (Features [4m]), Question 2 (Causation [12m]), and Question 3 (Evaluative Essay [16m]).
        </div>
      </div>

      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 6px;">
        <!-- Question 1 Exemplar -->
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 3px solid #0284c7; padding: 5px 8px; border-radius: 2px;">
          <div style="display: flex; justify-content: space-between; font-size: 6.4pt; font-weight: 800; color: #0369a1; text-transform: uppercase;">
            <span>Question 1: Describe Two Features of... [4 Marks &bull; 5 Minutes]</span>
            <span>Target: 2 Distinct Points + Supporting Detail</span>
          </div>
          <div style="font-size: 6.8pt; font-weight: 700; color: #0f172a; margin: 1px 0;">
            Exam Prompt: Describe two features of the 1559 Act of Uniformity. [4 marks]
          </div>
          <div style="font-size: 6.6pt; line-height: 1.28; color: #334155;">
            <strong>Feature 1:</strong> One feature was the introduction of a compulsory English Book of Common Prayer that had to be used in all churches across England. <em>[1 mark]</em> This prayer book contained deliberately ambiguous communion wording so that both moderate Catholics and Protestants could participate without violating their conscience. <em>[1 mark]</em><br>
            <strong>Feature 2:</strong> A second feature was the imposition of financial penalties for non-attendance at church services. <em>[1 mark]</em> Anyone who refused to attend church on Sundays (known as a recusant) was subject to a mandatory fine of one shilling, which was enforced by local churchwardens. <em>[1 mark]</em>
          </div>
        </div>

        <!-- Question 2 Exemplar -->
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 3px solid #b45309; padding: 5px 8px; border-radius: 2px;">
          <div style="display: flex; justify-content: space-between; font-size: 6.4pt; font-weight: 800; color: #b45309; text-transform: uppercase;">
            <span>Question 2: Explain Why... [12 Marks &bull; 18 Minutes]</span>
            <span>Target: 3 PEEL Paragraphs + Specific Causal Links</span>
          </div>
          <div style="font-size: 6.8pt; font-weight: 700; color: #0f172a; margin: 1px 0;">
            Exam Prompt: Explain why Elizabeth I faced threats on her accession to the throne in 1558. You may use: (1) Crown debt, (2) Gender and marriage. [12 marks]
          </div>
          <div style="font-size: 6.5pt; line-height: 1.26; color: #334155;">
            <strong>PEEL Structure:</strong><br>
            &bull; <strong>Point 1 (Financial Weakness):</strong> Elizabeth inherited an impoverished realm with over £300,000 in Crown debt and annual revenues of only £286,667, with £100,000 owed to Antwerp moneylenders at 14% interest. <em>Consequence:</em> Elizabeth lacked the financial reserves to fund a standing army, leaving England defenceless without risky parliamentary taxation.<br>
            &bull; <strong>Point 2 (Gender Prejudices &amp; Marriage Trap):</strong> Sixteenth-century patriarchal tradition dictated that women were incapable of leading armies or governing. <em>Consequence:</em> Elizabeth faced intense pressure to marry; however, marrying a foreign prince risked foreign domination, while marrying an English noble would spark aristocratic civil war.<br>
            &bull; <strong>Point 3 (Geopolitical Threat &amp; Auld Alliance):</strong> The loss of Calais in 1558 humiliated England, while French garrisons in Scotland under Mary of Guise flanked England's northern border. <em>Consequence:</em> Mary, Queen of Scots held a strong Catholic claim to the English throne, creating a direct invasion threat.
          </div>
        </div>

        <!-- Question 3 Strategy Frame -->
        <div style="background: #fdfaf6; border: 1px solid #fed7aa; border-left: 3px solid #991b1b; padding: 5px 8px; border-radius: 2px;">
          <div style="display: flex; justify-content: space-between; font-size: 6.4pt; font-weight: 800; color: #991b1b; text-transform: uppercase;">
            <span>Question 3: Evaluative Essay [16 Marks + 4 SPaG &bull; 25 Minutes]</span>
            <span>Target: Balanced Criteria + Sustained Historical Judgement</span>
          </div>
          <div style="font-size: 6.8pt; font-weight: 700; color: #0f172a; margin: 1px 0;">
            Exam Prompt: "The Catholic challenge was the most serious problem facing Elizabeth between 1558 and 1569." How far do you agree?
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 6.4pt; line-height: 1.25; margin-top: 2px;">
            <div style="background: #ffffff; padding: 3px 5px; border: 1px solid #fed7aa;">
              <strong style="color: #991b1b;">Agreed (Catholic Threat Was Greatest):</strong>
              <br>&bull; Mary Stuart’s 1568 arrival provided a living, legitimate Catholic figurehead.
              <br>&bull; Northern Earls commanded feudal loyalty and launched armed rebellion in 1569.
              <br>&bull; Catholic threat carried foreign backing (France, Spain, Papacy).
            </div>
            <div style="background: #ffffff; padding: 3px 5px; border: 1px solid #fed7aa;">
              <strong style="color: #1e3a8a;">Counter-Argument (Other Problems Were Greater):</strong>
              <br>&bull; £300,000 Crown debt meant Elizabeth could not defend the realm in 1558.
              <br>&bull; Puritan challenge divided Protestant leadership (Crucifix &amp; Vestment disputes).
              <br>&bull; <strong>Sustained Judgement:</strong> Financial weakness was the root problem; it constrained her ability to combat Catholic challenges.
            </div>
          </div>
        </div>
      </div>

      <div class="page-footer">
        <span>Early Elizabethan England, 1558–1588 &bull; Edexcel Examination Strategy</span>
        <span>Page 11</span>
      </div>
    </div>
  </div>

  <!-- PAGE 12: MASTER BACK COVER -->
  <div class="textbook-page" data-page="12">
    <div class="back-container">
      <div>
        <div class="back-section-title">
          <span>KEY TOPIC 1 CORE TERMINOLOGY GLOSSARY</span>
          <span style="font-size: 6.2pt; color: #1e3a8a; font-weight: 700;">12 ESSENTIAL TERMS</span>
        </div>
        <div class="back-vocab-grid">
          <div class="bvg-col">
            <strong>Great Chain of Being</strong>
            Rigid sixteenth-century divine hierarchy placing the monarch at the head of all social ranks down to landless labourers.
          </div>
          <div class="bvg-col">
            <strong>Privy Council</strong>
            Nineteen trusted aristocratic advisers meeting weekly to govern finance, military defense, and administrative law.
          </div>
          <div class="bvg-col">
            <strong>Royal Prerogative</strong>
            Exclusive crown powers: deciding foreign policy, marriage, and declaring war without parliamentary debate.
          </div>
          <div class="bvg-col">
            <strong>Supreme Governor</strong>
            Elizabeth's title under the 1559 Act of Supremacy, pacifying Catholic consciences while asserting royal control.
          </div>
          <div class="bvg-col">
            <strong>Act of Uniformity</strong>
            1559 statute enforcing the English Book of Common Prayer and a 1s fine on recusants who missed Sunday church.
          </div>
          <div class="bvg-col">
            <strong>Royal Injunctions</strong>
            57 administrative rules in 1559: ordering English Bibles, licensing preachers, and banning pilgrimages and shrines.
          </div>
          <div class="bvg-col">
            <strong>Episcopal Visitations</strong>
            Inspections of 9,000 parishes every 3-4 years by commissioners, removing 400 Marian priests who refused the oath.
          </div>
          <div class="bvg-col">
            <strong>Church Courts</strong>
            Ecclesiastical tribunals policing social morality, slander, marriage, wills, and enforcing church attendance.
          </div>
          <div class="bvg-col">
            <strong>Crucifix Controversy</strong>
            Puritan bishop campaign against crucifixes in churches, forcing Elizabeth to compromise in parish buildings.
          </div>
          <div class="bvg-col">
            <strong>Vestment Controversy</strong>
            1566 clash over clerical dress: Archbishop Parker's Book of Advertisements dismissed 37 London Puritan ministers.
          </div>
          <div class="bvg-col">
            <strong>Regnans in Excelsis</strong>
            1570 Papal Bull by Pope Pius V excommunicating Elizabeth, absolving subjects of loyalty and triggering treason laws.
          </div>
          <div class="bvg-col">
            <strong>Casket Letters</strong>
            Eight letters presented at the 1568 Conference of York, allegedly proving Mary Stuart's complicity in Darnley's murder.
          </div>
        </div>
      </div>

      <div>
        <div class="back-section-title">
          <span>KEY TOPIC 1 DIGITAL INTERACTIVE QUIZ &amp; FLASHCARD HUBS</span>
          <span style="font-size: 6.2pt; color: #1e3a8a; font-weight: 700;">SCAN WITH PHONE CAMERA</span>
        </div>
        <div class="back-qr-grid">
          ${backCoverData.quizzes
            .map(
              (q) => `
            <div class="bqr-card">
              <span class="bqr-num">${q.code}</span>
              <span class="bqr-title">${q.title}</span>
              <div class="bqr-code-box">
                ${generateQrSvg(q.url)}
              </div>
              <span class="bqr-footer">Interactive Hub &bull; Quiz</span>
            </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <div style="background: #f8fafc; border: 1.5px solid #0f172a; padding: 6px 10px; border-radius: 2px;">
        <div style="font-size: 6.6pt; font-weight: 900; color: #0f172a; text-transform: uppercase; margin-bottom: 2px;">
          PEARSON EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 2 PERIOD STUDY SPECIFICATION CHECKLIST
        </div>
        <div style="font-size: 6.2pt; line-height: 1.26; color: #334155; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div>
            &bull; <strong>1.1 Accession:</strong> Society, government, gender, legitimacy, marriage, Crown debts, debasement, Calais, France &amp; Scotland.<br>
            &bull; <strong>1.2 Settlement:</strong> Divisions in 1558, Acts of Supremacy &amp; Uniformity, Prayer Book, Injunctions, Church courts, visitations.
          </div>
          <div>
            &bull; <strong>1.3 Challenges:</strong> Puritan challenges (crucifix/vestments), Catholic challenge (nobility/papacy), Council of Trent, 1570 Bull.<br>
            &bull; <strong>1.4 Mary Stuart:</strong> Dynastic claim, Scottish rebellion, flight to England (1568), Casket Letters, Conference of York, captivity.
          </div>
        </div>
      </div>

      <div class="cover-footer">
        <span>The History Department &bull; GCSE History Revision Hub</span>
        <span>Key Topic 1 Master Textbook &bull; Complete 12-Page Edition</span>
      </div>
    </div>
  </div>

</body>
</html>
`;

  return html;
}

async function runKT1() {
  console.log('================================================================');
  console.log('🏛️ RENDERING EARLY ELIZABETHAN ENGLAND KEY TOPIC 1 MASTER TEXTBOOK');
  console.log('================================================================');

  const html = await buildPublisherTextbookHtmlKT1();

  const htmlOutputDir = path.join(ROOT_DIR, 'public', 'units', 'eee');
  if (!fs.existsSync(htmlOutputDir)) fs.mkdirSync(htmlOutputDir, { recursive: true });
  const htmlPath = path.join(htmlOutputDir, 'textbook_KT1_PUBLISHER.html');
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('✅ HTML compiled to:', htmlPath);

  const pdfOutputDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfOutputDir)) fs.mkdirSync(pdfOutputDir, { recursive: true });
  const pdfPublisherPath = path.join(pdfOutputDir, 'eee_textbook_KT1_PUBLISHER.pdf');
  const pdfLegacyPath = path.join(pdfOutputDir, 'eee_textbook_KT1.pdf');
  const pdfFinalV17Path = path.join(pdfOutputDir, 'eee_textbook_KT1_FINAL_V17.pdf');

  console.log('🚀 Launching Puppeteer for A4 PDF compilation & layout audit...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Page Height & Overflow Audit
  const audit = await page.evaluate(() => {
    const pages = document.querySelectorAll('.textbook-page');
    const results = [];
    pages.forEach((p, idx) => {
      const pageNum = idx + 1;
      const scrollH = p.scrollHeight;
      const clientH = p.clientHeight;
      const overflow = scrollH > clientH + 2;
      results.push({ pageNum, scrollH, clientH, overflow });
    });
    return results;
  });

  console.log('\n📊 Page Height & Overflow Audit (Target: 12 Pages, Max 297mm):');
  let hasOverflow = false;
  audit.forEach((r) => {
    const status = r.overflow
      ? `⚠️ OVERFLOW (+${r.scrollH - r.clientH}px)`
      : '✅ OPTIMAL (0px overflow)';
    console.log(
      `   Page ${r.pageNum.toString().padStart(2, ' ')}: ${r.scrollH}px / ${r.clientH}px | ${status}`,
    );
    if (r.overflow) hasOverflow = true;
  });

  if (hasOverflow) {
    console.warn(
      '\n⚠️ WARNING: Detected page overflow! Adjusting typography or image heights required.',
    );
  } else {
    console.log('\n🎉 AUDIT PASSED: Perfect 0px overflow across all 12 pages in A4!');
  }

  await page.pdf({
    path: pdfPublisherPath,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  console.log('✅ Master Publisher PDF generated:', pdfPublisherPath);

  // Sync to standard aliases so all links in web app and drive update seamlessly
  fs.copyFileSync(pdfPublisherPath, pdfLegacyPath);
  fs.copyFileSync(pdfPublisherPath, pdfFinalV17Path);
  console.log('✅ Synchronized active aliases:');
  console.log('   -', pdfLegacyPath);
  console.log('   -', pdfFinalV17Path);

  // Synchronize to Google Drive Department File if available
  const driveDest =
    'G:\\My Drive\\AAMX\\Dep File\\Year 11 (GCSE)\\Paper 2 - Early Elizabethan England\\Early Elizabethan England Master Textbook (KT1).pdf';
  if (fs.existsSync(path.dirname(driveDest))) {
    fs.copyFileSync(pdfPublisherPath, driveDest);
    console.log('✅ Synchronized directly to Google Drive Department File:');
    console.log('   -', driveDest);
  }

  await browser.close();
  console.log('🎉 Key Topic 1 Master Textbook compilation complete!\n');
}

if (require.main === module) {
  runKT1().catch((err) => {
    console.error('Fatal error during textbook compilation:', err);
    process.exit(1);
  });
}

module.exports = { runKT1 };
