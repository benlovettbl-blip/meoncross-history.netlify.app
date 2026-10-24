const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');

console.log('======================================================');
console.log('🌍 INJECTING THE SECOND BRITISH EMPIRE (1783–1914) VIDEOS');
console.log('======================================================');

const secondEmpireVideos = {
  lesson_1: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=lisGM1frnjg',
      title: 'How the British Empire became Powerful | Captain History',
      duration: '6 mins 14 secs',
      teacher_guidance:
        "Use this concise animated overview to track the three technological and economic engines of the Second British Empire: maritime supremacy secured by the Royal Navy, industrial manufacturing dominance ('Workshop of the World'), and global communications (steamships, coaling stations, undersea telegraph cables).",
      viewing_task:
        'What combination of industrial manufacturing, naval power, and global communications enabled Britain to build and sustain the largest empire in human history?',
      model_answer:
        "Britain became the world's leading industrial nation ('Workshop of the World'), producing cheap manufactured cotton, textiles, and iron while importing raw materials from its colonies. This immense trade was defended by the Royal Navy, which maintained the 'Two-Power Standard' (a fleet larger than the next two naval powers combined). Furthermore, steamship routes protected by a global network of fortified coaling stations (such as Gibraltar, Aden, and Singapore) and undersea telegraph cables allowed the British government in London to communicate with overseas colonies and deploy military forces within hours rather than months.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=fQktE-YKlJg',
      title: 'Ten Minute History: The British Empire | History Matters',
      duration: '9 mins 59 secs',
      teacher_guidance:
        'An analytical overview of the transition from the mercantilist First Empire (centered on Atlantic sugar and tobacco) to the Second Empire (centered on free trade, the conquest of India, and gunboat diplomacy across Asia).',
      viewing_task:
        "How did Britain's imperial strategy shift after the loss of the Thirteen American Colonies in 1783 toward Asia and 'free trade' imperialism?",
      model_answer:
        "After losing the American colonies in 1783, Britain shifted its imperial focus eastwards toward India and the Pacific ('the Second British Empire'). Rather than relying solely on formal territorial annexation and high trade tariffs, Britain adopted 'free trade' backed by 'gunboat diplomacy'—using naval force (as seen in the Opium Wars against Qing China) to open foreign ports to British merchants, secure unequal treaties, and dominate global financial shipping without the overhead cost of governing whole nations directly.",
    },
  ],
  lesson_2: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=tbiOfQUWo1E',
      title: 'Indian Mutiny | Timelines.tv',
      duration: '5 mins 30 secs',
      teacher_guidance:
        "Andrew Chater’s classic Timelines.tv documentary investigates the complex root causes of the 1857 uprising. Deconstruct the myth that the revolt was solely about rifle grease by exploring deep resentment over Governor-General Dalhousie’s 'Doctrine of Lapse', aggressive Christian missionary activity, and corporate economic exploitation.",
      viewing_task:
        'Why was the introduction of the Enfield rifle cartridge the spark for a wider rebellion in 1857, and what underlying grievances had accumulated among Indian sepoys?',
      model_answer:
        "The new Enfield rifle required sepoys to bite open paper cartridges rumored to be greased with beef and pork fat, deeply offending both Hindu soldiers (for whom cows are sacred) and Muslim soldiers (for whom pigs are unclean). However, this religious insult ignited decades of simmering resentment: sepoys resented low pay, racism from British officers, being forced to serve overseas ('kala pani'), and the Company's aggressive annexation of princely states like Awadh (Oudh) under the 'Doctrine of Lapse', alongside fears that the British planned to forcibly convert India to Christianity.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=rGoPN3WOBxU',
      title: 'The Indian Rebellion of 1857 | Then & Now',
      duration: '5 mins 19 secs',
      teacher_guidance:
        'This video examines the brutal conflict of 1857–1858 (the sieges of Cawnpore and Delhi, the resistance led by Rani Lakshmibai of Jhansi) and the decisive political consequence: the Government of India Act 1858, which abolished the East India Company and established direct Crown rule (the British Raj).',
      viewing_task:
        'What was the most important political consequence of the 1857 Rebellion for the governance of India?',
      model_answer:
        "The most significant consequence was the permanent abolition of the East India Company. Recognising that private corporate misrule had triggered the catastrophe, the British Parliament passed the Government of India Act in August 1858, transferring all sovereign political, military, and administrative powers directly to Queen Victoria and the British Crown. This ended 258 years of Company rule and established the 'British Raj', governed by a British Viceroy and the Secretary of State for India.",
    },
  ],
  lesson_3: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=MnUNEkMsjfY',
      title: 'First Fleet: Journey to Botany Bay & Sydney Cove | Behind the News',
      duration: '4 mins 36 secs',
      teacher_guidance:
        "Connect the loss of the American colonies to the dispatch of the First Fleet in 1787. Explore the arrival of over 750 convicts at Sydney Cove and the legal assertion of 'terra nullius' ignoring tens of thousands of years of First Nations custodianship.",
      viewing_task:
        "Why did the British Crown declare Australia to be 'terra nullius' in 1788, and what impact did this legal concept have on Indigenous land rights?",
      model_answer:
        "The British Crown declared Australia 'terra nullius' ('nobody's land') because British authorities did not recognize Aboriginal nomadic land management, fire-stick farming, and spiritual connection to country as European-style agricultural ownership. This legal fiction allowed Governor Arthur Phillip to claim sovereignty over the entire eastern continent for King George III without negotiating treaties, paying compensation, or seeking consent from First Nations peoples, providing legal justification for widespread territorial dispossession.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=qzae5dqfOnE',
      title: 'The Frontier Wars: Australia’s Forgotten Conflicts | SBS The Feed',
      duration: '3 mins 08 secs',
      teacher_guidance:
        "Use SBS's incisive report to examine the scale and duration of the Australian Frontier Wars (1788–1934), highlighting organized Aboriginal resistance (such as Pemulwuy along the Hawkesbury and the Black War in Tasmania) and how pastoral expansion resulted in massacres.",
      viewing_task:
        'How did pastoral expansion across Australia drive frontier warfare between British settlers and Indigenous Australians?',
      model_answer:
        'As colonial squatters seized millions of acres of fertile grasslands to graze massive commercial flocks of Merino sheep and cattle, they cleared Indigenous food sources (such as yam fields) and monopolized scarce freshwater waterholes. First Nations warriors responded with guerrilla warfare—spearing livestock, burning farmsteads, and ambushing settlers. British authorities and armed settler vigilantes retaliated with overwhelming lethal force, conducting punitive expeditions, poisonings, and state-sanctioned massacres (such as at Myall Creek in 1838) to suppress resistance and secure pastoral dominance.',
    },
  ],
  lesson_4: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=drd_O2kdTtY',
      title: 'The Scramble for Africa | Timelines.tv',
      duration: '4 mins 58 secs',
      teacher_guidance:
        'Andrew Chater analyzes the rapid partition of Africa between 1881 and 1914, contrasting imperial economic motivations (rubber, palm oil, copper, diamonds, gold) with the devastating reality of technological asymmetry (the Maxim machine gun).',
      viewing_task:
        'What economic and technological factors drove European empires to partition over 90% of the African continent between 1881 and 1914?',
      model_answer:
        'Economically, European industrial factories desperately needed secure access to raw materials (rubber, cotton, copper, palm oil for lubricating machinery) and new captive markets to sell manufactured goods, alongside immense mineral discoveries like diamonds and gold in South Africa. Technologically, European conquest was made possible by medical breakthroughs (quinine preventing malaria), transportation (steamships navigating African rivers), and military supremacy—specifically the Maxim machine gun, which enabled small European armies to slaughter massed African resistance forces armed with spears and obsolete muskets (such as at the 1898 Battle of Omdurman).',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=DduN1cU2p9U',
      title: "What was the 'Scramble for Africa'? | BBC What's New",
      duration: '3 mins 00 secs',
      teacher_guidance:
        "This clip explains the 1884–1885 Berlin Conference where European powers drew arbitrary straight-line borders across Africa with zero African representation, and explores how imperialists justified conquest through racist pseudo-scientific concepts like the 'Civilising Mission'.",
      viewing_task:
        'How did European leaders at the 1884–1885 Berlin Conference divide Africa, and what ideological arguments did they use to justify colonial conquest?',
      model_answer:
        "At the 1884–1885 Berlin Conference, 14 European nations carved up the African continent into colonial spheres of influence by drawing arbitrary geometric borders, completely ignoring pre-existing ethnic, linguistic, and cultural boundaries—with zero African representatives present. Imperialists justified this territorial land grab through racist ideologies like the 'Civilising Mission' and Social Darwinism (popularized in Rudyard Kipling's poem 'The White Man's Burden'), falsely claiming they had a moral duty to bring Christianity, commerce, and Western 'civilisation' to supposedly backward peoples.",
    },
  ],
  lesson_5: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=HnXenihxSeg',
      title: 'Was the British Empire a force for good? (Part 1/2) | BBC Bitesize for Teachers',
      duration: '6 mins 24 secs',
      teacher_guidance:
        'Part 1 of the official BBC curriculum debate series examining the historical arguments in favor of and against imperial rule: legal systems, infrastructure (railways, ports), and medicine versus authoritarian governance and economic drain.',
      viewing_task:
        'What arguments do historians make when claiming that British imperial infrastructure and legal systems benefited colonies, and why do critics challenge this interpretation?',
      model_answer:
        'Proponents argue that the British Empire introduced modern infrastructure (thousands of miles of railways, irrigation canals, telegraph systems, and deep-water ports), standardized legal frameworks, English as a global language of commerce, and modern medical sanitation. However, critics point out that railways were strategically designed for military troop movements and extracting raw materials to coastal ports for export to Britain, rather than serving local community needs, while colonial governance remained unelected, racially discriminatory, and maintained through military force.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=qpHlkfPSo8o',
      title: 'Was the British Empire a force for good? (Part 2/2) | BBC Bitesize for Teachers',
      duration: '7 mins 18 secs',
      teacher_guidance:
        "Part 2 investigates the economic balance sheet of empire, focusing on the 'Drain of Wealth' from India, de-industrialisation of traditional textile weavers, and devastating late Victorian famines caused by exporting grain during drought.",
      viewing_task:
        "How do historians explain the 'Drain of Wealth' and catastrophic famines in colonial India to argue that the British Empire was primarily exploitative?",
      model_answer:
        "Historians highlight that before British rule, India accounted for roughly 25% of the world's economy, but this fell to under 3% by independence as British tariffs and industrial factories wiped out India's world-renowned handloom textile industry, reducing India to a raw cotton exporter. Furthermore, under the 'Drain of Wealth', billions of pounds in Indian tax revenues were transferred to London as 'Home Charges' and military spending. During catastrophic droughts in the late 19th century (such as the 1876–78 famine), strict British free-market policies led Viceroy Lytton to export millions of tons of wheat from India while between 6 and 10 million Indian subjects starved to death.",
    },
  ],
};

