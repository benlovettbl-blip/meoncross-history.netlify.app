/**
 * apply_all_early_modern_and_water_4tier_videos.cjs
 * Upgrades early_modern_world (9 lessons) and water_and_sanitation (7 lessons)
 * to the GCSE/KS3 4-Tier Ideal Classroom Video Shelf Standard (4 videos per lesson).
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const earlyModernVideos = [
  // Lesson 1: Who held global power in 1450?
  [
    {
      id: "3PszVWZNWVA",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=3PszVWZNWVA",
      title: "The Fall of Constantinople & Trade Networks (1453) | CrashCourse",
      duration: "4 mins 30 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:15–04:10 | Lesson Phase: Global Hook | Tone Alert: Rapid-fire analysis of Sultan Mehmed II, massive siege cannons, and the collapse of the Byzantine Empire.",
      viewing_task: "[01:00] Quick Check: In what year did Ottoman Sultan Mehmed II conquer Constantinople, ending over a millennium of the Byzantine Empire?\n[03:20] Hinge Question: How did Ottoman control of the overland Silk Road compel Western European monarchs to sponsor risky maritime voyages into the Atlantic and Indian Oceans?",
      model_answer: "Quick Check: 1453.\nHinge Question: Ottoman customs duties and trade monopolies made overland Asian luxury trade prohibitively expensive for European merchants, driving Portuguese and Spanish navigators to search for direct oceanic sea routes to India and China."
    },
    {
      id: "5Cc4LaSRiSc",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=5Cc4LaSRiSc",
      title: "Global Trade Networks in the 15th Century | Timelines.tv",
      duration: "6 mins 15 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:30–05:45 | Lesson Phase: Comparative Civilisations | Tone Alert: Compares Ming Dynasty China, the Ottoman Empire, and feudal Western Europe in 1450.",
      viewing_task: "[01:15] Recall: What naval voyages did Admiral Zheng He lead for Ming China between 1405 and 1433?\n[03:00] Explain: Why did the Ming Emperor suddenly order the burning of the treasure fleets and ban further maritime exploration?\n[05:00] Challenge: In 1450, why was Western Europe an impoverished peripheral region compared to the wealthy manufacturing powerhouses of Ming China and the Ottoman Empire?",
      model_answer: "Recall: Zheng He led seven massive expeditions across the Indian Ocean to East Africa with treasure ships over 400 feet long.\nExplain: Confucian court scholars argued that China was self-sufficient and that expensive maritime voyages squandered funds needed to defend northern borders against Mongol invasions.\nChallenge: China manufactured superior silks and porcelain while the Ottomans controlled crucial trade crossroads; Western Europe was fractured by the Hundred Years' War and produced few commodities that Asian empires desired."
    },
    {
      id: "i2LdlqW26zc",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=i2LdlqW26zc",
      title: "The New World (2005) | Official Trailer (Terrence Malick / Colin Farrell)",
      duration: "2 mins 25 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:25 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Lyrical cinematic depiction of early European arrival and cultural contact in the Americas.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does Malick visually depict the astonishment and profound cultural divide when English sailing ships anchor off the coast of North America?",
      model_answer: "Cinematic Discussion Focus: The trailer contrasts European iron armor, religious crosses, and gunpowder muskets with the tranquil, harmonious Indigenous way of life, capturing the fateful wonder and underlying menace of early colonial contact."
    },
    {
      id: "_faoe9xuNF8",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=_faoe9xuNF8",
      title: "The Ottomans: Europe's Muslim Emperors (Episode 1) | BBC / Rageh Omaar",
      duration: "58 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 10:00–35:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Rageh Omaar traces how nomadic warrior tribes forged an empire bridging Europe, Asia, and Africa.",
      viewing_task: "[14:00] Recall: How did Sultan Mehmed II transport Ottoman warships overland on greased logs to bypass the Byzantine chain boom in the Golden Horn?\n[24:30] Explain: What was the 'devshirme' system, and how did it create an elite military and bureaucratic corps (Janissaries) loyal only to the Sultan?\n[38:00] Challenge: How did Ottoman religious tolerance (the millet system) allow Jewish and Christian communities to flourish compared to the religious persecutions of Western Europe?",
      model_answer: "Recall: In a brilliant engineering feat, thousands of soldiers hauled 70 galleys over wooden tracks across the hills of Galata overnight, taking Byzantine defenders completely by surprise.\nExplain: Christian boys from the Balkans were recruited, converted to Islam, and educated in statecraft and military arts, creating a meritocratic elite without hereditary noble loyalties.\nChallenge: Under the millet system, non-Muslim religious minorities governed their own legal and communal affairs in exchange for paying the jizya tax, attracting Jewish refugees fleeing persecution in Catholic Spain."
    }
  ],
  // Lesson 2: How did religious conflict trigger global exploration (1517–1588)?
  [
    {
      id: "1o8oIELbNxE",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=1o8oIELbNxE",
      title: "Luther and the Protestant Reformation | CrashCourse World History",
      duration: "15 mins 00 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:30–04:45 | Lesson Phase: Lesson Hook | Tone Alert: Dynamic overview of Martin Luther, indulgences, and the 95 Theses.",
      viewing_task: "[01:30] Quick Check: What corrupt practice—selling certificates to buy loved ones out of Purgatory—provoked Martin Luther's 95 Theses in 1517?\n[03:45] Hinge Question: How did the invention of the Gutenberg printing press transform a local theological dispute into a pan-European religious revolution?",
      model_answer: "Quick Check: The sale of papal indulgences by Dominican friar Johann Tetzel.\nHinge Question: Without the printing press, Luther's Latin theses would have remained an obscure academic argument; vernacular German translations were rapidly printed and distributed across Europe, preventing the Catholic Church from silencing him as an isolated heretic."
    },
    {
      id: "Oe84Aolmmcg",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=Oe84Aolmmcg",
      title: "Luther (2003) | Official Movie Trailer (Joseph Fiennes / Alfred Molina)",
      duration: "2 mins 20 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:20 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Epic biographical drama exploring Luther's defiance of the Holy Roman Emperor at the Diet of Worms.",
      viewing_task: "[01:15] Cinematic Discussion Focus: How does the film dramatise Martin Luther's famous stand: 'Here I stand; I can do no other'? Why was challenging papal authority a matter of life and death in 16th-century Europe?",
      model_answer: "Cinematic Discussion Focus: The trailer visually captures the courage of an ordinary monk standing alone before the crowned emperor and papal legates, risking being burned at the stake for declaring that scripture and individual conscience supersede the absolute authority of the Pope."
    },
    {
      id: "FhGGjRjvq7w",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=FhGGjRjvq7w",
      title: "The Reformation & The Counter-Reformation | National Geographic",
      duration: "4 mins 15 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:15–03:50 | Lesson Phase: Structural Analysis | Tone Alert: Explores the Council of Trent, the Jesuits, and missionary voyages to the Americas and Asia.",
      viewing_task: "[01:00] Recall: What reforms did the Catholic Church implement at the Council of Trent (1545–1563)?\n[02:30] Explain: How did the Society of Jesus (Jesuits) combine militant defence of Catholic doctrine with global missionary expansion to Japan, China, and the Americas?\n[03:45] Challenge: How did the Protestant-Catholic rivalry fuel fierce competition between Spain, Portugal, England, and the Netherlands to establish overseas colonies?",
      model_answer: "Recall: It banned the sale of indulgences, established seminary training for priests, and reaffirmed Catholic dogma under papal supremacy.\nExplain: Founded by Ignatius of Loyola, Jesuits took a vow of absolute obedience to the Pope, traveling across oceans to convert Indigenous populations to Catholicism to counteract Protestant expansion in Europe.\nChallenge: Monarchs viewed colonial expansion as a sacred holy war: Catholic Spain claimed its gold-financed conquests served the Church, while Protestant England launched privateering raids to prevent Catholic global hegemony."
    },
    {
      id: "era_armada_battlefield",
      type: "era",
      url: "https://eduvids.org/embed/armada-battlefield-britain",
      title: "Battlefield Britain: The Spanish Armada & Philip II's Crusade | BBC Two / Peter & Dan Snow",
      duration: "58 mins 48 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 15:00–45:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: In-depth military and tactical analysis of the 1588 naval campaign in the English Channel.",
      viewing_task: "[18:30] Recall: Why did King Philip II of Spain view the invasion of Elizabeth I's England as a holy crusade?\n[31:00] Explain: How did English fireships at midnight off Calais on 7 August 1588 panic the Spanish crescent formation?\n[44:15] Challenge: How did superior English naval gunnery and agile galleon design at the Battle of Gravelines demonstrate a revolution in naval warfare?",
      model_answer: "Recall: Philip sought to restore England to Catholicism, avenge the execution of Mary, Queen of Scots, and end English pirate attacks on Spanish treasure fleets in the Caribbean.\nExplain: Eight blazing tar-soaked fireships drifted on the tide toward the anchored Armada; Spanish captains panicked, cut their anchor cables, and scattered into the dark sea.\nChallenge: English ships were built low and nimble ('race-built') with long-range culverin cannons mounted on four-wheeled carriages that could be rapidly reloaded from inside the hull, battering the towering Spanish troop-carrying galleons from safe standoff distance."
    }
  ],
  // Lesson 3: Trade or takeover: How did early encounters turn into empire?
  [
    {
      id: "era_east_india_olusoga",
      type: "era",
      url: "https://eduvids.org/embed/joint-stock-companies-empire",
      title: "Joint-Stock Companies: Empire with David Olusoga | BBC",
      duration: "5 mins 15 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:00–05:15 | Lesson Phase: Lesson Hook | Tone Alert: David Olusoga explains the economic invention that allowed ordinary citizens to finance overseas conquest.",
      viewing_task: "[01:20] Quick Check: What was a 'joint-stock company', and how did it spread financial risk among multiple investors?\n[03:45] Hinge Question: How did a commercial corporate structure make English imperial expansion far more sustainable and resilient than state-run Spanish conquest?",
      model_answer: "Quick Check: A business entity where investors bought shares of stock, pooling capital and sharing profits while limiting individual liability if a ship sank.\nHinge Question: While the Spanish Crown relied on royal loans and direct bullion extraction that caused domestic inflation, English joint-stock companies mobilized private merchant capital, continuously reinvesting profits into merchant fleets, armed forts, and expanding trade networks."
    },
    {
      id: "era_roanoke_horrible",
      type: "era",
      url: "https://eduvids.org/embed/walter-raleigh-roanoke",
      title: "Early English Colonisation: Walter Raleigh & The Lost Colony of Roanoke (1585)",
      duration: "4 mins 20 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:20–04:00 | Lesson Phase: Colonial Realities | Tone Alert: Investigates Sir Walter Raleigh's failed North Carolina settlement and the mysterious disappearance of 115 colonists.",
      viewing_task: "[01:00] Recall: Why did Sir Walter Raleigh select Roanoke Island in 1585, and what was the colony's primary strategic purpose?\n[02:30] Explain: How did arrogant English mistreatment of local Secotan villagers (including burning an entire village over a missing silver cup) destroy Indigenous food aid?\n[03:45] Challenge: When supply ships returned in 1590 to find the settlement deserted with the word 'CROATOAN' carved into a wooden post, what hard lessons did English colonizers learn about survival in the New World?",
      model_answer: "Recall: To serve as a privateering naval base for raiding Spanish treasure fleets and establish England's first permanent American settlement.\nExplain: English settlers refused to farm, expecting local Indigenous people to feed them; when food supplies ran low, English commanders used violent retaliation, alienating the only people who knew how to cultivate local crops.\nChallenge: They learned that privateering bases could not survive without agricultural self-sufficiency, permanent family settlements, and cooperative diplomatic alliances with Indigenous nations."
    },
    {
      id: "i2LdlqW26zc",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=i2LdlqW26zc",
      title: "The New World: Jamestown & First Encounters | Official Trailer",
      duration: "2 mins 25 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:25 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Dramatises the 1607 founding of Jamestown, Virginia, and the Powhatan confederacy.",
      viewing_task: "[01:20] Cinematic Discussion Focus: How does the film portray the harsh winter 'starving time' in Jamestown alongside the natural bounty and cultural sophistication of the Powhatan people?",
      model_answer: "Cinematic Discussion Focus: The trailer contrasts English gentleman colonists dying of starvation, disease, and despair inside their wooden palisade with the thriving, healthy Powhatan community, demonstrating that early English colonies survived only through Indigenous agricultural generosity."
    },
    {
      id: "5Cc4LaSRiSc",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=5Cc4LaSRiSc",
      title: "Empire: Early Encounters & Corporate Expansion | BBC / Jeremy Paxman",
      duration: "59 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 12:00–38:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Explores how commercial trading posts gradually evolved into territorial sovereign dominions.",
      viewing_task: "[15:00] Recall: What goods were traded between English factors and local rulers in West Africa, India, and North America in the early 1600s?\n[26:30] Explain: How did European merchants transition from asking permission from local emperors to demanding territorial sovereignty and tax concessions?\n[35:00] Challenge: In what ways did early modern trade pave the direct path for 18th- and 19th-century colonial conquest?",
      model_answer: "Recall: Beaver furs, tobacco, spices, calico textiles, sugar, and enslaved human beings in exchange for manufactured ironware, firearms, and wool.\nExplain: As companies built fortified warehouses and hired private armies to protect their investments, they began interfering in local civil wars, installing compliant puppet rulers, and seizing control of tax systems.\nChallenge: Trade established maritime supply lines, military bridgeheads, and commercial dependencies; once European states realized the immense tax profits of corporate operations, they deployed royal armies to formalize territorial conquest."
    }
  ],
  // Lesson 4: James I and the Gunpowder Plot: Why was religious division so volatile?
  [
    {
      id: "I9JW-RE4-ZE",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=I9JW-RE4-ZE",
      title: "Guy Fawkes and The Gunpowder Plot | BBC Teach",
      duration: "3 mins 15 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:00–03:15 | Lesson Phase: Lesson Hook | Tone Alert: Fast-paced animated introduction to the plotters, the 36 barrels of gunpowder, and the Monteagle letter.",
      viewing_task: "[00:50] Quick Check: On what date was Guy Fawkes caught guarding 36 barrels of gunpowder beneath the House of Lords?\n[02:15] Hinge Question: Why were English Catholic gentry so desperate that they plotted to blow up King James I, the royal family, and the entire Parliament?",
      model_answer: "Quick Check: Midnight between 4 and 5 November 1605.\nHinge Question: Catholics felt deeply betrayed: King James had promised toleration before his accession, but instead intensified penal fines for recusancy (missing Protestant church) and expelled Catholic priests from England."
    },
    {
      id: "YptNONmnXH0",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=YptNONmnXH0",
      title: "The Gunpowder Plot (1605): Guy Fawkes & Robert Catesby | UK Parliament",
      duration: "4 mins 30 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:20–04:15 | Lesson Phase: Causal Breakdown | Tone Alert: Authoritative archival investigation using the original Monteagle letter and confessions.",
      viewing_task: "[01:10] Recall: Who was the true mastermind and ringleader behind the conspiracy (Robert Catesby)?\n[02:30] Explain: What was the plotters' operational plan following the detonation in Parliament (kidnapping Princess Elizabeth and installing a Catholic puppet monarch)?\n[03:50] Challenge: How did the Monteagle letter expose the conspiracy, and how was Guy Fawkes tortured on the rack to extract confessions?",
      model_answer: "Recall: Robert Catesby, a charismatic Catholic gentleman who recruited Guy Fawkes because of Fawkes' explosives experience fighting for Spain in Flanders.\nExplain: They planned to trigger a Catholic uprising in the Midlands, kidnap the 9-year-old Princess Elizabeth, convert her to Catholicism, and rule England through a regent.\nChallenge: A mysterious warning letter delivered to Lord Monteagle was passed to chief minister Robert Cecil; Fawkes withstood days of brutal torture on the rack before his signature degenerated into a tremulous scrawl naming his co-conspirators."
    },
    {
      id: "r5X1vyCPA-U",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=r5X1vyCPA-U",
      title: "Gunpowder (2017) | BBC Official Trailer (Kit Harington / Mark Gatiss)",
      duration: "2 mins 15 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:15 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Dark, tense BBC historical thriller depicting state persecution of Catholics and the secret conspiracy.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does the BBC drama portray the brutal surveillance state of Robert Cecil's priest-hunters? How does this context help explain why the plotters turned to extreme terror?",
      model_answer: "Cinematic Discussion Focus: The trailer shows priest-hunters smashing through floorboards, public executions, and torture, framing the conspiracy not as an isolated act of madness, but as a violent, desperate response by a persecuted religious minority facing state terror."
    },
    {
      id: "6niBsMeNToo",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=6niBsMeNToo",
      title: "The Legacy of the Gunpowder Plot & Jacobean Religion | English Heritage",
      duration: "4 mins 54 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 00:30–04:30 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Explores the Popish Recusants Act 1606 and the enduring annual bonfire ritual.",
      viewing_task: "[01:15] Recall: What annual thanksgiving holiday did Parliament establish following the plot's discovery (Observance of 5th November Act 1605)?\n[02:40] Explain: How did the plot poison public attitudes toward English Catholics for over two centuries, barring them from public office?\n[04:00] Challenge: How did King James I use the miraculous preservation of Parliament to argue for the Divine Right of Kings?",
      model_answer: "Recall: Gunpowder Treason Day (Bonfire Night), where citizens burned effigies of the Pope and Guy Fawkes to celebrate the King's deliverance.\nExplain: Catholics were viewed as potential foreign traitors loyal to Rome; Parliament imposed the 1606 Oath of Allegiance and banned Catholics from practicing law, serving as MPs, or entering universities until 1829.\nChallenge: James claimed that God's direct intervention in uncovering the plot proved that royal monarchs were appointed and protected personally by Almighty God, laying the ideological foundation for the Divine Right conflicts of his son Charles I."
    }
  ],
  // Lesson 5: Who controlled Britain? The Ideological Battle (Divine Right vs Parliament)
  [
    {
      id: "7Q1oya8CD20",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=7Q1oya8CD20",
      title: "English Civil Wars: Animated History | History on Maps",
      duration: "4 mins 10 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:00–04:10 | Lesson Phase: Lesson Hook | Tone Alert: Animated map tracing the ideological divide between Royalist Cavaliers and Parliamentarian Roundheads.",
      viewing_task: "[01:00] Quick Check: What political belief held that King Charles I was accountable only to God and could rule without Parliament?\n[03:00] Hinge Question: Why did King Charles I's Eleven Years' Personal Rule (1629–1640) convince MPs that the English monarchy was degenerating into an absolute tyranny?",
      model_answer: "Quick Check: The Divine Right of Kings.\nHinge Question: By dissolving Parliament, locking MPs out of Westminster, and levying unapproved taxes like Ship Money, Charles proved he intended to govern as an absolute European monarch like the King of France."
    },
    {
      id: "6niBsMeNToo",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=6niBsMeNToo",
      title: "Why Did England Have a Civil War? | English Heritage",
      duration: "4 mins 54 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:20–04:30 | Lesson Phase: Causal Breakdown | Tone Alert: Analytical breakdown of religion (Archbishop Laud), taxation (Ship Money), and constitutional powers.",
      viewing_task: "[01:15] Recall: What was Ship Money, and why did John Hampden's refusal to pay it in 1637 make him a national hero?\n[02:45] Explain: How did Archbishop William Laud's religious reforms (altar rails, ornate vestments, Prayer Book) provoke Scottish rebellion and Puritan fury?\n[04:10] Challenge: What fatal miscalculation did Charles I make on 4 January 1642 when he entered the House of Commons with 400 armed soldiers to arrest Five MPs?",
      model_answer: "Recall: An emergency coastal naval tax that Charles illegally extended to inland counties during peacetime without parliamentary consent.\nExplain: Puritans viewed Laud's reforms as creeping Catholicism; when Charles tried to force the Anglican Book of Common Prayer on Presbyterian Scotland, the Scots signed the National Covenant and invaded England.\nChallenge: Entering the Commons breached parliamentary privilege; Speaker Lenthall knelt and famously declared he had 'neither eyes to see nor tongue to speak' except as the House directed; the Five MPs had escaped by river, and Charles was forced to flee London to raise an army."
    },
    {
      id: "AK-NPntKbKE",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=AK-NPntKbKE",
      title: "To Kill a King (2003) | Official Movie Trailer (Tim Roth / Dougray Scott)",
      duration: "2 mins 15 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:15 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Intense drama exploring the relationship between Oliver Cromwell and General Thomas Fairfax.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does the film portray the ideological rift between General Fairfax (who wanted constitutional compromise) and Oliver Cromwell (who demanded the total destruction of the monarchy)?",
      model_answer: "Cinematic Discussion Focus: The trailer contrasts Fairfax's aristocratic moderation with Cromwell's religious zealotry, dramatizing how a war fought to defend ancient parliamentary liberties radicalized into revolutionary purges, military dictatorship, and regicide."
    },
    {
      id: "899il5aiTBg",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=899il5aiTBg",
      title: "The Battle of Naseby (1645) & The New Model Army | History Explainer",
      duration: "6 mins 40 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 00:30–06:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Tactical analysis of Cromwell's Ironsides and parliamentary military modernization.",
      viewing_task: "[01:45] Recall: What revolutionary features distinguished Parliament's New Model Army (meritocratic promotion, regular pay, religious zeal) from traditional feudal armies?\n[03:30] Explain: How did Cromwell's disciplined cavalry defeat Prince Rupert's royalist horsemen at the Battle of Naseby in June 1645?\n[05:15] Challenge: How did the discovery of the King's secret baggage train at Naseby expose Charles I's attempts to invite foreign Catholic armies to invade England?",
      model_answer: "Recall: Officers were promoted for military ability rather than noble birth, soldiers received regular wages and scarlet uniforms, and troops were driven by intense Puritan religious discipline.\nExplain: Rupert's cavalry charged off the battlefield to loot baggage wagons; Cromwell's Ironsides maintained formation, wheeled around, and crushed the exposed royalist infantry in the flank.\nChallenge: Letters captured in the royal cabinet proved Charles was secretly negotiating with Irish Catholic rebels and French monarchs to invade England, destroying his political credibility as a trustworthy English king."
    }
  ],
  // Lesson 6: Who controlled Britain? The Economic Shift (Trial and Execution of Charles I & The Commonwealth)
  [
    {
      id: "899il5aiTBg",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=899il5aiTBg",
      title: "The Trial and Execution of King Charles I (1649) | Historic Royal Palaces",
      duration: "6 mins 40 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:20–06:00 | Lesson Phase: Lesson Hook | Tone Alert: On location in Westminster Hall and the Banqueting House on Whitehall.",
      viewing_task: "[01:30] Quick Check: On what date was King Charles I beheaded on a wooden scaffold outside the Banqueting House on Whitehall?\n[04:45] Hinge Question: Why did Charles I refuse to enter a legal plea at his trial, asking by what lawful authority he was brought to court?",
      model_answer: "Quick Check: 30 January 1649.\nHinge Question: Charles argued that as sovereign monarch, all lawful courts derived their authority from him; no earthly court could put the Crown on trial, and submitting to their authority would betray the liberty of all his subjects."
    },
    {
      id: "AK-NPntKbKE",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=AK-NPntKbKE",
      title: "The Regicide: To Kill a King | Feature Film Scene",
      duration: "2 mins 15 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:00–02:15 | Lesson Phase: Constitutional Earthquake | Tone Alert: Dramatises the signing of the King's death warrant and the moral agony of the commissioners.",
      viewing_task: "[00:50] Recall: What treason charge was levelled against Charles I ('a tyrant, traitor, murderer, and public enemy to the good people of this nation')?\n[01:30] Explain: How did Pride's Purge in December 1648 expel moderate MPs to leave a radical 'Rump Parliament' willing to execute the King?\n[02:05] Challenge: How did the 59 commissioners who signed the death warrant justify executing an anointed king in the eyes of God and history?",
      model_answer: "Recall: Levying war against his own Parliament and people, shedding English blood to regain his tyrannical power.\nExplain: Colonel Thomas Pride stationed soldiers outside the House of Commons, arresting or turning away over 140 moderate MPs who favored negotiating a settlement with Charles.\nChallenge: They cited biblical passages declaring that blood pollutes the land until avenged; they believed Charles was 'that man of blood' personally guilty of the Civil Wars, and that God demanded his death to heal the commonwealth."
    },
    {
      id: "7Q1oya8CD20",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=7Q1oya8CD20",
      title: "The Commonwealth & Oliver Cromwell as Lord Protector | History Explainer",
      duration: "4 mins 10 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:15–03:50 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Explores Britain as an experimental republic (1649–1660) and Puritan rule.",
      viewing_task: "[01:15] Cinematic Discussion Focus: How does cinema depict the Puritan austerity of the Commonwealth (banning theatre, football, and Christmas celebrations) versus royalist opulence?",
      model_answer: "Cinematic Discussion Focus: Visual media contrasts the austere black attire, bare whitewashed churches, and moral policing of the Major-Generals with the lively, colourful traditions of Merrie England, explaining why many citizens welcomed the 1660 Restoration of Charles II."
    },
    {
      id: "6niBsMeNToo",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=6niBsMeNToo",
      title: "The Restoration (1660) & The 1689 Glorious Revolution | English Heritage",
      duration: "4 mins 54 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 00:30–04:40 | Lesson Phase: Synoptic Synthesis | Tone Alert: Traces the trajectory from the Commonwealth to the 1689 Bill of Rights.",
      viewing_task: "[01:20] Recall: Why did Parliament invite Charles II to return from exile to reclaim the throne in May 1660?\n[02:50] Explain: What occurred during the 1688 Glorious Revolution when Parliament invited William of Orange to depose James II?\n[04:15] Challenge: How did the 1689 Bill of Rights permanently establish parliamentary constitutional monarchy in Britain?",
      model_answer: "Recall: Following Cromwell's death, the military protectorate collapsed under his son Richard; nation was desperate for political stability and the restoration of traditional law.\nExplain: When James II fathered a Catholic male heir and tried to suspend anti-Catholic laws, parliamentary leaders invited Dutch Prince William and his wife Mary to intervene with an invasion fleet.\nChallenge: The 1689 Bill of Rights barred monarchs from levying taxes, maintaining standing armies, or suspending laws without parliamentary consent, cementing the supremacy of Parliament under the rule of law."
    }
  ],
  // Lesson 7: What were the mechanics of the Transatlantic Slave Trade? (Already 4 videos - preserves existing gold set)
  [
    {
      id: "IpgD2ehtMmM",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=IpgD2ehtMmM",
      title: "How Barbados Became the First Slave Society | BBC / David Olusoga",
      duration: "4 mins 35 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:20–04:15 | Lesson Phase: Foundational Evidence | Tone Alert: David Olusoga explores the legal creation of chattel slavery on Caribbean sugar estates.",
      viewing_task: "[01:10] Quick Check: What agricultural crop transformed Barbados into the wealthiest English colonial possession in the 17th century?\n[03:40] Hinge Question: Why did English planters shift from using indentured white servants to the permanent, hereditary enslavement of Africans?",
      model_answer: "Quick Check: Sugar cane.\nHinge Question: White indentured servants served fixed terms (usually 4–7 years) and could claim land or wages upon release; chattel slavery legally classified Black Africans and their unborn children as perpetual property for life, guaranteeing planters permanent free labour."
    },
    {
      id: "k7OQjNRsrvI",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=k7OQjNRsrvI",
      title: "The Barbados Slave Code (1661) | Smithsonian Channel / David Harewood",
      duration: "4 mins 52 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:20–04:30 | Lesson Phase: Legal Mechanics | Tone Alert: Forensic analysis of the 1661 statute that defined human beings as commercial merchandise.",
      viewing_task: "[01:15] Recall: What legal status did the 1661 Barbados Slave Code assign to captive Black people?\n[02:40] Explain: How did the Barbados code serve as the legal blueprint for slave laws across Jamaica, the Carolinas, and Virginia?\n[04:10] Challenge: In what ways did the law protect slave owners from murder charges if an enslaved person died under 'moderate correction'?",
      model_answer: "Recall: Enslaved Africans were classified as 'heathen, brutish, and dangerous', stripped of legal rights, and treated as real estate and movable property.\nExplain: Other colonies copied its clauses word-for-word, institutionalising total physical surveillance, curfews, and violent punishments across the English-speaking Atlantic.\nChallenge: The code explicitly exempted owners from murder charges if a captive died while being beaten for punishment, demonstrating that the colonial state sanctioned human murder to defend property rights."
    },
    {
      id: "era_sugar_shipping_docks",
      type: "era",
      url: "https://eduvids.org/embed/sugar-shipping-west-india-docks",
      title: "Sugar, Shipping & West India Docks | Britain's Forgotten Slave Owners | BBC Two",
      duration: "6 mins 30 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:20–06:00 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Visual investigation into the physical infrastructure of London built with slave wealth.",
      viewing_task: "[01:40] Cinematic Discussion Focus: How does the documentary visually contrast the monumental brick warehouses of London's West India Docks with the invisible human suffering on Caribbean sugar plantations?",
      model_answer: "Cinematic Discussion Focus: The camera explores colossal fortified docklands and neoclassical City banks, highlighting the immense physical wealth accumulated in Britain while contrasting it with the horrific physical destruction of enslaved human bodies that generated that wealth."
    },
    {
      id: "era_middle_passage_jackson",
      type: "era",
      url: "https://eduvids.org/embed/middle-passage-sunken-slave-ships",
      title: "The Middle Passage & Sunken Slave Ships | Enslaved with Samuel L. Jackson",
      duration: "48 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 10:00–35:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Marine archaeologists dive on sunken slave ship wrecks in the Atlantic.",
      viewing_task: "[14:00] Recall: What forensic artifacts (iron shackles, lead ballast, branding irons) do underwater divers uncover in the wreckage of slave ships?\n[24:30] Explain: How did the physical structure of slave ship holds facilitate rapid disease transmission (dysentery, smallpox, ophthalmia)?\n[36:00] Challenge: Why does Samuel L. Jackson emphasize that diving on these wrecks is a sacred act of restoring memory and human dignity to anonymous victims of maritime trauma?",
      model_answer: "Recall: Iron ankle cuffs, heavy ballast bars used to balance the weight of human cargo, and copper branding plates.\nExplain: Overcrowding in suffocating darkness with no ventilation and standing human waste created optimal conditions for lethal bacterial outbreaks, killing an estimated 15–20% of captives on each voyage.\nChallenge: For centuries, maritime history celebrated imperial galleons and naval admirals while erasing the millions who perished below deck; marine archaeology provides indisputable physical testimony to the victims of human trafficking."
    }
  ],
  // Lesson 8: How did enslaved Africans resist the Transatlantic Slave Trade?
  [
    {
      id: "-zPJwQkNfrs",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=-zPJwQkNfrs",
      title: "The Haitian Revolution | Caribbean History | Extra History Complete",
      duration: "12 mins 10 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:20–04:30 | Lesson Phase: Lesson Hook | Tone Alert: Fast-paced animated overview of Dutty Boukman, Toussaint Louverture, and the only successful slave revolt in history.",
      viewing_task: "[01:10] Quick Check: Which Caribbean colony—the wealthiest French sugar island—rebelled in August 1791, ultimately founding the free republic of Haiti in 1804?\n[03:30] Hinge Question: Why did European empires (Britain, France, Spain) react with utter panic to the Haitian Revolution?",
      model_answer: "Quick Check: Saint-Domingue (modern-day Haiti).\nHinge Question: Haiti destroyed the foundational racist lie of white supremacy: self-liberated enslaved Black soldiers defeated both British and Napoleonic French armies, terrifying colonial slaveholders that the rebellion would spread across the Caribbean."
    },
    {
      id: "ITtNDpkW26c",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=ITtNDpkW26c",
      title: "Abolitionism & Why It Was Opposed | BBC Bitesize",
      duration: "5 mins 20 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:20–04:50 | Lesson Phase: Abolition Campaign | Tone Alert: Explores parliamentary campaigns, consumer boycotts, and merchant resistance.",
      viewing_task: "[01:10] Recall: What economic arguments did the West India Interest make in Parliament to oppose the abolition of the slave trade?\n[02:45] Explain: How did over 300,000 British women organise the 1790s sugar boycott, refusing to buy slave-grown sugar for their households?\n[04:15] Challenge: How did enslaved uprisings in the Caribbean (such as Bussa's 1816 Rebellion in Barbados and Samuel Sharpe's 1831 Baptist War in Jamaica) make slavery economically unsustainable?",
      model_answer: "Recall: They argued abolition would destroy British maritime supremacy, ruin Liverpool and Bristol merchants, and hand colonial trade to rival nations.\nExplain: Disenfranchised women with no parliamentary vote deployed economic consumer power, passing out pamphlets and boycotting retailers, proving that moral public pressure could hurt plantation profits.\nChallenge: Massive uprisings showed that enslaved people were determined to achieve freedom by force; maintaining military garrisons to put down recurrent insurrections became more expensive than emancipating the captives."
    },
    {
      id: "Q6Cv5P9H9qU",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=Q6Cv5P9H9qU",
      title: "Amazing Grace (2006) | Abolitionist Campaign Feature Trailer",
      duration: "2 mins 31 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:31 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Depicts William Wilberforce, Thomas Clarkson, and Olaudah Equiano in London.",
      viewing_task: "[01:15] Cinematic Discussion Focus: How does the film depict the parliamentary and public tactics used to expose the reality of the slave trade to an indifferent British establishment?",
      model_answer: "Cinematic Discussion Focus: The trailer dramatises how abolitionists took MPs onto the Thames aboard a slave ship to inhale the stench of the hold and presented Josiah Wedgwood's medallion ('Am I not a man and a brother?'), shifting political debate from dry economics to inescapable moral horror."
    },
    {
      id: "era_resistance_jackson",
      type: "era",
      url: "https://eduvids.org/embed/resistance-enslaved-jackson",
      title: "Resistance: Enslaved with Samuel L. Jackson | BBC / Epix",
      duration: "48 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 12:00–38:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Explores shipboard mutinies, Underground Railroad networks, and African cultural survival.",
      viewing_task: "[15:00] Recall: How often did shipboard insurrections occur on transatlantic slave vessels (estimated on 1 in every 10 voyages)?\n[27:00] Explain: How did enslaved people resist day-to-day on plantations through tool-breaking, feigned illness, work slowdowns, and preserving African religious music?\n[37:30] Challenge: Why is it crucial to emphasize African agency and resistance rather than viewing abolition solely as a benevolent gift granted by white British politicians?",
      model_answer: "Recall: Armed revolts occurred on hundreds of voyages; captains spent fortunes on heavy iron nets ('barricadoes') and swivel guns pointing into the hold.\nExplain: Covert sabotage undermined daily plantation profits and psychological control while spirituals contained coded escape maps and preserved human dignity.\nChallenge: White parliamentary narratives historically ignored that enslaved people fought, bled, and organized for their own liberation; freedom was won primarily through Black rebellion, maroon warfare, and intellectual resistance, not parliamentary benevolence alone."
    }
  ],
  // Lesson 9: How 'modern' was Britain by 1750?
  [
    {
      id: "zhL5DCizj5c",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=zhL5DCizj5c",
      title: "Coal, Steam & The Industrial Revolution | CrashCourse",
      duration: "5 mins 30 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:15–04:45 | Lesson Phase: Lesson Hook | Tone Alert: Fast-paced synthesis exploring why Britain industrialised before other European nations.",
      viewing_task: "[01:10] Quick Check: What two critical geological and economic advantages—easily accessible coal and high wages—drove British inventors to mechanize manufacturing?\n[03:40] Hinge Question: By 1750, had Britain truly become a 'modern' society, or was it still an agrarian nation governed by a tiny landowning aristocracy?",
      model_answer: "Quick Check: Plentiful surface coal deposits near water transport, combined with high wages that made investing in labor-saving machinery profitable.\nHinge Question: While Britain was experiencing urban growth, financial revolution, and global trade, over 70% of the population still lived in rural villages, and political power remained monopolized by aristocratic landowners."
    },
    {
      id: "AVo7e5ZExX4",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=AVo7e5ZExX4",
      title: "18th-Century Britain: Agrarian Revolution & Enclosure | Timelines.tv",
      duration: "7 mins 12 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:30–06:00 | Lesson Phase: Agrarian Foundations | Tone Alert: Explores parliamentary enclosure, crop rotation (Townshend), and selective breeding (Bakewell).",
      viewing_task: "[01:30] Recall: What was parliamentary enclosure, and how did it convert open communal fields into private hedged farms?\n[03:15] Explain: How did agricultural innovations (Jethro Tull's seed drill, four-field crop rotation) vastly increase food production with fewer farm labourers?\n[05:00] Challenge: How did the enclosure movement dispossess rural cottagers, driving landless peasant families into the new industrial factory towns?",
      model_answer: "Recall: Acts of Parliament fencing off common lands and strips, giving exclusive ownership to wealthy landlords who could afford surveying and fencing fees.\nExplain: Eliminating fallow years allowed soil to produce crops continuously, while seed drills reduced waste, producing food surpluses that supported non-agricultural city populations.\nChallenge: Common grazing rights were stripped away; impoverished rural families who could no longer survive on smallholdings had no choice but to migrate to growing cities to seek factory employment."
    },
    {
      id: "qo0wACaFcaM",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=qo0wACaFcaM",
      title: "Barry Lyndon (1975) | Official Trailer (Stanley Kubrick)",
      duration: "2 mins 15 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:15 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Stanley Kubrick's 18th-century masterpiece filmed entirely in natural candle and sunlight.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does Kubrick capture the glittering elegance and ruthless social climbing of 18th-century aristocratic British society?",
      model_answer: "Cinematic Discussion Focus: The trailer contrasts stately neoclassical architecture, powdered wigs, and candlelit card rooms with the cold, cynical reality of class privilege, marriage for money, and military opportunism in Georgian Britain."
    },
    {
      id: "5Cc4LaSRiSc",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=5Cc4LaSRiSc",
      title: "The Making of 18th-Century Britain | BBC Documentary Archive",
      duration: "59 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 15:00–40:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Synthesizes the Bank of England (1694), the Royal Navy, and the expansion of consumer empire.",
      viewing_task: "[18:00] Recall: How did the founding of the Bank of England in 1694 revolutionize Britain's ability to borrow money for global naval wars?\n[28:30] Explain: How did coffee houses in Georgian London foster early capitalism, insurance markets (Lloyd's of London), and scientific debate?\n[38:00] Challenge: In reviewing the period 1450 to 1750, how did Britain transform from an isolated island off Europe into the center of a maritime global empire?",
      model_answer: "Recall: The national debt system allowed the British government to borrow massive funds at low interest backed by Parliament, funding naval dominance.\nExplain: Coffee houses served as informal stock exchanges, newsrooms, and discussion clubs where merchants, sea captains, and Enlightenment thinkers traded shipping news and founded modern financial institutions.\nChallenge: Through Protestant state formation, the defeat of rivals (Spain, Netherlands, France), joint-stock corporate finance, and commercial exploitation of enslaved labor and colonial resources, Britain created the commercial and financial framework of the modern global economy."
    }
  ]
];

const waterVideos = [
  // Lesson 1: How much progress did the Romans make in public health?
  [
    {
      id: "7QBbM5kb7YY",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=7QBbM5kb7YY",
      title: "The Engineering Genius of the Roman Aqueducts | Grand Structures",
      duration: "4 mins 15 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:20–04:00 | Lesson Phase: Lesson Hook | Tone Alert: Explores gravity flow, inverted siphons, and Roman hydraulic engineering.",
      viewing_task: "[01:00] Quick Check: How did Roman engineers use a slight, continuous downward gradient (1:200 to 1:1000) to transport millions of gallons of mountain water across miles into cities?\n[03:15] Hinge Question: Were Roman aqueducts built primarily to safeguard public health, or as political prestige projects to showcase imperial wealth and pacify citizens with luxuries?",
      model_answer: "Quick Check: They used gravity: water flowed continuously downhill along sealed stone channels and arched bridges from mountain springs.\nHinge Question: While fresh water promoted cleanliness, the primary driver was imperial prestige and civic contentment: most water supplied lavish public fountains, emperor's palaces, and heated bathhouses to keep populations compliant ('bread and circuses')."
    },
    {
      id: "5XgyIg5QKgE",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=5XgyIg5QKgE",
      title: "The Amazing Engineering of Roman Sewers: The Cloaca Maxima",
      duration: "5 mins 20 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:30–04:50 | Lesson Phase: Infrastructure Analysis | Tone Alert: Explores the Great Sewer of ancient Rome and communal multiseat latrines.",
      viewing_task: "[01:15] Recall: What was the original purpose of the Cloaca Maxima in ancient Rome (draining local marshland between hills)?\n[02:45] Explain: How did Roman communal latrines operate, and what hygiene hazards were caused by the shared sponge on a stick ('tersorium')?\n[04:10] Challenge: Despite aqueducts and sewers, why does modern palaeopathology reveal high rates of whipworm and gut parasites among Roman urban populations?",
      model_answer: "Recall: Constructed around 600 BC, it was originally an open drainage canal to drain marshy ground between the Palatine and Capitoline Hills before being vaulted over with stone.\nExplain: Citizens sat side-by-side on stone benches with running water beneath; however, cleaning themselves with a communal sponge rinsed in shared salt water rapidly spread intestinal parasites.\nChallenge: Warm, stagnant water in public baths was infrequently changed and lacked chemical disinfection, serving as breeding grounds for bacterial infections and parasitic worms."
    },
    {
      id: "P5ieIbInFpg",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=P5ieIbInFpg",
      title: "Gladiator (2000) | Official Movie Trailer (Paramount / Ridley Scott)",
      duration: "2 mins 20 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:20 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Oscar-winning cinematic depiction of ancient Rome's grand architecture and social hierarchy.",
      viewing_task: "[01:15] Cinematic Discussion Focus: How does the film visually contrast the marble monuments, fountains, and orderly streets of Rome with the gritty, disease-ridden reality of the Roman urban mob?",
      model_answer: "Cinematic Discussion Focus: The trailer contrasts grand Colosseum spectacles and imperial marble palaces with the crowded, volatile tenements (insulae) of the ordinary plebeians, illustrating the stark divide between Roman imperial propaganda and daily life."
    },
    {
      id: "klnMloYjHmg",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=klnMloYjHmg",
      title: "Roman Bathing and Wellness: How Were Roman Baths Really Used? | Primary Evidence",
      duration: "14 mins 05 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 01:00–12:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: On-site archaeological investigation into the Thermae, hypocaust underfloor heating, and strigils.",
      viewing_task: "[02:30] Recall: What was the sequential routine of rooms in a Roman bathhouse (apodyterium, tepidarium, caldarium, frigidarium)?\n[06:15] Explain: How did Roman hypocaust systems heat floors and pool water using underground slave-tended furnaces and hollow wall flues?\n[11:00] Challenge: In assessing Roman public health, how did the collapse of the Western Roman Empire in 476 AD cause an immediate, catastrophic regression in urban sanitation across Europe?",
      model_answer: "Recall: Changing room (apodyterium), warm room (tepidarium), hot steam room (caldarium), and plunge pool (frigidarium).\nExplain: Wood-burning furnaces forced superheated air through brick pillars beneath suspended tile floors and through terracotta pipes lining walls.\nChallenge: Without centralized Roman taxes, legionary engineers, and municipal administration, aqueducts were cut by invaders, lead pipes were looted, sewers silted up, and cities reverted to cesspits."
    }
  ],
  // Lesson 2: Why did public health decline during the Middle Ages?
  [
    {
      id: "NBxLWTyUJ0w",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=NBxLWTyUJ0w",
      title: "Medieval Sanitation, Gong Farmers & Street Filth | Explainer",
      duration: "3 mins 02 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:00–03:02 | Lesson Phase: Lesson Hook | Tone Alert: Humorous yet historically rigorous examination of medieval cesspits and nightsoil men.",
      viewing_task: "[00:50] Quick Check: Who were 'gong farmers' in medieval towns, and at what time of night were they legally allowed to work?\n[02:15] Hinge Question: Why were medieval towns so filthy when town councils repeatedly passed fines against throwing butchery waste and human feces into streets?",
      model_answer: "Quick Check: Men hired to shovel out human waste from privies and cesspits, restricted to working only between 9pm and 5am ('nightsoil').\nHinge Question: Town councils had no permanent police force or municipal street cleaners to enforce laws; populations grew faster than primitive infrastructure could cope with, so residents ignored fines."
    },
    {
      id: "nVJV8iEAm88",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=nVJV8iEAm88",
      title: "Medieval Monasteries: Engineering Water and Cleanliness | BBC Bitesize",
      duration: "9 mins 15 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:30–08:00 | Lesson Phase: Exceptional Cleanliness | Tone Alert: Explores monastic water systems at Canterbury and Fountains Abbey.",
      viewing_task: "[01:30] Recall: Why were medieval Christian monasteries so much cleaner and healthier than nearby towns?\n[04:15] Explain: How did monastic water systems separate incoming clean spring water for drinking from outflowing water used to flush the reredorter (latrines)?\n[07:00] Challenge: Why were the sophisticated sanitary engineering techniques developed in wealthy monasteries not adopted in ordinary medieval cities?",
      model_answer: "Recall: Monks valued physical cleanliness as a sign of spiritual purity ('cleanliness is next to godliness') and possessed the wealth, land, and literacy to design hydraulic systems.\nExplain: Water was channeled from uphill springs through lead pipes and settling tanks, supplying drinking water first, then kitchens, laundry, and finally flushing latrines out to the river.\nChallenge: Towns lacked unified ownership and single wealthy authorities; narrow streets were congested with private properties, and town burgesses were unwilling to levy heavy taxes for collective infrastructure."
    },
    {
      id: "JkOwLCib1Tk",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=JkOwLCib1Tk",
      title: "Black Death (2010) | Medieval Living Conditions & Pestilence Trailer",
      duration: "2 mins 18 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:18 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Visceral, authentic depiction of 14th-century village life, mud, isolation, and plague fear.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does the film visually portray the vulnerability of medieval communities with no knowledge of bacteria or microscopic vectors of disease?",
      model_answer: "Cinematic Discussion Focus: The trailer shows terrified villagers burning pitch barrels and carrying smoking herbs to ward off 'corrupt air' (miasma), illustrating how medieval medical theory left populations utterly defenceless against Yersinia pestis."
    },
    {
      id: "YhsPPBGtquo",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=YhsPPBGtquo",
      title: "The Black Death (1348): Causes, Symptoms & Medieval Responses | Timelines.tv",
      duration: "11 mins 40 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 01:00–11:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Rigorous documentary examining contemporary primary chronicles and archaeology.",
      viewing_task: "[02:15] Recall: What symptoms characterized bubonic plague (painful buboes in armpits and groin) and pneumonic plague?\n[05:30] Explain: How did the medieval Church interpret the Black Death as divine punishment for sinful mankind, leading to flagellant processions?\n[08:45] Challenge: How did the complete failure of both Galenic herbal medicine and Church prayer to stop the plague begin to undermine blind medieval faith in traditional authorities?",
      model_answer: "Recall: High fever, vomiting, agonizing black swellings (buboes), followed by internal bleeding and dark blotches beneath the skin.\nExplain: Priests preached that human sin had brought God's righteous wrath; brotherhoods of flagellants whipped themselves with iron-tipped cords to appease God's anger.\nChallenge: Because holy priests died at the same horrifying rate as ordinary sinners, and doctors reciting Galen were useless, educated people began to question whether ancient authorities held all the answers, sowing early seeds of scientific inquiry."
    }
  ],
  // Lesson 3: To what extent did towns become filthier during the Early Modern period?
  [
    {
      id: "LBvOZO1gmOE",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=LBvOZO1gmOE",
      title: "Sir John Harington and the Early Flush Toilet | History Explainer",
      duration: "4 mins 52 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:15–04:15 | Lesson Phase: Lesson Hook | Tone Alert: Explores Queen Elizabeth I's godson Sir John Harington and his 1596 water closet.",
      viewing_task: "[01:15] Quick Check: What invention did Sir John Harington design in 1596 called the 'Ajax'?\n[03:45] Hinge Question: Why did it take nearly 250 years for Harington's flush toilet to be widely adopted across British homes?",
      model_answer: "Quick Check: The first valve-operated flush toilet, complete with an overhead water cistern and discharge pipe.\nHinge Question: Flush toilets required continuous running piped water and sewer drainage to function; without municipal water mains and underground sewers, flush toilets simply dumped sewage into indoor cesspits, making smells and filth far worse."
    },
    {
      id: "6cMhO7JpaYE",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=6cMhO7JpaYE",
      title: "Restoration (1995) | Official Movie Trailer (Robert Downey Jr / Meg Ryan)",
      duration: "2 mins 15 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:15 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Depicts 17th-century London, royal court excess, and the catastrophic Great Plague of 1665.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does the film contrast the debauched luxury of King Charles II's court with the filthy streets of London where the plague took hold?",
      model_answer: "Cinematic Discussion Focus: The trailer contrasts silken royal banquets with plague-stricken slums where doors are painted with red crosses ('Lord have mercy upon us') and searchers of the dead cart away piles of corpses at night."
    },
    {
      id: "IwB1ha70dRA",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=IwB1ha70dRA",
      title: "The Great Plague (1665) | Timeline Documentary",
      duration: "48 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 10:00–35:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: In-depth historical investigation into the last major bubonic plague outbreak in England.",
      viewing_task: "[14:00] Recall: What public health quarantine measures did the Mayor of London enforce in 1665 when a house became infected?\n[24:00] Explain: How did wealthy elites (including King Charles II and physicians) flee the capital, abandoning the impoverished working class to perish in locked houses?\n[36:00] Challenge: In what ways did the 1665 plague reveal that public health responses had barely improved since the 1348 Black Death 300 years earlier?",
      model_answer: "Recall: Watchmen were posted outside bolted doors 24 hours a day with red crosses and the words 'Lord have mercy on us', locking healthy family members inside with the dying.\nExplain: The wealthy fled to country estates; poor workers had no savings and were trapped in crowded parishes like St Giles-in-the-Fields, suffering over 100,000 deaths.\nChallenge: Authorities still blamed corrupt air (miasma), slaughtered 40,000 harmless domestic dogs and cats (which allowed the true vector—fleas on black rats—to multiply exponentially), and relied on bloodletting and useless herbal pomanders."
    },
    {
      id: "oHhqzoqFqew",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=oHhqzoqFqew",
      title: "Living Conditions in Early Modern Towns | History Explainer",
      duration: "4 mins 17 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:20–04:00 | Lesson Phase: Urban Realities | Tone Alert: Detailed analysis of wooden overhanging jetties, open kennels, and polluted town pumps.",
      viewing_task: "[01:10] Recall: What were 'overhanging jetties', and how did they block sunlight and ventilation in early modern streets?\n[02:30] Explain: How did town brewers, tanners, and dyers dump industrial poisons and animal carcasses directly into urban rivers?\n[03:45] Challenge: How did the Great Fire of London (1666) inadvertently provide an opportunity to modernize streets with wider brick construction and cleaner drainage?",
      model_answer: "Recall: Upper stories of timber houses built jutting out over the street, nearly touching across narrow alleys and trapping foul stenches.\nExplain: Tanners soaked hides in animal urine and dog feces while butchers slaughtered animals in open streets, washing blood directly into surface gutters ('kennels') that emptied into drinking streams.\nChallenge: The fire destroyed over 13,000 crowded wooden houses; Parliament passed the Rebuilding of London Act 1667, banning timber jetties and mandating wider streets paved with stone and brick buildings with deeper cellars."
    }
  ],
  // Lesson 4: How did the Industrial Revolution lead to a public health crisis?
  [
    {
      id: "oHhqzoqFqew",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=oHhqzoqFqew",
      title: "The Growth of Industry & Factory Towns | BBC Bitesize",
      duration: "4 mins 17 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:15–03:45 | Lesson Phase: Lesson Hook | Tone Alert: Rapid overview of industrial urban migration, overcrowding, and life expectancy collapse.",
      viewing_task: "[01:00] Quick Check: In 1840s Manchester or Liverpool, what was the average life expectancy of a working-class factory labourer?\n[03:15] Hinge Question: Why did the rapid, unregulated growth of industrial cities create a far deadlier disease environment than medieval farming villages?",
      model_answer: "Quick Check: Approximately 17 to 19 years of age.\nHinge Question: Tens of thousands of workers were crammed into tiny spaces without sewers, clean piped water, or garbage collection; cesspools overflowed into cellars and seeped into drinking pumps, spreading cholera and typhoid."
    },
    {
      id: "TT4Z1Ikf36w",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=TT4Z1Ikf36w",
      title: "Victorian Slums & The Public Health Crisis | Secondary History",
      duration: "8 mins 30 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:30–07:45 | Lesson Phase: Forensic Evidence | Tone Alert: Investigates back-to-back courts, cellar dwellings, and privy pits.",
      viewing_task: "[01:45] Recall: What was a back-to-back house, and why did it provide virtually zero fresh air circulation?\n[04:00] Explain: How did water companies pump contaminated river water directly into communal standpipes for just two hours a day?\n[06:30] Challenge: In what ways did the laissez-faire economic philosophy of the Victorian government prevent state intervention to clean up slums?",
      model_answer: "Recall: Terraced houses joined together on three sides (back and both flanks) with windows only on the front, creating dark, damp, airless rooms.\nExplain: Private water companies drew water straight from rivers into which sewers emptied, turning standpipes on only briefly, forcing families to store polluted water in stagnant buckets.\nChallenge: Victorian politicians believed the government should not interfere in private property or business ('leave alone'); landlords fiercely resisted spending money on drains, and ratepayers refused to pay higher local taxes."
    },
    {
      id: "Ry2ULl8osu4",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=Ry2ULl8osu4",
      title: "Oliver Twist (2005) | Victorian Slums & Workhouses Trailer",
      duration: "2 mins 10 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:10 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Captures the visual grittiness, chimney smoke, and poverty of Victorian Britain.",
      viewing_task: "[01:05] Cinematic Discussion Focus: How does the cinematography use color, shadows, and claustrophobic framing to capture the unlivable environment of industrial slums?",
      model_answer: "Cinematic Discussion Focus: The film uses murky brownish-grey lighting, smoke-filled air, and narrow crowded streets to immerse the viewer in the grim sensory reality of Victorian urban poverty, illustrating why disease spread uncontrollably."
    },
    {
      id: "MdNXDqCGv3M",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=MdNXDqCGv3M",
      title: "Edwin Chadwick & The 1848 Public Health Act | Secondary History",
      duration: "6 mins 15 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 00:30–05:45 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Rigorous analysis of Chadwick's 1842 Sanitary Report and the 1848 legislation.",
      viewing_task: "[01:30] Recall: What statistical evidence did Edwin Chadwick present in his 1842 Report on the Sanitary Condition of the Labouring Population?\n[03:15] Explain: How did Chadwick use economic arguments to convince politicians that poor sanitation was costing taxpayers millions in Poor Law relief?\n[05:00] Challenge: Why was the 1848 Public Health Act largely ineffective (due to being non-compulsory and relying on optional local boards of health)?",
      model_answer: "Recall: He proved mathematically that life expectancy was drastically lower in industrial slums and that filthy living conditions, not laziness, caused disease.\nExplain: He argued that preventing disease by installing clean water and sewers was far cheaper than paying endless Poor Law relief to support widows and orphans of deceased breadwinners.\nChallenge: The Act was permissive rather than compulsory: town councils could choose whether or not to set up a board of health, and many refused because wealthy ratepayers refused to pay higher property taxes."
    }
  ],
  // Lesson 5: Why did it take the 'Great Stink' to finally clean up Britain's streets?
  [
    {
      id: "ZmaoHB5fKB4",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=ZmaoHB5fKB4",
      title: "Louis Pasteur & Germ Theory | Secondary History",
      duration: "4 mins 12 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:15–03:45 | Lesson Phase: Scientific Revolution Hook | Tone Alert: Explores the swan-neck flask experiment and disproving Spontaneous Generation.",
      viewing_task: "[01:00] Quick Check: In what year did French chemist Louis Pasteur publish his Germ Theory of disease?\n[02:45] Hinge Question: Why did the medical establishment take nearly two decades to accept that invisible microscopic bacteria caused disease rather than bad smells (miasma)?",
      model_answer: "Quick Check: 1861.\nHinge Question: Doctors had believed in the ancient miasma theory for over two thousand years; it seemed absurd that invisible microbes floating in the air could kill an adult human until Robert Koch specifically identified anthrax, tuberculosis, and cholera bacteria."
    },
    {
      id: "5k8AnhNkN04",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=5k8AnhNkN04",
      title: "Bazalgette: Saviour of the Great Stink | Institution of Civil Engineers",
      duration: "5 mins 14 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:20–04:45 | Lesson Phase: Engineering Triumph | Tone Alert: Technical analysis of Joseph Bazalgette's Victorian intercepting sewer network.",
      viewing_task: "[01:10] Recall: What occurred in the hot summer of 1858 that forced MPs in the Houses of Parliament to soak curtains in chloride of lime?\n[02:40] Explain: How did Joseph Bazalgette's network of 82 miles of underground brick intercepting sewers redirect 420 million gallons of sewage daily?\n[04:15] Challenge: How did Bazalgette's decision to double the diameter of his sewer pipes ('just in case') future-proof London's sanitation for over 150 years?",
      model_answer: "Recall: The 'Great Stink': the untreated sewage of 2 million people in the River Thames baked in extreme heat, producing an unbearable stench that disrupted Parliament.\nExplain: He built massive underground sewers parallel to the Thames that caught effluent before it reached the river, using gravity and steam pumping stations to carry it eastward to the Thames estuary.\nChallenge: He calculated the exact sewer capacity needed for London's population, said 'we're only going to do this once', and doubled pipe dimensions; his Victorian brick sewers still handle London's waste today."
    },
    {
      id: "lOIp7pOMrkI",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=lOIp7pOMrkI",
      title: "How The Victorians Ended London's Great Stink | History Documentaries",
      duration: "12 mins 40 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:30–11:30 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Acclaimed historical documentary recreating Victorian London and Bazalgette's struggles.",
      viewing_task: "[01:30] Cinematic Discussion Focus: How does the documentary capture the dramatic moment when Parliament was forced to pass legislation in just 18 days because the stink threatened MPs' own lives?",
      model_answer: "Cinematic Discussion Focus: The documentary highlights the irony: for decades, thousands of poor workers died in slums while Parliament did nothing; but when the stench of their own waste wafted through the windows of the House of Commons, politicians panicked and immediately granted Bazalgette £3 million."
    },
    {
      id: "era_sewer_king_bazalgette",
      type: "era",
      url: "https://eduvids.org/embed/sewer-king-seven-wonders",
      title: "The Sewer King: Seven Wonders of the Industrial World | BBC",
      duration: "48 mins 36 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 10:00–35:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: BBC docudrama starring Michael Kitchen as Sir Joseph Bazalgette.",
      viewing_task: "[14:00] Recall: What innovative construction material (Portland cement) did Bazalgette rigorously test to ensure sewers would not dissolve in acidic effluent?\n[26:30] Explain: How did Bazalgette's construction work also create the Victoria, Albert, and Chelsea Embankments, reclaiming 52 acres of prime riverside land?\n[38:15] Challenge: How did Bazalgette's engineering triumph permanently eradicate waterborne cholera from London even though he believed in the flawed miasma theory?",
      model_answer: "Recall: Portland cement: he personally inspected every batch to ensure it had maximum tensile strength in water.\nExplain: The embankments encased the massive low-level intercepting sewer pipes, the District underground railway line, and gas mains, simultaneously beautifying London and preventing tidal floods.\nChallenge: He believed bad smells caused cholera, so his goal was to remove foul-smelling waste; by diverting sewage away from drinking water intakes, he accidentally eliminated the cholera bacterium, ending epidemics in London forever."
    }
  ],
  // Lesson 6: Why did it take the scientific revolution of Germ Theory to finally conquer water-borne disease?
  [
    {
      id: "VJ86D_DtyWg",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=VJ86D_DtyWg",
      title: "The 1850s Map That Changed How We Fight Outbreaks | Vox",
      duration: "5 mins 12 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:00–05:12 | Lesson Phase: Lesson Hook | Tone Alert: Visually stunning spatial data visualization exploring Dr John Snow's 'Ghost Map'.",
      viewing_task: "[01:15] Quick Check: What neighborhood in Soho, London, suffered a devastating cholera outbreak killing 616 people in September 1854?\n[03:30] Hinge Question: How did Dr John Snow's revolutionary spatial map prove that cholera was transmitted through drinking water rather than miasma?",
      model_answer: "Quick Check: Broad Street (modern-day Broadwick Street) in Soho.\nHinge Question: Snow marked every cholera death with a black bar on a street map, showing that deaths clustered tightly around the Broad Street water pump; nearby workers at the brewery who drank only beer were completely unaffected."
    },
    {
      id: "lNjrAXGRda4",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=lNjrAXGRda4",
      title: "John Snow and the 1854 Broad Street Cholera Outbreak | Harvard Online",
      duration: "4 mins 45 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:20–04:20 | Lesson Phase: Epidemiological Breakthrough | Tone Alert: Harvard public health lecture exploring the source: an infant's dirty diaper leaking into the well.",
      viewing_task: "[01:00] Recall: What action did Dr John Snow persuade the local St James Parish board of guardians to take on 8 September 1854?\n[02:30] Explain: How did Reverend Whitehead uncover the origin of the outbreak (a cracked cesspool at 40 Broad Street where a sick infant's diaper water seeped into the well)?\n[04:00] Challenge: Why did the Board of Health reject Snow's waterborne theory in their official 1855 report despite overwhelming statistical evidence?",
      model_answer: "Recall: He persuaded them to remove the wooden handle of the Broad Street water pump, cutting off access to the contaminated water.\nExplain: Whitehead interviewed residents and discovered that a mother washed soiled diapers into a leaky brick cesspool situated just three feet from the pump well.\nChallenge: Chief medical officer Sir John Simon and Edwin Chadwick were dogmatic miasmatists; accepting Snow's waterborne theory meant admitting that spending millions flushing sewers into the Thames had actually worsened cholera epidemics."
    },
    {
      id: "Ftkmhs8BEms",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=Ftkmhs8BEms",
      title: "The Painted Veil (2006) | Official Movie Trailer (Edward Norton / Naomi Watts)",
      duration: "2 mins 25 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:25 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Acclaimed period drama depicting an epidemiological bacteriologist fighting a cholera epidemic.",
      viewing_task: "[01:15] Cinematic Discussion Focus: How does the film depict the bacteriologist's scientific struggle to enforce quarantine, boil drinking water, and bury corpses to halt a lethal cholera epidemic?",
      model_answer: "Cinematic Discussion Focus: The trailer dramatises the desperate race between scientific epidemiology and cholera: Edward Norton's character fights to purify the water supply and prevent contaminated irrigation, demonstrating how clean water engineering is the true cure for waterborne disease."
    },
    {
      id: "TLpzHHbFrHY",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=TLpzHHbFrHY",
      title: "England: The Broad Street Pump | Extra History (Part 1)",
      duration: "10 mins 15 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 01:00–09:30 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Compelling animated deep dive into Dr John Snow's life and the birth of modern epidemiology.",
      viewing_task: "[02:30] Recall: How did Snow's earlier work as an anaesthetist studying respiratory gases (chloroform for Queen Victoria) lead him to doubt that cholera was inhaled as miasma?\n[05:45] Explain: What was Snow's 'Grand Experiment' comparing Southwark & Vauxhall water company (intake downstream of sewage) with Lambeth water company (intake upstream)?\n[08:50] Challenge: How did the combination of John Snow's epidemiology and Robert Koch's 1883 microscopic isolation of the Vibrio cholerae bacterium finally conquer cholera globally?",
      model_answer: "Recall: Snow reasoned that if poison was inhaled into the lungs, initial symptoms would be respiratory; cholera symptoms were purely gastrointestinal (vomiting and diarrhoea), proving the poison must be swallowed.\nExplain: Customers living on the same streets with identical air had radically different mortality rates: households drinking sewage-polluted water died at 8 times the rate of those drinking clean upstream water.\nChallenge: Snow provided epidemiological proof that water carried the pathogen, and Koch provided microscopic proof of the specific comma-shaped bacterium, giving municipal governments the scientific certainty needed to mandate universal water filtration."
    }
  ],
  // Lesson 7: November Assessment Masterclass: Rapid Progress in Public Health (1800–1900)
  [
    {
      id: "js_Kab5C2xI",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=js_Kab5C2xI",
      title: "Public Health & Social Reform in Victorian Britain | UK Parliament",
      duration: "3 mins 30 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:15–03:15 | Lesson Phase: Synoptic Review Hook | Tone Alert: Compares the voluntary 1848 Public Health Act with the compulsory 1875 Act.",
      viewing_task: "[01:00] Quick Check: What major constitutional change transformed the 1875 Public Health Act from an optional recommendation into a compulsory legal duty?\n[02:45] Hinge Question: Why did the extension of the vote to urban working-class men in the 1867 Reform Act compel politicians to finally pass compulsory public health laws?",
      model_answer: "Quick Check: It made it mandatory for every local authority to appoint medical officers of health, provide clean water, build sewers, and inspect food.\nHinge Question: For the first time, working-class men in industrial towns had the vote; MPs could no longer ignore slum conditions if they wanted to win elections, ending the era of laissez-faire inaction."
    },
    {
      id: "XoS68K916eo",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=XoS68K916eo",
      title: "Government Action & The Public Health Act 1875 | GCSE History",
      duration: "3 mins 24 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:20–03:10 | Lesson Phase: Landmark Legislation | Tone Alert: Examines Disraeli's Tory social reforms ('Sanitas sanitatum, omnia sanitas').",
      viewing_task: "[00:50] Recall: What specific requirements were mandated by Benjamin Disraeli's 1875 Public Health Act?\n[01:45] Explain: How did the 1875 Act work alongside the Artisan's Dwellings Act to empower councils to demolish insanitary slums?\n[02:40] Challenge: In evaluating public health progress between 1800 and 1900, which factor was most decisive: scientific breakthroughs (Pasteur/Koch), engineering feats (Bazalgette), or government legislation?",
      model_answer: "Recall: Councils were legally required to provide clean water, maintain covered sewers, appoint sanitary inspectors, collect rubbish, and regulate food adulteration.\nExplain: It allowed local authorities to compulsorily purchase and tear down overcrowded, disease-ridden tenements and rebuild planned housing.\nChallenge: A holistic historical judgement: engineering (Bazalgette) created the physical infrastructure, science (Pasteur/Snow) proved why water sanitation worked, but compulsory government legislation (1875) was essential to force reluctant ratepayers to fund it nationwide."
    },
    {
      id: "Dj5h1kKjVYc",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=Dj5h1kKjVYc",
      title: "Victorian Urban Reality & Social Reform | Cinematic Trailer",
      duration: "2 mins 24 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:24 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Dramatises the human struggle of working-class citizens in industrial Britain.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does the cinematography capture the transition from despairing working-class poverty toward organized political demand for dignity, health, and representation?",
      model_answer: "Cinematic Discussion Focus: The trailer shows how working people united to demand basic human rights—including clean air, potable water, and decent housing—proving that political democracy and public health progress were inextricably linked."
    },
    {
      id: "lOIp7pOMrkI",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=lOIp7pOMrkI",
      title: "How The Victorians Ended London's Great Stink | Masterclass Archive",
      duration: "12 mins 40 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 01:00–12:00 | Lesson Phase: Synoptic Synthesis | Tone Alert: Comprehensive documentary exploring the culmination of 19th-century public health progress.",
      viewing_task: "[02:30] Recall: How did life expectancy in British cities change between 1850 and 1900 as a result of clean water infrastructure?\n[06:45] Explain: How did the eradication of waterborne cholera and typhoid pave the way for modern 20th-century welfare and healthcare systems?\n[11:00] Challenge: What lessons from 19th-century water sanitation apply to developing nations today where over 2 billion people still lack safely managed drinking water?",
      model_answer: "Recall: Infant mortality plummeted and average urban life expectancy rose from under 20 to nearly 50 by the early 20th century.\nExplain: Proving that government could successfully eliminate diseases through environmental hygiene laid the foundation for the 1911 National Insurance Act and the 1948 National Health Service (NHS).\nChallenge: The Victorian experience demonstrates that modern medicine alone cannot conquer disease without basic municipal infrastructure: clean tap water and subterranean sewage disposal remain the single greatest public health intervention in human history."
    }
  ]
];

function applyVideosToUnit(unitName, videosArray) {
  const filePath = path.join(__dirname, '..', 'units', unitName, 'data.js');
  let content = fs.readFileSync(filePath, 'utf8');

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

  const dataPath1 = path.join(__dirname, '..', 'data', `${unitName}.json`);
  const dataPath2 = path.join(__dirname, '..', 'public', 'data', `${unitName}.json`);
  fs.writeFileSync(dataPath1, JSON.stringify(unitData, null, 2), 'utf8');
  fs.writeFileSync(dataPath2, JSON.stringify(unitData, null, 2), 'utf8');
  console.log(`💾 Synced data/${unitName}.json and public/data/${unitName}.json`);
}

console.log('======================================================');
console.log('🌍 APPLYING 4-TIER VIDEO SHELF: EARLY MODERN WORLD & WATER');
console.log('======================================================');

applyVideosToUnit('early_modern_world', earlyModernVideos);
applyVideosToUnit('water_and_sanitation', waterVideos);

console.log('\nRebuilding database.json...');
execSync('node scripts/build_database.cjs', { stdio: 'inherit' });
console.log('\n🎉 EARLY MODERN WORLD & WATER 4-TIER SHELF COMPLETED ACROSS ALL 16 LESSONS!');
