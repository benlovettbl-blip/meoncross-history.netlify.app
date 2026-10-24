const fs = require('fs');
const path = require('path');

function updateUnit(unitId, updateFn) {
  const jsPath = path.resolve(__dirname, `../units/${unitId}/data.js`);
  const pubJsonPath = path.resolve(__dirname, `../public/data/${unitId}.json`);
  const dataJsonPath = path.resolve(__dirname, `../data/${unitId}.json`);

  delete require.cache[require.resolve(jsPath)];
  const mod = require(jsPath);
  const data = mod.default || mod.unitData || mod;

  updateFn(data);

  // Write JS
  const jsContent = `const unitData = ${JSON.stringify(data, null, 2)};\n\nexport default unitData;\nexport { unitData };\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(jsPath, jsContent, 'utf8');

  // Write JSON
  fs.writeFileSync(pubJsonPath, JSON.stringify(data, null, 2), 'utf8');
  if (fs.existsSync(dataJsonPath)) {
    fs.writeFileSync(dataJsonPath, JSON.stringify(data, null, 2), 'utf8');
  }
  console.log(`✅ Successfully updated ${unitId}`);
}

// 1. eee (Early Elizabethan England - 15 clips)
const eeePedagogy = {
  1: [
    {
      task: 'What fundamental dynastic, financial, and foreign policy threats confronted Elizabeth I upon her accession in November 1558?',
      answer:
        "Upon her accession in November 1558, Elizabeth I faced acute vulnerabilities: dynastic legitimacy was contested because Catholics viewed Henry VIII's marriage to Anne Boleyn as invalid; the Crown was severely indebted (£300,000 debt inherited from Mary I alongside high inflation and harvest failures); and England faced foreign military encirclement, being at war with France (having just surrendered Calais in January 1558) while Scotland was ruled by the French regent Mary of Guise.",
    },
  ],
  2: [
    {
      task: "How did the 1559 Religious Settlement attempt to construct a 'Middle Way' between Catholic traditionalism and Protestant reform through the Acts of Supremacy and Uniformity?",
      answer:
        "The 1559 Religious Settlement established a moderate Protestant compromise designed to reconcile ideological divisions: the Act of Supremacy established Elizabeth as 'Supreme Governor' (rather than Supreme Head) of the Church of England, mollifying Catholics who believed only the Pope could lead Christ's Church. The Act of Uniformity enforced a single Book of Common Prayer in English, but retained traditional Catholic outward elements—such as clerical vestments (surplices), kneeling at communion, and retaining ornaments—while imposing a one-shilling fine for recusancy to enforce nominal outward compliance.",
    },
  ],
  3: [
    {
      task: "Why did both hardline Catholic recusants and radical Puritans resist Elizabeth's Religious Settlement of 1559?",
      answer:
        "Puritans objected violently to Catholic survivals in the church, viewing the crucifix, organ music, wedding rings, and particularly clerical vestments (the Vestments Controversy 1565–66) as idolatrous 'popish rags' unsupported by scripture. Conversely, devout Catholics resisted attendance at Protestant services, refusing the oath of supremacy, sheltering missionary Jesuit priests in priest holes, and looking to the Pope and Philip II of Spain to restore true Catholic worship.",
    },
  ],
  4: [
    {
      task: 'Why did the arrival of Mary, Queen of Scots in northern England in May 1568 present Elizabeth I with an insoluble political and religious dilemma?',
      answer:
        "Mary, Queen of Scots arrived in England having fled Scottish Protestant rebels following the mysterious murder of Lord Darnley. As Henry VII's great-granddaughter, Mary held an undeniable, legitimate blood claim to the English crown and was viewed by English Catholics and European powers as England's rightful Catholic monarch. Elizabeth could neither execute an anointed fellow sovereign, nor restore her to the Scottish throne with English troops, nor allow her to seek refuge in France, forcing Elizabeth to keep Mary under heavily guarded house arrest for nineteen years.",
    },
  ],
  5: [
    {
      task: 'What motivated the Catholic Earls of Northumberland and Westmorland to rebel in November 1569, and how did Elizabeth reassert royal authority?',
      answer:
        'The northern Catholic Earls of Northumberland and Westmorland revolted due to religious alienation, political marginalization by William Cecil, and loss of ancient aristocratic influence in the north. They seized Durham Cathedral, destroyed the English prayer book, and celebrated Latin Catholic Mass with 5,000 men. Elizabeth responded decisively: the royal army marched north, the rebel earls fled into Scotland, and Elizabeth executed roughly 450 ordinary northern rebels to intimidate the population and crush future regional defiance.',
    },
    {
      task: "How did the Ridolfi (1571), Throckmorton (1583), and Babington (1586) conspiracies escalate Catholic threats against Elizabeth's life?",
      answer:
        "Each conspiracy aimed to assassinate Elizabeth, instigate a foreign Catholic invasion by Spanish and papal forces, and place Mary, Queen of Scots on the throne. Roberto Ridolfi utilized Italian banking networks; Francis Throckmorton coordinated with the Duke of Guise and the Spanish ambassador Mendoza; and Anthony Babington coordinated encrypted correspondence directly with Mary. The discovery of these plots hardened anti-Catholic legislation, led to the expulsion of Spanish ambassadors, and directly sealed Mary's judicial execution.",
    },
    {
      task: "How did Sir Francis Walsingham's intelligence network use cryptanalysis, double agents, and the entrapment of Mary Queen of Scots to secure her execution?",
      answer:
        "Sir Francis Walsingham constructed an extensive counter-espionage network across England and Europe, recruiting informants, cryptographers, and double agents like Gilbert Gifford. In the 1586 Babington Plot, Walsingham intercepted Mary's letters concealed in brewer's beer barrels, had cryptanalyst Thomas Phelippes decode her ciphered messages, and waited until Mary explicitly endorsed the assassination of Elizabeth. This definitive documentary proof provided the treason evidence required to convict and execute Mary at Fotheringhay Castle on 8 February 1587.",
    },
  ],
  6: [
    {
      task: 'Why did commercial trade disputes in the New World and Spanish suppression of Dutch Protestants poison Anglo-Spanish relations between 1569 and 1585?',
      answer:
        "Commercial rivalry deepened as Spanish authorities strictly barred English merchants from trading in the Caribbean and Americas, prompting English privateers (like Drake and Hawkins) to illicitly plunder Spanish treasure fleets. Simultaneously, Philip II deployed the Duke of Alba's 10,000-man army to brutally crush the Dutch Protestant Revolt directly across the English Channel. Elizabeth covertly assisted Dutch rebels ('Sea Beggars') by harbouring them in English ports and providing covert loans, fearing a hostile Spanish springboard directly facing London.",
    },
    {
      task: "How did Sir Francis Drake's 1577–1580 circumnavigation of the globe humiliate Philip II and enrich the English Crown?",
      answer:
        "During his three-year voyage aboard the Golden Hind, Sir Francis Drake raided unfortified Spanish ports along the Pacific coast of South America, capturing the treasure galleon Nuestra Señora de la Concepción ('Cacafuego') laden with 26 tons of silver and gold. Drake returned to Plymouth in 1580 with booty worth roughly £400,000—more than England's entire annual royal revenue. When Elizabeth personally boarded the Golden Hind at Deptford to knight Drake, she openly defied Philip II and legitimized privateering piracy against the Spanish Empire.",
    },
  ],
  7: [
    {
      task: 'Why was the 1585 Treaty of Nonsuch a decisive turning point that made formal war between England and Spain inevitable?',
      answer:
        "Following the assassination of Dutch Protestant leader William the Silent in 1584 and the French-Spanish Treaty of Joinville, the Dutch Revolt faced imminent collapse. In August 1585, Elizabeth abandoned covert support and signed the Treaty of Nonsuch, pledging 7,400 English soldiers under Robert Dudley, Earl of Leicester, to fight directly alongside Dutch rebels in the Netherlands. By intervening openly in Spanish sovereign territory, Elizabeth crossed Philip II's red line, prompting Spain to begin assembling the Armada to invade England.",
    },
  ],
  8: [
    {
      task: 'Why did the Spanish Armada fail to accomplish its invasion objective in July–August 1588?',
      answer:
        "The Armada's failure resulted from strategic flaws, English naval superiority, and adverse weather: the Duke of Medina Sidonia was unable to link up with the Duke of Parma's invasion army in Flanders because Parma lacked deep-water embarkation ports and was blockaded by Dutch flyboats. On 7–8 August 1588 off Calais, English fireships scattered the defensive Spanish crescent formation in panic. In the ensuing Battle of Gravelines, nimble English galleons armed with long-range culverins pounded the disordered Spanish fleet. Battered by fierce northern gales ('the Protestant Wind'), the Armada was forced into a catastrophic voyage around Scotland and Ireland, losing over a third of its ships.",
    },
  ],
  9: [
    {
      task: 'How did education and leisure activities reflect rigid social hierarchy and growing humanist ideals in Elizabethan England?',
      answer:
        "Education was heavily stratified by class and gender: petty schools and newly endowed grammar schools taught Latin, Greek, rhetoric, and religion to sons of the gentry and merchants, while girls received domestic training and the poor remained largely illiterate. Leisure mirrored these divides: nobility enjoyed hunting, hawking, and lavish courtly tournaments, while commoners engaged in brutal folk sports like football and bear-baiting. Crucially, the purpose-built secular theatre (such as The Theatre, The Curtain, and later The Globe) brought nobles and common 'groundlings' together to enjoy plays by Shakespeare and Marlowe.",
    },
  ],
  10: [
    {
      task: "What underlying economic factors caused the rapid rise in poverty and vagrancy during Elizabeth's reign, and how did the 1597–1601 Poor Laws respond?",
      answer:
        "Poverty surged due to rapid population growth (increasing from 2.8 to 4.1 million), successive harvest failures in the 1590s, high food prices, and agricultural enclosure—where landlords evicted tenant arable farmers to enclose fields for profitable sheep farming. The Elizabethan Poor Law of 1601 created a national, parish-based system distinguishing between the 'deserving poor' (the sick, elderly, and orphaned, who received financial 'outdoor relief' or were housed in almshouses) and the 'idle poor' (sturdy beggars, who were whipped, sent to Houses of Correction, or forced to work).",
    },
  ],
  11: [
    {
      task: 'What technological and commercial breakthroughs drove the expansion of Elizabethan maritime exploration and chartered trading companies?',
      answer:
        "Maritime voyages were enabled by navigational advances, including Gerardus Mercator's navigational projection maps, magnetic compasses, astrolabes, and quadrant calculation for latitude. Shipbuilders designed faster, narrower galleons with lower superstructures and lateen sails capable of tacking into wind. Commercially, wealthy merchants formed joint-stock companies protected by royal monopolies—such as the Muscovy Company (Russia), the Levant Company (Ottoman trade), and later the East India Company (1600)—sharing financial risk and laying the foundations for global commercial empire.",
    },
  ],
  12: [
    {
      task: "Why did Sir Walter Raleigh's attempts to establish a permanent English colony at Roanoke Island, Virginia (1585–1590) collapse into failure?",
      answer:
        "Raleigh's Virginia colonization failed due to poor planning, harsh environmental conditions, and hostile relations: the initial 1585 settlers under Ralph Lane lacked farming and artisanal skills, arrived too late to plant crops, and antagonized the local Secotan people, culminating in the execution of Chief Wingina. The second 1587 colony under John White was stranded without supplies because the Spanish Armada crisis delayed supply ships in England until 1590. When White finally returned, the Roanoke settlement was deserted, leaving behind only the mysterious word 'CROATOAN' carved into a wooden post.",
    },
  ],
};

updateUnit('eee', (data) => {
  data.lessons.forEach((l, li) => {
    const ped = eeePedagogy[li + 1];
    if (ped && l.video) {
      l.video.forEach((v, vi) => {
        if (ped[vi]) {
          v.viewing_task = ped[vi].task;
          v.model_answer = ped[vi].answer;
        }
      });
    }
  });
});

// 2. early_modern_world (14 clips)
const emwPedagogy = {
  1: [
    {
      task: 'Why were the Ming Dynasty and the Ottoman Empire far wealthier and more powerful than European kingdoms in 1450?',
      answer:
        "In 1450, Ming China possessed the world's most advanced economy, maritime technologies, and massive bureaucratic governance, producing sought-after luxury goods like porcelain, silk, and tea along the Silk Roads. Concurrently, the Ottoman Empire controlled strategic Eurasian trade choke points following the conquest of Constantinople in 1453. In contrast, European kingdoms were politically fractured, impoverished, recovering from the Black Death, and peripheral to the main overland and Indian Ocean trade networks.",
    },
  ],
  2: [
    {
      task: 'How did fireships and naval artillery tactics at the Battle of Gravelines (1588) neutralize the defensive advantage of the Spanish Armada?',
      answer:
        "The Spanish Armada sailed in an impenetrable crescent formation that protected transport galleons and relied on grappling and hand-to-hand boarding tactics. At Gravelines, English commanders launched eight burning 'hellburners' (fireships) into the anchored fleet, causing widespread panic and forcing Spanish captains to cut their anchor cables. In the resulting chaos, English galleons utilized superior maneuverability and long-range culverin cannons to batter the scattered Spanish ships from safe distances, preventing them from linking up with the Duke of Parma's invasion army.",
    },
  ],
  3: [
    {
      task: 'How did the invention of the joint-stock corporation transform the East India Company from a group of merchants into a colonial power?',
      answer:
        'The joint-stock company allowed hundreds of wealthy investors to pool capital, purchase merchant fleets, and spread commercial risks while holding shares protected by royal charter. Armed with a royal trade monopoly, the East India Company did not merely barter spices: it was granted sovereign authority by the Crown to wage war, maintain private armies, build coastal forts, mint currency, and negotiate treaties, transforming a commercial merchant venture into an imperial territorial ruler across the Indian subcontinent.',
    },
    {
      task: 'What logistical and environmental factors led to the mysterious disappearance of the English colonists at Roanoke in 1587–1590?',
      answer:
        "The 1587 Roanoke settlement was crippled by inadequate agricultural preparation, unsuited gentleman settlers, infertile sandy soil, and the alienation of local Algonquian tribes. When Governor John White returned to England for emergency provisions, the outbreak of the Spanish Armada war led to the royal requisitioning of all seaworthy English vessels, stranding White for three years. By the time he returned in 1590, the settlement was deserted with the word 'CROATOAN' carved into a palisade post, indicating the survivors had either been absorbed by or killed by local Indigenous tribes.",
    },
  ],
  4: [
    {
      task: 'Why did Robert Catesby and Guy Fawkes plan the 1605 Gunpowder Plot, and what consequences followed its discovery?',
      answer:
        "English Catholics hoped the accession of James I in 1603 would bring religious toleration, but James swiftly reinforced heavy recusancy fines and ordered Catholic priests banished from the realm. In desperation, Robert Catesby and conspirators placed 36 barrels of gunpowder beneath the House of Lords to assassinate the King, his heirs, and Parliament on 5 November 1605. Following the anonymous Monteagle letter and Fawkes's capture, the plot collapsed, triggering anti-Catholic hysteria, tighter penal laws, and entrenched civic exclusion of Catholics for two centuries.",
    },
  ],
  5: [
    {
      task: "How did Charles I's belief in the Divine Right of Kings, Ship Money taxes, and the attempted arrest of the Five Members lead to Civil War in 1642?",
      answer:
        "Charles I ruled with the absolute belief that monarchs answered only to God ('Divine Right of Kings'), governing without Parliament during the Eleven Years' Personal Rule (1629–1640) and funding the Crown through controversial levies like coastal and inland Ship Money. When religious revolts in Scotland forced him to recall Parliament, MPs demanded constitutional limits on royal power. Charles's brazen invasion of the House of Commons with armed guards in January 1642 to arrest five MPs shattered trust irrevocably, leading both sides to raise rival armies.",
    },
  ],
  6: [
    {
      task: 'Why was the trial and public execution of Charles I on 30 January 1649 a revolutionary moment in world history?',
      answer:
        "Putting a reigning monarch on public trial broke centuries of divine-right monarchy: Parliament charged Charles I as a 'tyrant, traitor, murderer and public enemy' who had waged war against his own people. His public beheading outside the Banqueting House in Whitehall on 30 January 1649 abolished the monarchy and House of Lords, creating the English Commonwealth (Republic) and establishing the radical legal principle that even kings were accountable to the rule of law and the consent of the governed.",
    },
  ],
  7: [
    {
      task: 'How did 17th-century sugar plantations in Barbados establish the institutional and legal blueprint for transatlantic chattel slavery?',
      answer:
        "In the 1640s, English planters in Barbados introduced sugarcane cultivation, discovering it yielded astronomical profits but required intense, brutal physical labour. Planters transitioned from white indentured servants to the mass importation of enslaved Africans, creating the Caribbean's first true 'slave society'. Barbados codified chattel slavery into law, declaring enslaved human beings to be subhuman property without legal rights, establishing a model of industrialised agricultural exploitation that was exported across the British West Indies and American colonies.",
    },
    {
      task: 'How did the 1661 Barbados Slave Act strip enslaved Africans of fundamental human rights and legal protection?',
      answer:
        'The 1661 Act for the Better Ordering and Governing of Negroes (the Barbados Slave Code) legally classified enslaved Africans as absolute chattel personal property rather than human beings under common law. It gave masters unrestricted authority to whip, brand, mutilate, and overwork enslaved people without legal penalty, made baptism irrelevant to freedom, and criminalised any assembly or self-defence by Black individuals, institutionalising systemic white supremacist violence into the imperial legal code.',
    },
    {
      task: 'How did the enormous profits generated by slave-grown sugar in the Caribbean transform British financial institutions and urban infrastructure?',
      answer:
        "Profits extracted from slave-produced sugar, rum, and molasses flowed directly into British financial institutions, fuelling the growth of Barclays and Lloyds banks, the Bank of England, and the marine insurance giant Lloyd's of London. Major ports like Bristol, Liverpool, and London expanded rapidly, constructing colossal maritime infrastructure like London's West India Docks. Sugar wealth funded stately country manors, financed parliamentary political campaigns, and supplied capital that directly funded the early Industrial Revolution.",
    },
    {
      task: 'What physical evidence from sunken transatlantic slave shipwrecks reveals the inhumane brutality of the Middle Passage?',
      answer:
        'Underwater maritime archaeology reveals iron leg shackles, neck collars, and weighted ballast stones used to counterbalance human cargo in the holds of slave vessels. These artefacts corroborate historical primary accounts of the Middle Passage: hundreds of enslaved men, women, and children were packed shelf-like into dark, suffocating holds with barely two feet of headroom, enduring dysentery, dehydration, torture, and mortality rates averaging 12–15% during the two-month ocean voyage.',
    },
  ],
  8: [
    {
      task: 'How did enslaved Africans actively resist the machinery of chattel slavery through daily sabotage, maroon societies, and open rebellion?',
      answer:
        "Enslaved Africans exercised agency and resistance through diverse continuous strategies: daily resistance included working slowly, breaking tools, feigning illness, sabotaging sugar boiling pots, and secretly preserving African spiritual, musical, and linguistic traditions. Runaways established autonomous 'maroon' communities in inaccessible mountain terrains (such as the Jamaican Blue Mountains under Queen Nanny), waging guerrilla warfare against colonial militias, while others organized shipboard revolts and large-scale armed uprisings like Tacky's War (1760).",
    },
    {
      task: 'How did the personal testimony of Olaudah Equiano and public consumer boycotts overcome the political resistance of the pro-slavery West India Lobby?',
      answer:
        "The wealthy West India Lobby used vast plantation fortunes to buy MPs, bribery, and propaganda claiming the British economy would collapse without the slave trade. Abolitionists countered this through grassroots campaigning: Olaudah Equiano's 1789 bestselling autobiography provided undeniable firsthand evidence of kidnapping and the horrors of the Middle Passage; Josiah Wedgwood designed the iconic 'Am I Not a Man and a Brother?' cameo; and over 300,000 British citizens participated in the boycott of slave-grown sugar, forcing Parliament to pass the Abolition of the Slave Trade Act in 1807.",
    },
  ],
  9: [
    {
      task: 'In what ways had Britain transformed from an isolated medieval kingdom in 1450 into a global commercial superpower on the verge of the Industrial Revolution by 1750?',
      answer:
        'Between 1450 and 1750, Britain underwent profound structural revolutions: politically, it transitioned from an absolute divine-right monarchy to a constitutional parliamentary monarchy under the 1689 Bill of Rights; economically, the Agricultural Revolution and enclosure increased food yields and freed farm labour, while global trade networks and joint-stock corporations generated vast merchant capital; and technologically, developments in coal mining, metallurgy, and early Newcomen atmospheric steam engines set the stage for factory industrialisation.',
    },
  ],
};

updateUnit('early_modern_world', (data) => {
  data.lessons.forEach((l, li) => {
    const ped = emwPedagogy[li + 1];
    if (ped && l.video) {
      l.video.forEach((v, vi) => {
        if (ped[vi]) {
          v.viewing_task = ped[vi].task;
          v.model_answer = ped[vi].answer;
        }
      });
    }
  });
});

console.log('🎉 Successfully completed Batch 2 updates for eee and early_modern_world!');
