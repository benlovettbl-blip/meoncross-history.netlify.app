const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const rootDir = path.resolve(__dirname, '..');
const dataJsPath = path.join(rootDir, 'units', 'great_war_part2', 'data.js');
const pubJsonPath = path.join(rootDir, 'public', 'data', 'great_war_part2.json');
const dbPath = path.join(rootDir, 'public', 'database.json');

const GREAT_WAR_PART2_PEDAGOGY = {
  // LESSON 1: Why were young men so desperate to join the slaughter of 1914?
  lesson_1_enlistment: [
    {
      match: /Kitchener Recruitment Poster|Your Country Needs You/i,
      hinge_question:
        'Why was the direct visual gaze and pointing finger of Lord Kitchener so psychologically effective in mobilizing volunteer recruits in 1914?',
      discussion_ideas: [
        "Direct Personal Accusation and Civic Obligation: Alfred Leete's design broke with Victorian group recruitment art by creating an intimate psychological summons: Kitchener's piercing eyes and pointing finger appear to follow the viewer from any angle, transforming a general national appeal into an inescapable, personal demand of masculine duty, honor, and patriotism that made young men feel like cowards if they walked away.",
        "Imperial Hero Status and Military Authority: Field Marshal Lord Kitchener was a revered Victorian imperial legend—the conqueror of Omdurman and veteran of Khartoum; seeing Britain’s most trusted military hero directly asking for their personal service gave the recruitment campaign supreme gravitas, persuading over 750,000 men to enlist in 'Kitchener's New Armies' in the first eight weeks of the war.",
      ],
    },
    {
      match: /Scrap of Paper/i,
      hinge_question:
        'How did the British government use Germany’s violation of Belgian neutrality to frame the war as a moral crusade rather than a cynical imperial conflict?',
      discussion_ideas: [
        "When German Chancellor Theobald von Bethmann-Hollweg dismissed the 1839 Treaty of London guaranteeing Belgian neutrality as just a 'scrap of paper' (ein Fetzen Papier), British propagandists seized upon the phrase to establish moral superiority. The Parliamentary Recruiting Committee printed facsimile posters showing the signatures and seals of European statesmen alongside Britain's historic guarantee. By framing Britain's entry into the war not as a calculated move to preserve naval dominance or defend the British Empire, but as an honorable defense of international law, the sanctity of treaties, and the rights of small nations against ruthless Prussian militarism ('Brave Little Belgium'), the poster successfully united liberals, trade unionists, and religious pacifists behind the war effort.",
      ],
    },
    {
      match: /Arthur Green/i,
      hinge_question:
        'What does Arthur Green’s diary reveal about the mixture of patriotic excitement and fear that drove working-class men to enlist in August 1914?',
      discussion_ideas: [
        'Escape from Monotonous Industrial Labor and Promise of Adventure: Green’s diary captures the intoxicating, carnival atmosphere in industrial Portsmouth, where thousands of young dockers and apprentices rushed to recruiting offices; enlisting offered an exciting escape from low wages, factory grime, and social monotony, promising travel abroad, good food, comradeship, and heroic glory in what everyone believed would be a short war over by Christmas.',
        'Intense Social Coercion and Fear of Public Humiliation: Alongside patriotic idealism, Green documents the immense social pressure applied by peers, employers, and young women handing out white feathers; young men were terrified of being branded shirkers, realizing that remaining a civilian in town while friends marched off in uniform meant permanent social ostracism and shame.',
      ],
    },
    {
      match: /George Morgan/i,
      hinge_question:
        "Why did the formation of 'Pals Battalions' encourage whole communities to enlist together, and why did this prove catastrophic later?",
      discussion_ideas: [
        "Conceived by Lord Derby, 'Pals Battalions' promised that friends, workmates, sports teams, and neighbors from the same town could enlist, train, and fight together in the same regiment (such as the Accrington Pals or Leeds Pals). This created extraordinary camaraderie and peer solidarity that drove hundreds of thousands of working-class men into the ranks. However, this localized structure proved catastrophic on the Western Front: on 1 July 1916, the first day of the Battle of the Somme, whole battalions were wiped out by machine-gun fire in minutes. Because men from the same street served together, the devastating casualties shattered entire villages and industrial towns simultaneously, leaving communities with virtually every young man of a generation dead or wounded on a single morning.",
      ],
    },
    {
      match: /Women of Britain Say GO!/i,
      hinge_question:
        "How did recruitment posters weaponize women's domestic affection and emotional guilt to force reluctant men to the front lines?",
      discussion_ideas: [
        "Manipulating Emotional Guilt and Domestic Masculinity: E.J. Kealey’s poster depicts two women and a child gazing out of an open cottage window at marching troops, with the bold caption 'Women of Britain say GO!'. By presenting wives and mothers as actively encouraging their husbands and sons to enlist, the poster systematically dismantled men’s private domestic excuses, asserting that true masculine love required leaving home to defend the hearth from German barbarism.",
        'Social Shaming of Civilian Men: The poster inverted traditional maternal protection by turning women into the state’s moral enforcers; if a man’s own family urged him to fight, any man who remained at home was visually exposed as a selfish coward failing both his nation and his womenfolk.',
      ],
    },
  ],

  // LESSON 2: Did British generals make the horror of trench warfare worse?
  lesson_2_trenches_haig: [
    {
      match: /Aerial Reconnaissance of Trenches|Ypres \(1915\)/i,
      hinge_question:
        'How does aerial photography explain why the Western Front devolved into an impenetrable defensive stalemate?',
      discussion_ideas: [
        "Aerial photography from the Royal Flying Corps reveals that the Western Front was not a simple ditch, but a deeply layered, industrialized defensive fortress system stretching hundreds of miles. The photograph shows interlocking, zig-zagging trenches designed to prevent enemy enfilade fire, fronted by vast belts of coiled barbed wire up to thirty feet deep, and covered by mutually supporting machine-gun redoubts and pre-sighted heavy artillery batteries. Because military defense technology (machine guns firing 600 rounds per minute and quick-firing shrapnel artillery) was decades ahead of offensive transport (infantry walking with 60 lb packs across shell-cratered mud), any frontal assault across No Man's Land was tactical suicide, freezing the conflict into an immovable war of attrition.",
      ],
    },
    {
      match: /Three-Tier Trench Network|Traverses/i,
      hinge_question:
        'Why were trenches constructed with angular zig-zags (traverses) rather than straight lines?',
      discussion_ideas: [
        "Trenches were strictly engineered with sharp 90-degree right angles and firebays (traverses) to neutralize the catastrophic effects of artillery and infantry infiltration. If a trench had been dug in a straight line, an enemy artillery shell landing inside would send deadly shrapnel flying hundreds of yards down the entire length, wiping out an entire platoon in seconds; furthermore, an enemy soldier with a machine gun could 'enfilade' (shoot straight down) the entire trench line. Traverses confined the lethal blast radius of high-explosive shells to a single small bay and forced attacking raiders to clear trenches corner by corner in close-quarters combat with bayonets and grenades.",
      ],
    },
    {
      match: /Trench Foot/i,
      hinge_question:
        'What does trench foot reveal about the daily environmental suffering of soldiers even when no battles were taking place?',
      discussion_ideas: [
        'The Agony of Relentless Cold, Wet, and Tissue Necrosis: Trench foot was an agonizing medical condition caused by prolonged immersion in cold water and mud below 16°C without drying; blood vessels constricted, cutting off circulation and oxygen to the extremities, leading to severe numbness, blisters, fungal rot, and eventually gangrene, requiring surgical amputation of toes or whole feet without an enemy bullet being fired.',
        "Military Failure and Command Preventative Discipline: In the first winter of the war, over 20,000 British soldiers contracted trench foot, severely depleting frontline fighting strength; once the high command recognized it was preventable, strict disciplinary orders mandated whale oil rubbing, daily sock changes, and duckboards in trenches, making officer inspections of soldiers' bare feet a daily military routine.",
      ],
    },
    {
      match: /Cheshire Regiment/i,
      hinge_question:
        'How does the calm, youthful appearance of these Cheshire soldiers contrast with the horrific reality they faced hours later on 1 July 1916?',
      discussion_ideas: [
        "Poignant Innocence on the Eve of Catastrophe: The photograph captures young British soldiers smiling, smoking, and resting against the chalk trench wall hours before going 'over the top'; convinced by General Haig's promise that a week-long artillery bombardment of 1.5 million shells had pulverized German barbed wire and killed all defenders, the troops were told they could walk casually across No Man's Land to occupy abandoned German lines.",
        'The Tragic Reality of Machine-Gun Slaughter: Within minutes of the whistles blowing at 7:30 am on 1 July 1916, deep German concrete dugouts proved undamaged by the bombardment; German machine gunners rushed to their parapets and cut down advancing British battalions in swathes, resulting in 57,470 British casualties on that single day—the bloodiest day in British military history.',
      ],
    },
    {
      match: /Douglas Haig/i,
      hinge_question:
        "Does Sir Douglas Haig deserve his historical reputation as the 'Butcher of the Somme', or was he an innovative commander facing an unprecedented industrial war?",
      discussion_ideas: [
        "The Inflexible 'Butcher' Blind to Human Slaughter: Critics argue Haig was an obstinate, cavalry-trained commander detached in his chateau headquarters miles from the front line, who stubbornly repeated failed frontal assaults across muddy quagmires (the Somme in 1916 and Passchendaele in 1917), callous to the loss of hundreds of thousands of lives in futile wars of attrition.",
        "The Master of Industrial War and Victor of 1918: Modern military historians argue Haig faced an unprecedented technological crisis with no easy tactical solutions; he learned painful lessons, pioneered all-arms coordination (integrating tanks, creeping artillery barrages, aerial spotters, and infantry platoons), and led the British Army through the victorious 'Hundred Days Offensive' of 1918, which broke the German Hindenburg Line and forced imperial Germany to surrender.",
      ],
    },
  ],

  // LESSON 3: How much of a 'World' War was it, and why were the Empire's troops forgotten?
  lesson_3_empire_troops: [
    {
      match: /Empire Needs Men/i,
      hinge_question:
        'How does the symbolism of the British lion and its cubs illustrate Britain’s imperial relationship with its dominions and colonies?',
      discussion_ideas: [
        "A Paternalistic Allegory of Imperial Unity: The poster depicts an adult British lion standing proudly atop a hill, calling out to four younger lions representing the self-governing White Dominions (Canada, Australia, New Zealand, and South Africa); it visualizes the British Empire as a noble, devoted family bound by blood, language, and loyalty to the Crown, willing to rally to the mother country's defense in her hour of need.",
        'The Blatant Erasure of Non-White Colonial Soldiers: While celebrating the White Dominions, the poster completely excludes India, Africa, and the Caribbean; yet India alone mobilized over 1.4 million soldiers and laborers—more than Australia, Canada, and New Zealand combined—exposing the racist imperial hierarchy that erased non-white subjects from the visual narrative of empire while relying heavily on their blood on the battlefield.',
      ],
    },
    {
      match: /Khudadad Khan/i,
      hinge_question:
        'Why was the awarding of the Victoria Cross to Sepoy Khudadad Khan in 1914 a historic turning point in imperial military history?',
      discussion_ideas: [
        'In October 1914 at Hollebeke during the First Battle of Ypres, Sepoy Khudadad Khan of the 129th Baluchis was operating a Vickers machine-gun team holding back an overwhelming German advance. Even after his officer was killed and the other gun team was overrun, the severely wounded Khan continued firing his machine gun alone until all his comrades were dead and he was left for dead, crawling back to British lines under cover of night. His actions prevented a German breakthrough to the Channel ports. Khan became the first Indian soldier in history to receive the Victoria Cross—the highest award for gallantry, which had been barred to non-white colonial troops until King George V reversed the ban in 1911. His award shattered racist colonial myths of Indian cowardice and proved that Indian troops were vital saviors of the British Expeditionary Force in the opening months of the war.',
      ],
    },
    {
      match: /Memorial Plaque|Dead Man’s Penny/i,
      hinge_question:
        'Why was the Gallipoli campaign of 1915 so pivotal in forging a distinct Australian and New Zealand national identity separate from Britain?',
      discussion_ideas: [
        "The Birth of Independent National Nationhood Through Shared Blood: Before 1915, Australians and New Zealanders viewed themselves primarily as loyal British colonial subjects; the heroism, mateship, and resilience of the ANZACs clambering up the cliffs of Gallipoli under devastating Turkish fire created the enduring 'ANZAC Legend', uniting disparate Australian states in a shared national founding myth.",
        'Bitter Disillusionment with British Military Incompetence: Gallipoli was a catastrophic strategic disaster masterminded by Winston Churchill and bungled by British high commanders, who landed troops on the wrong beaches and sent ANZAC soldiers into suicidal frontal assaults against Turkish trenches (such as at the Nek); the horrific slaughter planted deep cynicism toward British aristocratic generalship and accelerated Dominion demands for political autonomy.',
      ],
    },
    {
      match: /Chinese Labour Corps/i,
      hinge_question:
        'Why was the non-combat contribution of the 140,000 men of the Chinese Labour Corps essential to the Allied victory on the Western Front?',
      discussion_ideas: [
        'The Chinese Labour Corps (CLC) was the essential industrial backbone of the British Expeditionary Force. Operating under military discipline in segregated camps, over 140,000 Chinese recruits loaded and unloaded ammunition ships at Channel ports, laid hundreds of miles of military railways, assembled artillery shells, repaired tanks, and dug frontline trenches. In an industrial war decided by logistical supply lines, their relentless physical labor freed hundreds of thousands of British and French men from dockyards and railheads to serve as combat riflemen at the front. Even after the 1918 Armistice, Chinese laborers performed the horrifying duty of clearing live battlefields, defusing unexploded ordnance, and exhuming decomposing soldiers for war graves, suffering an estimated 20,000 deaths that were virtually erased from European public remembrance for decades.',
      ],
    },
    {
      match: /British West Indies Regiment/i,
      hinge_question:
        'How did the racist policies of the British War Office limit the roles of the British West Indies Regiment, and how did this fuel post-war Caribbean independence movements?',
      discussion_ideas: [
        'Racial Segregation and Denial of Combat Glory: Over 15,000 Caribbean men volunteered out of fierce loyalty to King George V, only to face institutional racism: the War Office refused to let Black soldiers fight with rifles against white Europeans on the Western Front, fearing it would undermine white prestige in the colonies. Instead, the BWIR were relegated to dangerous, humiliating manual labor—carrying heavy artillery shells under German fire and digging latrines—while being denied equal pay, uniforms, and promotion.',
        "The Spark for Anti-Colonial Revolution: Disgusted by maltreatment, BWIR soldiers mutinied at Taranto, Italy in December 1918, forming the 'Caribbean League' to demand freedom; returning home to Jamaica, Trinidad, and Barbados, decorated veterans used their military organizing skills to launch general strikes and lead trade unions that evolved directly into the modern Caribbean independence and civil rights movements.",
      ],
    },
  ],

  // LESSON 4: How did a war fought miles away completely control daily life in Britain?
  lesson_4_home_front_dora: [
    {
      match: /DORA|Defence of the Realm Regulations/i,
      hinge_question:
        'How did the Defence of the Realm Act (DORA) mark an unprecedented expansion of state control over the private lives of British citizens?',
      discussion_ideas: [
        'Total Censorship and Suppression of Free Speech: Passed in August 1914, DORA granted the government sweeping authoritarian powers: postal censors opened private letters, anti-war newspapers were banned, public speech criticizing the war or army was criminalized, and citizens were forbidden from flying kites, lighting bonfires, or buying binoculars, erasing centuries of British civil liberties in the name of national security.',
        "State Regulation of Social Habits and Alcohol: DORA reached directly into the daily routines of ordinary civilians: British pub opening hours were restricted, beer was watered down, 'buying rounds' was made illegal to prevent drunkenness among munitions workers, and British Summer Time (daylight saving) was invented to maximize factory working hours.",
      ],
    },
    {
      match: /Lloyd George, Minister of Munitions/i,
      hinge_question:
        "How did the 'Shell Scandal' of 1915 lead to the creation of the Ministry of Munitions, and how did this revolutionize the British economy?",
      discussion_ideas: [
        "In May 1915, The Times published explosive reports from the Western Front revealing that British troops were being slaughtered at Neuve Chapelle because they had run out of artillery shells, while German guns fired ten shells for every British one. The resulting 'Shell Scandal' collapsed the Liberal government and forced the creation of the Ministry of Munitions under dynamic politician David Lloyd George. Lloyd George ruthlessly broke with laissez-faire capitalism: he nationalized armaments factories, set prices, controlled wages, commandeered raw materials, and built massive state-owned 'National Shell Filling Factories' employing hundreds of thousands of women. By mobilizing the entire industrial power of the nation under state direction, Lloyd George increased British artillery shell production from 500,000 rounds in 1914 to over 50 million in 1917, turning Britain into an unstoppable industrial war machine.",
      ],
    },
    {
      match: /Richmond Castle|Conscientious Objectors/i,
      hinge_question:
        'Why did the British state treat Absolutist Conscientious Objectors with such harsh brutality during the First World War?',
      discussion_ideas: [
        "Moral Panic Over Cowardice and Military Discipline: When conscription was introduced in 1916, 'Absolutist' conscientious objectors (like the Richmond Sixteen) refused not only combat, but any non-combat war work (like driving ambulances), believing any cooperation helped the war machine; the government and public branded them traitors and cowards, fearing that leniency would cause widespread military desertion and collapse troop morale.",
        "Cruel Psychological Torment and Near-Execution: The Richmond Sixteen were imprisoned in damp castle cells, starved, and secretly transported to France, where they were sentenced to death by military tribunal for refusing orders on active service; although their sentences were commuted to ten years' hard labor at the last second, they spent years doing hard labor in quarry prisons like Dartmoor, ostracized by society long after 1918.",
      ],
    },
    {
      match: /Munitionettes/i,
      hinge_question:
        "How did the hazardous work of female munitions workers ('Canary Girls') shatter traditional Victorian gender roles?",
      discussion_ideas: [
        "Deadly Physical Hazards and Bodily Sacrifice: Over 700,000 women worked in munitions factories handling toxic cordite and TNT without protective gear; prolonged exposure turned their skin, hair, and eyes bright yellow (earning them the nickname 'Canary Girls'), while causing liver damage, infertility, and catastrophic accidental factory explosions (such as the 1917 Silvertown disaster that killed 73 people), proving women risked their lives for the war effort just as men did.",
        'Shattering Patriarchal Domesticity and Winning the Vote: Women operated heavy lathes, drove cranes, and managed shifts previously reserved for men, earning their own independent wages and socializing freely outside the domestic sphere; their indispensable contribution made it impossible for politicians to deny them citizenship, directly forcing Parliament to pass the 1918 Representation of the People Act, granting women over thirty the right to vote.',
      ],
    },
    {
      match: /Ration Book/i,
      hinge_question:
        'Why did the British government introduce compulsory food rationing in 1918, and how did it maintain social fairness on the home front?',
      discussion_ideas: [
        "By early 1918, Germany's campaign of unrestricted submarine warfare was sinking hundreds of thousands of tons of Allied merchant shipping, leaving Britain with only a six-week supply of wheat and food. Food shortages caused skyrocketing prices, hoarding, and long queues outside grocery shops, threatening working-class strikes and social unrest. To prevent revolution and maintain national morale, the Ministry of Food introduced compulsory rationing for meat, butter, sugar, and margarine using standardized coupon books. Rationing established strict social equality: a wealthy aristocrat received the exact same four-ounce butter and meat ration as an impoverished factory worker, preventing the rich from buying up supplies and ensuring that working-class children received fair nutrition to survive until victory.",
      ],
    },
  ],

  // LESSON 5: Did the Treaty of Versailles solve the problems of 1914, or create the nightmares of 1939?
  lesson_5_versailles: [
    {
      match: /Armistice Railway Carriage|Compiègne/i,
      hinge_question:
        'Why did the German military leadership insist that civilian politicians, rather than generals, sign the 1918 Armistice in the Compiègne railway carriage?',
      discussion_ideas: [
        "In November 1918, German generals Erich Ludendorff and Paul von Hindenburg realized that the German army was collapsing, the home front was in revolution, and military defeat was inevitable. However, instead of surrendering themselves, the military high command pressured the newly appointed civilian democratic government (led by Matthias Erzberger) to travel to Marshal Foch's railway carriage at Compiègne to sign the humiliating armistice. This cynical maneuver allowed the German army to manufacture the toxic 'Stab in the Back' myth (Dolchstoßlegende): claiming the army was 'undefeated in the field' and had been betrayed by unpatriotic socialist politicians and Jews at home ('the November Criminals'), poisoning the Weimar Republic's legitimacy from its very first day.",
      ],
    },
    {
      match: /Big Three/i,
      hinge_question:
        'How did the contrasting national motives of Clemenceau, Lloyd George, and Wilson make a lasting, balanced peace settlement impossible?',
      discussion_ideas: [
        "Clemenceau’s Demand for Vengeance and National Security: Having witnessed France invaded twice by Germany in 1870 and 1914, French Premier Georges Clemenceau ('The Tiger') was determined to permanently crush Germany militarily and economically: demanding the return of Alsace-Lorraine, the demilitarization of the Rhineland, and astronomical reparations to ensure Germany could never threaten France again.",
        "Wilson’s Utopian Idealism vs. Lloyd George’s Pragmatism: US President Woodrow Wilson arrived with his idealistic 'Fourteen Points', advocating national self-determination and the League of Nations to build a peaceful world order; British Prime Minister David Lloyd George stood caught in the middle: under intense public pressure to 'make Germany pay' for British dead, while secretly fearing that destroying Germany economically would destroy British trade and leave Europe vulnerable to Russian Bolshevism.",
      ],
    },
    {
      match: /Hall of Mirrors/i,
      hinge_question:
        "Why was the Hall of Mirrors at Versailles chosen as the setting for the signing of the peace treaty, and why did Germans view it as a dictated peace ('Diktat')?",
      discussion_ideas: [
        "The choice of the Hall of Mirrors at Versailles was an act of calculated French psychological vengeance: it was the exact room where Bismarck had proclaimed the German Empire in 1871 after humiliating France. In 1919, the roles were reversed. German delegates were completely excluded from the negotiations, forced to wait in a hotel like criminals, and given only three weeks to submit written objections—all of which were rejected. Under threat of Allied military invasion and the continuation of the naval starvation blockade that had killed 750,000 German civilians, delegates Hermann Müller and Johannes Bell were forced to sign the treaty. Denied any right to speak or negotiate, Germans across all political parties condemned Versailles as an illegitimate, dishonorable 'Diktat' (dictated peace).",
      ],
    },
    {
      match: /Will Dyson|Cannon Fodder/i,
      hinge_question:
        'Why is Will Dyson’s 1919 cartoon considered one of the most astonishingly prophetic pieces of political art in world history?',
      discussion_ideas: [
        "Published in the Daily Herald in May 1919, Will Dyson's cartoon 'Peace and Future Cannon Fodder' predicted the exact year of the outbreak of the Second World War with terrifying accuracy. The cartoon depicts the 'Big Four' statesmen leaving the Palace of Versailles, while French Premier Clemenceau glances back and says: 'Curious! I seem to hear a child weeping!' Hidden behind a pillar weeps a naked, defenseless toddler labeled '1940 Class' (the generation of children born in 1919 who would reach military fighting age twenty-one years later). Dyson’s genius was recognizing that the vindictive, economically crushing terms imposed by Versailles did not bring genuine peace, but guaranteed that the innocent children of 1919 would be sacrificed as 'cannon fodder' in another global slaughter in 1939–1940.",
      ],
    },
    {
      match: /Simplicissimus/i,
      hinge_question:
        "How does the Simplicissimus cartoon reflect the deep German sense of betrayal regarding the 'War Guilt' clause (Article 231) and reparations?",
      discussion_ideas: [
        'The Brutal Image of Judicial Murder and Extortion: Published in the Munich satirical magazine Simplicissimus, the cartoon depicts a bound, condemned man representing Germany on a guillotine scaffold, with French Premier Clemenceau holding the release cord while British and American leaders look on; it reflects the universal German conviction that the Allies were not administering justice, but executing cold-blooded economic and national murder.',
        'Fierce Rejection of Sole War Guilt: The cartoon captures German fury at Article 231, which forced Germany to accept sole moral responsibility for causing the war; ordinary Germans believed the conflict had been triggered by complex multi-nation alliances and Russian mobilization, viewing the War Guilt clause as a cynical Allied legal trick invented solely to justify astronomical financial reparations that impoverished German workers.',
      ],
    },
  ],
};

