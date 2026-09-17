/**
 * scripts/enrich_early_modern_world_scaffolding.cjs
 *
 * Injects CME-standard pedagogical scaffolding (word_bank, connective_bank,
 * sentence_starters, hints, model_answer) into Year 8 Early Modern World (Lessons 3–9).
 * Preserves all existing printed workbook questions verbatim.
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'units', 'early_modern_world', 'data.js');
let content = fs.readFileSync(filePath, 'utf8');

// Scaffolding definitions for Lessons 3 through 9
const scaffolding = {
  3: {
    // Lesson 3: Trade or takeover: How did early encounters turn into empire?
    question: 'Explain how the creation of the East India Company (EIC) transformed British trade.',
    word_bank: [
      'East India Company (EIC, 1600)',
      'Royal Charter (Elizabeth I)',
      'Joint-Stock Company',
      'Shareholders & Capital',
      'Trade Monopoly',
      'Mughal Empire (Emperor Jahangir)',
      'Factory & Trading Post (Surat)',
      'Spices & Calico (Cotton)',
      'Private Corporate Army',
      'Gunboat Diplomacy',
      'Battle of Plassey (1757)',
    ],
    connective_bank: [
      'Consequently',
      'As a direct consequence of',
      'Furthermore',
      'Whereas previously',
      'This fundamentally transformed',
      'Therefore',
      'In stark contrast to',
    ],
    sentence_starters: [
      'Before the creation of the East India Company in 1600, individual English merchants struggled to trade in Asia because...',
      'Queen Elizabeth I resolved this financial and logistical vulnerability by granting the EIC a Royal Charter and establishing a joint-stock model, which allowed...',
      'This financial innovation fundamentally transformed British commerce by pooling vast capital, enabling the company to...',
      'In Asia, the EIC secured lucrative footholds by negotiating with the Mughal Empire, establishing fortified factories in ports such as Surat and importing...',
      'However, the nature of this commerce underwent a violent shift as the EIC deployed private corporate armies and gunboat diplomacy, meaning that...',
      'Ultimately, what began as a peaceful commercial trade in spices evolved into...',
    ],
    hints: [
      "Paragraph 1 (The Joint-Stock Innovation): Explain why individual voyages were too risky and how pooling capital through joint-stock shares and Elizabeth I's 1600 Royal Charter spread risk and secured a trade monopoly.",
      "Paragraph 2 (Commodities & Mughal Treaties): Explain how the EIC negotiated with Mughal Emperor Jahangir to establish fortified 'factories' (trading posts) in Surat, shifting British consumer tastes toward Asian spices, silk, and calico textiles.",
      'Paragraph 3 (From Commercial Trading to Corporate Rule): Explain how the EIC transformed from a peaceful trading company into a militarised corporate empire, using private armies and naval force to monopolise regional trade and conquer territory.',
    ],
    model_answer:
      "The foundation of the East India Company (EIC) in 1600 fundamentally transformed British trade from high-risk individual ventures into an aggressive, militarised corporate monopoly. Prior to 1600, lone English merchants were unable to compete with Portuguese and Dutch fleets because individual voyages across the Indian Ocean required prohibitive capital and carried catastrophic risks of shipwreck or piracy. Queen Elizabeth I solved this dilemma by granting the EIC a royal charter, pioneering the revolutionary 'joint-stock' model. By selling shares to private investors, the company pooled unprecedented capital while legally spreading financial risk. Consequently, the EIC established lucrative commercial footholds across the Indian subcontinent. After dispatching Sir Thomas Roe to negotiate with Mughal Emperor Jahangir, the company built fortified 'factories' at Surat and Madras, flooding London with exotic Asian commodities including black pepper, cinnamon, raw silk, and printed calico textiles. However, this commercial revolution soon became an imperial conquest. Armed with its royal monopoly, the EIC constructed private dockyards, deployed heavily armed Indiamen merchant vessels, and recruited thousands of private mercenary troops. What began as a peaceful commercial trade in spices evolved into ruthless corporate imperialism, using gunboat diplomacy and regional proxy wars to subjugate the subcontinent and extract vast territorial taxation.",
    lines: 15,
    qNum: 11,
  },
  4: {
    // Lesson 4: James I and the Gunpowder Plot: Why was religious division so volatile?
    question:
      'Explain why religious division was so volatile under King James I, leading to the Gunpowder Plot of 1605.',
    word_bank: [
      'King James I (1603)',
      'Protestant Reformation',
      'Recusancy Fines',
      'Catholic Recusants',
      'Robert Catesby',
      'Guy Fawkes ("John Johnson")',
      '36 Barrels of Gunpowder',
      'House of Lords Vaults',
      'Princess Elizabeth (Puppet Queen)',
      'Monteagle Letter (1605)',
      'Robert Cecil (Earl of Salisbury)',
      'Penal Laws & Bonfire Night',
    ],
    connective_bank: [
      'Consequently',
      'As an immediate result of',
      'Furthermore',
      'In stark contrast to',
      'This directly provoked',
      'Therefore',
      'Ultimately culminating in',
    ],
    sentence_starters: [
      'Religious division in England was extraordinarily volatile following the accession of King James I in 1603 because...',
      'English Roman Catholics had initially anticipated that James would offer religious toleration, but their hopes were bitterly crushed when...',
      'Viewing Catholic priests and recusants as a dangerous foreign fifth column loyal to the Pope, the Crown cracked down by...',
      'Driven to desperation by escalating recusancy fines and state persecution, Robert Catesby and his fellow conspirators conspired to...',
      'Following the betrayal of the plot via the anonymous Monteagle Letter and the capture of Guy Fawkes beneath the House of Lords...',
      'Consequently, the failure of the conspiracy intensified anti-Catholic paranoia, directly resulting in...',
    ],
    hints: [
      'Paragraph 1 (The Crushed Hopes of Toleration): Explain why English Catholics expected James I to ease persecution (his Catholic mother, Mary Queen of Scots) and why his expulsion of Catholic priests and renewal of recusancy fines in 1604 caused bitter betrayal.',
      "Paragraph 2 (The Radicalisation of Catesby's Cell): Detail how Robert Catesby, Guy Fawkes, and their conspirators rented vaults beneath Parliament, stockpiling 36 barrels of gunpowder to obliterate the King and government during the State Opening.",
      "Paragraph 3 (Discovery, Execution, and State Backlash): Explain how the Monteagle warning letter exposed the plot on 26 October 1605, leading to Fawkes's torture in the Tower, the gun battle at Holbeche House, and the draconian new Penal Laws.",
    ],
    model_answer:
      'Religious division in England was exceptionally volatile under King James I because decades of post-Reformation tension collided with crushed expectations, culminating in the desperate treason of the 1605 Gunpowder Plot. When James ascended the throne in 1603, English Catholics hoped the son of Mary Queen of Scots would grant them religious toleration. Instead, James sought to placate hardline Protestant factions; in 1604, he ordered all Catholic priests to flee the realm and aggressively enforced heavy recusancy fines on families refusing Church of England services. This betrayal radicalised a militant circle of Catholic gentry led by Robert Catesby. Convinced that peaceful change was impossible, Catesby, Guy Fawkes, and Thomas Percy plotted an unprecedented decapitation strike: concealing thirty-six barrels of gunpowder beneath the House of Lords to detonate during the State Opening of Parliament on 5 November 1605. Their objective was to assassinate the King, his heirs, and the entire government, before kidnapping young Princess Elizabeth to crown her as a puppet Catholic monarch. However, the conspiracy unraveled when an anonymous warning letter was delivered to Lord Monteagle. Chief Minister Robert Cecil searched the vaults, capturing Fawkes red-handed. Fawkes was tortured in the Tower until he confessed, while Catesby was slain in a shootout at Holbeche House. The failed plot dramatically worsened religious volatility: Parliament passed draconian Penal Laws barring Catholics from public office, entrenched deep anti-Catholic hysteria, and established the permanent national celebration of Bonfire Night.',
    lines: 15,
    qNum: 9,
  },
  5: {
    // Lesson 5: Who controlled Britain? The Ideological Battle
    question:
      'How did the English Civil War and the execution of Charles I change the balance of power?',
    word_bank: [
      'King Charles I',
      'Divine Right of Kings',
      "Eleven Years' Tyranny (1629–1640)",
      'Ship Money',
      'Parliamentarians (Roundheads)',
      'Royalists (Cavaliers)',
      'Oliver Cromwell',
      'New Model Army',
      'Battle of Naseby (1645)',
      'High Court of Justice',
      'Regicide (Execution of Charles I, 1649)',
    ],
    connective_bank: [
      'Consequently',
      'This fundamentally overturned',
      'Furthermore',
      'Whereas previously',
      'This directly challenged',
      'Therefore',
      'In stark contrast to',
    ],
    sentence_starters: [
      "Prior to the English Civil War, King Charles I claimed absolute authority under the 'Divine Right of Kings', asserting that...",
      'However, Parliament fiercely contested royal absolutism when Charles dissolved Parliament for eleven years and levied illegal taxes like...',
      "When open warfare erupted in 1642, the balance of military power tipped decisively toward Parliament due to Oliver Cromwell's...",
      'The historic trial and execution of Charles I on 27 January 1649 completely revolutionised English governance because...',
      "By condemning a reigning monarch as a 'tyrant, traitor, murderer, and public enemy', the High Court established the radical precedent that...",
      'Ultimately, the Civil War proved that supreme authority in Britain resided not in the Crown, but in...',
    ],
    hints: [
      "Paragraph 1 (The Ideological Clash): Explain Charles I's belief in the Divine Right of Kings, his Eleven Years' Personal Rule without Parliament, and the explosive dispute over arbitrary taxation (Ship Money).",
      "Paragraph 2 (Military Climax & The New Model Army): Explain how the formation of Oliver Cromwell's professional, merit-based New Model Army crushed Royalist forces at the Battle of Naseby (1645).",
      'Paragraph 3 (Regicide and the Republic): Detail the 1649 trial and public beheading of Charles I, explaining how this dismantled royal supremacy and proved that political authority was accountable to Parliament and the law.',
    ],
    model_answer:
      "The English Civil War (1642–1649) and the public execution of King Charles I fundamentally shattered the ancient balance of power in Britain, permanently ending the divine supremacy of the absolute monarchy. Before the conflict, Charles I ruled under the ideological doctrine of the 'Divine Right of Kings', claiming that monarchs were accountable to God alone. For eleven years (1629–1640), Charles dismissed Parliament entirely, raising unauthorized funds through arbitrary levies such as Ship Money and jailing opponents without trial. However, Parliament refused to submit to unchecked royal absolutism. When warfare erupted in 1642, power shifted toward Parliament through the creation of the New Model Army. Commanded by Sir Thomas Fairfax and Oliver Cromwell, this disciplined, meritocratic fighting force decisively routed the King’s Cavaliers at the Battle of Naseby in 1645. Most radically of all, after Charles refused repeated constitutional settlements, Parliament established an unprecedented High Court of Justice. On 27 January 1649, the Court convicted Charles I as a 'tyrant, traitor, murderer, and public enemy to the good people of this nation', beheading him outside the Banqueting House on 30 January. This momentous act of regicide overturned centuries of feudal theology. It demonstrated that sovereignty resided not in the sacred person of the King, but in the elected representatives of Parliament and the rule of law, plunging England into its only period as an experimental republic (the Commonwealth).",
    lines: 15,
    qNum: 10,
  },
  6: {
    // Lesson 6: Who controlled Britain? The Economic Shift
    question:
      "Explain how the 'Financial Revolution' (like the Bank of England) helped Britain build a modern empire.",
    word_bank: [
      'Financial Revolution',
      'Glorious Revolution (1688)',
      'Bill of Rights (1689)',
      'Bank of England (1694)',
      'National Debt',
      'Government Bonds (Consols)',
      'Royal Navy',
      'Commercial Capitalism',
      'London Stock Exchange',
      'Fiscal-Military State',
      'Ship of the Line',
    ],
    connective_bank: [
      'Consequently',
      'This directly enabled',
      'Furthermore',
      'In stark contrast to',
      'As a direct consequence of',
      'Therefore',
      'Ultimately transforming',
    ],
    sentence_starters: [
      "Following the Glorious Revolution of 1688, the establishment of constitutional monarchy paved the way for a radical 'Financial Revolution' by...",
      "The foundation of the Bank of England in 1694 revolutionised state finance because it introduced the system of the 'National Debt', which allowed...",
      'Unlike absolute rival powers such as France, where the Crown struggled to borrow money at exorbitant interest rates, Britain could...',
      'This financial security directly fueled the expansion of the British Empire because the government channeled borrowed capital into...',
      "Consequently, Britain transformed into a powerful 'fiscal-military state', capable of out-spending and out-building global competitors through...",
      "Ultimately, the true winner of Britain's constitutional struggles was the merchant and banking class, who...",
    ],
    hints: [
      'Paragraph 1 (The Constitutional Shift & Bank of England): Explain how the 1688 Glorious Revolution and the 1689 Bill of Rights placed Parliamentary control over taxation, leading to the creation of the Bank of England in 1694.',
      "Paragraph 2 (The Mechanics of the National Debt): Contrast Britain's low-interest borrowing via government bonds with France's expensive, bankrupting crown loans, explaining why wealthy merchants trusted the British state.",
      'Paragraph 3 (Funding the Imperial War Machine): Detail how low-cost national debt was directly poured into the Royal Navy, financing massive dockyards, warships (Ships of the Line), and global trade protection.',
    ],
    model_answer:
      "The 'Financial Revolution' of the late seventeenth century was the indispensable engine that enabled Britain to construct a dominant global empire, transforming the country into an unbeatable 'fiscal-military state'. Prior to 1688, English monarchs suffered chronic bankruptcy, relying on emergency loans at ruinous interest rates. However, the Glorious Revolution of 1688 and the 1689 Bill of Rights subordinated the Crown to Parliament, guaranteeing that taxes and state debts would be legally managed by elected lawmakers. This constitutional stability made London the most secure investment market in Europe. In 1694, the Bank of England was founded to raise £1.2 million for the war against France, establishing the permanent 'National Debt'. Instead of paying for costly wars purely out of taxation, the government issued low-interest government bonds that wealthy merchants and aristocrats eagerly bought, confident they would receive steady interest guaranteed by Parliament. In stark contrast to absolute monarchies like France—where kings frequently defaulted on their debts and paid double-digit interest rates—Britain borrowed vast sums at negligible costs. This financial advantage was poured directly into the British armed forces, particularly the Royal Navy. Low-interest borrowing financed the construction of hundreds of formidable 74-gun 'Ships of the Line', modernized the Royal Dockyards at Portsmouth and Chatham, and maintained garrisons across world trade chokepoints. Consequently, the Financial Revolution allowed a small island nation to consistently out-spend, out-build, and out-fight far larger European rivals across the Atlantic and Indian Oceans.",
    lines: 15,
    qNum: 4,
  },
  7: {
    // Lesson 7: What were the mechanics of the Transatlantic Slave Trade?
    question: 'How did the Triangular Trade directly enrich British port cities?',
    word_bank: [
      'Triangular Trade',
      'Transatlantic Slave Trade',
      'Outward Passage',
      'Middle Passage',
      'Homeward Passage',
      'Barracoons',
      'Slave Ship Brookes',
      'Chattel Slavery',
      'Bristol & Liverpool Docks',
      'Plantation Commodities (Sugar, Tobacco, Rum)',
      'Manufactured Goods (Textiles, Guns)',
      'Edward Colston',
    ],
    connective_bank: [
      'Consequently',
      'This directly resulted in',
      'Furthermore',
      'Whereas the primary purpose was',
      'As a direct consequence of',
      'Therefore',
      'In stark contrast to',
    ],
    sentence_starters: [
      'The Triangular Trade operated as a highly organized, three-legged system of racialized exploitation that directly enriched British port cities because...',
      'On the first leg (the Outward Passage), British merchant vessels departed from ports like Liverpool and Bristol carrying manufactured goods such as...',
      'These goods were exchanged along the West African coast for captive human beings, who were subjected to the unimaginable horrors of the Middle Passage before...',
      'On the final leg (the Homeward Passage), ships returned to Britain loaded with lucrative slave-grown commodities, notably...',
      'The staggering profits generated by this trade flowed directly into the British domestic economy, transforming provincial harbors into...',
      'Ultimately, the expansion of modern British commercial banking, civic buildings, and merchant dynasties was directly underwritten by...',
    ],
    hints: [
      'Paragraph 1 (The Three Legs of the Trade): Clearly define the three legs of the trade—Outward (manufactured goods), Middle (enslaved human beings), and Homeward (sugar, rum, tobacco, cotton).',
      'Paragraph 2 (The Horrors of the Middle Passage): Detail the industrial cruelty of the voyage using the Brookes slave ship diagram, the barracoons, and the commodification of African lives under chattel slavery.',
      'Paragraph 3 (The Enrichment of Bristol and Liverpool): Explain how the profits funded civic architecture, banking institutions (Barclays, Bank of England), industrial infrastructure, and wealthy merchant elites like Edward Colston.',
    ],
    model_answer:
      'The Transatlantic Triangular Trade was an industrial system of racialised human commodification that directly transformed British provincial ports like Bristol and Liverpool into the wealthiest commercial hubs in the world. The trade operated across three interconnected legs. On the Outward Passage, British merchant ships sailed from ports such as Bristol laden with manufactured goods—including Manchester cottons, Birmingham firearms, brass pots, and gunpowder. On the West African coast, these goods were bartered with local rulers and slave-raiding brokers for captured African men, women, and children who had been stripped and locked in coastal fortresses known as barracoons. The second leg, the Middle Passage, was defined by calculated brutality: as exposed by the 1788 diagram of the slave ship Brookes, captains jammed up to six hundred captive Africans into sweltering, disease-ridden holds with less space than a coffin, where millions perished from dysentery, scurvy, and despair. Those who survived were sold at auctions in Jamaica, Barbados, and Virginia into lifelong, hereditary chattel slavery. Finally, on the Homeward Passage, vessels returned to Britain brimming with high-value plantation commodities—chiefly raw brown sugar, molasses, rum, and tobacco. The reinvestment of this imperial wealth enriched every tier of British society. Liverpool expanded from a tiny fishing village into Europe’s premier slave port, controlling over eighty percent of British slaving voyages by 1795. The staggering profits financed magnificent civic buildings, paved roads, and bankrolled major financial dynasties such as Barclays and the Bank of England. Prominent slave merchants like Edward Colston in Bristol used these blood-soaked fortunes to endow schools, almshouses, and churches, demonstrating how deeply the foundations of modern British urban prosperity were built upon the enslavement of African people.',
    lines: 15,
    qNum: 11,
  },
  8: {
    // Lesson 8: How did enslaved Africans resist the Transatlantic Slave Trade?
    question: 'Explain how the Jamaican Maroons successfully resisted British control.',
    word_bank: [
      'Queen Nanny of the Maroons',
      'Maroons (Cimarrón)',
      'Blue Mountains of Jamaica',
      'Nanny Town',
      'Guerrilla Warfare',
      'Camouflage & Ambush',
      'First Maroon War (1728–1739)',
      'Akan Traditions (Obeah)',
      'Stono Rebellion (1739)',
      'Olaudah Equiano',
      '1739 Peace Treaty',
      'Autonomous Land (1,500 Acres)',
    ],
    connective_bank: [
      'Consequently',
      'As a direct consequence of',
      'Furthermore',
      'In stark contrast to the myth of passivity',
      'This directly compelled',
      'Therefore',
      'Ultimately culminating in',
    ],
    sentence_starters: [
      'The resistance of the Jamaican Maroons decisively shatters the persistent historical myth that enslaved Africans were passive victims, demonstrating instead that...',
      'Originating from escaped enslaved Africans who fled into the impenetrable interior of Jamaica, the Maroons established fortified mountain settlements such as...',
      'Under the brilliant military and spiritual leadership of Queen Nanny, the Maroons neutralized the superior firepower of the British army by deploying...',
      'Using the harsh terrain of the Blue Mountains, woven forest camouflage, and psychological ambush tactics, Maroon fighters were able to...',
      'Consequently, after over a decade of humiliating military defeats during the First Maroon War, the British colonial authorities were forced to...',
      'Ultimately, the 1739 Peace Treaty proved that African resistance was capable of forcing an imperial superpower to...',
    ],
    hints: [
      'Paragraph 1 (The Maroon Origins & Mountain Strongholds): Explain who the Maroons were (escaped Africans living free in Jamaica) and how they built self-sustaining, fortified sanctuaries like Nanny Town in the Blue Mountains.',
      'Paragraph 2 (Tactics & Leadership of Queen Nanny): Explain how Queen Nanny utilized guerrilla warfare, rainforest camouflage, horn communication (abeng), and botanical knowledge to outmaneuver British redcoats.',
      'Paragraph 3 (The 1739 Treaty & Historical Significance): Detail the climax of the First Maroon War, where the British Crown was forced to sign a humiliating 1739 peace treaty granting Maroons 1,500 acres of autonomous land.',
    ],
    model_answer:
      "The Jamaican Maroons mounted one of the most successful armed resistance movements in imperial history, decisively defeating British military forces and exposing the vulnerabilities of colonial control in the eighteenth century. When Britain captured Jamaica from Spain in 1655, many enslaved Africans escaped into the island's mountainous interior, forming autonomous societies known as 'Maroons' (from the Spanish cimarrón, meaning untamed). Under the exceptional strategic and spiritual leadership of Queen Nanny—an Ashanti woman escaped from a sugar estate—the Windward Maroons built Nanny Town, a fortified, self-sufficient mountain stronghold high in the mist of the Blue Mountains. Nanny’s forces waged a devastating guerrilla campaign during the First Maroon War (1728–1739). Recognizing that they could not match British musket lines in open field combat, the Maroons mastered asymmetric warfare. Wearing intricate camouflage woven from living rainforest branches and communicating over mountain valleys using the abeng (a cow-horn trumpet), Maroon warriors ambushed redcoat patrols along steep ravine tracks, routing British expeditions before the soldiers could even identify the enemy. Furthermore, the Maroons raided British sugar plantations, liberating enslaved workers and torching cane fields. After suffering catastrophic casualties and spending tens of thousands of pounds without subduing the interior, the British Crown was forced to accept a stunning diplomatic defeat. In 1739, British Governor Edward Trelawny signed a formal peace treaty with the Maroons, legally recognizing their perpetual freedom and granting them 1,500 acres of autonomous territory. Queen Nanny's victory proved conclusively that enslaved Africans were not passive victims waiting for European abolitionists, but fierce, autonomous agents who fought and won their own freedom.",
    lines: 15,
    qNum: 16,
  },
  9: {
    // Lesson 9: How 'modern' was Britain by 1750? (Synthesis & Assessment)
    question: "How 'modern' was Britain by 1750?",
    word_bank: [
      'Modernity',
      'Financial Revolution (Bank of England)',
      'East India Company',
      'Parliamentary Constitutionalism',
      'The Bloody Code (Over 200 Capital Offenses)',
      'Chattel Slavery',
      'Transatlantic Triangular Trade',
      'Urban Squats & Mudlarks',
      'Gin Craze',
      'Enlightenment Ideas',
      'Agrarian Hierarchy',
      'Colonial Empire',
    ],
    connective_bank: [
      'Consequently',
      'On the one hand',
      'On the other hand',
      'In stark contrast to',
      'Furthermore',
      'This demonstrates that',
      'Ultimately, while Britain appeared',
    ],
    sentence_starters: [
      'By 1750, Britain exhibited powerful hallmarks of a pioneering modern state in its economic institutions and global trade networks, yet...',
      'In terms of economic and constitutional development, Britain was undeniably modern due to the rise of the Bank of England, the London Stock Exchange, and...',
      'Furthermore, parliamentary democracy and the rule of law after the 1688 Glorious Revolution contrasted sharply with...',
      'However, this shiny veneer of modernity masked deeply archaic, brutal social and legal realities, most notably...',
      "Domestically, the terrifying severity of the 'Bloody Code' and the squalor of urban poverty proved that for the working majority...",
      'Ultimately, Britain in 1750 was a deeply contradictory society: hyper-modern in its imperial and financial machinery, but...',
    ],
    hints: [
      'Introduction: Define modernity (advanced commerce, rule of law, institutional capitalism) and state your thesis: Britain was modern in its financial and imperial machinery, but deeply traditional and brutal in its social and moral realities.',
      'Paragraph 1 (The Modern Facet - Finance, Trade, Governance): Analyze the Bank of England, national debt, joint-stock capitalism (EIC), parliamentary limits on the Crown, and the rise of scientific enquiry.',
      'Paragraph 2 (The Archaic & Brutal Realities): Examine the barbaric legal system (the Bloody Code hanging children for petty theft), the human catastrophe of chattel slavery fueling British wealth, and urban destitution (Mudlarks, Gin Craze).',
      "Conclusion: Deliver a balanced historical judgment on whether 'modernity' in 1750 was an authentic transformation of society or a privileged luxury enjoyed by wealthy elites while built on violence.",
    ],
    model_answer:
      "By 1750, Britain presented a profound historical paradox: while it possessed the institutional, commercial, and financial architecture of the world's first modern superpower, its social fabric and legal foundations remained deeply traditional, unequal, and barbaric. On the one hand, Britain had achieved unprecedented modernity in finance, imperial commerce, and constitutional governance. Following the 1688 Glorious Revolution, Britain permanently curtailed monarchical absolutism, subjecting royal policy to Parliamentary debate. The creation of the Bank of England (1694) and the National Debt unleashed a Financial Revolution that funded a world-conquering Royal Navy and commercial joint-stock empires like the East India Company. In London's bustling coffeehouses, merchants and scientists shared Enlightenment ideas, stock prices, and maritime contracts, creating an urban consumer society completely divorced from medieval feudalism. On the other hand, this modern exterior was anchored to archaic brutality and moral stagnation. Britain’s global wealth was directly generated by the monstrous cruelty of the Transatlantic Slave Trade and chattel slavery across the Caribbean. Domestically, the ruling class enforced social order through the draconian 'Bloody Code'—a legal system that designated over two hundred offenses as punishable by public hanging, including pickpocketing goods worth five shillings or stealing sheep. While wealthy aristocrats in Mayfair built classical Georgian mansions, the laboring poor in London’s rookeries lived in squalor, turning to cheap gin to numb their misery, while destitute children survived as 'mudlarks' scavenging raw sewage along the Thames. In conclusion, Britain by 1750 was 'modern' purely in the mechanical instruments of state power, global capitalism, and imperial conquest. For the enslaved African, the common laborer, or the colonized subject, Britain’s so-called modernity was an extractive, violent tyranny constructed to enrich a narrow elite.",
    lines: 35,
    qNum: 10,
  },
};

// Fix Queen Nanny missing entity in Lesson 8
content = content.replace(
  "title: 'Micro-History:  and the Blue Mountains (1730s)',",
  "title: 'Micro-History: Queen Nanny and the Blue Mountains (1730s)',",
);
content = content.replace(
  'known as <strong>Queen </strong>.<br><br>',
  'known as <strong>Queen Nanny</strong>.<br><br>',
);

// We will load the data.js dynamically and patch the lesson objects, then format
async function runPatch() {
  const fileUrl = 'file:///' + filePath.replace(/\\/g, '/');
  const mod = await import(fileUrl);
  const data = mod.default || mod.unitData;

  // Verify lessons array
  if (!data || !data.lessons || data.lessons.length !== 9) {
    throw new Error('Expected 9 lessons in early_modern_world');
  }

  // Update Lesson 3 (Index 2)
  data.lessons[2].extended = {
    title: 'Assessment Practice',
    question: scaffolding[3].question,
    word_bank: scaffolding[3].word_bank,
    connective_bank: scaffolding[3].connective_bank,
    sentence_starters: scaffolding[3].sentence_starters,
    hints: scaffolding[3].hints,
    model_answer: scaffolding[3].model_answer,
    lines: scaffolding[3].lines,
    qNum: scaffolding[3].qNum,
  };
  data.lessons[2].lesson_assessment = {
    question: scaffolding[3].question,
    word_bank: scaffolding[3].word_bank,
    connective_bank: scaffolding[3].connective_bank,
    sentence_starters: scaffolding[3].sentence_starters,
    hints: scaffolding[3].hints,
    model_answer: scaffolding[3].model_answer,
  };

  // Update Lesson 4 (Index 3) - Gunpowder Plot
  data.lessons[3].extended = {
    title: 'Assessment Practice',
    question: scaffolding[4].question,
    word_bank: scaffolding[4].word_bank,
    connective_bank: scaffolding[4].connective_bank,
    sentence_starters: scaffolding[4].sentence_starters,
    hints: scaffolding[4].hints,
    model_answer: scaffolding[4].model_answer,
    lines: scaffolding[4].lines,
    qNum: scaffolding[4].qNum,
  };
  data.lessons[3].lesson_assessment = {
    question: scaffolding[4].question,
    word_bank: scaffolding[4].word_bank,
    connective_bank: scaffolding[4].connective_bank,
    sentence_starters: scaffolding[4].sentence_starters,
    hints: scaffolding[4].hints,
    model_answer: scaffolding[4].model_answer,
  };

  // Update Lesson 5 (Index 4) - Ideological Battle
  data.lessons[4].id = 'lesson_5';
  data.lessons[4].extended = {
    title: 'Assessment Practice',
    question: scaffolding[5].question,
    word_bank: scaffolding[5].word_bank,
    connective_bank: scaffolding[5].connective_bank,
    sentence_starters: scaffolding[5].sentence_starters,
    hints: scaffolding[5].hints,
    model_answer: scaffolding[5].model_answer,
    lines: scaffolding[5].lines,
    qNum: scaffolding[5].qNum,
  };
  data.lessons[4].lesson_assessment = {
    question: scaffolding[5].question,
    word_bank: scaffolding[5].word_bank,
    connective_bank: scaffolding[5].connective_bank,
    sentence_starters: scaffolding[5].sentence_starters,
    hints: scaffolding[5].hints,
    model_answer: scaffolding[5].model_answer,
  };

  // Update Lesson 6 (Index 5) - Economic Shift
  data.lessons[5].id = 'lesson_6';
  data.lessons[5].extended = {
    title: 'Assessment Practice',
    question: scaffolding[6].question,
    word_bank: scaffolding[6].word_bank,
    connective_bank: scaffolding[6].connective_bank,
    sentence_starters: scaffolding[6].sentence_starters,
    hints: scaffolding[6].hints,
    model_answer: scaffolding[6].model_answer,
    lines: scaffolding[6].lines,
    qNum: scaffolding[6].qNum,
  };
  data.lessons[5].lesson_assessment = {
    question: scaffolding[6].question,
    word_bank: scaffolding[6].word_bank,
    connective_bank: scaffolding[6].connective_bank,
    sentence_starters: scaffolding[6].sentence_starters,
    hints: scaffolding[6].hints,
    model_answer: scaffolding[6].model_answer,
  };

  // Update Lesson 7 (Index 6) - Transatlantic Slave Trade
  data.lessons[6].id = 'lesson_7';
  data.lessons[6].extended = {
    title: 'Assessment Practice',
    question: scaffolding[7].question,
    word_bank: scaffolding[7].word_bank,
    connective_bank: scaffolding[7].connective_bank,
    sentence_starters: scaffolding[7].sentence_starters,
    hints: scaffolding[7].hints,
    model_answer: scaffolding[7].model_answer,
    lines: scaffolding[7].lines,
    qNum: scaffolding[7].qNum,
  };
  data.lessons[6].lesson_assessment = {
    question: scaffolding[7].question,
    word_bank: scaffolding[7].word_bank,
    connective_bank: scaffolding[7].connective_bank,
    sentence_starters: scaffolding[7].sentence_starters,
    hints: scaffolding[7].hints,
    model_answer: scaffolding[7].model_answer,
  };

  // Update Lesson 8 (Index 7) - Maroon Resistance
  data.lessons[7].id = 'lesson_8';
  data.lessons[7].extended = {
    title: 'Assessment Practice',
    question: scaffolding[8].question,
    word_bank: scaffolding[8].word_bank,
    connective_bank: scaffolding[8].connective_bank,
    sentence_starters: scaffolding[8].sentence_starters,
    hints: scaffolding[8].hints,
    model_answer: scaffolding[8].model_answer,
    lines: scaffolding[8].lines,
    qNum: scaffolding[8].qNum,
  };
  data.lessons[7].lesson_assessment = {
    question: scaffolding[8].question,
    word_bank: scaffolding[8].word_bank,
    connective_bank: scaffolding[8].connective_bank,
    sentence_starters: scaffolding[8].sentence_starters,
    hints: scaffolding[8].hints,
    model_answer: scaffolding[8].model_answer,
  };

  // Fix Queen Nanny in Lesson 8 narrative block 0
  if (data.lessons[7].narrative_blocks && data.lessons[7].narrative_blocks[0]) {
    data.lessons[7].narrative_blocks[0].title =
      'Micro-History: Queen Nanny and the Blue Mountains (1730s)';
    data.lessons[7].narrative_blocks[0].text = data.lessons[7].narrative_blocks[0].text.replace(
      'known as <strong>Queen </strong>.',
      'known as <strong>Queen Nanny</strong>.',
    );
  }

  // Update Lesson 9 (Index 8) - Synthesis
  data.lessons[8].id = 'lesson_9';
  data.lessons[8].extended = {
    title: 'Final Assessment',
    question: scaffolding[9].question,
    word_bank: scaffolding[9].word_bank,
    connective_bank: scaffolding[9].connective_bank,
    sentence_starters: scaffolding[9].sentence_starters,
    hints: scaffolding[9].hints,
    model_answer: scaffolding[9].model_answer,
    lines: scaffolding[9].lines,
    qNum: scaffolding[9].qNum,
  };
  data.lessons[8].lesson_assessment = {
    question: scaffolding[9].question,
    word_bank: scaffolding[9].word_bank,
    connective_bank: scaffolding[9].connective_bank,
    sentence_starters: scaffolding[9].sentence_starters,
    hints: scaffolding[9].hints,
    model_answer: scaffolding[9].model_answer,
  };

  // Serialize cleanly back to data.js
  const outputCode =
    'const early_modern_world = ' +
    JSON.stringify(data, null, 2) +
    ';\n\nexport const unitData = early_modern_world;\nexport default early_modern_world;\n';
  fs.writeFileSync(filePath, outputCode, 'utf8');
  console.log('✅ Successfully wrote updated early_modern_world/data.js');
}

runPatch().catch((err) => {
  console.error('❌ Error applying patch:', err);
  process.exit(1);
});
