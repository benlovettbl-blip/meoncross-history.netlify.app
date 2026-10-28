const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const rootDir = path.resolve(__dirname, '..');
const dataJsPath = path.join(rootDir, 'units', 'industrialisation_and_empire', 'data.js');
const pubJsonPath = path.join(rootDir, 'public', 'data', 'industrialisation_and_empire.json');
const dbPath = path.join(rootDir, 'public', 'database.json');

const INDUSTRIALISATION_PEDAGOGY = {
  // LESSON 1: What powered the Industrial Revolution, and how did a Fareham ironmaster change the world?
  lesson_1: [
    {
      match: /Coalbrookdale by Night/i,
      hinge_question:
        'Why did the shift from water power to coal-fired blast furnaces transform both Britain’s physical landscape and the daily autonomy of its workers?',
      discussion_ideas: [
        "Liberation from Geography and Nature's Clock: Early mills relied on fast-flowing streams in remote rural valleys, meaning production was restricted by seasonal droughts, river freezing, and water volume; coal-fired steam power untethered factories from river valleys, allowing industrialists to cluster heavy industry near coalfields and urban transport hubs, creating the dense, smoking skylines of the industrial Midlands and North.",
        "Destruction of Worker Autonomy and Natural Rhythms: Traditional cottage domestic workers had organized their own working days (often observing 'Saint Monday' for leisure); coal-powered steam engines run continuously day and night, forcing workers into regimented 12-to-14-hour factory shifts dictated by the relentless mechanical tempo of steam clocks rather than natural daylight and human endurance.",
      ],
    },
    {
      match: /Cort’s Reverberatory Puddling Furnace|Puddling Furnace/i,
      hinge_question:
        'How did separating coal fuel from refining metal in an arched air furnace solve the Royal Navy’s materials crisis?',
      discussion_ideas: [
        "During the 18th century, Britain faced an acute naval crisis: producing malleable wrought iron for warship anchor chains, cannon, and hull bolts required wood charcoal, but English forests were severely depleted, forcing the Royal Navy to import over two-thirds of its high-grade iron from Sweden and Russia at exorbitant cost and extreme geopolitical risk during wartime. Smelting iron directly with cheap English pit coal had previously failed because sulfur impurities in coal contaminated the molten iron, making it brittle ('cold-short'). At Funtley Ironworks in Hampshire, Henry Cort invented the reverberatory puddling furnace, which ingeniously separated the coal fuel from the pig iron hearth beneath a low curved brick arch: burning gases reflected pure radiant heat onto the molten pig iron without allowing sulfurous coal smoke to touch the metal. By manually stirring ('puddling') the decarburized molten iron and running it through grooved rollers, Cort increased production fifteen-fold and liberated Britain from foreign dependence, supplying the superior naval wrought iron that sustained the Royal Navy through the Napoleonic Wars.",
      ],
    },
    {
      match: /Admiralty Navy Board|Portsmouth Dockyard Trial/i,
      hinge_question:
        'How does this trial report demonstrate that the Industrial Revolution was driven as much by naval military necessity as commercial profit?',
      discussion_ideas: [
        "The Portsmouth Dockyard trial records prove that Britain's Industrial Revolution was fundamentally propelled by state naval procurement. Facing war against Bourbon France and Spain, the Admiralty could not risk imperial warship hulls splitting at sea due to sub-standard metallurgical components. By subjecting Cort's Hampshire puddled iron to rigorous mechanical stress tests—twisting iron bars cold, hammering them into severe right angles, and testing tensile load alongside Swedish 'Orground' iron—the Navy Board established imperial standardization. The state's massive naval contracts guaranteed immediate, large-scale demand for domestic industrial iron, demonstrating that military strategic survival and global naval dominance were the primary engines driving early metallurgical innovation.",
      ],
    },
    {
      match: /Dedication Portrait of Henry Cort|Henry Cort \(c\. 1780s\)/i,
      hinge_question:
        'Why would contemporaries compare an 18th-century Hampshire ironmaster to an ancient heroic metalworker, and what does this reveal about Britain’s growing industrial pride?',
      discussion_ideas: [
        'Elevating Mechanical Industry to Classical Heroism: In 18th-century culture, high status was reserved for classical scholars, landed aristocrats, and victorious naval admirals; comparing an ironmaster to Vulcan (the Roman god of metallurgy and fire) elevated practical mechanical ingenuity and engineering to the status of classical mythology, reflecting a cultural revolution that celebrated manufacturing geniuses as national saviors.',
        "Nationalist Commercial Pride and Imperial Autonomy: By freeing Britain from dependence on Baltic iron imports, Cort's breakthrough was celebrated as a patriotic triumph of British science and imperial self-sufficiency, embodying the Enlightenment belief that British commercial ingenuity and free trade were creating an invincible global empire.",
      ],
    },
    {
      match: /Patent Specification No\. 1420|Grooved Rollers|cort_rollers_patent/i,
      hinge_question:
        'Why was the invention of grooved rollers just as important as the puddling furnace in enabling Britain to mass-produce wrought iron for the Royal Navy?',
      discussion_ideas: [
        'A Fifteen-Fold Leap in Industrial Velocity: Cort\'s grooved rolling cylinders bypassed the ancient human bottleneck of blacksmithing: where teams of hammermen could only produce a single iron bar through hours of punishing manual labour, Cort\'s water-powered rollers spat out finished, uniform naval bars in minutes.',
        'Naval Self-Sufficiency and Imperial Security: By compressing the decarburized wrought iron blooms while expelling brittle slag, grooved rolling created ductile, high-tensile iron bolts and hoops that met the rigorous Admiralty standards tested at Portsmouth Dockyard, freeing Britain from reliance on Swedish and Russian iron on the eve of the Napoleonic Wars.',
      ],
    },
  ],

  // LESSON 2: Was industrial work progress or punishment?
  lesson_2: [
    {
      match: /Powerloom Weaving in 1835|Powerloom/i,
      hinge_question:
        'How does the physical danger of child labour in steam factories illustrate the human cost of industrial mechanization?',
      discussion_ideas: [
        "The image of small children crawling beneath moving, unshielded steam machinery illustrates the ruthless exploitation embedded in early factory capitalism. Mill owners deliberately hired young children as 'piecers' and 'scavengers' because their nimble fingers and small statures allowed them to crawl beneath working powerlooms to sweep up fly-waste and tie broken threads while the machines operated at full speed. Lacking any mandatory safety guards, children suffered horrific physical trauma: crushed fingers, scalping from flying belts, broken limbs, and fatal falls into spinning cogwheels. The relentless drive to maximize spinning efficiency and minimize downtime treated vulnerable child workers as cheap, replaceable mechanical components rather than human beings.",
      ],
    },
    {
      match: /Tyldesley Cotton Mill/i,
      hinge_question:
        'Why did factory owners choose monetary wage fines rather than dismissals to discipline industrial workers?',
      discussion_ideas: [
        'Direct Maximization of Profit and Labor Retention: Cotton spinning required practiced, synchronized labor operating complex machinery; firing experienced workers disrupted factory production and required costly retraining. Levying heavy fines (such as 1 shilling for opening a window or 2 shillings for being five minutes late) allowed masters to keep skilled workers at their machines while clawing back a substantial percentage of total wage payouts, directly inflating company profits.',
        'Psychological Imposition of Industrial Time-Discipline: Monetary fines served as a ruthless behavioral control mechanism designed to condition a former rural workforce into rigid industrial discipline. By penalizing natural human actions—talking, whistling, washing, looking out of a window, or arriving moments late—mill owners erased pre-industrial personal freedom and broke workers into total subservience to the mechanical rhythm of the factory steam clock.',
      ],
    },
    {
      match: /Sadler Committee Report/i,
      hinge_question:
        'Why did firsthand testimonies before the Sadler Committee shock the British public into demanding parliamentary factory legislation?',
      discussion_ideas: [
        "Exposure of Irreparable Physical Deformity and Abuse: Eyewitness testimonies from former child workers provided unvarnished, gruesome accounts of physical violence—overlookers beating exhausted children with leather straps ('strapping') to keep them awake through 16-hour shifts—and permanent orthopedic deformities, such as stunted growth and crooked spines ('knock-knees') caused by standing all day on hard factory floors.",
        'Moral Outrage and Shattering of Paternalist Illusions: The published report shattered the comforting myth promoted by factory owners that mills were benevolent institutions offering healthy employment and moral discipline to the poor; graphic evidence of moral decay, illiteracy, and early death among British children forced wealthy Victorian Christians and MPs to acknowledge that industrial wealth was being bought at the cost of national physical and moral degradation, leading directly to the 1833 Factory Act.',
      ],
    },
    {
      match: /Engraving of Factory Child Labour \(1840\)|Child Labour \(1840\)/i,
      hinge_question:
        'Why were visual depictions of child labour often more politically powerful in shifting public opinion than dry statistical reports?',
      discussion_ideas: [
        'While parliamentary statistical tables and blue books provided undeniable numerical evidence of industrial exploitation, they were read almost exclusively by educated politicians and civil servants. High-impact engravings and political prints, by contrast, communicated the visceral cruelty of the factory floor directly to the wider public: showing frail, barefoot young children in tattered clothes cowering beneath towering iron looms while brutish overlookers brandished heavy straps. These poignant visual images mobilized powerful middle-class Christian empathy, moral indignation, and philanthropic pressure, transforming economic debate into an urgent humanitarian crusade that factory owners could no longer dismiss as abstract political theory.',
      ],
    },
    {
      match: /Factory Act 1833|factory_act_1833/i,
      hinge_question:
        'Why was the creation of independent factory inspectors more important than merely passing laws restricting child labour?',
      discussion_ideas: [
        'The Collapse of Unregulated Laissez-Faire: Prior to 1833, British factory owners operated under absolute laissez-faire, treating child labour as a private contract between employer and parent with zero government interference; the 1833 Act established the revolutionary constitutional principle that the state possessed the duty to regulate capitalist industry and protect vulnerable human life.',
        'Enforcement via Independent Crown Inspectors: Previous child labour acts (such as the 1802 and 1819 Acts) were completely ignored because local magistrates were often mill owners themselves; by appointing four professional, salaried inspectors (such as Leonard Horner) with legal authority to enter mills unannounced, Parliament created real, enforceable state accountability.',
      ],
    },
  ],

  // LESSON 3: Did industrialisation make British towns unlivable?
  lesson_3: [
    {
      match: /Over London by Rail|Doré/i,
      hinge_question:
        'Does Doré portray the railway as a triumph of modern engineering or as an intrusive monster dominating the lives of the working poor?',
      discussion_ideas: [
        'An Intrusive, Claustrophobic Engine of Oppression: Doré depicts the elevated railway viaduct as a dark, mechanical monster slicing ruthlessly through the heart of working-class slums, casting deep shadows over squalid, back-to-back tenements; the identical, prison-like yards and soot-choked air emphasize how industrial technology boxed human beings into monotonous, dehumanizing confinement without light or dignity.',
        'The Unstoppable March of Industrial Progress: From the perspective of Victorian modernization, the elevated locomotive symbolizes engineering genius and unstoppable commercial connectivity, physically soaring above the decaying medieval filth of the old city and carrying the commerce, goods, and passengers that made London the undisputed financial and imperial capital of the world.',
      ],
    },
    {
      match: /A Court for King Cholera|King Cholera/i,
      hinge_question:
        'How did satirical magazines like Punch use dark visual humor to pressure politicians into taking public health reform seriously?',
      discussion_ideas: [
        "In 'A Court for King Cholera', John Leech utilized biting macabre satire to expose the lethal consequences of government negligence. By depicting Cholera not as an invisible disease, but as a crowned skeleton reigning supreme over a filthy, unpaved London slum courtyard filled with overflowing cesspools, open dung heaps, and ragged children playing in raw sewage, the cartoon visually personified lethal disease as an invading monarch invited in by municipal apathy. Published in Punch—the most influential weekly periodical among the affluent middle and political classes—the illustration punctured Victorian squeamishness and forced comfortable readers to confront the horrifying reality that their refusal to fund municipal sanitation and clean water was condemning thousands of innocent citizens to agonizing, preventable deaths.",
      ],
    },
    {
      match: /Edwin Chadwick|Sanitary Condition of the Labouring Population/i,
      hinge_question:
        'Why did Chadwick use a direct comparison to wartime casualties to shock Victorian MPs out of their laissez-faire complacency?',
      discussion_ideas: [
        'Visceral National Security and Patriotic Shock: Victorians took enormous pride in their military victories against Napoleon; by proving that preventable epidemic diseases (typhus, cholera, and dysentery) in industrial cities killed more British citizens every single year than the British Army lost in any battle during the entire Napoleonic Wars, Chadwick punctured patriotic complacency and framed urban sanitation as an urgent matter of national defense.',
        'Economic Calculation and Burden on the Poor Rate: As a utilitarian Benthamite, Chadwick knew that appeals to pure Christian charity often fell on deaf ears among tax-conscious MPs; he calculated the staggering financial cost of widowhood, orphanhood, and lost labor productivity caused by early deaths of breadwinners, arguing that investing public money in clean water and underground sewers was far cheaper than paying endless parish poor relief to destitute surviving families.',
      ],
    },
    {
      match: /Bazalgette|Interceptor Sewer/i,
      hinge_question:
        'How did the construction of underground interceptor sewers demonstrate a decisive shift from individual laissez-faire to collective state public health engineering?',
      discussion_ideas: [
        "Throughout the early nineteenth century, British municipal governance adhered strictly to laissez-faire philosophy: waste disposal was treated as an individual householder's private responsibility, resulting in over 200,000 leaking cesspools and raw sewage discharging directly into the Thames. The construction of Sir Joseph Bazalgette's 1,100-mile subterranean interceptor sewer network marked the birth of modern municipal socialism and civil public health engineering. Prompted by the unbearable stench of the 1858 'Great Stink' that threatened Parliament itself, the Metropolitan Board of Works spent over £4 million in public tax revenues to construct monumental brick tunnels that intercepted London's waste and diverted it twelve miles downstream before discharging into the tidal Thames. This massive civil engineering project proved that urban survival in an industrial society required coordinated state planning, public investment, and centralized sanitation infrastructure over individual private enterprise.",
      ],
    },
    {
      match: /Father Thames|father_thames/i,
      hinge_question:
        'How did satirical magazines like Punch use dark humor to compel a reluctant Parliament to fund massive civil engineering projects like Bazalgette’s sewers?',
      discussion_ideas: [
        'Personification of Lethal Waterborne Epidemics: Leech personifies the Thames not as the romantic, bountiful river god of British folklore, but as a filthy, bedraggled monster crawling from the slime to present his skeletal, diseased children—Diphtheria, Scrofula, and Cholera—to a refined, classical Britannia representing the city of London, graphically connecting environmental filth to childhood mortality.',
        'Political Pressure Shaming Parliament into Action: The subtitle mocks Parliament (\'A Design for a Fresco in the New Houses of Parliament\'), highlighting the hypocrisy of Victorian politicians who spent millions gilding the Palace of Westminster while refusing to spend public money on municipal sewers; within eighteen days of this cartoon appearing, Parliament passed emergency legislation authorizing Bazalgette\'s £3 million interceptor sewer system.',
      ],
    },
  ],

  // LESSON 4: How did ordinary people fight for a voice?
  lesson_4: [
    {
      match: /General Ned Ludd|Framework Knitters/i,
      hinge_question:
        'Why did skilled handloom weavers direct their rage at the machinery rather than solely demanding higher wages from factory owners?',
      discussion_ideas: [
        'Destruction of Craft Dignity and De-Skilling: Luddites did not oppose technology out of mindless ignorance; they fought the wide stocking frames because the machines produced cheap, shoddy garments and allowed factory owners to replace highly skilled, apprenticed artisans with low-paid, unapprenticed child and female labor, permanently destroying their craft identity, independence, and social standing.',
        'Tactical Leverage Against Unregulated Exploitation: In the 1810s, trade unions and strikes were strictly outlawed under the Combination Acts; with legal negotiation and voting rights banned by Parliament, smashing the expensive machinery under cover of night was the only effective weapon artisans possessed to inflict direct financial pain on unyielding masters and force them to halt wage cuts.',
      ],
    },
    {
      match: /Massacre of Peterloo|Cruikshank.*Peterloo/i,
      hinge_question:
        'How does Cruikshank’s satirical caption connect parliamentary disenfranchisement to economic class oppression?',
      discussion_ideas: [
        "Cruikshank's satirical cartoon savagely exposes the class terror driving the Peterloo Massacre of 16 August 1819. The caption depicts the Manchester Yeomanry—a volunteer cavalry composed of wealthy local cotton masters, publicans, and magistrates—charging with sharpened sabres into a defenseless, peaceful crowd of 60,000 men, women, and children who had gathered simply to demand parliamentary representation and the repeal of the Corn Laws. Cruikshank highlights the hypocrisy of the ruling class: the magistrates order their cavalry to 'cut down' their own starving workers while cynically accusing the unarmed crowd of treason. Cruikshank explicitly demonstrates that as long as industrial cities like Manchester had zero MPs while wealthy agricultural landlords controlled a corrupt Parliament, the state would use lethal military violence to protect aristocratic economic privileges and cheap factory wages against democratic reform.",
      ],
    },
    {
      match: /Captain Swing|Threat of Captain Swing/i,
      hinge_question:
        'Why did agricultural labourers invoke a mythical military commander ("Captain Swing") rather than naming real village leaders?',
      discussion_ideas: [
        "Protection Against State Hanging and Transportation: Farm labourers operated in small, tightly policed rural parishes where landowners, church parsons, and magistrates held absolute economic and legal power; signing threatening letters with the fictional pseudonym 'Captain Swing' protected actual village organizers from immediate arrest, eviction, and the gallows.",
        "Psychological Terror of an Ubiquitous, Invisible Movement: Inventing 'Captain Swing' as a fictitious, all-seeing military commander created the terrifying illusion of a vast, coordinated nationwide underground army ready to burn threshing machines, rick yards, and tithe barns across southern England, paralyzing wealthy magistrates with fear and forcing them to negotiate higher wages.",
      ],
    },
    {
      match: /Winchester Special Assizes/i,
      hinge_question:
        'Why did the British state choose transportation to Australia rather than imprisonment inside local English county gaols?',
      discussion_ideas: [
        'Permanent Severance and Eradication of Rural Rebellion: Imprisoning local farm labourers in county gaols like Winchester would have kept martyrs close to their families and sparked further local unrest or jailbreaks; transporting nearly 500 Swing rioters to penal colonies in Australia permanently removed charismatic village leaders from English society, severing all family ties and eliminating the leadership of rural rebellion.',
        "The Supreme Deterrent of Civil Death: Transportation was feared almost as much as hanging: forced labor in chains in Van Diemen's Land (Tasmania) was viewed by working-class communities as a terrifying 'living death' in a distant wasteland, designed by the Home Office to terrify agricultural labourers into absolute submission to farm machinery and low wages.",
      ],
    },
    {
      match: /George Loveless|Dorchester Assizes/i,
      hinge_question:
        'Why did the British government treat the formation of a peaceful agricultural trade union as an act of treason?',
      discussion_ideas: [
        "The prosecution of the Tolpuddle Martyrs in 1834 revealed the British ruling class's deep terror of organized working-class solidarity. George Loveless and five fellow Dorset farm laborers had merely formed the Friendly Society of Agricultural Labourers to peacefully resist wage cuts from 9 shillings to 6 shillings a week. However, the Home Secretary Lord Melbourne and local landowning magistrates feared that rural trade unionism, if allowed to spread from industrial factories to agricultural estates, would trigger nationwide strikes and destabilize the rural social hierarchy. Unable to outlaw the union directly since the repeal of the Combination Acts, the authorities weaponized an obscure 1797 naval mutiny statute (the Unlawful Oaths Act), falsely framing the union's traditional initiation ceremony as a seditious conspiracy against the Crown, and sentencing six honest Methodist farmworkers to seven years' penal transportation to crush the fledgling trade union movement.",
      ],
    },
  ],

  // LESSON 5: How did the road to democracy expand?
  lesson_5: [
    {
      match: /Parliamentary Representation Map|Unreformed Boroughs/i,
      hinge_question:
        'Why did the geography of parliamentary representation fail to reflect the economic reality of the Industrial Revolution?',
      discussion_ideas: [
        "The Absurdity of 'Rotten Boroughs': The parliamentary map reflected medieval agricultural feudalism rather than modern industrial society: virtually depopulated coastal hamlets like Old Sarum (a deserted hill with three voters) and Dunwich (which had washed into the North Sea) returned two MPs each, controlled entirely by wealthy aristocratic patrons.",
        'Total Disenfranchisement of Industrial Powerhouses: Massive, booming industrial cities that powered the wealth of the British Empire—such as Manchester (with a population of over 180,000), Birmingham, Leeds, and Sheffield—had zero MPs, leaving hundreds of thousands of factory owners, merchants, and working-class citizens completely unrepresented in Parliament.',
      ],
    },
    {
      match: /School of Reform/i,
      hinge_question:
        'How does Source B illustrate that parliamentary reform was viewed as a strict national discipline imposed on reluctant defenders of rotten boroughs?',
      discussion_ideas: [
        "'The School of Reform' satirizes the intense political showdown over the Great Reform Act of 1832 by framing it as a strict classroom discipline enforced by Prime Minister Earl Grey and Lord Chancellor Brougham upon corrupt Tory politicians. Conservative peers who vigorously defended rotten boroughs (like the Duke of Wellington and Sir Robert Peel) are depicted as misbehaved schoolchildren wearing dunce's caps and being forced to swallow the bitter medicine of constitutional reform under threat of the rod. The lithograph illustrates how the Whig government presented parliamentary reform not as radical revolution, but as a necessary conservative purification of a corrupt system: abolishing 56 rotten boroughs and granting 143 seats to growing towns to preserve the monarchy and prevent a violent French-style revolution on British soil.",
      ],
    },
    {
      match: /Corrupt Practices \(1869\)/i,
      hinge_question:
        'How does Source C prove that expanding the right to vote was meaningless without the protection of a secret ballot?',
      discussion_ideas: [
        "Open Hustings and Rampant Electoral Coercion: Prior to 1872, voting took place on public wooden platforms ('the hustings'), where electors had to publicly declare their vote before hostile crowds, landlords, and employers; tenants who voted against their Tory landlord were immediately evicted from their farms, and factory workers who supported radical candidates were summarily sacked by their masters.",
        "Bribery, Free Beer, and Political Violence: Without secrecy, elections were plagued by open bribery and mob intimidation: wealthy candidates spent thousands of pounds buying votes with free beer ('treating'), while hired gangs of street toughs ('lambs') assaulted voters attempting to declare for opposing candidates, making the vote a commodity traded under coercion rather than a free democratic choice.",
      ],
    },
    {
      match: /Kennington Common|Chartist Mass Demonstration/i,
      hinge_question:
        'Why did the British state assemble 85,000 special constables and deploy the Duke of Wellington to confront a crowd presenting a petition?',
      discussion_ideas: [
        'Panic Over 1848 European Revolutions: In the spring of 1848, violent revolutions toppled monarchies across continental Europe, overthrowing the French king and sparking armed street fighting in Berlin and Vienna; the British government feared that the mass Chartist rally at Kennington Common was the prelude to an armed British working-class revolution to seize Parliament and declare a socialist republic.',
        "The Supreme Show of State Monopoly on Force: By deploying 85,000 special constables from the middle class (including future Napoleon III), stationing regular troops under the legendary Duke of Wellington at the Bank of England, and barricading the Thames bridges, Prime Minister Lord John Russell executed an overwhelming display of state power, demoralizing Chartist leaders and forcing Feargus O'Connor to deliver the six-million-signature People's Charter peacefully in three ordinary cabs.",
      ],
    },
    {
      match: /First Secret Ballot|Pontefract By-Election/i,
      hinge_question:
        'Why was the introduction of the secret ballot box the decisive turning point that allowed the working class to vote freely?',
      discussion_ideas: [
        "The 1872 Ballot Act, first tested at the Pontefract by-election using a wax-sealed ballot box, represented the democratic emancipation of the British working class. Under William Gladstone's Liberal government, the secret ballot permanently severed the coercive hold of the ruling elite over the electorate: marked paper ballots deposited in tamper-evident sealed boxes made it impossible for factory owners, landowning aristocrats, or bank managers to know how an individual had voted. Protected by absolute privacy inside the polling booth, working-class men—who had won the vote in the 1867 Reform Act—could finally cast their ballots according to their own class interests and political convictions without fear of eviction, dismissal, or physical retaliation, paving the way for the rise of independent working-class MPs and the modern Labour movement.",
      ],
    },
  ],
};

