const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');

console.log('======================================================');
console.log('👑 INJECTING CROWN, CHURCH, OR PARLIAMENT (1517–1689) VIDEOS');
console.log('======================================================');

const monarchyVideos = {
  lesson_1: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=8TH65WnwSFs',
      title: 'Henry VIII and the Church | Timelines.tv History of Britain',
      duration: '4 mins 25 secs',
      teacher_guidance:
        "Superb narrative summary by Timelines.tv examining Henry VIII's desire for a male heir, the Act of Supremacy (1534), and the plunder and destruction of England's monasteries.",
      viewing_task:
        'Why did Henry VIII break with the Pope in Rome, and what did the Crown do with the immense wealth seized from Catholic monasteries?',
      model_answer:
        'Henry broke with Rome because Pope Clement VII refused to annul his marriage to Catherine of Aragon so he could marry Anne Boleyn and secure a male heir. Henry dissolved over 800 monasteries, confiscating their vast agricultural lands, gold, and lead roofs to fund royal defences and reward loyal Tudor nobles.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=xdZcqAss92w',
      title: 'History vs. Henry VIII | TED-Ed',
      duration: '5 mins 25 secs',
      teacher_guidance:
        "Animated courtroom trial debating Henry VIII's legacy: was he a tyrannical despot who executed wives and ministers, or an astute Renaissance nation-builder?",
      viewing_task:
        'What legal and constitutional transformation did the 1534 Act of Supremacy achieve for the English Crown?',
      model_answer:
        "The Act of Supremacy declared the monarch to be the supreme head of both church and state on earth, terminating the Pope's jurisdiction and laying the foundation for modern English national sovereignty.",
    },
  ],
  lesson_2: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=3KAsUADqACU',
      title: 'Who was Elizabeth I? | Hunting for History | BBC Teach',
      duration: '6 mins 02 secs',
      teacher_guidance:
        "Investigates Elizabeth's accession in 1558 following the violent religious pendulum swings of Edward VI (strict Protestantism) and Mary I (Catholic persecutions).",
      viewing_task:
        'How did the religious turmoil under Edward VI and Mary I influence Elizabeth’s cautious approach to ruling England?',
      model_answer:
        'Edward had imposed radical Protestantism while Mary had burned nearly 300 Protestants at the stake. Elizabeth recognised that extreme religious policies caused violent rebellion and civil war, convincing her to pursue a compromise that prioritized national unity over theological purity.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=-GbkZ_Y1AeQ',
      title: 'Early Elizabethan England: The Religious Settlement (1559) | The History Teacher',
      duration: '5 mins 48 secs',
      teacher_guidance:
        "Detailed breakdown of the 1559 Via Media: the Act of Supremacy ('Supreme Governor') and the Act of Uniformity (Common Prayer Book and clerical vestments).",
      viewing_task:
        "Why did Elizabeth title herself 'Supreme Governor' rather than 'Supreme Head', and how did the 1559 Settlement appeal to both Catholics and Protestants?",
      model_answer:
        "Elizabeth chose 'Supreme Governor' to placate Catholics who believed only the Pope or Christ could head the Church, and Protestants who doubted a woman could be religious head. The Settlement retained traditional church decorations and vestments for Catholics while mandating the English Book of Common Prayer and Protestant doctrines.",
    },
  ],
  lesson_3: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=l11MVbpQ-iQ',
      title: 'The Spanish Armada (1588): Early Elizabethan England | The History Teacher',
      duration: '4 mins 54 secs',
      teacher_guidance:
        "Comprehensive curriculum review covering Philip II's invasion plan, the crescent formation, the fireship raid at Calais, and the Battle of Gravelines.",
      viewing_task:
        'How did English fireships at Calais throw the Spanish Armada into confusion and break their defensive crescent formation?',
      model_answer:
        'Lord Howard and Francis Drake sent eight burning fireships loaded with pitch and gunpowder drifting towards the Spanish fleet anchored off Calais. Panicking Spanish captains cut their anchor cables, breaking their tight defensive crescent formation and scattering individual galleons into open waters.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=r-uS4v43Dow',
      title: 'The Spanish Armada (1588) in 2 Minutes | History Vids',
      duration: '2 mins 01 secs',
      teacher_guidance:
        "Fast-paced visual explainer illustrating how long-range English naval gunnery and ferocious northern gales ('the Protestant Wind') devastated the retreating Spanish fleet.",
      viewing_task:
        'What tactical advantage did English warships have over Spanish galleons during the running Channel battles?',
      model_answer:
        'English race-built galleons were faster, lower in the water, and more manoeuvrable. They were armed with long-range culverin cannons on wheeled truck carriages, allowing gun crews to fire and reload rapidly from a distance rather than relying on Spanish boarding tactics.',
    },
  ],
  lesson_4: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=6niBsMeNToo',
      title: 'Why Did England Have a Civil War? | History in a Nutshell | English Heritage',
      duration: '4 mins 54 secs',
      teacher_guidance:
        "English Heritage animated masterclass dissecting Charles I's belief in the Divine Right of Kings, 11 Years' Personal Rule without Parliament, Ship Money, and the attempted arrest of the Five Members.",
      viewing_task:
        "How did Charles I's belief in the 'Divine Right of Kings' provoke a constitutional collision with Parliament?",
      model_answer:
        'Charles believed his authority came directly from God and that no mortal court or parliament could limit his royal prerogative. When Parliament refused to grant taxes unless grievances were addressed, Charles ruled alone for 11 years, raising illegal taxes like Ship Money and alienating landowners and merchants.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=899il5aiTBg',
      title: 'Trial and Execution of King Charles I | Teach with Historic Royal Palaces',
      duration: '6 mins 40 secs',
      teacher_guidance:
        'Archival footage and expert analysis at the Banqueting House in Whitehall exploring the unprecedented January 1649 high treason trial and public beheading of King Charles I.',
      viewing_task:
        'Why was the trial of Charles I unprecedented in European history, and what argument did the King make in his defence?',
      model_answer:
        'It was unprecedented because a sitting monarch was placed on public trial for high treason against his own people. Charles refused to plead, arguing that as King he was the supreme legal authority and that no earthly court had lawful jurisdiction over the Crown.',
    },
  ],
  lesson_5: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=NXvvbmpz5i0',
      title: 'The "Glorious" Revolution | Timelines.tv History of Britain',
      duration: '5 mins 42 secs',
      teacher_guidance:
        "Traces the constitutional culmination of the 17th century: how James II's pro-Catholic policies provoked Parliament to invite William of Orange, cementing the 1689 Bill of Rights.",
      viewing_task:
        'How did the 1689 Bill of Rights permanently settle the 170-year struggle between Crown and Parliament?',
      model_answer:
        'The Bill of Rights established that monarchs could no longer suspend laws, raise taxes, or maintain a standing army in peacetime without parliamentary consent. It created a constitutional monarchy where Parliament, representing elected MPs, held supreme legislative power.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=KCYAQEgquxE',
      title: 'What is the English Bill of Rights? | Untold History',
      duration: '2 mins 07 secs',
      teacher_guidance:
        'Concise constitutional explainer highlighting the enduring legacy of 1689: regular free elections, parliamentary privilege (freedom of speech), and protection against cruel and unusual punishment.',
      viewing_task:
        'What protections for citizens and MPs were enshrined in the 1689 Bill of Rights that remain central to modern democracy?',
      model_answer:
        'It guaranteed freedom of speech in parliamentary debates, required frequent and regular parliaments, protected the right of subjects to petition the monarch without fear of arrest, and prohibited excessive bail and cruel and unusual punishments.',
    },
  ],
};

