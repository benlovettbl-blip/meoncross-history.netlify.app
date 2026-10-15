const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'units', 'monarchy_religion_power', 'data.js');

const spinesByLessonId = {
  lesson_1: {
    title: 'The Reformation & The Break with Rome (1517–1547)',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '1517–1521',
        title: 'Luther’s Protest & Indulgence Crisis',
        actor: 'Martin Luther & Pope Leo X',
        tag: '📜 95 THESES',
        trigger:
          'Martin Luther nailed his 95 Theses to Wittenberg church door, attacking corrupt Catholic indulgences that promised salvation in exchange for money.',
        connective:
          'Shattered European religious unity and provoked Henry VIII to defend the Papacy, earning the royal title ‘Defender of the Faith’.',
        question: 'How did Martin Luther’s protest spark the Reformation across Europe?',
      },
      {
        step: 2,
        date: '1525–1527',
        title: 'The Dynastic Succession Crisis',
        actor: 'Henry VIII & Catherine of Aragon',
        tag: '👑 GREAT MATTER',
        trigger:
          'Catherine of Aragon failed to produce a surviving male heir, convincing Henry that their marriage was cursed by God and threatening England with dynastic civil war.',
        connective:
          'Propelled Henry to demand a papal annulment and fall passionately in love with Anne Boleyn, setting the Crown on a collision course with Rome.',
        question: 'Why did the royal marriage become an urgent dynastic crisis?',
      },
      {
        step: 3,
        date: '1527–1529',
        title: 'Roman Deadlock & Papal Imprisonment',
        actor: 'Pope Clement VII & Emperor Charles V',
        tag: '🔒 ROME IMPASSE',
        trigger:
          'Emperor Charles V’s imperial troops sacked Rome and held Pope Clement VII captive, preventing the Pope from insulting the Emperor by annulling his aunt Catherine’s marriage.',
        connective:
          'Paralyzed English diplomacy, destroyed Cardinal Wolsey’s career, and convinced Henry that foreign popes must not control English domestic affairs.',
        question: 'Why did Pope Clement VII refuse Henry’s annulment request?',
      },
      {
        step: 4,
        date: '1529–1533',
        title: 'Cromwell’s Parliamentary Squeeze',
        actor: 'Thomas Cromwell & Reformation Parliament',
        tag: '🏛️ STATUTORY SIEGE',
        trigger:
          'Thomas Cromwell drafted parliamentary statutes that banned financial payments to Rome and declared England an autonomous empire subject to no foreign jurisdiction.',
        connective:
          'Stripped the English clergy of papal protection, validated Henry’s secret marriage to Anne Boleyn, and legally severed England from Rome.',
        question: 'How did Thomas Cromwell use Parliament to pressure the Church?',
      },
      {
        step: 5,
        date: '1534',
        title: 'The Act of Supremacy & Royal Sovereignty',
        actor: 'King Henry VIII & Parliament',
        tag: '⚔️ ROYAL SUPREMACY',
        trigger:
          'Parliament passed the 1534 Act of Supremacy, declaring the King to be the only Supreme Head on Earth of the Church of England, enforced by lethal Treason oaths.',
        connective:
          'Completed the constitutional revolution, ending 1,000 years of papal jurisdiction and transferring immense monastic wealth to the Crown.',
        question: 'How did the Act of Supremacy legally consolidate royal sovereignty?',
      },
    ],
  },
  lesson_2: {
    title: 'Elizabeth I & The Middle Way (1558–1588)',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '1558–1559',
        title: 'A Fractured Realm: The Marian Legacy',
        actor: 'Queen Mary I & Protestant Returnees',
        tag: '🔥 MARIAN BURNINGS',
        trigger:
          'Mary I’s execution of nearly 300 Protestant martyrs at the stake created bitter religious trauma, while returning Marian exiles demanded radical Calvinist reform.',
        connective:
          'Confronted the young Queen Elizabeth with a deeply polarized realm on the brink of sectarian rebellion and foreign Catholic intervention.',
        question: 'Why was England religiously fractured when Elizabeth became Queen?',
      },
      {
        step: 2,
        date: '1559',
        title: 'The Act of Supremacy: Supreme Governor',
        actor: 'Elizabeth I & House of Lords',
        tag: '👑 SUPREME GOVERNOR',
        trigger:
          'Parliament passed the 1559 Act of Supremacy, adopting the diplomatic title ‘Supreme Governor’ and requiring loyalty oaths while depriving resisting Catholic bishops.',
        connective:
          'Restored royal control over the national church while calming moderate Catholics who believed Christ alone was the Church’s supreme head.',
        question: 'How did the Act of Supremacy restore royal control through compromise?',
      },
      {
        step: 3,
        date: '1559',
        title: 'The Act of Uniformity & The Via Media',
        actor: 'Elizabeth I & Sir William Cecil',
        tag: '⚖️ VIA MEDIA',
        trigger:
          'The Act of Uniformity enforced a single Book of Common Prayer with ambiguous communion wording, backed by a 12-pence fine for missing Sunday church.',
        connective:
          'Established a practical Protestant settlement with traditional ceremonies, famously avoiding making ‘windows into men’s souls’.',
        question: 'How did the Act of Uniformity establish the ‘Middle Way’ (Via Media)?',
      },
      {
        step: 4,
        date: '1568–1570',
        title: 'Mary Queen of Scots & Papal Excommunication',
        actor: 'Pope Pius V & Northern Earls',
        tag: '📜 PAPAL BULL (1570)',
        trigger:
          'The arrival of Mary Queen of Scots triggered the 1569 Northern Rebellion, prompting Pope Pius V to issue the papal bull Regnans in Excelsis deposing Elizabeth.',
        connective:
          'Transformed practicing English Catholics in the eyes of the law from religious dissenters into potential political traitors.',
        question: 'How did Mary Queen of Scots and the Papal Bull spark Catholic plots?',
      },
      {
        step: 5,
        date: '1571–1588',
        title: 'Walsingham’s Espionage & The Babington Plot',
        actor: 'Sir Francis Walsingham & Mary Stuart',
        tag: '🪓 REGAL EXECUTION',
        trigger:
          'Spymaster Walsingham deciphered coded beer-barrel letters proving Mary Stuart’s direct complicity in the Babington conspiracy to assassinate Queen Elizabeth.',
        connective:
          'Forced Elizabeth to sign Mary’s death warrant in 1587, eliminating the Catholic figurehead but provoking Philip II’s retaliatory Spanish Armada.',
        question: 'How did Walsingham’s spy network lead to Mary’s execution?',
      },
    ],
  },
  lesson_3: {
    title: 'The Spanish Armada & Naval Power (1588)',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '1585–1587',
        title: 'Imperial Friction & The Beheading of Mary',
        actor: 'King Philip II & Queen Elizabeth I',
        tag: '⚔️ RIVALRY & PROVOCATION',
        trigger:
          'English military aid to Dutch Protestant rebels, Drake’s privateering raids on Spanish silver fleets, and Mary Stuart’s execution incensed Catholic Spain.',
        connective:
          'Convinced Philip II to assemble the ‘Enterprise of England’—a grand crusade to overthrow Elizabeth and re-Catholicize England by naval force.',
        question: 'What imperial and religious rivalries provoked Philip II’s invasion?',
      },
      {
        step: 2,
        date: '1587',
        title: 'The Singeing of the King of Spain’s Beard',
        actor: 'Sir Francis Drake & English Raiders',
        tag: '⚓ CADIZ HARBOUR RAID',
        trigger:
          'Drake led a pre-emptive strike into Cadiz harbour, destroying 30 Spanish vessels and incinerating thousands of tons of seasoned barrel staves.',
        connective:
          'Delayed the Armada’s departure by a full year and ensured Spanish food and fresh water would rapidly rot at sea inside unseasoned barrels.',
        question: 'How did Drake’s raid on Cadiz delay the Spanish invasion?',
      },
      {
        step: 3,
        date: 'July 1588',
        title: 'The Channel Chase & Crescent Defence',
        actor: 'Duke of Medina Sidonia & Lord Howard',
        tag: '🛡️ CRESCENT FORMATION',
        trigger:
          'Medina Sidonia sailed 130 warships up the Channel in an impenetrable crescent formation, shadowed by nimble English race-built galleons firing long-range culverins.',
        connective:
          'Prevented English broadsides from breaking the Spanish formation while preventing the Armada from securing a deep-water port on the English coast.',
        question: 'How did the English fleet harry the Armada up the English Channel?',
      },
      {
        step: 4,
        date: '7–8 August 1588',
        title: 'Midnight Fireships at Calais Roads',
        actor: 'English Sea Captains & Spanish Galleons',
        tag: '🔥 HELLBURNERS OF CALAIS',
        trigger:
          'The English dispatched eight blazing fireships packed with pitch and gunpowder into the anchored Spanish fleet off Calais in the dead of night.',
        connective:
          'Panicked Spanish captains severed their anchor cables and scattered into the dark, permanently destroying their defensive crescent formation.',
        question: 'How did English fireships at Calais shatter the Spanish formation?',
      },
      {
        step: 5,
        date: 'Aug–Sept 1588',
        title: 'The Battle of Gravelines & The Protestant Wind',
        actor: 'Lord Howard, Drake & Atlantic Gales',
        tag: '🌪️ GRAVELINES & RETREAT',
        trigger:
          'English race-built galleons battered vulnerable Spanish hulls at close range at Gravelines before fierce North Atlantic gales drove the fleet onto Irish rocks.',
        connective:
          'Annihilated over half the Armada, secured England’s Protestant independence, and established the Royal Navy as a formidable European naval power.',
        question: 'How did the Battle of Gravelines and severe storms destroy the fleet?',
      },
    ],
  },
  lesson_4: {
    title: 'The Civil War, Regicide & The Bill of Rights (1642–1689)',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '1629–1640',
        title: 'The Eleven Years’ Tyranny & Ship Money',
        actor: 'King Charles I & John Hampden',
        tag: '💰 SHIP MONEY CRISIS',
        trigger:
          'Charles I governed for eleven years without summoning Parliament, unlawfully levying coastal Ship Money on landlocked inland towns to bypass parliamentary taxation.',
        connective:
          'Provoked constitutional fury across the gentry and united MPs against royal tyranny when bankruptcy forced Charles to recall Parliament in 1640.',
        question: 'Why did Charles I’s ‘Personal Rule’ without Parliament cause outrage?',
      },
      {
        step: 2,
        date: '1640–1642',
        title: 'The Armed Raid on the Commons',
        actor: 'Charles I & The Five MPs',
        tag: '⚔️ WESTMINSTER BREACH',
        trigger:
          'Charles I breached parliamentary privilege by personally marching 400 armed guards into the House of Commons to arrest five leading parliamentary opponents.',
        connective:
          'Irrevocably shattered political trust, forced the King to flee London, and led both sides to raise rival armies, initiating open civil war in August 1642.',
        question: 'How did the breakdown of trust lead to armed civil conflict?',
      },
      {
        step: 3,
        date: '1645–1648',
        title: 'The New Model Army & The Battle of Naseby',
        actor: 'Oliver Cromwell & Sir Thomas Fairfax',
        tag: '💥 NASEBY ROUT',
        trigger:
          'Parliament created the professional, meritocratic New Model Army, whose disciplined redcoat cavalry crushed the Royalist forces at the decisive Battle of Naseby.',
        connective:
          'Destroyed Charles I’s main military forces and captured his secret correspondence, exposing his treacherous plans to recruit foreign and Catholic armies.',
        question: 'How did the New Model Army defeat the King at the Battle of Naseby?',
      },
      {
        step: 4,
        date: '1648–1649',
        title: 'Pride’s Purge & The Trial of the King',
        actor: 'Colonel Thomas Pride & High Court of Justice',
        tag: '🪓 THE REGICIDE (1649)',
        trigger:
          'The Army purged moderate MPs from Parliament, establishing a High Court that tried and publicly beheaded Charles I outside Whitehall for high treason against his people.',
        connective:
          'Destroyed the mystical doctrine of the Divine Right of Kings, abolished the monarchy, and declared England a republic (Commonwealth).',
        question: 'Why did Pride’s Purge and the High Court lead to regicide?',
      },
      {
        step: 5,
        date: '1660–1689',
        title: 'The Glorious Revolution & The Bill of Rights',
        actor: 'William III, Mary II & Convention Parliament',
        tag: '📜 BILL OF RIGHTS (1689)',
        trigger:
          'Following the flight of Catholic James II, Parliament invited William and Mary to take the throne only after swearing strict allegiance to the 1689 Bill of Rights.',
        connective:
          'Permanently prohibited monarchs from suspending laws, levying taxes, or maintaining armies without Parliament, establishing modern constitutional monarchy.',
        question: 'How did the Glorious Revolution permanently limit royal power?',
      },
    ],
  },
  lesson_5: {
    title: 'Crown, Church, or Parliament? (1517–1689)',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '1517–1534',
        title: 'Henry VIII & The Birth of King-in-Parliament',
        actor: 'Henry VIII & The Reformation Parliament',
        tag: '👑 SOVEREIGN PREROGATIVE',
        trigger:
          'Henry VIII severed the English Church from Rome by using parliamentary statutes, inadvertently elevating Parliament into a supreme legislative partner.',
        connective:
          'Created the enduring constitutional doctrine of the ‘King-in-Parliament’, ensuring all future royal religious changes required parliamentary consent.',
        question: 'How did Henry VIII reshape sovereign authority in the Reformation?',
      },
      {
        step: 2,
        date: '1559–1588',
        title: 'Elizabethan Compromise & Patriotic Solidarity',
        actor: 'Elizabeth I & Elizabethan Parliaments',
        tag: '🛡️ NATIONAL DEFENCE',
        trigger:
          'Elizabeth I worked cooperatively with Parliament to preserve the Middle Way against Catholic assassination conspiracies and the Spanish Armada.',
        connective:
          'Fused Protestant religious identity with English national sovereignty, creating a shared constitutional bond between Crown and elected MPs.',
        question: 'How did the Elizabethan settlement forge a Protestant national state?',
      },
      {
        step: 3,
        date: '1603–1640',
        title: 'Stuart Absolutism & The Divine Right Collision',
        actor: 'James I, Charles I & Dissident MPs',
        tag: '⚡ ABSOLUTIST FRICTION',
        trigger:
          'Stuart monarchs asserted absolute Divine Right authority, ruling without Parliament and extracting arbitrary taxes like Ship Money without voter consent.',
        connective:
          'Radically alienated the landed gentry and urban merchants, turning constitutional debates over taxation into an ideological struggle over sovereignty.',
        question: 'Why did Stuart claims of Divine Right provoke constitutional crisis?',
      },
      {
        step: 4,
        date: '1642–1649',
        title: 'Civil War Cataclysm & Judicial Regicide',
        actor: 'New Model Army & The Rump Parliament',
        tag: '🪓 THE REGICIDE CRUCIBLE',
        trigger:
          'Parliament’s citizen army defeated the Royalists in the Civil War, trying and beheading Charles I as a traitor who waged war against his own realm.',
        connective:
          'Proved that sovereign power derived from the people rather than heavenly appointment, permanently destroying the inviolability of kings.',
        question: 'Why was the trial and execution of Charles I a radical turning point?',
      },
      {
        step: 5,
        date: '1660–1689',
        title: 'The Bill of Rights & Parliamentary Supremacy',
        actor: 'William & Mary & The English Parliament',
        tag: '⚖️ CONSTITUTIONAL RULE',
        trigger:
          'The 1689 Bill of Rights formally made the Crown subject to the rule of law, stripping kings of the power to raise money or suspend statutes without MPs.',
        connective:
          'Concluded the 170-year struggle by firmly enthroning Parliamentary Supremacy and establishing the foundation of Britain’s modern democracy.',
        question: 'How did the 1689 Bill of Rights finalize Parliamentary Supremacy?',
      },
    ],
  },
};

let content = fs.readFileSync(dataPath, 'utf8');

for (const [lessonId, spineData] of Object.entries(spinesByLessonId)) {
  // Target each lesson's did_you_know: to inject causal_domino_spine right above it
  const lessonRegex = new RegExp(
    `(\\bid:\\s*['"]${lessonId}['"](?:(?!\\bid:\\s*['"])[\\s\\S])*?)(did_you_know:\\s*)`,
  );
  const match = content.match(lessonRegex);
  if (match) {
    if (match[1].includes('causal_domino_spine:')) {
      console.log(`ℹ️ causal_domino_spine already present for ${lessonId}, skipping`);
      continue;
    }
    const formattedSpine = `causal_domino_spine: ${JSON.stringify(spineData, null, 6)},\n      $2`;
    content = content.replace(lessonRegex, `$1${formattedSpine}`);
    console.log(`✅ Injected causal_domino_spine for ${lessonId}`);
  } else {
    console.warn(`⚠️ Could not find injection point for ${lessonId}`);
  }
}

fs.writeFileSync(dataPath, content, 'utf8');
console.log('🎉 Successfully processed milestone spines for units/monarchy_religion_power/data.js');
