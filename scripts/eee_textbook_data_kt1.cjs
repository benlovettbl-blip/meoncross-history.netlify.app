/**
 * eee_textbook_data_kt1.cjs
 *
 * Publisher-Grade Textbook Data Module for Early Elizabethan England (1558–1588)
 * Key Topic 1: Queen, Government & Religion, 1558–1569
 *
 * Grounded in the official Pearson Edexcel GCSE (9–1) History Specification (1HI0/B4)
 * and extracted directly from the Pearson Student Book and Revision Guide.
 */

module.exports = function getKt1Data(helpers) {
  const { getBase64Image } = helpers;

  const coverConfig = {
    ktId: 'KT1',
    topicNumber: 1,
    title: 'Queen, Government & Religion, 1558–1569',
    subtitle:
      'Pearson Edexcel GCSE (9–1) History &bull; Paper 2 Option B4 (1HI0/B4) &bull; Key Topic 1 Master Textbook',
    enquiry:
      'How did an inexperienced, contested queen establish her royal authority, construct a religious compromise, and secure an isolated England between 1558 and 1569?',
    coverImage: 'images/elizabeth_coronation_robes.jpg',
    caption:
      'Plate I: Queen Elizabeth I in Coronation Robes (c. 1559), enthroned in cloth of gold bearing the orb and sceptre, symbolising sovereign majesty and the restoration of royal independence.',
    specTopics: [
      {
        num: 1,
        title: '1. The Situation on Accession (1558)',
        bullets: [
          'Elizabethan society and government: Great Chain of Being, Royal Court, Privy Council, and Parliament.',
          'The Virgin Queen: legitimacy doubts, sixteenth-century gender prejudices, and the political dilemma of marriage.',
          'Challenges at home and abroad: £300,000 Crown debt, debasement, loss of Calais, and the Franco-Scottish Auld Alliance.',
        ],
      },
      {
        num: 2,
        title: '2. The Settlement of Religion (1559)',
        bullets: [
          'Religious divisions in 1558: Catholic North/West vs. Protestant South-East, and the Marian legacy.',
          'The 1559 Settlement legislation: Act of Supremacy (Supreme Governor), Act of Uniformity, and the Book of Common Prayer.',
          'Royal Injunctions, episcopal visitations, and the Church of England as an engine of social order and control.',
        ],
      },
      {
        num: 3,
        title: '3. Challenges to the Settlement',
        bullets: [
          'The Puritan challenge: theological opposition, the Crucifix Controversy, and the 1566 Vestment Controversy.',
          'The Catholic challenge: recusancy among the northern nobility, the 1566 Papal decree, and foreign Counter-Reformation.',
          'The Papal Bull (1570): *Regnans in Excelsis*, excommunication, and the legislative shift to treason (1571 Treasons Act).',
        ],
      },
      {
        num: 4,
        title: '4. Mary, Queen of Scots (1568–69)',
        bullets: [
          'Mary Stuart’s dynastic pedigree, Scottish political collapse (Darnley’s murder, Bothwell), and 1568 flight to Workington.',
          'The Conference of York (1568–69): investigation into the Casket Letters and Elizabeth’s verdict of "not proven".',
          'Elizabeth’s strategic dilemma: the risk of captive legitimacy vs. the gathering storm of Catholic aristocratic rebellion.',
        ],
      },
    ],
  };

  const EEE_COMPONENT_BANK = {
    // Page 3: KT 1.1 (Accession 1558)
    p3: {
      keyFigure: {
        name: 'Sir William Cecil',
        lifespan: '1520–1598',
        role: "Principal Secretary of State & Queen's Chief Minister (later 1st Baron Burghley)",
        significance:
          "Elizabeth's most trusted political confidant, serving as Secretary of State from 1558 to 1572 and Lord High Treasurer from 1572 until his death. He masterminded the 1559 Religious Settlement, stabilized Crown finances, and coordinated state intelligence.",
        actions: [
          "Appointed Principal Secretary on Elizabeth's accession day in November 1558, drafting her initial proclamations and governing directives.",
          'Steered the contentious Acts of Supremacy and Uniformity through a resistant House of Lords in the spring Parliament of 1559.',
          'Consistently urged Elizabeth to execute Mary, Queen of Scots, prioritize fiscal prudence, and construct a Protestant alliance against Catholic Spain.',
        ],
        image: getBase64Image('units/eee/assets/portraits/william_cecil.jpg'),
      },
      conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">CORE STRATEGIC MECHANISM</span>
          <span class="csb-category">POLITICAL PRAGMATISM &bull; 1558</span>
        </div>
        <h4 class="csb-title">The Marriage Dilemma: Pros vs. Cons of the Royal Match</h4>
        <div class="csb-body">
          In sixteenth-century Europe, marriage was the primary instrument for securing dynastic succession and cementing foreign alliances. Yet for Elizabeth, marriage posed an existential constitutional trap:
          <ul style="margin: 3px 0 3px 14px; padding: 0; font-size: 7.1pt; line-height: 1.3;">
            <li><strong>Foreign Prince (e.g. Philip II of Spain, Prince Eric of Sweden):</strong> Would provide military protection and diplomatic weight, but risked dragging England into costly foreign wars and subordinating national interests to a foreign crown (as occurred under Mary I).</li>
            <li><strong>English Nobleman (e.g. Robert Dudley, Earl of Leicester):</strong> Would avert foreign domination, but would inevitably trigger ferocious factional jealousy and aristocratic civil war among rival court families like the Howards and Cecils.</li>
            <li><strong>The Celibate 'Virgin Queen':</strong> Preserved sovereign independence and absolute political control, but left England without a direct Protestant heir, inviting dynastic plots and foreign invasion.</li>
          </ul>
        </div>
        <div class="csb-takeaway">
          <strong>Strategic Legacy:</strong> Elizabeth exploited marriage negotiations as diplomatic bait for twenty-five years, stringing along foreign suitors to buy peace while permanently maintaining her sovereign independence.
        </div>
      </div>
      `,
      timeline: [
        {
          date: '17 Nov 1558',
          title: 'Accession of Elizabeth I',
          text: 'Mary I dies; 25-yr-old Elizabeth succeeds at Hatfield; appoints William Cecil Principal Secretary.',
        },
        {
          date: 'Nov 1558',
          title: 'Sovereign Debt Crisis',
          text: 'Exchequer inherits £300,000 debt; £100,000 owed to Antwerp financiers at crushing 14% interest.',
        },
        {
          date: '15 Jan 1559',
          title: 'Westminster Coronation',
          text: 'Coronation ceremony balances Latin Catholic ritual with English Gospel reading.',
        },
        {
          date: 'Apr 1559',
          title: 'Peace of Cateau-Cambrésis',
          text: 'Treaty ends Franco-Spanish war; Calais lost, leaving Protestant England defenceless and isolated.',
        },
      ],
      bottomEnquiry: {
        q1: 'Identify two reasons why the loss of Calais under the Treaty of Cateau-Cambrésis (1559) was viewed as a national humiliation.',
        q2: "Explain why Henry VIII's divorce from Catherine of Aragon in 1533 created an ongoing crisis of legitimacy for Elizabeth in 1558.",
        q3: "Evaluate whether Elizabeth's most urgent challenge on accession was financial insolvency or the Franco-Scottish military threat.",
      },
    },

    // Page 5: KT 1.2 (The Settlement of Religion, 1559)
    p5: {
      keyFigure: {
        name: 'Matthew Parker',
        lifespan: '1504–1575',
        role: 'Archbishop of Canterbury (1559–1575)',
        significance:
          "Appointed Archbishop of Canterbury by Elizabeth in 1559 to implement and defend the 'Middle Way'. A moderate Protestant scholar who had served as Anne Boleyn's chaplain, Parker provided intellectual stability and enforced clerical discipline during the Vestment Controversy.",
        actions: [
          'Consecrated Archbishop in December 1559, supervising the restructuring of the Church of England after the Marian restoration.',
          'Helped guide the passage of the 1559 Acts of Supremacy and Uniformity, establishing the theological framework of the Church of England.',
          "Issued the 1566 'Book of Advertisements' enforcing uniform clerical dress, firmly dismissing 37 London Puritan clergy who refused to comply.",
        ],
        image: getBase64Image('units/eee/assets/portraits/elizabeth_i.jpg'),
      },
      conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">CORE SPECIFICATION THEME</span>
          <span class="csb-category">THE VIA MEDIA &bull; 1559</span>
        </div>
        <h4 class="csb-title">The 1559 Settlement: Strategic Compromise Matrix</h4>
        <div class="csb-body">
          Elizabeth’s 'Middle Way' was designed to establish national conformity while avoiding religious persecution that could trigger civil war:
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 3px; font-size: 6.8pt; line-height: 1.28;">
            <div style="background: #eff6ff; padding: 4px 6px; border-left: 2px solid #1e3a8a; border-radius: 2px;">
              <strong style="color: #1e3a8a; text-transform: uppercase;">Protestant Victories:</strong>
              <br>&bull; English Book of Common Prayer mandatory in all parishes.
              <br>&bull; Monasteries dissolved; Catholic shrines and pilgrimages banned.
              <br>&bull; Royal Supremacy restored; papal authority formally abolished.
              <br>&bull; Clergy permitted to marry with episcopal permission.
            </div>
            <div style="background: #fdf2f8; padding: 4px 6px; border-left: 2px solid #9d174d; border-radius: 2px;">
              <strong style="color: #9d174d; text-transform: uppercase;">Catholic Concessions:</strong>
              <br>&bull; Title changed to 'Supreme Governor' (reassuring Catholic consciences).
              <br>&bull; Priests wore traditional Catholic vestments (surplice/cope).
              <br>&bull; Communion wording deliberately ambiguous regarding transubstantiation.
              <br>&bull; Modest recusancy fine of 1 shilling per missed Sunday service.
            </div>
          </div>
        </div>
        <div class="csb-takeaway">
          <strong>Strategic Legacy:</strong> The Settlement prioritized political outward obedience over private conscience, successfully securing national order for a decade before foreign papal intervention escalated tensions.
        </div>
      </div>
      `,
      timeline: [
        {
          date: 'Feb 1559',
          title: 'Parliamentary Resistance',
          text: 'Catholic bishops in House of Lords reject initial supremacy bills; Elizabeth prorogues parliament.',
        },
        {
          date: 'Apr 1559',
          title: 'Settlement Acts Passed',
          text: 'Acts of Supremacy & Uniformity pass Lords by 3 votes; establishes Supreme Governor & Prayer Book.',
        },
        {
          date: 'Summer 1559',
          title: 'Royal Visitations',
          text: 'Royal commissioners tour 9,000 parishes to enforce Oath of Supremacy; ~400 Marian priests deprived.',
        },
        {
          date: 'Dec 1559',
          title: 'Parker Consecrated',
          text: "Anne Boleyn's chaplain Matthew Parker consecrated Archbishop of Canterbury to lead Church.",
        },
      ],
      bottomEnquiry: {
        q1: 'What specific change in royal title was introduced by the 1559 Act of Supremacy, and why was it significant?',
        q2: 'Explain why the Church of England served as the Crown’s primary instrument of social control in rural parishes.',
        q3: 'Assess how far the 1559 Religious Settlement achieved its goal of creating a broadly accepted national church.',
      },
    },

    // Page 7: KT 1.3 (Challenges to the Settlement)
    p7: {
      keyFigure: {
        name: 'Pope Pius V',
        lifespan: '1504–1572',
        role: 'Bishop of Rome & Supreme Pontiff of the Roman Catholic Church (1566–1572)',
        significance:
          "A fierce inquisitor and leader of the Counter-Reformation who hardened the Catholic Church's stance against Protestant monarchs. In 1570, he issued the fateful Papal Bull *Regnans in Excelsis*, decisively transforming English Catholic dissent into political treason.",
        actions: [
          'Enforced the decrees of the Council of Trent, demanding total Catholic separation from Protestant church services and rituals.',
          'Issued the Papal Bull *Regnans in Excelsis* on 25 February 1570, declaring Elizabeth a heretic and excommunicating her from the Church.',
          'Explicitly absolved English Catholics of their oath of allegiance to the Crown, declaring that obeying Elizabeth was a mortal sin.',
        ],
        image: getBase64Image('units/eee/assets/portraits/pius_v.jpg'),
      },
      conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">CRITICAL TURNING POINT</span>
          <span class="csb-category">PAPAL DIPLOMACY &bull; 1570</span>
        </div>
        <h4 class="csb-title">The Mutation of Catholic Dissent: Faith to High Treason</h4>
        <div class="csb-body">
          Before 1570, Elizabeth tolerated Catholic recusants who quietly paid their 1-shilling fines, famously refusing to "make windows into men's souls." The 1570 Papal Bull shattered this compromise:
          <ul style="margin: 3px 0 3px 14px; padding: 0; font-size: 7.1pt; line-height: 1.3;">
            <li><strong>The Papal Dilemma:</strong> English Catholics were placed in an impossible moral double-bind: obedience to their Queen meant eternal damnation by the Pope, while obedience to the Pope made them traitors liable to horrific execution.</li>
            <li><strong>The Treasons Act (1571):</strong> Parliament responded swiftly by making it high treason to possess or publish papal bulls, describe Elizabeth as a heretic, or attempt to convert English subjects to Rome.</li>
            <li><strong>Geopolitical Justification:</strong> Foreign Catholic monarchs (Philip II of Spain and the French Guise faction) now possessed explicit spiritual sanction to assassinate Elizabeth and invade England.</li>
          </ul>
        </div>
        <div class="csb-takeaway">
          <strong>Strategic Legacy:</strong> *Regnans in Excelsis* backfired on English Catholics: instead of rallying the populace to rebellion, it unified patriotic English Protestants and forced the Elizabethan state to criminalize Catholic practice.
        </div>
      </div>
      `,
      timeline: [
        {
          date: 'July 1560',
          title: 'Treaty of Edinburgh',
          text: 'French troops withdraw from Scotland; Mary Stuart’s claim to the English throne is formally blocked.',
        },
        {
          date: 'Mar 1566',
          title: "Parker's Advertisements",
          text: 'Archbishop enforces surplice vestments; 37 London Puritan ministers dismissed for non-compliance.',
        },
        {
          date: '1568',
          title: 'Douai Seminary Founded',
          text: 'William Allen establishes English Catholic college in Flanders to train missionary priests.',
        },
        {
          date: '25 Feb 1570',
          title: 'Regnans in Excelsis',
          text: 'Pope Pius V excommunicates Elizabeth; absolves subjects of allegiance, making Catholicism treason.',
        },
      ],
      bottomEnquiry: {
        q1: 'State two features of the 1566 Vestment Controversy between Elizabeth and Puritan clergy.',
        q2: 'Explain why the 1570 Papal Bull fundamentally altered the legal position of English Catholics.',
        q3: 'Evaluate whether the Puritan challenge or the Catholic challenge posed the greater danger to Elizabeth between 1559 and 1569.',
      },
    },

    // Page 9: KT 1.4 (The Problem of Mary, Queen of Scots)
    p9: {
      keyFigure: {
        name: 'Mary Stuart (Mary, Queen of Scots)',
        lifespan: '1542–1587',
        role: 'Queen of Scotland (1542–1567) & Catholic Claimant to the English Throne',
        significance:
          "Elizabeth's first cousin once removed, granddaughter of Henry VIII's sister Margaret Tudor, and legitimate Catholic heir presumptive. Her arrival in England in 1568 in an open fishing boat triggered a permanent dynastic and security crisis that plagued Elizabeth for nearly two decades.",
        actions: [
          'Claimed the English crown upon Mary I’s death in 1558, quartering the royal arms of England with those of France and Scotland.',
          'Forced to abdicate the Scottish throne at Lochleven Castle in 1567 following the scandalous murder of Darnley and marriage to Bothwell.',
          'Escaped to England in May 1568, where she remained in honourable English custody for 19 years until her execution at Fotheringhay in 1587.',
        ],
        image: getBase64Image('units/eee/assets/portraits/mary_qos.jpg'),
      },
      conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">CONSTITUTIONAL IMPASSE</span>
          <span class="csb-category">DIPLOMATIC CRISIS &bull; 1568</span>
        </div>
        <h4 class="csb-title">Elizabeth's Four Fatal Options Regarding Mary Stuart</h4>
        <div class="csb-body">
          When Mary landed at Workington in May 1568, Elizabeth faced four equally dangerous constitutional choices:
          <ul style="margin: 3px 0 3px 14px; padding: 0; font-size: 7.1pt; line-height: 1.3;">
            <li><strong>Option A: Restore Mary to Scotland with an English Army:</strong> Would uphold the divine right of anointed monarchs, but would alienate Scotland's Protestant regents and replace friendly allies with a hostile Catholic regime.</li>
            <li><strong>Option B: Exile Mary to France:</strong> Would remove the immediate problem from England, but would allow Mary to rally French royal forces and organize a Catholic invasion fleet across the Channel.</li>
            <li><strong>Option C: Grant Mary Free Passage in England:</strong> Would enable her to tour the Catholic northern counties, meeting disgruntled nobility and actively rallying support to depose Elizabeth.</li>
            <li><strong>Option D: Keep Mary in Indefinite English Captivity:</strong> Avoided foreign war and immediate rebellion, but turned Mary into a permanent living martyr and figurehead for endless domestic plots.</li>
          </ul>
        </div>
        <div class="csb-takeaway">
          <strong>Strategic Legacy:</strong> Elizabeth chose Option D. By keeping Mary captive under the Earl of Shrewsbury, she preserved temporary peace while unwittingly constructing the catalyst for nineteen years of continuous assassination plots.
        </div>
      </div>
      `,
      timeline: [
        {
          date: '10 Feb 1567',
          title: "Kirk o'Field Murder",
          text: "Mary's husband Lord Darnley murdered; Mary scandalously marries suspected assassin Bothwell.",
        },
        {
          date: '24 Jul 1567',
          title: 'Lochleven Abdication',
          text: "Scottish Protestant lords force Mary's abdication in favour of infant son King James VI.",
        },
        {
          date: '16 May 1568',
          title: 'Flight to Workington',
          text: 'Mary escapes Lochleven, crosses Solway Firth, and lands in Cumberland seeking English sanctuary.',
        },
        {
          date: 'Dec 1568',
          title: 'Conference of York',
          text: "Investigation into Casket Letters; Elizabeth delivers 'not proven' verdict to keep Mary captive.",
        },
      ],
      bottomEnquiry: {
        q1: 'State two features of the 1568–69 Conference of York and the investigation into the Casket Letters.',
        q2: 'Explain why Mary Stuart’s arrival in England in May 1568 placed Elizabeth in an impossible diplomatic dilemma.',
        q3: 'Assess how far the problem of Mary, Queen of Scots destabilized Elizabethan England in the late 1560s.',
      },
    },
  };

  const EEE_LEFT_SOURCES = {
    p2: {
      sourceA: {
        title: 'Source A: Queen Elizabeth’s Hatfield Speech to her Council',
        type: 'Official Sovereign Address',
        date: '20 November 1558',
        quote:
          'The law of nature moveth me to sorrow for my sister; the burden that is fallen upon me maketh me amazed... I mean to direct all my actions by good advice and counsel. And therefore I shall require of you all nothing more but to be faithful assistants unto me, that I with my ruling and you with your service may make a good account to almighty God and leave some comfort to our posterity on earth.',
        context:
          'Delivered by the twenty-five-year-old Elizabeth at Hatfield House immediately following Mary I’s death, signaling her intention to govern through broad conciliar consensus rather than autocracy.',
        hingeQuestion:
          'How did Elizabeth’s pledge to take "good advice and counsel" help reassure both conservative Catholic and reforming Protestant peers after the instability of Mary I’s reign?',
      },
      sourceB: {
        title: 'Source B: Spanish Ambassador’s Diplomatic Dispatch',
        type: 'Confidential Diplomatic Report',
        date: 'December 1558',
        quote:
          'The new Queen is a very vain and clever woman. She must have been thoroughly schooled in the manner in which her father conducted his government... She is determined to be governed by no one. She is very much attached to the common people and is confident that they are all on her side, which is indeed true. The realm is in great debt and defenceless, yet she carries herself with sovereign pride.',
        context:
          'Confidential dispatch from the Count of Feria to King Philip II of Spain, astutely assessing Elizabeth’s intellect, popular support, and determination to maintain English sovereign independence.',
        hingeQuestion:
          'Why did foreign ambassadors view Elizabeth’s immense popularity among ordinary Englishmen as her greatest shield against aristocratic factionalism?',
      },
    },
    p4: {
      sourceA: {
        title: 'Source A: From the 1559 Act of Supremacy',
        type: 'Enacted Parliamentary Statute (1 Eliz. 1 c. 1)',
        date: 'April 1559',
        quote:
          'No foreign prince, person, prelate, state or potentate, spiritual or temporal, shall at any time use, enjoy or exercise any manner of power, jurisdiction, superiority, authority, pre-eminence or privilege, spiritual or ecclesiastical, within this realm... And that your Highness, your heirs and successors, shall be the only Supreme Governor of this realm in all spiritual and ecclesiastical things.',
        context:
          'The landmark constitutional statute abolishing papal jurisdiction in England and establishing the Queen as "Supreme Governor" rather than "Supreme Head".',
        hingeQuestion:
          'What practical theological compromise was achieved by substituting "Supreme Governor" for "Supreme Head", and why was this crucial for securing moderate Catholic acquiescence?',
      },
      sourceB: {
        title: 'Source B: From Queen Elizabeth’s Royal Injunctions',
        type: 'Crown Executive Orders to Clergy',
        date: 'July 1559',
        quote:
          'All monuments of feigned miracles, pilgrimages, idolatry, and superstition shall be utterly taken away and destroyed, so that there remain no memory of the same in walls, glass windows, or elsewhere within their churches... Every parson, vicar, and curate shall provide one book of the whole Bible of the largest volume in English, to be set up in some convenient place within the church.',
        context:
          'Official directives delivered by royal commissioners visiting all 9,000 parish churches to eliminate Catholic superstition while mandating the English Bible.',
        hingeQuestion:
          'How did the Royal Injunctions balance Protestant demands for vernacular scripture with Elizabeth’s desire to maintain liturgical dignity and avoid violent iconoclasm?',
      },
    },
    p6: {
      sourceA: {
        title: 'Source A: Pope Pius V’s Papal Bull Regnans in Excelsis',
        type: 'Papal Bull of Excommunication',
        date: '25 February 1570',
        quote:
          'We do out of the fullness of our Apostolic power declare the aforesaid Elizabeth to be a heretic and favourer of heretics... And we declare her to be deprived of her pretended title to the aforesaid crown, and of all lordship, dignity, and privilege. And we also declare all nobles, subjects, and peoples of the said kingdom absolved from any oath of fidelity and obedience to her.',
        context:
          'The papal decree excommunicating Elizabeth and commanding all Catholic subjects to depose her on pain of anathema, directly triggering the 1571 Treasons Act.',
        hingeQuestion:
          'Why did Pope Pius V’s release of this bull inadvertently endanger English Catholics by making religious loyalty appear synonymous with treason against the Crown?',
      },
      sourceB: {
        title: 'Source B: London Puritan Petition Against Clerical Vestments',
        type: 'Calvinist Clerical Petition to Parliament',
        date: '1566',
        quote:
          'These popish garments, the surplice and the cope, are the badges of idolatry and the livery of the Antichrist. They were invented by the Church of Rome to deck out superstitious priests at their idolatrous Mass. How can a faithful minister of Jesus Christ clothe himself in the defiled garments of the Pope while preaching the pure Gospel of truth to the flock?',
        context:
          'Radical Protestant protest against Archbishop Parker’s Book of Advertisements, which mandated that all parish clergy wear the white linen surplice.',
        hingeQuestion:
          'Why was Elizabeth so inflexible on enforcing uniform clerical vestments, even though she was willing to tolerate private theological reservations?',
      },
    },
    p8: {
      sourceA: {
        title: 'Source A: Mary Stuart’s Letter to Elizabeth from Carlisle',
        type: 'Personal Sovereign Correspondence',
        date: '28 May 1568',
        quote:
          'I entreat you to send for me as soon as possible, for I am in a pitiable condition, not only for a Queen, but for a gentlewoman, having nothing in the world but the clothes on my back in which I escaped... I have fled to you, my nearest kinswoman and fellow sovereign, trusting entirely in your honour and royal promise to aid and restore me to my rightful throne.',
        context:
          'Written by Mary Stuart immediately following her escape across the Solway Firth into Cumberland, seeking English military intervention to regain Scotland.',
        hingeQuestion:
          'Why did Mary Stuart’s status as an anointed, captive monarch make it impossible for Elizabeth to either restore her by armed force or put her on public trial?',
      },
      sourceB: {
        title: 'Source B: Sir William Cecil’s State Paper on Mary Stuart',
        type: 'Confidential Privy Council Memorandum',
        date: 'June 1568',
        quote:
          'If she remain in England, she will be a constant firebrand. The papists will flock to her; the disaffected nobility will look to her as their rising sun. While she lives and is present in the realm, Her Majesty cannot be safe from assassination or rebellion, for Mary claims the right to wear the English crown today, not after Her Majesty’s death.',
        context:
          'Principal Secretary William Cecil’s urgent warning to the Privy Council that Mary’s physical presence in England would serve as a permanent magnet for Catholic treason.',
        hingeQuestion:
          'How accurately did Cecil’s prophetic memorandum anticipate the outbreak of the 1569 Revolt of the Northern Earls and subsequent Catholic plots?',
      },
    },
  };

  const EEE_LEFT_VOCAB = {
    p2: [
      {
        term: 'Great Chain of Being',
        def: 'The rigid sixteenth-century social hierarchy established by God, dictating that every person held a fixed, unquestioned rank from monarch down to landless labourer.',
      },
      {
        term: 'Royal Patronage',
        def: 'The grant of titles, offices, lands, and trading monopolies by the monarch to secure political loyalty, manage court factions, and maintain nationwide obedience.',
      },
      {
        term: 'Privy Council',
        def: 'A select body of approximately 19 trusted aristocratic advisers who met multiple times weekly to supervise day-to-day administration, finance, and foreign policy.',
      },
      {
        term: 'Royal Prerogative',
        def: 'Exclusive sovereign powers belonging solely to the Crown, including the right to decide foreign policy, declare war, and forbid parliamentary debate on religion or succession.',
      },
    ],
    p4: [
      {
        term: 'Supreme Governor',
        def: 'The compromise title assumed by Elizabeth in the 1559 Act of Supremacy, appeasing Catholics who believed only Christ or the Pope could be Supreme Head of the Church.',
      },
      {
        term: 'Act of Uniformity',
        def: 'The 1559 law establishing a single, compulsory form of national worship, enforcing the Book of Common Prayer and imposing a 1-shilling fine on recusants.',
      },
      {
        term: 'Recusant',
        def: 'A devout Catholic who refused to attend Church of England Sunday services, choosing to practice the Roman faith in secret and pay recurring financial penalties.',
      },
      {
        term: 'Royal Injunctions',
        def: 'A set of 57 royal administrative instructions issued in 1559, ordering English Bibles in parishes, banning pilgrimages, and mandating preacher licenses.',
      },
    ],
    p6: [
      {
        term: 'Vestment Controversy',
        def: 'The 1565–66 dispute where radical Puritan clergy refused to wear Catholic-style surplices and copes, resulting in the sacking of 37 London ministers by Archbishop Parker.',
      },
      {
        term: 'Puritan',
        def: 'A committed, radical Protestant who believed Elizabeth’s 1559 settlement was an incomplete compromise, seeking to completely purify the Church of popish ceremonies and bishops.',
      },
      {
        term: 'Counter-Reformation',
        def: 'The aggressive global campaign launched by the Catholic Papacy and Council of Trent to stamp out Protestant heresy and reclaim England and Europe for Rome.',
      },
      {
        term: 'Papal Bull',
        def: 'An official formal decree with a lead seal issued by the Pope. In 1570, *Regnans in Excelsis* excommunicated Elizabeth and ordered her subjects to rebel.',
      },
    ],
    p8: [
      {
        term: 'Heir Presumptive',
        def: 'The person dynastically entitled to inherit the crown if the reigning monarch dies without direct legitimate offspring (Mary Stuart held this claim from 1558).',
      },
      {
        term: 'Casket Letters',
        def: 'A collection of eight French love letters and sonnets allegedly written by Mary Stuart to Bothwell, presented as evidence of her complicity in Darnley’s murder.',
      },
      {
        term: 'Conference of York',
        def: 'The 1568–69 judicial enquiry convened by Elizabeth to examine the Scottish charges against Mary Stuart, concluding with an ambiguous verdict of "not proven".',
      },
      {
        term: 'Anointed Monarch',
        def: 'A ruler consecrated by holy oil in a church coronation, believed to rule by Divine Right, making their trial, deposition, or execution a grave spiritual sin.',
      },
    ],
  };

  const backCoverData = {
    quizzes: [
      {
        code: 'KT 1.1',
        title: 'Accession & Government (1558)',
        url: 'https://the-history-revision-hub.netlify.app/?unit=eee&quiz=true&lesson=1',
      },
      {
        code: 'KT 1.2',
        title: 'The Religious Settlement (1559)',
        url: 'https://the-history-revision-hub.netlify.app/?unit=eee&quiz=true&lesson=2',
      },
      {
        code: 'KT 1.3',
        title: 'Puritan & Catholic Challenges',
        url: 'https://the-history-revision-hub.netlify.app/?unit=eee&quiz=true&lesson=3',
      },
      {
        code: 'KT 1.4',
        title: 'Mary, Queen of Scots (1568–69)',
        url: 'https://the-history-revision-hub.netlify.app/?unit=eee&quiz=true&lesson=4',
      },
    ],
  };

  return {
    coverConfig,
    componentBank: EEE_COMPONENT_BANK,
    leftSources: EEE_LEFT_SOURCES,
    leftVocab: EEE_LEFT_VOCAB,
    backCoverData,
  };
};
