const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');

console.log('======================================================');
console.log('🇦🇺 INJECTING AUSTRALIA (1770–1901) VIDEOS');
console.log('======================================================');

const australiaVideos = {
  lesson_1: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=8IfqSS8kpLA',
      title:
        "Indigenous Perspectives of Cook's Visit: Endeavour 250th Anniversary | Behind the News",
      duration: '5 mins 01 sec',
      teacher_guidance:
        "Use this clip to challenge Eurocentric 'discovery' narratives by examining the arrival of the Endeavour at Botany Bay (Kamay) through the eyes of the Gweagal and Dharawal peoples. Frame the immediate clash—warning spears, musket fire, and seized shields—as the very first moment of First Nations resistance against imperial incursion.",
      viewing_task:
        "How did the Gweagal warriors respond when Captain Cook's landing party attempted to come ashore at Botany Bay, and how did British sailors misinterpret their warning gestures?",
      model_answer:
        "Two Gweagal warriors confronted the landing party carrying shields and spears, shouting 'Warra Warra Wai' ('go away' / 'you are all dead'), a customary warning forbidding unauthorized entry onto sovereign ancestral country. Instead of retreating, Cook ordered shots fired to intimidate them, wounding one warrior in the leg. Cook's men then entered their camp, taking 40 spears and a bark shield, misinterpreting Indigenous defense of sovereign territory as hostility to be suppressed.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=nVPxrUxUJNg',
      title:
        'Endeavour Voyage: The Untold Stories of Cook and the First Australians | National Museum of Australia',
      duration: '7 mins 36 secs',
      teacher_guidance:
        "Produced by the National Museum of Australia, this video illuminates the vital role played by Tahitian star navigator and arioi priest Tupaia. It also deconstructs the British Admiralty's 'Secret Instructions' and how Cook claimed the entire eastern continent under the legal fiction of 'terra nullius' despite observing inhabited settlements.",
      viewing_task:
        "Why was the Polynesian navigator Tupaia essential to the success of Cook's Pacific voyage, and why was Cook's declaration of 'terra nullius' at Possession Island a legal fiction?",
      model_answer:
        "Tupaia possessed encyclopedic navigational knowledge of Pacific winds, ocean swells, and island cartography across thousands of miles of ocean, drawing a detailed map of over 70 islands and acting as a crucial diplomatic translator between Cook and Māori/Pacific peoples. Cook's declaration of 'terra nullius' (nobody's land) at Possession Island was a deliberate imperial fiction because the Admiralty had explicitly instructed him to take possession only 'with the consent of the natives'. Cook recorded continuous Aboriginal campfires, fishing traps, and communities along the coast, yet claimed sovereignty without seeking consent or entering treaties.",
    },
  ],
  lesson_2: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=MnUNEkMsjfY',
      title: 'First Fleet: The Journey to Botany Bay & Sydney Cove | Behind the News',
      duration: '4 mins 36 secs',
      teacher_guidance:
        'This clip explains why Britain faced a severe penal crisis after losing the American War of Independence (which ended penal transportation to North America), the squalor of the Thames prison hulks, and the logistical scale of transporting over 1,400 people across 15,000 miles of ocean in 1787–1788.',
      viewing_task:
        'Why did the British government decide to establish a penal colony in New South Wales in the 1780s, and what immediate challenges did Governor Phillip face upon arrival?',
      model_answer:
        "Britain lost its American colonies following the American Revolutionary War in 1783, cutting off the destination where over 50,000 British convicts had previously been transported. Squalid floating prison hulks on the River Thames rapidly overflowed with convicts convicted under the draconian 'Bloody Code'. Upon landing at Botany Bay in January 1788, Governor Arthur Phillip found poor soil and no fresh water, forcing him to move the fleet north to Sydney Cove (Warrane). The settlement faced starvation due to failing British seed crops, infertile coastal sandstone, rotten provisions, and convict tools unsuited to hard Australian eucalyptus timber.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=GS1072MshS0',
      title: 'Australian Penal Colonies: Transportation & Convict Life | Simple History',
      duration: '4 mins 26 secs',
      teacher_guidance:
        "An excellent animated primer detailing the everyday mechanics of convict transportation, labour assignments, brutal punishments (the cat-o'-nine-tails, leg irons, treadmills), and the pathways to freedom via tickets of leave and conditional pardons.",
      viewing_task:
        "What was the purpose of the 'ticket of leave' system, and how could convicts transition from forced labourers to free 'emancipists'?",
      model_answer:
        "A 'ticket of leave' was a form of conditional parole granted to convicts who demonstrated sustained good behaviour, allowing them to seek employment and work for their own wages within a specified district before their full sentence expired. Once a convict completed their statutory sentence (e.g. 7 or 14 years) or received an absolute pardon, they became an 'emancipist', regaining full legal rights to own land, marry, operate businesses, and integrate into colonial society.",
    },
  ],
  lesson_3: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=Yaxdmq9tEuU',
      title: 'Discovering Pemulwuy: First Nations Freedom Fighter | Subject | ClickView',
      duration: '3 mins 20 secs',
      teacher_guidance:
        "Use ClickView's high-production biography to spotlight Pemulwuy of the Bidjigal clan as one of Australia's foremost military leaders. Emphasize his innovative guerrilla strategies, the symbolic Battle of Parramatta (1797), and how he successfully mobilized multiple clans against colonial expansion across the Hawkesbury and Parramatta basins.",
      viewing_task:
        'What guerrilla warfare tactics did Pemulwuy use against British settlers, and why did his survival at the Battle of Parramatta lead his people to believe he had spiritual powers?',
      model_answer:
        'Pemulwuy used classic guerrilla tactics tailored to the Australian bush: coordinated hit-and-run ambushes on supply carts, spearing cattle and sheep to cut off colonial food supplies, and systematically burning ripening colonial wheat crops and homesteads. At the Battle of Parramatta in 1797, Pemulwuy led 100 warriors in open combat and was shot seven times in the head and torso with musket balls. Remarkably, he survived and escaped from a military hospital while still shackled, convincing both his followers and terrified settlers that he was protected by ancestral spirits and impervious to British bullets.',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=CJ7_glKA3c8',
      title: 'Who Was Bennelong? The Diplomat Caught Between Two Worlds | True Blue Education',
      duration: '5 mins 59 secs',
      teacher_guidance:
        "This clip explores the complex, tragic life of Woollarawarre Bennelong. Focus on Governor Phillip's policy of kidnapping Aboriginal men to force communication, Bennelong's diplomatic role interpreting British motives, his journey to London in 1792, and the deep cultural alienation he endured upon his return to Sydney.",
      viewing_task:
        'Why did Governor Phillip kidnap Bennelong in 1789, and what challenges did Bennelong face when attempting to bridge the divide between Eora culture and British colonial authorities?',
      model_answer:
        "Governor Phillip ordered Bennelong's abduction in November 1789 because British authorities had failed to establish dialogue with local clans and needed an informant to learn the Eora language, customs, and intentions. Bennelong acted as a skilled cultural diplomat, learning English and explaining Eora protocol to Phillip. However, bridging two incompatible worlds carried heavy costs: when he returned from London in 1795 dressed in European clothes, he was viewed with deep suspicion by British colonists who considered him an outsider, while many Eora peers felt he had compromised his cultural integrity by consorting with the invading power.",
    },
  ],
  lesson_4: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=qzae5dqfOnE',
      title: 'The Frontier Wars: Australia’s Forgotten Conflicts | SBS The Feed',
      duration: '3 mins 08 secs',
      teacher_guidance:
        "An incisive, powerful report from SBS addressing the long-silenced history of the Australian Frontier Wars (1788–1934). It introduces the scale of territorial conflict across Australia's grasslands as the pastoral boom drove violent dispossession, and explains the campaign for national memorialization alongside overseas wars.",
      viewing_task:
        "Why have historians described the territorial conflict between 1788 and the 1930s as a series of 'Frontier Wars', and why was pastoral expansion central to this violence?",
      model_answer:
        "Historians describe these conflicts as 'Frontier Wars' because they were sustained, armed military campaigns fought over land sovereignty, involving British soldiers, mounted police, and armed settler vigilantes fighting Indigenous resistance forces across every colonial border. The rapid expansion of pastoral sheep and cattle farming required millions of acres of fertile grasslands, destroying Indigenous yam fields, polluting freshwater waterholes, and displacing First Nations communities, leading to retaliatory raids and state-sanctioned punitive massacres.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=Prjgfa4Nc1Q',
      title:
        'The Massacre at Myall Creek: The Landmark 1838 Colonial Trial | The Sydney Morning Herald',
      duration: '4 mins 36 secs',
      teacher_guidance:
        'Examines the June 1838 Myall Creek Massacre of 28 unarmed Wirrayaraay people and the groundbreaking trials led by Attorney-General John Plunkett. Use this to demonstrate how British legal ideals occasionally collided with frontier settler impunity, marking the only time white men were executed for killing Indigenous people during the frontier period.',
      viewing_task:
        'Why was the legal outcome of the 1838 Myall Creek Massacre trial unprecedented in Australian colonial history, and what role did station manager William Hobbs play in seeking justice?',
      model_answer:
        "The Myall Creek trial was unprecedented because it was the first and only time in Australian colonial history that white settlers were tried, convicted, and legally hanged (seven stockmen in December 1838) for the murder of Indigenous Australians. Station superintendent William Hobbs broke the unwritten frontier 'code of silence' by courageously refusing to cover up the massacre: he counted the decapitated bodies, reported the slaughter to police magistrate Edward Denny Day, and testified in court despite intense death threats from wealthy squatters and the colonial press.",
    },
  ],
  lesson_5: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=OCXCmzdjf6M',
      title: 'The Australian Gold Rush: Ballarat, Boom & Mass Migration | Behind the News',
      duration: '3 mins 55 secs',
      teacher_guidance:
        'This clip vividly depicts the transformative impact of the 1851 Victorian Gold Rush. It covers the gold fever that emptied Melbourne, the harsh realities of digging and panning, the influx of international migrants (particularly Chinese prospectors), and the sudden accumulation of colonial wealth.',
      viewing_task:
        "How did the discovery of gold in Victoria in 1851 fundamentally change Australia's population, economy, and global standing?",
      model_answer:
        "The 1851 gold discoveries triggered an immense demographic and economic explosion: within a decade, Australia's population more than doubled from 430,000 to over 1.2 million as hundreds of thousands of fortune-seekers arrived from Britain, Ireland, continental Europe, the United States, and China. Towns like Ballarat and Melbourne grew overnight from tent settlements into wealthy global metropolises with grand Victorian architecture, ending the era of convict transportation to eastern Australia and fueling the shift toward autonomous colonial self-government.",
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=or5Q3hkztoU',
      title: 'Defining Moments: The 1854 Eureka Stockade | National Museum of Australia',
      duration: '5 mins 50 secs',
      teacher_guidance:
        "Produced by the National Museum of Australia, this video dissects the Eureka Rebellion of December 1854. Emphasize the diggers' democratic charter (inspired by the British Chartist movement), their armed stand under the Southern Cross flag at Bakery Hill, and how their immediate military defeat catalyzed sweeping democratic reforms in Victoria.",
      viewing_task:
        "What specific grievances drove the Ballarat miners to build the Eureka Stockade in 1854, and how did the rebellion accelerate the growth of Australian democracy despite the miners' military defeat?",
      model_answer:
        "Miners were incensed by the monthly 30-shilling gold-mining licence fee—taxation imposed whether they found gold or not—enforced through corrupt, violent police 'digger hunts', alongside the complete denial of voting rights and parliamentary representation. Although British troops and police crushed the stockade in a brutal 20-minute dawn assault on 3 December 1854 killing over 22 diggers, public juries in Melbourne refused to convict the captured rebel leaders of high treason. The colonial government was forced to abolish the hated licence fee, replace it with an affordable annual 'Miner's Right' that granted the right to vote, and elect rebel leader Peter Lalor to parliament, establishing universal male suffrage and the secret ballot in Victoria.",
    },
  ],
};

