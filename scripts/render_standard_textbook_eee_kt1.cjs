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
 * 3. Base64 Image Inlining: All archival photos & portraits embedded directly as Data URIs.
 * 4. Master 87mm Photographic Plate on Front Cover: Authentic Coronation Portrait of Elizabeth I (1559).
 * 5. Official 4-Column Pearson Edexcel Specification Coverage Matrix on Front Cover with 3-Stage Causal Sequences.
 * 6. Specification Accuracy: Feature questions strictly Q1(a) [2m] and Q1(b) [2m] (never "describe two features").
 * 7. Christine Counsell Disciplinary Narrative Standard: Rich dramatic storytelling with political suspense, intrigue, and human dilemmas.
 * 8. Zero Whitespace Voids: Pages 10, 11, and 12 completely redesigned to be dense, publisher-grade, and 98% space-utilized.
 * 9. Exact 12-Page Budget (Zero Orphans, Zero Blank Pages, Exactly 3 Folded A3 Sheets):
 *    - Page 1:  Master Front Cover (87mm uncropped plate, 4-column spec matrix, 4 Causal Sequence cards)
 *    - Page 2:  KT 1.1 Accession & Government (1558) - Verso (Sections 1 & 2 + Sources + Vocab)
 *    - Page 3:  KT 1.1 Accession & Government (1558) - Recto (Sections 3 & 4 + Cecil + Marriage Dilemma + Enquiry Deck)
 *    - Page 4:  KT 1.2 The Settlement of Religion (1559) - Verso (Sections 1 & 2 + Sources + Vocab)
 *    - Page 5:  KT 1.2 The Settlement of Religion (1559) - Recto (Sections 3 & 4 + Parker + Compromise Matrix + Enquiry Deck)
 *    - Page 6:  KT 1.3 Challenge to the Settlement - Verso (Sections 1 & 2 + Sources + Vocab)
 *    - Page 7:  KT 1.3 Challenge to the Settlement - Recto (Sections 3 & 4 + Pius V + Treason Threshold + Enquiry Deck)
 *    - Page 8:  KT 1.4 The Problem of Mary Stuart - Verso (Sections 1 & 2 + Sources + Vocab)
 *    - Page 9:  KT 1.4 The Problem of Mary Stuart - Recto (Sections 3 & 4 + Mary Stuart + Four Fatal Options + Enquiry Deck)
 *    - Page 10: Key Topic 1 Thematic Synoptic Matrix, Historiographical Debate & Causal Turning Points
 *    - Page 11: Edexcel Paper 2 Section B Exam Masterclass (Q1(a) [2m], Q1(b) [2m], Q2 [12m], Q3 [16m+4SPaG])
 *    - Page 12: Master Back Cover (13-Row Chronological Sequence, Terminology, AO Blueprint, Exam Timing Guide, QR Hub)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');
const { autoCalibrateTextbook } = require('./auto_calibrate_engine.cjs');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');

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

