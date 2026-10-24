const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');

console.log('======================================================');
console.log('🇬🇧 INJECTING THE FIRST BRITISH EMPIRE (1600–1783) VIDEOS');
console.log('======================================================');

const empireVideos = {
  lesson_1: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=OxeTFB84e2k',
      title: 'How one of the most profitable companies in history rose to power | TED-Ed',
      duration: '5 mins 05 secs',
      teacher_guidance:
        'Examine the unique corporate-military structure of the East India Company (EIC). Focus on its 1600 Royal Charter granting a trade monopoly, its private mercenary army (which grew to over 200,000 men, dwarfing the British Army), and how it transitioned from mercantile commerce to sovereign territorial rule following the 1765 Treaty of Allahabad.',
      viewing_task:
        'How did the East India Company transform from an association of London spice merchants into a sovereign military power capable of collecting taxes across Bengal?',
      model_answer:
        "Originally granted a royal monopoly in 1600 to trade spices, the EIC established fortified coastal trading factories at Surat, Madras, and Calcutta. To protect its investments against rival European powers and regional rulers, the Company built its own private standing army composed of British officers and recruited Indian soldiers (sepoys). Following Robert Clive's victory at Plassey in 1757, the EIC forced the Mughal Emperor to sign the 1765 Treaty of Allahabad, granting the Company the 'Diwani'—the legal right to collect land revenue and taxes from 20 million people in Bengal, transforming a private corporation into an imperial ruler.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=oNWTXaOotEA',
      title:
        'How did the British gain control of India? | History - Empire | BBC Bitesize for Teachers',
      duration: '4 mins 23 secs',
      teacher_guidance:
        "This BBC Bitesize clip analyzes how the EIC exploited the fracturing of the Mughal Empire after Emperor Aurangzeb's death. Focus on Robert Clive's conspiracy with wealthy financier Jagat Seth and military commander Mir Jafar to overthrow Nawab Siraj ud-Daulah at the Battle of Plassey in 1757.",
      viewing_task:
        'What political divisions within Bengal did Robert Clive exploit to defeat Nawab Siraj ud-Daulah at the Battle of Plassey in 1757?',
      model_answer:
        "Clive exploited intense internal opposition to the young Nawab Siraj ud-Daulah among Bengal's ruling elite. He formed a secret alliance with the Nawab's disaffected army commander, Mir Jafar, and wealthy Hindu banking financiers (the Jagat Seths). At Plassey, Mir Jafar kept the majority of the Nawab's cavalry and troops inactive on the battlefield in exchange for Clive's promise to install him as a puppet ruler, enabling Clive's force of just 3,000 men to rout the Nawab's 50,000-strong army.",
    },
  ],
  lesson_2: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=3NXC4Q_4JVg',
      title: 'The Atlantic slave trade: What too few textbooks told you | TED-Ed',
      duration: '5 mins 39 secs',
      teacher_guidance:
        'Use this TED-Ed animation by historian Anthony Hazard to deconstruct the economic machinery of the Triangular Trade. Emphasize that enslaved Africans were not merely labourers, but skilled farmers, ironworkers, and weavers whose forced labour built the transatlantic capitalist economy while decimating African societies.',
      viewing_task:
        'How did the three legs of the Triangular Trade operate, and what lasting impact did the trade have on West African societies and British port cities?',
      model_answer:
        'The first leg carried manufactured British goods (guns, textiles, metalware) from ports like Liverpool and Bristol to West Africa, where they were exchanged for captured African men, women, and children. The second leg (the Middle Passage) transported enslaved captives across the Atlantic under inhumane conditions to the Americas. The third leg carried slave-produced raw commodities (sugar, tobacco, cotton, rum) back to Europe. While British port cities amassed immense banking and commercial wealth that fueled the Industrial Revolution, West African societies suffered demographic collapse, intensified regional warfare driven by European firearms, and severe economic distortion.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=PmQvofAiZGA',
      title: 'Life Aboard a Slave Ship | HISTORY',
      duration: '5 mins 01 sec',
      teacher_guidance:
        'This documentary explores the dehumanizing mechanics of the Middle Passage using archival ship plans (such as the famous 1788 Brookes diagram) and primary survivor accounts. Address the systematic brutalization, extreme packing, dysentery/scurvy epidemics, and the desperate acts of resistance, including shipboard insurrections and hunger strikes.',
      viewing_task:
        'How did slave ship captains maximize their profits during the Middle Passage, and what physical and psychological brutalities did enslaved Africans endure aboard ship?',
      model_answer:
        "Captains practiced 'tight-packing', forcing 400 to 600 human beings into suffocating holds with barely 45 centimetres of headroom, shackled in pairs by ankle irons to maximize cargo volume per voyage. Captives endured extreme heat, foul air contaminated with vomit and excrement, widespread dysentery ('bloody flux'), and brutal flogging. Suicide attempts (such as leaping overboard) and hunger strikes were met with violent force, including hot coals and the 'speculum oris' (a mechanical device used to force open jaws for feeding), with roughly 15% to 20% of enslaved people dying before reaching the Americas.",
    },
  ],
  lesson_3: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=UKfVuyFYQ6M',
      title: 'The Real Story of Nanny of the Maroons | Jamaica History',
      duration: '7 mins 21 secs',
      teacher_guidance:
        'Focus on Queen Nanny of the Windward Maroons as a master military strategist and spiritual leader. Examine how Jamaican Maroons utilized deep geographic knowledge of the mountainous Cockpit Country and Blue Mountains to conduct successful guerrilla warfare against British colonial troops.',
      viewing_task:
        'What guerrilla warfare strategies did Queen Nanny and the Windward Maroons use to defeat heavily armed British redcoat regiments in Jamaica?',
      model_answer:
        "Queen Nanny and her fighters exploited the rugged, dense terrain of the Blue Mountains using sophisticated camouflage—attaching branches and leaves to blend seamlessly into the forest canopy. They lured British redcoat columns into narrow mountain defiles and launched sudden ambush attacks from higher ground. Furthermore, the Maroons maintained an early warning communication network using the 'abeng' (a hollowed-out cow horn blown through a side hole) to transmit tactical signals across valleys, cutting British supply lines and causing immense casualties without engaging in open field combat.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=MrJsmMpedQY',
      title:
        'The Voice of a Maroon: The Story of Nanny of the Maroons | Jamaica Information Service',
      duration: '2 mins 12 secs',
      teacher_guidance:
        'Produced by the Jamaica Information Service, this brief piece explains the legal and constitutional significance of the 1739–1740 peace treaties between the British Crown and the Maroons, which recognized Maroon independence a century before the abolition of slavery.',
      viewing_task:
        'Why was the British Crown forced to sign peace treaties with the Jamaican Maroons in 1739–1740, and what rights did the Maroons secure?',
      model_answer:
        'After decades of costly warfare (the First Maroon War) in which British regiments repeatedly failed to conquer the mountain settlements, colonial authorities recognized that the Maroons could not be militarily defeated. The 1739–1740 treaties formally recognized Maroon sovereignty, granting them 1,500 acres of autonomous crown land, the right to govern themselves under their own chiefs (like Cudjoe and Nanny), and freedom from enslavement, making them the first legally recognized free Black communities in the colonial Americas.',
    },
  ],
  lesson_4: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=1cT_Z0KGhP8',
      title: 'The story behind the Boston Tea Party | TED-Ed',
      duration: '3 mins 48 secs',
      teacher_guidance:
        'Historian Ben Labaree explains the economic and constitutional tensions behind the 1773 Boston Tea Party. Clarify that colonists were not objecting to high taxes (the Tea Act actually lowered the price of East India Company tea), but to Britain granting the EIC a corporate monopoly and asserting the constitutional right to tax colonists without parliamentary representation.',
      viewing_task:
        'Why did the 1773 Tea Act outrage American colonists even though it made British East India Company tea cheaper than smuggled Dutch tea?',
      model_answer:
        "Colonists objected because the Tea Act granted the struggling East India Company a direct commercial monopoly in North America, undercutting local colonial merchants and smugglers. More importantly, colonists recognized the act as a constitutional trap: purchasing the tea meant paying the remaining Townshend duty, thereby accepting Parliament's legal authority to levy taxes on the colonies without their consent ('no taxation without representation').",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=3enVp7RVLFY',
      title: 'The Boston Tea Party 1773 (The American Revolution) | Simple History',
      duration: '1 min 28 secs',
      teacher_guidance:
        'Fast-paced visual recap of the events of 16 December 1773 in Boston Harbor. Highlight the role of Samuel Adams and the Sons of Liberty, the symbolic Mohawk disguise, the precision destruction of 342 chests of tea, and the catastrophic British backlash: the Coercive (Intolerable) Acts of 1774.',
      viewing_task:
        'How did the Sons of Liberty execute the Boston Tea Party, and how did the British government respond to the destruction of the tea?',
      model_answer:
        "On the night of 16 December 1773, roughly 60 members of the Sons of Liberty disguised themselves as Mohawk warriors, boarded three merchant ships (the Dartmouth, Eleanor, and Beaver) in Boston Harbor, and smashed open 342 chests of East India Company tea, dumping 45 tons of tea worth millions in modern currency into the water. King George III and Parliament retaliated in 1774 with the Coercive ('Intolerable') Acts: closing Boston Harbor, suspending Massachusetts' colonial charter, and quartering British troops in private homes, which united the Thirteen Colonies in resistance.",
    },
  ],
  lesson_5: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=LKJMWHCUoiw',
      title: 'What you might not know about the Declaration of Independence | TED-Ed',
      duration: '3 mins 38 secs',
      teacher_guidance:
        "Kenneth C. Davis examines the philosophical rhetoric versus the human contradictions of the 1776 Declaration of Independence. Highlight Thomas Jefferson's famous assertion that 'all men are created equal' alongside the fact that Jefferson and 40 other signers enslaved over 200 people each, and examine why a draft paragraph blaming King George for the slave trade was deleted.",
      viewing_task:
        'What central contradiction existed between the revolutionary ideals expressed in the 1776 Declaration of Independence and the socio-economic reality of the American colonies?',
      model_answer:
        "The Declaration boldly proclaimed as 'self-evident' that 'all men are created equal' with unalienable rights to 'Life, Liberty and the pursuit of Happiness'. However, this universal philosophy was denied to roughly 500,000 enslaved African Americans who constituted one-fifth of the colonial population. Principal author Thomas Jefferson and one-third of the continental delegates were wealthy slaveholders who struck out draft condemnations of the slave trade to preserve southern economic support for the rebellion, establishing a new nation founded on freedom for white property owners while legally entrenching chattel slavery.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=E7yNN_g0Blo',
      title: 'Who Were the Black Loyalists? | Black Loyalist Heritage Centre',
      duration: '5 mins 40 secs',
      teacher_guidance:
        "Produced by the Black Loyalist Heritage Centre in Nova Scotia, this video explores Lord Dunmore's 1775 Proclamation and the Philipsburg Proclamation (1779). Discuss why up to 20,000 enslaved Black Americans risked their lives to escape Patriot masters and fight for the British Crown in exchange for freedom, and track their postwar evacuation to Nova Scotia, London, and Sierra Leone.",
      viewing_task:
        'Why did thousands of enslaved African Americans choose to fight for the British Crown during the American War of Independence, and what happened to them after the British defeat in 1783?',
      model_answer:
        "Enslaved men and women joined the British because royal governors like Lord Dunmore issued proclamations promising immediate emancipation to any enslaved person owned by rebel Patriots who joined British armed forces. Serving as soldiers (the 'Ethiopian Regiment'), guides, and labourers, over 3,000 Black Loyalists were registered in the British military's 'Book of Negroes' upon Britain's defeat in 1783, granting them official certificates of freedom and evacuating them aboard British ships to Birchtown, Nova Scotia, London, and later Freetown, Sierra Leone.",
    },
  ],
};