async function run() {
  const dataPath = path.join(ROOT_DIR, 'units', 'australia', 'data.js');
  const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const unitData = mod.default || mod.unitData;

  unitData.lessons.forEach((l) => {
    if (australiaVideos[l.id]) {
      l.video = australiaVideos[l.id];
      console.log(`✅ Injected ${l.video.length} videos into ${l.id} (${l.title})`);
    }
  });

  const fileContent = `const unitData = ${JSON.stringify(unitData, null, 2)};\n\nexport { unitData };\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(dataPath, fileContent, 'utf8');
  console.log('✅ Updated units/australia/data.js');

  // Sync to public/data and data
  const payload = { id: 'australia', data: unitData };
  fs.writeFileSync(
    path.join(ROOT_DIR, 'public', 'data', 'australia.json'),
    JSON.stringify(payload, null, 2),
    'utf8',
  );
  fs.writeFileSync(
    path.join(ROOT_DIR, 'data', 'australia.json'),
    JSON.stringify(payload, null, 2),
    'utf8',
  );
  console.log('✅ Synced public/data/australia.json and data/australia.json');

  // Rebuild global database
  console.log('\nRebuilding public/database.json...');
  execSync('node scripts/build_database.cjs', { stdio: 'inherit', cwd: ROOT_DIR });
  console.log('✅ public/database.json successfully recompiled.');

  console.log('\n🎉 ALL 5 LESSONS IN AUSTRALIA INJECTED SUCCESSFULLY!');
}

run().catch((err) => {
  console.error('❌ Error injecting videos:', err);
  process.exit(1);
});