async function main() {
  console.log('🚀 Starting The Great War (1914–1919) Part 2 Enrichment...');

  // Load from data.js
  const fileUrl = pathToFileURL(dataJsPath).href;
  const dataModule = await import(fileUrl);
  const unitData = dataModule.default || dataModule.unitData;

  let totalSourcesUpdated = 0;
  let totalNarrativeUpdated = 0;

  unitData.lessons.forEach((l) => {
    const rules = GREAT_WAR_PART2_PEDAGOGY[l.id];
    if (!rules) return;

    console.log(`\nWiring ${l.id} (${l.title})...`);

    function matchRule(s) {
      const textToMatch = [s.title, s.id, s.caption, s.source_context].filter(Boolean).join(' ');
      return rules.find((r) => r.match.test(textToMatch));
    }

    // 1. Update l.sources if present
    (l.sources || []).forEach((s, idx) => {
      const rule = matchRule(s);
      if (rule) {
        s.hinge_question = rule.hinge_question;
        s.discussion_ideas = rule.discussion_ideas;
        totalSourcesUpdated++;
        console.log(
          `  ✅ [l.sources ${idx}] "${s.title}" -> ${rule.discussion_ideas.length} idea(s)`,
        );
      } else {
        console.warn(`  ⚠️ [l.sources ${idx}] No match for: "${s.title}"`);
      }
    });

    // 2. Update narrative_blocks
    (l.narrative_blocks || []).forEach((b, idx) => {
      if (b.source) {
        const rule = matchRule(b.source);
        if (rule) {
          b.source.hinge_question = rule.hinge_question;
          b.source.discussion_ideas = rule.discussion_ideas;
          totalNarrativeUpdated++;
          console.log(
            `  ✅ [narrative ${idx}] "${b.source.title}" -> ${rule.discussion_ideas.length} idea(s)`,
          );
        } else {
          console.warn(`  ⚠️ [narrative ${idx}] No match for: "${b.source.title}"`);
        }
      }
    });
  });

  console.log(
    `\n🎉 Total sources updated across The Great War Part 2: ${totalSourcesUpdated} in l.sources, ${totalNarrativeUpdated} in narrative_blocks`,
  );

  // 1. Write back to units/great_war_part2/data.js
  const serialized = JSON.stringify(unitData, null, 2);
  const jsContent = `const unitData = ${serialized};\nexport default unitData;\nexport { unitData };\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(dataJsPath, jsContent, 'utf8');
  console.log('✅ Successfully wrote units/great_war_part2/data.js');

  // 2. Write to public/data/great_war_part2.json
  const pubData = { id: 'great_war_part2', data: unitData };
  fs.writeFileSync(pubJsonPath, JSON.stringify(pubData, null, 2), 'utf8');
  console.log('✅ Successfully updated public/data/great_war_part2.json');

  // 3. Write to public/database.json
  if (fs.existsSync(dbPath)) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (db.great_war_part2) {
      db.great_war_part2.data = unitData;
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
      console.log('✅ Successfully updated great_war_part2 in public/database.json');
    }
  }

  console.log('\n🏁 Completed The Great War (1914–1919) Part 2 enrichment!');
}

main().catch((err) => {
  console.error('❌ Error executing enrich script:', err);
  process.exit(1);
});