function formatText(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

async function buildPublisherTextbookHtmlKT1() {
  const { KEY_TOPICS_DATA } = require('./render_eee_twopage_workbook.cjs');
  const ktWorkbookData = KEY_TOPICS_DATA.KT1;
  const getKt1Data = require('./eee_textbook_data_kt1.cjs');
  const ktData = getKt1Data({ getBase64Image });
  const { coverConfig, componentBank, leftSources, leftVocab } = ktData;

  const quizUrl = 'https://the-history-revision-hub.netlify.app/?unit=eee&quiz=true&lesson=1';
  const qrDataUrl = await QRCode.toDataURL(quizUrl, {
    width: 140,
    margin: 1,
    color: { dark: '#0f172a', light: '#ffffff' },
  });

  const coverImgData =
    getBase64Image('images/elizabeth_coronation_robes.jpg') ||
    getBase64Image('images/elizabeth_coronation_portrait.jpg');

  // Helper for rendering Archival Source Boxes (Paper 2 authentic primary written records)
  const renderArchivalSourceBox = (src) => {
    if (!src || !src.title) return '';
    return `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">PRIMARY RECORD</span>
            <span class="source-type">${src.type}</span>
          </div>
          <span class="source-date-micro">${src.date}</span>
        </div>
        <div class="archival-title">${src.title}</div>
        ${
          src.quote
            ? `
          <div class="archival-source-quote">
            &ldquo;${src.quote}&rdquo;
          </div>
        `
            : ''
        }
        ${src.image ? `<img class="archival-image" src="${src.image}" alt="${src.title}">` : ''}
        <div class="archival-context-box">
          <p class="archival-context-text">${src.context}</p>
          <div class="archival-hinge-q"><strong>Hinge Question:</strong> <em>${src.hingeQuestion}</em></div>
        </div>
      </div>
    `;
  };

  // Enriched, authoritative Pearson-aligned narrative chapters with Christine Counsell dramatic drive
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
        title: 'Setting the Scene: The Fragile Tudor Pyramid & Governance',
        paras: [
          `In the bitter freeze of November 1558, twenty-five-year-old Elizabeth Tudor ascended the throne of an exhausted, anxious nation of three million people after surviving five perilous years under Mary I. Tudor society was strictly organized by the <strong>Great Chain of Being</strong>—an immutable cosmic hierarchy ordained by God where every soul held an assigned station and owed unquestioned obedience to their superiors. In the countryside, roughly fifty noble families and landed gentry owned the earth, ruling over yeomen, tenant husbandmen, and landless labourers. In towns, wealthy merchants formed an urban elite above skilled guildsmen and destitute apprentices. Social mobility was deeply distrusted, and any attempt to disrupt this divinely appointed social order was viewed as sinful treason against God and Crown.`,
          `Government centred upon the personal sovereignty of the monarch, who claimed to rule by <strong>Divine Right</strong>. Yet the Crown commanded neither a standing army nor a salaried police force. Power was exercised through an intricate web of <strong>royal patronage</strong>. By dispensing titles, land grants, knighthoods, and commercial monopolies, Elizabeth bound ambitious aristocrats to Crown service. Executive administration was conducted by the <strong>Privy Council</strong>—a tight circle of roughly nineteen trusted noblemen meeting multiple times weekly to direct national defense, taxation, and diplomacy. At its helm stood <strong>Sir William Cecil</strong>, appointed Principal Secretary on accession day.`,
          `Statutory legislation and extraordinary taxation required the consent of <strong>Parliament</strong>, divided between the House of Lords and House of Commons. As an occasional instrument summoned only when the monarch required emergency <strong>subsidies</strong> (taxes), Parliament gathered just nine times during Elizabeth's forty-five-year reign. In the shires, royal commands were executed by <strong>Lord Lieutenants</strong>, great nobles responsible for county militias, and unpaid <strong>Justices of the Peace (JPs)</strong>. These country gentry enforced statutory law, repaired highways, collected rates, and punished petty crime, linking Whitehall directives to rural reality.`,
        ],
      },
      sec2: {
        num: 2,
        title: 'The Virgin Queen: Legitimacy Doubts, Misogyny & The Marriage Dilemma',
        paras: [
          `Elizabeth’s accession was immediately stalked by doubts regarding her <strong>legitimacy</strong>. In the eyes of Catholic Europe, Henry VIII’s 1533 marriage to Elizabeth's mother, Anne Boleyn, followed an unlawful unilateral divorce from Catherine of Aragon without papal annulment. Catholics regarded Henry's first marriage as indissoluble, meaning Elizabeth was born of an adulterous union. Following Anne Boleyn's 1536 execution, Parliament passed the Second Succession Act declaring Elizabeth illegitimate. Though Henry reinstated her in his 1544 will, Catholics insisted parliamentary statute could never overturn divine canon law, asserting that her Catholic cousin, Mary Stuart, was the true lawful queen.`,
          `This dynastic vulnerability was intensified by deep sixteenth-century prejudice against female sovereigns. Renaissance Europe taught that women were intellectually and emotionally unsuited for rule, ordained to remain under male authority. A <strong>'Queen Regnant'</strong>—a female ruler exercising absolute command—was viewed as unnatural. Scottish Calvinist John Knox published <em>The First Blast of the Trumpet Against the Monstrous Regiment of Women</em>, while Mary I’s disastrous reign seemed to validate these fears.`,
          `Consequently, the Privy Council and Parliament placed intense pressure upon Elizabeth to marry immediately and secure the Tudor Protestant line. Yet marriage was a lethal constitutional trap. Marrying a foreign prince, such as Philip II or Archduke Charles of Austria, risked transforming England into an exploited Catholic satellite. Marrying an English nobleman—such as her favourite, Lord Robert Dudley—would trigger murderous jealousy among rival aristocratic factions, compounded in 1560 by the suspicious death of Dudley's wife, Amy Robsart. With supreme political cunning, Elizabeth declared she was <em>"married to the realm of England"</em>, weaponizing courtship diplomacy for over two decades while fiercely guarding her sovereign independence.`,
        ],
      },
      sec3: {
        num: 3,
        title: 'The Exchequer in Ruin: Debt, Debasement & Fiscal Austerity',
        paras: [
          `Beyond political intrigue, Elizabeth inherited a royal exchequer on the verge of bankruptcy. Decades of French wars waged by Henry VIII and Mary I had bled the realm dry. In November 1558, Crown debt stood at an astronomical <strong>£300,000</strong>—a crippling liability when ordinary annual revenue was barely £286,667. Crucially, over £100,000 was owed to merchant bankers on the <strong>Antwerp Exchange</strong>, who demanded extortionate interest rates of 14 per cent, leaving England vulnerable to financial blackmail.`,
          `Traditional royal revenues were severely depleted. Past Tudor monarchs had sold off vast monastic lands, permanently slashing Crown rental yields. To bridge deficits, governments had repeatedly resorted to <strong>debasement</strong>—melting down silver shillings and reminting them with cheap copper. This reckless practice shattered merchant confidence, sparked runaway inflation, and caused real wages to collapse, while the vital cloth trade to Antwerp fell into catastrophic depression.`,
          `Under William Cecil’s direction, Elizabeth instituted ruthless financial austerity. She slashed household expenditure, sold non-essential Crown lands for £120,000, collected feudal dues, and overhauled customs collections. She also recalled debased coins, restoring the silver standard. By 1574, through relentless fiscal discipline, Elizabeth achieved the impossible: she eliminated all Crown debt and accumulated a £300,000 reserve in the Tower of London. This fiscal solvency freed the Crown from dependence on parliamentary subsidies for ordinary governance, greatly strengthening Elizabeth's executive autonomy.`,
        ],
      },
      sec4: {
        num: 4,
        title: 'Foreign Geopolitical Encirclement: France, Calais & The Auld Alliance',
        paras: [
          `Beyond England's shores, Elizabeth looked out upon a continent dominated by Catholic superpowers. England was formally at war with France, dragged in by Mary I as Spain's ally. In January 1558, French troops commanded by the Duke of Guise captured <strong>Calais</strong>, England’s last continental possession held since 1347. The loss shattered English pride: Calais was an essential commercial gateway for wool exports and a naval fortress guarding the Channel, and its loss left England without a military foothold on the European mainland. Mary I famously lamented that 'Calais' would be found engraved upon her heart.`,
          `In April 1559, Elizabeth signed the <strong>Treaty of Cateau-Cambrésis</strong>, formally ending the Franco-Spanish war. France retained Calais for eight years or would pay 500,000 crowns—a diplomatic fiction masking permanent loss. Crucially, the treaty brought peace between France and Spain. For the first time in sixty years, the Catholic superpowers were not fighting each other, creating the terrifying prospect of a united papal crusade against Protestant England. English strategic planning was thus forced to pivot from continental warfare to maritime coastal defense, knowing England stood isolated and vulnerable.`,
          `This danger was magnified on England’s northern border by the historic <strong>Auld Alliance</strong> between France and Scotland. Scotland was ruled by Catholic regent Mary of Guise, commanding French garrisons. Her daughter, <strong>Mary, Queen of Scots</strong>, married the French Dauphin (Francis II in 1559) and openly quartered the English arms on her heraldic banners. England was caught in a lethal pincer between French forces in Paris and Edinburgh. With French garrisons entrenched at Leith, Cecil warned Elizabeth that French troops could march across the Tweed into Northumberland within forty-eight hours.`,
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
        title: 'A Fractured Realm: Religious Divisions & The Search for Stability',
        paras: [
          `In 1558, England stood on the brink of sectarian catastrophe. Over twenty-five violent years, the English people had suffered whiplash religious upheavals: Henry VIII’s rupture with Rome in 1534, Edward VI’s iconoclastic Calvinism (1547–1553), and Mary I’s bloody Counter-Reformation (1553–1558), during which 284 Protestant men and women were burned alive at the stake for heresy. The realm was geographically and spiritually fractured. The North, the West Midlands, Lancashire, and Wales remained fiercely devoted to traditional Roman Catholicism, Latin masses, and the veneration of saints. Conversely, London, East Anglia, and the South-East contained vibrant, educated Protestant populations committed to continental Reformed theology.`,
          `Compounding this volatility was the return of hundreds of <strong>Marian exiles</strong>—committed English Protestants who had fled Mary’s burnings to live in Calvinist Geneva, Zurich, and Strasbourg. Returning home in November 1558, these zealous reformers expected Elizabeth to sweep away every trace of popery, abolish the hierarchy of bishops, and establish a pure Presbyterian church modelled on John Calvin's Geneva. Elizabeth herself was an educated Protestant, fluent in Greek and Latin, who revered the English Bible. However, unlike the returning exiles, she was a supreme political pragmatist: she understood that forcing radical Protestantism upon a conservative Catholic majority would provoke an immediate peasant rebellion and invite a foreign Catholic crusade.`,
          `Elizabeth’s overarching objective was political survival and civic peace. She sought to forge a <strong>'Middle Way' (*Via Media*)</strong>—a comprehensive church settlement that was firmly Protestant in its official doctrine and governance, but retained traditional Catholic ceremonial beauty, vestments, and episcopal hierarchy. By making church membership inclusive and refusing to police private conscience, Elizabeth sought to secure the outward obedience of conservative Catholics while anchoring England firmly within the Protestant world.`,
        ],
      },
      sec2: {
        num: 2,
        title: 'The Legal Pillars: Act of Supremacy & Act of Uniformity',
        paras: [
          `In the spring Parliament of 1559, Elizabeth and William Cecil steered two landmark statutes through ferocious Catholic opposition in the House of Lords. The first was the <strong>Act of Supremacy (1559)</strong>, which formally severed England's ties to the Papacy and restored Crown control over the Church. In a stroke of political genius, Elizabeth rejected Henry VIII’s controversial title of 'Supreme Head'. Instead, she assumed the title of <strong>'Supreme Governor'</strong> of the Church of England. This calculated compromise reassured moderate Catholics, who believed only Christ or the Pope could be head of the Church, while appeasing radical Protestants who argued that scripture forbade a woman from claiming spiritual headship.`,
          `The Act of Supremacy established an <strong>Oath of Supremacy</strong> mandatory for all public officials, judges, MPs, and clergymen, requiring them to swear fealty to the Queen as Supreme Governor. Any official refusing the oath was stripped of their office and livelihood. Crucially, while all but one of Mary’s Catholic bishops refused the oath and were replaced with moderate Protestants, the vast majority of parish priests—roughly 9,000 across England—took the oath and kept their livings, guaranteeing administrative continuity across the countryside.`,
          `The second pillar was the <strong>Act of Uniformity (1559)</strong>, which established a single, mandatory form of national worship. It enforced the universal use of an updated 1559 <strong>Book of Common Prayer</strong>, written in English. To reconcile conservative Catholics, the communion liturgy was crafted with deliberate, masterly ambiguity: the prayer book merged Cranmer's 1552 Protestant formula (*"Take and eat this in remembrance that Christ died for thee"*) with traditional Catholic wording (*"The body of our Lord Jesus Christ preserve thy body and soul"*), permitting worshippers to interpret the bread and wine according to their own conscience. Church attendance on Sundays was compulsory: those who refused were branded <strong>recusants</strong> and fined <strong>one shilling</strong> per missed service (roughly a week's wages for a skilled labourer).`,
        ],
      },
      sec3: {
        num: 3,
        title: 'The Royal Injunctions & Mechanisms of Parish Enforcement',
        paras: [
          `To enforce the settlement at grassroots level, William Cecil issued fifty-seven <strong>Royal Injunctions (1559)</strong>. These detailed administrative orders instructed the clergy on parish operations. The Injunctions struck a careful balance: priests were commanded to preach the Royal Supremacy, denounce the Pope’s usurped power, and ensure that every parish church purchased a large copy of the English Bible. To stamp out traditional Catholic superstition, pilgrimages to local holy wells were outlawed, fake relics were destroyed, and candle-burning before images was forbidden.`,
          `However, Elizabeth inserted vital ceremonial concessions to soothe traditionalist parishioners. Church interiors retained an altar table rather than a plain wooden communion board; church music and organ-playing were encouraged; kneeling during prayer and bowing at the name of Jesus were maintained; and clergymen were permitted to marry only with the formal approval of their bishop and two JPs. Clergy were required to wear traditional liturgical dress: a white linen surplice during services and an outdoor black cope. Preaching was strictly policed: to prevent radical puritan or Catholic rabble-rousing, only ministers licensed by the Crown or a bishop were allowed to deliver sermons; unlicensed clergy were required to read approved homilies.`,
          `Enforcement was carried out through nationwide episcopal <strong>visitations</strong>. In the summer of 1559, royal commissioners toured every diocese in England, inspecting church buildings, examining clergy qualifications, checking for English Bibles, and administering the Oath of Supremacy. Approximately 400 Marian priests who refused to conform were deprived of their posts, but the overwhelming majority conformed. Visitations were repeated every three to four years, ensuring that parish life steadily conformed to the statutory Elizabethan baseline.`,
        ],
      },
      sec4: {
        num: 4,
        title: 'The Church of England as an Engine of State Authority',
        paras: [
          `In sixteenth-century England, the Church was far more than a spiritual sanctuary; it was the state’s supreme engine for nationwide social control, political indoctrination, and local administration. With no television, radio, or newspapers, the parish pulpit was the Crown’s primary communication network. Every Sunday, thousands of congregations assembled to hear royal proclamations read aloud and recite prayers of thanks for the Queen’s health and the preservation of the realm. Obedience to the monarch was preached as a direct commandment from God; rebellion was branded as the ultimate mortal sin.`,
          `The Church operated its own powerful judicial apparatus known as <strong>Church courts (consistory courts)</strong>. These ecclesiastical tribunals held immense jurisdiction over everyday communal life. While common law courts handled felonies, Church courts policed morality—prosecuting slander, drunkenness, and recusancy—while overseeing wills, marriages, and parish schools.`,
          `Furthermore, the parish church served as the social heartbeat of community life. Churchwardens organized seasonal festivals—such as May Day, harvest suppers, and Easter parish fairs—which reinforced communal solidarity and social cohesion. By preserving the traditional visual splendor of churches, rood screens, and musical liturgy, Elizabeth allowed ordinary peasants to experience the comforting familiarity of their ancestral rituals within a Protestant theological framework.`,
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
        title: 'The Puritan Challenge: Crucifixes, Vestments & Lambeth Resistance',
        paras: [
          `While the 1559 Religious Settlement achieved broad national acceptance, it faced fierce ideological resistance from two unyielding extremes. From within Protestant ranks came the challenge of the <strong>Puritans</strong>—zealous reformers who believed Elizabeth’s 'Middle Way' was a cowardly, half-hearted compromise that retained the idolatrous 'dregs of popery'. Puritans adhered to strict Calvinist theology: they believed in double predestination, rejected the authority of bishops, demanded a church governed by elected elders (Presbyterians), and insisted that any practice not explicitly mentioned in the Bible was a sinful invention of the Antichrist.`,
          `The Puritan challenge erupted in two major flashpoints during the 1560s. The first was the <strong>Crucifix Controversy</strong>. Elizabeth insisted on keeping a silver crucifix and burning candles in her royal chapel, and ordered that every parish church retain a crucifix on the rood screen to comfort Catholic parishioners. Puritan bishops, led by Edmund Grindal and John Jewel, fiercely condemned crucifixes as idolatrous images that violated the Second Commandment. Several bishops threatened to resign en masse. Lacking educated Protestant clergymen to replace them, Elizabeth backed down and removed crucifixes from parish churches, though she stubbornly retained one in her private chapel.`,
          `The second crisis was the <strong>Vestment Controversy (1565–1566)</strong>. Puritans rejected the mandatory white linen surplice, arguing that special priestly garments suggested ministers possessed supernatural powers to turn bread into Christ’s body. By 1565, many London preachers were refusing to wear the surplice, dressing in plain black gowns. Elizabeth ordered Archbishop Matthew Parker to enforce uniform dress. In 1566, Parker issued the *Book of Advertisements* and summoned 110 London ministers to Lambeth Palace for a dress inspection. Thirty-seven ministers boldly refused to conform and were summarily dismissed from their livings. Despite their fury, Puritans remained politically loyal to Elizabeth because the only alternative—a Catholic monarch like Mary Stuart—was unthinkable.`,
        ],
      },
      sec2: {
        num: 2,
        title: 'The Northern Catholic Stronghold & Recusant Resistance',
        paras: [
          `The Catholic challenge posed a far graver existential danger. In 1558, a substantial portion of the English population—and perhaps one-third of the nobility—remained devoted to Roman Catholicism. In northern counties such as Yorkshire, Durham, and Lancashire, Catholic influence was entrenched under the protection of ancient feudal families like the Percys (Earls of Northumberland) and the Nevilles (Earls of Westmorland). These magnates maintained private domestic chaplains who celebrated Latin masses in manor house attics, shielded secret priests, and quietly boycotted the local parish church.`,
          `During the early 1560s, Elizabeth pursued a calculated policy of strategic leniency. She instructed county magistrates and JPs not to enforce recusancy fines with excessive severity, famously remarking that she had "no desire to make windows into men's souls." Elizabeth understood that pushing conservative Catholics into a corner would spark a peasant uprising. Moderate Catholics attended Church of England services to avoid fines and show outward loyalty, while privately practicing traditional devotions at home—a group historians describe as 'church papists'.`,
          `However, this delicate balance collapsed in the late 1560s. In 1566, Pope Pius V issued an official instruction forbidding English Catholics from attending Church of England services under pain of mortal sin. Simultaneously, the Catholic northern nobility grew intensely alienated: Elizabeth systematically bypassed ancient Catholic peers in favor of Protestant 'new men' like Cecil, while Protestant bishops aggressively cracked down on traditional northern customs. In November 1569, this resentment exploded into the armed <strong>Revolt of the Northern Earls</strong>, proving that domestic Catholicism could easily mobilize into armed rebellion against the Crown.`,
        ],
      },
      sec3: {
        num: 3,
        title: 'The Counter-Reformation & Douai’s Clandestine Missionaries',
        paras: [
          `The domestic Catholic threat was dramatically amplified by international developments. Across Western Europe, the Catholic Church launched the <strong>Counter-Reformation</strong>—a militant, highly coordinated campaign to stamp out Protestant heresy and reclaim lost territories for Rome. Spearheaded by the <strong>Council of Trent (1545–1563)</strong>, the Catholic hierarchy reformed Church abuses, standardized Latin theology, and established aggressive missionary orders like the Society of Jesus (Jesuits) to lead the spiritual reconquest.`,
          `A central weapon in this campaign was the training of English Catholic priests in continental Europe. In 1568, an exiled English Catholic scholar, <strong>Cardinal William Allen</strong>, founded a specialized seminary college at Douai in the Spanish Netherlands. The college was established to train English Catholic youths in missionary theology and ordain them as seminary priests. From 1574 onwards, these priests were smuggled into England disguised as merchants, soldiers, and tutors. Sheltered in Catholic manor houses in specialized 'priest holes' built by Nicholas Owen, they traveled from village to village celebrating secret Latin masses, hearing confessions, and stiffening Catholic resistance.`,
          `For the Elizabethan regime, the seminary priests were not mere religious ministers; they were viewed as hostile enemy agents sent by foreign Catholic superpowers. The Spanish Netherlands, lying directly across the English Channel, was garrisoned by 50,000 veteran Spanish troops under the brutal Duke of Alba, who was crushing the Dutch Protestant revolt. English ministers feared that seminary priests were preparing a domestic Catholic fifth column to assist a Spanish invasion fleet, transforming religious faith into a vital front of European geopolitics.`,
        ],
      },
      sec4: {
        num: 4,
        title: 'The Thunderclap: Regnans in Excelsis & The Treason Threshold',
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
        'Why did the arrival of Mary Stuart in 1568 create an insoluble dynastic crisis and a permanent Catholic figurehead against Elizabeth?',
      specRef: '1HI0/B4 &bull; Key Topic 1.4',
      sec1: {
        num: 1,
        title: 'The Scottish Tragedy: Murder, Scandal & Lochleven Abdication',
        paras: [
          `In the late 1560s, a political earthquake in Scotland hurled the greatest dynastic crisis of Elizabeth’s reign across the English border. Mary Stuart, Queen of Scots, was Elizabeth’s first cousin once removed—the granddaughter of Henry VIII’s elder sister Margaret Tudor. Tall, charismatic, and cultured, Mary had been crowned Queen of Scotland at just six days old and raised at the glamorous French court as Dauphine and Queen Consort. Following the premature death of her French husband King Francis II in 1560, eighteen-year-old Mary returned to Edinburgh to rule a turbulent kingdom dominated by fierce, Protestant feudal nobles known as the Lords of the Congregation.`,
          `Mary’s personal rule descended into violent melodrama and scandal. In 1565, she made the catastrophic decision to marry her handsome English Catholic cousin, Henry Stuart, <strong>Lord Darnley</strong>. The marriage quickly collapsed into drunken jealousy and political intrigue. In March 1566, Darnley and a cabal of Protestant lords burst into Mary’s private chambers at Holyroodhouse and savagely stabbed her Italian secretary, David Rizzio, fifty-six times before her eyes while she was six months pregnant. Eleven months later, on 10 February 1567, Darnley himself was murdered in Edinburgh: his lodgings at Kirk o'Field were obliterated by gunpowder barrels, and his strangled corpse was discovered in the adjacent garden.`,
          `Public outrage reached boiling point when, barely three months later, Mary married the chief suspect in Darnley's assassination, James Hepburn, <strong>Earl of Bothwell</strong>. Convinced of Mary's complicity in regicide, Scotland's Protestant lords rose in armed rebellion. They defeated Mary’s forces at Carberry Hill in June 1567, imprisoned her on an island fortress at <strong>Lochleven Castle</strong>, and forced her at swordpoint to abdicate the Scottish crown in favour of her thirteen-month-old infant son, King James VI, under a Protestant regency. Bothwell fled into exile, dying insane in a Danish prison. The Scottish Reformation had triumphed: John Knox and the Presbyterian kirk now held ideological sway in Edinburgh, transforming Scotland from England's historic enemy into a fragile Protestant buffer state.`,
        ],
      },
      sec2: {
        num: 2,
        title: 'The Fishing Boat at Workington & The Diplomatic Trap',
        paras: [
          `In May 1568, Mary pulled off a daring escape from Lochleven with the help of loyal servants, rallying a small army of six thousand supporters. However, on 13 May 1568, her forces were decisively routed by the Regent Murray’s army at the Battle of Langside near Glasgow. Terrified of falling back into the hands of her rebellious nobles, Mary made the fateful decision that would seal her doom: she fled south to the Solway Firth and, on <strong>16 May 1568</strong>, stepped into an open fishing boat and crossed the waters into England, landing at the obscure port of Workington in Cumberland.`,
          `Mary's arrival in England threw Elizabeth and William Cecil into total panic. Mary arrived expecting hospitality, sisterly royal solidarity, and an English army to restore her to her Scottish throne. Instead, her physical presence in England created an insoluble constitutional crisis. Under Catholic canon law, Mary possessed a stronger, purer claim to the English crown than Elizabeth, whom Catholics regarded as an illegitimate bastard. In England, Mary was an anointed monarch, a legitimate heir presumptive, and a living, magnetic focal point for every disgruntled Catholic noble in the realm.`,
          `Elizabeth found herself impaled upon the horns of an impossible four-way dilemma. She could not restore Mary to Scotland with English troops without alienating Scotland’s friendly Protestant regents and placing a hostile Catholic regime on her northern border. She could not allow Mary to seek refuge in France, where the Catholic Guise family would supply an invasion fleet to conquer England. Nor could she grant Mary freedom to travel within England, where she would immediately become the figurehead for northern Catholic rebellion. Finally, she could not execute an anointed monarch without establishing a terrifying precedent that threatened royal sovereignty everywhere. Elizabeth had Mary arrested and placed in secure custody at Carlisle Castle, beginning nineteen years of honourable English captivity.`,
        ],
      },
      sec3: {
        num: 3,
        title: 'The Conference of York & The Casket Letters Mystery',
        paras: [
          `To establish legal justification for keeping an anointed foreign monarch under house arrest without trial, Elizabeth convened a judicial inquiry. Between October 1568 and January 1569, commissioners met at the <strong>Conference of York</strong> (later moved to Hampton Court and Westminster) to examine charges brought by the Scottish Protestant regents against their queen. The Regent Murray produced a small silver casket containing eight handwritten French letters and love sonnets, allegedly discovered in Bothwell’s baggage—the infamous <strong>Casket Letters</strong>. The letters purported to prove that Mary was violently in love with Bothwell and had actively lured Darnley to Kirk o’Field to be blown up.`,
          `Mary fiercely denied the authenticity of the letters, insisting they were forged by Murray’s Protestant faction to justify her illegal deposition. She demanded the right to attend the conference in person to cross-examine her accusers and view the original documents. Elizabeth flatly refused, fearing Mary’s regal presence and forensic eloquence would sway the English commissioners. Crucially, the Scottish regents produced only copies, and the original letters subsequently vanished into history, leaving historians to debate their authenticity to this day.`,
          `In January 1569, Elizabeth delivered a masterclass in political ambiguity, issuing an official verdict that <em>"nothing has been sufficiently proven"</em> against either side. Murray’s regency in Scotland was left intact, Darnley’s murder was left unresolved, and Mary was neither convicted of murder nor exonerated of treason. This calculated stalemate gave Elizabeth the legal pretext she desperately needed: because Mary was not cleared of murdering her husband, Elizabeth could refuse to receive her at court and justify keeping her in indefinite English custody.`,
        ],
      },
      sec4: {
        num: 4,
        title: 'The Golden Cage & The Gathering Storm of Rebellion',
        paras: [
          `Following the Conference of York, Mary was transferred deep into the English Midlands, placed under the honourable custody of George Talbot, <strong>Earl of Shrewsbury</strong>. Shrewsbury hosted Mary at his fortified estates—Tutbury, Sheffield, and Chatsworth. Mary lived in regal splendour with thirty servants, yet her correspondence was intercepted by Cecil's agents and her visitors monitored with paranoid vigilance.`,
          `Indefinite captivity transformed Mary from a discredited Scottish fugitive into a tragic Catholic martyr. For the English Catholic aristocracy, Mary represented the glorious hope of a restored Roman Catholic England. Her presence in the Midlands acted as a magnetic catalyst, galvanizing domestic conspirators, Spanish diplomats, and papal agents. Within months of her arrival, conservative English peers hatched a clandestine scheme to marry Mary to Thomas Howard, the Duke of Norfolk—the premier peer of England—to force Elizabeth to name Mary her successor.`,
          `When Elizabeth discovered the Norfolk marriage plot in the autumn of 1569, Norfolk fled from court, and in November 1569, the Catholic Earls of Northumberland and Westmorland raised four thousand armed rebels in the <strong>Revolt of the Northern Earls</strong>. The rebels stormed Durham Cathedral, tore up the English Bible, and celebrated Latin mass before marching south to liberate Mary. Although royal armies crushed the rebellion, Mary Stuart’s presence had permanently shattered England’s internal peace, plunging the Elizabethan regime into an era of domestic plots, secret intelligence wars, and existential peril.`,
        ],
      },
    },
  ];

  // Build the complete Master HTML
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Early Elizabethan England, 1558–1588 — Key Topic 1 Course Textbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,600&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }

    @page {
      size: A4 portrait;
      margin: 0;
    }

    body {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 9.2pt;
      line-height: 1.44;
      color: #1e293b;
      background: #e2e8f0;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    @media print {
      body { background: #ffffff; }
    }

    /* Strict A4 Container (210mm x 297mm) */
    .textbook-page {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      box-sizing: border-box;
      background: #ffffff;
      margin: 0 auto;
      page-break-after: always;
      break-after: always;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    /* Page Padding Standards */
    .cover-page-layout {
      padding: 9mm 12mm 7mm 12mm;
      height: 297mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .narrative-page-layout {
      padding: 9mm 12mm 7mm 12mm;
      height: 297mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .masterclass-page-layout {
      padding: 8.5mm 12mm 6.5mm 12mm;
      height: 297mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .back-cover-layout {
      padding: 8.5mm 12mm 6.5mm 12mm;
      height: 297mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Running Header */
    .running-header {
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 2.5px;
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #475569;
      flex-shrink: 0;
    }
    .running-header strong {
      color: #0f172a;
      font-weight: 800;
    }

    /* Running Footer */
    .running-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 2.5px;
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-size: 6.5pt;
      color: #64748b;
      font-weight: 600;
      flex-shrink: 0;
    }

    /* Lesson Hero Banner (Verso Spread Page) */
    .lesson-hero {
      border-bottom: 2px solid #1e3a8a;
      padding-bottom: 4px;
      margin-bottom: 5px;
      flex-shrink: 0;
    }
    .lesson-badge-strip {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 2px;
      font-family: 'Inter', sans-serif;
    }
    .topic-badge {
      background: #1e3a8a;
      color: #ffffff;
      font-size: 6.6pt;
      font-weight: 800;
      padding: 1.5px 6px;
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
      margin: 1px 0 2px 0;
      line-height: 1.18;
    }
    .lesson-spec-anchor {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      color: #334155;
      line-height: 1.3;
      background: #f8fafc;
      border-left: 3px solid #1e3a8a;
      padding: 2.5px 6px;
      border-radius: 0 3px 3px 0;
    }

    /* Right Page Sub-Header (Recto Spread Page) */
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
      font-size: 6.4pt;
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

    /* 2-Column Deterministic Grid */
    .two-column-prose-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      flex: 1;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 3.5px;
    }
    .col-side {
      display: flex;
      flex-direction: column;
    }

    .two-column-prose {
      column-count: 2;
      column-gap: 15px;
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
      margin: 0 0 3.5px 0;
      font-family: 'Inter', sans-serif;
      break-inside: avoid;
    }
    .sb-num {
      background: #b45309;
      color: #ffffff;
      font-size: 6.6pt;
      font-weight: 900;
      padding: 0.5px 4.5px;
      border-radius: 2px;
      letter-spacing: 0.04em;
    }
    .sb-title {
      font-size: 7.2pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .narrative-p {
      margin: 0 0 3.5px 0;
      text-indent: 9px;
      font-size: 8.85pt;
      line-height: 1.34;
      color: #1e293b;
      text-align: justify;
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

    /* Primary Archival Source Box (Verso) */
    .archival-source-box {
      background: #fafaf9;
      border: 1.2px solid #d6d3d1;
      border-top: 2.5px solid #44403c;
      padding: 3px 5.5px;
      margin: 2px 0 3px 0;
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
      font-size: 5.8pt;
      font-weight: 800;
      padding: 1px 4px;
      border-radius: 2px;
      text-transform: uppercase;
    }
    .source-type {
      font-size: 6.0pt;
      font-weight: 700;
      color: #78350f;
      text-transform: uppercase;
    }
    .source-date-micro {
      font-size: 5.8pt;
      color: #78716c;
      font-weight: 700;
    }
    .archival-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.2pt;
      font-weight: 800;
      color: #1c1917;
      margin: 1px 0;
    }
    .archival-source-quote {
      font-family: 'Newsreader', Georgia, serif;
      font-style: italic;
      font-size: 7.4pt;
      line-height: 1.34;
      color: #1c1917;
      background: #faf8f5;
      border-left: 2.5px solid #0f172a;
      padding: 3.5px 6px;
      margin: 2px 0;
      border-radius: 2px;
    }
    .archival-image {
      width: 100%;
      height: 75px;
      object-fit: contain;
      background: #ffffff;
      border: 1px solid #e7e5e4;
      margin: 2px 0;
      display: block;
    }
    .archival-context-box {
      font-size: 7.0pt;
      line-height: 1.28;
      color: #44403c;
      border-left: 2px solid #a8a29e;
      padding-left: 4px;
      margin-top: 2px;
    }
    .archival-context-text { margin: 0 0 2px 0; }
    .archival-hinge-q {
      background: #f5f5f4;
      padding: 2px 5px;
      border-radius: 2px;
      color: #1c1917;
      font-size: 6.8pt;
      line-height: 1.24;
    }

    /* Key Figure Profile Box */
    .key-figure-box {
      background: #f8fafc;
      border: 1.2px solid #cbd5e1;
      border-top: 3px solid #1e3a8a;
      padding: 4px 6px;
      margin: 3px 0 4px 0;
      break-inside: avoid;
      font-family: 'Inter', sans-serif;
    }
    .kf-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
    }
    .kf-tag {
      font-size: 6.4pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .kf-lifespan {
      font-size: 6.4pt;
      font-weight: 700;
      color: #64748b;
    }
    .kf-identity-row {
      display: flex;
      gap: 6px;
      align-items: center;
      margin-bottom: 3px;
    }
    .kf-portrait {
      width: 36px;
      height: 44px;
      object-fit: cover;
      border-radius: 2px;
      border: 1px solid #cbd5e1;
      background: #ffffff;
      flex-shrink: 0;
    }
    .kf-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 9.0pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
    }
    .kf-role {
      font-size: 6.4pt;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
    }
    .kf-significance {
      font-size: 7.2pt;
      line-height: 1.28;
      color: #334155;
      margin-bottom: 3px;
    }
    .kf-actions-title {
      font-size: 6.4pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 1px;
    }
    .kf-actions-list {
      margin: 0;
      padding-left: 12px;
      font-size: 7.0pt;
      line-height: 1.26;
      color: #1e293b;
    }
    .kf-actions-list li { margin-bottom: 1px; }

    /* Concept Spotlight Box */
    .concept-spotlight-box {
      background: #fffbeb;
      border: 1.2px solid #fde68a;
      border-left: 3.5px solid #d97706;
      padding: 3.5px 6px;
      margin: 3px 0 4px 0;
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
      font-size: 6.2pt;
      font-weight: 800;
      color: #92400e;
      text-transform: uppercase;
    }
    .csb-category {
      font-size: 6.2pt;
      font-weight: 700;
      color: #b45309;
      background: #ffedd5;
      padding: 1px 4px;
      border-radius: 2px;
    }
    .csb-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 8.4pt;
      font-weight: 800;
      color: #7c2d12;
      margin: 1px 0;
      line-height: 1.15;
    }
    .csb-body {
      font-size: 7.2pt;
      line-height: 1.28;
      color: #1e293b;
      margin-bottom: 2px;
    }
    .csb-takeaway {
      font-size: 6.8pt;
      font-weight: 600;
      color: #78350f;
      background: #fef3c7;
      border-left: 2px solid #d97706;
      padding: 2px 5px;
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
      font-size: 6.8pt;
      font-weight: 900;
      color: #92400e;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .bvb-badge, .beb-badge {
      font-size: 5.8pt;
      font-weight: 800;
      background: #0f172a;
      color: #fff;
      padding: 1px 4px;
      border-radius: 2px;
      text-transform: uppercase;
    }
    .bvb-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 6px;
      font-size: 6.8pt;
      line-height: 1.28;
      color: #334155;
    }
    .bvb-col strong, .beb-col strong {
      display: block;
      color: #0f172a;
      margin-bottom: 1px;
      text-transform: uppercase;
      font-size: 6.4pt;
    }
    .bottom-enquiry-box {
      background: #f8fafc;
      border: 1.2px solid #cbd5e1;
      border-top: 2.5px solid #1e3a8a;
      padding: 7px 9px;
      margin-bottom: 2px;
    }
    .beb-title {
      font-size: 6.8pt;
      font-weight: 900;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .beb-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      font-size: 6.8pt;
      line-height: 1.32;
      color: #334155;
    }

    /* 4-Box Horizontal Timeline Strip (Recto Bottom Deck) */
    .timeline-strip-4col {
      width: 100%;
      box-sizing: border-box;
      border: 1.2px solid #0f172a;
      border-radius: 2px;
      overflow: hidden;
      margin-top: auto;
      margin-bottom: 2.5px;
      background: #ffffff;
      flex-shrink: 0;
    }
    .timeline-strip-header {
      background: #0f172a;
      color: #ffffff;
      padding: 1.8px 6px;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .timeline-strip-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
      padding: 3px 5px;
      font-family: 'Inter', sans-serif;
      font-size: 6.9pt;
      line-height: 1.25;
    }
    .timeline-card {
      background: #f8fafc;
      border-left: 2.5px solid #1e3a8a;
      padding: 2.5px 4.5px;
      border-radius: 1px;
    }
    .timeline-card-title {
      color: #1e3a8a;
      display: block;
      font-size: 6.8pt;
      font-weight: 800;
      margin-bottom: 1px;
    }

    /* Full-Width Exam Strategy Box (Recto Bottom Deck) */
    .exam-strategy-fullwidth-box {
      width: 100%;
      box-sizing: border-box;
      background: #fdfaf6;
      border: 1.2px solid #fed7aa;
      border-left: 3.5px solid #b45309;
      padding: 3.5px 6.5px;
      margin-bottom: 1.5px;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
      flex-shrink: 0;
    }
    .esfb-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #fed7aa;
      padding-bottom: 1.5px;
      margin-bottom: 2px;
    }
    .esfb-badge {
      font-size: 6.8pt;
      font-weight: 900;
      color: #9a3412;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .esfb-tariff {
      font-size: 6.2pt;
      font-weight: 800;
      background: #0f172a;
      color: #ffffff;
      padding: 1px 5px;
      border-radius: 2px;
    }
    .esfb-stem {
      font-size: 7.2pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 2px;
      line-height: 1.25;
    }
    .esfb-guidance {
      font-size: 6.8pt;
      color: #78350f;
      line-height: 1.25;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px dashed #fed7aa;
      padding-top: 2px;
    }
    .esfb-target {
      font-size: 6.4pt;
      font-weight: 800;
      color: #9a3412;
    }

    /* Layout Containers */
    .cover-page-layout {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .narrative-page-layout {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .synoptic-page-layout {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .masterclass-page-layout {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .back-cover-layout {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Master Chronology Table */
    .master-chron-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 6.9pt;
      line-height: 1.3;
    }
    .master-chron-table th {
      background: #0f172a;
      color: #ffffff;
      padding: 3.5px 7px;
      text-align: left;
      font-size: 6.6pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .master-chron-table td {
      padding: 3.5px 7px;
      border-bottom: 1px solid #e2e8f0;
      color: #334155;
    }
  </style>
</head>
<body>

  <!-- ====================================================================
       PAGE 1: MASTER FRONT COVER (Matching CME Publisher Standard)
       ==================================================================== -->
  <div class="textbook-page" data-page="1">
    <div class="cover-page-layout">
      
      <!-- Top Departmental Header Bar -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;" data-department-name="The History Department">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="school-brand-target" style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;">The History Department</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">GCSE History Revision Hub &bull; Course Textbook</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 1px; border-top: 1px solid #000; padding-top: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: #222;">
            EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 2: EARLY ELIZABETHAN ENGLAND, 1558–1588
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800;">OPTION B4 &bull; 1HI0/B4</span>
        </div>
      </div>

      <!-- Key Topic Title & Inquiry Banner -->
      <div style="border: 1.8px solid #000; border-radius: 4px; padding: 4px 8px; background: #fff; margin-bottom: 2.5px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 1.5px;">
          <span style="background: #000; color: #fff; font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 900; padding: 1px 5px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.8px;">
            Key Topic 1
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #222;">
            Course Textbook &bull; Chronological Enquiry Sequence &bull; 1558–1569
          </span>
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 15pt; margin: 1px 0; font-weight: 900; line-height: 1.15; color: #000;">
          QUEEN, GOVERNMENT AND RELIGION, 1558–1569
        </h1>
        <div style="font-family: 'Georgia', serif; font-size: 8.2pt; color: #333; font-style: italic; line-height: 1.25;">
          From Accession Crisis and the 1559 Religious Settlement to the Arrival of Mary, Queen of Scots
        </div>
      </div>

      <!-- Master Wide Photographic Plate (87mm Uncropped: Coronation Robes, 1559) -->
      <div style="border: 1.8px solid #000; border-radius: 4px; overflow: hidden; background: #fff; margin-bottom: 2.5px; display: flex; flex-direction: column;">
        <div style="height: 87mm; background: #000; display: flex; justify-content: center; align-items: center; overflow: hidden;">
          <img src="${coverImgData}" alt="Coronation Portrait of Queen Elizabeth I" style="height: 100%; max-width: 100%; object-fit: contain; display: block;">
        </div>
        <div style="border-top: 1.5px solid #000; padding: 3px 8px; background: #fff;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
              Archival Primary Record &bull; 15 January 1559
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 900; background: #000; color: #fff; padding: 1px 5px; border-radius: 2px;">
              NPG-LONDON / ACC-1559-CORONATION
            </span>
          </div>
          <div style="font-family: 'Playfair Display', serif; font-size: 9.4pt; font-weight: 800; line-height: 1.18; margin: 1px 0;">
            The Coronation Portrait of Queen Elizabeth I, Westminster Abbey
          </div>
          <div style="font-family: 'Georgia', serif; font-size: 7.0pt; color: #111; line-height: 1.24;">
            Elizabeth I enthroned in cloth of gold robes patterned with Tudor roses and French fleurs-de-lis, bearing the royal orb and sceptre, symbolising sovereign majesty and the restoration of royal independence.
          </div>
          <div style="margin-top: 1.5px; padding-top: 1.5px; border-top: 1px dashed #999; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 6.2pt; font-weight: 800; text-transform: uppercase; color: #333;">
            <span>Archival Primary Record</span>
            <span>Edexcel Paper 2 Master Archive</span>
          </div>
        </div>
      </div>

      <!-- Pearson Edexcel Specification Coverage (Official 4-Column Matrix with 4-Stage Causal Chronology) -->
      <div style="border: 1.5px solid #000; border-radius: 4px; overflow: hidden; background: #fff; display: flex; flex-direction: column; margin-bottom: 2px;">
        <div style="background: #000; color: #fff; padding: 3px 10px; font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.8px; display: flex; justify-content: space-between; align-items: center;">
          <span>Pearson Edexcel GCSE (9–1) History Specification Content</span>
          <span style="font-size: 6.8pt; letter-spacing: 0.5px;">Key Topic 1 Coverage Matrix</span>
        </div>

        <div style="padding: 5px 8px 6px 8px; display: flex; flex-direction: column; gap: 4px;">
          <!-- Row 1: 4-Column Specification Content -->
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; font-family: 'Inter', sans-serif; font-size: 7.0pt; line-height: 1.32; color: #111;">
            <!-- 1.1 -->
            <div style="border-right: 1px solid #cbd5e1; padding-right: 6px;">
              <strong style="font-size: 7.3pt; text-transform: uppercase; color: #000; border-bottom: 1.2px solid #000; padding-bottom: 1px; display: block; margin-bottom: 3px;">
                1.1 Accession (1558)
              </strong>
              <div style="margin-bottom: 2px;">&bull; Social hierarchy &amp; <strong>Great Chain of Being</strong>; Court, Privy Council &amp; Parliament.</div>
              <div style="margin-bottom: 2px;">&bull; Legitimacy doubts, 16th-century gender prejudice &amp; the <strong>marriage dilemma</strong>.</div>
              <div style="margin-bottom: 2px;">&bull; Crown debt of <strong>£300,000</strong>, debasement &amp; Antwerp moneylenders.</div>
              <div style="margin-bottom: 2px;">&bull; Foreign threats: loss of Calais, Treaty of Cateau-Cambrésis &amp; <strong>Auld Alliance</strong>.</div>
              <div>&bull; Fiscal reform: William Cecil, Crown land sales &amp; cutting royal expenditures.</div>
            </div>

            <!-- 1.2 -->
            <div style="border-right: 1px solid #cbd5e1; padding-right: 6px;">
              <strong style="font-size: 7.3pt; text-transform: uppercase; color: #000; border-bottom: 1.2px solid #000; padding-bottom: 1px; display: block; margin-bottom: 3px;">
                1.2 Settlement (1559)
              </strong>
              <div style="margin-bottom: 2px;">&bull; Religious divisions: Catholic North/West vs Protestant South-East.</div>
              <div style="margin-bottom: 2px;">&bull; <strong>Act of Supremacy</strong>: Elizabeth adopts title of <strong>Supreme Governor</strong>.</div>
              <div style="margin-bottom: 2px;">&bull; <strong>Act of Uniformity</strong>: 1559 Prayer Book, ambiguous communion &amp; 1s recusancy fine.</div>
              <div style="margin-bottom: 2px;">&bull; <strong>Royal Injunctions</strong>, nationwide visitations &amp; clerical licensing.</div>
              <div>&bull; Church courts as instruments of social control, morality &amp; community cohesion.</div>
            </div>

            <!-- 1.3 -->
            <div style="border-right: 1px solid #cbd5e1; padding-right: 6px;">
              <strong style="font-size: 7.3pt; text-transform: uppercase; color: #000; border-bottom: 1.2px solid #000; padding-bottom: 1px; display: block; margin-bottom: 3px;">
                1.3 Challenges
              </strong>
              <div style="margin-bottom: 2px;">&bull; Puritan challenge: <strong>Crucifix Controversy</strong> &amp; 1566 <strong>Vestment Controversy</strong>.</div>
              <div style="margin-bottom: 2px;">&bull; Catholic challenge: northern nobility recusancy &amp; 1566 Papal decree.</div>
              <div style="margin-bottom: 2px;">&bull; European Counter-Reformation: Council of Trent &amp; <strong>Douai seminary (1568)</strong>.</div>
              <div style="margin-bottom: 2px;">&bull; Spanish threat in Netherlands: Duke of Alba's 50,000 veteran troops.</div>
              <div>&bull; <strong>Papal Bull (1570)</strong>: <em>Regnans in Excelsis</em> excommunication &amp; 1571 Treasons Act.</div>
            </div>

            <!-- 1.4 -->
            <div>
              <strong style="font-size: 7.3pt; text-transform: uppercase; color: #000; border-bottom: 1.2px solid #000; padding-bottom: 1px; display: block; margin-bottom: 3px;">
                1.4 Mary Stuart (1568–69)
              </strong>
              <div style="margin-bottom: 2px;">&bull; Dynastic claim: Catholic claimant, Scottish scandal &amp; Darnley's murder.</div>
              <div style="margin-bottom: 2px;">&bull; Escape from Lochleven &amp; arrival at <strong>Workington, Cumberland (May 1568)</strong>.</div>
              <div style="margin-bottom: 2px;">&bull; Elizabeth's constitutional dilemma: the four fatal options regarding Mary.</div>
              <div style="margin-bottom: 2px;">&bull; <strong>Conference of York (1568–69)</strong>: Casket Letters &amp; "not proven" verdict.</div>
              <div>&bull; Indefinite English captivity &amp; catalyst for the <strong>1569 Northern Revolt</strong>.</div>
            </div>
          </div>

          <!-- Row 2: 4-Column Causal Sequences (4 Vertical Stages per Column with Arrows) -->
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px;">
            <!-- Col 1 Sequence -->
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #1e3a8a; padding: 3px 5px; border-radius: 2px; font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.26;">
              <span style="font-weight: 800; color: #1e3a8a; text-transform: uppercase; display: block; margin-bottom: 1px;">1.1 Chronological Causal Flow</span>
              <div><strong style="color: #0f172a;">Nov 1558:</strong> Accession of Elizabeth I</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">Nov 1558:</strong> Cecil Appointed Principal Secretary</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">Jan 1559:</strong> Coronation in Westminster Abbey</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">Apr 1559:</strong> Treaty of Cateau-Cambrésis (Calais lost)</div>
            </div>

            <!-- Col 2 Sequence -->
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #1e3a8a; padding: 3px 5px; border-radius: 2px; font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.26;">
              <span style="font-weight: 800; color: #1e3a8a; text-transform: uppercase; display: block; margin-bottom: 1px;">1.2 Chronological Causal Flow</span>
              <div><strong style="color: #0f172a;">Feb 1559:</strong> Commons Debates Religious Bills</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">Apr 1559:</strong> Acts of Supremacy &amp; Uniformity</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">Summer 1559:</strong> Royal Injunctions Issued</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">1559–60:</strong> Nationwide Episcopal Visitations</div>
            </div>

            <!-- Col 3 Sequence -->
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #b45309; padding: 3px 5px; border-radius: 2px; font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.26;">
              <span style="font-weight: 800; color: #b45309; text-transform: uppercase; display: block; margin-bottom: 1px;">1.3 Chronological Causal Flow</span>
              <div><strong style="color: #0f172a;">1566:</strong> The Dutch Revolt Begins</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">Mar 1566:</strong> Parker's Book of Advertisements</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">1567:</strong> Alba's Army Deployed to Netherlands</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">1568:</strong> Douai Seminary College Founded</div>
            </div>

            <!-- Col 4 Sequence -->
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #991b1b; padding: 3px 5px; border-radius: 2px; font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.26;">
              <span style="font-weight: 800; color: #991b1b; text-transform: uppercase; display: block; margin-bottom: 1px;">1.4 Chronological Causal Flow</span>
              <div><strong style="color: #0f172a;">Feb 1567:</strong> Darnley Murdered at Kirk o' Field</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">16 May 1568:</strong> Mary Stuart Lands at Workington</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">Oct 1568:</strong> Conference of York Inquiries Open</div>
              <div style="text-align: center; color: #b45309; font-weight: 900; line-height: 0.8;">&darr;</div>
              <div><strong style="color: #0f172a;">Nov 1569:</strong> Revolt of the Northern Earls</div>
            </div>
          </div>

          <!-- Row 3: Enquiry Disciplinary Focus & Exam Blueprint -->
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; font-family: 'Inter', sans-serif; font-size: 6.1pt; line-height: 1.24;">
            <div style="background: #f1f5f9; padding: 2px 4px; border-radius: 2px; border: 1px solid #cbd5e1;">
              <strong style="color: #1e3a8a; display: block;">CORE DISCIPLINARY FOCUS</strong>
              Royal Prerogative vs Crown Debt &bull; <em>Exam Link: Q1 Feature / Q2 Causation</em>
            </div>
            <div style="background: #f1f5f9; padding: 2px 4px; border-radius: 2px; border: 1px solid #cbd5e1;">
              <strong style="color: #1e3a8a; display: block;">CORE DISCIPLINARY FOCUS</strong>
              Legislative Via Media Compromise &bull; <em>Exam Link: Q1 Feature / Q3 Essay</em>
            </div>
            <div style="background: #f1f5f9; padding: 2px 4px; border-radius: 2px; border: 1px solid #b45309;">
              <strong style="color: #b45309; display: block;">CORE DISCIPLINARY FOCUS</strong>
              Puritan Vestments &amp; Counter-Reformation &bull; <em>Exam Link: Q2 Causation / Q3 Essay</em>
            </div>
            <div style="background: #f1f5f9; padding: 2px 4px; border-radius: 2px; border: 1px solid #991b1b;">
              <strong style="color: #991b1b; display: block;">CORE DISCIPLINARY FOCUS</strong>
              Dynastic Legitimacy &amp; Northern Revolt &bull; <em>Exam Link: Q2 Causation / Q3 Essay</em>
            </div>
          </div>
        </div>
      </div>

      <!-- Cover Running Footer -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #000; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #333; font-weight: 700;">
        <span>The History Department &bull; GCSE History Revision Hub</span>
        <span>Key Topic 1 &bull; 12-Page Complete Master Volume</span>
      </div>

    </div>
  </div>

`;

  // ====================================================================
  // PAGES 2–9: ENQUIRIES 1 TO 4 (2-PAGE SPREAD PER ENQUIRY)
  // ====================================================================
  lessons.forEach((l, idx) => {
    const leftPageNum = l.num * 2;
    const rightPageNum = l.num * 2 + 1;
    const bank = componentBank[`p${rightPageNum}`] || {};
    const sources = leftSources[`p${leftPageNum}`] || {};
    const vocabList = leftVocab[`p${leftPageNum}`] || [];
    const rightExam =
      ktWorkbookData && ktWorkbookData.enquiries && ktWorkbookData.enquiries[idx]
        ? ktWorkbookData.enquiries[idx].rightExam
        : null;

    // LEFT PAGE (VERSO: Sections 1 & 2 + Sources + Vocab)
    html += `
  <div class="textbook-page" data-page="${leftPageNum}">
    <div class="narrative-page-layout">
      <div class="running-header">
        <span>EDEXCEL GCSE (9–1) HISTORY &bull; EARLY ELIZABETHAN ENGLAND, 1558–1588</span>
        <span>${l.code} &bull; ${l.title}</span>
      </div>

      <div class="lesson-hero">
        <div class="lesson-badge-strip">
          <span class="topic-badge">ENQUIRY ${l.num}</span>
          <span class="spec-ref-badge">${l.specRef}</span>
        </div>
        <h2 class="lesson-title">${l.title}</h2>
        <div class="lesson-spec-anchor">
          <strong>Historical Enquiry:</strong> ${l.enquiry}
        </div>
      </div>

      <div class="two-column-prose-grid">
        <div class="col-side">
          <div class="section-banner">
            <span class="sb-num">SECTION 1</span>
            <span class="sb-title">${l.sec1.title}</span>
          </div>
          ${l.sec1.paras.map((p, pIdx) => `<p class="narrative-p"><span class="para-ref">[1.${pIdx + 1}]</span>${p}</p>`).join('')}

          ${renderArchivalSourceBox(sources.sourceA)}
        </div>

        <div class="col-side">
          <div class="section-banner">
            <span class="sb-num">SECTION 2</span>
            <span class="sb-title">${l.sec2.title}</span>
          </div>
          ${l.sec2.paras.map((p, pIdx) => `<p class="narrative-p"><span class="para-ref">[2.${pIdx + 1}]</span>${p}</p>`).join('')}

          ${renderArchivalSourceBox(sources.sourceB)}
        </div>
      </div>

      <div class="bottom-vocab-box">
        <div class="bvb-header">
          <span class="bvb-title">CORE DISCIPLINARY VOCABULARY &bull; SPECIFICATION TERMS</span>
          <span class="bvb-badge">${l.code} GLOSSARY</span>
        </div>
        <div class="bvb-grid">
          ${vocabList
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

      <div class="running-footer">
        <span>Early Elizabethan England, 1558–1588 &bull; Key Topic 1: Queen, Government &amp; Religion</span>
        <span>Page ${leftPageNum}</span>
      </div>
    </div>
  </div>
`;

    // RIGHT PAGE (RECTO: Sections 3 & 4 + Key Figure + Spotlight + Enquiry Deck)
    html += `
  <div class="textbook-page" data-page="${rightPageNum}">
    <div class="narrative-page-layout">
      <div class="running-header">
        <span>EDEXCEL GCSE (9–1) HISTORY &bull; EARLY ELIZABETHAN ENGLAND, 1558–1588</span>
        <span>${l.code} &bull; RECTO SPREAD</span>
      </div>

      <div class="right-page-header">
        <div class="rph-meta">
          <span class="rph-tag">${l.code} ENQUIRY STUDY</span>
          <span>DISCIPLINARY ANALYSIS</span>
        </div>
        <h3 class="rph-title">${l.title} (Continued)</h3>
      </div>

      <div class="two-column-prose-grid">
        <div class="col-side">
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
              <span class="kf-tag">KEY HISTORICAL FIGURE</span>
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
        </div>

        <div class="col-side">
          <div class="section-banner">
            <span class="sb-num">SECTION 4</span>
            <span class="sb-title">${l.sec4.title}</span>
          </div>
          ${l.sec4.paras.map((p, pIdx) => `<p class="narrative-p"><span class="para-ref">[4.${pIdx + 1}]</span>${p}</p>`).join('')}

          ${bank.conceptSpotlight || ''}
        </div>
      </div>

      ${
        bank.timeline
          ? `
      <div class="timeline-strip-4col">
        <div class="timeline-strip-header">
          <span>KEY CHRONOLOGY &bull; FOUR CAUSAL TURNING POINTS</span>
          <span style="font-size: 6.2pt; color: #93c5fd;">${l.code} SEQUENCE</span>
        </div>
        <div class="timeline-strip-grid">
          ${bank.timeline
            .map(
              (t) => `
            <div class="timeline-card">
              <strong class="timeline-card-title">${t.date} &bull; ${t.title}</strong>
              ${t.text}
            </div>
          `,
            )
            .join('')}
        </div>
      </div>`
          : ''
      }

      ${
        rightExam
          ? `
      <div class="exam-strategy-fullwidth-box">
        <div class="esfb-header">
          <span class="esfb-badge">EXAM STRATEGY &bull; EDEXCEL PAPER 2 (OPTION B4)</span>
          <span class="esfb-tariff">${rightExam.tariff}</span>
        </div>
        <div class="esfb-stem"><strong>Exam Challenge:</strong> ${rightExam.stem}</div>
        <div class="esfb-guidance">
          <span><strong>Specification Stimulus:</strong> ${rightExam.stimulus && rightExam.stimulus.length ? `(1) ${rightExam.stimulus[0]} &bull; (2) ${rightExam.stimulus[1]}` : 'Independent historical knowledge'} &bull; <em>Construct 3 PEEL paragraphs using precise factual evidence.</em></span>
          <span class="esfb-target">GRADE 9 STANDARD</span>
        </div>
      </div>`
          : ''
      }

      <div class="running-footer">
        <span>Early Elizabethan England, 1558–1588 &bull; Key Topic 1: Queen, Government and Religion</span>
        <span>Page ${rightPageNum}</span>
      </div>
    </div>
  </div>
`;
  });

  // ====================================================================
  // PAGE 10: SYNOPTIC MATRIX, HISTORIOGRAPHICAL DEBATE & CHRONOLOGY
  // ====================================================================
  html += `
  <div class="textbook-page" data-page="10">
    <div class="masterclass-page-layout">
      
      <div class="running-header">
        <span>EDEXCEL GCSE (9–1) HISTORY &bull; EARLY ELIZABETHAN ENGLAND, 1558–1588</span>
        <span>KEY TOPIC 1 MASTER SYNTHESIS</span>
      </div>

      <!-- Lesson Banner -->
      <div class="lesson-hero" style="margin-bottom: 4px; padding-bottom: 3px;">
        <div class="lesson-badge-strip">
          <span class="topic-badge">SYNOPTIC OVERVIEW</span>
          <span class="spec-ref-badge">KEY TOPIC 1 MASTER SYNTHESIS &bull; 1558–1569</span>
        </div>
        <h2 class="lesson-title" style="font-size: 11.5pt; margin: 1px 0;">Key Topic 1: Thematic Synoptic Matrix &amp; Historiographical Debate</h2>
        <div class="lesson-spec-anchor" style="padding: 2.5px 6px;">
          <strong>Historical Assessment:</strong> Evaluating Elizabeth's consolidation of royal authority across government, religious settlement, and dynastic security.
        </div>
      </div>

      <!-- Thematic Comparative Matrix (Core Specification Themes) -->
      <div style="border: 1.2px solid #0f172a; border-radius: 3px; overflow: hidden; background: #fff; margin-bottom: 6px;">
        <div style="background: #0f172a; color: #fff; padding: 3px 8px; font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; display: flex; justify-content: space-between;">
          <span>THEMATIC COMPARATIVE MATRIX &bull; CORE SPECIFICATION THEMES</span>
          <span>1558 CRISIS VS. 1569 REALITY</span>
        </div>
        <table class="master-chron-table" style="font-size: 6.5pt; line-height: 1.28;">
          <thead>
            <tr style="background: #1e293b; color: #ffffff;">
              <th style="width: 20%; padding: 3.5px 6px;">Thematic Dimension</th>
              <th style="width: 27%; padding: 3.5px 6px;">The Crisis in 1558</th>
              <th style="width: 28%; padding: 3.5px 6px;">Elizabeth's Strategic Mechanism</th>
              <th style="width: 25%; padding: 3.5px 6px;">The Balance Sheet by 1569</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background: #ffffff;">
              <td style="padding: 3.5px 6px; font-weight: 800; color: #0f172a;">1. Royal Legitimacy &amp; Gender</td>
              <td style="padding: 3.5px 6px;">Regarded as illegitimate by Catholic Europe; 16th-century misogynistic doctrine declared women unfit for supreme sovereignty (John Knox's <em>First Blast</em>).</td>
              <td style="padding: 3.5px 6px;">Adopted compromise title 'Supreme Governor'; weaponized marriage negotiations as diplomatic leverage; projected majestic virgin iconography.</td>
              <td style="padding: 3.5px 6px;">Royal sovereignty secured; rival court factions kept in balance; but dynastic succession left precariously unresolved.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 3.5px 6px; font-weight: 800; color: #0f172a;">2. Crown Finance &amp; Economy</td>
              <td style="padding: 3.5px 6px;">Exchequer £300,000 in debt; £100,000 owed to Antwerp financiers at punitive 14% interest; severe coinage debasement driving runaway inflation.</td>
              <td style="padding: 3.5px 6px;">Enforced rigorous austerity; sold £120,000 of Crown lands; recalled debased coinage and restored pure silver currency under Thomas Gresham.</td>
              <td style="padding: 3.5px 6px;">Antwerp debts eliminated; Crown credit rating restored; fiscal independence reduced reliance on unpredictable parliamentary subsidies.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="padding: 3.5px 6px; font-weight: 800; color: #0f172a;">3. Religious Settlement</td>
              <td style="padding: 3.5px 6px;">Nation religiously fractured: Catholic conservative North/West versus radical Protestant South-East and returning zealous Marian exiles.</td>
              <td style="padding: 3.5px 6px;">Enacted 1559 'Middle Way': Acts of Supremacy &amp; Uniformity, deliberate theological ambiguity in Book of Common Prayer, nominal 1s recusancy fine.</td>
              <td style="padding: 3.5px 6px;">Broad outward conformity achieved across 9,000 parishes; radical Puritans contained; but Catholic resistance festered beneath the surface.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 3.5px 6px; font-weight: 800; color: #0f172a;">4. Dynastic &amp; Foreign Threat</td>
              <td style="padding: 3.5px 6px;">Calais lost in 1558; France and Scotland united under the Auld Alliance; French Catholic garrisons stationed directly on northern Scottish frontier.</td>
              <td style="padding: 3.5px 6px;">Signed Treaty of Cateau-Cambrésis; dispatched naval and land forces in 1560 to enforce Treaty of Edinburgh; placed Mary Stuart in custody in 1568.</td>
              <td style="padding: 3.5px 6px;">French troops expelled from Scotland permanently; but Mary Stuart's physical presence in England galvanized domestic Catholic conspiracy.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="padding: 3.5px 6px; font-weight: 800; color: #0f172a;">5. Privy Council &amp; Patronage</td>
              <td style="padding: 3.5px 6px;">Inherited cumbersome, faction-ridden Marian Privy Council of 50 members; deep mistrust between ancient nobility and reforming administrators.</td>
              <td style="padding: 3.5px 6px;">Streamlined Council to 19 elite administrators; appointed William Cecil Principal Secretary; carefully counterbalanced Cecil against Robert Dudley.</td>
              <td style="padding: 3.5px 6px;">Created disciplined, loyal executive machinery; used monopolies and wardships strategically to bind ambitious aristocrats to the Crown.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 3.5px 6px; font-weight: 800; color: #0f172a;">6. Succession &amp; Marriage Trap</td>
              <td style="padding: 3.5px 6px;">No legitimate heir; catastrophic risk of dynastic civil war if Elizabeth died; repeated parliamentary petitions demanding marriage and an heir.</td>
              <td style="padding: 3.5px 6px;">Maintained strict Royal Prerogative over marriage; used foreign Catholic suitors (Philip II, Archduke Charles) as diplomatic pawns without commitment.</td>
              <td style="padding: 3.5px 6px;">Prevented foreign monarchical control of England; but left the Protestant realm in existential danger upon Mary Stuart's 1568 arrival.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- The 1559 Religious Settlement Comparative Matrix (6 Key Dimensions) -->
      <div style="border: 1.2px solid #0f172a; border-radius: 3px; overflow: hidden; background: #fff; margin-bottom: 6px;">
        <div style="background: #1e293b; color: #fff; padding: 3px 8px; font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; display: flex; justify-content: space-between;">
          <span>THE 1559 RELIGIOUS SETTLEMENT COMPARATIVE MATRIX</span>
          <span>CATHOLICISM VS. ELIZABETH'S VIA MEDIA VS. PURITANISM</span>
        </div>
        <table class="master-chron-table" style="font-size: 6.4pt; line-height: 1.28;">
          <thead>
            <tr style="background: #0f172a; color: #ffffff;">
              <th style="width: 20%; padding: 3px 5px;">Dimension</th>
              <th style="width: 27%; padding: 3px 5px;">Traditional Roman Catholicism</th>
              <th style="width: 27%; padding: 3px 5px;">Elizabeth's 'Via Media' (1559)</th>
              <th style="width: 26%; padding: 3px 5px;">Radical Calvinist Puritanism</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background: #ffffff; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 5px; font-weight: 800; color: #0f172a;">1. Head of the Church</td>
              <td style="padding: 3.5px 5px;">The Pope in Rome; supreme apostolic vicar of Christ; divine spiritual authority over all earthly monarchs; papal excommunication feared.</td>
              <td style="padding: 3.5px 5px; font-weight: 700; color: #1e3a8a;">'Supreme Governor' (1559 Act of Supremacy); oath required of all clergy on pain of deprivation; avoided offensive 'Supreme Head' title.</td>
              <td style="padding: 3.5px 5px;">Jesus Christ alone; earthly monarchs possess no spiritual headship; advocated presbyterian system of regional elders without bishops.</td>
            </tr>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 5px; font-weight: 800; color: #0f172a;">2. Liturgy &amp; Bible</td>
              <td style="padding: 3.5px 5px;">Traditional Latin Tridentine Mass; Latin Vulgate scripture; prayers for souls in purgatory; priest mediating between God and man.</td>
              <td style="padding: 3.5px 5px; font-weight: 700; color: #1e3a8a;">English 1559 Book of Common Prayer; Cranmer's liturgy revised to conciliate moderates; Great Bible placed in every parish church.</td>
              <td style="padding: 3.5px 5px;">Preaching-centered sermon; Geneva Bible with Calvinist marginal commentary; metrical psalm-singing; reject standardized prayer book.</td>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 5px; font-weight: 800; color: #0f172a;">3. Eucharist Doctrine</td>
              <td style="padding: 3.5px 5px;">Transubstantiation; bread and wine literally become Christ's physical body and blood through sacerdotal miracle during holy Mass.</td>
              <td style="padding: 3.5px 5px; font-weight: 700; color: #1e3a8a;">Deliberately ambiguous compromise fusing 1549 real presence words with 1552 memorialist formula to allow individual interpretation.</td>
              <td style="padding: 3.5px 5px;">Strictly spiritual memorial; transubstantiation condemned as idolatrous heresy; kneeling at communion rejected as idolatry.</td>
            </tr>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 5px; font-weight: 800; color: #0f172a;">4. Clergy &amp; Dress</td>
              <td style="padding: 3.5px 5px;">Celibate priesthood set apart from laity; ornate silk vestments, chasubles, and copes signifying sacrificial altar dignity.</td>
              <td style="padding: 3.5px 5px; font-weight: 700; color: #1e3a8a;">Clerical marriage permitted with episcopal approval; white linen surplice required in parish churches (1566 Parker's Advertisements).</td>
              <td style="padding: 3.5px 5px;">Priesthood of all believers; abolition of episcopacy ('popish rags'); plain black Genevan academic preaching gowns strictly enforced.</td>
            </tr>
            <tr style="background: #ffffff; border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3.5px 5px; font-weight: 800; color: #0f172a;">5. Church Interiors &amp; Ritual</td>
              <td style="padding: 3.5px 5px;">Stone altars, crucifixes, statues of Mary and saints, burning candles, holy water stoups, censers, stained glass windows.</td>
              <td style="padding: 3.5px 5px; font-weight: 700; color: #1e3a8a;">Wooden communion table replacing stone altar; rood screens preserved; royal arms displayed; organ polyphonic music allowed.</td>
              <td style="padding: 3.5px 5px;">Aggressive iconoclasm: whitewashed bare walls; total destruction of statues, crucifixes, organs, and idolatrous church ornaments.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 3.5px 5px; font-weight: 800; color: #0f172a;">6. Recusancy &amp; Conformity</td>
              <td style="padding: 3.5px 5px;">Papal ban on attending Protestant services on pain of mortal sin; secret Catholic masses celebrated by Marian priests in gentry houses.</td>
              <td style="padding: 3.5px 5px; font-weight: 700; color: #1e3a8a;">1559 Act of Uniformity mandated weekly attendance; 1 shilling fine for recusancy; initial royal policy of non-persecution ('no windows into men's souls').</td>
              <td style="padding: 3.5px 5px;">Demanded state prosecute Catholic recusants as traitors; held unauthorized 'prophesyings' (clergy study meetings) to train zealous ministers.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- The Historiographical Debate & Scholarship (3 Perspectives) -->
      <div style="background: #fdfcfb; border: 1.2px solid #cbd5e1; border-left: 3.5px solid #1e3a8a; padding: 5px 8px; border-radius: 3px; font-family: 'Inter', sans-serif; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
          <span style="font-size: 6.9pt; font-weight: 900; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.05em;">
            THE HISTORIOGRAPHICAL DEBATE &bull; THREE INTERPRETATIONS OF THE 1559 SETTLEMENT
          </span>
          <span style="font-size: 6.0pt; font-weight: 800; background: #1e3a8a; color: #fff; padding: 1px 5px; border-radius: 2px;">
            HISTORICAL SCHOLARSHIP
          </span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; font-size: 6.5pt; line-height: 1.28; color: #1e293b;">
          <div style="background: #eff6ff; padding: 4.5px 6px; border: 1px solid #bfdbfe; border-radius: 2px;">
            <strong style="color: #1e3a8a; display: block; margin-bottom: 1px; text-transform: uppercase; font-size: 6.2pt;">
              1. Traditional Whig (Sir John Neale, 1957):
            </strong>
            Elizabeth was a theological conservative who sought a moderate Henrician settlement without the Pope. However, she was pushed into a much more radical Protestant settlement by an organized caucus of returned Marian exiles in the Commons known as the <em>'Puritan Choir'</em>, making the 1559 Via Media a masterclass in pragmatic royal compromise.
          </div>
          <div style="background: #fdf2f8; padding: 4.5px 6px; border: 1px solid #fbcfe8; border-radius: 2px;">
            <strong style="color: #9d174d; display: block; margin-bottom: 1px; text-transform: uppercase; font-size: 6.2pt;">
              2. Revisionist (Haigh &amp; Jones, 1982):
            </strong>
            Dismantled Neale's thesis: real legislative opposition came from Marian Catholic bishops in the Lords, not Puritans in the Commons. Jones proved Elizabeth achieved the settlement she planned from the outset; Haigh demonstrated it was an enforced political armistice that alienated devout believers on both wings, merely delaying sectarian rebellion until 1569.
          </div>
          <div style="background: #f0fdf4; padding: 4.5px 6px; border: 1px solid #bbf7d0; border-radius: 2px;">
            <strong style="color: #166534; display: block; margin-bottom: 1px; text-transform: uppercase; font-size: 6.2pt;">
              3. Post-Revisionist (Collinson &amp; Doran, 1994):
            </strong>
            The Elizabethan polity functioned as an early modern 'Monarchical Republic'. Key ministers like William Cecil viewed the 1559 settlement not as an end in itself, but as the constitutional frontline of national security. Protestant magistrates saw themselves as duty-bound guardians of the Reformation against existential Catholic dynastic conspiracies.
          </div>
        </div>

        <div style="margin-top: 3px; background: #f8fafc; border-left: 2px solid #b45309; padding: 2.5px 6px; font-size: 6.3pt; color: #78350f;">
          <strong>Hinge Question for Class Discussion:</strong> <em>Did Elizabeth's religious settlement succeed because of its deliberate theological ambiguity, or did that very ambiguity sow the seeds for the Catholic rebellions of 1569–1570?</em>
        </div>
      </div>

      <!-- Comparative Policy Evaluation Matrix (4 Pillars) -->
      <div style="border: 1.2px solid #0f172a; border-radius: 3px; overflow: hidden; background: #ffffff; margin-bottom: 6px;">
        <div style="background: #1e293b; color: #ffffff; padding: 2.5px 8px; font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; display: flex; justify-content: space-between;">
          <span>COMPARATIVE POLICY SUCCESS EVALUATION &bull; 1558–1569</span>
          <span>CRITERIA-LED VERDICT</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 5px; padding: 5px 6px; font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.26;">
          <div style="background: #f8fafc; padding: 4.5px 6px; border-left: 2.5px solid #16a34a; border-radius: 2px;">
            <strong style="color: #16a34a; display: block; text-transform: uppercase;">1. Fiscal Solvency: High</strong>
            Crown debt reduced from £300,000 to zero by 1574; £100,000 Antwerp loan cleared; Crown land sales and re-coinage restored financial independence without sparking tax revolts.
          </div>
          <div style="background: #f8fafc; padding: 4.5px 6px; border-left: 2.5px solid #2563eb; border-radius: 2px;">
            <strong style="color: #2563eb; display: block; text-transform: uppercase;">2. Religious Peace: Moderate</strong>
            Averted immediate religious civil war; outward conformity secured across 9,000 parishes; but failed to reconcile zealous Puritans or conservative Catholic recusants.
          </div>
          <div style="background: #f8fafc; padding: 4.5px 6px; border-left: 2.5px solid #d97706; border-radius: 2px;">
            <strong style="color: #d97706; display: block; text-transform: uppercase;">3. Border Defence: Moderate</strong>
            Treaty of Edinburgh expelled French troops from Scotland; averted war with Spain for a decade; but Netherlands crisis began escalating dangerously by 1568.
          </div>
          <div style="background: #f8fafc; padding: 4.5px 6px; border-left: 2.5px solid #dc2626; border-radius: 2px;">
            <strong style="color: #dc2626; display: block; text-transform: uppercase;">4. Dynastic Succession: Low</strong>
            Refusal to marry or designate an heir left the realm vulnerable; Mary Stuart's 1568 arrival instantly catalyzed armed aristocratic rebellion in 1569.
          </div>
        </div>
      </div>

      <!-- Synoptic Disciplinary Assessment -->
      <div style="background: #f8fafc; border: 1.2px solid #cbd5e1; border-left: 3.5px solid #0f172a; padding: 6.5px 8px; border-radius: 2px; font-family: 'Inter', sans-serif;">
        <span style="font-size: 6.6pt; font-weight: 900; color: #0f172a; text-transform: uppercase; display: block; margin-bottom: 2px;">
          SYNOPTIC VERDICT &bull; THE DYNAMICS OF EARLY ELIZABETHAN SURVIVAL
        </span>
        <p style="font-size: 6.7pt; line-height: 1.30; color: #334155; margin: 0;">
          Between 1558 and 1569, Elizabeth transformed an impoverished, internally divided realm into a remarkably resilient sovereign state. Her greatest domestic achievements were financial discipline and theological ambiguity: by slashing Crown expenditures, retiring debased coinage, and creating an inclusive religious 'Via Media', she deprived foreign Catholic powers of an immediate pretext for holy war while preserving royal solvency without punitive parliamentary taxation. However, her deliberate refusal to marry or designate an heir left the realm hostage to fortune. The arrival of Mary, Queen of Scots in 1568 shattered this fragile equilibrium, instantly transforming latent Catholic sympathies into armed domestic rebellion and exposing the inherent vulnerability of Elizabeth's unresolved succession.
        </p>
      </div>

      <div class="running-footer">
        <span>Early Elizabethan England, 1558–1588 &bull; Key Topic 1 Master Synthesis</span>
        <span>Page 10</span>
      </div>

    </div>
  </div>

  <!-- ====================================================================
       PAGE 11: EDEXCEL PAPER 2 SECTION B EXAM MASTERCLASS
       ==================================================================== -->
  <div class="textbook-page" data-page="11">
    <div class="masterclass-page-layout">
      
      <div class="running-header">
        <span>EDEXCEL GCSE (9–1) HISTORY &bull; EARLY ELIZABETHAN ENGLAND, 1558–1588</span>
        <span>PAPER 2 SECTION B MASTERCLASS</span>
      </div>

      <!-- Exam Banner -->
      <div class="lesson-hero" style="margin-bottom: 5px; padding-bottom: 2px;">
        <div class="lesson-badge-strip">
          <span class="topic-badge">EXAM MASTERCLASS</span>
          <span class="spec-ref-badge">EDEXCEL PAPER 2 OPTION B4 &bull; 1HI0/B4</span>
        </div>
        <h2 class="lesson-title" style="font-size: 11.5pt; margin: 1px 0;">Edexcel Paper 2: Examination Strategy &amp; Exemplar Model Answers</h2>
        <div class="lesson-spec-anchor" style="padding: 2.5px 6px;">
          <strong>Official Exam Blueprint:</strong> Deconstructing Question 1(a) &amp; 1(b) Features [4m], Question 2 Causation [12m], and Question 3 Evaluative Essay [16m + 4 SPaG].
        </div>
      </div>

      <!-- Key Chronology: Eight Causal Turning Points (1558–1570) -->
      <div style="border: 1.2px solid #0f172a; border-radius: 3px; overflow: hidden; background: #ffffff; margin-bottom: 5px;">
        <div style="background: #0f172a; color: #ffffff; padding: 2.5px 8px; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif;">
          <span style="font-size: 6.6pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em;">
            KEY CHRONOLOGY: EIGHT CAUSAL TURNING POINTS (1558–1570)
          </span>
          <span style="font-size: 5.8pt; font-weight: 700; color: #93c5fd;">SPECIFICATION EVIDENCE RECALL</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; padding: 4px 5px; font-family: 'Inter', sans-serif; font-size: 6.1pt; line-height: 1.26;">
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #1e3a8a; padding: 3px 4.5px; border-radius: 2px;">
            <strong style="color: #1e3a8a; display: block;">17 Nov 1558 &bull; Accession</strong>
            Mary dies; 25-yr-old Elizabeth succeeds; appoints William Cecil Principal Secretary at Hatfield.
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #1e3a8a; padding: 3px 4.5px; border-radius: 2px;">
            <strong style="color: #1e3a8a; display: block;">15 Jan 1559 &bull; Coronation</strong>
            Westminster ceremony balances traditional Latin ritual with English Gospel reading.
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #1e3a8a; padding: 3px 4.5px; border-radius: 2px;">
            <strong style="color: #1e3a8a; display: block;">29 Apr 1559 &bull; Settlement Acts</strong>
            Acts of Supremacy &amp; Uniformity establish Church of England, Prayer Book &amp; 1s recusancy fine.
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #1e3a8a; padding: 3px 4.5px; border-radius: 2px;">
            <strong style="color: #1e3a8a; display: block;">6 Jul 1560 &bull; Treaty of Edinburgh</strong>
            French garrisons evacuate Scotland; northern frontier secured under Protestant Lords of Congregation.
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #b45309; padding: 3px 4.5px; border-radius: 2px;">
            <strong style="color: #b45309; display: block;">1566 &bull; Dutch Revolt Begins</strong>
            Protestant rebellion against Spanish rule in the Netherlands sparks decades of European religious conflict.
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #b45309; padding: 3px 4.5px; border-radius: 2px;">
            <strong style="color: #b45309; display: block;">26 Mar 1566 &bull; Advertisements</strong>
            Archbishop Parker enforces surplice conformity; 37 London Puritan ministers dismissed for non-compliance.
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #991b1b; padding: 3px 4.5px; border-radius: 2px;">
            <strong style="color: #991b1b; display: block;">16 May 1568 &bull; Mary at Workington</strong>
            Mary escapes Lochleven; lands in Cumberland seeking English refuge, unleashing 19-year dynastic crisis.
          </div>
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 2.5px solid #991b1b; padding: 3px 4.5px; border-radius: 2px;">
            <strong style="color: #991b1b; display: block;">25 Feb 1570 &bull; Regnans in Excelsis</strong>
            Pius V excommunicates Elizabeth; absolves Catholic subjects from loyalty, defining Catholicism as treason.
          </div>
        </div>
      </div>

      <!-- Question 1(a) & 1(b) Feature Masterclass [4 Marks Total] -->
      <div style="background: #f8fafc; border: 1.2px solid #cbd5e1; border-left: 3.5px solid #0284c7; padding: 4px 7px; border-radius: 3px; font-family: 'Inter', sans-serif; margin-bottom: 5.5px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #e2e8f0; padding-bottom: 1.5px; margin-bottom: 2px;">
          <span style="font-size: 6.8pt; font-weight: 900; color: #0369a1; text-transform: uppercase;">
            QUESTION 1(a) &amp; 1(b): DESCRIBE ONE FEATURE OF... [2 MARKS EACH &bull; 4 MARKS TOTAL &bull; 6 MINS]
          </span>
          <span style="font-size: 5.9pt; font-weight: 700; color: #475569;">
            Formula: 1 Mark Valid Feature + 1 Mark Supporting Detail (0 Explanation/Consequences)
          </span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
          <!-- Q1(a) -->
          <div style="background: #ffffff; padding: 3.5px 5.5px; border: 1px solid #e2e8f0; border-radius: 2px;">
            <div style="font-weight: 800; color: #0369a1; font-size: 6.3pt; margin-bottom: 1px;">
              Q1(a): Describe one feature of the 1559 Act of Supremacy. [2 marks]
            </div>
            <div style="font-size: 6.3pt; line-height: 1.28; color: #1e293b;">
              <strong>Model Answer:</strong> One feature was Elizabeth's assumption of the title <strong>'Supreme Governor'</strong> of the Church of England rather than 'Supreme Head'. <em>[1 mark for valid feature]</em> This was a deliberate political compromise designed to pacify Catholics who believed only the Pope could head Christ's Church, while reassuring Protestants who objected to a female monarch claiming spiritual headship over holy scripture. <em>[1 mark for supporting historical detail]</em>
            </div>
          </div>

          <!-- Q1(b) -->
          <div style="background: #ffffff; padding: 3.5px 5.5px; border: 1px solid #e2e8f0; border-radius: 2px;">
            <div style="font-weight: 800; color: #0369a1; font-size: 6.3pt; margin-bottom: 1px;">
              Q1(b): Describe one feature of Church of England visitations in 1559. [2 marks]
            </div>
            <div style="font-size: 6.3pt; line-height: 1.28; color: #1e293b;">
              <strong>Model Answer:</strong> One feature was that royal commissioners conducted comprehensive parish inspections to enforce the <strong>Royal Injunctions</strong> and administer the mandatory Oath of Supremacy. <em>[1 mark for valid feature]</em> While approximately 400 Marian Catholic priests refused the oath and were deprived of their livings, roughly 9,000 parish clergy swore allegiance, ensuring nationwide religious conformity and institutional stability. <em>[1 mark for supporting historical detail]</em>
            </div>
          </div>
        </div>

        <!-- Examiner Tip & Warning Box -->
        <div style="margin-top: 2.5px; background: #eff6ff; border: 1px solid #bfdbfe; padding: 2px 5px; font-size: 5.9pt; color: #1e40af; border-radius: 2px;">
          <strong>Examiner Warning:</strong> Candidates frequently lose time writing detailed explanations or consequences. For 2-mark feature questions, state the feature directly and add one precise factual statistic, date, or name. Do not explain why it happened!
        </div>
      </div>

      <!-- Question 2 Masterclass: Causation [12 Marks] -->
      <div style="background: #f8fafc; border: 1.2px solid #cbd5e1; border-left: 3.5px solid #b45309; padding: 4px 7px; border-radius: 3px; font-family: 'Inter', sans-serif; margin-bottom: 5.5px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #e2e8f0; padding-bottom: 1.5px; margin-bottom: 2px;">
          <span style="font-size: 6.8pt; font-weight: 900; color: #b45309; text-transform: uppercase;">
            QUESTION 2: EXPLAIN WHY... [12 MARKS &bull; 18 MINUTES]
          </span>
          <span style="font-size: 5.9pt; font-weight: 700; color: #475569;">
            Formula: 3 Full PEEL Paragraphs (2 Stimulus + 1 Own Knowledge) + Explicit Causal Connectives
          </span>
        </div>
        <div style="font-size: 6.4pt; font-weight: 800; color: #0f172a; margin-bottom: 2px;">
          Exam Prompt: Explain why the arrival of Mary, Queen of Scots in England in 1568 caused serious problems for Elizabeth I. You may use: (1) Dynastic claims to the throne, (2) The Catholic northern nobility. [12 marks]
        </div>
        <div style="font-size: 6.2pt; line-height: 1.27; color: #334155; display: flex; flex-direction: column; gap: 2.5px;">
          <div style="background: #ffffff; padding: 3px 5.5px; border: 1px solid #e2e8f0; border-radius: 2px;">
            <strong style="color: #b45309;">PEEL Paragraph 1 (Dynastic Legitimacy &amp; Alternative Monarch):</strong> One major reason Mary Stuart's arrival created an immediate existential crisis was her direct and indisputable dynastic claim to the English crown as Henry VII's eldest great-granddaughter. Devout Catholic opinion throughout England and Europe regarded Elizabeth as illegitimate, maintaining that Henry VIII's marriage to Anne Boleyn had never been lawful in the eyes of the Church. <em>Consequently,</em> Mary was seen by foreign Catholic princes and domestic conservatives alike as the rightful de jure Queen of England. Her physical presence in Cumberland instantly converted abstract theoretical succession disputes into an imminent mortal danger: Mary became a living, anointed monarch around whom alienated English Catholics could coalesce to depose Elizabeth through foreign-backed invasion or assassination.
          </div>
          <div style="background: #ffffff; padding: 3px 5.5px; border: 1px solid #e2e8f0; border-radius: 2px;">
            <strong style="color: #b45309;">PEEL Paragraph 2 (Domestic Feudal Discontent &amp; Northern Earls):</strong> Furthermore, Mary's arrival directly ignited acute domestic feudal discontent among the conservative Catholic aristocracy of northern England. Ancient magnates such as Thomas Percy, Earl of Northumberland, and Charles Neville, Earl of Westmorland, were already intensely disaffected by Elizabeth's centralizing Protestant regime, which had stripped them of their ancestral border wardenships and lucrative regional patronage in favour of loyal Protestant southerners like William Cecil and Lord Hunsdon. <em>As a direct result,</em> Mary's unexpected arrival provided these desperate, heavily indebted northern nobles with a charismatic Catholic alternative and a catalyst for armed action, culminating in the armed 1569 Revolt of the Northern Earls and the celebration of the traditional Latin Mass in Durham Cathedral.
          </div>
          <div style="background: #ffffff; padding: 3px 5.5px; border: 1px solid #e2e8f0; border-radius: 2px;">
            <strong style="color: #b45309;">PEEL Paragraph 3 (Own Knowledge: Foreign Encirclement &amp; The Diplomatic Trap):</strong> Crucially, Mary's presence trapped Elizabeth in an intractable international diplomatic dilemma that threatened England with foreign invasion. Mary possessed intimate dynastic alliances with the powerful French Catholic Guise faction through her mother, while King Philip II of Spain saw her as a potential instrument to restore Catholicism across the British Isles. Elizabeth faced an impossible strategic triangle: she could not restore Mary to the Scottish throne with English military force without alienating the Protestant Scottish regents who secured England's northern frontier, nor could she execute an anointed sovereign cousin without uniting Catholic Europe in a holy crusade against England. <em>Therefore,</em> indefinite detention in northern castles was an unstable holding measure that permanently invited foreign invasion and papal conspiracy.
          </div>
        </div>
        <div style="margin-top: 2.5px; background: #fffbeb; border: 1px solid #fde68a; padding: 2.5px 6px; font-size: 5.9pt; color: #92400e; border-radius: 2px; display: flex; justify-content: space-between;">
          <span><strong>Examiner Causation Strategy (Level 4):</strong> Contrast Mary Stuart's dynastic claim (underlying threat) with the acute regional grievances of the Northern Earls (immediate trigger). Candidates must explicitly link causes together.</span>
          <span style="font-weight: 800;">12/12 CRITERIA</span>
        </div>
      </div>

      <!-- Question 3 Masterclass: Evaluative Essay [16 Marks + 4 SPaG] -->
      <div style="background: #fdfaf6; border: 1.2px solid #fed7aa; border-left: 3.5px solid #991b1b; padding: 4px 7px; border-radius: 3px; font-family: 'Inter', sans-serif; margin-bottom: 5.5px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #ffedd5; padding-bottom: 1.5px; margin-bottom: 2px;">
          <span style="font-size: 6.8pt; font-weight: 900; color: #991b1b; text-transform: uppercase;">
            QUESTION 3: EVALUATIVE ESSAY [16 MARKS + 4 SPAG &bull; 25 MINUTES]
          </span>
          <span style="font-size: 5.9pt; font-weight: 700; color: #475569;">
            Level 4 Standard: 3 Balanced Factors + Criteria-Led Sustained Judgement
          </span>
        </div>
        <div style="font-size: 6.4pt; font-weight: 800; color: #0f172a; margin-bottom: 2px;">
          Exam Prompt: "The threat of foreign invasion was the most serious problem facing Elizabeth I between 1558 and 1569." How far do you agree? Explain your answer. You may use: (1) The loss of Calais (1558), (2) The arrival of Mary, Queen of Scots (1568). [16 marks + 4 SPaG]
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px; font-size: 6.1pt; line-height: 1.25; margin-bottom: 2px;">
          <div style="background: #ffffff; padding: 3.5px 5.5px; border: 1px solid #fed7aa; border-radius: 2px;">
            <strong style="color: #991b1b; display: block; text-transform: uppercase;">Factor 1: Foreign Invasion (Agree)</strong>
            Loss of Calais in January 1558 stripped England of its final continental bridgehead, leaving the southern coast vulnerable; simultaneously, the 1559 Treaty of Cateau-Cambrésis ended 65 years of Franco-Spanish war, raising the acute danger that a united Catholic Europe would mount a cross-Channel invasion against the young Protestant Queen.
          </div>
          <div style="background: #ffffff; padding: 3.5px 5.5px; border: 1px solid #fed7aa; border-radius: 2px;">
            <strong style="color: #1e3a8a; display: block; text-transform: uppercase;">Factor 2: Crown Debt &amp; Finance (Counter)</strong>
            Inherited Crown debt of £300,000, with £100,000 owed to Antwerp financiers at crushing 14% interest, meant the Crown could not afford a permanent standing army, modern artillery, or coastal fortifications without imposing crippling taxes that would incite immediate domestic rebellion.
          </div>
          <div style="background: #ffffff; padding: 3.5px 5.5px; border: 1px solid #fed7aa; border-radius: 2px;">
            <strong style="color: #0f172a; display: block; text-transform: uppercase;">Factor 3: Dynastic Legitimacy &amp; Mary (Counter)</strong>
            Mary Stuart's arrival in 1568 provided a living Catholic figurehead who quartered the English royal arms, instantly mobilizing alienated northern feudal magnates and triggering the 1569 Northern Revolt, exposing the fatal domestic vulnerability of Elizabeth's unresolved succession.
          </div>
        </div>

        <div style="background: #ffffff; padding: 3.5px 6px; border: 1px solid #fed7aa; border-radius: 2px; font-size: 6.2pt; line-height: 1.27; color: #1e293b;">
          <strong style="color: #991b1b; text-transform: uppercase; font-size: 6.2pt; display: block; margin-bottom: 1px;">Exemplar Level 4 Conclusion (Criteria-Led Sustained Judgement):</strong>
          <em>"In conclusion, while the threat of foreign invasion was undoubtedly the most catastrophic potential danger facing England, financial weakness and royal insolvency represented Elizabeth's most serious foundational problem between 1558 and 1569. When evaluating historical significance using the criterion of foundational constraint, economic solvency was the absolute prerequisite for resolving all other existential challenges: without royal revenue and credit, Elizabeth could neither mobilize military forces to deter foreign invaders nor secure domestic border defenses. Crown debt governed every diplomatic, marital, and fiscal calculation of her first decade. Furthermore, while the foreign threat was successfully contained by 1560 through the Treaty of Edinburgh and the subsequent outbreak of the French Wars of Religion, Mary Stuart's arrival in 1568 transformed the crisis from a distant external hazard into an active internal conspiracy. Therefore, while foreign invasion presented the greatest external peril, fiscal bankruptcy was the root weakness that made England profoundly vulnerable to both foreign aggression and domestic revolt."</em>
        </div>

        <!-- SPaG Mastery Box -->
        <div style="margin-top: 2.5px; background: #fffbeb; border: 1px solid #fde68a; padding: 2.5px 5.5px; font-size: 5.9pt; color: #92400e; border-radius: 2px; display: flex; justify-content: space-between;">
          <span><strong>SPaG Masterclass (+4 Marks):</strong> Spell technical terms accurately (<em>recusancy, sovereignty, prerogative, Marian exiles</em>). Use complex analytical sentences with causal connectives.</span>
          <span style="font-weight: 800;">4/4 SPaG TARGET</span>
        </div>
      </div>

      <!-- Examiner Marking Blueprint & Band Descriptors Table -->
      <div style="border: 1.2px solid #0f172a; border-radius: 3px; overflow: hidden; background: #ffffff;">
        <div style="background: #0f172a; color: #ffffff; padding: 2.5px 8px; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif;">
          <span style="font-size: 6.6pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em;">
            EDEXCEL PAPER 2 EXAMINER MARKING BLUEPRINT &amp; BAND DESCRIPTORS
          </span>
          <span style="font-size: 5.8pt; font-weight: 700; color: #93c5fd;">50 MINS: Q1 6m &bull; Q2 18m &bull; Q3 25m &bull; REV 1m</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; padding: 3px 6px; font-family: 'Inter', sans-serif; font-size: 5.9pt; line-height: 1.22;">
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 2.5px solid #16a34a; padding: 2.5px 4.5px; border-radius: 2px;">
            <strong style="color: #166534; display: block; font-size: 6.1pt; text-transform: uppercase;">Level 4 (13–16 Marks)</strong>
            <strong>Criteria-Led Evaluation:</strong> Analytical throughout; deploys line-by-line precise factual evidence; sustained judgement weighing root vs catalytic causes.
          </div>
          <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-left: 2.5px solid #2563eb; padding: 2.5px 4.5px; border-radius: 2px;">
            <strong style="color: #1e40af; display: block; font-size: 6.1pt; text-transform: uppercase;">Level 3 (9–12 Marks)</strong>
            <strong>Explanatory &amp; Balanced:</strong> Explains both stimulus points plus own knowledge; links factors to prompt, but conclusion summarizes rather than synthesizes.
          </div>
          <div style="background: #fffbeb; border: 1px solid #fde68a; border-left: 2.5px solid #d97706; padding: 2.5px 4.5px; border-radius: 2px;">
            <strong style="color: #92400e; display: block; font-size: 6.1pt; text-transform: uppercase;">Level 2 (5–8 Marks)</strong>
            <strong>Descriptive Narrative:</strong> Recounts narrative events without explicit analytical focus; unbalanced or lacks independent own knowledge beyond stimulus.
          </div>
          <div style="background: #fef2f2; border: 1px solid #fecaca; border-left: 2.5px solid #dc2626; padding: 2.5px 4.5px; border-radius: 2px;">
            <strong style="color: #991b1b; display: block; font-size: 6.1pt; text-transform: uppercase;">Level 1 (1–4 Marks)</strong>
            <strong>Basic Statements:</strong> Generalized historical assertions with significant inaccuracies; offers simple assertions without supporting factual detail.
          </div>
        </div>
      </div>

      <div class="running-footer">
        <span>Early Elizabethan England, 1558–1588 &bull; Edexcel Examination Strategy</span>
        <span>Page 11</span>
      </div>

    </div>
  </div>

  <!-- ====================================================================
       PAGE 12: MASTER BACK COVER (Matching CME Publisher Standard)
       ==================================================================== -->
  <div class="textbook-page" data-page="12">
    <div class="back-cover-layout">
      
      <!-- Top Departmental Header Bar -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 2px;" data-department-name="The History Department">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="school-brand-target" style="font-family: 'Inter', sans-serif; font-size: 11pt; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;">The History Department</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">GCSE History Revision Hub &bull; Course Textbook</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 1px; border-top: 1px solid #000; padding-top: 2px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: #222;">
            EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 2: EARLY ELIZABETHAN ENGLAND, 1558–1588
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 7.0pt; font-weight: 800;">OPTION B4 &bull; 1HI0/B4</span>
        </div>
      </div>

      <!-- Master Chronological Sequence Table (14 Key Specification Events) -->
      <div style="border: 1.5px solid #0f172a; border-radius: 4px; overflow: hidden; background: #ffffff; margin-bottom: 2.5px;">
        <div style="background: #0f172a; color: #ffffff; padding: 2.5px 8px; font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.6px; display: flex; justify-content: space-between; align-items: center;">
          <span>Key Topic 1 Chronological Sequence &bull; Turning Points (1558–1570)</span>
          <span style="font-size: 6.5pt; letter-spacing: 0.4px;">Causal Progression</span>
        </div>
        <table class="master-chron-table" style="font-size: 6.6pt; line-height: 1.25;">
          <thead>
            <tr style="background: #1e293b; color: #ffffff;">
              <th style="width: 82px; padding: 2.5px 6px;">Date</th>
              <th style="width: 145px; padding: 2.5px 6px;">Pivotal Event</th>
              <th style="padding: 2.5px 6px;">Historical Significance &amp; Causal Consequence</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background: #f8fafc;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">17 Nov 1558</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Accession of Elizabeth I</td>
              <td style="padding: 2.2px 6px;">Mary I dies; 25-year-old Elizabeth succeeds; inherits £300,000 Crown debt and French war.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">Nov 1558</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Appointment of William Cecil</td>
              <td style="padding: 2.2px 6px;">Cecil named Principal Secretary, initiating a 40-year partnership of fiscal caution and intelligence.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">15 Jan 1559</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Westminster Coronation</td>
              <td style="padding: 2.2px 6px;">Elizabeth crowned in Westminster Abbey; balances Latin Catholic ritual with English scripture.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">2 Apr 1559</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Treaty of Cateau-Cambrésis</td>
              <td style="padding: 2.2px 6px;">Peace between France and Spain; England formally surrenders Calais after two centuries of rule.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">29 Apr 1559</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Acts of Supremacy &amp; Uniformity</td>
              <td style="padding: 2.2px 6px;">Elizabeth assumes title 'Supreme Governor'; English Prayer Book made compulsory; 1s recusancy fine.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">Summer 1559</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Royal Injunctions &amp; Visitations</td>
              <td style="padding: 2.2px 6px;">57 injunctions enforce Protestant practice; royal commissioners deprive ~400 non-conforming clergy.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">6 Jul 1560</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Treaty of Edinburgh</td>
              <td style="padding: 2.2px 6px;">French troops withdraw from Scotland; northern border stabilized under Scottish Protestant lords.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">1566</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Dutch Revolt Begins</td>
              <td style="padding: 2.2px 6px;">Calvinist riots in Netherlands prompt Philip II to send the Duke of Alba’s army, raising English invasion fears.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">26 Mar 1566</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Book of Advertisements</td>
              <td style="padding: 2.2px 6px;">Archbishop Parker enforces clerical dress; 37 London Puritan ministers dismissed at Lambeth Palace.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">1567</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Duke of Alba Arrives in Netherlands</td>
              <td style="padding: 2.2px 6px;">Philip II dispatches 50,000 Spanish veterans to crush Dutch revolt, creating invasion threat across Channel.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">1568</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Douai Seminary Founded</td>
              <td style="padding: 2.2px 6px;">Cardinal William Allen establishes Douai College in Flanders to train missionary priests for England.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">16 May 1568</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Mary Stuart Lands at Workington</td>
              <td style="padding: 2.2px 6px;">Mary flees Scotland in an open fishing boat; placed in honourable English custody for 19 years.</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">Oct 1568–Jan 1569</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Conference of York</td>
              <td style="padding: 2.2px 6px;">Inquiry into Darnley's murder and Casket Letters concludes 'not proven', justifying Mary's captivity.</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="font-weight: 800; color: #1e3a8a; white-space: nowrap; padding: 2.2px 6px;">25 Feb 1570</td>
              <td style="font-weight: 700; color: #0f172a; padding: 2.2px 6px;">Papal Bull Regnans in Excelsis</td>
              <td style="padding: 2.2px 6px;">Pope Pius V excommunicates Elizabeth; frees subjects from loyalty; turns Catholicism into treason.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Core Specification Terminology & Exam Question Models (2-Column Grid) -->
      <div style="display: grid; grid-template-columns: 1fr 1.15fr; gap: 6px; margin-bottom: 2.5px;">
        
        <!-- Key Historical Concepts & Terminology -->
        <div style="border: 1.5px solid #0f172a; border-radius: 4px; padding: 4.5px 7px; background: #ffffff;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; color: #0f172a; letter-spacing: 0.4px; display: block; border-bottom: 1.5px solid #0f172a; padding-bottom: 1.5px; margin-bottom: 2.5px;">
            Key Disciplinary Terminology
          </strong>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.4pt; line-height: 1.27; color: #334155; display: flex; flex-direction: column; gap: 2px;">
            <div>&bull; <strong>Great Chain of Being:</strong> Rigid 16th-century divine hierarchy placing the monarch at the apex of all social ranks down to labourers.</div>
            <div>&bull; <strong>Royal Prerogative:</strong> Sovereign powers exclusively reserved for the Crown, including marriage, succession, religion, and foreign policy.</div>
            <div>&bull; <strong>Supreme Governor:</strong> Elizabeth's title under the 1559 Act of Supremacy, pacifying Catholic consciences while asserting Crown supremacy.</div>
            <div>&bull; <strong>Recusant:</strong> A devout Catholic who refused to attend Church of England Sunday services, paying the statutory 1-shilling fine.</div>
            <div>&bull; <strong>Royal Injunctions:</strong> 57 administrative directives in 1559 ordering English Bibles, licensing preachers, and banning pilgrimages.</div>
            <div>&bull; <strong>Vestment Controversy:</strong> 1565–66 Puritan clash over Catholic-style surplices, resulting in 37 London ministers being sacked.</div>
            <div>&bull; <strong>Douai Seminary:</strong> Training college founded in Flanders (1568) by William Allen to prepare Catholic missionary priests to enter England.</div>
            <div>&bull; <strong>Papal Bull (1570):</strong> <em>Regnans in Excelsis</em> issued by Pope Pius V excommunicating Elizabeth and ordering subjects to depose her.</div>
          </div>
        </div>

        <!-- Examination Question Structure with Concrete Specification Models -->
        <div style="border: 1.5px solid #0f172a; border-radius: 4px; padding: 4.5px 7px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #0f172a; padding-bottom: 1.5px; margin-bottom: 2.5px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; color: #0f172a; letter-spacing: 0.4px;">
              Edexcel Paper 2 Exam Framework &amp; Models
            </strong>
            <span style="font-family: 'Inter', sans-serif; font-size: 5.8pt; font-weight: 800; background: #0f172a; color: #fff; padding: 1px 4.5px; border-radius: 2px;">
              32 MARKS TOTAL &bull; 50 MINS
            </span>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.3pt; line-height: 1.25; color: #1e293b; display: flex; flex-direction: column; gap: 2.5px;">
            <div style="background: #f8fafc; border-left: 2.5px solid #0284c7; padding: 2px 4px; border-radius: 0 2px 2px 0;">
              <span style="font-weight: 800; color: #0369a1;">Q1(a) &amp; Q1(b): Describe ONE feature of... [2 + 2 = 4 Marks &bull; 6 Mins]</span><br>
              <em>Model:</em> &ldquo;Describe one feature of the 1559 Act of Supremacy.&rdquo;<br>
              <span style="color: #64748b; font-size: 5.8pt; font-weight: 600;">Formula: 1 mark valid feature + 1 mark supporting historical detail (0 explanation).</span>
            </div>
            <div style="background: #f8fafc; border-left: 2.5px solid #b45309; padding: 2px 4px; border-radius: 0 2px 2px 0;">
              <span style="font-weight: 800; color: #b45309;">Q2: Explain why... [12 Marks &bull; 18 Mins]</span><br>
              <em>Model:</em> &ldquo;Explain why the arrival of Mary Stuart caused problems for Elizabeth in 1568.&rdquo;<br>
              <span style="color: #64748b; font-size: 5.8pt; font-weight: 600;">Formula: 3 PEEL paragraphs (2 stimulus + 1 own knowledge) linked with causal connectives.</span>
            </div>
            <div style="background: #f8fafc; border-left: 2.5px solid #991b1b; padding: 2px 4px; border-radius: 0 2px 2px 0;">
              <span style="font-weight: 800; color: #991b1b;">Q3: Evaluative Essay [16 Marks + 4 SPaG &bull; 25 Mins]</span><br>
              <em>Model:</em> &ldquo;'The threat of foreign invasion was the main problem facing Elizabeth in 1558.' How far do you agree?&rdquo;<br>
              <span style="color: #64748b; font-size: 5.8pt; font-weight: 600;">Formula: 3 balanced analytical paragraphs + criteria-led sustained conclusion.</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Assessment Objectives (AO) Mastery Banner -->
      <div style="border: 1.2px solid #cbd5e1; border-radius: 3px; background: #ffffff; padding: 3px 6px; margin-bottom: 2.5px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-family: 'Inter', sans-serif; font-size: 6.2pt; line-height: 1.24;">
        <div style="border-right: 1px solid #e2e8f0; padding-right: 6px;">
          <strong style="color: #0f172a; text-transform: uppercase; font-size: 6.3pt; display: block; margin-bottom: 1px;">Assessment Objective 1 (AO1 &bull; 50%):</strong>
          Demonstrate knowledge and understanding of the key features and characteristics of the period studied, including precise dates, statistics, and statutory legislation.
        </div>
        <div>
          <strong style="color: #0f172a; text-transform: uppercase; font-size: 6.3pt; display: block; margin-bottom: 1px;">Assessment Objective 2 (AO2 &bull; 50%):</strong>
          Explain and analyse historical events and periods studied using second-order concepts (cause, consequence, change, continuity, and reaching sustained historical judgements).
        </div>
      </div>

      <!-- Interactive Digital Retrieval & Revision Hub (Full-Width Strip) -->
      <div style="border: 1.5px solid #1e3a8a; border-left: 4.5px solid #1e3a8a; border-radius: 4px; padding: 4.5px 8px; background: #f8fafc; display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 2px;">
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 1.5px;">
            <span style="background: #1e3a8a; color: #fff; font-family: 'Inter', sans-serif; font-size: 6.4pt; font-weight: 900; text-transform: uppercase; padding: 1px 5px; border-radius: 2px; letter-spacing: 0.5px;">
              Interactive Digital Retrieval Hub
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.6pt; font-weight: 800; color: #b45309; text-transform: uppercase; letter-spacing: 0.3px;">
              Key Topic 1 Knowledge Quiz &amp; Flashcards
            </span>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #1e293b; line-height: 1.27; margin-bottom: 2px;">
            Scan the QR code with any smartphone or tablet camera to launch the interactive, self-marking retrieval bank for Key Topic 1. Test your rapid recall across the Accession Crisis, 1559 Settlement, Vestment Controversy, Douai Seminaries, and Mary Stuart with instant model answers and scoring.
          </div>
          <div style="display: flex; gap: 8px; font-family: 'Inter', sans-serif; font-size: 6.0pt; font-weight: 700; color: #475569;">
            <span>&bull; 20 Specification Recall Questions</span>
            <span>&bull; Instant Self-Marking &amp; Explanations</span>
            <span>&bull; Digital Leitner Flashcard Deck</span>
          </div>
        </div>
        <div style="text-align: center; flex-shrink: 0; display: flex; flex-direction: column; align-items: center;">
          <img src="${qrDataUrl}" alt="Key Topic 1 Quiz QR" style="width: 20mm; height: 20mm; display: block; border: 1px solid #cbd5e1; border-radius: 3px; padding: 1px; background: #fff;">
          <span style="font-family: 'Inter', sans-serif; font-size: 5.6pt; font-weight: 800; text-transform: uppercase; color: #1e3a8a; margin-top: 1.5px; letter-spacing: 0.3px;">
            Scan for Mobile Quiz
          </span>
        </div>
      </div>

      <!-- Back Cover Footer -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #000; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #333; font-weight: 700;">
        <span>Paper 2: Early Elizabethan England, 1558–1588 &bull; Key Topic 1 Specification Review Index</span>
        <span>Page 12 of 12</span>
      </div>

    </div>
  </div>


</body>
</html>`;

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

  // 1. Run Automated In-Memory Layout & Typographical Balancing Engine
  console.log('⚡ Running Automated Typographical & Layout Balancer...');
  const calibrationResults = await autoCalibrateTextbook(page);
  if (calibrationResults && calibrationResults.length > 0) {
    console.log(
      `   ✅ Auto-Calibrator resolved ${calibrationResults.length} potential layout/overflow issues in memory.`,
    );
  }

  // 2. Comprehensive Space Budget & Clutter Audit
  const auditResults = await auditPageBudget(page, {
    pageSelector: '.textbook-page, .page, .a4-page',
    maxPageHeightPx: 1123,
    underflowThresholdPx: 40,
    minUtilizationPct: 85,
    maxGapAboveFooterPx: 25,
    maxInterTaskGapPx: 35,
  });

  printSpaceAuditReport(auditResults, 'eee_textbook_KT1_PUBLISHER.html');

  if (auditResults.hasErrors) {
    console.warn('⚠️ Warning: Some layout tolerances exceeded; review audit report above.');
  } else {
    console.log('🎉 AUDIT PASSED: 100% clean across all 12 pages in A4!');
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
