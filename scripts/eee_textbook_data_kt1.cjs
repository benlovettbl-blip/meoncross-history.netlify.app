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
          'Drafted the Thirty-Nine Articles of Religion (1563), establishing the theological doctrine of the reformed Church of England.',
          "Issued the 1566 'Book of Advertisements' enforcing uniform clerical dress, firmly dismissing 37 London Puritan clergy who refused to comply.",
        ],
        image: getBase64Image('units/eee/assets/portraits/elizabeth_i.jpg'),
      },
      conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">DISCIPLINARY SYNTHESIS</span>
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
        title: 'Source A: The Queen in Parliament',
        type: 'Sixteenth-Century Engraving',
        date: 'c. 1580s',
        image: getBase64Image('units/eee/assets/portraits/elizabeth_i.jpg'),
        context:
          'This contemporary engraving illustrates Elizabeth I enthroned above the Lords Spiritual, Lords Temporal, and Commons. While the monarch sat at the apex of government, parliamentary consent was constitutionally mandatory to grant extraordinary subsidies (taxation) and pass enforceable statutes.',
        hingeQuestion:
          'Why did Elizabeth jealously protect her "Royal Prerogative" against parliamentary debate, and which specific topics did she strictly forbid MPs from discussing?',
      },
      sourceB: {
        title: 'Source B: Religious Geography of Europe (1558)',
        type: 'Geopolitical Cartographic Map',
        date: '1558',
        image: getBase64Image('images/religious_divide.jpg'),
        context:
          'A strategic overview showing Europe divided into Catholic superpowers (Spain, France, Papal States) and reformed Protestant territories (Scandinavia, German principalities, Switzerland). Following the 1559 Treaty of Cateau-Cambrésis, England stood diplomatically isolated and militarily vulnerable.',
        hingeQuestion:
          'How did the end of the Habsburg-Valois wars between Spain and France in 1559 dramatically heighten the danger of Catholic invasion facing Elizabeth?',
      },
    },
    p4: {
      sourceA: {
        title: 'Source A: The 1559 Act of Supremacy',
        type: 'Statute Roll & Title Plate',
        date: 'April 1559',
        image: getBase64Image('images/act_of_supremacy.jpg'),
        context:
          'The opening declaration of the 1559 Elizabethan settlement. By adopting the style "Supreme Governor of this Realm as well in all Spiritual or Ecclesiastical Things" rather than Henry VIII’s "Supreme Head", Elizabeth offered deliberate conciliation to Catholic consciences while asserting total crown control over the Church.',
        hingeQuestion:
          'What practical difference in theological perception was achieved by replacing the word "Head" with "Governor", and why was this crucial for securing moderate Catholic acquiescence?',
      },
      sourceB: {
        title: 'Source B: The 1559 Book of Common Prayer',
        type: 'Official Liturgical Text',
        date: '1559',
        image: getBase64Image('units/eee/assets/banners/kt1_eee_banner.png'),
        context:
          'The mandatory prayer book compiled under the Act of Uniformity. It blended Cranmer’s 1552 Protestant words of distribution (*"Take and eat this in remembrance that Christ died for thee"*) with the 1549 Catholic phrasing (*"The body of our Lord Jesus Christ preserve thy body and soul"*), permitting both interpretations.',
        hingeQuestion:
          'How did deliberate theological ambiguity regarding the Eucharist help prevent an immediate religious civil war in 1559?',
      },
    },
    p6: {
      sourceA: {
        title: 'Source A: The Papal Bull Regnans in Excelsis',
        type: 'Papal Decree & Seal',
        date: '25 February 1570',
        image: getBase64Image('images/papal_bull.jpg'),
        context:
          'The official decree issued by Pope Pius V excommunicating Elizabeth Tudor. The bull declared: "We do out of the fullness of our Apostolic power declare the aforesaid Elizabeth to be a heretic and favourer of heretics... and we also declare her to be deprived of her pretended title to the aforesaid crown."',
        hingeQuestion:
          'Why did Pope Pius V’s release of this bull in 1570 inadvertently undermine English Catholics by making religious loyalty synonymous with treason in the eyes of the Crown?',
      },
      sourceB: {
        title: 'Source B: The Elizabethan Clerical Vestments',
        type: 'Contemporary Woodcut',
        date: 'c. 1566',
        image: getBase64Image('units/eee/assets/portraits/henry_viii.jpg'),
        context:
          'Illustrating the white linen surplice and outdoor clerical cloak demanded by Archbishop Parker’s 1566 *Book of Advertisements*. Puritans reviled these garments as "popish rags" and "badges of Antichrist", arguing that true ministers required no ceremonial hierarchy.',
        hingeQuestion:
          'Why did Elizabeth insist on strict clerical dress conformity when she was willing to tolerate private theological reservations?',
      },
    },
    p8: {
      sourceA: {
        title: 'Source A: The Sheffield Portrait of Mary Stuart',
        type: 'Formal State Portrait in Captivity',
        date: 'c. 1578',
        image: getBase64Image('images/mary_qos.jpg'),
        context:
          'Painted during Mary’s prolonged captivity in England, showing the Scottish queen dressed in sombre black with an ornate rosary and crucifix prominently displayed at her waist. The portrait deliberately projected pious Catholic royalty, dynastic victimhood, and sovereign innocence.',
        hingeQuestion:
          'How did Mary Stuart’s continuous display of Catholic piety and royal symbols exacerbate the security paranoia of William Cecil and Francis Walsingham?',
      },
      sourceB: {
        title: 'Source B: Facsimile of a Casket Letter',
        type: 'Contested Primary Correspondence',
        date: 'Presented December 1568',
        image: getBase64Image('units/eee/assets/portraits/mary_of_guise.jpg'),
        context:
          'A facsimile excerpt of the infamous letters produced by the Scottish Protestant Regent, the Earl of Murray, at the Conference of York. The letters purported to show Mary conspiring with Bothwell to blow up Kirk o’Field and assassinate her husband, Lord Darnley.',
        hingeQuestion:
          'Why did Elizabeth deliberately issue a verdict of "not proven" regarding the Casket Letters rather than declaring Mary guilty or innocent?',
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
