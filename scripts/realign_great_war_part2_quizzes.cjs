const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function seededShuffle(arr, seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const res = [...arr];
  for (let i = res.length - 1; i > 0; i--) {
    hash = Math.sin(hash++) * 10000;
    const j = Math.floor((hash - Math.floor(hash)) * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}

function q(question, answer, explanation, distractors, seed) {
  // Validate distinct options
  const uniqueOpts = new Set([answer, ...distractors].map((s) => s.trim().toLowerCase()));
  if (uniqueOpts.size !== 4) {
    throw new Error(`Duplicate option detected in question: "${question}"`);
  }
  const options = seededShuffle([answer, ...distractors], seed || question);
  return {
    question: question,
    q: question,
    options: options,
    answer: answer,
    a: answer,
    explanation: explanation,
  };
}

const GREAT_WAR_PART2_EXPANDED_QUIZZES = {
  lesson_1: [
    // Core Retrieval (1-10)
    q(
      'Approximately how many men made up the British Expeditionary Force (BEF) in August 1914?',
      '120,000 men',
      'The BEF was a tiny, professional volunteer force of roughly 120,000 soldiers, dwarfed by the multi-million-man conscript armies of Imperial Germany and France.',
      ['500,000 men', '1 million men', '50,000 men'],
      'gwp2_l1_1',
    ),
    q(
      'Who was appointed British Secretary of State for War on 5 August 1914, immediately predicting a three-year war of millions?',
      'Lord Horatio Kitchener',
      'Unlike contemporaries who expected the war to end by Christmas, Field Marshal Lord Kitchener foresaw a prolonged, global war of attrition requiring an army of millions.',
      ['Winston Churchill', 'David Lloyd George', 'Herbert Asquith'],
      'gwp2_l1_2',
    ),
    q(
      'What was the nickname given to battalions of friends, neighbours, and workmates who enlisted together on the promise of serving side by side?',
      'Pals Battalions',
      'Pals Battalions allowed men from the same town, factory, or rugby club to enlist and train together, driving an unprecedented surge in voluntary enlistment.',
      ['Kitchener’s Guards', 'The Iron Brigades', 'The Territorial Legions'],
      'gwp2_l1_3',
    ),
    q(
      'Which Hampshire regiment battalions were known locally as the "Pompey Pals"?',
      'The 14th and 15th Battalions of the Hampshire Regiment',
      'The 14th and 15th Battalions (1st and 2nd Pompey Pals) were recruited directly from the citizens of Portsmouth, including dockyard workers, clerks, and local athletes.',
      [
        'The 1st and 2nd Royal Marines',
        'The 7th and 8th Southampton Rifles',
        'The 10th Isle of Wight Volunteers',
      ],
      'gwp2_l1_4',
    ),
    q(
      'What catastrophic casualty rate did the 1st Pompey Pals suffer at the Somme (Hamel sector) on 3 September 1916?',
      '457 casualties out of 587 men who went over the top',
      'In a single afternoon assault across open ground against intact German machine gun nests, the 1st Pompey Pals suffered a devastating 78% casualty rate.',
      [
        '50 casualties out of 1,000 men',
        'Zero casualties because the attack was cancelled',
        'Over 950 casualties out of 1,000 men',
      ],
      'gwp2_l1_5',
    ),
    q(
      'What symbol was handed out to civilian-clothed young men by members of the Order of the White Feather to publicly shame them?',
      'A white feather (symbolizing cowardice)',
      'Founded in Folkestone in August 1914, the Order of the White Feather encouraged women to present white feathers to men not in uniform to shame them into joining the army.',
      ['A yellow ribbon', 'A red cross badge', 'A broken rifle'],
      'gwp2_l1_6',
    ),
    q(
      'What popular pro-war poet compared the First World War to a sporting contest in the poem "Who’s for the Game?"?',
      'Jessie Pope',
      'Jessie Pope published lighthearted, jingoistic verses in the Daily Mail and Punch, comparing industrial trench warfare to a game of cricket or rugby.',
      ['Rupert Brooke', 'Wilfred Owen', 'Siegfried Sassoon'],
      'gwp2_l1_7',
    ),
    q(
      'Which famous war poet wrote "Dulce et Decorum Est" to bitterly attack Jessie Pope’s romanticized pro-war poetry?',
      'Wilfred Owen',
      'Wilfred Owen drafted "Dulce et Decorum Est" at Craiglockhart Hospital in 1917, dedicating early drafts directly to Jessie Pope to expose the gruesome reality of poison gas warfare.',
      ['Robert Graves', 'John McCrae', 'Rudyard Kipling'],
      'gwp2_l1_8',
    ),
    q(
      'What does historian Gary Sheffield argue was a key "pragmatic" economic reason for working-class enlistment in 1914?',
      'Guaranteed regular pay ("the King’s Shilling"), warm clothing, three meals a day, and sturdy leather boots',
      'For impoverished urban labourers in 1914 Britain, the army offered guaranteed nutrition, new boots, and steady wages that were often superior to precarious civilian employment.',
      [
        'A promise of free farmland in France after the war',
        'A guaranteed seat in the House of Commons',
        'An exemption from paying any domestic taxes for life',
      ],
      'gwp2_l1_9',
    ),
    q(
      'According to historian Catriona Pennell ("A Kingdom United"), what moral justification drove British public enlistment in 1914?',
      'Genuine moral outrage over the German invasion of neutral Belgium ("the Rape of Belgium") and defense of small nations',
      'Pennell argues that British volunteers were not naive fools; they felt a profound moral duty to protect international law, small nations, and defend Britain from Prussian militarism.',
      [
        'A desire to colonize Germany and seize Berlin’s gold reserves',
        'Fear of an immediate French naval invasion of London',
        'A religious crusade to convert European populations to Protestantism',
      ],
      'gwp2_l1_10',
    ),

    // Mastery Challenge (11-20)
    q(
      'Who designed the iconic 1914 recruitment illustration featuring Lord Kitchener’s pointing finger and piercing gaze on the cover of "London Opinion"?',
      'Alfred Leete',
      'Alfred Leete’s graphic illustration of Kitchener pointing directly at the viewer with the caption "Your Country Needs You" became the most famous recruitment image in modern history.',
      ['James Montgomery Flagg', 'Will Dyson', 'Leonard Raven-Hill'],
      'gwp2_l1_11',
    ),
    q(
      'Approximately how many voluntary recruits had joined the British military by the end of September 1914 during the "Rush to the Colours"?',
      'Over 750,000 volunteers',
      'Driven by patriotism, peer pressure, and economic motives, over three-quarters of a million men flooded recruitment offices in the first eight weeks of the conflict.',
      ['Barely 25,000 volunteers', 'Over 5 million volunteers', 'Exactly 150,000 volunteers'],
      'gwp2_l1_12',
    ),
    q(
      'Which prominent northern politician and later Director-General of Recruiting pioneered the concept of civic battalions in Liverpool?',
      'Lord Derby (Edward Stanley)',
      'Lord Derby raised several battalions of Liverpool businessmen and clerks in days, coining the term "battalion of pals" and prompting the War Office to adopt the scheme nationwide.',
      ['Sir Edward Carson', 'David Lloyd George', 'Sir Douglas Haig'],
      'gwp2_l1_13',
    ),
    q(
      'What catastrophic societal consequence did the localized Pals Battalions have on British communities following the Battle of the Somme?',
      'Single streets, factories, and entire towns lost virtually an entire generation of young men on a single morning',
      'Because men from the same community served in the same company, a single machine-gun burst or failed assault could wipe out the male youth of an entire village or neighborhood.',
      [
        'Towns across northern Britain immediately declared independence from London',
        'Factories were forced to close permanently because no women existed to work in them',
        'The British government outlawed all provincial sports clubs and trade unions',
      ],
      'gwp2_l1_14',
    ),
    q(
      'Which retired British admiral founded the Order of the White Feather in Folkestone in August 1914 to shame men into enlisting?',
      'Admiral Charles Penrose Fitzgerald',
      'Fitzgerald organized thirty women in Folkestone to hand white feathers to any man of military age who was not wearing a military uniform or hospital convalescent armband.',
      ['Admiral Sir John Fisher', 'Admiral Sir John Jellicoe', 'Admiral David Beatty'],
      'gwp2_l1_15',
    ),
    q(
      'In Wilfred Owen’s famous poem "Dulce et Decorum Est", what Latin phrase from Horace does he brand as "The old Lie"?',
      '"Dulce et decorum est pro patria mori" (It is sweet and fitting to die for one’s country)',
      'Owen contrasts the grotesque agony of a soldier choking on chlorine gas ("guttering, choking, drowning") with the classical lie that dying in war is glorious.',
      [
        '"Si vis pacem, para bellum" (If you want peace, prepare for war)',
        '"Veni, vidi, vici" (I came, I saw, I conquered)',
        '"Aut vincere aut mori" (Either conquer or die)',
      ],
      'gwp2_l1_16',
    ),
    q(
      'What term describes the intense civilian peer pressure, patriotic fervor, and community expectation that compelled young men to enlist in 1914?',
      'Social jingoism and community coercion',
      'Men who did not enlist faced public ostracism, shaming in local newspapers, refusal of service in shops, and accusations of cowardice from friends and family.',
      ['Passive resistance', 'Laissez-faire mobilization', 'Cosmopolitan pacifism'],
      'gwp2_l1_17',
    ),
    q(
      'What physical requirement did British Army recruitment boards initially enforce in August 1914, which was drastically lowered as casualty lists mounted?',
      'A minimum height requirement of 5 feet 8 inches (later lowered to 5 feet 3 inches)',
      'In August 1914, overwhelmed recruiters raised the height bar to 5 feet 8 inches to turn men away; by late 1914, it was reduced, eventually leading to "Bantam Battalions" for men under 5ft 3in.',
      [
        'A mandatory university degree in classical languages',
        'Ownership of land worth at least £500',
        'Flawless eyesight without any corrective spectacles',
      ],
      'gwp2_l1_18',
    ),
    q(
      'According to social historian Adrian Gregory, why was the term "war enthusiasm" an exaggeration of the British public mood in August 1914?',
      'The dominant public mood was sober, grim determination and civic obligation rather than hysterical rejoicing or bloodlust',
      'Gregory’s analysis of diaries and local press shows that most ordinary citizens met the declaration of war with anxiety, solemnity, and a sense of duty, rather than reckless celebration.',
      [
        'The British public was entirely pacifist and rioted against the government',
        'Nobody in Britain knew that war had been declared until December 1914',
        'Every single British newspaper opposed the war and refused to print news',
      ],
      'gwp2_l1_19',
    ),
    q(
      'What major demographic group suffered the highest proportional officer casualty rates during the early campaigns of 1914–1915?',
      'Junior subalterns (lieutenants and second lieutenants) recruited from elite public schools and universities',
      'Public school and Oxbridge graduates were expected to lead infantry assaults from the front armed only with revolvers and whistles, suffering a staggering 20% death rate—twice the average of ordinary soldiers.',
      [
        'Senior staff generals residing in châteaux behind the lines',
        'Naval officers stationed on home dockyard duty in Portsmouth',
        'Cabinet ministers and members of the House of Lords',
      ],
      'gwp2_l1_20',
    ),
  ],

  lesson_2: [
    // Core Retrieval (1-10)
    q(
      'What series of outflanking maneuvers in autumn 1914 led to the creation of the 400-mile Western Front trench line?',
      'The "Race to the Sea"',
      'Between September and November 1914, Allied and German armies repeatedly attempted to outflank each other’s northern wing until they hit the North Sea, digging trenches to avoid annihilating firepower.',
      ['The Schlieffen Sweep', 'The Battle of the Marne', 'The Flanders Encirclement'],
      'gwp2_l2_1',
    ),
    q(
      'Why were frontline trenches constructed in an intricate zig-zag or traverse pattern rather than straight lines?',
      'To prevent enfilading machine-gun fire down the trench and contain artillery blast shockwaves',
      'Traverse bays ensured that if an enemy entered a trench, they could not fire continuously down its length, and an exploding artillery shell would affect only a single section.',
      [
        'To make it easier for horses and cavalry charges to navigate the trench',
        'Because soldiers did not possess straight measuring ropes',
        'To allow rainwater to drain directly into underground rivers',
      ],
      'gwp2_l2_2',
    ),
    q(
      'What debilitating medical condition was caused by soldiers standing in cold, waterlogged mud for days without dry socks?',
      'Trench Foot',
      'Trench foot was a fungal and vascular infection caused by prolonged cold and damp; severe cases developed gangrene requiring amputation. It was combated with whale oil and dry sock rotations.',
      ['Trench Fever', 'Typhoid', 'Scurvy'],
      'gwp2_l2_3',
    ),
    q(
      'Which weapon was responsible for approximately 60% of all combat casualties on the Western Front?',
      'Heavy Artillery',
      'Industrialized artillery—firing high explosive shells and shrapnel—dominated Western Front combat, pulverizing defenses and causing devastating blast and splinter wounds.',
      ['The Vickers machine gun', 'The Lee-Enfield rifle', 'Poison gas'],
      'gwp2_l2_4',
    ),
    q(
      'At which battle in April 1915 did the German Army first deploy large-scale lethal chlorine gas warfare?',
      'The Second Battle of Ypres',
      'On 22 April 1915 at Second Ypres, German forces released 168 tons of chlorine gas from cylinders, creating a deadly greenish-yellow cloud that choked French and Algerian troops.',
      ['The Battle of Loos', 'The First Battle of the Marne', 'The Battle of Verdun'],
      'gwp2_l2_5',
    ),
    q(
      'How many British casualties occurred on the first day of the Battle of the Somme (1 July 1916)?',
      '57,470 casualties (including 19,240 dead)',
      '1 July 1916 remains the bloodiest single day in the history of the British armed forces, caused by advancing across open ground against undamaged German defensive positions.',
      ['10,000 casualties', '100,000 casualties', '5,000 casualties'],
      'gwp2_l2_6',
    ),
    q(
      'Why did the preliminary seven-day British artillery bombardment fail to neutralize German defenses at the Somme?',
      'German troops survived unharmed in deep concrete dugouts, and many shells were duds that failed to cut wire',
      'German defenders sheltered 30 feet underground in reinforced dugouts; when the bombardment lifted, they quickly mounted machine guns on the parapet to meet the advancing British infantry.',
      [
        'British artillery accidentally fired entirely in the wrong direction',
        'The German army had completely evacuated the Somme days before',
        'British shells were made of wood and caused zero damage',
      ],
      'gwp2_l2_7',
    ),
    q(
      'What derogatory phrase was popularized by Alan Clark in 1961 to criticize British generals for leading brave soldiers to slaughter?',
      '"Lions led by Donkeys"',
      'Alan Clark used the phrase in his 1961 book "The Donkeys" to argue that aristocratic, incompetent generals squandered the lives of brave, selfless British soldiers.',
      ['"Sheep led by Wolves"', '"Pawns of the Empire"', '"The Lost Legion"'],
      'gwp2_l2_8',
    ),
    q(
      'According to revisionist historian Gary Sheffield, what major factor explains the heavy casualties on the Western Front?',
      'Defensive technology (machine guns, barbed wire, artillery) completely outmatched attacking communications and mobility',
      'Sheffield argues that generals faced an unprecedented technological stalemate: telephones had wires cut by shells, radios were bulky, and infantry had to cross mud against machine guns.',
      [
        'British soldiers refused to follow orders and threw down their weapons',
        'The British Army had no supply lines or ammunition',
        'German troops possessed modern tanks in 1914 while Britain had none',
      ],
      'gwp2_l2_9',
    ),
    q(
      'What revolutionary offensive between August and November 1918 saw Haig’s modernized army decisively defeat Germany?',
      'The Hundred Days Offensive',
      'Beginning with the Battle of Amiens on 8 August 1918, the British and Allied forces used combined-arms tactics (tanks, aircraft, creeping artillery, infantry) to break the Hindenburg Line.',
      ['The Gallipoli Campaign', 'The Spring Offensive', 'The Nivelle Offensive'],
      'gwp2_l2_10',
    ),

    // Mastery Challenge (11-20)
    q(
      'What were the three standard parallel trench lines that composed a British defensive sector on the Western Front?',
      'The Frontline (fire) trench, Support trench, and Reserve trench',
      'Connected by perpendicular communication trenches, these three lines allowed troops, ammunition, and wounded to move safely between rear depots and the frontline.',
      [
        'The Outer trench, Middle trench, and City trench',
        'The Machine-gun trench, Cavalry trench, and Kitchen trench',
        'The Moat, Bastion, and Redoubt',
      ],
      'gwp2_l2_11',
    ),
    q(
      'What was the primary purpose of the wooden slatted pathways placed at the bottom of trenches?',
      'Duckboards, designed to elevate soldiers’ boots above stagnant, muddy water and reduce trench foot',
      'Duckboards kept soldiers off the freezing wet ground and covered deep drainage sumps beneath the trench floor.',
      [
        'To allow supply wagons and heavy artillery to roll quickly through trenches',
        'To serve as firewood during winter months',
        'To disguise the trenches from German aerial photography',
      ],
      'gwp2_l2_12',
    ),
    q(
      'What psychological trauma, caused by relentless artillery concussions and terror, was initially misdiagnosed as cowardice or malingering?',
      'Shell shock (neurasthenia)',
      'Shell shock caused tremors, mutism, nightmares, and panic; while early military authorities executed some sufferers for desertion, doctors at Craiglockhart pioneered psychiatric treatment.',
      ['Trench madness', 'Battle paralysis', 'Soldier’s melancholy'],
      'gwp2_l2_13',
    ),
    q(
      'Which blistering chemical agent, first deployed by Germany at Third Ypres (Passchendaele) in July 1917, burned skin and lingered in soil for weeks?',
      'Mustard gas (Yperite)',
      'Mustard gas was an oily liquid that caused severe chemical burns, internal lung blistering, and temporary or permanent blindness, contaminating muddy trenches for days.',
      ['Chlorine gas', 'Phosgene gas', 'Cyanide gas'],
      'gwp2_l2_14',
    ),
    q(
      'Which British Commander-in-Chief was appointed in December 1915, orchestrating the massive campaigns at the Somme and Passchendaele?',
      'Field Marshal Sir Douglas Haig',
      'Haig replaced Sir John French as BEF Commander-in-Chief; his strategy of continuous attrition divided opinion between critics who viewed him as a butcher and defenders who credited him with victory.',
      [
        'General Sir Horace Smith-Dorrien',
        'General Sir William Robertson',
        'Field Marshal Lord Kitchener',
      ],
      'gwp2_l2_15',
    ),
    q(
      'Why did British artillery fail to cut the dense German barbed wire entanglements prior to the infantry attack on 1 July 1916?',
      'Gunners fired shrapnel shells instead of high explosives, which lifted and tangled the wire rather than severing it, and one-third of British shells were duds',
      'British factories under rushed production produced millions of defective shells. Shrapnel bullets were effective against troops in the open but useless against heavy steel wire.',
      [
        'German troops had replaced the barbed wire with rubber ropes',
        'British artillery guns were forbidden from firing at wire under the Geneva Convention',
        'The artillery shells had no gunpowder inside them',
      ],
      'gwp2_l2_16',
    ),
    q(
      'What revolutionary new armored weapon was deployed in combat for the first time in world history at Flers-Courcelette on the Somme in September 1916?',
      'The tank (British Mark I)',
      'Conceived to cross trenches and crush barbed wire, forty-nine Mark I tanks were deployed on 15 September 1916; while mechanically unreliable, they proved armor could break trench deadlock.',
      ['The armored car', 'The self-propelled howitzer', 'The half-track personnel carrier'],
      'gwp2_l2_17',
    ),
    q(
      'What modern historical interpretation, advanced by Richard Holmes and Gary Sheffield, counters the simplistic "Donkeys" myth?',
      'The "Learning Curve" thesis: British commanders confronted an unprecedented industrial stalemate and successfully adapted tactics, weaponry, and command structures to win in 1918',
      'The Learning Curve argues that Haig and his staff systematically learned from 1916 failures, perfecting combined-arms doctrine, aerial reconnaissance, flash-spotting, and mechanized logistics.',
      [
        'The claim that British generals deliberately prolonged the war to win medals',
        'The assertion that trench warfare was a complete military success from day one',
        'The argument that German soldiers were secretly fighting for the British',
      ],
      'gwp2_l2_18',
    ),
    q(
      'What sophisticated artillery tactic required infantry to advance just 50 to 100 yards behind a continuously moving wall of falling artillery shells?',
      'The Creeping Barrage',
      'By advancing immediately behind the creeping wall of explosions, attacking infantry could reach German trenches before defenders could emerge from deep dugouts to man machine guns.',
      ['The Box Barrage', 'The Drumfire Salvo', 'The Hurricane Sweep'],
      'gwp2_l2_19',
    ),
    q(
      'What was the name of the formidable, multi-layered German defensive fortification line on the Western Front that the British Army broke during autumn 1918?',
      'The Hindenburg Line (Siegfriedstellung)',
      'Constructed in winter 1916–17, the Hindenburg Line featured concrete pillboxes, deep machine-gun bunkers, and anti-tank ditches; its breach in September 1918 forced Germany to seek an armistice.',
      ['The Maginot Line', 'The Atlantic Wall', 'The Mannerheim Line'],
      'gwp2_l2_20',
    ),
  ],

  lesson_3: [
    // Core Retrieval (1-10)
    q(
      'Approximately how many Indian soldiers and non-combatant labourers served Great Britain during the First World War?',
      'Approximately 1.3 million men',
      'Over 1.3 million Indian soldiers and labourers were mobilized, serving in France, Belgium, Mesopotamia, Gallipoli, Egypt, and East Africa, sustaining the British imperial war effort.',
      ['50,000 men', '300,000 men', '5 million men'],
      'gwp2_l3_1',
    ),
    q(
      'Who was the first South Asian soldier to be awarded the Victoria Cross (VC) for extraordinary machine-gun valor at First Ypres in October 1914?',
      'Sepoy Khudadad Khan VC',
      'Sepoy Khudadad Khan of the 129th Duke of Connaught’s Own Baluchis manned his machine gun alone at Hollebeke until overrun, preventing a German breakthrough despite severe wounds.',
      ['Subadar Mir Dast VC', 'Naik Darwan Singh Negi VC', 'Chatta Singh VC'],
      'gwp2_l3_2',
    ),
    q(
      'Which royal palace in England was famously converted into a showcase military hospital for wounded Indian soldiers between 1914 and 1916?',
      'The Royal Pavilion in Brighton',
      'King George V offered the Brighton Pavilion, where specialized wards, separate religious kitchens, and operating theatres were built to impress Indian troops and international opinion.',
      ['Buckingham Palace', 'Windsor Castle', 'Hampton Court Palace'],
      'gwp2_l3_3',
    ),
    q(
      'What dangerous, exhausting physical duties were volunteers of the British West Indies Regiment (BWIR) primarily restricted to on the Western Front?',
      'Handling live artillery ammunition, loading supply trains, digging communication trenches, and building roads under fire',
      'Due to racist War Office policies that barred non-white troops from bearing arms against white Europeans, the 16,000 Caribbean volunteers were relegated to heavy manual labour.',
      [
        'Piloting fighter biplanes over German lines',
        'Serving as cavalry vanguards in cavalry charges',
        'Translating diplomatic German dispatches in London',
      ],
      'gwp2_l3_4',
    ),
    q(
      'How many Chinese civilian contract workers served in the Chinese Labour Corps (CLC) on the Western Front supporting Allied logistics?',
      'Approximately 140,000 men',
      'Recruited under secret contracts by the British and French governments, the Chinese Labour Corps unloaded cargo, repaired rail lines, and cleared toxic battlefields after the Armistice.',
      ['10,000 men', '500,000 men', '1 million men'],
      'gwp2_l3_5',
    ),
    q(
      'What major official celebration in London in July 1919 highlighted the deliberate exclusion of Black colonial troops from British victory?',
      'The London Victory Parade down Whitehall',
      'Despite the sacrifice of 16,000 Caribbean volunteers, BWIR troops were forbidden from marching in the official Victory Parade down Whitehall to avoid offending white colonial racial sensitivities.',
      [
        'The Peace Thanksgiving Service at St. Paul’s',
        'The Cenotaph Dedication Ceremony',
        'The King’s Birthday Review',
      ],
      'gwp2_l3_6',
    ),
    q(
      'What brutal massacre occurred in Punjab in April 1919 when British troops opened fire on unarmed Indians demanding political self-determination?',
      'The Jallianwala Bagh (Amritsar) Massacre',
      'Brigadier-General Reginald Dyer ordered troops to fire into an enclosed crowd of peaceful demonstrators in Amritsar, killing hundreds and ending Indian trust in British rule.',
      ['The Delhi Uprising', 'The Lahore Mutiny', 'The Rawalpindi Incident'],
      'gwp2_l3_7',
    ),
    q(
      'What system of military surveillance was strictly applied to letters written home by wounded Indian soldiers convalescing in England?',
      'Imperial Censorship',
      'Censors read every letter written by Indian soldiers, redacting accounts of high casualties and removing descriptions of European social equality to prevent anti-colonial unrest in India.',
      ['The White Feather Audit', 'Postal Conscription', 'The Defense Mail Quota'],
      'gwp2_l3_8',
    ),
    q(
      'Which modern British historian authored the groundbreaking book and documentary "The World’s War" (2014) to recover colonial contributions?',
      'Professor David Olusoga',
      'David Olusoga’s historical research revealed how the First World War was an unprecedented global conflict fought by four million non-white subjects whose contributions were erased.',
      ['Professor Jay Winter', 'Dr Gary Sheffield', 'Sir Max Hastings'],
      'gwp2_l3_9',
    ),
    q(
      'Why did colonial veterans across the Caribbean and India organize mutinies and political strikes following the 1918 Armistice?',
      'They were subjected to institutional racism, denied promised equal pay, and betrayed over political rights and self-rule',
      'Having fought to defend democracy in Europe, veterans returned home to find their civil rights denied, racial segregation enforced, and promises of political self-government broken.',
      [
        'They demanded to be permanently relocated to Germany',
        'They were ordered to conquer South America by the British government',
        'They wanted to abolish all international shipping lanes',
      ],
      'gwp2_l3_10',
    ),

    // Mastery Challenge (11-20)
    q(
      'At which crucial early battle in October 1914 did Indian Expeditionary Force A plug critical gaps in the British frontline, saving the Allied line from collapse?',
      'The First Battle of Ypres',
      'Arriving straight from tropical climates in cotton uniforms, Indian troops were rushed to Ypres to halt the German advance, suffering 30% casualties in freezing mud.',
      ['The Battle of the Somme', 'The Battle of Cambrai', 'The Battle of Loos'],
      'gwp2_l3_11',
    ),
    q(
      'What military designation was given to the two Indian infantry and cavalry divisions sent to France in autumn 1914?',
      'Indian Expeditionary Force A',
      'Force A comprised the 3rd (Lahore) and 7th (Meerut) Divisions under Lieutenant-General Sir James Willcocks, fighting at Neuve Chapelle, Ypres, and Loos.',
      ['The Commonwealth Taskforce', 'The Imperial Vanguard', 'The Eastern Corps'],
      'gwp2_l3_12',
    ),
    q(
      'What racial theory held by British military recruiters dictated which Indian ethnic groups were deemed biologically suited for frontline combat?',
      'The "Martial Races" theory (e.g., Sikhs, Gurkhas, and Punjabi Muslims)',
      'British colonial doctrine categorized certain ethnic communities as naturally warlike ("martial") while dismissing others (like Bengalis) as intellectual or "effeminate".',
      ['Social Darwinist Phrenology', 'The Aryan Hierarchy Doctrine', 'The Imperial Caste Mandate'],
      'gwp2_l3_13',
    ),
    q(
      'What was the name of the December 1918 mutiny in Italy where Caribbean soldiers revolted against degrading physical tasks and racist abuse?',
      'The Taranto Mutiny',
      'At the transit camp in Taranto, Italy, BWIR soldiers were ordered to clean latrines for white South African troops; after severe physical punishment, over 180 soldiers mutinied.',
      ['The Kingston Rebellion', 'The Naples Uprising', 'The Port of Spain Riot'],
      'gwp2_l3_14',
    ),
    q(
      'Under what strict contractual condition were 140,000 Chinese labourers brought to the Western Front by British authorities?',
      'They were classified as non-combatant civilian contract labourers and legally barred from carrying weapons or fighting',
      'Recruited from Shandong province, the Chinese workers were strictly segregated in military compounds and used for arduous manual labour under British military discipline.',
      [
        'They were promised full British citizenship upon arrival',
        'They were deployed as frontline elite assault stormtroopers',
        'They were employed exclusively as civilian bank clerks in Paris',
      ],
      'gwp2_l3_15',
    ),
    q(
      'Why did British censors systematically intercept and alter letters sent home by Indian soldiers in Brighton hospitals?',
      'To prevent descriptions of white British women nursing Indian men from undermining the racial caste hierarchy in colonial India',
      'British authorities feared that stories of white women showing affection and respect to Indian men would destroy the myth of white racial superiority that underpinned the British Raj.',
      [
        'To steal money orders sent by Indian families to wounded soldiers',
        'To translate all letters into German for military intelligence',
        'Because Indian soldiers were suspected of running an illegal postal service',
      ],
      'gwp2_l3_16',
    ),
    q(
      'Which famous Indian nationalist leader actively supported British military recruitment in 1914 in the mistaken hope it would earn India dominion self-government?',
      'Mahatma Gandhi',
      'Gandhi toured Indian villages urging young men to enlist as a demonstration of imperial citizenship, believing loyalty would compel Britain to grant India home rule (Swaraj).',
      ['Jawaharlal Nehru', 'Subhas Chandra Bose', 'Muhammad Ali Jinnah'],
      'gwp2_l3_17',
    ),
    q(
      'What repressive imperial legislation passed in India in March 1919 extended wartime censorship and detention without trial, sparking massive protests?',
      'The Rowlatt Act',
      'The Rowlatt Act betrayed Indian expectations of democratic reform after their wartime sacrifices, sparking the nationwide civil disobedience movement that culminated in the Amritsar Massacre.',
      [
        'The Government of India Act',
        'The Defense of India Mandate',
        'The Morley-Minto Regulations',
      ],
      'gwp2_l3_18',
    ),
    q(
      'How many gallantry medals were awarded to soldiers of the British West Indies Regiment (BWIR) despite being officially barred from frontline combat?',
      'Over 80 decorations, including 5 Distinguished Conduct Medals and dozens of Military Medals',
      'BWIR soldiers frequently came under heavy artillery and gas bombardment while hauling shells to frontline guns, displaying extraordinary gallantry under direct fire.',
      ['Zero decorations', 'Only 1 medal', 'Over 10,000 Victoria Crosses'],
      'gwp2_l3_19',
    ),
    q(
      'According to historian David Olusoga, why were non-white colonial soldiers systematically erased from post-war British memorials like the Cenotaph in Whitehall?',
      'To preserve the comforting national myth that the Great War was an exclusively white, British sacrifice, thereby reinforcing post-war imperial dominance',
      'Olusoga argues that imperial authorities deliberately Whitewashed history: acknowledging that four million colonial troops helped save Britain would undermine the justification for imperial rule.',
      [
        'Because colonial governments demanded that all records of their troops be burned',
        'Because no colonial troops were present in Europe during the war',
        'Because the British government ran out of stone to carve non-European names',
      ],
      'gwp2_l3_20',
    ),
  ],

  lesson_4: [
    // Core Retrieval (1-10)
    q(
      'What sweeping emergency legislation was passed by Parliament on 8 August 1914 to control civilian life and industry in wartime Britain?',
      'The Defence of the Realm Act (DORA)',
      'Passed just four days into the war without parliamentary debate, DORA gave the British government unprecedented authoritarian powers to control the economy, press, and daily habits.',
      [
        'The Emergency Powers Act',
        'The War Measures Mandate',
        'The Representation of the People Act',
      ],
      'gwp2_l4_1',
    ),
    q(
      'Which personal habit was strictly regulated under DORA to combat industrial absenteeism among munitions workers?',
      'Slashing pub opening hours, watering down beer, and banning buying rounds ("no-treating")',
      'Under DORA, pub hours were cut from 19 hours to 5.5 hours a day, beer alcohol content was lowered, and "treating" (buying drinks for friends) was made a criminal offence.',
      [
        'Banning all consumption of tea and coffee in public places',
        'Making smoking tobacco punishable by immediate execution',
        'Forbidding civilians from eating meals in restaurants on weekends',
      ],
      'gwp2_l4_2',
    ),
    q(
      'Why did the British government introduce British Summer Time (advancing clocks by one hour) in May 1916?',
      'To provide extra evening daylight for munitions manufacturing and conserve domestic coal supplies',
      'Advancing clocks saved approximately 300,000 tons of coal annually and gave factory and farm workers longer daylight hours without requiring artificial lighting.',
      [
        'To confuse German Zeppelin navigators flying over England',
        'To synchronize London time with St. Petersburg time',
        'Because King George V personally disliked dark winter mornings',
      ],
      'gwp2_l4_3',
    ),
    q(
      'What 1916 legislation introduced compulsory military conscription for the first time in modern British history?',
      'The Military Service Act',
      'Passed in January 1916, the Act initially conscripted single men aged 18 to 41, expanding in May 1916 to include married men as casualties on the Western Front mounted.',
      [
        'The Conscription Declaration',
        'The National Service Mandate',
        'The Armed Forces Recruitment Bill',
      ],
      'gwp2_l4_4',
    ),
    q(
      'What term was used to describe men who claimed the legal right to refuse military service on moral or religious grounds?',
      'Conscientious Objectors ("Conchies")',
      'Over 16,000 men registered as Conscientious Objectors; they faced military tribunals and intense public hostility, being branded as cowards, shirkers, and traitors.',
      ['War Shirkers', 'Passive Resisters', 'Non-Combatant Guildsmen'],
      'gwp2_l4_5',
    ),
    q(
      'Why were female munitions workers given the popular nickname "Canary Girls"?',
      'Exposure to toxic TNT chemicals turned their skin, eyes, and hair bright yellow',
      'Handling toxic cordite and trinitrotoluene (TNT) daily caused toxic jaundice, stripping hair and turning skin yellow; long-term exposure caused liver failure and early death.',
      [
        'They wore bright yellow feathered hats to show factory solidarity',
        'They were required to sing patriotic songs while assembling artillery shells',
        'They carried pet canaries into factories to detect carbon monoxide leaks',
      ],
      'gwp2_l4_6',
    ),
    q(
      'What major industrial disaster occurred on 1 July 1918, killing 137 munitions workers in Nottinghamshire?',
      'The Chilwell Shell-Filling Factory Explosion',
      'Eight tons of TNT detonated at National Shell Filling Factory No. 6 in Chilwell, killing 137 workers (mostly women); remaining workers reported back for duty the following morning.',
      [
        'The Silvertown Explosion',
        'The Faversham Powder Works Blast',
        'The Portsmouth Dockyard Detonation',
      ],
      'gwp2_l4_7',
    ),
    q(
      'What was the primary cause of severe food shortages across Great Britain during 1917 and 1918?',
      'The German unrestricted submarine (U-boat) blockade sinking merchant supply ships in the Atlantic',
      'In early 1917, German U-boats sank one in every four merchant ships heading to Britain, leaving the nation with barely six weeks of grain reserves and forcing the introduction of rationing.',
      [
        'A total collapse of British domestic agriculture due to drought',
        'French armies seizing all British grain supplies at gunpoint',
        'A nationwide strike by British railway and dock workers',
      ],
      'gwp2_l4_8',
    ),
    q(
      'Which women were granted the right to vote under the 1918 Representation of the People Act?',
      'Women aged 30 and over who met property qualifications',
      'While all adult men over 21 gained the vote, women had to wait until age 30 and be householders or married to householders, deliberately excluding the young working-class munitions girls.',
      [
        'All women aged 18 and over on equal terms with men',
        'Only women who had served in frontline medical units in France',
        'Only aristocratic women who owned more than 1,000 acres of land',
      ],
      'gwp2_l4_9',
    ),
    q(
      'What happened to over 750,000 female industrial workers when the war ended in 1919?',
      'They were sacked and forced out of heavy industry to restore jobs to demobilized male soldiers',
      'Under the Restoration of Pre-War Practices Act (1919), trade unions and the government forced women to surrender their industrial jobs and return to low-paid domestic service or the home.',
      [
        'They were promoted to senior executive management in British engineering firms',
        'They were given permanent government pensions equal to full male wages',
        'They were conscripted into the peacetime regular army',
      ],
      'gwp2_l4_10',
    ),

    // Mastery Challenge (11-20)
    q(
      'What traditional Victorian economic doctrine—meaning "leave alone"—was dismantled as the British state took control of mines, railways, and factories?',
      'Laissez-faire',
      'Before 1914, British governance was defined by free-market laissez-faire; total war forced the state to take direct control of national shipping, coal production, and munitions.',
      ['Mercantilism', 'Feudalism', 'Collectivist Anarchism'],
      'gwp2_l4_11',
    ),
    q(
      'What political crisis erupted in May 1915 when the British press revealed that frontline artillery was rationed to four shells per gun per day?',
      'The "Shell Scandal"',
      'Exposed by The Times’ war correspondent Colonel Repington, the shortage of high explosive shells toppled Herbert Asquith’s Liberal cabinet, forcing the creation of a coalition government.',
      ['The Marconi Scandal', 'The Dardanelles Inquiry', 'The Kitchener Crisis'],
      'gwp2_l4_12',
    ),
    q(
      'Who was appointed Britain’s first Minister of Munitions in May 1915, transforming national industrial production through state regulation?',
      'David Lloyd George',
      'Lloyd George established national shell factories, requisitioned raw materials, suspended trade union restrictive practices, and mobilized one million women into manufacturing.',
      ['Winston Churchill', 'Lord Beaverbrook', 'Arthur Henderson'],
      'gwp2_l4_13',
    ),
    q(
      'What crucial distinction existed between "absolutist" and "alternatist" Conscientious Objectors during the First World War?',
      'Absolutists refused all war work and were imprisoned, while alternatists accepted non-combatant civilian roles such as ambulance driving',
      'Roughly 1,500 "absolutists" refused even civilian work that aided the war effort and were subjected to solitary confinement and hard labour in prisons like Richmond Castle and Dartmoor.',
      [
        'Absolutists served in the navy while alternatists served in the infantry',
        'Absolutists were executed immediately while alternatists were exiled to Canada',
        'Absolutists paid a fine while alternatists were given royal pardons',
      ],
      'gwp2_l4_14',
    ),
    q(
      'At which historic castle in Yorkshire were sixteen absolutist conscientious objectors detained before being shipped to France and sentenced to death (later commuted)?',
      'Richmond Castle',
      'The "Richmond Sixteen" were locked in the castle cells (where their pencil graffiti survives today) and taken to France; after public outcry, Prime Minister Asquith commuted their death sentences.',
      ['Pontefract Castle', 'York Castle', 'Conisbrough Castle'],
      'gwp2_l4_15',
    ),
    q(
      'What fatal medical condition, characterized by acute liver necrosis and jaundice, claimed the lives of hundreds of female munitions workers handling TNT?',
      'Toxic jaundice (TNT poisoning)',
      'TNT was absorbed through the skin and lungs, destroying liver tissue; by 1917, toxic jaundice was officially recognized as an occupational industrial disease by the Home Office.',
      ['Pneumonia', 'Silicosis', 'Phossy jaw'],
      'gwp2_l4_16',
    ),
    q(
      'What voluntary civilian organization was created in 1917 to replace male agricultural workers and prevent national starvation by farming the British countryside?',
      'The Women’s Land Army',
      'Over 23,000 women joined the Land Army, working on farms to harvest crops, milk cattle, and reclaim uncultivated wasteland, ensuring food production continued despite conscription.',
      ['The Munitionettes Guild', 'The Home Defense Corps', 'The Rural Auxiliary Service'],
      'gwp2_l4_17',
    ),
    q(
      'What 1919 legislation legally required employers to dismiss wartime female workers and restore traditional male-only union practices?',
      'The Restoration of Pre-War Practices Act',
      'Passed to honor wartime promises made to male trade union leaders, the Act legally restored pre-war demarcation rules, stripping women of access to skilled engineering and industrial work.',
      [
        'The Demobilization Bill',
        'The Female Redundancy Act',
        'The Trade Union Restoration Mandate',
      ],
      'gwp2_l4_18',
    ),
    q(
      'In what year did British women finally achieve full, equal voting rights with men on identical terms at age 21?',
      '1928 (The Equal Franchise Act)',
      'It was not until the 1928 Equal Franchise Act that all women over 21 gained the vote, demonstrating that wartime work in 1914–1918 did not immediately produce universal female suffrage.',
      ['1918', '1924', '1945'],
      'gwp2_l4_19',
    ),
    q(
      'What system of fair food distribution was introduced across Great Britain in early 1918 to eliminate bread queues and combat U-boat shortages?',
      'Compulsory Rationing (for sugar, butter, meat, and jam)',
      'Introduced by Food Controller Lord Rhondda in early 1918, rationing cards ensured equal access to essential nutrition regardless of wealth, ending hoarding and stabilizing the home front.',
      ['Voluntary Abstinence Pledges', 'Price Gouging Fines', 'National Kitchen Tokens'],
      'gwp2_l4_20',
    ),
  ],

  lesson_5: [
    // Core Retrieval (1-10)
    q(
      'Which three victorious world leaders were known collectively as "The Big Three" at the Paris Peace Conference in 1919?',
      'Georges Clemenceau (France), David Lloyd George (Britain), and Woodrow Wilson (USA)',
      'The Big Three dominated negotiations in Paris: Clemenceau sought security and revenge, Wilson championed the Fourteen Points, and Lloyd George sought a pragmatic middle ground.',
      [
        'Winston Churchill, Franklin D. Roosevelt, and Joseph Stalin',
        'Kaiser Wilhelm II, Tsar Nicholas II, and King George V',
        'Vittorio Orlando, Otto von Bismarck, and Lord Kitchener',
      ],
      'gwp2_l5_1',
    ),
    q(
      'What German term was universally used in Berlin to condemn the Treaty of Versailles as an imposed, dictated peace?',
      'A "Diktat"',
      'Because German representatives were excluded from negotiations and forced to sign under threat of an immediate Allied military invasion, Germans across all parties condemned it as a Diktat.',
      ['A "Reichstag"', 'A "Kaiserreich"', 'A "Dolchstoß"'],
      'gwp2_l5_2',
    ),
    q(
      'What was the official clause number of the controversial "War Guilt Clause" in the Treaty of Versailles?',
      'Article 231',
      'Article 231 forced Germany to accept sole moral responsibility for causing all loss and damage of the war, serving as the legal justification for demanding colossal financial reparations.',
      ['Article 48', 'Article 14', 'Article 100'],
      'gwp2_l5_3',
    ),
    q(
      'What astronomical financial sum was fixed by the Allied Reparations Commission in 1921 for Germany to pay in war damages?',
      '£6.6 billion ($33 billion)',
      'Fixed in London in 1921, the reparations figure of 132 billion gold marks (£6.6 billion) was condemned by Germany as impossible to pay without economic collapse.',
      ['£100 million', '£1 billion', '£50 billion'],
      'gwp2_l5_4',
    ),
    q(
      'To what maximum strength was the German army restricted under the disarmament clauses of the Treaty of Versailles?',
      '100,000 volunteers (with military conscription banned)',
      'Germany was forbidden from having an air force, tanks, heavy artillery, submarines, or a general staff, reducing its military to a domestic border security force.',
      ['10,000 men', '500,000 men', '1 million men'],
      'gwp2_l5_5',
    ),
    q(
      'What strip of German territory was granted to the newly re-established state of Poland, cutting off East Prussia from the rest of Germany?',
      'The Polish Corridor',
      'The Polish Corridor gave Poland access to the Baltic Sea port of Danzig, but severed East Prussia from Germany, creating a permanent territorial flashpoint.',
      ['The Sudetenland', 'Alsace-Lorraine', 'The Rhineland'],
      'gwp2_l5_6',
    ),
    q(
      'Which famous British economist resigned in protest from the Paris Peace Conference and published "The Economic Consequences of the Peace" (1919)?',
      'John Maynard Keynes',
      'Keynes argued that crushing Germany with vindictive reparations would impoverish Europe’s largest industrial market, destabilize the European economy, and breed future war.',
      ['Adam Smith', 'Karl Marx', 'Milton Friedman'],
      'gwp2_l5_7',
    ),
    q(
      'In Will Dyson’s famous May 1919 political cartoon, what prophetic label appears above the weeping child behind the pillar?',
      '"1940 Class"',
      'Dyson depicted Clemenceau walking away from Versailles saying "Curious! I seem to hear a child weeping!", with a child labelled "1940 Class"—accurately predicting WWII 20 years early.',
      ['"League of Nations"', '"Weimar Republic"', '"November Criminal"'],
      'gwp2_l5_8',
    ),
    q(
      'According to modern revisionist historian Margaret MacMillan ("Paris 1919"), what was the primary reason the Treaty of Versailles failed?',
      'The refusal of the victorious Allies to consistently enforce the treaty’s terms during the 1920s and 1930s',
      'MacMillan argues that Versailles was a workable compromise; the failure lay in Britain and France’s failure to enforce its terms, while the United States retreated into isolationism.',
      [
        'The treaty was too generous and gave Germany all of Eastern Europe',
        'Germany completely ran out of iron and coal reserves',
        'President Woodrow Wilson ordered the destruction of the French army',
      ],
      'gwp2_l5_9',
    ),
    q(
      'What right-wing nationalist conspiracy theory claimed the German army was undefeated in the field but betrayed by domestic socialist and Jewish politicians?',
      'The "Dolchstoßlegende" (stab-in-the-back myth)',
      'Promoted by Field Marshals Hindenburg and Ludendorff, this myth absolved the military of defeat, scapegoated the newly formed Weimar Republic, and was exploited by Adolf Hitler.',
      ['The Schlieffen Myth', 'The Iron Curtain Legend', 'The Blitzkrieg Theory'],
      'gwp2_l5_10',
    ),

    // Mastery Challenge (11-20)
    q(
      'Where was the German Empire originally proclaimed in 1871, making it the symbolic venue deliberately chosen by France to sign the 1919 treaty?',
      'The Hall of Mirrors at the Palace of Versailles',
      'French Premier Clemenceau insisted that the peace treaty be signed in the exact same Hall of Mirrors where Bismarck had humiliated France by crowning Kaiser Wilhelm I in 1871.',
      ['The Notre-Dame Cathedral', 'The Arc de Triomphe', 'The Palace of Fontainebleau'],
      'gwp2_l5_11',
    ),
    q(
      'What was French Prime Minister Georges Clemenceau’s primary diplomatic objective during the Paris Peace Conference?',
      'To permanently cripple Germany militarily and economically to guarantee French national security against future invasion',
      'Having witnessed two German invasions of France in his lifetime (1870 and 1914), "The Tiger" demanded the dismemberment of Germany and an independent buffer state in the Rhineland.',
      [
        'To establish a permanent free-trade union across all of Central Europe',
        'To help Germany rebuild its High Seas Fleet to challenge Great Britain',
        'To restore the Habsburg monarchy in Austria-Hungary',
      ],
      'gwp2_l5_12',
    ),
    q(
      'What blueprint for global peace and international self-determination was announced by US President Woodrow Wilson in January 1918?',
      'The Fourteen Points',
      'Wilson’s Fourteen Points advocated open diplomacy, freedom of the seas, reduction of armaments, national self-determination for ethnic minorities, and the League of Nations.',
      ['The Atlantic Charter', 'The Truman Doctrine', 'The Marshall Plan'],
      'gwp2_l5_13',
    ),
    q(
      'What international peacekeeping organization was established in Part I of the Treaty of Versailles, but subsequently rejected by the United States Senate?',
      'The League of Nations',
      'Wilson championed the League as a collective security forum; however, the US Senate refused to ratify the Treaty of Versailles, leaving the League without American power.',
      ['The United Nations', 'The Concert of Europe', 'The International Court of Justice'],
      'gwp2_l5_14',
    ),
    q(
      'What valuable border province, annexed by Germany in 1871, was returned to French sovereignty under the territorial terms of Versailles?',
      'Alsace-Lorraine',
      'Reclaiming Alsace-Lorraine had been France’s supreme national war aim since 1871, restoring valuable iron ore fields and textile industries to the Republic.',
      ['The Sudetenland', 'The Ruhr Valley', 'Bavaria'],
      'gwp2_l5_15',
    ),
    q(
      'What was the military status of the German Rhineland under Articles 42 to 44 of the Treaty of Versailles?',
      'It was permanently demilitarized, forbidding German fortifications, troops, or military maneuvers within 50 kilometers east of the Rhine',
      'To provide a physical security buffer for France and Belgium, the Rhineland was demilitarized and occupied by Allied troops for up to fifteen years.',
      [
        'It was annexed permanently into the territory of Belgium',
        'It was converted into an independent kingdom ruled by King George V',
        'It was ceded to Poland as an industrial mining colony',
      ],
      'gwp2_l5_16',
    ),
    q(
      'What coal-rich German industrial territory was placed under League of Nations control for 15 years, with its coal production given directly to France?',
      'The Saar Basin (Saarland)',
      'The Saar was detached from Germany to compensate France for the deliberate destruction of French coal mines by retreating German troops in 1918.',
      ['Silesia', 'The Black Forest', 'Pomerania'],
      'gwp2_l5_17',
    ),
    q(
      'What derogatory term was used by German nationalists to vilify the Weimar politicians who signed the November 1918 Armistice and Versailles Treaty?',
      'The "November Criminals"',
      'Right-wing nationalists claimed that politicians like Friedrich Ebert and Matthias Erzberger had betrayed the undefeated front-line soldiers by surrendering in November 1918.',
      ['The Spartacists', 'The Freikorps', 'The Junkers'],
      'gwp2_l5_18',
    ),
    q(
      'In what landmark 1919 book did British economist John Maynard Keynes predict that Versailles would cause the economic destruction of Europe?',
      'The Economic Consequences of the Peace',
      'Keynes resigned in disgust from the British Treasury delegation, writing an international bestseller that severely damaged the moral legitimacy of the Treaty of Versailles.',
      ['The Wealth of Nations', 'General Theory of Employment', 'Das Kapital'],
      'gwp2_l5_19',
    ),
    q(
      'According to modern diplomatic historian Sally Marks ("The Illusion of Peace"), why is it inaccurate to describe Versailles as an excessively harsh treaty?',
      'Germany remained geographically unified, industrially intact, and potentially the strongest economic power on the European continent',
      'Marks argues that unlike the partitioned Austro-Hungarian or Ottoman empires, Germany retained its industrial core, emerging in 1919 in a stronger strategic position relative to fragmented Eastern Europe.',
      [
        'Germany was permitted to keep all of its African colonies',
        'The Allies paid Germany £10 billion in financial aid',
        'The German army was permitted to expand to 2 million troops',
      ],
      'gwp2_l5_20',
    ),
  ],

  lesson_6: [
    // Core Retrieval (1-10)
    q(
      'How many young men and women from the parish of Stubbington and Hill Head are commemorated on the village war memorial?',
      '67 names',
      'Out of a rural coastal population of barely 1,500 people, sixty-seven local men and women died during the First World War—a catastrophic local sacrifice.',
      ['12 names', '150 names', '500 names'],
      'gwp2_l6_1',
    ),
    q(
      'What unique architectural feature characterizes the Stubbington War Memorial erected in 1922 on the village green?',
      'It was constructed as an open oak shelter built directly over the historic village water pump',
      'Rather than a stone cross or statue, the community built a functional oak shelter over the historic pump, embedding memorial remembrance into the daily working life of villagers.',
      [
        'It is a 50-foot bronze statue of an infantry soldier',
        'It is a marble triumphal archway spanning the main Portsmouth road',
        'It is an underground reinforced concrete bunker',
      ],
      'gwp2_l6_2',
    ),
    q(
      'Which prominent local Stubbington family of Manor Way Grange tragically lost all three of their sons during the First World War?',
      'The Lowry family',
      'William and Annie Lowry sent three sons to war: Cyril was killed at Loos in 1915, William was shot down in 1917, and Eric was killed in September 1918, extinguishing the family line.',
      ['The Churchill family', 'The Kitchener family', 'The Asquith family'],
      'gwp2_l6_3',
    ),
    q(
      'What gallantry medals were awarded to Major Auriol "Eric" Lowry before his tragic death in September 1918?',
      'The Distinguished Service Order (DSO) and Military Cross (MC)',
      'Major Eric Lowry of the 2nd West Yorkshire Regiment survived four brutal years on the Western Front, winning the DSO and MC for extraordinary heroism before dying just weeks before peace.',
      ['The Victoria Cross (VC)', 'The Iron Cross First Class', 'The French Legion of Honour'],
      'gwp2_l6_4',
    ),
    q(
      'Who was the only woman commemorated among the 67 names on the Stubbington War Memorial shelter?',
      'Nita Madeline King',
      'Nita Madeline King served as an ambulance driver in France with the Queen Mary’s Army Auxiliary Corps (QMAAC), dying of illness contracted on active service in 1918.',
      ['Vera Brittain', 'Jessie Pope', 'Edith Cavell'],
      'gwp2_l6_5',
    ),
    q(
      'What tragic task did village carpenter Arthur Tribbeck have to perform while building the Stubbington memorial shelter in 1922?',
      'Carving the name of his own fallen 21-year-old son, Harold Tribbeck, into the oak beam',
      'Arthur Tribbeck volunteered to craft the oak shelter, physically carving sixty-seven names into the timber, including his own son Harold, who was killed on the Western Front in 1918.',
      [
        'Demolishing his family home to make space on the village green',
        'Refusing to accept payment from the Fareham parish council',
        'Building sixty-seven wooden coffins for empty graves',
      ],
      'gwp2_l6_6',
    ),
    q(
      'What colloquial nickname was given to the bronze Next of Kin Memorial Plaque issued to grieving British families?',
      'The "Dead Man’s Penny"',
      'Cast in bronze and measuring 4.75 inches across, the plaque showed Britannia, a lion, and the fallen soldier’s name with the inscription "He died for freedom and honour."',
      ['The "King’s Shilling"', 'The "Widow’s Mite"', 'The "Iron Penny"'],
      'gwp2_l6_7',
    ),
    q(
      'What colossal memorial in France, designed by Sir Edwin Lutyens, bears the names of 72,246 British and South African soldiers missing on the Somme?',
      'The Thiepval Memorial to the Missing',
      'Erected on the Somme, Thiepval commemorates over 72,000 soldiers who died with no known graves, whose bodies were atomized by artillery or lost in the mud.',
      ['The Menin Gate', 'The Tyne Cot Memorial', 'The Cenotaph'],
      'gwp2_l6_8',
    ),
    q(
      'According to Cambridge historian Professor Jay Winter, what was the primary psychological purpose of village war memorials?',
      'They served as "surrogate tombs" where families with no physical bodies to bury could mourn locally',
      'Because the British government banned repatriating war dead, over 80% of families never saw their loved ones’ graves; village memorials provided a sacred local proxy for mourning.',
      [
        'They were built as military recruitment stations for future conflicts',
        'They were designed to celebrate British imperial conquest and annexations',
        'They were used as town hall voting booths during municipal elections',
      ],
      'gwp2_l6_9',
    ),
    q(
      'What community building in Lee-on-the-Solent was constructed by William Lowry in memory of his three fallen sons?',
      'The Lowry Memorial Hall',
      'Devastated by the extinction of his family line, William Lowry financed and built the Lowry Memorial Hall to serve the local community as a living, enduring monument.',
      ['The Royal Naval Hospital', 'The Holy Rood Church Spire', 'The Solent Aviation Center'],
      'gwp2_l6_10',
    ),

    // Mastery Challenge (11-20)
    q(
      'What was the approximate total population of the combined parish of Stubbington and Hill Head at the outbreak of the First World War in 1914?',
      'Approximately 1,500 residents',
      'In 1914, Stubbington was a tranquil Hampshire village of roughly 1,500 farmers, fishermen, and dockyard workers; the loss of 67 young lives shattered nearly every household.',
      ['Over 25,000 residents', 'Barely 100 people', 'Exactly 5,000 residents'],
      'gwp2_l6_11',
    ),
    q(
      'At which costly battle in September 1915 was the eldest Lowry brother, Captain Cyril Lowry, killed in action?',
      'The Battle of Loos',
      'Captain Cyril Lowry of the North Staffordshire Regiment was killed during the assault at Loos, where the British Army deployed poison gas for the first time with disastrous wind reversals.',
      ['The Battle of the Somme', 'The Battle of Passchendaele', 'The Gallipoli Landings'],
      'gwp2_l6_12',
    ),
    q(
      'In which branch of the armed forces was the second Lowry brother, William, serving when he was shot down and killed in 1917?',
      'The Royal Naval Air Service (RNAS) / Royal Flying Corps',
      'Flight Lieutenant William Lowry took to the skies in early military aircraft, being killed in combat over the Western Front during the perilous aerial dogfights of 1917.',
      ['The Royal Submarine Service', 'The Royal Tank Regiment', 'The Hampshire Yeomanry Cavalry'],
      'gwp2_l6_13',
    ),
    q(
      'In what final Allied campaign of 1918 was Major Eric Lowry DSO MC killed, just seven weeks before the 11 November Armistice?',
      'The Hundred Days Offensive (September 1918)',
      'After enduring four years of frontline combat, Major Lowry was killed leading his men in the final victorious push that shattered the German Western Front defenses.',
      ['The Spring Offensive', 'The Gallipoli Evacuation', 'The Battle of Jutland'],
      'gwp2_l6_14',
    ),
    q(
      'In what auxiliary military corps did Nita Madeline King serve as a motor driver in France before her death from illness in 1918?',
      'The Queen Mary’s Army Auxiliary Corps (QMAAC)',
      'Nita King volunteered for the QMAAC, driving ambulances and staff cars near the front lines in France before succumbing to sickness exacerbated by wartime conditions.',
      [
        'The First Aid Nursing Yeomanry (FANY)',
        'The Women’s Land Army',
        'The Voluntary Aid Detachment (VAD)',
      ],
      'gwp2_l6_15',
    ),
    q(
      'What official royal condolence message accompanied the bronze Next of Kin Memorial Plaque sent to bereaved British families?',
      'A scroll inscribed: "He died for freedom and honour"',
      'King George V issued a printed scroll accompanying each bronze plaque, bearing the royal coat of arms and honoring the fallen serviceman’s sacrifice for king and empire.',
      [
        'A medal inscribed: "Victory through Blood and Iron"',
        'A letter reading: "Regrettable civilian casualty of war"',
        'A parchment stating: "Duty fulfilled without complaint"',
      ],
      'gwp2_l6_16',
    ),
    q(
      'Which celebrated British architect designed the Cenotaph in Whitehall and the monumental Thiepval Memorial on the Somme?',
      'Sir Edwin Lutyens',
      'Lutyens created the iconic stepped pylon of the Cenotaph ("empty tomb") in London and the interlocking brick arches of Thiepval, defining modern commemorative architecture.',
      ['Sir Christopher Wren', 'Arthur Blomfield', 'Gilbert Scott'],
      'gwp2_l6_17',
    ),
    q(
      'What best-selling 1933 autobiography by Vera Brittain became the defining literary memoir of the "Lost Generation" and female wartime bereavement?',
      'Testament of Youth',
      'Vera Brittain lost her fiancé, her brother, and two close friends in the war; her poignant memoir captured the profound sense of an entire generation destroyed by mechanized slaughter.',
      ['Goodbye to All That', 'Memoirs of an Infantry Officer', 'The Waste Land'],
      'gwp2_l6_18',
    ),
    q(
      'What counter-interpretation do social historians like Dan Todman advance regarding the cultural myth of the "Lost Generation"?',
      'While bereavement was deep and tragic, British society demonstrated remarkable resilience, recovery, and adaptability rather than succumbing to permanent despair',
      'Todman argues that the "Lost Generation" was a literary metaphor that exaggerated national devastation: 88% of mobilized British soldiers returned home alive, and communities rapidly rebuilt.',
      [
        'British communities completely forgot about the war by 1920',
        'No British soldiers were killed during the First World War',
        'The war had zero emotional impact on rural English villages',
      ],
      'gwp2_l6_19',
    ),
    q(
      'On what historic central location was the Stubbington War Memorial shelter erected in 1922 to serve the ongoing daily life of the community?',
      'The Village Green, constructed directly over the historic village water pump',
      'The oak shelter was placed on the Village Green over the communal pump so that every time villagers collected water, they would pass beneath the carved names of their fallen neighbours.',
      [
        'Inside the private walled garden of Manor Way Grange',
        'On the railway platform at Fareham station',
        'At the entrance of Portsmouth Naval Dockyard',
      ],
      'gwp2_l6_20',
    ),
  ],

  lesson_7: [
    // Core Retrieval (1-10)
    q(
      'What series of Allied victories between August and November 1918 decisively broke the German military on the Western Front?',
      'The Hundred Days Offensive',
      'Beginning with the Battle of Amiens on 8 August 1918 ("the black day of the German Army"), the Allies launched a continuous combined-arms offensive that shattered German resistance.',
      ['The Gallipoli Campaign', 'The Battle of the Somme', 'The German Spring Offensive'],
      'gwp2_l7_1',
    ),
    q(
      'Who was the first South Asian soldier awarded the Victoria Cross for machine-gun gallantry at First Ypres in 1914?',
      'Sepoy Khudadad Khan VC',
      'Khudadad Khan of the 129th Baluchis became the first South Asian recipient of the Victoria Cross, manning his gun alone in the mud of Flanders to hold off a German onslaught.',
      ['Mahatma Gandhi', 'Subadar Mir Dast VC', 'Captain Amar Singh'],
      'gwp2_l7_2',
    ),
    q(
      'What nickname was given to British female munitions workers whose skin turned yellow from toxic TNT poisoning?',
      'Canary Girls',
      'Over 700,000 women worked in munitions; handling trinitrotoluene (TNT) stained their hair and skin yellow, earning them the affectionate yet tragic moniker of "Canary Girls".',
      ['Suffragettes', 'Land Girls', 'Doughgirls'],
      'gwp2_l7_3',
    ),
    q(
      'What sweeping emergency legislation passed in August 1914 gave the British government sweeping control over civilian life and industry?',
      'The Defence of the Realm Act (DORA)',
      'DORA empowered the government to censor newspapers, take over private factories, restrict alcohol consumption, and control food supplies under emergency war powers.',
      ['The Representation of the People Act', 'The Military Service Act', 'The Factory Act'],
      'gwp2_l7_4',
    ),
    q(
      'What controversial clause in the Treaty of Versailles forced Germany to accept sole moral responsibility for the war?',
      'Article 231 (The War Guilt Clause)',
      'Article 231 formed the legal basis for demanding reparations, but created bitter resentment across Germany, where it was condemned as a hypocritical lie.',
      ['Article 48', 'Article 14', 'Article 100'],
      'gwp2_l7_5',
    ),
    q(
      'What sum was fixed by the Allied Reparations Commission in 1921 for Germany to pay in war damages?',
      '£6.6 billion ($33 billion)',
      'The £6.6 billion reparations bill provoked intense diplomatic friction throughout the 1920s, contributing to hyperinflation in 1923 before being restructured under the Dawes Plan.',
      ['£100 million', '£1 billion', '£50 billion'],
      'gwp2_l7_6',
    ),
    q(
      'How many young men and women from the parish of Stubbington and Hill Head died during the First World War?',
      '67 casualties',
      'Out of a population of approximately 1,500, sixty-seven local individuals gave their lives, representing a profound loss for the Hampshire village community.',
      ['12 casualties', '150 casualties', '500 casualties'],
      'gwp2_l7_7',
    ),
    q(
      'Which local Stubbington family of Manor Way Grange tragically lost all three of their sons in the conflict?',
      'The Lowry family',
      'William and Annie Lowry lost Cyril (1915), William (1917), and Eric (1918), leading to the construction of the Lowry Memorial Hall in Lee-on-the-Solent in their honor.',
      ['The Churchill family', 'The Kitchener family', 'The Asquith family'],
      'gwp2_l7_8',
    ),
    q(
      'What was the primary role of the 140,000 Chinese civilian workers in the Chinese Labour Corps on the Western Front?',
      'Handling heavy artillery ammunition, building railways, and clearing unexploded ordnance',
      'Chinese contract workers provided the essential manual labour that kept the Allied war machine functioning, digging trenches, maintaining tracks, and clearing battlefields.',
      [
        'Flying fighter aircraft over Berlin',
        'Serving as diplomatic ambassadors in Washington',
        'Working as surgeons in military field hospitals',
      ],
      'gwp2_l7_9',
    ),
    q(
      'According to Professor Jay Winter, what was the primary psychological purpose of local village war memorials like Stubbington’s?',
      'They acted as "surrogate tombs" for families whose sons had no identifiable graves',
      'With war dead buried abroad in France and Belgium, village memorials gave families a tangible local monument where they could lay flowers and mourn their lost sons.',
      [
        'They were built to celebrate British imperial dominance',
        'They were used to recruit soldiers for future conflicts',
        'They served as municipal tax collection offices',
      ],
      'gwp2_l7_10',
    ),

    // Mastery Challenge (11-20)
    q(
      'Approximately how long was the continuous frontline trench system of the Western Front from the Belgian coast to the Swiss frontier?',
      'Approximately 400 miles',
      'The Western Front formed an unbroken trench system across northern France and Flanders, deadlock that neither side could break for nearly four years.',
      ['50 miles', '1,500 miles', '2,000 miles'],
      'gwp2_l7_11',
    ),
    q(
      'Which battle on 1 July 1916 resulted in the bloodiest single day in British military history, with 57,470 casualties?',
      'The First Day of the Battle of the Somme',
      'Advancing in broad daylight against uncut wire and undamaged German concrete dugouts, British infantry suffered 19,240 fatalities in a matter of hours.',
      ['The Battle of Passchendaele', 'The Battle of Loos', 'The Battle of Cambrai'],
      'gwp2_l7_12',
    ),
    q(
      'What new chemical weapon, causing severe internal and external blistering and blindness, was introduced by Germany at Third Ypres in 1917?',
      'Mustard gas',
      'Mustard gas was an insidious blistering agent that remained active in mud for days, requiring soldiers to wear respirators for prolonged periods and burning exposed skin.',
      ['Chlorine gas', 'Phosgene gas', 'Tear gas'],
      'gwp2_l7_13',
    ),
    q(
      'What was the nickname given to civic battalions formed by friends, workmates, and sports clubs from the same town in 1914?',
      'Pals Battalions',
      'Raised by figures like Lord Derby in Liverpool, Pals Battalions recruited men who lived together, but suffered concentrated community devastation when units took heavy losses.',
      ['Chums Brigades', 'Town Guards', 'Kitchener Corps'],
      'gwp2_l7_14',
    ),
    q(
      'What emergency legislation introduced compulsory military conscription for British men aged 18–41 in 1916?',
      'The Military Service Act',
      'Passed in January 1916 after voluntary enlistment plummeted, the Act made military service mandatory, creating military tribunals for Conscientious Objectors.',
      [
        'The Conscription Declaration',
        'The Defence of the Realm Act',
        'The National Draft Mandate',
      ],
      'gwp2_l7_15',
    ),
    q(
      'What proportion of the four million non-white participants mobilized by the British Empire were Indian combatants and labourers?',
      'Approximately 1.3 million men',
      'The Indian Army formed the vast majority of non-white imperial forces, fighting in the trenches of France, the desert of Mesopotamia, and Gallipoli.',
      ['Barely 50,000 men', 'Over 3.5 million men', 'Exactly 100,000 men'],
      'gwp2_l7_16',
    ),
    q(
      'What right-wing German myth claimed the army was undefeated in the field and betrayed by domestic socialist politicians?',
      'The "Dolchstoßlegende" (stab-in-the-back myth)',
      'Promoted by German military elites, the myth falsely asserted that the front line was betrayed by the home front and the Weimar Republic, fueling future Nazi propaganda.',
      ['The Schlieffen Legend', 'The Iron Wall Myth', 'The Bismarck Doctrine'],
      'gwp2_l7_17',
    ),
    q(
      'Under the 1918 Representation of the People Act, which group of British women gained the right to vote for the first time?',
      'Women aged 30 and over who met property qualifications',
      'The 1918 Act was a historic breakthrough, but deliberately excluded younger, working-class women under 30 who had worked in munitions and factories.',
      [
        'All women aged 18 and over on equal terms with men',
        'Only women whose husbands had died in the war',
        'Only female doctors and nurses who served in France',
      ],
      'gwp2_l7_18',
    ),
    q(
      'What term describes the unprecedented industrial mobilization of entire societies, economies, and civilian populations for warfare?',
      'Total War',
      'In a "Total War", the boundary between civilian and soldier blurs; factories, agriculture, schools, and homes become direct instruments of military strategy.',
      ['Limited War', 'Guerrilla Warfare', 'Imperial Crusade'],
      'gwp2_l7_19',
    ),
    q(
      'According to modern military historians, what was the primary cause of the tactical stalemate on the Western Front between 1914 and 1917?',
      'Defensive firepower (machine guns, barbed wire, and artillery) vastly outpaced attacking mobility and communication technology',
      'Generals could not coordinate attacks because artillery severed telephone lines and radios were primitive, while defenders could quickly reinforce threatened points by rail.',
      [
        'Soldiers on both sides agreed to a secret ceasefire during winter months',
        'Neither side possessed any ammunition or rifles after 1914',
        'Generals refused to leave London and Paris to visit the front lines',
      ],
      'gwp2_l7_20',
    ),
  ],
};

async function run() {
  const dataJsPath = path.join(__dirname, '..', 'units', 'great_war_part2', 'data.js');

  // 1. Create timestamped backup
  const backupDir = path.join(__dirname, '..', 'temp_backups');
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(backupDir, `great_war_part2_data_backup_${timestamp}.js`);
  fs.copyFileSync(dataJsPath, backupPath);
  console.log(`📦 Created backup at: ${backupPath}`);

  // 2. Import unitData
  const mod = await import(require('url').pathToFileURL(dataJsPath).href);
  const unitData = mod.default || mod.unitData;

  console.log('Injecting 20-question 4-act calibrated quizzes into great_war_part2...');

  unitData.lessons.forEach((l, idx) => {
    if (GREAT_WAR_PART2_EXPANDED_QUIZZES[l.id]) {
      const quiz = GREAT_WAR_PART2_EXPANDED_QUIZZES[l.id];
      if (quiz.length !== 20) {
        throw new Error(`Quiz for ${l.id} has ${quiz.length} questions instead of 20!`);
      }
      l.quiz = quiz;
      console.log(`✅ Lesson ${idx} (${l.id}) expanded: 20 questions (10 Core, 10 Mastery).`);
    } else {
      throw new Error(`Missing quiz for lesson ID: ${l.id}`);
    }
  });

  // Verify all lessons have 20 questions
  unitData.lessons.forEach((l, idx) => {
    if (!l.quiz || l.quiz.length !== 20) {
      throw new Error(
        `Lesson ${idx} (${l.id}) does not have exactly 20 questions! Count: ${l.quiz ? l.quiz.length : 0}`,
      );
    }
  });

  // 3. Write updated data.js
  const fileContent = `export const unitData = ${JSON.stringify(unitData, null, 2)};\nexport default unitData;\n`;
  fs.writeFileSync(dataJsPath, fileContent, 'utf8');
  console.log('Saved updated great_war_part2/data.js.');

  execSync(`node --check "${dataJsPath}"`, { stdio: 'inherit' });
  console.log('✅ Syntax check passed.');
}

run().catch((err) => {
  console.error('❌ Error updating great_war_part2 quizzes:', err);
  process.exit(1);
});