async function run() {
  const dataPath = path.join(ROOT_DIR, 'units', 'monarchy_religion_power', 'data.js');
  const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const unitData = mod.default || mod.unitData;

  unitData.lessons.forEach((l) => {
    if (monarchyVideos[l.id]) {
      l.video = monarchyVideos[l.id];
      console.log(`✅ Injected ${l.video.length} videos into ${l.id} (${l.title})`);
    }
  });

  const fileContent = `const unitData = ${JSON.stringify(unitData, null, 2)};\n\nexport { unitData };\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(dataPath, fileContent, 'utf8');
  console.log('✅ Updated units/monarchy_religion_power/data.js');

  // Sync to public/data and data
  const payload = { id: 'monarchy_religion_power', data: unitData };
  fs.writeFileSync(
    path.join(ROOT_DIR, 'public', 'data', 'monarchy_religion_power.json'),
    JSON.stringify(payload, null, 2),
    'utf8',
  );
  fs.writeFileSync(
    path.join(ROOT_DIR, 'data', 'monarchy_religion_power.json'),
    JSON.stringify(payload, null, 2),
    'utf8',
  );
  console.log(
    '✅ Synced public/data/monarchy_religion_power.json and data/monarchy_religion_power.json',
  );

  // Rebuild global database
  console.log('\nRebuilding public/database.json...');
  execSync('node scripts/build_database.cjs', { stdio: 'inherit', cwd: ROOT_DIR });
  console.log('✅ public/database.json successfully recompiled.');

  console.log('\n🎉 ALL 5 LESSONS IN MONARCHY, RELIGION & POWER INJECTED SUCCESSFULLY!');
}

run().catch((err) => {
  console.error('❌ Error injecting videos:', err);
  process.exit(1);
});
