const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'units', 'early_modern_world', 'data.js');

const vettedVideos = [
  // L1: Who held global power in 1450?
  [
    {
      url: 'https://www.youtube.com/watch?v=NJMZURabB2k',
      title: '[STARTER HOOK] The World in 1450: Ming Dynasty, Ottoman Empire & The Silk Roads',
      duration: '4 mins 30 secs',
      teacher_guidance:
        'Overview of the dominant global superpowers of 1450: the wealth of Ming China, the Ottoman Empire controlling trade routes to the East, the Mali Empire, and why European kingdoms were peripheral.',
    },
  ],

  // L2: How did religious conflict trigger global exploration (1517–1588)?
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/the-battle-against-the-spanish-armada-battlefield-britain/',
      title:
        "[ENQUIRY EVIDENCE] Battlefield Britain: The Spanish Armada & Philip II's Crusade (BBC Two)",
      duration: '58 mins 48 secs',
      teacher_guidance:
        '⏱️ Watch Window: 18:20–25:40. Shows the decisive naval engagement at Gravelines: fireships scattering the Spanish crescent formation and English culverins forcing the Armada into the North Sea.',
    },
  ],

  // L3: Trade or takeover: How did early encounters turn into empire?
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/joint-stock-companies-empire-with-david-olusoga/',
      title:
        '[STARTER HOOK] Empire: The East India Company & Joint-Stock Corporations with David Olusoga (BBC)',
      duration: '5 mins 15 secs',
      teacher_guidance:
        'David Olusoga explains how private merchants pooled capital with royal charters to create the East India Company, transforming commercial trade into sovereign colonial rule.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/roanoke-horrible-histories/',
      title:
        '[ENQUIRY EVIDENCE] Early English Colonisation: Walter Raleigh & The Lost Colony of Roanoke (1585)',
      duration: '4 mins 20 secs',
      teacher_guidance:
        'Investigates England’s disastrous first attempt to plant a permanent settlement in Virginia, supply ship delays caused by the Spanish Armada, and the mysterious disappearance of the colonists.',
    },
  ],

  // L4: James I and the Gunpowder Plot: Why was religious division so volatile?
  [
    {
      url: 'https://www.youtube.com/watch?v=s_fTwtgS03A',
      title:
        '[STARTER HOOK] The Gunpowder Plot (5 November 1605): Guy Fawkes & Robert Catesby (BBC Teach)',
      duration: '4 mins 30 secs',
      teacher_guidance:
        'How Jacobean recusancy fines, priest hunting, and the dashed hopes of Catholic toleration under James I drove Robert Catesby to hatch the 36-barrel gunpowder conspiracy.',
    },
  ],

  // L5: Who controlled Britain? The Ideological Battle
  [
    {
      url: 'https://www.youtube.com/watch?v=bZ7J3n3sD0Y',
      title:
        '[STARTER HOOK] The Causes of the English Civil War: Charles I & The Divine Right of Kings (BBC Teach)',
      duration: '4 mins 45 secs',
      teacher_guidance:
        'Examines the escalating constitutional struggle over Ship Money, Archbishop Laud’s religious reforms, and Charles I entering the House of Commons with armed guards to arrest the Five Members.',
    },
  ],

  // L6: Who controlled Britain? The Economic Shift
  [
    {
      url: 'https://www.youtube.com/watch?v=2YfKCEQ7pC4',
      title: '[PRIMARY EVIDENCE] The Trial and Execution of King Charles I (30 January 1649) (BBC)',
      duration: '5 mins 0 secs',
      teacher_guidance:
        'The historic legal precedent of putting a reigning monarch on trial for high treason against his own subjects, the execution at Whitehall, and the establishment of the Commonwealth.',
    },
  ],

  // L7: What were the mechanics of the Transatlantic Slave Trade? (Culled from 11 videos!)
  [
    {
      url: 'https://www.youtube.com/watch?v=k7OQjNRsrvI',
      title:
        '[PRIMARY EVIDENCE] David Harewood Learns Horrifying Details of Barbados Slave Code (1661)',
      duration: '4 mins 52 secs',
      teacher_guidance:
        'Actor David Harewood examines original colonial court archives detailing the 1661 Barbados Slave Act—the legal blueprint that classified human beings as absolute chattel property.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/bbc-two-britains-forgotten-slave-owners-profit-and-loss-west-india-docks-and-the-sugar-economy/',
      title:
        "[ENQUIRY EVIDENCE] BBC Two: Britain's Forgotten Slave Owners – Sugar, Shipping & West India Docks",
      duration: '6 mins 30 secs',
      teacher_guidance:
        "David Olusoga details the commercial scale of the trade: how slave-grown sugar funded British banks, insurance firms, and grand infrastructure like London's West India Docks.",
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/a-people-stolen-enslaved-with-samuel-l-jackson/',
      title:
        '[DOCUMENTARY EXTENSION] Enslaved with Samuel L. Jackson: The Middle Passage & Sunken Slave Ships',
      duration: '48 mins 0 secs',
      teacher_guidance:
        '⏱️ Watch Window: 12:15–18:40. Diving the underwater wreckage of transatlantic slave vessels, examining shackles, ballast stones, and the brutal dehumanisation of the Middle Passage.',
    },
  ],

  // L8: How did enslaved Africans resist the Transatlantic Slave Trade? (Culled from 4 to 2!)
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/resistance-enslaved-with-samuel-l-jackson/',
      title: '[STARTER HOOK] Resistance: Enslaved with Samuel L. Jackson (BBC / Epix)',
      duration: '48 mins 0 secs',
      teacher_guidance:
        '⏱️ Watch Window: 08:30–15:10. Powerful examination of African agency: shipboard uprisings, poison plots, maroon settlements in the mountains, and active subversion of plantation labour.',
    },
    {
      url: 'https://www.youtube.com/watch?v=ITtNDpkW26c',
      title:
        '[ENQUIRY EVIDENCE] Abolitionism & Why It Was Opposed: Equiano, Wilberforce & Planter Lobbying',
      duration: '5 mins 20 secs',
      teacher_guidance:
        'The economic power of the pro-slavery West India Lobby in Parliament, countered by Olaudah Equiano’s bestselling autobiography, public sugar boycotts, and petition campaigns.',
    },
  ],

  // L9: How 'modern' was Britain by 1750?
  [
    {
      url: 'https://www.youtube.com/watch?v=zhL5DCizj5c',
      title:
        '[SYNOPTIC REVIEW] Britain on the Eve of the Industrial Revolution: Empire, Agriculture & Steam (1750)',
      duration: '5 mins 30 secs',
      teacher_guidance:
        'Synoptic overview assessing how far Britain had transformed between 1450 and 1750: from an isolated feudal kingdom to a global maritime empire on the brink of industrialisation.',
    },
  ],
];

(async () => {
  const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const data = mod.default || mod.unitData;

  data.lessons.forEach((lesson, idx) => {
    lesson.id = `lesson_${idx + 1}`;
    lesson.video = vettedVideos[idx];
  });

  const serialized = `const early_modern_world = ${JSON.stringify(data, null, 2)};\n\nexport const unitData = early_modern_world;\nexport default early_modern_world;\n`;
  fs.writeFileSync(dataPath, serialized, 'utf8');
  console.log('🎉 Successfully realigned all 9 lessons in units/early_modern_world/data.js!');
})();
