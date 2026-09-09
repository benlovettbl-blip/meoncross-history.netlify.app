/**
 * analyze_spec_coverage.cjs
 *
 * Cross-references all official Edexcel GCSE past exam questions (2018-2026)
 * against the official Edexcel Specification bullet points to compute:
 * 1. Topic exam frequency (appearance count)
 * 2. Years appeared & Last Examined year
 * 3. Overdue Priority Index (High / Medium / Recent)
 * 4. High-Tariff Gaps (Topics tested only as 4m that have never appeared as 12m/16m essays)
 * 5. Pedagogical Teacher Advice for mock exams and revision planning
 *
 * Output: public/data/edexcel_medicine_trend_analysis.json
 *         public/data/cme_new_trend_analysis.json
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const PUBLIC_DATA_DIR = path.join(__dirname, '..', 'public', 'data');

// ----------------------------------------------------------------------------
// Dedicated Precision Matcher for Conflict in the Middle East (cme_new)
// ----------------------------------------------------------------------------

function matchQuestionToCME(q, topicTitle, pointText) {
  const fullQ = (
    q.question_text +
    ' ' +
    (q.topic || '') +
    ' ' +
    (q.spec_topic || '') +
    ' ' +
    (q.stimulus || '')
  ).toLowerCase();
  const p = pointText.toLowerCase().replace(/[*_]/g, '');

  // KT1.1: British withdrawal & creation of Israel
  if (p.includes('conflicting interests')) {
    return fullQ.includes('conflicting interests');
  }
  if (p.includes('king david hotel') || p.includes('resolution 181')) {
    return (
      fullQ.includes('king david hotel') ||
      fullQ.includes('resolution 181') ||
      fullQ.includes('partition of palestine') ||
      fullQ.includes('end of the british mandate')
    );
  }
  if (p.includes('key events of the arab-israeli war (1948–49)')) {
    return (
      fullQ.includes('events of the arab-israeli war') ||
      fullQ.includes('arab-israeli war (1948-49) for the state') ||
      (fullQ.includes('arab-israeli war (1948-49)') && fullQ.includes('for the state of israel'))
    );
  }

  // KT1.2: Aftermath of 1948-49 war
  if (p.includes('territorial changes and their impact')) {
    return fullQ.includes('territorial changes');
  }
  if (p.includes('refugee status of palestinian arabs')) {
    return (
      fullQ.includes('refugee') ||
      (fullQ.includes('territorial changes') && fullQ.includes('for palestinians'))
    );
  }
  if (p.includes('israeli defence forces') || p.includes('law of return')) {
    return (
      fullQ.includes('law of return') ||
      fullQ.includes('israeli defence forces') ||
      fullQ.includes('creation of the idf') ||
      fullQ.includes('developments in israel in the years 1949–54') ||
      fullQ.includes('developments in israel in the years 1949-54')
    );
  }
  if (p.includes('us aid to israel')) {
    return (
      fullQ.includes('us aid') ||
      (fullQ.includes('developments in israel in the years 1949') && fullQ.includes('aid'))
    );
  }
  if (p.includes('relations with egypt')) {
    return (
      fullQ.includes('relations between israel and egypt in the years 1949') ||
      fullQ.includes('relations between israel and egypt 1949')
    );
  }

  // KT1.3: Increased tension 1955-63
  if (p.includes('nasser and egypt’s leadership') || p.includes('leadership of the arab world')) {
    return (
      fullQ.includes('nasser for leadership') ||
      (fullQ.includes('nasser') && fullQ.includes('1955–63'))
    );
  }
  if (p.includes('attacks on gaza in 1955')) {
    return (
      fullQ.includes('attacks on gaza') ||
      fullQ.includes('gaza in 1955') ||
      fullQ.includes('gaza raid') ||
      fullQ.includes('sinai in 1956')
    );
  }
  if (p.includes('suez crisis (1956)')) {
    return (
      fullQ.includes('suez crisis') ||
      fullQ.includes('suez in 1956') ||
      fullQ.includes('united arab republic') ||
      fullQ.includes('uar')
    );
  }

  // KT2.1: Six Day War 1967
  if (p.includes('cairo conference (1964)')) {
    return fullQ.includes('cairo conference') || fullQ.includes('growth of fatah');
  }
  if (p.includes('escalating tension between israel, syria')) {
    return (
      fullQ.includes('syria’s support for fatah') ||
      fullQ.includes("syria's support for fatah") ||
      fullQ.includes('raid on samu') ||
      fullQ.includes('7 april 1967')
    );
  }
  if (p.includes('actions of the ussr, nasser and the usa')) {
    return (
      fullQ.includes('actions of the ussr') ||
      (fullQ.includes('superpowers') && fullQ.includes('outbreak of 1967'))
    );
  }
  if (p.includes('key events of the war')) {
    return (
      fullQ.includes('key events of the six day war') ||
      (fullQ.includes('six day war (1967)') &&
        (fullQ.includes('events') || fullQ.includes('security')))
    );
  }

  // KT2.2: Aftermath of the 1967 war
  if (p.includes('resolution 242') && p.includes('suez canal')) {
    return fullQ.includes('resolution 242');
  }
  if (p.includes('occupied territories: golan heights')) {
    return (
      (fullQ.includes('occupied territories') &&
        (fullQ.includes('1967') || fullQ.includes('six day war'))) ||
      fullQ.includes('six day war (1967) for israel’s security')
    );
  }
  if (p.includes('pflp airplane hijacks') || p.includes('munich olympics')) {
    return (
      fullQ.includes('munich') ||
      fullQ.includes('black september') ||
      fullQ.includes('pflp') ||
      fullQ.includes('airplane hijack') ||
      (fullQ.includes('palestinian issue') && fullQ.includes('1970-72'))
    );
  }
  if (p.includes('expulsion of the plo from jordan (1970)')) {
    return (
      (fullQ.includes('expulsion') && fullQ.includes('jordan')) ||
      (fullQ.includes('plo in lebanon') && fullQ.includes('expulsion from jordan'))
    );
  }

  // KT2.3: Israel and Egypt 1967-73
  if (p.includes('egyptian relations with israel, the usa, the ussr')) {
    return (
      fullQ.includes('egypt’s relations with israel in the years 1973-77') ||
      (fullQ.includes('yom kippur war') && fullQ.includes('relations between israel and egypt'))
    );
  }
  if (p.includes('consolidation of control of the occupied territories')) {
    return fullQ.includes('consolidation of control');
  }
  if (p.includes('yom kippur war (1973) and its aftermath')) {
    return fullQ.includes('yom kippur');
  }

  // KT3.1: Diplomatic negotiations 1974-95
  if (p.includes('oil crisis')) {
    return fullQ.includes('oil crisis') || fullQ.includes('opec');
  }
  if (p.includes('kissinger') || p.includes('shuttle diplomacy')) {
    return fullQ.includes('kissinger') || fullQ.includes('shuttle diplomacy');
  }
  if (p.includes('sadat’s visit to israel') || p.includes('camp david')) {
    return (
      fullQ.includes('sadat’s visit') ||
      fullQ.includes('camp david') ||
      fullQ.includes('treaty of washington') ||
      (fullQ.includes('egypt’s relations with israel in the years 1973-77') &&
        fullQ.includes('sadat'))
    );
  }

  // KT3.2: The Palestinian issue
  if (p.includes('arafat’s speech to the un (1974)')) {
    return (
      fullQ.includes('speech to the un (1974)') ||
      (fullQ.includes('arafat') && fullQ.includes('1974'))
    );
  }
  if (p.includes('plo activities in lebanon')) {
    return fullQ.includes('plo in lebanon') || fullQ.includes('plo activities in lebanon');
  }
  if (p.includes('invasion of lebanon (1982)')) {
    return (
      fullQ.includes('invasion of lebanon') || (fullQ.includes('lebanon') && fullQ.includes('1982'))
    );
  }
  if (p.includes('first palestinian intifada')) {
    return fullQ.includes('intifada');
  }

  // KT3.3: Attempts at a solution
  if (p.includes('renunciation of terrorism in a speech at the un (1988)')) {
    return (
      fullQ.includes('renouncing terrorism') ||
      fullQ.includes('renunciation of terrorism') ||
      (fullQ.includes('arafat') && fullQ.includes('1988'))
    );
  }
  if (p.includes('changing superpower policies') || p.includes('end of the cold war')) {
    return (
      fullQ.includes('end of the cold war') ||
      fullQ.includes('gulf war (1991)') ||
      fullQ.includes('madrid conference')
    );
  }
  if (p.includes('oslo accords (1993)') || p.includes('israel-jordan peace treaty')) {
    return (
      fullQ.includes('oslo') ||
      fullQ.includes('israel-jordan peace treaty') ||
      fullQ.includes('negotiations between israel and the palestinians in the years 1993-95')
    );
  }

  return false;
}

// ----------------------------------------------------------------------------
// Topic Matchers & Keyword Mappings
// ----------------------------------------------------------------------------

function matchQuestionToTopic(q, topicTitle, pointText, unitId) {
  if (unitId === 'cme_new') {
    return matchQuestionToCME(q, topicTitle, pointText);
  }

  const fullQ = (
    q.question_text +
    ' ' +
    (q.topic || '') +
    ' ' +
    (q.spec_topic || '') +
    ' ' +
    (q.stimulus || '')
  ).toLowerCase();
  const text = (topicTitle + ' ' + pointText).toLowerCase();

  // Keyword rules for Medicine
  if (
    fullQ.includes('blood transfusion') ||
    fullQ.includes('storage of blood') ||
    fullQ.includes('blood depot')
  ) {
    if (text.includes('blood transfusion') || text.includes('storage of blood')) return true;
  }
  if (fullQ.includes('thomas splint')) {
    if (text.includes('thomas splint')) return true;
  }
  if (fullQ.includes('gas attack') || (fullQ.includes('gas') && fullQ.includes('western front'))) {
    if (
      text.includes('gas') ||
      text.includes('chlorine') ||
      text.includes('phosgene') ||
      text.includes('mustard')
    )
      return true;
  }
  if (
    fullQ.includes('trench foot') ||
    fullQ.includes('trench fever') ||
    fullQ.includes('shell shock') ||
    fullQ.includes('trench environment')
  ) {
    if (
      text.includes('trench foot') ||
      text.includes('trench fever') ||
      text.includes('shell shock') ||
      text.includes('ill health')
    )
      return true;
  }
  if (
    fullQ.includes('stretcher') ||
    fullQ.includes('transporting wounded') ||
    fullQ.includes('ambulance') ||
    fullQ.includes('evacuation chain')
  ) {
    if (
      text.includes('transport') ||
      text.includes('stretcher') ||
      text.includes('ambulance') ||
      text.includes('evacuation')
    )
      return true;
  }
  if (
    fullQ.includes('casualty clearing station') ||
    fullQ.includes('ccs') ||
    fullQ.includes('dressing station')
  ) {
    if (
      text.includes('casualty clearing station') ||
      text.includes('dressing station') ||
      text.includes('chain of evacuation')
    )
      return true;
  }
  if (fullQ.includes('arras') || fullQ.includes('underground hospital')) {
    if (text.includes('arras') || text.includes('tunnels') || text.includes('quarries'))
      return true;
  }
  if (
    fullQ.includes('wound excision') ||
    fullQ.includes('carrel-dakin') ||
    fullQ.includes('debridement') ||
    fullQ.includes('treatment of wounds')
  ) {
    if (
      text.includes('wound excision') ||
      text.includes('carrel-dakin') ||
      text.includes('antiseptic') ||
      text.includes('infection')
    )
      return true;
  }
  if (fullQ.includes('x-ray') || fullQ.includes('roentgen')) {
    if (text.includes('x-ray') || text.includes('roentgen')) return true;
  }

  // Medicine Section B Thematic Study
  if (fullQ.includes('four humours') || fullQ.includes('theory of opposites')) {
    if (text.includes('four humours') || text.includes('opposites')) return true;
  }
  if (fullQ.includes('galen') || fullQ.includes('hippocrates')) {
    if (text.includes('galen') || text.includes('hippocrates')) return true;
  }
  if (fullQ.includes('medieval') && (fullQ.includes('physician') || fullQ.includes('doctor'))) {
    if (text.includes('physician') || text.includes('healers') || text.includes('apothecar'))
      return true;
  }
  if (fullQ.includes('hospital') || fullQ.includes('nightingale')) {
    if (text.includes('hospital') || text.includes('nightingale')) return true;
  }
  if (fullQ.includes('black death') || fullQ.includes('1348')) {
    if (text.includes('black death') || text.includes('1348')) return true;
  }
  if (fullQ.includes('great plague') || fullQ.includes('1665')) {
    if (text.includes('great plague') || text.includes('1665')) return true;
  }
  if (fullQ.includes('vesalius')) {
    if (text.includes('vesalius') || text.includes('anatomy')) return true;
  }
  if (fullQ.includes('william harvey') || fullQ.includes('circulation')) {
    if (text.includes('harvey') || text.includes('circulation')) return true;
  }
  if (fullQ.includes('sydenham')) {
    if (text.includes('sydenham')) return true;
  }
  if (fullQ.includes('printing press')) {
    if (text.includes('printing press')) return true;
  }
  if (fullQ.includes('royal society')) {
    if (text.includes('royal society')) return true;
  }
  if (fullQ.includes('jenner') || fullQ.includes('smallpox') || fullQ.includes('vaccin')) {
    if (text.includes('jenner') || text.includes('vaccination') || text.includes('smallpox'))
      return true;
  }
  if (fullQ.includes('snow') || fullQ.includes('cholera') || fullQ.includes('broad street')) {
    if (text.includes('snow') || text.includes('cholera')) return true;
  }
  if (fullQ.includes('pasteur') || fullQ.includes('germ theory') || fullQ.includes('koch')) {
    if (text.includes('pasteur') || text.includes('germ theory') || text.includes('koch'))
      return true;
  }
  if (fullQ.includes('anaesthetic') || fullQ.includes('chloroform') || fullQ.includes('simpson')) {
    if (text.includes('anaesthetic') || text.includes('chloroform') || text.includes('simpson'))
      return true;
  }
  if (fullQ.includes('antiseptic') || fullQ.includes('lister') || fullQ.includes('carbolic')) {
    if (text.includes('antiseptic') || text.includes('lister') || text.includes('aseptic'))
      return true;
  }
  if (fullQ.includes('public health act') || fullQ.includes('1875')) {
    if (text.includes('public health act') || text.includes('1875') || text.includes('sanitation'))
      return true;
  }
  if (fullQ.includes('dna') || fullQ.includes('genetics') || fullQ.includes('human genome')) {
    if (text.includes('dna') || text.includes('genetic')) return true;
  }
  if (
    fullQ.includes('penicillin') ||
    fullQ.includes('fleming') ||
    fullQ.includes('florey') ||
    fullQ.includes('chain')
  ) {
    if (text.includes('penicillin') || text.includes('antibiotic')) return true;
  }
  if (
    fullQ.includes('nhs') ||
    fullQ.includes('national health service') ||
    fullQ.includes('bevan')
  ) {
    if (
      text.includes('nhs') ||
      text.includes('national health service') ||
      text.includes('access to care')
    )
      return true;
  }
  if (fullQ.includes('lifestyle') || fullQ.includes('smoking') || fullQ.includes('anti-smoking')) {
    if (text.includes('lifestyle') || text.includes('smoking') || text.includes('lung cancer'))
      return true;
  }

  // Elizabethan England Matching
  if (
    fullQ.includes('virgin queen') ||
    fullQ.includes('legitimacy') ||
    fullQ.includes('gender') ||
    fullQ.includes('marriage')
  ) {
    if (
      text.includes('virgin queen') ||
      text.includes('legitimacy') ||
      text.includes('gender') ||
      text.includes('marriage')
    )
      return true;
  }
  if (
    fullQ.includes('financial weaknesses') ||
    fullQ.includes('crown debt') ||
    fullQ.includes('french threat') ||
    fullQ.includes('challenges at home and from abroad')
  ) {
    if (
      text.includes('financial weaknesses') ||
      text.includes('french threat') ||
      text.includes('divisions')
    )
      return true;
  }
  if (
    fullQ.includes('religious settlement') ||
    fullQ.includes('act of supremacy') ||
    fullQ.includes('act of uniformity') ||
    fullQ.includes('supreme governor')
  ) {
    if (text.includes('religious settlement') || text.includes('features and impact')) return true;
  }
  if (
    fullQ.includes('church of england') &&
    (fullQ.includes('society') || fullQ.includes('visitations') || fullQ.includes('role'))
  ) {
    if (text.includes('church of england') || text.includes('role in society')) return true;
  }
  if (
    fullQ.includes('puritan challenge') ||
    fullQ.includes('puritan') ||
    fullQ.includes('vestment') ||
    fullQ.includes('crucifix')
  ) {
    if (text.includes('puritan challenge') || text.includes('nature and extent of the puritan'))
      return true;
  }
  if (
    fullQ.includes('catholic challenge') ||
    fullQ.includes('papacy') ||
    fullQ.includes('excommunication') ||
    fullQ.includes('papal bull')
  ) {
    if (text.includes('catholic challenge') || text.includes('role of the nobility, papacy'))
      return true;
  }
  if (
    fullQ.includes('claim to the english throne') ||
    (fullQ.includes('mary, queen of scots') && fullQ.includes('claim'))
  ) {
    if (text.includes('claim to the english throne')) return true;
  }
  if (
    fullQ.includes('relations between elizabeth and mary') ||
    (fullQ.includes('elizabeth and mary') && fullQ.includes('1568'))
  ) {
    if (text.includes('relations between elizabeth and mary')) return true;
  }
  if (fullQ.includes('northern earls') || fullQ.includes('1569-70') || fullQ.includes('1569–70')) {
    if (text.includes('northern earls') || text.includes('revolt of the northern earls'))
      return true;
  }
  if (
    fullQ.includes('ridolfi') ||
    fullQ.includes('throckmorton') ||
    fullQ.includes('babington') ||
    fullQ.includes('plots and revolts')
  ) {
    if (text.includes('ridolfi') || text.includes('throckmorton') || text.includes('babington'))
      return true;
  }
  if (fullQ.includes('walsingham') || fullQ.includes('spies') || fullQ.includes('ciphers')) {
    if (text.includes('walsingham') || text.includes('use of spies')) return true;
  }
  if (fullQ.includes('execution of mary') || fullQ.includes('execution in 1587')) {
    if (text.includes('execution in 1587') || text.includes("mary queen of scots' execution"))
      return true;
  }
  if (
    fullQ.includes('rivalry') &&
    (fullQ.includes('spain') || fullQ.includes('netherlands') || fullQ.includes('commercial'))
  ) {
    if (text.includes('rivalry') || text.includes('relations with spain')) return true;
  }
  if (
    fullQ.includes('drake') ||
    fullQ.includes('privateering') ||
    fullQ.includes('cadiz') ||
    fullQ.includes('circumnavigation')
  ) {
    if (text.includes('privateering') || text.includes('drake')) return true;
  }
  if (
    fullQ.includes('outbreak of war') ||
    fullQ.includes('dudley') ||
    fullQ.includes('leicester in the netherlands')
  ) {
    if (text.includes('outbreak of war') || text.includes('1585–88') || text.includes('1585-88'))
      return true;
  }
  if (
    fullQ.includes('armada') &&
    (fullQ.includes('defeat') ||
      fullQ.includes('tactics') ||
      fullQ.includes('gravelines') ||
      fullQ.includes('fireships'))
  ) {
    if (text.includes('reasons for defeat') || text.includes('spanish armada')) return true;
  }
  if (
    fullQ.includes('education') ||
    fullQ.includes('grammar school') ||
    fullQ.includes('petty school') ||
    fullQ.includes('universities')
  ) {
    if (text.includes('education') || text.includes('schools and universities')) return true;
  }
  if (
    fullQ.includes('leisure') ||
    fullQ.includes('theatre') ||
    fullQ.includes('pastimes') ||
    fullQ.includes('bear baiting')
  ) {
    if (text.includes('leisure') || text.includes('pastimes') || text.includes('theatre'))
      return true;
  }
  if (
    fullQ.includes('poverty') ||
    fullQ.includes('vagabonds') ||
    fullQ.includes('vagrants') ||
    fullQ.includes('causes of poverty')
  ) {
    if (
      text.includes('poverty') ||
      text.includes('vagabondage') ||
      text.includes('causes of poverty')
    )
      return true;
  }
  if (
    fullQ.includes('poor law') ||
    fullQ.includes('changing attitudes') ||
    fullQ.includes('1572') ||
    fullQ.includes('1576')
  ) {
    if (
      text.includes('poor relief') ||
      text.includes('poor law') ||
      text.includes('attitudes to the poor')
    )
      return true;
  }
  if (
    fullQ.includes('exploration') ||
    fullQ.includes('voyages of discovery') ||
    fullQ.includes('navigational aids')
  ) {
    if (text.includes('exploration') || text.includes('voyages of discovery')) return true;
  }
  if (
    fullQ.includes('virginia') ||
    fullQ.includes('roanoke') ||
    fullQ.includes('raleigh') ||
    fullQ.includes('colonisation')
  ) {
    if (text.includes('virginia') || text.includes('roanoke') || text.includes('colonisation'))
      return true;
  }

  // Weimar & Nazi Germany Matching
  if (
    fullQ.includes('end of the war') ||
    fullQ.includes('kaiser') ||
    fullQ.includes('armistice') ||
    fullQ.includes('origins of the republic')
  ) {
    if (
      text.includes('end of the war') ||
      text.includes('origins of the republic') ||
      text.includes('abdication')
    )
      return true;
  }
  if (
    fullQ.includes('weimar constitution') ||
    fullQ.includes('proportional representation') ||
    fullQ.includes('article 48')
  ) {
    if (text.includes('strengths and weaknesses') || text.includes('constitution')) return true;
  }
  if (
    fullQ.includes('unpopular') ||
    fullQ.includes('stab in the back') ||
    fullQ.includes('dolchstoss') ||
    fullQ.includes('treaty of versailles')
  ) {
    if (
      text.includes('unpopularity') ||
      text.includes('stab in the back') ||
      text.includes('treaty of versailles')
    )
      return true;
  }
  if (
    fullQ.includes('spartacist') ||
    fullQ.includes('freikorps') ||
    fullQ.includes('kapp putsch') ||
    fullQ.includes('instability in the years 1918–23') ||
    fullQ.includes('unstable in the years 1918–23')
  ) {
    if (
      text.includes('spartacists') ||
      text.includes('kapp putsch') ||
      text.includes('left and right')
    )
      return true;
  }
  if (
    fullQ.includes('hyperinflation') ||
    fullQ.includes('ruhr') ||
    fullQ.includes('challenges of 1923') ||
    fullQ.includes('problems faced by the weimar republic in 1923') ||
    fullQ.includes('challenges facing the weimar republic in the years 1919–1923') ||
    fullQ.includes('challenges facing the weimar republic in the years 1919-1923') ||
    fullQ.includes('challenges facing the weimar republic in the years 1919-23')
  ) {
    if (
      text.includes('hyperinflation') ||
      text.includes('ruhr') ||
      text.includes('challenges of 1923')
    )
      return true;
  }
  if (
    fullQ.includes('economy recovered') ||
    fullQ.includes('economic recovery') ||
    fullQ.includes('stresemann') ||
    fullQ.includes('dawes') ||
    fullQ.includes('rentenmark')
  ) {
    if (text.includes('economic recovery') || text.includes('stresemann') || text.includes('dawes'))
      return true;
  }
  if (
    fullQ.includes('international acceptance') ||
    fullQ.includes('locarno') ||
    fullQ.includes('league of nations')
  ) {
    if (text.includes('international acceptance') || text.includes('locarno')) return true;
  }
  if (
    fullQ.includes('standard of living') &&
    (fullQ.includes('weimar') || fullQ.includes('1924–29') || fullQ.includes('1924-29'))
  ) {
    if (text.includes('standard of living') && text.includes('1924–29')) return true;
  }
  if (
    (fullQ.includes('women') || fullQ.includes('position of women')) &&
    (fullQ.includes('weimar') ||
      fullQ.includes('1924–1939') ||
      fullQ.includes('1924-1939') ||
      fullQ.includes('1924–29'))
  ) {
    if (text.includes('position of women') || text.includes('women in work')) return true;
  }
  if (
    fullQ.includes('cultural changes') ||
    fullQ.includes('bauhaus') ||
    fullQ.includes('architecture') ||
    fullQ.includes('art and the cinema')
  ) {
    if (text.includes('cultural changes') || text.includes('architecture')) return true;
  }
  if (
    fullQ.includes('early development of the nazi party') ||
    fullQ.includes('early career') ||
    fullQ.includes("german workers' party") ||
    fullQ.includes('early 1920s')
  ) {
    if (
      text.includes("german workers' party") ||
      text.includes('setting up the nazi party') ||
      text.includes('early development')
    )
      return true;
  }
  if (
    fullQ.includes('twenty-five point') ||
    fullQ.includes('25 point') ||
    fullQ.includes('role of the sa')
  ) {
    if (text.includes('twenty-five point') || text.includes('role of the sa')) return true;
  }
  if (
    fullQ.includes('munich putsch') ||
    fullQ.includes('mein kampf') ||
    fullQ.includes('beer hall')
  ) {
    if (text.includes('munich putsch') || text.includes('mein kampf')) return true;
  }
  if (
    fullQ.includes('reorganised') ||
    fullQ.includes('bamberg') ||
    fullQ.includes('limited support') ||
    fullQ.includes('lean years') ||
    fullQ.includes('support for the nazi party in the years 1924')
  ) {
    if (
      text.includes('limited support') ||
      text.includes('party reorganisation') ||
      text.includes('bamberg')
    )
      return true;
  }
  if (
    fullQ.includes('support for the nazi party grew') ||
    fullQ.includes('growth in support') ||
    fullQ.includes('wall street crash') ||
    fullQ.includes('great depression')
  ) {
    if (text.includes('growth in support') || text.includes('1929–32') || text.includes('1929-32'))
      return true;
  }
  if (
    fullQ.includes('became chancellor') ||
    fullQ.includes('chancellor in 1933') ||
    fullQ.includes('hindenburg') ||
    fullQ.includes('papen')
  ) {
    if (
      text.includes('hitler became chancellor') ||
      text.includes('1932–33') ||
      text.includes('1932-33')
    )
      return true;
  }
  if (
    fullQ.includes('reichstag fire') ||
    fullQ.includes('enabling act') ||
    fullQ.includes('night of the long knives') ||
    fullQ.includes('creating a dictatorship')
  ) {
    if (
      text.includes('dictatorship') ||
      text.includes('reichstag fire') ||
      text.includes('enabling act') ||
      text.includes('night of the long knives')
    )
      return true;
  }
  if (
    fullQ.includes('police state') ||
    fullQ.includes('concentration camps') ||
    fullQ.includes('gestapo') ||
    fullQ.includes('law courts') ||
    fullQ.includes('ss')
  ) {
    if (
      text.includes('police state') ||
      text.includes('ss and the gestapo') ||
      text.includes('legal system')
    )
      return true;
  }
  if (
    fullQ.includes('propaganda') ||
    fullQ.includes('censorship') ||
    fullQ.includes('nazi rallies') ||
    fullQ.includes('berlin olympic') ||
    fullQ.includes('olympic games') ||
    fullQ.includes('controlling attitudes') ||
    fullQ.includes('methods of controlling')
  ) {
    if (
      text.includes('propaganda') ||
      text.includes('controlling and influencing') ||
      text.includes('culture and the arts')
    )
      return true;
  }
  if (
    fullQ.includes('opposition') ||
    fullQ.includes('dealt with opposition') ||
    fullQ.includes('churches') ||
    fullQ.includes('niemoller') ||
    fullQ.includes('edelweiss') ||
    fullQ.includes('swing youth') ||
    fullQ.includes('support for the nazi regime')
  ) {
    if (
      text.includes('opposition') ||
      text.includes('churches') ||
      text.includes('conformity') ||
      text.includes('young people towards the nazis')
    )
      return true;
  }
  if (
    fullQ.includes('nazi policies towards women') ||
    (fullQ.includes('women') && fullQ.includes('nazi'))
  ) {
    if (text.includes('nazi policies towards women') || text.includes('women, marriage and family'))
      return true;
  }
  if (
    fullQ.includes('hitler youth') ||
    fullQ.includes('education in nazi germany') ||
    fullQ.includes('nazi policies towards the young')
  ) {
    if (
      text.includes('nazi policies towards the young') ||
      text.includes('hitler youth') ||
      text.includes('education')
    )
      return true;
  }
  if (
    fullQ.includes('reduce unemployment') ||
    fullQ.includes('rearmament') ||
    fullQ.includes('autobahns') ||
    fullQ.includes('living standards in nazi germany') ||
    fullQ.includes('employment and living standards')
  ) {
    if (
      text.includes('employment and living standards') ||
      text.includes('standard of living') ||
      text.includes('reducing unemployment')
    )
      return true;
  }
  if (
    fullQ.includes('kristallnacht') ||
    fullQ.includes('persecution of minorities') ||
    fullQ.includes('jews') ||
    fullQ.includes('nuremberg laws')
  ) {
    if (
      text.includes('persecution of minorities') ||
      text.includes('racial beliefs') ||
      text.includes('jews')
    )
      return true;
  }

  // Keyword rules for USA (1HI0/33)
  if (
    fullQ.includes('black panther') ||
    fullQ.includes('black power') ||
    fullQ.includes('carmichael') ||
    fullQ.includes('olympics')
  ) {
    if (
      text.includes('black power') ||
      text.includes('black panther') ||
      text.includes('radicalism')
    )
      return true;
  }
  if (
    fullQ.includes('montgomery bus boycott') ||
    fullQ.includes('rosa parks') ||
    fullQ.includes('browder v. gayle') ||
    fullQ.includes('mia')
  ) {
    if (text.includes('montgomery bus boycott') || text.includes('rosa parks')) return true;
  }
  if (
    fullQ.includes('little rock') ||
    fullQ.includes('brown v. topeka') ||
    fullQ.includes('progress in education') ||
    fullQ.includes('desegregation of little rock')
  ) {
    if (
      text.includes('brown v. topeka') ||
      text.includes('little rock') ||
      text.includes('progress in education')
    )
      return true;
  }
  if (
    fullQ.includes('opposition to the civil rights movement') ||
    fullQ.includes('dixiecrats') ||
    fullQ.includes('white citizens') ||
    fullQ.includes('ku klux klan') ||
    fullQ.includes('emmett till')
  ) {
    if (
      text.includes('resistance to desegregation') ||
      text.includes('dixiecrats') ||
      text.includes('ku klux klan') ||
      text.includes('emmett till') ||
      text.includes('civil rights act of 1957')
    )
      return true;
  }
  if (
    fullQ.includes('march on washington') ||
    fullQ.includes('birmingham') ||
    fullQ.includes('bull connor') ||
    fullQ.includes('civil rights act 1964') ||
    fullQ.includes('civil rights act of 1964') ||
    fullQ.includes('achievements of martin luther king') ||
    fullQ.includes('achievements of the civil rights movement')
  ) {
    if (
      text.includes('birmingham') ||
      text.includes('washington') ||
      text.includes('civil rights act 1964') ||
      text.includes('martin luther king')
    )
      return true;
  }
  if (
    fullQ.includes('freedom summer') ||
    fullQ.includes('selma') ||
    fullQ.includes('voting rights act')
  ) {
    if (
      text.includes('freedom summer') ||
      text.includes('selma') ||
      text.includes('voting rights act')
    )
      return true;
  }
  if (
    fullQ.includes('sit-in') ||
    fullQ.includes('greensboro') ||
    fullQ.includes('freedom ride') ||
    fullQ.includes('james meredith') ||
    fullQ.includes('ole miss')
  ) {
    if (text.includes('sit-in') || text.includes('freedom ride') || text.includes('james meredith'))
      return true;
  }
  if (
    fullQ.includes('treatment of black americans') ||
    fullQ.includes('early 1950s') ||
    fullQ.includes('jim crow') ||
    fullQ.includes('segregation')
  ) {
    if (
      text.includes('position of black americans') ||
      text.includes('racial segregation') ||
      text.includes('jim crow')
    )
      return true;
  }
  if (fullQ.includes('tet offensive')) {
    if (text.includes('tet offensive')) return true;
  }
  if (
    fullQ.includes('strategic hamlet') ||
    fullQ.includes('domino theory') ||
    fullQ.includes('escalation of us involvement') ||
    fullQ.includes('became more involved in the conflict') ||
    fullQ.includes('reasons for us involvement')
  ) {
    if (
      text.includes('reasons for us involvement') ||
      text.includes('strategic hamlet') ||
      text.includes('escalation under johnson') ||
      text.includes('domino theory')
    )
      return true;
  }
  if (
    fullQ.includes('vietcong') ||
    fullQ.includes('search and destroy') ||
    fullQ.includes('ho chi minh trail') ||
    fullQ.includes('agent orange') ||
    fullQ.includes('booby traps') ||
    fullQ.includes('guerrilla') ||
    fullQ.includes('nature of the conflict')
  ) {
    if (
      text.includes('nature of the conflict') ||
      text.includes('guerrilla tactics') ||
      text.includes('search and destroy') ||
      text.includes('ho chi minh trail')
    )
      return true;
  }
  if (
    fullQ.includes('opposition in the usa to the vietnam war') ||
    fullQ.includes('anti-war') ||
    fullQ.includes('my lai') ||
    fullQ.includes('kent state')
  ) {
    if (
      text.includes('opposition to the war') ||
      text.includes('anti-war movement') ||
      text.includes('my lai')
    )
      return true;
  }
  if (
    fullQ.includes('vietnamisation') ||
    fullQ.includes('president nixon') ||
    fullQ.includes('nixon doctrine') ||
    fullQ.includes('cambodia') ||
    fullQ.includes('bombing of north vietnam')
  ) {
    if (
      text.includes('support for the war and nixon') ||
      text.includes('vietnamisation') ||
      text.includes('nixon')
    )
      return true;
  }
  if (
    fullQ.includes('peace negotiations') ||
    fullQ.includes('paris peace accords') ||
    fullQ.includes('failure of the usa in vietnam') ||
    fullQ.includes('reasons for the failure')
  ) {
    if (
      text.includes('peace negotiations') ||
      text.includes('failure of the usa') ||
      text.includes('consequences')
    )
      return true;
  }

  return false;
}

// ----------------------------------------------------------------------------
// Process Unit Specification Analysis
// ----------------------------------------------------------------------------

function analyzeUnit(specFile, pastPapersFile, unitId) {
  const spec = JSON.parse(fs.readFileSync(specFile, 'utf8'));
  const pastData = JSON.parse(fs.readFileSync(pastPapersFile, 'utf8'));

  // Flatten all questions
  const allQuestions = [];
  pastData.papers.forEach((p) => {
    p.questions.forEach((q) => {
      allQuestions.push({
        ...q,
        year: p.year,
        season: p.season,
        series: p.series,
      });
    });
  });

  const analysis = {
    unit_id: unitId,
    title: spec.title || 'GCSE History Specification',
    subtitle: spec.subtitle || '',
    generated_at: new Date().toISOString(),
    total_past_questions: allQuestions.length,
    total_series_analyzed: pastData.papers.length,
    sections: [],
  };

  let totalPoints = 0;
  let totalOverdue = 0;
  let totalHighTariffGaps = 0;

  spec.sections.forEach((sec) => {
    const secAnalysis = {
      id: sec.id,
      title: sec.title,
      topics: [],
    };

    sec.topics.forEach((top) => {
      const topAnalysis = {
        title: top.title,
        points: [],
      };

      top.points.forEach((pt, idx) => {
        totalPoints++;
        const matchedQuestions = allQuestions.filter((q) =>
          matchQuestionToTopic(q, top.title, pt, unitId),
        );

        const yearsAppeared = [...new Set(matchedQuestions.map((q) => q.year))].sort(
          (a, b) => a - b,
        );
        const tariffs = [...new Set(matchedQuestions.map((q) => q.tariff))].sort((a, b) => a - b);
        const has8m = matchedQuestions.some((q) => q.tariff === 8);
        const has12m = matchedQuestions.some((q) => q.tariff === 12);
        const has16m = matchedQuestions.some((q) => q.tariff === 16);
        const lastYear = yearsAppeared.length > 0 ? Math.max(...yearsAppeared) : null;
        const lastExamQ = matchedQuestions.find((q) => q.year === lastYear);
        const isLastSpecimen =
          lastYear === 2026 ||
          (lastExamQ &&
            (lastExamQ.season === 'Specimen' ||
              (lastExamQ.series && lastExamQ.series.toLowerCase().includes('specimen'))));

        let overdueStatus = 'high'; // default
        let overdueScore = 100;

        if (lastYear === null) {
          overdueStatus = 'high';
          overdueScore = 100; // Never examined!
        } else if (lastYear <= 2020) {
          overdueStatus = 'high';
          overdueScore = 80 + (2020 - lastYear) * 5;
        } else if (lastYear <= 2023) {
          overdueStatus = 'medium';
          overdueScore = 50;
        } else {
          overdueStatus = 'recent';
          overdueScore = 15;
        }

        if (overdueStatus === 'high') totalOverdue++;

        // High tariff gap determination based on unit & section specification:
        // - Paper 2 Period Study (cme_new): Tariffs are strictly 4m (consequence) & 8m (narrative/importance).
        //   There are NO 12m or 16m questions. A high tariff gap means it has only appeared as 4m (or unexamined), but never as an 8m question.
        // - Paper 1 Section A Western Front: Tariffs are 2m, 4m, 8m (utility). High tariff is 8m.
        // - Thematic & Depth Studies (Medicine Sec B, Elizabethan England, Weimar Germany, USA): High tariff is 12m & 16m essays.
        const isPeriodStudy = unitId === 'cme_new';
        const isWesternFront = unitId === 'edexcel_medicine' && sec.id === 'section-a';

        let highTariffGap = false;
        if (isPeriodStudy || isWesternFront) {
          highTariffGap = !has8m;
        } else {
          highTariffGap = !has12m && !has16m;
        }

        if (highTariffGap) totalHighTariffGaps++;

        // Generate tailored teacher pedagogical notes
        let teacherNote = '';
        if (lastYear === null) {
          teacherNote =
            '⚠️ UNEXAMINED TOPIC: This specification point has never appeared on an official Edexcel paper since 2018. It is prime territory for an upcoming series.';
        } else if (isLastSpecimen && lastExamQ) {
          teacherNote = `📋 SPECIMEN PAPER: Featured in the official 2026 Specimen Paper (${lastExamQ.q_number}, ${lastExamQ.tariff}m). Excellent model for how this topic will be assessed in the current specification.`;
        } else if (overdueStatus === 'high') {
          teacherNote = `🔥 HIGHLY OVERDUE: Last set in ${lastYear}. It has been ${2026 - lastYear} years since students were tested on this topic. Ideal candidate for mocks.`;
        } else if (highTariffGap && tariffs.length > 0) {
          if (isPeriodStudy) {
            teacherNote = `🎯 8M HIGH-TARIFF GAP: Examined previously as a 4m consequence question, but NEVER set as an 8m narrative account or importance question. Watch out for an 8-mark question on this topic.`;
          } else if (isWesternFront) {
            teacherNote = `🎯 8M UTILITY GAP: Examined previously as a ${tariffs.join('m, ')}m question, but NEVER set as an 8m source utility question. Watch out for an 8-mark utility question on this topic.`;
          } else {
            teacherNote = `🎯 ESSAY GAP: Examined previously as a ${tariffs.join('m, ')}m question, but NEVER set as a 12m or 16m essay. Watch out for an extended evaluation question.`;
          }
        } else if (overdueStatus === 'recent') {
          if (isPeriodStudy) {
            teacherNote = `✅ RECENTLY TESTED: Examined in ${lastYear}. Less likely to appear as an 8-mark question in the immediate next series, but still vulnerable to short 4-mark consequence questions.`;
          } else if (isWesternFront) {
            teacherNote = `✅ RECENTLY TESTED: Examined in ${lastYear}. Less likely to appear as an 8-mark utility question in the immediate next series, but still vulnerable to short feature questions.`;
          } else {
            teacherNote = `✅ RECENTLY TESTED: Examined in ${lastYear}. Less likely to appear as a high-tariff essay in the immediate next series, but still vulnerable to short feature/source questions.`;
          }
        } else {
          teacherNote = `⚖️ BALANCED ROTATION: Examined in ${lastYear}. Keep in regular retrieval rotation.`;
        }

        topAnalysis.points.push({
          point_index: idx + 1,
          point_text: pt,
          exam_count: matchedQuestions.length,
          years_appeared: yearsAppeared,
          last_examined: lastYear ? lastYear : 'Never',
          last_examined_series: lastExamQ ? lastExamQ.series || `${lastYear}` : null,
          is_last_specimen: !!isLastSpecimen,
          tariffs_examined: tariffs,
          has_8m: has8m,
          has_12m: has12m,
          has_16m: has16m,
          high_tariff_gap: highTariffGap,
          overdue_status: overdueStatus,
          overdue_score: overdueScore,
          matched_questions: matchedQuestions.map((q) => ({
            q_id: q.q_id,
            q_number: q.q_number,
            year: q.year,
            season: q.season,
            series: q.series || `${q.year}`,
            is_specimen:
              q.year === 2026 ||
              q.season === 'Specimen' ||
              (q.series && q.series.toLowerCase().includes('specimen')),
            tariff: q.tariff,
            type: q.type,
            question_text: q.question_text,
          })),
          teacher_note: teacherNote,
        });
      });

      secAnalysis.topics.push(topAnalysis);
    });

    analysis.sections.push(secAnalysis);
  });

  analysis.summary_stats = {
    total_specification_points: totalPoints,
    overdue_topics_count: totalOverdue,
    high_tariff_gaps_count: totalHighTariffGaps,
    overdue_percentage: Math.round((totalOverdue / totalPoints) * 100),
  };

  return analysis;
}

// ----------------------------------------------------------------------------
// Run & Save Analyses
// ----------------------------------------------------------------------------

function run() {
  const medSpec = path.join(DATA_DIR, 'edexcel_medicine_spec.json');
  const medPast = path.join(PUBLIC_DATA_DIR, 'edexcel_medicine_past_papers.json');
  const medAnalysis = analyzeUnit(medSpec, medPast, 'edexcel_medicine');
  const medOut = path.join(PUBLIC_DATA_DIR, 'edexcel_medicine_trend_analysis.json');
  fs.writeFileSync(medOut, JSON.stringify(medAnalysis, null, 2), 'utf8');
  console.log(`[OK] Medicine Trend Analysis saved to ${medOut}`);
  console.log(
    `     Total Spec Points: ${medAnalysis.summary_stats.total_specification_points}, Overdue: ${medAnalysis.summary_stats.overdue_topics_count} (${medAnalysis.summary_stats.overdue_percentage}%)`,
  );

  const cmeSpec = path.join(DATA_DIR, 'cme_new_spec.json');
  const cmePast = path.join(PUBLIC_DATA_DIR, 'cme_new_past_papers.json');
  const cmeAnalysis = analyzeUnit(cmeSpec, cmePast, 'cme_new');
  const cmeOut = path.join(PUBLIC_DATA_DIR, 'cme_new_trend_analysis.json');
  fs.writeFileSync(cmeOut, JSON.stringify(cmeAnalysis, null, 2), 'utf8');
  console.log(`[OK] CME Trend Analysis saved to ${cmeOut}`);
  console.log(
    `     Total Spec Points: ${cmeAnalysis.summary_stats.total_specification_points}, Overdue: ${cmeAnalysis.summary_stats.overdue_topics_count} (${cmeAnalysis.summary_stats.overdue_percentage}%)`,
  );

  const elizSpec = path.join(DATA_DIR, 'eee_spec.json');
  const elizPast = path.join(PUBLIC_DATA_DIR, 'eee_past_papers.json');
  const elizAnalysis = analyzeUnit(elizSpec, elizPast, 'eee');
  const elizOut = path.join(PUBLIC_DATA_DIR, 'eee_trend_analysis.json');
  fs.writeFileSync(elizOut, JSON.stringify(elizAnalysis, null, 2), 'utf8');
  console.log(`[OK] Elizabethan England Trend Analysis saved to ${elizOut}`);
  console.log(
    `     Total Spec Points: ${elizAnalysis.summary_stats.total_specification_points}, Overdue: ${elizAnalysis.summary_stats.overdue_topics_count} (${elizAnalysis.summary_stats.overdue_percentage}%)`,
  );

  const germanySpec = path.join(DATA_DIR, 'weimar_nazi_germany_spec.json');
  const germanyPast = path.join(PUBLIC_DATA_DIR, 'weimar_nazi_germany_past_papers.json');
  const germanyAnalysis = analyzeUnit(germanySpec, germanyPast, 'weimar_nazi_germany');
  const germanyOut = path.join(PUBLIC_DATA_DIR, 'weimar_nazi_germany_trend_analysis.json');
  fs.writeFileSync(germanyOut, JSON.stringify(germanyAnalysis, null, 2), 'utf8');
  console.log(`[OK] Germany Trend Analysis saved to ${germanyOut}`);
  console.log(
    `     Total Spec Points: ${germanyAnalysis.summary_stats.total_specification_points}, Overdue: ${germanyAnalysis.summary_stats.overdue_topics_count} (${germanyAnalysis.summary_stats.overdue_percentage}%)`,
  );

  const usaSpec = path.join(DATA_DIR, 'usa_spec.json');
  const usaPast = path.join(PUBLIC_DATA_DIR, 'usa_past_papers.json');
  const usaAnalysis = analyzeUnit(usaSpec, usaPast, 'usa');
  const usaOut = path.join(PUBLIC_DATA_DIR, 'usa_trend_analysis.json');
  fs.writeFileSync(usaOut, JSON.stringify(usaAnalysis, null, 2), 'utf8');
  console.log(`[OK] USA Trend Analysis saved to ${usaOut}`);
  console.log(
    `     Total Spec Points: ${usaAnalysis.summary_stats.total_specification_points}, Overdue: ${usaAnalysis.summary_stats.overdue_topics_count} (${usaAnalysis.summary_stats.overdue_percentage}%)`,
  );
}

run();