async function main() {
  console.log('🚀 Starting Industrialisation and Empire Enrichment...');

  // Load from data.js
  const fileUrl = pathToFileURL(dataJsPath).href;
  const dataModule = await import(fileUrl);
  const unitData = dataModule.default || dataModule.unitData;

  let totalSourcesUpdated = 0;
  let totalNarrativeUpdated = 0;

  unitData.lessons.forEach((l) => {
    const rules = INDUSTRIALISATION_PEDAGOGY[l.id];
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
          console.warn(
            `  ⚠️ [narrative ${idx}] No match for: "${b.source.title}" (id=${b.source.id})`,
          );
        }
      }
    });
  });

  console.log(
    `\n🎉 Total sources updated across Industrialisation: ${totalSourcesUpdated} in l.sources, ${totalNarrativeUpdated} in narrative_blocks`,
  );

  // 1. Write back to units/industrialisation_and_empire/data.js
  const serialized = JSON.stringify(unitData, null, 2);
  const jsContent = `const unitData = ${serialized};\nexport default unitData;\nexport { unitData };\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
  fs.writeFileSync(dataJsPath, jsContent, 'utf8');
  console.log('✅ Successfully wrote units/industrialisation_and_empire/data.js');

  // 2. Write to public/data/industrialisation_and_empire.json
  const pubData = { id: 'industrialisation_and_empire', data: unitData };
  fs.writeFileSync(pubJsonPath, JSON.stringify(pubData, null, 2), 'utf8');
  console.log('✅ Successfully updated public/data/industrialisation_and_empire.json');

  // 3. Write to public/database.json
  if (fs.existsSync(dbPath)) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (db.industrialisation_and_empire) {
      db.industrialisation_and_empire.data = unitData;
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
      console.log('✅ Successfully updated industrialisation_and_empire in public/database.json');
    }
  }

  console.log('\n🏁 Completed Industrialisation and Empire enrichment!');
}

main().catch((err) => {
  console.error('❌ Error executing enrich script:', err);
  process.exit(1);
});
