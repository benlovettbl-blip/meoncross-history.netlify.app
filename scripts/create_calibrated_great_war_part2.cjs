const fs = require('fs');
const path = require('path');

const enquiries = [
  // =========================================================================
  // ENQUIRY 01
  // =========================================================================
  {
    num: 1,
    title: '1914: The Outbreak, The Alliance Trap & The Pals’ Battalions',
    enquiry: 'Why were young men so desperate to volunteer for the slaughter of 1914?',
    versoSubtitle: 'The Geopolitical Trap & Kitchener’s Mass Appeal',
    rectoSubtitle: 'Civic Mobilisation, Social Shame & The Hampshire Experience',
    block1: {
      ref: '1.1',
      date: 'June – August 1914',
      title: 'The July Crisis, The Alliance Cascade & The Belgian Trigger',
      paras: [
        'On 28 June 1914, Archduke Franz Ferdinand, heir to the Austro-Hungarian throne, was assassinated in Sarajevo by Gavrilo Princip. What began as a localized Balkan crisis triggered a catastrophic chain reaction. Over decades, Europe had fractured into two rival armed camps: the **Triple Entente** (Britain, France, and Russia) and the **Triple Alliance** (Germany, Austria-Hungary, and Italy). Bound by mutual defence treaties, the powers stumbled into total war.',
        'Austria-Hungary declared war on Serbia, prompting Russia to mobilise in defence of its ally. Germany retaliated by declaring war on Russia and France, activating the **Schlieffen Plan**—a rigid timetable designed to bypass French frontier fortresses by sweeping through neutral Belgium to encircle Paris before pivoting east to confront the Russian military machine.',
        "The German invasion of neutral Belgium on 4 August 1914 was the decisive catalyst that brought the British Empire into the European conflict. Britain was bound by the 1839 **Treaty of London** to defend Belgian independence and neutrality. When imperial Germany dismissed the historic treaty as a mere 'scrap of paper' and crossed the border, Britain issued an ultimatum. At midnight on 4 August 1914, Britain declared war, entering the struggle with a tiny regular force—the **British Expeditionary Force (BEF)**—of 247,000 soldiers.",
      ],
    },
    block2: {
      ref: '1.2',
      date: 'August – September 1914',
      title: 'Kitchener’s New Armies & The Rush to the Colours',
      paras: [
        "Unlike continental rivals, Britain possessed no peacetime conscription laws to compel citizens into military service. Appointed Secretary of State for War, Field Marshal **Lord Kitchener** immediately shattered the popular public illusion that the conflict would be a short, glorious adventure 'over by Christmas'. Kitchener presciently warned Parliament that the war would last at least three years, demand immense industrial resources, and consume millions of soldiers.",
        "In late August 1914, Kitchener launched an unprecedented appeal for 500,000 volunteers, famously immortalised in Alfred Leete’s poster of Kitchener pointing directly at the viewer with the commanding slogan: *'Your Country Needs YOU'*. The public response was overwhelming. In the first eight weeks alone, more than 750,000 men rushed to the colours, completely swamping recruitment depots, town halls, and medical inspection centres across the kingdom.",
        "Historians have long debated the complex motivations driving this voluntary stampede. While romantic patriotism and moral outrage over Belgium played a role, modern scholars emphasize pragmatic realities. For working-class men, enlisting offered steady wages—the 'King’s shilling'—regular meals, warm uniforms, and an exhilarating escape from dreary factory routine. Men viewed the army as a noble, once-in-a-lifetime adventure.",
      ],
    },
    block3: {
      ref: '1.3',
      date: 'Autumn 1914',
      title: 'The Invention of Pals Battalions: Comrades in Arms',
      paras: [
        'To manage the colossal influx of recruits and harness local civic pride, General Henry Rawlinson proposed an ingenious recruitment concept: **Pals Battalions**. These specialized units allowed friends, work colleagues, sports teammates, and church congregation members to enlist, train, and fight together in the same military company, guaranteeing that men would never have to face the terrors of battle alongside strangers.',
        "Across commercial and industrial towns, the initiative sparked extraordinary competitive enthusiasm. In Portsmouth, civic leaders and dockyard managers raised the 14th and 15th (Portsmouth) Battalions of the Hampshire Regiment—the celebrated **'Pompey Pals'**. More than 1,000 men enrolled in Portsmouth within fourteen days, drawing 60% of recruits directly from naval engineering workshops to fight shoulder-to-shoulder.",
      ],
    },
    block4: {
      ref: '1.4',
      date: '1914 – 1915',
      title: 'Coercive Patriotism: White Feathers & Social Shaming',
      paras: [
        'Beneath the outward display of flag-waving enthusiasm lay an atmosphere of coercive social pressure. In August 1914, retired Admiral Charles Penrose Fitzgerald founded the **Order of the White Feather**, organizing young women to pin white feathers—the traditional badge of cowardice—onto the coats of civilian men who were not wearing military uniforms in public streets.',
        'This campaign weaponized social humiliation within tight-knit communities. Young men who hesitated to enlist were publicly shamed by neighbours, shopkeepers, and sweethearts. Simultaneously, official government recruitment posters ruthlessly exploited Victorian gender roles, domestic guilt, and filial duty to pressure reluctant men into uniform.',
        "Posters such as *'Women of Britain Say—GO!'* and the haunting psychological query *'Daddy, what did YOU do in the Great War?'* cast non-combatant men as moral cowards who had failed their families. Staying behind became socially intolerable, transforming enlistment from a purely voluntary personal choice into an unavoidable social compulsion for hundreds of thousands of eligible young Englishmen across the nation.",
      ],
    },
    block5: {
      ref: '1.5',
      date: 'Winter 1914 – 1915',
      title: 'The Hampshire Experience & The Fatal Geographic Trap',
      paras: [
        'Across the towns and agricultural villages of Hampshire, the call to arms reshaped everyday community life. In rural parishes like Stubbington and Titchfield, farm labourers and carpenters marched to Fareham drill halls to enlist alongside lifelong neighbours. Local Hampshire battalions trained together in the wet encampments of the New Forest and Salisbury Plain, forging bonds of fierce loyalty and regional pride.',
        'Yet this communal cohesion concealed a catastrophic structural vulnerability. Because Pals battalions drew men from specific streets, factories, and villages, any sudden battlefield disaster would fall disproportionately upon single communities. When these units were committed to major Western Front offensives, the sudden slaughter of a single afternoon would plunge entire English towns into simultaneous, inconsolable grief and generational trauma.',
      ],
    },
    coverDesc:
      'The July Crisis, the Schlieffen Plan violation of Belgian neutrality, Kitchener’s call for 500,000 volunteers, civic Pals Battalions, white feather peer pressure, and mass mobilization across Hampshire.',
  },

  // =========================================================================
  // ENQUIRY 02
  // =========================================================================
  {
    num: 2,
    title: 'Blood, Mud & Steel: Did British Generals Make Trench Warfare Worse?',
    enquiry:
      "Were British commanders like General Haig callous 'donkeys' or prisoners of industrial technology?",
    versoSubtitle: 'The Deadlock of Firepower, Trench Architecture & Daily Horror',
    rectoSubtitle: 'The Somme Catastrophe, High Command & The Historiography Debate',
    block1: {
      ref: '2.1',
      date: 'Autumn 1914 – 1915',
      title: 'The Deadlock of Firepower & Trench Architecture',
      paras: [
        "By November 1914, mobile warfare on the Western Front had ceased completely. Following the Battle of the Marne and the frantic 'Race to the Sea', opposing armies collided with a brutal reality: defensive industrial firepower was vastly superior to offensive infantry tactics. The rapid-firing **Maxim and Vickers machine guns**, capable of discharging 500 to 600 rounds per minute, combined with heavy rifled artillery, transformed open fields into impenetrable kill zones.",
        'Unable to advance and unwilling to retreat, millions of soldiers dug into the earth, establishing an unbroken, 400-mile labyrinth of trenches stretching from the Belgian coast to the neutral Swiss border. A standard trench system comprised three distinct defensive tiers: the front-line fire trench, the support line, and the reserve trench, interconnected by zig-zagging communication passages designed to localize explosive shell blasts.',
        'Separating the opposing trench networks lay **No Man’s Land**—a desolate expanse of pulverized mud, tangled thickets of barbed wire, and unburied corpses. Forward firebays were reinforced with sandbags and wooden revetments, while deep subterranean dugouts sheltered garrisons from incoming mortar fire. For the next four years, this fortified defensive deadlock defied conventional military theory, trapping millions in static siege warfare.',
      ],
    },
    block2: {
      ref: '2.2',
      date: '1915 – 1916',
      title: 'The Sensory Nightmare: Mud, Rats, Trench Foot & Shell Shock',
      paras: [
        'Daily life in the trenches was a relentless struggle against environmental misery and psychological terror. Poor natural drainage and constant rainfall transformed chalky soils into knee-deep, foul-smelling liquid mud that sucked boots from feet and drowned wounded soldiers. Prolonged standing in cold, contaminated water caused **Trench Foot**—a crippling fungal condition that restricted blood circulation, causing flesh to rot and turn gangrenous, often requiring amputation.',
        "Sanitary conditions were horrific. Billions of body lice inhabited the seams of woollen uniforms, causing persistent itching and spreading debilitating trench fever. Enormous brown rats, grown fat on corpses and discarded rations, swarmed dugouts and scurried across sleeping men. Sleep was sporadic, constantly interrupted by predawn 'stand-to' drills, periscope watch, and night-time wire repair patrols into No Man’s Land.",
        "Above all loomed the sensory torment of endless artillery shelling. High-explosive concussions shook the earth for days, driving men into mutism, uncontrollable shaking, and mental collapse—a psychological trauma officially diagnosed as **'shell shock'**. Over 300 British soldiers suffering acute psychological breakdowns were executed by firing squad for cowardice or desertion, revealing the uncompromising cruelty of military justice.",
      ],
    },
    block3: {
      ref: '2.3',
      date: '1915 – 1916',
      title: 'The Clashing Visions of High Command: Attrition & Artillery',
      paras: [
        "In December 1915, General Sir Douglas Haig assumed supreme command of the British Expeditionary Force. Haig was convinced that the war could only be won by smashing the German army on the Western Front through relentless **attrition**—grinding down enemy reserves until their front cracked under intolerable pressure. To Haig, human sacrifice was unavoidable in breaking the enemy's martial will.",
        "Confronting deeply entrenched German fortifications, British command placed absolute faith in massed artillery. Military dogma held that an overwhelming preliminary bombardment would pulverize enemy trenches, shred barbed wire, and slaughter defenders, allowing infantry to stroll across No Man's Land and occupy empty positions without serious opposition. Artillery was treated as the decisive weapon that would blast a path through steel and stone.",
      ],
    },
    block4: {
      ref: '2.4',
      date: '1 July 1916',
      title: '1 July 1916: The Catastrophe of the Somme',
      paras: [
        'At 7:30 am on 1 July 1916, following a continuous seven-day bombardment of 1.5 million artillery shells, 100,000 British infantrymen climbed their parapets across a fourteen-mile front along the River Somme. Encumbered by thirty kilograms of heavy equipment, soldiers were ordered to advance in rigid, shoulder-to-shoulder walking lines across open ground.',
        'The bombardment had failed catastrophically. Nearly one-third of the shells were low-grade duds that failed to detonate, while shrapnel shells proved utterly ineffective at cutting thick rolls of German barbed wire. Deep within fortified subterranean concrete bunkers thirty feet underground, German machine-gunners survived the barrage entirely unscathed.',
        'The moment the British shelling lifted, German defenders rushed to their parapets with Spandau machine guns. British waves walked straight into interlocking crossfires. By sunset, the British Army had suffered 57,470 casualties, including 19,240 dead—the bloodiest single day in British military history. Entire Pals battalions, including the Leeds and Accrington Pals, were virtually wiped out within minutes.',
      ],
    },
    block5: {
      ref: '2.5',
      date: '1916 – 1918 & Postwar',
      title: 'The Historiographical Verdict: Butchers or The Learning Curve?',
      paras: [
        "For decades, popular culture and historians condemned British generals as incompetent aristocrats. In 1961, Alan Clark popularized the scathing aphorism **'lions led by donkeys'**, portraying heroic frontline soldiers slaughtered by callous commanders dining safely in distant châteaux. Haig was denounced as the 'Butcher of the Somme' who stubbornly repeated frontal assaults long after their futility was proven.",
        "However, modern revisionist historians like John Terraine and Gary Sheffield argue that Haig navigated an unprecedented technological revolution with no existing tactical blueprint. They emphasize the BEF's remarkable **'learning curve'**—the innovative synthesis of tanks, creeping artillery barrages, aerial reconnaissance, and infantry infiltration tactics that shattered the German army during the decisive 1918 Hundred Days Offensive.",
      ],
    },
    coverDesc:
      'The transition from mobile war to defensive siege, Maxim machine gun fire, trench foot and shell shock, the 57,470 casualties on 1 July 1916, and the historiographical clash between Clark and Terraine.',
  },

  // =========================================================================
  // ENQUIRY 03
  // =========================================================================
  {
    num: 3,
    title: 'The Forgotten Global Empire: Troops of Colour on the Western Front',
    enquiry: 'Why were over four million colonial and dominion troops erased from popular memory?',
    versoSubtitle: 'The Imperial Mobilisation & Frontline Sacrifice in Flanders',
    rectoSubtitle: 'The British West Indies Regiment, Labour Fronts & Imperial Memory',
    block1: {
      ref: '3.1',
      date: '1914 – 1915',
      title: 'A Truly Global War: The Call to the British Empire',
      paras: [
        'In traditional British textbook narratives, the First World War is frequently presented as an exclusively European conflict fought by white armies in muddy trenches. In reality, Britain was an imperial superpower whose survival depended fundamentally on the vast wealth, strategic raw materials, and manpower of its global empire. More than four million non-white combatants and auxiliary workers were mobilised across the British Empire to fight for the Crown.',
        'From the plains of Punjab to the islands of the Caribbean, from Nigeria to Hong Kong, imperial subjects volunteered or were conscripted into the imperial war machine. The Indian Army alone contributed over 1.3 million soldiers and logistical labourers, while more than two million African men served as soldiers, porters, and stevedores in brutal campaigns across East, West, and North Africa.',
        'The British War Office initially resisted deploying non-white troops in European combat, fearing that imperial subjects witnessing white nations slaughtering each other would shatter the psychological myth of European racial supremacy. However, when the original professional BEF was decimated in the bloody clashes of autumn 1914, imperial racial prejudice was hastily superseded by urgent military necessity, bringing imperial soldiers to the Western Front.',
      ],
    },
    block2: {
      ref: '3.2',
      date: 'Autumn 1914 – 1915',
      title: 'The Indian Army in Flanders: Khudadad Khan at Ypres',
      paras: [
        'The arrival of the Indian Expeditionary Force in France in October 1914 was vital in halting the German advance during the desperate First Battle of Ypres. Clad in lightweight cotton uniforms ill-suited to the freezing Flanders mud, and using unfamiliar rifles, Indian regiments defended critical front-line sectors with extraordinary discipline and courage, stabilizing Allied defensive lines when collapse seemed imminent across the beleaguered Ypres salient.',
        'On 31 October 1914 at Hollebeke, **Sepoy Khudadad Khan** of the 129th Baluchis performed an act of legendary heroism. When his machine-gun section was overrun by swarming German infantry and all his comrades were killed, Khan continued firing his weapon alone despite serious wounds. He disabled his gun before crawling back through enemy lines, becoming the first South Asian recipient of the prestigious **Victoria Cross**.',
        'Indian soldiers fought with distinction across major engagements, including Neuve Chapelle and Festubert, suffering over 8,900 casualties in 1915 alone. Thousands of wounded Indian soldiers were treated in magnificent converted palaces, such as the Royal Pavilion in Brighton, though their treatment was carefully segregated by the War Office to prevent intimate social contact with white British nurses and civilians, reflecting pervasive imperial anxieties.',
      ],
    },
    block3: {
      ref: '3.3',
      date: '1915 – 1918',
      title: 'The British West Indies Regiment: Loyalty Under Racial Subjugation',
      paras: [
        'More than 15,600 volunteers from Jamaica, Trinidad, Barbados, and British Guiana enlisted in the **British West Indies Regiment (BWIR)**, eager to demonstrate imperial patriotism and advance the cause of self-government. However, institutional racism within the War Office barred Black soldiers from direct combat against white German troops on the Western Front, fearing it would subvert the colonial racial hierarchy.',
        'Instead, BWIR battalions in Europe were relegated to exhausting, hazardous heavy labour—transporting ammunition shells, digging trenches under artillery fire, and constructing military railways under constant bombardment. Only in the Middle Eastern theatre against Ottoman forces were BWIR soldiers permitted to enter direct combat, fighting with celebrated courage during the Jordan Valley offensive and the capture of Jerusalem.',
      ],
    },
    block4: {
      ref: '3.4',
      date: '1916 – 1919',
      title: 'Unsung Logistics: The Chinese Labour Corps & African Carriers',
      paras: [
        'Behind the front lines, the Allied war effort relied on immense international labour networks. Beginning in 1916, Britain and France recruited roughly 140,000 men into the **Chinese Labour Corps (CLC)**. These unarmed civilian volunteers performed the grueling, hazardous work essential to modern mechanized warfare: repairing damaged railways, handling munitions, and clearing toxic battlefield wreckage.',
        'In the East African campaign, over one million African porters—the **Carrier Corps**—hauled heavy artillery, ammunition boxes, and medical supplies through disease-ridden terrain where pack animals died instantly of tsetse fly fever. Over 100,000 African carriers perished from malaria, dysentery, and starvation, enduring mortality rates far higher than European infantry on the Western Front.',
        'Despite their indispensable contributions, non-white labourers were subjected to strict curfews, fenced internment camps, and harsh corporal punishment. Military authorities viewed these vital workers with patronizing suspicion, denying them equal status, standard pensions, or formal recognition on postwar national war memorials.',
      ],
    },
    block5: {
      ref: '3.5',
      date: '1918 & Postwar',
      title: 'The Taranto Mutiny & Decades of Historical Amnesia',
      paras: [
        'Long-simmering resentment erupted in December 1918 at the Italian transit port of Taranto. Following the Armistice, while white soldiers celebrated and prepared for home leave, BWIR battalions were ordered to clean filthy latrines for white soldiers and denied promised wage increases. Disillusioned soldiers mutinied for four days, demanding dignity, racial equality, and immediate repatriation.',
        'The mutiny catalyzed early Pan-Africanist and anti-colonial movements across the West Indies, inspiring future nationalist leaders. Yet in Britain, imperial contributions were systematically erased from public memory. Postwar commemorations centered exclusively on white European sacrifice, initiating decades of institutional amnesia that historians have only recently begun to dismantle.',
      ],
    },
    coverDesc:
      'The mobilisation of 4 million imperial troops, Sepoy Khudadad Khan VC at Ypres, the British West Indies Regiment, Chinese Labour Corps logistics, and the Taranto mutiny.',
  },

  // =========================================================================
  // ENQUIRY 04
  // =========================================================================
  {
    num: 4,
    title: 'The Total War Home Front: DORA, Canaries & The Subjugation of Civilian Life',
    enquiry: 'How did an overseas war fundamentally transform the British state and civilian life?',
    versoSubtitle: 'State Intervention, Total Mobilisation & Daily Liberty',
    rectoSubtitle: 'Female Munitionettes, Conscription & Conscientious Objection',
    block1: {
      ref: '4.1',
      date: 'August 1914',
      title: 'The Defence of the Realm Act (DORA) & The All-Powerful State',
      paras: [
        "Before August 1914, Britain was governed by classical liberal principles that championed individual freedom, free enterprise, and minimal state interference in private citizens' lives. This century-old tradition was completely overturned on 8 August 1914 when Parliament passed the **Defence of the Realm Act (DORA)** without formal debate. DORA granted the government sweeping executive authority to control civilian society and suppress internal dissent.",
        'Under DORA, the state seized control over everyday life. The government was empowered to requisition private factories, censor press reporting, and arrest suspected aliens without warrant. Daily civilian routines were strictly regulated: pub opening hours were slashed, buying drinks for friends was outlawed, and beer was heavily watered down to curtail industrial absenteeism across the nation.',
        'DORA criminalized seemingly harmless activities: flying kites, lighting outdoor bonfires, feeding bread to pigeons, and ringing church bells were outlawed on suspicion of signaling enemy zeppelins. In 1916, British Summer Time was established to maximize industrial productivity. DORA transformed Britain into a command state, proving that total industrial war demanded the complete subordination of civil liberties.',
      ],
    },
    block2: {
      ref: '4.2',
      date: '1915 – 1916',
      title: 'Feeding the Guns: The 1915 Shell Crisis & Industrial Mobilisation',
      paras: [
        "In May 1915, the political landscape was rocked by the **'Shell Crisis'**. The military correspondent of *The Times*, Colonel Charles Repington, published a scathing report exposing that catastrophic British infantry failures at Aubers Ridge were caused by a disastrous shortage of high-explosive artillery shells. The ensuing national scandal toppled Herbert Asquith’s Liberal government, forcing the creation of a coalition.",
        "The dynamic David Lloyd George was appointed to head the newly established **Ministry of Munitions**. Lloyd George seized control of domestic heavy industry, suspending trade union regulations, commandeering private factories, and constructing colossal state-owned 'National Projectile Factories'. Britain was transformed into an industrial arsenal, operating 24 hours a day to feed the insatiable appetite of Western Front artillery.",
        'Industrial output surged dramatically under energetic state direction. While British factories had produced only 500,000 artillery shells in 1914, production reached over 67 million shells annually by 1918. The Ministry mobilized vital raw materials, fixed wholesale prices, and introduced modern assembly-line manufacturing, fundamentally redefining the relationship between the state, private industry, and the civilian labour force across the British realm.',
      ],
    },
    block3: {
      ref: '4.3',
      date: '1915 – 1918',
      title: 'Canary Girls & Female Emancipation: TNT, Poison & The Vote',
      paras: [
        "With millions of men serving overseas, Britain's industrial survival depended on nearly one million women who entered munitions factories and engineering workshops. Workers who handled toxic chemical mixtures were nicknamed **'Canary Girls'** because exposure to trinitrotoluene (TNT) turned their skin, hands, and hair a bright, indelible yellow, while causing chronic toxic jaundice, respiratory distress, and long-term organ damage.",
        'Beyond chemical poisoning, female munitionettes faced constant peril from catastrophic accidental detonations, such as the 1917 Silvertown explosion in London that killed 73 people. Their indispensable contribution permanently shattered Victorian arguments that women were intellectually or physically incapable of public citizenship, directly accelerating the **1918 Representation of the People Act**, which granted voting rights to women over thirty.',
      ],
    },
    block4: {
      ref: '4.4',
      date: 'January 1916',
      title: 'The Military Service Act (1916): Conscription & The Tribunals',
      paras: [
        'By late 1915, the torrent of voluntary recruitment had slowed to a trickle, while the Western Front devoured thousands of soldiers weekly. Convinced that voluntary enlistment could no longer sustain the British war effort, Prime Minister Asquith introduced the **Military Service Act** in January 1916, enacting compulsory military conscription for the first time in modern British history.',
        'Initially targeting unmarried men aged 18 to 41, conscription was extended in May 1916 to include married men, and by 1918 the upper age limit was raised to 51. The government established over 2,000 local **Military Service Tribunals** across Britain to evaluate appeals for exemption on grounds of ill health, vital industrial employment, or extreme domestic hardship.',
        "Conscription severed Britain’s ancient constitutional traditions of voluntary military service. The state asserted ultimate ownership over its male citizens' bodies, dictating that individuals could be compulsorily torn from civilian families, marched into uniforms, and ordered into front-line trenches under threat of imprisonment, permanently redrawing the social contract between citizen and state.",
      ],
    },
    block5: {
      ref: '4.5',
      date: '1916 – 1919',
      title: 'Conscientious Objectors: Moral Conviction Behind Bars',
      paras: [
        "The 1916 Act contained an unprecedented 'conscience clause' granting exemption to men with sincere moral, political, or religious objections to taking human life. Approximately 16,000 men registered as **Conscientious Objectors ('COs')**. While 'alternativists' accepted non-combatant roles such as driving front-line ambulances or agricultural labour, roughly 1,500 'absolutists' refused all cooperation with the military state.",
        'Absolutists were subjected to vicious public hatred, labelled cowards, and sentenced to harsh hard labour in squalid penal institutions like Dartmoor and Richmond Castle. More than seventy absolutists died in prison from malnutrition, dampness, and brutal corporal punishment. Stripped of voting rights for five years postwar, their principled resistance represented the ultimate clash between state coercion and individual conscience.',
      ],
    },
    coverDesc:
      "The Defence of the Realm Act (DORA), the 1915 shell crisis, female munitionettes ('Canary Girls'), universal conscription in 1916, and the moral stand of conscientious objectors.",
  },

  // =========================================================================
  // ENQUIRY 05
  // =========================================================================
  {
    num: 5,
    title: 'The Armistice (1918), The Versailles Diktat (1919) & The Fragile Peace',
    enquiry:
      'Did the Treaty of Versailles resolve the problems of 1914 or cultivate the seeds of 1939?',
    versoSubtitle: 'The German Spring Offensive, Allied Counter-Stroke & Armistice',
    rectoSubtitle: 'The Paris Peace Conference, Article 231 & A Fractured Legacy',
    block1: {
      ref: '5.1',
      date: 'Spring – Autumn 1918',
      title: 'Operation Michael & The 1918 Hundred Days Offensive',
      paras: [
        'In March 1918, following the collapse of Tsarist Russia and the Treaty of Brest-Litovsk, Germany transferred fifty veteran divisions westward to launch an all-or-nothing offensive: **Operation Michael**. Deploying elite, agile **stormtroopers** armed with flamethrowers and light machine guns behind rolling hurricane artillery bombardments, the German army bypassed fortified strongpoints, shattered the Allied line, and surged forty miles toward Paris.',
        'Yet Germany’s tactical success masked fatal strategic exhaustion. The stormtroopers suffered 800,000 irreplaceable casualties among veteran shock units, while hungry, undersupplied troops paused to plunder captured British supply depots. Simultaneously, fresh American troops were arriving in France at an overwhelming rate of 250,000 men per month, tilting industrial and demographic balances permanently in favour of the Allied powers.',
        'In August 1918, Allied Commander-in-Chief Marshal Ferdinand Foch unleashed the **Hundred Days Offensive**. Integrating massed Mark V tanks, creeping artillery barrages, motorized infantry transport, and tactical air support, British, French, and American armies broke through the formidable German Hindenburg Line. Confronted with total military catastrophe, German High Command informed the Kaiser that the war was irrevocably lost on the battlefield.',
      ],
    },
    block2: {
      ref: '5.2',
      date: 'Autumn 1918',
      title: 'The Collapse of the Central Powers & The 11 November Armistice',
      paras: [
        'By October 1918, the German home front was disintegrating under the crushing pressure of the Royal Navy’s tight maritime blockade, which had starved German civilians of essential food and crippled heavy industry. When imperial naval admirals ordered a suicidal final sortie against the British Grand Fleet, sailors at Kiel mutinied, sparking a widespread socialist revolution that swiftly toppled regional monarchies across Germany.',
        'Kaiser Wilhelm II was forced to abdicate on 9 November 1918, fleeing across the border into Dutch exile as Germany was hastily declared a democratic republic. Two days later, in a railway carriage in the Compiègne Forest, German delegates met Marshal Foch and signed strict Armistice terms requiring immediate evacuation of all occupied territory and the immediate surrender of German heavy weaponry.',
        "At the eleventh hour of the eleventh day of the eleventh month—11:00 am on **11 November 1918**—the guns on the Western Front finally fell silent, ending four traumatic years of industrial carnage that claimed over twenty million lives. Yet German generals Erich Ludendorff and Paul von Hindenburg immediately propagated the insidious **'Stab-in-the-Back' myth** (*Dolchstoßlegende*), falsely claiming that an undefeated German army had been betrayed by domestic socialists, liberals, and Jews.",
      ],
    },
    block3: {
      ref: '5.3',
      date: 'January – June 1919',
      title: 'The Hall of Mirrors: The Big Three & Conflicting Agendas',
      paras: [
        "In January 1919, delegates from thirty-two victorious nations convened at the Palace of Versailles to formulate a lasting peace settlement. The conference was dominated by the **'Big Three'**: French Premier Georges Clemenceau, British Prime Minister David Lloyd George, and US President Woodrow Wilson, who arrived with profoundly divergent ideological aims and domestic political pressures.",
        "Clemenceau, whose country had endured catastrophic destruction and 1.4 million military deaths, demanded punitive terms that would permanently cripple Germany's industrial economy and dismember its armed forces to guarantee French security. Wilson advocated his idealistic **Fourteen Points**, urging national self-determination, disarmament, and a League of Nations, while Lloyd George sought a punitive balance that protected British imperial trade.",
      ],
    },
    block4: {
      ref: '5.4',
      date: 'June 1919',
      title: 'The Bitter Terms: Article 231, £6.6 Billion & Demilitarisation',
      paras: [
        'The resulting Treaty of Versailles, signed in the glittering Hall of Mirrors on 28 June 1919, imposed draconian conditions on the fledgling Weimar Republic. Germany was barred from negotiations and coerced into signing under threat of resumed military invasion and naval blockade, cementing its status as an imposed settlement.',
        "Most humiliating was **Article 231**—the notorious 'War Guilt Clause'—which forced Germany to accept sole moral responsibility for causing all loss and damage in the war. This clause provided legal justification for colossal financial reparations, fixed in 1921 at £6.6 billion, designed to compensate Allied civilian damages and cripple German economic recovery for generations.",
        'The military and territorial clauses were uncompromising. The German army was slashed to 100,000 volunteers, conscription was abolished, and tanks, military aircraft, and submarines were banned. Germany surrendered all overseas colonies, Alsace-Lorraine was returned to France, the Rhineland was demilitarized, and the creation of the Polish Corridor severed East Prussia from the German heartland.',
      ],
    },
    block5: {
      ref: '5.5',
      date: '1919 – 1920s & Legacy',
      title: 'The Diktat Trauma, The Keynes Critique & The Path to 1939',
      paras: [
        'German society universally condemned the settlement as a humiliating **Diktat** (an imposed dictate). British economist John Maynard Keynes resigned from the British delegation in disgust, publishing *The Economic Consequences of the Peace*, which presciently warned that economically crushing Germany would impoverish central Europe and spawn violent political extremism across the continent.',
        'Rather than inaugurating an era of lasting European peace, the Versailles settlement created an intensely unstable geopolitical climate. By humiliating and economically destabilizing a proud nation while leaving its industrial core largely intact, the victors sowed deep grievances and revanchist nationalism that Adolf Hitler and the Nazi Party would ruthlessly exploit, paving the direct path toward global catastrophe in 1939.',
      ],
    },
    coverDesc:
      'Operation Michael and the stormtrooper advance, the Allied Hundred Days, the 11 November Armistice, the Big Three in Paris, Article 231 War Guilt, and the debate over the Versailles peace.',
  },
];

const outPath = path.join(__dirname, 'great_war_part2_calibrated_enquiries.json');
fs.writeFileSync(outPath, JSON.stringify(enquiries, null, 2), 'utf8');
console.log(`Saved tuned calibrated enquiries to: ${outPath}`);