async function run() {
  const dataPath = path.join(ROOT_DIR, 'units', 'first_british_empire', 'data.js');
  const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const unitData = mod.default || mod.unitData;

  unitData.lessons.forEach((l) => {
    if (empireVideos[l.id]) {
      l.video = empireVideos[l.id];
      console.log(`✅ Injected ${l.video.length} videos into ${l.id} (${l.title})`);
    }
  });

  const fileContent = `const unitData = ${JSON.stringify(unitData, null, 2)};\n\nexport { unitData };\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(dataPath, fileContent, 'utf8');
  console.log('✅ Updated units/first_british_empire/data.js');

  // Sync to public/data and data
  const payload = { id: 'first_british_empire', data: unitData };
  fs.writeFileSync(
    path.join(ROOT_DIR, 'public', 'data', 'first_british_empire.json'),
    JSON.stringify(payload, null, 2),
    'utf8',
  );
  fs.writeFileSync(
    path.join(ROOT_DIR, 'data', 'first_british_empire.json'),
    JSON.stringify(payload, null, 2),
    'utf8',
  );
  console.log('✅ Synced public/data/first_british_empire.json and data/first_british_empire.json');

  // Rebuild global database
  console.log('\nRebuilding public/database.json...');
  execSync('node scripts/build_database.cjs', { stdio: 'inherit', cwd: ROOT_DIR });
  console.log('✅ public/database.json successfully recompiled.');

  console.log('\n🎉 ALL 5 LESSONS IN THE FIRST BRITISH EMPIRE INJECTED SUCCESSFULLY!');
}

run().catch((err) => {
  console.error('❌ Error injecting videos:', err);
  process.exit(1);
});
