const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');

console.log('======================================================');
console.log('🎖️ APPLYING 4-TIER IDEAL CLASSROOM VIDEO SHELF: GREAT WAR SUITE');
console.log('======================================================');

async function upgradeGreatWarPart1() {
  const dataPath = path.join(ROOT_DIR, 'units', 'great_war', 'data.js');
  const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const unitData = mod.default || mod.unitData;

  // Lesson 2: Add 4th video (Cinematic)
  const l2 = unitData.lessons.find((l) => l.id === 'lesson_2');
  if (l2 && l2.video && l2.video.length === 3) {
    l2.video.splice(2, 0, {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=5y8DZUShVis',
      title: 'Cinematic: Imperial Clashes & The European Scramble',
      duration: '2 mins 56 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Dramatizes the hubris and military power projection of European colonial empires in Africa and Asia. Recommended Watch Window: 00:00–02:56 (Full Trailer). Lesson Phase: Cinematic Starter Hook & Imperial Competition. Tone Alert: Grand historical drama on colonial ambition.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice the sheer military confidence and racial superiority projected by European colonial administrations in the late 19th century. How does this film capture why imperial competition in Africa and Asia heightened national rivalries in Europe, convincing each power that retreating from a colonial crisis was a humiliation they could not endure?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> The trailer illustrates how European imperial powers treated overseas territories as chessboard pawns for national prestige. Clashes like the 1898 Fashoda incident and the 1905/1911 Moroccan Crises proved that imperial brinkmanship was directly tied to domestic patriotic pride, creating explosive geopolitical friction that carried over into Europe.</p>',
    });
    console.log('✅ Upgraded great_war lesson_2 to 4 videos');
  }

  // Lesson 3: Add 4th video (Cinematic)
  const l3 = unitData.lessons.find((l) => l.id === 'lesson_3');
  if (l3 && l3.video && l3.video.length === 3) {
    l3.video.splice(2, 0, {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=YlDA8cquOcU',
      title: 'Cinematic: Dreadnoughts & The Steel Leviathans of the North Sea',
      duration: '3 mins 10 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Epic archival reconstruction of early 20th-century dreadnought battleships firing 12-inch main turrets. Recommended Watch Window: 00:00–03:10 • Lesson Phase: Cinematic Starter Hook & Naval Arms Race. Tone Alert: Thunderous naval gunnery and industrial maritime engineering.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice the colossal scale of dreadnought armor plating, steam turbines, and 12-inch rifled guns that rendered all previous warships obsolete overnight. How does the sight of these floating steel fortresses illustrate why Britain viewed Kaiser Wilhelm II\'s High Seas Fleet as an existential threat to the British Empire?</p>',
      model_answer:
        '<p><strong>Cinematic Analysis:</strong> The sequence captures the awe and terror of modern naval technology. Britain depended entirely on merchant shipping for food and raw materials; an enemy fleet capable of defeating the Royal Navy in the North Sea could starve the British population within six weeks. The naval race was not a mere arms build-up, but a life-or-death struggle for national survival.</p>',
    });
    console.log('✅ Upgraded great_war lesson_3 to 4 videos');
  }

  // Lesson 6: Elevate from 1 video to 4-Tier Shelf
  const l6 = unitData.lessons.find((l) => l.id === 'lesson_6');
  if (l6) {
    l6.video = [
      {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=24i4ncHuf6A',
        title: 'What Caused the First World War? | History Matters',
        duration: '1 min 52 secs',
        pathway: 'Starter Hook',
        teacher_guidance:
          'Ultra-concise, fast-paced animated summary synthesizing the four MAIN long-term causes and the Sarajevo spark. Recommended Watch Window: 00:00–01:52 (Full Clip) • Lesson Phase: Quick Starter Check (0–3m). Tone Alert: Fast, accessible animated synthesis.',
        viewing_task:
          '<ol><li><strong>[00:30] Quick Check:</strong> What four long-term systemic causes (acronym MAIN) primed Europe for conflict prior to the summer of 1914?</li><li><strong>[01:15] Hinge Question:</strong> Why did the assassination of Archduke Franz Ferdinand in Sarajevo trigger a continent-wide war rather than remaining a local third Balkan conflict?</li></ol>',
        model_answer:
          '<ol><li><strong>Quick Check:</strong> Militarism, Alliances, Imperialism, and Nationalism.</li><li><strong>Hinge Question:</strong> The interlocking alliance system bound the great powers together: Germany\'s "Blank Cheque" to Austria-Hungary compelled Russia to mobilize to protect Serbia, which triggered Germany\'s Schlieffen Plan invasion of neutral Belgium, automatically bringing the British Empire into the war.</li></ol>',
      },
      {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=y-TmbOy4Jwg',
        title: '6 Key Steps to World War One | History Hit',
        duration: '24 mins 26 secs',
        pathway: 'Enquiry Evidence',
        teacher_guidance:
          'Structured analytical breakdown synthesizing the six structural causal steps to war: imperial friction, naval competition, military alliances, the Balkan powder keg, Sarajevo, and the July cascade. Recommended Watch Window: 02:00–08:15 • Lesson Phase: November Assessment Masterclass & Synoptic Synthesis. Tone Alert: Clear, engaging presenter-led synthesis for formal assessment writing.',
        viewing_task:
          '<ol><li><strong>[03:00] Recall:</strong> What are the four traditional "MAIN" long-term causes of the First World War evaluated in GCSE and KS3 historical assessments?</li><li><strong>[05:15] Explain:</strong> How did Germany\'s decision to issue Austria-Hungary the unconditional "Blank Cheque" (<em>Blankoscheck</em>) on 5 July 1914 transform a localized Balkan regional conflict into a European world war?</li><li><strong>[07:30] Challenge:</strong> Historiographical Synthesis: Assess the contrasting historical arguments regarding war guilt: does the evidence support Fritz Fischer\'s thesis of German aggression or Christopher Clark\'s conclusion that Europe\'s leaders were "sleepwalkers"?</li></ol>',
        model_answer:
          '<ol><li><strong>Recall:</strong> Militarism, Alliances, Imperialism, and Nationalism (MAIN).</li><li><strong>Explain:</strong> Kaiser Wilhelm II and Chancellor Bethmann-Hollweg promised unconditional German military backing to Emperor Franz Joseph, even if attacking Serbia provoked Tsarist Russia into war. This reckless guarantee gave Austro-Hungarian hawks the confidence to issue an impossible ultimatum to Serbia, knowing the German army would protect them from Russian military intervention.</li><li><strong>Challenge:</strong> Fischer argued that imperial Germany deliberately orchestrated the crisis to launch a pre-emptive strike before Russia completed its strategic military modernization in 1917, seeking European hegemony (the <em>Septemberprogramm</em>). In contrast, Clark argues that all major European powers shared responsibility: complex alliance commitments, unverified intelligence, rigid railway mobilization timetables, and misjudged risks caused leaders to blunder into catastrophe without foreseeing the industrial slaughter that would follow.</li></ol>',
      },
      {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=hf8EYbVxtCY',
        title: 'All Quiet on the Western Front (2022, Edward Berger) | Official Trailer',
        duration: '2 mins 33 secs',
        pathway: 'Cinematic',
        teacher_guidance:
          'Four-time Academy Award and seven-time BAFTA-winning masterpiece based on Erich Maria Remarque’s anti-war classic. Contrasts naive teenage patriotic enthusiasm in 1914 with the horrifying mud, machine-gun fire, and mechanized slaughter of trench warfare. Recommended Watch Window: 00:00–02:33 (Full Trailer). Lesson Phase: Cinematic Starter Hook & The Reality of 1914. Tone Alert: Brutal, unflinching anti-war masterpiece.',
        viewing_task:
          '<p><strong>Cinematic Discussion Focus:</strong> Notice how young Paul Bäumer and his school classmates eagerly enlist, singing patriotic songs and imagining glorious military adventure, only to be thrown into a nightmare of barbed wire, artillery bombardment, and chemical poison gas. How does this film capture the tragic chasm between romantic pre-war propaganda and the brutal reality of industrialised warfare?</p>',
        model_answer:
          '<p><strong>Cinematic Analysis:</strong> The trailer strips away romantic 19th-century notions of military glory. By showing schoolmasters indoctrinating young boys to die for the Fatherland, followed by scenes of recruits recycling uniforms stripped from corpses, the film exposes how an entire generation of European youth was sacrificed to the diplomatic blunders and imperial hubris of their political leaders.</p>',
      },
      {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=IrabKK9Bhds',
        title: 'They Shall Not Grow Old (2018, Peter Jackson) | Official Documentary Trailer',
        duration: '2 mins 24 secs',
        pathway: 'Documentary',
        teacher_guidance:
          'Peter Jackson’s groundbreaking restored, colorized, and speed-corrected Imperial War Museums archival documentary, utilizing lip-read original footage and BBC sound recordings of veterans. Recommended Watch Window: 00:00–02:24 (Full Trailer). Lesson Phase: In-Depth Documentary Investigation & Archival Grounding. Tone Alert: Revolutionary historical documentary bringing primary archival film to lifelike vibrancy.',
        viewing_task:
          '<ol><li><strong>[00:45] Recall:</strong> What cutting-edge restoration techniques did director Peter Jackson use on 100-year-old silent, black-and-white Imperial War Museums archival film?</li><li><strong>[01:30] Explain:</strong> How does hearing authentic voice recordings of First World War soldiers narrating their own experiences transform our historical understanding of 1914?</li><li><strong>[02:00] Challenge:</strong> Evaluate why restoring archival footage into color and 24-frames-per-second lifelike speed changes students\' emotional connection to historical events compared to grainy black-and-white silent newsreels.</li></ol>',
        model_answer:
          '<ol><li><strong>Recall:</strong> Digital hand-colorization, speed correction from variable hand-cranked frame rates to smooth 24fps, forensic lip-reading by deaf experts to reconstruct dialogue, and authentic sound effects recorded using period weapons and equipment.</li><li><strong>Explain:</strong> By discarding celebrity voiceover and relying exclusively on BBC audio interviews recorded with real veterans in the 1960s, the film lets soldiers speak for themselves, capturing their dry humor, terror, endurance, and quiet grief without modern moral judgment.</li><li><strong>Challenge:</strong> Black-and-white, sped-up footage makes past historical figures look comical, jerky, and alien, creating psychological distance. Transforming the footage into full color and natural speed bridges the century-long divide, forcing modern viewers to recognize that the soldiers shivering in muddy trenches were teenagers and young men identical to themselves today.</li></ol>',
      },
    ];
    console.log('✅ Upgraded great_war lesson_6 to 4 videos');
  }

  const fileContent = `const unitData = ${JSON.stringify(unitData, null, 2)};\n\nexport { unitData };\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(dataPath, fileContent, 'utf8');
  console.log('✅ Updated units/great_war/data.js');

  const publicUnitDir = path.join(ROOT_DIR, 'public', 'units', 'great_war');
  if (!fs.existsSync(publicUnitDir)) fs.mkdirSync(publicUnitDir, { recursive: true });
  fs.writeFileSync(path.join(publicUnitDir, 'data.js'), fileContent, 'utf8');

  fs.writeFileSync(path.join(ROOT_DIR, 'data', 'great_war.json'), JSON.stringify({ id: 'great_war', data: unitData }, null, 2), 'utf8');
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'data', 'great_war.json'), JSON.stringify({ id: 'great_war', data: unitData }, null, 2), 'utf8');
  console.log('✅ Synced data/great_war.json and public/data/great_war.json');
}

async function upgradeGreatWarPart2() {
  const dataPath = path.join(ROOT_DIR, 'units', 'great_war_part2', 'data.js');
  const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const unitData = mod.default || mod.unitData;

  // Lesson 1: Enlistment
  const l1 = unitData.lessons.find((l) => l.id === 'lesson_1_enlistment');
  if (l1) {
    const existing = l1.video || [];
    l1.video = [
      existing[0] || {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=24i4ncHuf6A',
        title: "Lord Kitchener's Call: Why Young Men Joined the Pals Battalions in 1914",
        duration: '3 mins 30 secs',
        pathway: 'Starter Hook',
        teacher_guidance: 'Recruitment euphoria, social pressure, and Pals Battalions in 1914.',
        viewing_task: '<ol><li><strong>[01:00] Quick Check:</strong> What was Kitchener\'s army called?</li><li><strong>[02:00] Hinge Question:</strong> Why did friends join together?</li></ol>',
        model_answer: '<ol><li><strong>Quick Check:</strong> The New Army (Pals Battalions).</li><li><strong>Hinge Question:</strong> Social solidarity and peer encouragement.</li></ol>',
      },
      existing[1] || {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=y-TmbOy4Jwg',
        title: 'The Accrington Pals and the July 1916 Slaughter at the Somme',
        duration: '7 mins 15 secs',
        pathway: 'Enquiry Evidence',
        teacher_guidance: 'Traces the fate of civic volunteer battalions.',
        viewing_task: '<ol><li><strong>Recall:</strong> Accrington Pals.</li><li><strong>Explain:</strong> Community grief.</li><li><strong>Challenge:</strong> Conscription introduction.</li></ol>',
        model_answer: '<ol><li><strong>Recall:</strong> July 1916.</li><li><strong>Explain:</strong> Towns lost an entire generation in hours.</li><li><strong>Challenge:</strong> Forced conscription in 1916.</li></ol>',
      },
      {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=JPNyNr2Kp4w',
        title: 'War Horse (2011, Steven Spielberg) | Official Trailer',
        duration: '2 mins 33 secs',
        pathway: 'Cinematic',
        teacher_guidance:
          'Steven Spielberg’s epic feature illustrating the cavalry charge against German Maxim machine guns in 1914, capturing the transition from 19th-century equestrian warfare to mechanized industrial slaughter. Recommended Watch Window: 00:00–02:33 (Full Trailer). Lesson Phase: Cinematic Starter Hook & 1914 Cavalry Illusion. Tone Alert: Emotional, sweeping historical drama.',
        viewing_task:
          '<p><strong>Cinematic Discussion Focus:</strong> Notice how British cavalry officers eagerly charge across open fields with drawn sabres, only to be cut down by concealed German machine-gun nests and wire. How does Spielberg dramatize the catastrophic obsolescence of traditional military tactics in the face of modern industrial weaponry?</p>',
        model_answer:
          '<p><strong>Cinematic Analysis:</strong> The trailer visually encapsulates the great tragedy of 1914: generals trained in Victorian colonial wars believed horse cavalry and bayonet charges would achieve rapid breakthrough. The devastating mechanical firepower of machine guns and quick-firing artillery dismantled these romantic illusions, forcing armies underground into stalemate trenches.</p>',
      },
      {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=IrabKK9Bhds',
        title: 'They Shall Not Grow Old (2018, Peter Jackson) | Colorized Archival Documentary',
        duration: '2 mins 24 secs',
        pathway: 'Documentary',
        teacher_guidance:
          'Peter Jackson’s landmark restoration of Imperial War Museums archival film. Shows teenage recruits undergoing basic training, laughing on troopships, and confronting the horrors of the Western Front. Recommended Watch Window: 00:00–02:24 • Lesson Phase: In-Depth Documentary Investigation & Volunteer Psychology. Tone Alert: Deeply moving primary archival restoration.',
        viewing_task:
          '<ol><li><strong>[00:40] Recall:</strong> What lies about age did underage British teenagers routinely tell recruiting sergeants to enlist in 1914?</li><li><strong>[01:15] Explain:</strong> Explain how peer pressure, white feathers, and the desire to "not miss the big adventure" before Christmas compelled over 750,000 men to volunteer in the war\'s first two months.</li><li><strong>[02:00] Challenge:</strong> Evaluate why the destruction of the Pals Battalions on the first day of the Somme (1 July 1916) permanently traumatized communities across northern England.</li></ol>',
        model_answer:
          '<ol><li><strong>Recall:</strong> Underage boys claimed to be 19 years old (the legal minimum for overseas service), often encouraged by recruiters earning bonuses.</li><li><strong>Explain:</strong> The intense moral pressure of posters ("What did YOU do in the Great War, Daddy?"), women handing white feathers to men in civilian clothes, and the universal belief that the war would be short and victorious convinced young men that enlisting was the ultimate mark of manhood and civic duty.</li><li><strong>Challenge:</strong> Because men from the same factory, cricket club, or church enrolled together in Pals Battalions, when units charged machine guns at Serre and Thiepval on 1 July 1916, hundreds of neighbors and brothers died side by side in minutes. Entire towns were plunged into immediate communal mourning, destroying local civic identity and ending voluntary recruitment forever.</li></ol>',
      },
    ];
    console.log('✅ Upgraded great_war_part2 lesson_1_enlistment to 4 videos');
  }

  // Lesson 3: Empire Troops
  const l3 = unitData.lessons.find((l) => l.id === 'lesson_3_empire_troops');
  if (l3) {
    const existing = l3.video || [];
    l3.video = [
      existing[0],
      existing[1],
      {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=ngu6HDmFKZ4',
        title: 'Gallipoli (1981, Peter Weir / Mel Gibson) | Original Theatrical Trailer',
        duration: '1 min 35 secs',
        pathway: 'Cinematic',
        teacher_guidance:
          'Peter Weir’s classic masterpiece starring Mel Gibson and Mark Lee as young Australian sprinters sent into the disastrous 1915 Gallipoli campaign against Ottoman forces at The Nek. Recommended Watch Window: 00:00–01:35 (Full Trailer). Lesson Phase: Cinematic Starter Hook & ANZAC Identity. Tone Alert: Poignant, iconic historical drama.',
        viewing_task:
          '<p><strong>Cinematic Discussion Focus:</strong> Notice young Australian athletes competing on outback running tracks, traveling halfway across the world to Cairo, and ultimately charging uphill into Ottoman Maxim machine guns on the cliffs of Gallipoli. How does Peter Weir’s film dramatize the forging of Australian national identity (the "ANZAC Legend") in the fires of World War One?</p>',
        model_answer:
          '<p><strong>Cinematic Analysis:</strong> The trailer captures how young men from Britain\'s distant dominions viewed volunteering as a great imperial test of character. While Gallipoli was a catastrophic military defeat orchestrated by Winston Churchill and British commanders, the bravery, endurance, and egalitarian mateship displayed by Australian and New Zealand soldiers became the founding national myth of both independent nations.</p>',
      },
      {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=ZxpS3xyt_fU',
        title: 'How the Colonies Made WW1 a Global War | David Olusoga (BBC The World\'s War)',
        duration: '5 mins 46 secs',
        pathway: 'Documentary',
        teacher_guidance:
          'Historian David Olusoga uncovers the overlooked contribution of 4 million non-white colonial troops: Indian Army sepoys at Neuve Chapelle and Ypres, African carriers in East Africa, and the Chinese Labour Corps. Recommended Watch Window: 00:30–05:15 • Lesson Phase: Guided Instruction & Imperial World War. Tone Alert: Scholarly, corrective historical investigation.',
        viewing_task:
          '<ol><li><strong>[01:10] Recall:</strong> How many soldiers from undivided colonial India served across the Western Front, Mesopotamia, and Gallipoli during the First World War?</li><li><strong>[03:00] Explain:</strong> Explain how the arrival of two Indian Army divisions (Lahore and Meerut) in October 1914 prevented the collapse of the British line during the First Battle of Ypres.</li><li><strong>[04:45] Challenge:</strong> Evaluate why the immense sacrifices of over four million African, Indian, Caribbean, and Asian soldiers and laborers were largely erased from European commemorations after 1918.</li></ol>',
        model_answer:
          '<ol><li><strong>Recall:</strong> Over 1.3 million Indian soldiers and laborers (including 130,000 on the Western Front).</li><li><strong>Explain:</strong> The British Expeditionary Force (BEF) had lost over 80% of its regular soldiers by autumn 1914. Rushed directly into icy, waterlogged Flanders trenches in thin cotton uniforms, Indian troops held crucial sectors against veteran German units, saving the Channel ports from German capture.</li><li><strong>Challenge:</strong> Imperial powers maintained racial hierarchies that justified colonial rule on the premise of European civilizational superiority. Commemorating non-white colonial soldiers as equals who had rescued European powers risked empowering independence movements (like the Indian National Congress), prompting colonial administrations to sideline non-white veterans and deny them the political self-determination promised during the war.</li></ol>',
      },
    ];
    console.log('✅ Upgraded great_war_part2 lesson_3_empire_troops to 4 videos');
  }

  // Lesson 4: Home Front & DORA
  const l4 = unitData.lessons.find((l) => l.id === 'lesson_4_home_front_dora');
  if (l4) {
    const existing = l4.video || [];
    l4.video = [
      existing[0],
      existing[1],
      {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=VLiLInoOod0',
        title: 'Testament of Youth (2014, James Kent / Alicia Vikander) | Official Trailer',
        duration: '1 min 56 secs',
        pathway: 'Cinematic',
        teacher_guidance:
          'Feature film adaptation of Vera Brittain’s classic pacifist memoir starring Alicia Vikander and Kit Harington. Follows young Oxford student Vera abandoning her studies to become a Voluntary Aid Detachment (VAD) nurse on the Western Front, losing her fiancé, brother, and friends. Recommended Watch Window: 00:00–01:56 (Full Trailer). Lesson Phase: Cinematic Starter Hook & Women in Wartime. Tone Alert: Poignant, emotionally devastating historical drama.',
        viewing_task:
          '<p><strong>Cinematic Discussion Focus:</strong> Notice Vera Brittain\'s transformation from an ambitious Oxford scholar to a field nurse treating amputees and gassed soldiers in field hospitals, watching her entire generation of young men perish. How does this film capture the profound emotional devastation experienced by British women on the Home Front?</p>',
        model_answer:
          '<p><strong>Cinematic Analysis:</strong> The trailer illustrates that the war was not fought solely by men in trenches: women bore the crushing emotional trauma of bereavement, the grueling physical labour of nursing catastrophic wounds, and the dismantling of traditional Edwardian domestic expectations. Brittain\'s journey reflects the emergence of modern female independence and passionate post-war pacifism.</p>',
      },
      {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=WKFZCRPe1so',
        title: 'Britain\'s Great War: The Home Front & DORA | Jeremy Paxman (BBC)',
        duration: '4 mins 51 secs',
        pathway: 'Documentary',
        teacher_guidance:
          'Jeremy Paxman analyzes the Defense of the Realm Act (DORA, August 1914): press censorship, watering down beer, rationing, women in munitions factories ("Canary Girls"), and the expansion of state power. Recommended Watch Window: 00:30–04:30 • Lesson Phase: Guided Instruction & The Total War State. Tone Alert: Sharp, engaging BBC historical documentary.',
        viewing_task:
          '<ol><li><strong>[01:00] Recall:</strong> What sweeping emergency legislation passed on 8 August 1914 gave the British government unprecedented control over citizens\' daily lives, property, and civil liberties?</li><li><strong>[02:15] Explain:</strong> Why were female munitions workers who filled artillery shells with TNT called "Canary Girls", and what severe health risks did they endure for the war effort?</li><li><strong>[03:45] Challenge:</strong> Evaluate how the First World War permanently expanded the power of the British state over the individual: why could society never return to Victorian laissez-faire?</li></ol>',
        model_answer:
          '<ol><li><strong>Recall:</strong> The Defence of the Realm Act (DORA).</li><li><strong>Explain:</strong> Exposure to toxic trinitrotoluene (TNT) caused toxic jaundice that turned their skin and hair bright yellow (earning the nickname "Canary Girls"), as well as causing severe liver failure, respiratory damage, and premature childbirth. Despite this, over 700,000 women risked explosions and poisoning to produce 80% of Britain\'s shells.</li><li><strong>Challenge:</strong> Prior to 1914, the British government had minimal daily intervention in ordinary lives (no ID cards, low income tax, free press). DORA introduced daylight saving time, British Summer Time, pub licensing hours, food rationing cards, state-controlled railways, and industrial conscription. Total war demonstrated that national survival required centralized government planning, establishing the administrative template for the modern welfare state.</li></ol>',
      },
    ];
    console.log('✅ Upgraded great_war_part2 lesson_4_home_front_dora to 4 videos');
  }

  // Lesson 5: Versailles & Legacy
  const l5 = unitData.lessons.find((l) => l.id === 'lesson_5_versailles');
  if (l5) {
    const existing = l5.video || [];
    l5.video = [
      existing[0],
      existing[1],
      {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=YqNYrYUiMfg',
        title: '1917 (2019, Sam Mendes) | Official Trailer [HD]',
        duration: '2 mins 32 secs',
        pathway: 'Cinematic',
        teacher_guidance:
          'Three-time Academy Award-winning technical masterpiece starring George MacKay. Recreates the devastating devastation of the Hindenburg Line, booby-trapped trenches, and running across artillery craters. Recommended Watch Window: 00:00–02:32 (Full Trailer). Lesson Phase: Cinematic Starter Hook & Total Devastation. Tone Alert: Intense, visceral, breathtaking cinematic experience.',
        viewing_task:
          '<p><strong>Cinematic Discussion Focus:</strong> Notice the lunar wasteland of no man\'s land—shattered trees, endless mud craters, decaying animal carcases, and abandoned trenches depicted in Mendes\' continuous-shot masterpiece. How does this visual depiction of absolute European destruction explain why Allied leaders at Versailles in 1919 were determined to ensure that Germany could never wage war again?</p>',
        model_answer:
          '<p><strong>Cinematic Analysis:</strong> The trailer showcases the physical and ecological ruin inflicted on northern France and Belgium: entire towns, forests, and roads pulverized into toxic mud. French Premier Georges Clemenceau and French citizens had witnessed the destruction of their industrial heartland and the deaths of 1.4 million soldiers, explaining their furious demand at Versailles that Germany must be permanently weakened and forced to pay crippling reparations.</p>',
      },
      {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=hf8EYbVxtCY',
        title: 'The Armistice & The Treaty of Versailles (1918–1919) | BBC History File',
        duration: '2 mins 33 secs',
        pathway: 'Documentary',
        teacher_guidance:
          'Examines the signing of the armistice in Ferdinand Foch\'s railway carriage at Compiègne on 11 November 1918, followed by the contentious debates between Clemenceau, Lloyd George, and Woodrow Wilson at Versailles. Recommended Watch Window: 00:00–02:33 (Full Trailer) • Lesson Phase: Guided Instruction & The Peace Settlement. Tone Alert: Rigorous historical examination of interwar diplomacy.',
        viewing_task:
          '<ol><li><strong>[00:45] Recall:</strong> At what exact hour, day, and month did the armistice on the Western Front take effect, ending four years of First World War combat?</li><li><strong>[01:20] Explain:</strong> Explain the key territorial and military punishments imposed on Germany by the 1919 Treaty of Versailles that fueled bitter German resentment.</li><li><strong>[02:10] Challenge:</strong> Evaluate whether Marshal Ferdinand Foch was correct when he famously warned of Versailles: "This is not peace. It is an armistice for twenty years."</li></ol>',
        model_answer:
          '<ol><li><strong>Recall:</strong> The 11th hour of the 11th day of the 11th month (11:00 AM, 11 November 1918).</li><li><strong>Explain:</strong> Germany lost 13% of its European territory (Alsace-Lorraine to France, Polish Corridor to Poland), all overseas colonies, its air force was banned, navy scuttled, army slashed to 100,000 volunteers, the Rhineland demilitarized, and Article 231 forced Germany to accept sole moral guilt for the war.</li><li><strong>Challenge:</strong> Foch recognized the fundamental structural flaw of the treaty: it was harsh enough to humiliate and enrage 65 million Germans, fostering the toxic "stab-in-the-back" myth (<em>Dolchstoßlegende</em>), yet insufficiently crippling to permanently prevent Germany—still the largest industrial economy in Central Europe—from rising again as a revanchist power under Adolf Hitler in 1939.</li></ol>',
      },
    ];
    console.log('✅ Upgraded great_war_part2 lesson_5_versailles to 4 videos');
  }

  const fileContent = `const unitData = ${JSON.stringify(unitData, null, 2)};\n\nexport { unitData };\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(dataPath, fileContent, 'utf8');
  console.log('✅ Updated units/great_war_part2/data.js');

  const publicUnitDir = path.join(ROOT_DIR, 'public', 'units', 'great_war_part2');
  if (!fs.existsSync(publicUnitDir)) fs.mkdirSync(publicUnitDir, { recursive: true });
  fs.writeFileSync(path.join(publicUnitDir, 'data.js'), fileContent, 'utf8');

  fs.writeFileSync(path.join(ROOT_DIR, 'data', 'great_war_part2.json'), JSON.stringify({ id: 'great_war_part2', data: unitData }, null, 2), 'utf8');
  fs.writeFileSync(path.join(ROOT_DIR, 'public', 'data', 'great_war_part2.json'), JSON.stringify({ id: 'great_war_part2', data: unitData }, null, 2), 'utf8');
  console.log('✅ Synced data/great_war_part2.json and public/data/great_war_part2.json');
}

async function run() {
  await upgradeGreatWarPart1();
  await upgradeGreatWarPart2();
  console.log('\nRebuilding database.json...');
  execSync('node scripts/build_database.cjs', { stdio: 'inherit', cwd: ROOT_DIR });
  console.log('🎉 GREAT WAR SUITE 4-TIER SHELF COMPLETED ACROSS ALL 11 LESSONS!');
}

run().catch((err) => {
  console.error('❌ Error applying Great War Suite 4-tier videos:', err);
  process.exit(1);
});
