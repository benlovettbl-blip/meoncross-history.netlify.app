/**
 * apply_all_empire_suite_4tier_videos.cjs
 * Upgrades first_british_empire, second_british_empire, industrialisation_and_empire, and australia
 * to the GCSE/KS3 4-Tier Ideal Classroom Video Shelf Standard (4 videos per lesson).
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const firstEmpireVideos = [
  // Lesson 1: The East India Company & Mughal Bengal (1600–1757)
  [
    {
      id: "oNWTXaOotEA",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=oNWTXaOotEA",
      title: "How Did the British Gain Control of India? | BBC Bitesize",
      duration: "4 mins 23 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:15–03:45 | Lesson Phase: Lesson Hook | Tone Alert: Fast-paced animated overview of the transition from trade to military conquest.",
      viewing_task: "[01:10] Quick Check: What monopoly goods (calico, silk, spices, saltpetre) brought the East India Company to India in 1600?\n[03:30] Hinge Question: Did the British conquer India primarily through superior military technology or by exploiting internal rivalries among Mughal princes?",
      model_answer: "Quick Check: The Company sought valuable Asian commodities, particularly woven calico, raw silk, spices, and saltpetre for gunpowder.\nHinge Question: While British weaponry and naval power were significant, the primary driver was political opportunism: Company factors exploited the decline of the Mughal Empire by forging mercenary alliances and bribing regional princes (nawabs) against one another."
    },
    {
      id: "OxeTFB84e2k",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=OxeTFB84e2k",
      title: "How the East India Company Rose to Power | TED-Ed",
      duration: "5 mins 05 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:30–04:45 | Lesson Phase: Corporate Imperialism | Tone Alert: Explores commercial exploitation, armed trade, and the transformation of a corporation into an empire.",
      viewing_task: "[01:15] Recall: What royal charter did Queen Elizabeth I grant the East India Company on 31 December 1600?\n[02:45] Explain: How did the East India Company maintain a private mercenary army of sepoys larger than the British Army itself?\n[04:15] Challenge: How did the Battle of Plassey (1757) and the Treaty of Allahabad (1765) transfer sovereign power from the Mughal Emperor to a private board of corporate directors?",
      model_answer: "Recall: Elizabeth I granted a monopoly charter giving 218 merchants exclusive rights to trade east of the Cape of Good Hope.\nExplain: Trade profits financed the recruitment, European drill training, and modern arming of native Indian sepoys led by British officers, creating an army of over 200,000 troops to secure corporate interests.\nChallenge: Following Robert Clive's victory at Plassey through bribing Mir Jafar, the 1765 Treaty of Allahabad granted the Diwani—tax collection rights over 20 million Bengalis. The Company shifted from purchasing goods with silver bullion to extracting local taxes to fund its own commercial exports."
    },
    {
      id: "5iIIaoJ9qKU",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=5iIIaoJ9qKU",
      title: "Mangal Pandey: The Rising (2005) | Official Trailer",
      duration: "2 mins 20 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:20 | Lesson Phase: Visual & Cultural Impact | Tone Alert: High-impact Bollywood historical dramatisation depicting East India Company rule and military tension.",
      viewing_task: "[01:30] Cinematic Discussion Focus: How does this dramatisation depict the visual divide between East India Company officers and native Indian sepoys? How does cinematic framing highlight the friction between corporate commercial profit and local cultural traditions?",
      model_answer: "Cinematic Discussion Focus: The film contrasts opulent British regimental uniforms, parade drill, and colonial banquets with the traditional lives, sacred customs, and simmering grievances of sepoy soldiers, visually communicating how corporate subjugation provoked violent anti-colonial resistance."
    },
    {
      id: "1VIe42pAhuA",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=1VIe42pAhuA",
      title: "The Birth of Empire: The East India Company | BBC Select / Dan Snow",
      duration: "58 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 12:00–35:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Dan Snow explores the archives, fortresses, and corporate papers of the world's first multinational megacorporation.",
      viewing_task: "[15:30] Recall: What constitutional status did 'coastal factories' hold in 17th-century India?\n[28:10] Explain: How did Robert Clive amass his personal fortune of £300,000 following the capture of Murshidabad in 1757?\n[42:00] Challenge: To what extent was the catastrophic Bengal Famine of 1770 a direct byproduct of Company tax extraction policies?",
      model_answer: "Recall: Factories were fortified sovereign enclaves with warehouse vaults, private armed guards, and royal charters exempting them from local municipal taxes.\nExplain: Clive took massive cash kickbacks, gems, and annual land revenues ('jagirs') from the puppet Nawab Mir Jafar as personal reward for orchestrating the coup at Plassey.\nChallenge: While triggered by monsoon drought, the famine was catastrophic because Company collectors rigidly maintained and even increased land taxes, hoarded grain, and prohibited relief exports, prioritising corporate shareholder dividends over humanitarian survival."
    }
  ],
  // Lesson 2: The Transatlantic Slave Trade & The Middle Passage (1619–1807)
  [
    {
      id: "PmQvofAiZGA",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=PmQvofAiZGA",
      title: "Life Aboard a Slave Ship | HISTORY",
      duration: "5 mins 01 sec",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:20–04:30 | Lesson Phase: Forensic Evidence | Tone Alert: Sensitive content; forensic examination of the physical conditions and shackles of the Middle Passage.",
      viewing_task: "[01:30] Quick Check: How were enslaved men, women, and children segregated and physically confined below decks?\n[04:00] Hinge Question: Why did slave ship captains maintain such brutal physical confinement despite knowing it drastically increased disease and mortality rates?",
      model_answer: "Quick Check: Men were chained together in pairs by iron leg-irons in cramped lower decks with barely 2 feet of headroom, while women and children were kept unchained in separate quarters.\nHinge Question: Captains lived in perpetual terror of violent insurrection and rebellion; they prioritized total physical subjugation over captive health, calculating that financial losses from mortality were cheaper than losing the ship to an uprising."
    },
    {
      id: "3NXC4Q_4JVg",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=3NXC4Q_4JVg",
      title: "The Atlantic Slave Trade: What Too Few Textbooks Told You | TED-Ed",
      duration: "5 mins 39 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:30–05:15 | Lesson Phase: Economic Mechanics | Tone Alert: Scholarly animation breaking down the triangular trade routes and enduring global legacies.",
      viewing_task: "[01:10] Recall: What three legs made up the Triangular Trade connecting Europe, Africa, and the Americas?\n[02:50] Explain: How did British industrial manufacturing (guns, brass, textiles) directly fuel the capture of human beings along the West African coast?\n[04:40] Challenge: How did legal systems like chattel slavery define human beings as property to justify lifelong exploitation?",
      model_answer: "Recall: Outward leg (manufactured goods from Britain to Africa); Middle Passage (captive Africans transported to the Americas); Homeward leg (raw sugar, tobacco, and rum shipped back to Britain).\nExplain: European merchants traded firearms and luxury manufactured goods with coastal African leaders in exchange for war captives, creating an escalating cycle where inland states required firearms to defend themselves from slaving raids.\nChallenge: Chattel slavery legally stripped humans of personhood, declaring them commercial commodities ('goods and chattels') who could be bought, mortgaged, insured, and inherited across generations."
    },
    {
      id: "lQ6xbhXa0ag",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=lQ6xbhXa0ag",
      title: "Belle (2013) | Official Trailer (Zong Massacre & Lord Mansfield)",
      duration: "2 mins 31 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:31 | Lesson Phase: Legal & Human Drama | Tone Alert: Acclaimed biographical drama exploring Dido Elizabeth Belle and the landmark Zong massacre court case.",
      viewing_task: "[01:45] Cinematic Discussion Focus: How does the film portray the conflict in Lord Mansfield's household between aristocratic British law and the brutal commercial reality of the Zong massacre?",
      model_answer: "Cinematic Discussion Focus: The film dramatises the clash between refined English high society and the barbaric reality of the slave trade: Lord Chief Justice Mansfield must decide whether 133 enslaved Africans thrown overboard alive can legally be compensated as 'jettisoned cargo' under commercial insurance law, exposing the profound moral hypocrisy of the British legal establishment."
    },
    {
      id: "Q6Cv5P9H9qU",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=Q6Cv5P9H9qU",
      title: "Amazing Grace (2006) | Official Movie Trailer",
      duration: "2 mins 31 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 00:00–02:31 | Lesson Phase: Parliamentary Abolitionism | Tone Alert: Dramatises William Wilberforce, Thomas Clarkson, and Olaudah Equiano's campaign to abolish the slave trade.",
      viewing_task: "[01:00] Recall: What tactics did abolitionists like Thomas Clarkson and Olaudah Equiano deploy to persuade the British public?\n[01:50] Explain: Why did powerful mercantile interests in Bristol and Liverpool fiercely resist abolition for decades?\n[02:20] Challenge: How did first-hand evidence—such as the Brookes ship diagram and Equiano's autobiography—turn public opinion against the trade?",
      model_answer: "Recall: They published empirical witness accounts, displayed physical instruments of torture (shackles, thumbscrews), produced the Brookes ship diagram, and organised nationwide consumer boycotts of slave-grown sugar.\nExplain: Wealthy merchant lobbies, West Indian plantation owners, and City of London financiers held immense parliamentary influence and argued that ending the trade would destroy Britain's naval supremacy and commercial wealth.\nChallenge: By presenting incontrovertible forensic evidence directly to middle-class citizens and working people, abolitionists transformed an abstract overseas economic system into an urgent, inescapable moral crisis that Parliament could no longer dismiss."
    }
  ],
  // Lesson 3: Plantation Reality, Queen Nanny & Maroon Resistance (1655–1740)
  [
    {
      id: "MrJsmMpedQY",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=MrJsmMpedQY",
      title: "The Voice of a Maroon: Queen Nanny | Jamaica Information Service",
      duration: "2 mins 12 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:00–02:12 | Lesson Phase: Lesson Hook | Tone Alert: Official Jamaican cultural heritage overview of Queen Nanny's leadership.",
      viewing_task: "[00:50] Quick Check: In what rugged mountain range did Queen Nanny and the Windward Maroons establish their independent stronghold?\n[01:50] Hinge Question: Why did the British colonial military find it impossible to crush the Maroons despite vast superiority in soldiers and heavy artillery?",
      model_answer: "Quick Check: The Blue Mountains of eastern Jamaica.\nHinge Question: The Maroons mastered guerrilla warfare, camouflage, mountain topography, and long-range acoustic signaling using the abeng cow horn, turning the mountainous terrain into a deadly trap for heavily burdened British infantry."
    },
    {
      id: "UKfVuyFYQ6M",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=UKfVuyFYQ6M",
      title: "The Real Story of Nanny of the Maroons | Jamaica History",
      duration: "7 mins 21 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:30–06:45 | Lesson Phase: Resistance & Sovereignty | Tone Alert: Comprehensive documentary analysis of Maroon military strategy and the 1739 treaty.",
      viewing_task: "[01:30] Recall: What was Nanny Town, and how was it fortified against British incursions?\n[03:45] Explain: How did Maroon communities maintain African cultural traditions, governance systems, and agricultural autonomy?\n[05:50] Challenge: What were the ethical compromises of the 1739 Peace Treaty between the British Crown and the Maroons?",
      model_answer: "Recall: Nanny Town was a fortified village 2,000 feet up in the Blue Mountains, accessible only by a razor-thin mountain ridge that Maroons defended with boulders and snipers.\nExplain: Maroons retained West African Akan spiritual practices (Obeah), herbal medicine, communal land farming, and decentralized council governance, resisting colonial assimilation.\nChallenge: In exchange for full sovereign autonomy and 1,500 acres of land, the treaty required Maroons to capture and return newly escaped runaway enslaved people to colonial authorities and help put down internal slave rebellions, dividing Black resistance across Jamaica."
    },
    {
      id: "airEw5tG9eo",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=airEw5tG9eo",
      title: "Roots (2016) | Official Series Trailer (Plantation Life & Resistance)",
      duration: "2 mins 22 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:22 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Hard-hitting dramatisation of plantation labour, punishment, and the unyielding human struggle for identity.",
      viewing_task: "[01:15] Cinematic Discussion Focus: How does the cinematography emphasize the brutal physical regimentation of plantation agriculture? How do small acts of cultural preservation function as resistance?",
      model_answer: "Cinematic Discussion Focus: The trailer contrasts endless rows of crops and oppressive overseer surveillance with intimate moments of spiritual resistance, oral storytelling, and clandestine rebellion, showing that keeping one's true name and heritage was a profound act of defiance against chattel slavery."
    },
    {
      id: "5Cc4LaSRiSc",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=5Cc4LaSRiSc",
      title: "Empire: A Taste for Power (Episode 1) | BBC / Jeremy Paxman",
      duration: "59 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 08:30–28:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Jeremy Paxman traces how British commercial appetite for sugar, tobacco, and spices drove imperial conquest.",
      viewing_task: "[12:00] Recall: Why was Jamaican sugar referred to as 'White Gold' in 18th-century London?\n[18:30] Explain: How did British sugar consumption change from a luxury for monarchs into an everyday staple for industrial working families?\n[24:10] Challenge: How did the immense wealth generated by Caribbean sugar plantations directly finance the growth of British banks, stately homes, and the Industrial Revolution?",
      model_answer: "Recall: Sugar cane was the most profitable agricultural commodity in the world, generating vast fortunes for absentee British plantation owners.\nExplain: As imports surged and prices fell, sweetened tea became an indispensable, cheap energy source that fuelled long factory shifts for British industrial labourers.\nChallenge: Profits from slavery were funneled into London financial houses (e.g. Barclays, Bank of England), railway networks, and civic infrastructure, cementing the direct causal link between colonial exploitation and Britain's domestic modernisation."
    }
  ],
  // Lesson 4: The Thirteen Colonies, The Proclamation of 1763 & The Boston Tea Party (1763–1773)
  [
    {
      id: "3enVp7RVLFY",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=3enVp7RVLFY",
      title: "The Boston Tea Party 1773 | Simple History",
      duration: "1 min 28 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:00–01:28 | Lesson Phase: Lesson Hook | Tone Alert: Concise animated breakdown of the Sons of Liberty and the dumping of tea.",
      viewing_task: "[00:40] Quick Check: How many chests of British East India Company tea were destroyed in Boston Harbour on 16 December 1773?\n[01:15] Hinge Question: Why were American colonists so furious about a law that actually lowered the price of imported tea?",
      model_answer: "Quick Check: 342 chests.\nHinge Question: The Tea Act preserved Parliament's right to tax the colonies without their consent ('No taxation without representation') and granted the East India Company a corporate monopoly that undercut local American merchants."
    },
    {
      id: "1cT_Z0KGhP8",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=1cT_Z0KGhP8",
      title: "The Story Behind the Boston Tea Party | TED-Ed",
      duration: "3 mins 48 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:15–03:30 | Lesson Phase: Causal Escalation | Tone Alert: Engaging historical analysis of British imperial taxation and colonial resistance.",
      viewing_task: "[00:50] Recall: What was the Proclamation Line of 1763, and why did it infuriate American colonists?\n[02:00] Explain: How did the Stamp Act (1765) and Townshend Acts unite disparate American colonies against London?\n[03:10] Challenge: In what ways was the Boston Tea Party a carefully orchestrated act of political civil disobedience rather than a drunken riot?",
      model_answer: "Recall: King George III banned colonial settlement west of the Appalachian Mountains to prevent costly frontier wars with Native American nations.\nExplain: By levying direct duties on everyday paper items, glass, and tea without colonial parliamentary representation, London created a shared constitutional grievance that bridged rivalries between northern merchants and southern planters.\nChallenge: The Sons of Liberty operated with military precision: they damaged no property other than the tea, harmed no crew members, swept the decks clean afterward, and even replaced a broken padlock on one of the ships."
    },
    {
      id: "R_C_dPHEWN0",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=R_C_dPHEWN0",
      title: "The Patriot (2000) | Official Movie Trailer",
      duration: "2 mins 35 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:35 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Hollywood blockbuster dramatisation starring Mel Gibson and Heath Ledger.",
      viewing_task: "[01:30] Cinematic Discussion Focus: How does Hollywood depict the clash between rigid British redcoat military discipline and American colonial militia tactics? Does the film romanticize or oversimplify colonial motivations?",
      model_answer: "Cinematic Discussion Focus: The film contrasts the orderly, mechanical lines of the British army with the agile, woodland guerrilla tactics of colonial irregulars. However, it oversimplifies history by depicting the colonists as united freedom fighters while almost completely erasing the complex reality of slave-owning planters and Native American alliances with the British Crown."
    },
    {
      id: "CHRPY1aBPug",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=CHRPY1aBPug",
      title: "Liberty! Episode 1: The Reluctant Revolutionaries (1763–1774) | PBS",
      duration: "53 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 10:00–35:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Acclaimed landmark PBS documentary using dramatic readings of original letters and diaries.",
      viewing_task: "[14:20] Recall: What financial debt did the British government carry following the Seven Years' War (French and Indian War)?\n[22:45] Explain: How did the Boston Massacre of March 1770 become an explosive propaganda victory for Paul Revere and Samuel Adams?\n[33:15] Challenge: Why did British ministers in London view colonial resistance as dangerous lawlessness that threatened the entire British constitution?",
      model_answer: "Recall: Britain's national debt had doubled to over £130 million, convincing Parliament that American colonists should help pay for their own military defence.\nExplain: Revere's sensationalised engraving depicted British soldiers firing an unprovoked volley into a peaceful crowd of unarmed citizens, turning a chaotic street clash into an enduring symbol of imperial tyranny.\nChallenge: London believed in absolute parliamentary sovereignty: if the American colonies were exempt from parliamentary taxation, the authority of the British Crown and the rule of law across the entire empire would collapse."
    }
  ],
  // Lesson 5: The American Revolution, 1776 Declaration & The Black Loyalists (1775–1783)
  [
    {
      id: "LKJMWHCUoiw",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=LKJMWHCUoiw",
      title: "What You Might Not Know About the Declaration of Independence | TED-Ed",
      duration: "3 mins 38 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:00–03:38 | Lesson Phase: Lesson Hook | Tone Alert: Analytical breakdown of the philosophical contradictions at the heart of the 1776 Declaration.",
      viewing_task: "[01:10] Quick Check: Who drafted the American Declaration of Independence in Philadelphia in July 1776?\n[02:40] Hinge Question: How could the Declaration assert that 'all men are created equal' when its authors held hundreds of human beings in chattel slavery?",
      model_answer: "Quick Check: Thomas Jefferson.\nHinge Question: The founders viewed 'equality' as applying exclusively to propertied white men; a drafted paragraph condemning King George III for the slave trade was deliberately deleted to maintain political unity with wealthy southern slaveholders."
    },
    {
      id: "E7yNN_g0Blo",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=E7yNN_g0Blo",
      title: "Who Were the Black Loyalists? | Black Loyalist Heritage Centre",
      duration: "5 mins 40 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:20–05:10 | Lesson Phase: Deep Forensic Enquiry | Tone Alert: Rigorous historical investigation into Lord Dunmore's Proclamation and the Book of Negroes.",
      viewing_task: "[01:15] Recall: What offer did Lord Dunmore make to enslaved people in November 1775?\n[02:50] Explain: How did Black Loyalist regiments like the Ethiopian Regiment fight for the British Crown in exchange for liberty?\n[04:30] Challenge: What was the 'Book of Negroes', and how did it protect 3,000 Black Loyalists during the British evacuation of New York in 1783?",
      model_answer: "Recall: Dunmore promised immediate freedom to any enslaved person owned by rebel colonists who escaped and joined the King's armed forces.\nExplain: Wearing uniforms emblazoned with 'Liberty to Slaves', hundreds of escapees served as scouts, infantrymen, and river pilots, fighting not out of loyalty to Britain, but for their own liberation.\nChallenge: General Guy Carleton refused George Washington's demands to return escaped enslaved people as property; British naval officers recorded names, physical descriptions, and escape details in a ledger called the Book of Negroes, granting them certificates of freedom to evacuate to Nova Scotia."
    },
    {
      id: "QNHG_3-Zad8",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=QNHG_3-Zad8",
      title: "The Book of Negroes (2015) | Official Trailer (BET / CBC)",
      duration: "2 mins 20 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:20 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Award-winning historical miniseries starring Aunjanue Ellis and Cuba Gooding Jr.",
      viewing_task: "[01:15] Cinematic Discussion Focus: How does the dramatisation depict Aminata Diallo's role in recording the names and stories of Black Loyalists escaping to Nova Scotia? Why is the act of official documentation so powerful?",
      model_answer: "Cinematic Discussion Focus: The trailer dramatises how an official ledger and written freedom certificate transformed vulnerable human beings from hunted 'fugitive property' into legally recognised free British subjects, demonstrating how literacy and documentation became tools of liberation."
    },
    {
      id: "CHRPY1aBPug",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=CHRPY1aBPug",
      title: "Liberty! The American Revolution: Blows Must Decide | PBS",
      duration: "53 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 20:00–45:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Explores the outbreak of war at Lexington and Concord and the ideological birth of the American republic.",
      viewing_task: "[22:00] Recall: What happened on Lexington Green on 19 April 1775 ('the shot heard 'round the world')?\n[31:00] Explain: How did Thomas Paine's radical pamphlet 'Common Sense' transform a dispute over taxes into a crusade for total independence?\n[40:15] Challenge: How did French military and naval intervention under General Rochambeau seal British defeat at the Siege of Yorktown in 1781?",
      model_answer: "Recall: British regulars clashed with colonial minutemen, sparking a running battle along the road to Boston that began the Revolutionary War.\nExplain: Paine wrote in simple, fiery prose for common working people, arguing that it was absurd for a tiny island across the ocean to govern an entire continent, and that hereditary monarchy was inherently corrupt.\nChallenge: Without the French navy blockading the Chesapeake Bay to cut off British naval resupply, General Cornwallis would have been evacuated by sea; the Franco-American alliance transformed a colonial rebellion into an unwinnable global war for Britain."
    }
  ]
];

const secondEmpireVideos = [
  // Lesson 1: How was the British Empire built and sustained?
  [
    {
      id: "lisGM1frnjg",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=lisGM1frnjg",
      title: "How the British Empire Became Powerful | Captain History",
      duration: "6 mins 14 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:20–04:45 | Lesson Phase: Lesson Hook | Tone Alert: Rapid-fire overview of naval power, chartered companies, and industrial dominance.",
      viewing_task: "[01:30] Quick Check: What role did the Royal Navy play in protecting British global commerce?\n[03:45] Hinge Question: Was the British Empire built primarily by private commercial traders or by the British state and military?",
      model_answer: "Quick Check: The Royal Navy secured global sea routes, eliminated rival fleets, protected merchant convoys, and enforced gunboat diplomacy.\nHinge Question: While the British state provided naval backing, the vanguard of empire was private enterprise: chartered corporations, venture capitalists, and merchant syndicates conquered territories for commercial profit before the Crown assumed administrative control."
    },
    {
      id: "fQktE-YKlJg",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=fQktE-YKlJg",
      title: "The Early British Empire | Ten Minute History",
      duration: "9 mins 59 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 01:00–08:30 | Lesson Phase: Causal Framework | Tone Alert: Dense, informative animated cartography tracing imperial growth across four continents.",
      viewing_task: "[02:30] Recall: What was the economic doctrine of mercantilism, and how did it govern colonial trade?\n[05:15] Explain: How did Britain pivot from its Atlantic empire to its Second Empire in Asia and Africa following the loss of the Thirteen Colonies?\n[07:45] Challenge: How did telegraph lines, steamships, and railway networks transform imperial administration in the 19th century?",
      model_answer: "Recall: Mercantilism dictated that colonies existed solely to provide raw materials to the mother country and purchase British manufactured goods, banning direct trade with rival nations.\nExplain: After losing America in 1783, Britain redirected its imperial focus toward India, Singapore, Australia, and Africa, prioritising territorial extraction and global trade routes.\nChallenge: Steam engines and underwater telegraph cables compressed transit times from months to hours, allowing Whitehall civil servants to exert instant, centralized military and economic control over distant colonies."
    },
    {
      id: "T504u17Ao9A",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=T504u17Ao9A",
      title: "Victoria & Abdul (2017) | Official Trailer (Focus Features)",
      duration: "2 mins 25 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:25 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Period drama starring Judi Dench exploring the racial and social hierarchies of Victorian court life.",
      viewing_task: "[01:15] Cinematic Discussion Focus: How does the film portray Queen Victoria's Empress of India title alongside the deep-seated racial prejudice of her royal household and ministers?",
      model_answer: "Cinematic Discussion Focus: The film contrasts Queen Victoria's genuine personal affection for her Indian clerk Abdul Karim with the rigid racism and colonial condescension of the British royal court, illustrating how Victorian imperialists viewed Indian subjects as intrinsically inferior."
    },
    {
      id: "5Cc4LaSRiSc",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=5Cc4LaSRiSc",
      title: "Empire: A Taste for Power (Episode 1) | BBC / Jeremy Paxman",
      duration: "59 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 30:00–55:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Paxman explores how imperial rule was sustained across diverse cultures.",
      viewing_task: "[32:00] Recall: How did a tiny cadre of British district officers govern hundreds of millions of imperial subjects?\n[40:15] Explain: What role did local elites, collaborating princes, and native police forces play in sustaining British authority?\n[49:00] Challenge: To what extent was British imperial rule sustained by the implicit threat of overwhelming military violence rather than consent?",
      model_answer: "Recall: Through a combination of indirect rule, divide-and-rule diplomacy, and prestige ceremonies.\nExplain: The British co-opted local rulers by preserving their royal titles and wealth while requiring them to collect taxes and maintain order on behalf of the British Resident.\nChallenge: Although daily administration relied on local collaboration, British power rested on the absolute willingness to deploy Maxim machine guns, gunboats, and public collective punishments whenever defiance arose."
    }
  ],
  // Lesson 2: How did corporate exploitation spark the 1857 Indian Rebellion?
  [
    {
      id: "a9tIOf-gvuA",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=a9tIOf-gvuA",
      title: "The Indian Mutiny | Timelines.tv History of Britain C07",
      duration: "5 mins 30 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:15–04:45 | Lesson Phase: Lesson Hook | Tone Alert: Archival paintings and location filming at Meerut and Delhi.",
      viewing_task: "[01:10] Quick Check: What rumor regarding Enfield rifle cartridges triggered mutiny among Hindu and Muslim sepoys at Meerut in May 1857?\n[03:40] Hinge Question: Was the 1857 uprising merely a religious mutiny over greased cartridges, or a broad national rebellion against decades of economic and cultural subjugation?",
      model_answer: "Quick Check: Cartridges were rumored to be greased with cow fat (sacred to Hindus) and pig fat (forbidden to Muslims), requiring soldiers to bite them open.\nHinge Question: The cartridge crisis was merely the spark: the underlying fuel was deep public fury over corporate land confiscations (Doctrine of Lapse), exorbitant land taxes, cultural arrogance, and Christian missionary interference."
    },
    {
      id: "rGoPN3WOBxU",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=rGoPN3WOBxU",
      title: "The Indian Rebellion of 1857 | Then & Now",
      duration: "5 mins 19 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:20–04:50 | Lesson Phase: Structural Analysis | Tone Alert: Analytical breakdown of the rebellion's causes and the Crown takeover.",
      viewing_task: "[01:15] Recall: What was Governor-General Dalhousie's 'Doctrine of Lapse'?\n[02:45] Explain: Why did mutinous sepoys march directly to Delhi to proclaim the elderly Mughal Emperor Bahadur Shah Zafar as leader?\n[04:20] Challenge: How did the 1858 Government of India Act dismantle the East India Company and inaugurate the direct British Raj?",
      model_answer: "Recall: A policy allowing the Company to annex any princely state whose ruler died without a direct biological male heir, disinheriting adopted heirs.\nExplain: Sepoys recognized that only the historic Mughal emperor possessed the symbolic, legitimate sovereignty needed to unite both Hindu and Muslim factions across India against British rule.\nChallenge: The rebellion shocked Parliament into recognizing that a profit-seeking corporation could no longer be trusted to govern a subcontinent. Parliament dissolved the Company's powers and transferred all sovereignty directly to Queen Victoria, establishing the British Raj."
    },
    {
      id: "5iIIaoJ9qKU",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=5iIIaoJ9qKU",
      title: "Mangal Pandey: The Rising (2005) | Official Trailer",
      duration: "2 mins 20 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:20 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Dramatises sepoy Mangal Pandey's defiance at Barrackpore.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does the film frame Mangal Pandey's individual act of rebellion as the awakening of Indian national consciousness against colonial tyranny?",
      model_answer: "Cinematic Discussion Focus: The trailer visually elevates Pandey from an obedient soldier into an anti-colonial martyr: his refusal to bite the greased cartridge is framed as a sacred defense of personal honour, religion, and freedom from corporate oppression."
    },
    {
      id: "0r18gI2iw1k",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=0r18gI2iw1k",
      title: "Indian Rebellion of 1857–59: Walking the Battlefields | Redcoat History",
      duration: "46 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 10:00–35:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: On-the-ground historical battlefield tour examining the Siege of Delhi, Cawnpore, and Lucknow.",
      viewing_task: "[14:00] Recall: What occurred during the Siege of Cawnpore (Kanpur) and the Bibighar massacre?\n[24:30] Explain: How did British forces respond to news of atrocities against European women and children with savage collective retribution?\n[38:15] Challenge: How did the racial divide and military restructuring of the Indian Army change after 1858 to prevent another uprising?",
      model_answer: "Recall: British troops surrendered under promise of safe passage but were fired upon at Satichaura Ghat; surviving women and children were later killed at the Bibighar.\nExplain: British forces engaged in indiscriminate retaliatory violence: burning entire villages, hanging suspects without trial, and blowing rebel sepoys from the mouths of cannons.\nChallenge: The British permanently altered troop ratios (increasing British soldiers to one-third of the total force), banned Indians from operating heavy artillery, and aggressively recruited from groups deemed 'martial races' (such as Sikhs and Gurkhas) who had remained loyal."
    }
  ],
  // Lesson 3: How did settler colonialism transform Australia? (1788–1854)
  [
    {
      id: "MnUNEkMsjfY",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=MnUNEkMsjfY",
      title: "First Fleet: Journey to Botany Bay & Sydney Cove | Behind the News",
      duration: "4 mins 36 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:20–04:10 | Lesson Phase: Lesson Hook | Tone Alert: Accessible, engaging Australian public broadcasting overview for schools.",
      viewing_task: "[01:00] Quick Check: Why did the British government establish a penal colony in New South Wales in 1788?\n[03:30] Hinge Question: How did the British legal doctrine of 'Terra Nullius' (nobody's land) erase 65,000 years of Indigenous land management and sovereignty?",
      model_answer: "Quick Check: Overcrowding in British prisons following the loss of the American colonies (which had previously taken transported convicts).\nHinge Question: The British declared Australia 'terra nullius' because Indigenous peoples did not cultivate land with European fences, agriculture, or deeds, using this legal fiction to justify seizing land without treaty or compensation."
    },
    {
      id: "qzae5dqfOnE",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=qzae5dqfOnE",
      title: "The Frontier Wars: Australia’s Forgotten Conflicts | SBS The Feed",
      duration: "3 mins 08 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:00–03:08 | Lesson Phase: Forensic Evidence | Tone Alert: Investigates the violent clashes between pastoral settlers and Indigenous resistance fighters.",
      viewing_task: "[00:50] Recall: What weapon and environmental advantages did pastoralists possess over Aboriginal defenders?\n[01:45] Explain: How did resistance leaders like Pemulwuy conduct guerrilla warfare against colonial settlements around Sydney?\n[02:40] Challenge: Why were the Frontier Wars omitted from traditional Australian national histories for over a century?",
      model_answer: "Recall: Pastoralists had horses, firearms, and colonial police escorts, while pastoral sheep and cattle rapidly destroyed native food sources and waterholes.\nExplain: Pemulwuy led coordinated nighttime raids, burning colonial crops, ambushing supply wagons, and retreating into rugged bushland where British infantry could not track him.\nChallenge: Acknowledging the Frontier Wars shattered the founding myth of peaceful settlement and confronted the nation with state-sanctioned land dispossession and massacres."
    },
    {
      id: "BDepKiFIt5A",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=BDepKiFIt5A",
      title: "The Secret River (2015) | Extended Official Trailer (ABC / BBC)",
      duration: "2 mins 01 sec",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:01 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Harrowing dramatisation of convict settler William Thornhill's claim on Dharug land on the Hawkesbury River.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does the dramatisation depict the tragic collision between an emancipated convict desperate for land and the Dharug people defending their ancestral home?",
      model_answer: "Cinematic Discussion Focus: The trailer captures the moral tragedy of settler colonialism: poor British convicts who suffered brutal oppression at home become ruthless oppressors themselves, taking up firearms to dispossess Indigenous families to secure their own private property."
    },
    {
      id: "Z7_1avVKDwc",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=Z7_1avVKDwc",
      title: "First Australians: They Have Come to Stay (Episode 1) | SBS / Rachel Perkins",
      duration: "53 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 15:00–40:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Essential First Nations perspective directed by Arrernte filmmaker Rachel Perkins.",
      viewing_task: "[18:00] Recall: How did Governor Arthur Phillip attempt to forge diplomatic relations through kidnapping Bennelong?\n[27:30] Explain: What impact did the 1789 smallpox epidemic have on the Eora clans around Sydney Harbour?\n[38:15] Challenge: How did Bennelong navigate the impossible cultural bridge between British colonial authorities and his own people?",
      model_answer: "Recall: Phillip ordered Bennelong captured and brought to Government House to serve as a cultural intermediary and translator.\nExplain: Smallpox decimated over 50% of the local Indigenous population within months, devastating social structures, elders, and resistance capability.\nChallenge: Bennelong learned English, adopted Western dress, and travelled to London to meet King George III, but returned to find himself alienated from both colonial society and his own traumatised community."
    }
  ],
  // Lesson 4: Why did European powers scramble for Africa, and how was empire justified?
  [
    {
      id: "DduN1cU2p9U",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=DduN1cU2p9U",
      title: "What Was the 'Scramble for Africa'? | BBC What's New",
      duration: "3 mins 00 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:00–03:00 | Lesson Phase: Lesson Hook | Tone Alert: Concise introduction to the 1884–85 Berlin Conference and colonial partition.",
      viewing_task: "[00:55] Quick Check: What percentage of Africa was under European control in 1870 compared to 1914?\n[02:15] Hinge Question: Why were zero African leaders invited to the 1884 Berlin Conference where their continent was carved up?",
      model_answer: "Quick Check: Roughly 10% in 1870 surged to approximately 90% by 1914.\nHinge Question: European imperial powers viewed Africa purely as commercial territory to be divided among themselves; racist imperial ideology dismissed African nations as uncivilised and lacking legitimate sovereign rights."
    },
    {
      id: "drd_O2kdTtY",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=drd_O2kdTtY",
      title: "The Scramble for Africa | Timelines.tv",
      duration: "4 mins 58 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:20–04:40 | Lesson Phase: Causal Breakdown | Tone Alert: Rigorous analysis of technological catalysts (Maxim gun, quinine, steamships) and raw material extraction.",
      viewing_task: "[01:10] Recall: What three technological breakthroughs enabled Europeans to penetrate the African interior in the late 19th century?\n[02:30] Explain: How did industrial capitalism drive the search for raw materials (rubber, copper, palm oil, cotton) and captive consumer markets?\n[04:00] Challenge: How did imperial ideologies like 'The Civilising Mission' and Social Darwinism serve to justify ruthless plunder?",
      model_answer: "Recall: Quinine (preventing malaria), the steamship (navigating inland rivers), and the Maxim machine gun (delivering overwhelming firepower).\nExplain: European factories required massive supplies of industrial raw materials (copper for electrical wiring, rubber for tyres) while domestic markets were saturated, compelling governments to seize protected imperial trade zones.\nChallenge: Imperialists framed conquest as a noble humanitarian obligation ('The White Man's Burden') to bring Christianity, commerce, and civilization, disguising ruthless resource theft behind moral benevolence."
    },
    {
      id: "6WuoiR0I8Es",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=6WuoiR0I8Es",
      title: "Zulu (1964) | Original Movie Trailer (Michael Caine / Stanley Baker)",
      duration: "2 mins 24 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:24 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Classic cinema depicting the 1879 Battle of Rorke's Drift during the Anglo-Zulu War.",
      viewing_task: "[01:15] Cinematic Discussion Focus: How does the film frame British imperial soldiers facing the Zulu impi? How does cinema shape public memory of imperial military conflicts?",
      model_answer: "Cinematic Discussion Focus: The film depicts British soldiers as heroic underdogs defending an isolated outpost with stoic discipline, while presenting Zulu warriors as brave and disciplined. However, the film omits the aggressive British invasion of Zululand that triggered the war and ignores the broader catastrophe of British colonial annexation."
    },
    {
      id: "5Cc4LaSRiSc",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=5Cc4LaSRiSc",
      title: "Empire: Scramble for Africa & Imperial Ideology | BBC / Jeremy Paxman",
      duration: "59 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 18:00–42:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Investigates Cecil Rhodes, the British South Africa Company, and Victorian racial theories.",
      viewing_task: "[20:30] Recall: What was Cecil Rhodes' vision of a 'Cape to Cairo' railway?\n[30:00] Explain: How did private chartered companies like the British South Africa Company conquer territory ahead of formal government annexation?\n[39:45] Challenge: How did the arbitrary borders drawn by European diplomats in 1885 create enduring ethnic and political conflict across modern Africa?",
      model_answer: "Recall: Rhodes dreamed of an unbroken stretch of British colonial territory spanning the entire length of Africa from South Africa to Egypt.\nExplain: Chartered companies used private mercenary forces equipped with Maxim guns to coerce local chiefs into mineral concessions before handing governed territories to the Crown.\nChallenge: European diplomats drew straight-line borders slicing across existing ethnic, linguistic, and ecological boundaries, trapping rival nations inside single artificial states and dividing cohesive communities."
    }
  ],
  // Lesson 5: Who truly benefited from the British Empire?
  [
    {
      id: "HnXenihxSeg",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=HnXenihxSeg",
      title: "Was the British Empire a Force for Good? (Part 1) | BBC Bitesize",
      duration: "6 mins 24 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:20–05:30 | Lesson Phase: Historiographical Debate | Tone Alert: Balanced debate exploring infrastructure, railways, and legal codes vs exploitation and famine.",
      viewing_task: "[01:30] Quick Check: What infrastructure did the British construct in India, and who primarily paid for it?\n[04:45] Hinge Question: Were imperial railways built primarily to benefit the Indian public or to transport British troops and extract raw materials to ports?",
      model_answer: "Quick Check: Over 25,000 miles of railways and irrigation canals, funded entirely through taxes extracted from Indian taxpayers.\nHinge Question: While Indians eventually used railways for travel, their primary strategic purpose was colonial control: rapidly deploying troops to quell uprisings and funnelling raw cotton, coal, and grain straight to coastal ports for export to Britain."
    },
    {
      id: "qpHlkfPSo8o",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=qpHlkfPSo8o",
      title: "Was the British Empire a Force for Good? (Part 2) | BBC Bitesize",
      duration: "7 mins 18 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:30–06:30 | Lesson Phase: Deep Historiographical Synthesis | Tone Alert: Evaluates the human cost, deindustrialisation of native economies, and unequal power dynamics.",
      viewing_task: "[01:45] Recall: How did British tariffs destroy the traditional Indian handloom textile industry?\n[03:50] Explain: What role did free-market dogma play in British government inaction during imperial famines in India and Ireland?\n[05:40] Challenge: In evaluating whether the empire was a 'force for good', why must historians examine whose voices and perspectives are being prioritized?",
      model_answer: "Recall: Britain slapped heavy import duties on Indian textiles while flooding Indian markets tariff-free with cheap factory cloth from Manchester, wiping out millions of Indian weavers.\nExplain: Colonial administrators adhered to strict laissez-faire economic dogma, refusing to intervene in grain markets or provide price controls even as millions starved.\nChallenge: Pro-empire arguments typically reflect the perspectives of British elites who profited, whereas colonized populations bore the devastating costs of land loss, racial discrimination, deindustrialisation, and loss of sovereignty."
    },
    {
      id: "5y8DZUShVis",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=5y8DZUShVis",
      title: "Gandhi (1982) | Official Movie Trailer (Ben Kingsley / Richard Attenborough)",
      duration: "2 mins 56 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:56 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Multi-Oscar-winning historical epic depicting satyagraha and the dismantling of the British Raj.",
      viewing_task: "[01:40] Cinematic Discussion Focus: How does the film frame Mahatma Gandhi's strategy of non-violent civil disobedience against the military might of the British Empire?",
      model_answer: "Cinematic Discussion Focus: The trailer visually contrasts humble, spinning-wheel simplicity with opulent British viceregal splendour, demonstrating how moral resistance and non-violent mass protest exposed the ethical bankruptcy of colonial rule."
    },
    {
      id: "0r18gI2iw1k",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=0r18gI2iw1k",
      title: "The Legacy of the British Empire | Historical Analysis & Evidence",
      duration: "46 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 15:00–38:00 | Lesson Phase: Synoptic Review | Tone Alert: Deep critical assessment of the economic, cultural, and political legacy of the British Empire.",
      viewing_task: "[18:30] Recall: What was the 'drain of wealth' theory articulated by Indian nationalists like Dadabhai Naoroji?\n[28:00] Explain: How did the British divide-and-rule strategy exacerbate religious divisions that led to the bloody Partition of India in 1947?\n[36:00] Challenge: How does the legacy of the British Empire continue to shape modern British society, multiculturalism, and global economics?",
      model_answer: "Recall: Naoroji calculated that Britain siphoned billions of pounds in tax revenue and resources out of India without any economic return.\nExplain: By creating separate electorates for religious communities and playing political factions against each other, the British deepened communal divisions that culminated in the violent Partition of 1947, costing over a million lives.\nChallenge: The empire built Britain's global financial institutions, shaped its language, and created its rich multicultural population as Commonwealth citizens migrated to help rebuild post-war Britain."
    }
  ]
];

const industrialisationVideos = [
  // Lesson 1: What powered the Industrial Revolution, and how did a Fareham ironmaster change the world?
  [
    {
      id: "local_funtley_weir",
      type: "local",
      url: "/videos/local_funtley_weir.mp4",
      title: "Funtley Ironworks: River Meon Hydraulic Weir & Mill Race Flow (Fieldwork Footage)",
      duration: "0 mins 06 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:00–00:06 | Lesson Phase: Local Fieldwork Hook | Tone Alert: Primary archaeological footage of Henry Cort's hydraulic water system at Funtley, Fareham.",
      viewing_task: "[00:03] Quick Check: What natural energy source powered Henry Cort's rolling mill at Funtley Ironworks?\n[00:05] Hinge Question: Why was water power still essential to early industrial ironmasters before steam power fully took over?",
      model_answer: "Quick Check: The flowing hydraulic water of the River Meon via a mill race and weir.\nHinge Question: Early steam engines were fuel-heavy and expensive; waterwheels provided reliable, free mechanical power to drive heavy trip-hammers and rolling mills before coal networks expanded."
    },
    {
      id: "AVo7e5ZExX4",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=AVo7e5ZExX4",
      title: "Iron and Industry | Timelines.tv",
      duration: "7 mins 12 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:30–06:30 | Lesson Phase: Technological Breakthrough | Tone Alert: Explores Abraham Darby at Coalbrookdale and Henry Cort's puddling process.",
      viewing_task: "[01:30] Recall: What breakthrough did Abraham Darby achieve by smelting iron with coke instead of charcoal?\n[03:45] Explain: How did Henry Cort's 1783–84 'puddling and rolling' process transform pig iron into mass-produced wrought iron?\n[05:30] Challenge: In what ways did cheap, mass-produced wrought iron provide the physical skeleton of the modern industrial world?",
      model_answer: "Recall: Smelting with coke freed iron production from wood shortages and allowed blast furnaces to burn much hotter and produce vast quantities of iron.\nExplain: Cort stirred molten iron in a reverberatory furnace to burn off impurities ('puddling') and passed red-hot iron through grooved rollers, increasing production fifteen-fold.\nChallenge: Cort's wrought iron enabled the construction of iron bridges, steam locomotive rails, factory beams, and iron-hulled ships, driving global industrialization."
    },
    {
      id: "Dj5h1kKjVYc",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=Dj5h1kKjVYc",
      title: "Peterloo (2018) | Official Trailer (Amazon Studios / Mike Leigh)",
      duration: "2 mins 24 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:24 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Mike Leigh's historical drama depicting the industrial working class and political disenfranchisement.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does the film depict the stark contrast between wealthy magistrates and the impoverished cotton mill workers of northern England?",
      model_answer: "Cinematic Discussion Focus: The film contrasts opulent drawing rooms and well-fed magistrates with the deafening noise, pale faces, and dangerous machinery of the cotton mills, illustrating how industrial progress enriched elites while immiserating working people."
    },
    {
      id: "era_black_british_cotton",
      type: "era",
      url: "https://eduvids.org/embed/black-british-cotton",
      title: "Black and British: A Forgotten History — Moral Mission (Mississippi Cotton) | BBC Two / David Olusoga",
      duration: "10 mins 15 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 00:00–10:15 | Lesson Phase: Global Interconnection | Tone Alert: David Olusoga connects Lancashire cotton mills with enslaved labour in the American South.",
      viewing_task: "[02:30] Recall: What percentage of raw cotton processed in Lancashire mills originated from enslaved labour in the American Deep South?\n[05:45] Explain: How did the mechanised British textile industry create an insatiable global demand for slave-grown cotton?\n[08:20] Challenge: How did the 1860s Lancashire Cotton Famine demonstrate the direct economic dependence of British factory workers on transatlantic slavery?",
      model_answer: "Recall: Over 75% of raw cotton came from enslaved labour.\nExplain: Inventions like the spinning jenny and power loom vastly increased manufacturing speed, creating massive demand for raw cotton that drove the expansion of brutal chattel slavery across the American South.\nChallenge: When the American Civil War cut off southern cotton exports, hundreds of thousands of Lancashire workers were thrown into starvation and unemployment, exposing how British industrial wealth was inextricably linked to human enslavement."
    }
  ],
  // Lesson 2: Was industrial work progress or punishment?
  [
    {
      id: "1PmHBqtLFss",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=1PmHBqtLFss",
      title: "Horrific Working Conditions Experienced by Children | Channel 4",
      duration: "4 mins 11 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:15–03:50 | Lesson Phase: Forensic Primary Evidence | Tone Alert: Dramatic readings from 1830s parliamentary factory inquiry records.",
      viewing_task: "[01:00] Quick Check: What specific physical tasks were child 'scavengers' and 'piecers' forced to perform under moving cotton machinery?\n[03:20] Hinge Question: Why did Victorian mill owners prefer hiring children and women rather than adult men?",
      model_answer: "Quick Check: Scavengers crawled underneath running machinery to sweep dust and lint; piecers tied broken threads while dodging moving carriage frames.\nHinge Question: Mill owners could pay children and women a fraction of adult male wages, and children were small enough to fit beneath looms and more easily disciplined through physical beatings."
    },
    {
      id: "BUnCmpD78Dg",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=BUnCmpD78Dg",
      title: "Factories and Machines | Timelines.tv",
      duration: "6 mins 45 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:30–06:00 | Lesson Phase: Factory Discipline | Tone Alert: Examines Richard Arkwright's Cromford Mill and the transition from cottage industry to clock-time discipline.",
      viewing_task: "[01:20] Recall: How did Richard Arkwright's water frame mechanize yarn spinning in 1769?\n[03:10] Explain: How did factory discipline transform human concepts of time from natural seasonal rhythms into rigid factory clock time?\n[05:00] Challenge: How did parliamentary Factory Acts (1833, 1847) gradually establish state regulation over unregulated laissez-faire capitalism?",
      model_answer: "Recall: It used spinning rollers powered by a waterwheel to produce strong, consistent cotton warp yarn on an unprecedented industrial scale.\nExplain: Workers who previously controlled their own work pace in cottage workshops were subjected to strict factory bells, 14-hour shifts, fines for lateness, and dismissal for speaking.\nChallenge: The 1833 Act banned children under nine and limited hours, introducing the first government factory inspectors and establishing the principle that the state had a moral duty to restrict unrestricted corporate exploitation."
    },
    {
      id: "Ry2ULl8osu4",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=Ry2ULl8osu4",
      title: "Oliver Twist (2005) | Official Trailer (Roman Polanski / Ben Kingsley)",
      duration: "2 mins 10 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:10 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Dickensian depiction of workhouse labour, child poverty, and London underworld.",
      viewing_task: "[01:00] Cinematic Discussion Focus: How does Polanski visually portray the sensory deprivation, cruelty, and hunger of the Victorian workhouse system?",
      model_answer: "Cinematic Discussion Focus: The trailer contrasts cold stone walls, uniform workhouse smocks, and meager gruel with the corpulent, well-fed board members, dramatizing Charles Dickens' fierce critique of the 1834 Poor Law."
    },
    {
      id: "87eVOpbcoVo",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=87eVOpbcoVo",
      title: "The Children Who Built Victorian Britain | BBC / Prof Jane Humphries",
      duration: "9 mins 45 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 00:30–09:00 | Lesson Phase: In-Depth Historical Evidence | Tone Alert: Economic historian Jane Humphries uses working-class autobiographies to expose child labour.",
      viewing_task: "[02:15] Recall: How many child workers were employed across British factories, mines, and workshops at the peak of the Industrial Revolution?\n[05:00] Explain: How did the 'parish apprentice' system legally transfer pauper orphans from London workhouses directly into northern cotton mills?\n[08:15] Challenge: Why does Professor Humphries argue that Britain's industrial ascendancy was built literally upon the backs and bones of child labourers?",
      model_answer: "Recall: Over a million child workers, accounting for up to 15% of the total industrial labor force.\nExplain: London parishes saved money by signing binding indenture papers transferring destitute orphan children hundreds of miles north to mill owners who housed them in apprentice houses.\nChallenge: Cheap, compliant child labor provided the vital profit margins that enabled British factories to undercut international competitors and fund further industrial expansion."
    }
  ],
  // Lesson 3: Did industrialisation make British towns unlivable?
  [
    {
      id: "oHhqzoqFqew",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=oHhqzoqFqew",
      title: "The Growth of Industry & Factory Towns | BBC Bitesize",
      duration: "4 mins 17 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:15–03:45 | Lesson Phase: Urbanisation Hook | Tone Alert: Explores rapid urban migration, back-to-back housing, and pollution.",
      viewing_task: "[01:10] Quick Check: What happened to the population of industrial cities like Manchester and Birmingham between 1800 and 1850?\n[03:20] Hinge Question: Why did life expectancy in industrial cities drop to under 20 years for working-class labourers?",
      model_answer: "Quick Check: Populations exploded three-to-fourfold as rural families flooded into cities seeking factory work.\nHinge Question: Overcrowded back-to-back housing lacked sewers, running water, or ventilation; human cesspools seeped into drinking pumps, spreading lethal cholera and typhus epidemics."
    },
    {
      id: "SrrXUN7S_Ys",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=SrrXUN7S_Ys",
      title: "Urban Slums: Manchester & Industrial Living Conditions | Timelines.tv",
      duration: "6 mins 55 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:30–06:20 | Lesson Phase: Social Investigation | Tone Alert: Quotes Friedrich Engels and examines Victorian sanitation reports.",
      viewing_task: "[01:30] Recall: What conditions did Friedrich Engels document when inspecting Manchester's 'Little Ireland' in 1844?\n[03:45] Explain: How did the lack of urban planning and absent building regulations lead to cellar dwellings and open sewer ditches?\n[05:40] Challenge: How did the fear of cholera in wealthy neighborhoods eventually compel the British government to intervene in public health?",
      model_answer: "Recall: He found hundreds of people sharing single overflowing privy pits, unpaved muddy alleys filled with animal waste, and damp cellar dwellings housing whole families.\nExplain: Speculative landlords threw up shoddy back-to-back houses without foundations, drains, or ventilation to maximize rental yield from desperate migrant workers.\nChallenge: Cholera was waterborne and did not respect social class: when lethal epidemics spread from slums to affluent districts, wealthy ratepayers and MPs were finally forced to pass public health legislation."
    },
    {
      id: "Ry2ULl8osu4",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=Ry2ULl8osu4",
      title: "Oliver Twist: Victorian London Street Life & Slums | Drama Scene",
      duration: "2 mins 10 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:10 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Gritty, atmospheric depiction of London's dense slums and street children.",
      viewing_task: "[01:15] Cinematic Discussion Focus: How does the film capture the sensory environment of Victorian London (mud, soot, crowding, and visual darkness)?",
      model_answer: "Cinematic Discussion Focus: The film immerses the viewer in choking smoke, narrow labyrinthine alleys, and filthy gutters, visually conveying the sensory assault of unmanaged 19th-century urbanization."
    },
    {
      id: "lOIp7pOMrkI",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=lOIp7pOMrkI",
      title: "How The Victorians Ended London's Great Stink | History Documentaries",
      duration: "12 mins 40 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 01:00–11:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Fascinating engineering history of Joseph Bazalgette and the London sewer network.",
      viewing_task: "[02:30] Recall: What caused the 'Great Stink' of London in the blazing summer of 1858?\n[06:00] Explain: How did Chief Engineer Joseph Bazalgette design and build an interconnected underground brick sewer system to divert waste away from the Thames?\n[09:45] Challenge: How did Bazalgette's Victorian sewers permanently eradicate waterborne cholera from London even before Germ Theory was accepted?",
      model_answer: "Recall: Over 2 million people's untreated sewage flowed directly into the River Thames, which baked in extreme heat, producing an unbearable stench that disrupted Parliament.\nExplain: He constructed 82 miles of massive brick-lined intercepting sewers parallel to the river using Portland cement, intercepting sewage and carrying it eastward to the Thames estuary.\nChallenge: Although built on the mistaken belief that disease spread via bad smells ('miasma'), diverting sewage away from the river simultaneously eliminated the cholera bacterium from London's drinking water."
    }
  ],
  // Lesson 4: How did ordinary people fight for a voice?
  [
    {
      id: "UMig-6w2gNM",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=UMig-6w2gNM",
      title: "Peterloo Massacre: A Turning Point in UK History? | BBC Newsnight",
      duration: "4 mins 15 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:15–03:50 | Lesson Phase: Lesson Hook | Tone Alert: Analytical news piece exploring the 1819 massacre and its 200-year legacy.",
      viewing_task: "[01:00] Quick Check: How many peaceful working-class protesters gathered at St Peter's Field, Manchester, on 16 August 1819?\n[03:10] Hinge Question: Why were local magistrates so terrified of an unarmed crowd carrying banners demanding the right to vote?",
      model_answer: "Quick Check: Approximately 60,000 men, women, and children dressed in their Sunday best.\nHinge Question: The ruling elite remembered the French Revolution and feared that working-class demands for parliamentary reform and cheaper bread were a prelude to violent revolution and property confiscation."
    },
    {
      id: "pyMOo52H05E",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=pyMOo52H05E",
      title: "The Peterloo Massacre (1819) | Timelines.tv",
      duration: "6 mins 31 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:30–06:00 | Lesson Phase: Forensic Causal Breakdown | Tone Alert: Detailed historical breakdown of the cavalry charge and government repression.",
      viewing_task: "[01:20] Recall: Who was Henry 'Orator' Hunt, and what was he arguing for at St Peter's Field?\n[03:10] Explain: Why did magistrates deploy the drunken Manchester and Salford Yeomanry cavalry with sabres drawn into the dense crowd?\n[05:15] Challenge: How did the government's response—passing the Six Acts to suppress free speech—demonstrate authoritarian fear of democracy?",
      model_answer: "Recall: A radical orator campaigning for universal male suffrage, annual parliaments, and repeal of the Corn Laws.\nExplain: Magistrates panicked when the enormous crowd cheered Hunt, ordering cavalry to arrest him; the horses charged into the tightly packed crowd, hacking down civilians with sabres (killing 18 and injuring over 600).\nChallenge: Instead of expressing remorse, the government congratulated the magistrates and passed the Six Acts, outlawing meetings of more than 50 people, taxing newspapers, and speeding up treason trials to crush dissent."
    },
    {
      id: "Dj5h1kKjVYc",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=Dj5h1kKjVYc",
      title: "Peterloo (2018) | Official Movie Trailer",
      duration: "2 mins 24 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:24 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Mike Leigh's masterpiece capturing the speeches and the tragic sabre charge.",
      viewing_task: "[01:20] Cinematic Discussion Focus: How does the film capture the dignified, peaceful optimism of the working people marching to Manchester before the violence erupts?",
      model_answer: "Cinematic Discussion Focus: The film emphasizes peaceful solidarity: families walking together, white Sunday dresses, musical bands, and hand-embroidered banners proclaiming 'Liberty and Fraternity', making the sudden, brutal cavalry charge all the more shocking."
    },
    {
      id: "mWucd5tXlqY",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=mWucd5tXlqY",
      title: "The Chartists (1838–1848) | Timelines.tv",
      duration: "9 mins 35 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 00:45–09:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Traces the People's Charter, mass petitions, and the clash between Moral Force and Physical Force.",
      viewing_task: "[02:00] Recall: What were the six key points of the 1838 People's Charter?\n[04:45] Explain: What was the tactical split between William Lovett's 'Moral Force' Chartists and Feargus O'Connor's 'Physical Force' Chartists?\n[07:30] Challenge: Although Parliament rejected all three massive Chartist petitions (1839, 1842, 1848), why can Chartism be called the ultimate foundation of modern British democracy?",
      model_answer: "Recall: 1. Universal male suffrage; 2. Secret ballot; 3. No property qualification for MPs; 4. Salaries for MPs; 5. Equal constituencies; 6. Annual parliaments.\nExplain: Moral Force advocates believed peaceful persuasion, petitions, and moral education would win reform; Physical Force advocates argued that if Parliament ignored millions of citizens, armed uprising and general strikes ('sacred month') were justified.\nChallenge: Five of the six points (all except annual parliaments) were eventually enacted into British law over the following century, proving the Chartists designed the blueprint of modern British democratic government."
    }
  ],
  // Lesson 5: How did the road to democracy expand?
  [
    {
      id: "3K2oMqYEGdY",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=3K2oMqYEGdY",
      title: "Elections & Voting Explained | UK Parliament",
      duration: "1 min 35 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:00–01:35 | Lesson Phase: Democratic Foundations | Tone Alert: Clean animated primer on parliamentary constituencies and representation.",
      viewing_task: "[00:40] Quick Check: Who holds the ultimate sovereign power to choose members of parliament in a modern democracy?\n[01:10] Hinge Question: Why did the pre-1832 electoral system allow uninhabited mounds like Old Sarum to elect two MPs while industrial cities of 200,000 like Manchester elected zero?",
      model_answer: "Quick Check: Enfranchised citizens voting in regular secret-ballot elections.\nHinge Question: The system was rooted in medieval charters that had never been updated: wealthy landowning aristocrats controlled corrupt 'rotten boroughs' to maintain an unshakeable grip on parliamentary power."
    },
    {
      id: "7geGIkPy5q0",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=7geGIkPy5q0",
      title: "What Was the Great Reform Act 1832? | Parliamentary Archives",
      duration: "2 mins 30 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:15–02:20 | Lesson Phase: Constitutional Reform | Tone Alert: Expert archival breakdown of Earl Grey's legislation.",
      viewing_task: "[00:50] Recall: What was a 'rotten borough', and how many were disenfranchised by the 1832 Reform Act?\n[01:30] Explain: How did the 1832 Act enfranchise the new industrial middle class (factory owners, merchants, professionals)?\n[02:10] Challenge: Why did working-class reformers view the 1832 Reform Act as a bitter betrayal?",
      model_answer: "Recall: Depopulated boroughs with tiny electorates controlled by wealthy landlords; 56 rotten boroughs were abolished.\nExplain: It granted parliamentary seats to booming industrial towns like Manchester, Leeds, and Birmingham, and gave the vote to men owning property worth £10 a year.\nChallenge: The strict £10 property qualification still excluded working-class men whose mass protests had pressured the House of Lords to pass the bill, prompting them to launch the Chartist movement."
    },
    {
      id: "Y4jBXQM7mIk",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=Y4jBXQM7mIk",
      title: "Suffragette (2015) | Official Trailer (Focus Features / Carey Mulligan)",
      duration: "2 mins 32 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:32 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Powerful dramatisation of the militant WSPU campaign for women's suffrage.",
      viewing_task: "[01:15] Cinematic Discussion Focus: How does the film portray the decision of working-class women like Maud Watts to turn to militant direct action ('deeds, not words')?",
      model_answer: "Cinematic Discussion Focus: The trailer dramatizes how decades of peaceful lobbying had been ignored by politicians, driving women to hunger strikes, window-smashing, and civil disobedience to force Parliament to grant equal voting rights."
    },
    {
      id: "js_Kab5C2xI",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=js_Kab5C2xI",
      title: "The Great Reform Act 1832: Origins and Opposition | UK Parliamentary Archives",
      duration: "14 mins 20 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 01:30–12:30 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Comprehensive constitutional analysis using original Hansard debates and petitions.",
      viewing_task: "[03:00] Recall: How close did Britain come to violent civil war during the 'Days of May' in 1832?\n[07:15] Explain: How did King William IV finally force the aristocratic House of Lords to stop blocking the Reform Bill?\n[11:00] Challenge: How did the subsequent Reform Acts of 1867, 1884, 1918, and 1928 step-by-step complete the transition to universal adult suffrage?",
      model_answer: "Recall: Protesters ran on the banks ('Stop the Duke, go for gold'), refused taxes, and gathered in armed mobs when the Duke of Wellington tried to form an anti-reform government.\nExplain: Grey persuaded the King to threaten to create dozens of new pro-reform Whig peers in the House of Lords, forcing conservative peers to back down.\nChallenge: 1867 enfranchised skilled urban workers; 1884 enfranchised agricultural labourers; 1918 gave the vote to all men over 21 and women over 30; and 1928 achieved full democratic equality for all women at 21."
    }
  ]
];

const australiaVideos = [
  // Lesson 1: Claiming Australia: Captain Cook, Tupaia & The Myth of Terra Nullius (1768–1770)
  [
    {
      id: "8IfqSS8kpLA",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=8IfqSS8kpLA",
      title: "Indigenous Perspectives of Cook's Visit | Behind the News",
      duration: "5 mins 01 sec",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:20–04:40 | Lesson Phase: Indigenous Perspectives | Tone Alert: Interviews with First Nations descendants reflecting on 1770 at Botany Bay.",
      viewing_task: "[01:10] Quick Check: How did Gweagal warriors react when Captain James Cook attempted to land at Kamay (Botany Bay) in April 1770?\n[03:40] Hinge Question: Why did Cook claim the entire eastern coastline of Australia for King George III despite secret Admiralty orders requiring the 'consent of the natives'?",
      model_answer: "Quick Check: Two Gweagal men challenged the landing party with spears and shields; Cook's marines fired muskets, wounding one warrior.\nHinge Question: Cook interpreted the Indigenous refusal to engage in trade or acknowledge European authority as proof that they had no legal concept of land ownership, rationalizing his unilateral possession claim at Possession Island."
    },
    {
      id: "nVPxrUxUJNg",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=nVPxrUxUJNg",
      title: "Endeavour Voyage: Untold Stories | National Museum of Australia",
      duration: "7 mins 36 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:30–07:00 | Lesson Phase: Forensic Cartography | Tone Alert: Investigates Tupaia's vital role as Polynesian navigator and diplomat.",
      viewing_task: "[01:30] Recall: Who was Tupaia, and how did his navigation knowledge guide the HMS Endeavour across the Pacific?\n[03:50] Explain: Why did Tupaia's ability to communicate with Māori in New Zealand fail when the Endeavour reached the Australian continent?\n[06:15] Challenge: How did the legal fiction of 'Terra Nullius' contradict Cook's own journal entries describing complex Indigenous fire-stick farming?",
      model_answer: "Recall: A master Tahitian star navigator and high priest who drew a map of over 70 Pacific islands and translated between European crews and Indigenous Pacific peoples.\nExplain: Australian Aboriginal languages belonged to entirely different, ancient language families unrelated to the Austronesian Polynesian languages of New Zealand and the Pacific.\nChallenge: Cook documented open, park-like landscapes deliberately created by millennia of sophisticated fire-stick burning, proving the land was actively managed and occupied rather than 'uncultivated wasteland'."
    },
    {
      id: "BDepKiFIt5A",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=BDepKiFIt5A",
      title: "The Secret River (2015) | Extended Trailer (ABC / BBC)",
      duration: "2 mins 01 sec",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:01 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Dramatisation of the violent clash over land ownership on the Australian frontier.",
      viewing_task: "[01:05] Cinematic Discussion Focus: How does the film contrast European concepts of fenced, private property with First Nations concepts of caring for country?",
      model_answer: "Cinematic Discussion Focus: The trailer visualises the fundamental ideological clash: British settlers mark boundaries with fences, crops, and guns, while the Dharug people regard the river and landscape as a living, sacred ancestral home that cannot be bought or owned."
    },
    {
      id: "1n6VJ5jq7zY",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=1n6VJ5jq7zY",
      title: "First Footprints (Episode 1) | ABC / First Nations Documentary",
      duration: "56 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 05:00–30:00 | Lesson Phase: Deep Pre-Colonial Context | Tone Alert: World-class archaeological and rock art evidence of 65,000+ years of continuous civilisation.",
      viewing_task: "[08:00] Recall: What archaeological evidence proves human occupation in Australia for over 65,000 years (e.g. Madjedbebe rock shelter)?\n[18:30] Explain: How did Indigenous systems of kinship, Songlines, and ecological fire-stick burning sustain populations across arid environments?\n[28:00] Challenge: In light of 65,000 years of unbroken culture, how does modern Australian law now view the 18th-century declaration of 'Terra Nullius'?",
      model_answer: "Recall: Radiocarbon and optical dating of flaked stone axes, grinding stones, and red ochre pigments at Madjedbebe in Arnhem Land.\nExplain: Songlines served as oral navigational maps, legal boundaries, and spiritual histories, while controlled burns stimulated native grasses and prevented catastrophic wildfires.\nChallenge: The 1992 landmark Mabo High Court ruling officially overturned Terra Nullius, acknowledging that native title existed prior to 1788 and shattered the colonial myth that Australia was an uninhabited wilderness."
    }
  ],
  // Lesson 2: The First Fleet & The Convict Penal Colony (1783–1792)
  [
    {
      id: "MnUNEkMsjfY",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=MnUNEkMsjfY",
      title: "First Fleet: Journey to Botany Bay & Sydney Cove | Behind the News",
      duration: "4 mins 36 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:20–04:10 | Lesson Phase: Voyage Overview | Tone Alert: Animated route maps and convict statistics.",
      viewing_task: "[01:00] Quick Check: How many ships and convicts sailed with Captain Arthur Phillip in the First Fleet in May 1787?\n[03:15] Hinge Question: Why did Governor Phillip immediately abandon Botany Bay upon arrival and move the settlement to Sydney Cove?",
      model_answer: "Quick Check: 11 ships carrying over 750 convicts and roughly 500 sailors and marines.\nHinge Question: Botany Bay was shallow, exposed to open seas, and lacked reliable fresh drinking water; Sydney Cove (Port Jackson) offered deep sheltered anchorage and the freshwater Tank Stream."
    },
    {
      id: "GS1072MshS0",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=GS1072MshS0",
      title: "Australian Penal Colonies: Transportation & Convict Life | Simple History",
      duration: "4 mins 26 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:15–04:00 | Lesson Phase: Daily Convict Reality | Tone Alert: Animated breakdown of convict labour, punishments (the cat-o'-nine-tails), and emancipation.",
      viewing_task: "[01:00] Recall: What petty crimes typically resulted in seven or fourteen years' transportation to New South Wales?\n[02:30] Explain: How did the threat of secondary penal stations (Norfolk Island, Port Arthur) enforce convict labour discipline?\n[03:45] Challenge: How did the system of 'Tickets of Leave' allow reformed convicts to become landowning emancipists?",
      model_answer: "Recall: Petty theft of food, clothing, livestock, pickpocketing, or stealing cloth, often driven by desperate poverty in British cities.\nExplain: Recidivist convicts who committed crimes in the colony were sent to isolated, brutal secondary settlements where they endured chain gangs, solitary confinement, and severe floggings.\nChallenge: Convicts who served sentences with good behaviour earned conditional pardons ('Tickets of Leave'), allowing them to work for themselves, acquire crown land, and marry, forming the backbone of the emergent colonial economy."
    },
    {
      id: "BDepKiFIt5A",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=BDepKiFIt5A",
      title: "The Secret River: Convict Transportation & Frontier Exile | Trailer",
      duration: "2 mins 01 sec",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:01 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Depicts Thames river thief William Thornhill's sentencing and exile to the Antipodes.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does the film portray the trauma of lifelong transportation to an alien landscape on the other side of the planet?",
      model_answer: "Cinematic Discussion Focus: The trailer visually captures the disorientation and terror of British convicts thrust from cold, cramped London slums into the vast, blinding light and unfamiliar wilderness of the Australian bush."
    },
    {
      id: "Z7_1avVKDwc",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=Z7_1avVKDwc",
      title: "First Australians: They Have Come to Stay (Episode 1) | SBS / Rachel Perkins",
      duration: "53 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 10:00–35:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Investigates the arrival of the First Fleet from the shores of Sydney Harbour.",
      viewing_task: "[12:00] Recall: What initial reactions did the Eora people have to the strange pale arrivals clearing the trees of Sydney Cove?\n[22:00] Explain: How did the rapid exhaustion of British food rations lead to near-starvation during the colony's first three years?\n[32:30] Challenge: How did Governor Phillip's early attempts at peaceful assimilation collapse into frontier military reprisals?",
      model_answer: "Recall: Initial curiosity and warning shouts ('Warra warra wai' - go away), followed by astonishment at the felling of ancient trees and building of permanent huts.\nExplain: English wheat crops failed in the unfamiliar soil, seeds rotted, cattle escaped into the bush, and supply ships were wrecked, leaving the colony on starvation rations of salt pork.\nChallenge: When convicts began stealing Indigenous fishing nets and spearing game, Aboriginal warriors retaliated; Phillip responded by dispatching military punitive expeditions with bags to bring back severed heads."
    }
  ],
  // Lesson 3: Frontier Warfare: Smallpox, Bennelong & Pemulwuy’s Resistance (1788–1802)
  [
    {
      id: "Yaxdmq9tEuU",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=Yaxdmq9tEuU",
      title: "Discovering Pemulwuy: First Nations Freedom Fighter | ClickView",
      duration: "3 mins 20 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:00–03:20 | Lesson Phase: Resistance Leader Hook | Tone Alert: Animated overview of Pemulwuy's decade-long guerrilla war.",
      viewing_task: "[01:00] Quick Check: Which Bidjigal resistance warrior led coordinated attacks against British settlements around the Parramatta and Toongabbie rivers?\n[02:30] Hinge Question: Why did colonial settlers believe Pemulwuy was magically bulletproof?",
      model_answer: "Quick Check: Pemulwuy (c. 1750–1802).\nHinge Question: He survived multiple musket wounds, including being shot in the head and leg during the 1801 Battle of Parramatta and escaping from hospital with leg irons still attached."
    },
    {
      id: "CJ7_glKA3c8",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=CJ7_glKA3c8",
      title: "Who Was Bennelong? The Diplomat Caught Between Two Worlds",
      duration: "5 mins 59 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:20–05:30 | Lesson Phase: Diplomatic Breakdown | Tone Alert: Biographical analysis of Bennelong's diplomatic role and cultural isolation.",
      viewing_task: "[01:15] Recall: Why did Governor Arthur Phillip order Bennelong kidnapped in November 1789?\n[03:00] Explain: What occurred when Phillip was speared in the shoulder at Manly Beach in 1790, and why did he refuse to retaliate?\n[04:45] Challenge: Why is Bennelong remembered as a tragic diplomatic figure who struggled to negotiate coexistence between two radically unequal worlds?",
      model_answer: "Recall: To force him to learn English and serve as a cultural go-between and intelligence source regarding Indigenous intentions.\nExplain: A warrior named Willemering speared Phillip; Phillip recognized it was a traditional ritual payback punishment for earlier British kidnappings and ordered his men not to fire.\nChallenge: Despite adopting European manners and meeting King George III, Bennelong was rejected by colonial elites who mocked him and cast out by his own people who distrusted his foreign ties."
    },
    {
      id: "sYKBG1znk4A",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=sYKBG1znk4A",
      title: "Sweet Country (2017) | Official Movie Trailer (Transmission Films)",
      duration: "2 mins 15 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:15 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Acclaimed First Nations western directed by Warwick Thornton exploring frontier justice.",
      viewing_task: "[01:15] Cinematic Discussion Focus: How does the film subvert traditional western film tropes to expose the legal inequality faced by Aboriginal people on the frontier?",
      model_answer: "Cinematic Discussion Focus: The film shows that on the colonial frontier, self-defence by an Aboriginal person against a white man was treated as murder; law and judicial trials functioned as instruments of colonial subjugation rather than impartial justice."
    },
    {
      id: "Z7_1avVKDwc",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=Z7_1avVKDwc",
      title: "First Australians: The Frontier Wars & Pemulwuy | SBS Documentary",
      duration: "53 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 25:00–48:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Essential First Nations testimony on Pemulwuy's military leadership.",
      viewing_task: "[28:00] Recall: What sparked the April 1789 smallpox epidemic (Galgala) that wiped out half the Eora population?\n[36:00] Explain: How did Pemulwuy organize alliances between different Aboriginal language groups to resist British pastoral expansion?\n[45:30] Challenge: Following Pemulwuy's death in 1802, what happened to his head, and what does this reveal about colonial attitudes toward resistance heroes?",
      model_answer: "Recall: An outbreak of smallpox swept through coastal clans; historians still debate whether it escaped from First Fleet medical vials, Macassan traders, or was deliberately spread.\nExplain: He united Bidjigal, Dharug, and Eora warriors, coordinating night attacks on isolated farms and burning maize crops to cut off food supplies to Sydney.\nChallenge: His severed head was pickled in spirits and sent to London to Sir Joseph Banks as a scientific curiosity, showing how colonial authorities treated First Nations resistance leaders as specimens rather than legitimate military adversaries."
    }
  ],
  // Lesson 4: The Frontier Wars, Pastoral Expansion & The Black War (1803–1840)
  [
    {
      id: "qzae5dqfOnE",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=qzae5dqfOnE",
      title: "The Frontier Wars: Australia’s Forgotten Conflicts | SBS The Feed",
      duration: "3 mins 08 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:00–03:08 | Lesson Phase: Lesson Hook | Tone Alert: Direct, compelling introduction to the scale of frontier conflict across the continent.",
      viewing_task: "[01:00] Quick Check: How many estimated frontier clashes and massacres occurred across Australia between 1788 and 1928?\n[02:30] Hinge Question: Why has the Australian War Memorial historically refused to commemorate the Frontier Wars alongside overseas military campaigns?",
      model_answer: "Quick Check: University of Newcastle research has mapped hundreds of verified massacres resulting in tens of thousands of Indigenous deaths.\nHinge Question: Commemorating the Frontier Wars inside the national war memorial requires the Australian state to acknowledge that the nation was founded through an internal war of conquest against its own First Peoples."
    },
    {
      id: "Prjgfa4Nc1Q",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=Prjgfa4Nc1Q",
      title: "The Massacre at Myall Creek: The Landmark 1838 Trial | SMH",
      duration: "4 mins 36 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:20–04:15 | Lesson Phase: Landmark Legal Case | Tone Alert: Investigates the 1838 massacre of 28 unarmed Wirrayaraay people and the rare trial that followed.",
      viewing_task: "[01:10] Recall: What occurred at Myall Creek Station on 10 June 1838?\n[02:45] Explain: Why was the conviction and hanging of seven white stockmen in December 1838 an unprecedented exception in colonial legal history?\n[04:00] Challenge: Did the Myall Creek trials stop frontier massacres, or simply drive them underground into conspiracy and secrecy?",
      model_answer: "Recall: Eleven armed stockmen roped together 28 unarmed Wirrayaraay elders, women, and children and slaughtered them without provocation.\nExplain: Colonial prosecutor John Plunkett took the case to a second trial under public outrage; it was the only time white perpetrators were executed for murdering Aboriginal people in colonial Australia.\nChallenge: Rather than stopping violence, the verdict caused pastoralists to conceal their crimes, turning to strychnine poison in flour and waterholes and swearing vows of silence to evade prosecution."
    },
    {
      id: "sYKBG1znk4A",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=sYKBG1znk4A",
      title: "Sweet Country: Frontier Justice on Aboriginal Land | Official Trailer",
      duration: "2 mins 15 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:15 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Dramatic representation of frontier racism and institutional bias.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does the cinematography frame the vast, unforgiving Australian outback as an active character in frontier struggles?",
      model_answer: "Cinematic Discussion Focus: The sweeping desert vistas highlight the settlers' alienation and fear, contrasting with First Nations characters whose deep, innate knowledge of tracks, water, and country allows them to survive."
    },
    {
      id: "Z7_1avVKDwc",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=Z7_1avVKDwc",
      title: "First Australians: The Black War in Van Diemen's Land | SBS Documentary",
      duration: "53 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 18:00–45:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Examines martial law, the Black Line, and Truganini's people in Tasmania.",
      viewing_task: "[20:00] Recall: What was the 'Black Line' military operation ordered by Governor George Arthur in Van Diemen's Land (Tasmania) in 1830?\n[32:00] Explain: How did George Augustus Robinson persuade surviving Tasmanian Aboriginal people to surrender and relocate to Flinders Island?\n[42:15] Challenge: How did the rapid decline of the Tasmanian population on Flinders Island disprove colonial claims of 'humanitarian protection'?",
      model_answer: "Recall: A human cordon of over 2,000 soldiers and armed settlers who swept across the island over six weeks to capture or drive all Aboriginal people onto the Tasman Peninsula.\nExplain: Robinson promised that if they ceased fighting and moved temporarily to an island sanctuary, they would be protected, their lands would be preserved, and they could eventually return home.\nChallenge: Confined on windy, disease-ridden Flinders Island, stripped of culture, and forced into European clothing and Christian prayer, over 100 people died of respiratory illness and despair within a decade."
    }
  ],
  // Lesson 5: The Gold Rush, Eureka Stockade & The Legacy of Colonisation (1851–1901)
  [
    {
      id: "OCXCmzdjf6M",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=OCXCmzdjf6M",
      title: "The Australian Gold Rush: Ballarat & Mass Migration | Behind the News",
      duration: "3 mins 55 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:15–03:40 | Lesson Phase: Gold Rush Hook | Tone Alert: High-energy overview of the 1850s Victorian gold discoveries.",
      viewing_task: "[01:00] Quick Check: Where was gold discovered in Victoria in 1851, sparking one of the largest gold rushes in world history?\n[03:00] Hinge Question: Why were miners ('diggers') so furious about paying a monthly 30-shilling gold-mining licence fee?",
      model_answer: "Quick Check: Ballarat, Bendigo, and Mount Alexander.\nHinge Question: The licence had to be paid in advance whether a digger found gold or not; corrupt police conducted aggressive 'digger hunts' using mounted troopers to arrest anyone without paper permits."
    },
    {
      id: "or5Q3hkztoU",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=or5Q3hkztoU",
      title: "Defining Moments: The 1854 Eureka Stockade | National Museum of Australia",
      duration: "5 mins 50 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:20–05:20 | Lesson Phase: Democratic Rebellion | Tone Alert: Detailed historical analysis of Peter Lalor, the Southern Cross flag, and the 20-minute battle.",
      viewing_task: "[01:30] Recall: What oath did 500 armed diggers swear beneath the Southern Cross flag at Bakery Hill on 1 December 1854?\n[03:15] Explain: What happened at dawn on Sunday 3 December 1854 when British soldiers and police attacked the Eureka Stockade?\n[04:45] Challenge: How did the aftermath of Eureka lead directly to democratic reform, the secret ballot, and the abolition of mining licences in Victoria?",
      model_answer: "Recall: 'We swear by the Southern Cross to stand truly by each other, and fight to defend our rights and liberties.'\nExplain: British troops attacked the unfinished wooden barricade while many diggers were away; the 20-minute firefight killed 22 diggers and 6 soldiers.\nChallenge: Victorian juries refused to convict surviving diggers of high treason; public sympathy forced the government to replace the licence with an affordable 'Miner's Right' that included the right to vote in parliamentary elections."
    },
    {
      id: "Lbnk8wSVMaM",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=Lbnk8wSVMaM",
      title: "Rabbit-Proof Fence (2002) | Official Trailer (Phillip Noyce / Everlyn Sampi)",
      duration: "2 mins 51 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:51 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Award-winning film depicting three Stolen Generations girls walking 1,500 miles home.",
      viewing_task: "[01:20] Cinematic Discussion Focus: How does the film portray the Chief Protector of Aborigines, A.O. Neville, and the racist ideology of state-enforced biological absorption?",
      model_answer: "Cinematic Discussion Focus: The trailer contrasts Neville's bureaucratic, cold paternalism in his office with the terror of mothers having their children forcibly ripped away in police trucks, humanizing the catastrophic generational trauma of the Stolen Generations."
    },
    {
      id: "Z7_1avVKDwc",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=Z7_1avVKDwc",
      title: "First Australians: Dispossession, Protection Acts & Stolen Generations | SBS",
      duration: "53 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 22:00–48:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Synoptic evaluation of the 1901 Immigration Restriction Act and Protection Boards.",
      viewing_task: "[25:00] Recall: How did 19th-century colonial 'Aboriginal Protection Acts' strip Indigenous people of basic civil rights?\n[35:00] Explain: How did the 1901 Federation of Australia establish the 'White Australia Policy' through the Immigration Restriction Act?\n[44:30] Challenge: How does understanding the full trajectory from 1788 to 1901 explain why First Nations Australians continue to campaign for Constitutional Recognition and Treaty?",
      model_answer: "Recall: State Protectors controlled where Aboriginal people could live, whom they could marry, their wages, and seized their children without court orders.\nExplain: The newly federated Commonwealth passed laws designed to keep Australia exclusively white, imposing dictation tests in European languages and denying voting rights to Indigenous peoples.\nChallenge: Because Australia was founded without treaties or constitutional acknowledgement of prior ownership, the legacy of dispossession and systemic inequality remains an unresolved national question."
    }
  ]
];

function applyVideosToUnit(unitName, videosArray) {
  const filePath = path.join(__dirname, '..', 'units', unitName, 'data.js');
  let content = fs.readFileSync(filePath, 'utf8');

  // Load the unitData
  let evalCode = content.replace(/export\s+default\s+unitData;?/g, '').replace(/export\s*\{\s*unitData\s*\};?/g, '');
  evalCode = evalCode.replace('const unitData =', 'var unitData =');
  var unitData;
  eval(evalCode);

  unitData.lessons.forEach((l, idx) => {
    if (videosArray[idx]) {
      l.video = videosArray[idx];
      console.log(`✅ [${unitName}] Lesson ${idx + 1} (${l.id || idx}) upgraded to ${l.video.length} videos`);
    }
  });

  const newContent = 'const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n\nexport { unitData };\nexport default unitData;\n';
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`💾 Updated units/${unitName}/data.js`);

  // Sync to data/ and public/data/
  const dataPath1 = path.join(__dirname, '..', 'data', `${unitName}.json`);
  const dataPath2 = path.join(__dirname, '..', 'public', 'data', `${unitName}.json`);
  fs.writeFileSync(dataPath1, JSON.stringify(unitData, null, 2), 'utf8');
  fs.writeFileSync(dataPath2, JSON.stringify(unitData, null, 2), 'utf8');
  console.log(`💾 Synced data/${unitName}.json and public/data/${unitName}.json`);
}

console.log('======================================================');
console.log('👑 APPLYING 4-TIER VIDEO SHELF: EMPIRE SUITE & AUSTRALIA');
console.log('======================================================');

applyVideosToUnit('first_british_empire', firstEmpireVideos);
applyVideosToUnit('second_british_empire', secondEmpireVideos);
applyVideosToUnit('industrialisation_and_empire', industrialisationVideos);
applyVideosToUnit('australia', australiaVideos);

console.log('\nRebuilding database.json...');
execSync('node scripts/build_database.cjs', { stdio: 'inherit' });
console.log('\n🎉 EMPIRE SUITE & AUSTRALIA 4-TIER SHELF COMPLETED ACROSS ALL 20 LESSONS!');