async function run() {
  const dataPath = path.join(ROOT_DIR, 'units', 'second_british_empire', 'data.js');
  const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const unitData = mod.default || mod.unitData;

  unitData.lessons.forEach((l) => {
    if (secondEmpireVideos[l.id]) {
      l.video = secondEmpireVideos[l.id];
      console.log(`✅ Injected ${l.video.length} videos into ${l.id} (${l.title})`);
    }
  });

  const fileContent = `const unitData = ${JSON.stringify(unitData, null, 2)};\n\nexport { unitData };\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(dataPath, fileContent, 'utf8');
  console.log('✅ Updated units/second_british_empire/data.js');

  // Sync to public/data and data
  const payload = { id: 'second_british_empire', data: unitData };
  fs.writeFileSync(
    path.join(ROOT_DIR, 'public', 'data', 'second_british_empire.json'),
    JSON.stringify(payload, null, 2),
    'utf8',
  );
  fs.writeFileSync(
    path.join(ROOT_DIR, 'data', 'second_british_empire.json'),
    JSON.stringify(payload, null, 2),
    'utf8',
  );
  console.log(
    '✅ Synced public/data/second_british_empire.json and data/second_british_empire.json',
  );

  // Rebuild global database
  console.log('\nRebuilding public/database.json...');
  execSync('node scripts/build_database.cjs', { stdio: 'inherit', cwd: ROOT_DIR });
  console.log('✅ public/database.json successfully recompiled.');

  console.log('\n🎉 ALL 5 LESSONS IN THE SECOND BRITISH EMPIRE INJECTED SUCCESSFULLY!');
}

run().catch((err) => {
  console.error('❌ Error injecting videos:', err);
  process.exit(1);
});
