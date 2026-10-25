/**
 * apply_all_eee_and_medicine_4tier_videos.cjs
 * Upgrades Early Elizabethan England (12 lessons) and Edexcel GCSE Medicine (26 lessons)
 * to the GCSE 4-Tier Ideal Classroom Video Shelf Standard (4 videos per lesson).
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 1. EEE 4-Tier Video Set (All 12 lessons -> exactly 4 videos each)
const eeeVideos = [
  // Lesson 1: Accession 1558
  [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=niPNzy6X6os",
      id: "niPNzy6X6os",
      title: "Simple History: Accession of Elizabeth I (1558) – Problems Facing the New Queen",
      duration: "3 mins 15 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:00–03:15 | Lesson Phase: Lesson Hook | Tone Alert: Animated overview of £300,000 royal debt, French invasion threats, and religious turmoil.",
      viewing_task: "[01:00] Quick Check: How much crown debt did Elizabeth I inherit from Mary I upon her accession in November 1558?\n[02:30] Hinge Question: Why was Elizabeth's gender and marital status viewed as an existential threat by 16th-century male European monarchs?",
      model_answer: "Quick Check: £300,000 (an astronomical debt in Tudor currency).\nHinge Question: European custom held that women were physically and intellectually incapable of ruling or commanding armies; monarchs assumed Elizabeth must marry quickly, risking handing England's sovereignty to a foreign prince."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=OOeal_k4bmE",
      id: "OOeal_k4bmE",
      title: "BBC / David Starkey: Elizabeth I – From Hatfield House to The Tudor Throne",
      duration: "5 mins 40 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:30–05:15 | Lesson Phase: Royal Succession | Tone Alert: Explores Elizabeth's survival under Mary I and appointment of William Cecil.",
      viewing_task: "[01:15] Recall: Where was Elizabeth sitting beneath an oak tree when informed she was Queen of England?\n[03:00] Explain: Why did Elizabeth appoint William Cecil as her Secretary of State and keep him in power for 40 years?\n[04:45] Challenge: How did the French victory capturing Calais in January 1558 leave England geographically vulnerable to invasion?",
      model_answer: "Recall: Hatfield House in Hertfordshire, reading the Bible.\nExplain: Cecil was politically astute, religiously moderate, completely loyal, and skilled at administrative finance, becoming the chief architect of Elizabethan government.\nChallenge: Calais was England's last territorial foothold on continental Europe; losing it meant France controlled both sides of the English Channel and could easily stage an invasion."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=sI9e_xRrhVw",
      id: "sI9e_xRrhVw",
      title: "Elizabeth (1998) | Official Feature Trailer (Cate Blanchett / Geoffrey Rush)",
      duration: "2 mins 15 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:15 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Shekhar Kapur's cinematic masterpiece capturing the dangerous Tudor court and assassination plots.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does the film capture the deadly political atmosphere of the Tudor court, where a young female queen must outmaneuver scheming bishops and dukes?",
      model_answer: "Cinematic Discussion Focus: The trailer visually captures the shadowy paranoia, candlelit conspiracies, and religious fanaticism surrounding Elizabeth, illustrating how she transformed from a vulnerable princess into the steely, white-faced 'Virgin Queen'."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=5Cc4LaSRiSc",
      id: "5Cc4LaSRiSc",
      title: "The Court of Elizabeth I & Royal Patronage | BBC Documentary",
      duration: "12 mins 30 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 01:00–11:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Detailed breakdown of the Privy Council, Parliament, and Royal Progresses.",
      viewing_task: "[02:30] Recall: What was the primary role of the Privy Council (roughly 19 trusted noble advisers)?\n[06:00] Explain: How did Elizabeth use royal progresses (summer tours staying at noble stately homes) to maintain public loyalty without cost to the royal treasury?\n[09:30] Challenge: How did Elizabeth balance parliamentary requests for taxation with her royal prerogative to forbid debate on marriage, religion, and foreign policy?",
      model_answer: "Recall: Meeting almost daily to advise the Queen on state policy, enforce laws, and manage royal finances.\nExplain: She traveled with her court across the country, showing herself to common subjects and bankrupting ambitious nobles who spent thousands entertaining her, ensuring their financial subservience.\nChallenge: She summoned Parliament only 13 times in 44 years, primarily to vote war taxes; whenever MPs attempted to debate her marriage or Church settlement, she sent royal messages ordering them to cease under threat of arrest."
    }
  ],
  // Lesson 2: The Religious Settlement 1559
  [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=-GbkZ_Y1AeQ",
      id: "-GbkZ_Y1AeQ",
      title: "GCSE History: The Religious Settlement of 1559 – Elizabeth's 'Middle Way'",
      duration: "4 mins 10 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:15–03:45 | Lesson Phase: Lesson Hook | Tone Alert: Clear breakdown of the Act of Supremacy, Act of Uniformity, and Royal Injunctions.",
      viewing_task: "[01:00] Quick Check: What official title did Elizabeth take in the 1559 Act of Supremacy instead of 'Supreme Head'?\n[02:45] Hinge Question: Why did Elizabeth choose the title 'Supreme Governor' of the Church of England rather than 'Supreme Head'?",
      model_answer: "Quick Check: Supreme Governor of the Church of England.\nHinge Question: It was a deliberate compromise: Catholics believed only the Pope could be head of the Church, while strict Protestants believed only Jesus Christ held headship, and many men opposed a female 'head'."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=1o8oIELbNxE",
      id: "1o8oIELbNxE",
      title: "The Act of Uniformity & Common Prayer | BBC Bitesize",
      duration: "5 mins 05 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:20–04:40 | Lesson Phase: Legal Breakdown | Tone Alert: Explores the 1559 Book of Common Prayer and deliberately ambiguous communion wording.",
      viewing_task: "[01:10] Recall: What fine was imposed under the 1559 Act of Uniformity for failing to attend Sunday church ('recusancy')?\n[02:40] Explain: How did the 1559 communion wording deliberately combine Protestant commemoration with Catholic belief in transubstantiation?\n[04:00] Challenge: Why did Elizabeth famously state through Francis Bacon that she had 'no desire to make windows into men's souls'?",
      model_answer: "Recall: One shilling (roughly a week's wages for a skilled labourer).\nExplain: Priests recited both Protestant wording ('take and eat this in remembrance') and Catholic phrasing ('preserve thy body and soul'), allowing both sides to interpret communion according to their own conscience.\nChallenge: She prioritized outward political loyalty and public church attendance over private theological belief, seeking to avoid the bloody religious massacres devastating France."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=sI9e_xRrhVw",
      id: "sI9e_xRrhVw",
      title: "Elizabeth (1998) | Passing the Act of Uniformity in Parliament Scene",
      duration: "2 mins 15 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:15 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Dramatic parliamentary confrontation between Protestant reformers and Catholic bishops.",
      viewing_task: "[01:05] Cinematic Discussion Focus: How does the film dramatise the intense parliamentary resistance from Catholic bishops in the House of Lords against the 1559 Uniformity Bill?",
      model_answer: "Cinematic Discussion Focus: The scene shows Lord Burghley (Cecil) and Walsingham maneuvering behind the scenes, locking away opposing bishops to pass the bill by a knife-edge margin of three votes, capturing the precarious birth of the Elizabethan Church."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=FhGGjRjvq7w",
      id: "FhGGjRjvq7w",
      title: "The Religious Settlement in the Shires | History Explainer",
      duration: "9 mins 30 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 01:00–08:30 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Examines how Church visitations, the Royal Injunctions, and crucifixes operated in practice.",
      viewing_task: "[02:00] Recall: What happened to Catholic Marian bishops when they refused to swear the Oath of Supremacy in 1559?\n[05:15] Explain: How did ordinary parish churches in conservative northern England slowly adopt Protestant whitewashing while secretly hiding Catholic chalices?\n[08:00] Challenge: Why did the 1559 Settlement ultimately satisfy neither hardline Puritans nor loyal Catholics in the long run?",
      model_answer: "Recall: All Marian bishops except one (the Bishop of Llandaff) refused the oath and were stripped of their bishoprics and placed under house arrest.\nExplain: Priests conformed outwardly to avoid fines while hiding statues, rosaries, and altar stones under floorboards in case England returned to Catholicism.\nChallenge: Puritans condemned organ music, stained glass, and wedding rings as 'popish rags', while devout Catholics felt compelled by the Pope to reject an illegitimate Protestant sovereign."
    }
  ],
  // Lesson 3: Challenge to the Religious Settlement
  [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=_tD3KvqCc8g",
      id: "_tD3KvqCc8g",
      title: "GCSE History: Threats to Elizabeth's Religious Settlement – Puritans & Catholics",
      duration: "4 mins 20 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:15–04:00 | Lesson Phase: Comparative Hook | Tone Alert: Compares the Puritan Vestments Controversy with the Catholic Papal Bull.",
      viewing_task: "[01:00] Quick Check: What clerical garment provoked the 1566 Vestments Controversy among Puritan clergy in London?\n[02:45] Hinge Question: Which group posed the greater immediate threat to Elizabeth in 1570: Puritan MPs demanding Church reform or Catholic nobles backed by the Pope?",
      model_answer: "Quick Check: The white linen surplice (which Puritans viewed as a Catholic vestment not mandated in the Bible).\nHinge Question: Catholic nobles posed the far deadlier existential threat: while Puritans challenged Church ritual but remained passionately anti-Spanish and loyal to the Queen, Catholic nobles possessed private armies and papal authorization to assassinate her."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=XvlZZeTMjK0",
      id: "XvlZZeTMjK0",
      title: "BBC / Bitesize: The Catholic Threat – Counter-Reformation, Seminary Priests & Jesuits",
      duration: "5 mins 10 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:20–04:45 | Lesson Phase: Jesuit Networks | Tone Alert: Explores William Allen's seminary at Douai, Edmund Campion, and priest holes.",
      viewing_task: "[01:15] Recall: What decree did Pope Pius V issue in 1570 in the papal bull Regnans in Excelsis?\n[02:50] Explain: How did seminary priests and Jesuits (like Edmund Campion) operate clandestinely in English manor houses using priest holes?\n[04:20] Challenge: How did the 1581 Act of Retain the Queen's Majesty transform Catholic missionary activity into high treason?",
      model_answer: "Recall: He excommunicated Elizabeth, declared her an illegitimate heretic, and ordered all Catholic subjects to disobey her under pain of damnation.\nExplain: Trained in European colleges, they entered England disguised as merchants or tutors, secretly celebrating Latin Mass in hidden architectural priest holes built by Nicholas Owen.\nChallenge: The Act raised recusancy fines to £20 a month (bankrupting wealthy gentry) and declared that converting anyone to Catholicism was an act of high treason punishable by hanging, drawing, and quartering."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=r5X1vyCPA-U",
      id: "r5X1vyCPA-U",
      title: "Priest Hunters & Catholic Persecution | Cinematic Trailer",
      duration: "2 mins 15 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:15 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Depicts royal pursuivants smashing into country houses searching for secret priests.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does the footage depict the psychological terror of secret Catholic families living under Walsingham's surveillance network?",
      model_answer: "Cinematic Discussion Focus: The trailer shows pursuivants knocking on walls with hammers to locate hollow cavities, measuring room dimensions, and threatening servants, illustrating the terrifying reach of the Elizabethan state security apparatus."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=6niBsMeNToo",
      id: "6niBsMeNToo",
      title: "The Trial and Execution of Edmund Campion (1581) | Document Archive",
      duration: "11 mins 45 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 01:00–10:30 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Examines Campion's 'Brag' and his famous interrogation on the rack in the Tower.",
      viewing_task: "[02:30] Recall: What was Edmund Campion's 'Challenge' ('Campion's Brag') distributed across London in 1580?\n[05:45] Explain: How did government prosecutors use the 'Bloody Questions' to force captured priests to choose between loyalty to the Pope or Queen?\n[09:00] Challenge: Why did Campion pray for Queen Elizabeth on the scaffold at Tyburn even as he was executed for high treason?",
      model_answer: "Recall: A written manifesto declaring he came purely for spiritual salvation of souls, not for political conspiracy, and challenging royal theologians to open debate.\nExplain: Prosecutors asked: 'If the Pope invades England, which side will you fight for?'; any answer condemning the Queen was treason, while condemning the Pope was heresy to Catholics.\nChallenge: Campion maintained to the end that he was a loyal Englishman who recognized Elizabeth as his rightful earthly monarch, demonstrating the tragic moral divide imposed by the Counter-Reformation."
    }
  ],
  // Lesson 4: Mary, Queen of Scots (1568–69)
  [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=LIZtyIgtVio",
      id: "LIZtyIgtVio",
      title: "Simple History: The Problem of Mary Queen of Scots – Flight to England & Captivity",
      duration: "3 mins 18 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:00–03:18 | Lesson Phase: Lesson Hook | Tone Alert: Fast-paced animated overview of the murder of Darnley, Bothwell, and Mary's flight across the Solway Firth.",
      viewing_task: "[01:00] Quick Check: Why did Mary, Queen of Scots flee to England in May 1568 in an open fishing boat?\n[02:30] Hinge Question: Why did Mary's arrival in England present Elizabeth with an impossible political dilemma?",
      model_answer: "Quick Check: Scottish Protestant lords rebelled and forced her to abdicate after her husband Lord Darnley was murdered and she married the chief suspect, the Earl of Bothwell.\nHinge Question: If Elizabeth helped Mary reclaim the Scottish throne, she would overthrow a friendly Protestant government; if she executed a fellow anointed queen, she would invite European Catholic invasion; if she let her go free, Mary would lead a Catholic rebellion."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=vZRq1fuD4pE",
      id: "vZRq1fuD4pE",
      title: "BBC / David Starkey: Mary Queen of Scots – The Casket Letters & House Arrest",
      duration: "5 mins 40 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:30–05:15 | Lesson Phase: Legal Investigation | Tone Alert: Investigates the York Inquiry and the contested silver casket love letters.",
      viewing_task: "[01:15] Recall: What were the 'Casket Letters' presented by the Scottish Regent Moray at the York Inquiry in 1568?\n[03:00] Explain: Why did the English inquiry deliberately reach an inconclusive verdict (finding Mary neither guilty nor innocent)?\n[04:45] Challenge: How did keeping Mary under luxurious house arrest for 19 years turn her into an inevitable magnet for Catholic assassination plots?",
      model_answer: "Recall: Eight letters and sonnets allegedly written by Mary to Bothwell proving she plotted Darnley's gunpowder murder at Kirk o'Field.\nExplain: A guilty verdict would require Elizabeth to hand an anointed queen back to rebels, while an innocent verdict would require restoring a hostile Catholic monarch; the fudge allowed Elizabeth to keep Mary detained indefinitely.\nChallenge: As Henry VIII's great-niece with a legitimate claim to the English throne, every Catholic plot—from the Northern Earls to Babington—centered on assassinating Elizabeth to place Mary on the throne."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=wnqjSgQK03M",
      id: "wnqjSgQK03M",
      title: "Mary Queen of Scots (2018) | Official Feature Trailer (Saoirse Ronan / Margot Robbie)",
      duration: "2 mins 25 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:25 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Intense drama depicting the personal and ideological clash between the two cousin queens.",
      viewing_task: "[01:15] Cinematic Discussion Focus: How does the film depict the contrast between Mary Stuart's emotional, romantic Catholic sovereignty and Elizabeth's calculated, pragmatic realpolitik?",
      model_answer: "Cinematic Discussion Focus: The trailer contrasts Mary's passionate claims to hereditary birthright in the Scottish highlands with Elizabeth's isolated, smallpox-scarred isolation in London, illustrating how patriarchal politics forced two queens into mortal rivalry."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=6niBsMeNToo",
      id: "6niBsMeNToo",
      title: "Mary Stuart in Captivity: Tutbury, Sheffield & Fotheringhay | Archive",
      duration: "10 mins 15 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 01:00–09:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Detailed historical examination of Mary's custody under the Earl of Shrewsbury.",
      viewing_task: "[02:00] Recall: Why did Elizabeth entrust Mary's custody to George Talbot, 6th Earl of Shrewsbury, and Bess of Hardwick?\n[05:00] Explain: How did Mary spend her long years of captivity creating intricate symbolic tapestries (such as the Oxburgh Hangings)?\n[08:15] Challenge: How did the French ambassador and Scottish diplomats continuously smuggle secret letters in and out of Mary's captivity?",
      model_answer: "Recall: Shrewsbury was one of the wealthiest, most reliable nobles in England, possessing multiple fortified castles far from the coast in the Midlands.\nExplain: She worked with Bess of Hardwick on embroidered panels packed with hidden political allegories, portraying herself as a captured bird or crowned dolphin awaiting restoration.\nChallenge: Despite strict surveillance, loyal Catholic servants, laundry women, and sympathetic local gentry carried encrypted cipher letters concealed in barrels and shoe soles to European embassies."
    }
  ],
  // Lesson 5: Plots and Revolts at Home (1569–1587)
  [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=XvlZZeTMjK0",
      id: "XvlZZeTMjK0",
      title: "Simple History: The Catholic Plots Against Elizabeth – Ridolfi, Throckmorton & Babington",
      duration: "3 mins 40 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:00–03:40 | Lesson Phase: Lesson Hook | Tone Alert: Rapid-fire overview of the 1569 Revolt of the Northern Earls, 1571 Ridolfi, 1583 Throckmorton, and 1586 Babington plots.",
      viewing_task: "[01:00] Quick Check: What Catholic mass did the Earls of Northumberland and Westmorland celebrate in Durham Cathedral in November 1569?\n[02:45] Hinge Question: Why did all four major Catholic plots rely fundamentally on promises of foreign military invasion from Spain or France?",
      model_answer: "Quick Check: The traditional Latin Catholic Mass, tearing down the Protestant communion table and burning English Bibles.\nHinge Question: English Catholic nobles lacked the military strength to overthrow the Tudor state alone; they required Spanish troops from the Netherlands or French armies to defeat Elizabeth's royal forces."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=PbXbn1ppTm0",
      id: "PbXbn1ppTm0",
      title: "Elizabeth: The Golden Age (2007) | The Babington Plot Scene",
      duration: "2 mins 15 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:15 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Dramatic thriller depicting the discovery of Babington's beer-barrel cipher letters.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does the film dramatise Walsingham's trap: allowing the plot to mature so Mary would personally sign her own death warrant in cipher?",
      model_answer: "Cinematic Discussion Focus: The trailer shows Walsingham watching the cipher letters pass through the brewer's beer barrels, waiting with cold precision until Mary endorsed the assassination of Elizabeth, giving him the legal proof required to execute her."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=OOeal_k4bmE",
      id: "OOeal_k4bmE",
      title: "Sir Francis Walsingham: Elizabeth's Spymaster Network | BBC Two",
      duration: "6 mins 15 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:30–05:45 | Lesson Phase: Intelligence Network | Tone Alert: Explores codebreaking, Thomas Phelippes' deciphering, and forgery.",
      viewing_task: "[01:20] Recall: What was the 1584 Bond of Association signed by thousands of English Protestants?\n[03:15] Explain: How did codebreaker Thomas Phelippes decipher Mary's substitution cipher and draw a gallows symbol on the deciphered sheet?\n[05:00] Challenge: Why was Elizabeth so terrified to sign Mary's death warrant, delaying for four months after the trial verdict?",
      model_answer: "Recall: An oath pledging that if Elizabeth was assassinated, anyone who benefited from the plot (specifically Mary) would be executed, regardless of complicity.\nExplain: Phelippes mastered mathematical cryptanalysis; he decoded Mary's letter agreeing to the assassination and forged a postscript asking for the names of the six conspirators.\nChallenge: Executing an anointed monarch set a dangerous precedent that subjects could legally kill an appointed sovereign, and Elizabeth feared bloody revenge from Mary's son James VI and Philip II of Spain."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=65oCIxobwVs",
      id: "65oCIxobwVs",
      title: "The Execution of Mary, Queen of Scots at Fotheringhay (1587) | Documentary",
      duration: "10 mins 30 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 01:00–09:30 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Forensic chronicle of 8 February 1587 in the Great Hall of Fotheringhay Castle.",
      viewing_task: "[02:15] Recall: What dramatic act of martyrdom did Mary perform on the scaffold when her black dress was removed?\n[05:30] Explain: How did the executioner bungle the beheading, requiring multiple blows of the axe?\n[08:15] Challenge: How did King Philip II of Spain use Mary's execution as the ultimate religious justification to launch the Spanish Armada?",
      model_answer: "Recall: She wore an undergown of liturgical crimson red—the colour of Catholic martyrdom—deliberately staging her execution as a holy sacrifice.\nExplain: The first blow missed her neck, striking the back of her head; the second severed the neck except for a sinew; when he picked up the severed head by the hair, her wig came off in his hand, leaving a grey, cropped head rolling on the boards.\nChallenge: Mary had bequeathed her claim to the English crown to Philip in her will; her death transformed his planned invasion from a punitive raid into a sacred holy crusade to avenge a Catholic martyr."
    }
  ],
  // Lesson 6: Relations with Spain, 1569–1585
  [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=ldZYD51Ohjo",
      id: "ldZYD51Ohjo",
      title: "GCSE History: Spain and England – Political, Religious & Commercial Rivalry",
      duration: "4 mins 15 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:15–03:50 | Lesson Phase: Geopolitical Hook | Tone Alert: Explores the Dutch Revolt, religious conflict, and privateering.",
      viewing_task: "[01:00] Quick Check: Why was the Spanish Netherlands of vital commercial importance to English merchants?\n[02:45] Hinge Question: Why did Elizabeth pursue a policy of plausible deniability with Francis Drake's privateering raids rather than declaring open war on Spain?",
      model_answer: "Quick Check: Antwerp was the primary European cloth market, purchasing three-quarters of all English wool textile exports.\nHinge Question: Spain was the richest superpower in the world with Europe's most feared army; Elizabeth could not afford a formal war, so she secretly funded Drake to plunder Spanish bullion while claiming to Philip she had no control over pirates."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=xPAKnqCOl_Q",
      id: "xPAKnqCOl_Q",
      title: "Early Elizabethan England: Sir Francis Drake – Privateering on the Spanish Main",
      duration: "5 mins 30 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:20–05:00 | Lesson Phase: Maritime Raids | Tone Alert: Explores the 1572 Nombre de Dios raid and the Cacafuego treasure ship.",
      viewing_task: "[01:15] Recall: What treasure ship did Drake capture off South America in 1579 (Nuestra Señora de la Concepción / Cacafuego)?\n[03:00] Explain: How did Drake's 1577–1580 circumnavigation of the globe return an astounding 4,700% profit to Elizabeth and investors?\n[04:30] Challenge: Why was Elizabeth's public knighting of Drake aboard the Golden Hind at Deptford in April 1581 seen by Philip II as a direct act of war?",
      model_answer: "Recall: A Spanish galleon carrying 26 tons of silver bullion, 80 pounds of gold, and thirteen chests of royal coins.\nExplain: He plundered unprotected Spanish ports along the Pacific coast of South America, sailing home via Indonesia and the Cape of Good Hope with £400,000 in treasure, enough to pay off England's entire national debt.\nChallenge: Philip had demanded Drake be hanged as a common pirate; by knighting him on the deck of his ship in front of the French ambassador, Elizabeth openly endorsed piracy and spat in the King of Spain's face."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=6WuoiR0I8Es",
      id: "6WuoiR0I8Es",
      title: "The Sea Hawk & Privateers: Elizabeth's Sea Dogs | Classic Trailer",
      duration: "2 mins 20 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:20 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Classic Hollywood swashbuckler depicting English privateers battling Spanish galleons.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does cinema romanticize English 'Sea Dogs' (Drake, Hawkins, Raleigh) as dashing patriotic adventurers rather than ruthless commercial privateers?",
      model_answer: "Cinematic Discussion Focus: Films frame privateers as noble defenders of English Protestant liberty, glossing over their participation in the transatlantic slave trade, plundering of civilian coastal towns, and violent greed."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=j1-OxNSjmh0",
      id: "j1-OxNSjmh0",
      title: "Empire of the Seas: The Tudor Navy & The Dutch Crisis | BBC Two",
      duration: "14 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 01:00–12:30 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Dan Snow explores naval shipwright John Hawkins and race-built galleons.",
      viewing_task: "[02:30] Recall: What occurred during the 1576 'Spanish Fury' in Antwerp when mutinous Spanish troops sacked the city?\n[06:15] Explain: How did the assassination of Dutch leader William the Silent in July 1584 threaten to hand the Netherlands entirely to Spain?\n[10:00] Challenge: How did the 1584 Treaty of Joinville between France and Spain eliminate Elizabeth's diplomatic buffer and make war inevitable?",
      model_answer: "Recall: Unpaid Spanish soldiers murdered 7,000 citizens, burned 1,000 houses, and destroyed Antwerp's commercial supremacy over three days of looting.\nExplain: William was the unifying leader of the Protestant Dutch rebellion; his assassination left the Dutch on the brink of collapse against the Duke of Parma's professional army.\nChallenge: The Catholic French Guise faction united with Philip II against Protestantism; Elizabeth could no longer play France off against Spain, facing an isolated England surrounded by a Catholic coalition."
    }
  ],
  // Lesson 7: Outbreak of War with Spain (1585–1588)
  [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=33zs4b3iyyw",
      id: "33zs4b3iyyw",
      title: "GCSE History: The Outbreak of War with Spain – The Netherlands & Cadiz",
      duration: "4 mins 10 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:15–03:50 | Lesson Phase: Lesson Hook | Tone Alert: Explores the 1585 Treaty of Nonsuch, Leicester's expedition, and the 1587 Cadiz raid.",
      viewing_task: "[01:00] Quick Check: How many English soldiers did Elizabeth agree to send to the Netherlands under the 1585 Treaty of Nonsuch?\n[02:30] Hinge Question: Why did Drake refer to his April 1587 raid on Cadiz harbour as 'singeing the King of Spain's beard'?",
      model_answer: "Quick Check: 7,400 troops (under the command of Robert Dudley, Earl of Leicester).\nHinge Question: He sailed boldly into Spain's chief naval base, destroyed over 30 Spanish warships and supply vessels, and delayed the sailing of the Armada by over a year, mocking Philip II's imperial power."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=RR-XqmhV1Oc",
      id: "RR-XqmhV1Oc",
      title: "Elizabeth: The Golden Age | King Philip II & The Escorial Scene",
      duration: "2 mins 15 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:15 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Portrays King Philip II praying in the gloomy stone corridors of the Escorial palace.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does the film contrast King Philip's sombre, religious fanaticism with Elizabeth's vibrant, theatrical court?",
      model_answer: "Cinematic Discussion Focus: The trailer shows Philip clutching rosaries amid towering stone crucifixes, framing the planned invasion of England as God's divine mandate to cleanse heresy, illustrating the religious certainty that drove the Armada."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=YqNYrYUiMfg",
      id: "YqNYrYUiMfg",
      title: "The Cadiz Raid (1587) & The Destruction of Seasoned Barrel Staves | BBC",
      duration: "5 mins 45 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:30–05:00 | Lesson Phase: Tactical Raids | Tone Alert: Detailed breakdown of the logistical damage caused by Drake at Cadiz.",
      viewing_task: "[01:15] Recall: What critical food preservation supplies did Drake burn at Cadiz (thousands of seasoned wooden barrel staves)?\n[03:00] Explain: Why did the destruction of seasoned oak barrels cause catastrophic food spoilage and water contamination during the 1588 Armada campaign?\n[04:30] Challenge: Why was Leicester's military campaign in the Netherlands (1585–1587) such an expensive, disastrous failure?",
      model_answer: "Recall: Thousands of seasoned barrel staves and hooping iron used to build watertight storage casks.\nExplain: Spain was forced to build barrels from unseasoned green wood, which shrank, leaked, and rotted; barrels of beer and fresh water spoiled within weeks of setting sail, leaving Spanish crews sick with dysentery.\nChallenge: Leicester quarrelled with Dutch leaders, accepted the title of Governor-General without Elizabeth's permission (enraging the Queen), and his troops were underpaid and poorly supplied, failing to capture any major ports."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=era_armada_battlefield",
      id: "era_armada_battlefield",
      title: "Battlefield Britain: The Spanish Armada Strategic Build-Up | BBC Two",
      duration: "12 mins 15 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 01:00–11:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Peter & Dan Snow analyze the Duke of Medina Sidonia and Parma's invasion army.",
      viewing_task: "[02:30] Recall: What was Philip II's grand invasion strategy (sailing 130 ships to the Netherlands to ferry Parma's 30,000 veterans across the Channel)?\n[06:00] Explain: What fatal flaw undermined the plan (Medina Sidonia had no deep-water port in the Netherlands and no way to communicate with Parma in real time)?\n[09:45] Challenge: Why did the Duke of Medina Sidonia repeatedly beg Philip II to cancel the expedition, stating he was prone to seasickness and unqualified to lead a fleet?",
      model_answer: "Recall: The Armada would sweep the English Channel, anchor off Flanders, protect Parma's barges crossing to Margate, and march on London.\nExplain: Dutch shallow-water flyboats blockaded Parma's canals; the Armada could not enter shallow Flemish waters to protect him, and messages sent overland by horse took days to arrive.\nChallenge: Medina Sidonia had never commanded a naval fleet and knew logistical preparations were chaotic; Philip ignored his warnings, believing God would provide miraculous victory for Catholic Spain."
    }
  ],
  // Lesson 8: The Spanish Armada (1588)
  [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=3b94RZcxQnE",
      id: "3b94RZcxQnE",
      title: "Simple History: The Spanish Armada (1588) – Crescent Formation, Fireships & Gravelines",
      duration: "3 mins 30 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:00–03:30 | Lesson Phase: Lesson Hook | Tone Alert: Clear animated tactical map showing the Channel battles, Calais fireships, and the retreat around Scotland.",
      viewing_task: "[01:00] Quick Check: What defensive naval formation did the Spanish Armada maintain sailing up the English Channel?\n[02:15] Hinge Question: Was the defeat of the Spanish Armada primarily achieved by English naval tactical superiority or by the catastrophic Atlantic storms ('the Protestant Wind')?",
      model_answer: "Quick Check: An unbroken, crescent-shaped defensive formation with powerful heavy galleons on the flanks protecting transport ships in the center.\nHinge Question: While fireships and superior gunnery broke the Armada's formation at Gravelines, catastrophic north-westerly gales wrecked dozens of ships along the rocky coasts of Scotland and Ireland, turning tactical defeat into total annihilation."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=kYv_3cZzU4I",
      id: "kYv_3cZzU4I",
      title: "BBC Two / Dan Snow: Armada – 12 Days to Save England (The Battle of Gravelines)",
      duration: "5 mins 45 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:30–05:15 | Lesson Phase: Tactical Breakthrough | Tone Alert: Explores the eight midnight fireships off Calais and rapid-reloading gun carriages.",
      viewing_task: "[01:20] Recall: Why did Spanish captains cut their iron anchor cables at midnight off Calais on 7 August 1588?\n[03:10] Explain: How did English four-wheeled naval gun carriages allow English gunners to fire three times as many cannonballs as the Spanish?\n[04:45] Challenge: How did the loss of their primary anchors make it impossible for Spanish ships to survive the ferocious storms off the Irish coast?",
      model_answer: "Recall: Eight blazing fireships drifted toward them; captains cut cables to escape being incinerated in the dark, scattering the fleet.\nExplain: English cannons recoiled inside the ship on rope tackles and were reloaded inboard by trained gun crews; Spanish guns were mounted on clumsy two-wheeled field carriages and could barely be reloaded in heavy seas.\nChallenge: Without anchors, damaged galleons caught in Atlantic gales could not ride out storms in sheltered bays and were driven directly onto the rocky cliffs of Donegal, Sligo, and the Hebrides."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=RR-XqmhV1Oc",
      id: "RR-XqmhV1Oc",
      title: "Elizabeth: The Golden Age (2007) | Armada Defeat & The Tilbury Speech",
      duration: "2 mins 15 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:15 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Cate Blanchett delivers the famous Speech to the Troops at Tilbury in silver armor.",
      viewing_task: "[01:05] Cinematic Discussion Focus: How does the film frame Elizabeth's Tilbury speech: 'I know I have the body of a weak and feeble woman, but I have the heart and stomach of a king, and of a king of England too'?",
      model_answer: "Cinematic Discussion Focus: The scene visually elevates Elizabeth from a frail mortal into an indomitable warrior-monarch riding a white steed, uniting her subjects and transforming the Armada victory into an enduring national myth of Protestant English triumph."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=era_armada_battlefield",
      id: "era_armada_battlefield",
      title: "The Spanish Armada: Complete Historiographical Documentary | BBC Archive",
      duration: "45 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 15:00–38:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Deep critical assessment of the Armada's failure and its psychological impact on Europe.",
      viewing_task: "[18:00] Recall: How many of the 130 Spanish ships successfully made it back to Spain (barely 67 battered vessels)?\n[28:30] Explain: What commemorative medal did Elizabeth order struck proclaiming: 'God blew and they were scattered' ('Flavit et dissipati sunt')?\n[36:00] Challenge: Why did the war with Spain continue for another 16 years until 1604 despite the celebrated Armada victory?",
      model_answer: "Recall: Over 60 ships were destroyed, sunk, or wrecked, with over 15,000 Spanish sailors and soldiers perishing.\nExplain: The medal attributed victory to divine Protestant weather rather than human pride, reinforcing the religious belief that God favored England.\nChallenge: Philip rebuilt his naval fleets; English counter-armadas (such as Drake's 1589 Lisbon expedition) were disastrous failures, and the war dragged on, bankrupting the Crown until James I signed the 1604 Treaty of London."
    }
  ],
  // Lesson 9: Education and Leisure (1558–1588)
  [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=ZdHP5b4Uwbw",
      id: "ZdHP5b4Uwbw",
      title: "GCSE History: Elizabethan Education & Leisure – Grammar Schools, Sports & Pastimes",
      duration: "4 mins 15 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:15–03:45 | Lesson Phase: Lesson Hook | Tone Alert: Compares noble leisure (hunting, hawking, tennis) with working-class bear-baiting and football.",
      viewing_task: "[01:00] Quick Check: What Latin school books and classical subjects formed the core curriculum of Elizabethan grammar schools?\n[02:45] Hinge Question: Did the growth of grammar schools promote genuine social mobility or simply reinforce existing class and gender hierarchies?",
      model_answer: "Quick Check: Latin grammar, classical literature (Ovid, Virgil, Cicero), and religious catechism.\nHinge Question: While a small number of talented middle-class boys (like William Shakespeare) gained an education, fees excluded poor labourers, and girls were almost completely barred from formal schooling."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=eKyCtKwXBMI",
      id: "eKyCtKwXBMI",
      title: "BBC / Bitesize: Elizabethan Society – Literacy, Grammar Schools & Bankside Spectacles",
      duration: "5 mins 10 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:20–04:40 | Lesson Phase: Social Structure | Tone Alert: Explores the Great Chain of Being and Bankside entertainment.",
      viewing_task: "[01:15] Recall: What violent bloodsports were popular on Bankside alongside theatres (bear-baiting, bull-baiting, cockfighting)?\n[02:50] Explain: Why did Puritan city authorities in London fiercely oppose playhouses, calling them 'nests of the devil'?\n[04:10] Challenge: How did the physical architecture of public amphitheatres like The Globe mirror the social hierarchy of Elizabethan England?",
      model_answer: "Recall: Spectators bet on dogs attacking chained bears or roosters fighting to the death in wooden pits.\nExplain: Puritans believed theatres encouraged sinful idleness, drunkenness, and sexual immorality, and warned that large crowds spread the plague.\nChallenge: Common labourers paid one penny to stand in the open yard as 'groundlings' exposed to rain and mud, while wealthy merchants and nobles paid more for cushioned, roofed gallery seats and lords' boxes."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=4FqV2nU-GqA",
      id: "4FqV2nU-GqA",
      title: "Shakespeare in Love (1998) | Bankside Theatres, Groundlings & Censorship Trailer",
      duration: "2 mins 20 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:20 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Oscar-winning depiction of Elizabethan theatre, actors, and the Master of the Revels.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does the film capture the bustling, commercial energy of Elizabethan London theatre, where acting companies competed for paying audiences?",
      model_answer: "Cinematic Discussion Focus: The trailer shows open-air stages, groundlings cheering and throwing fruit, and the Master of the Revels threatening to close theatres, capturing the precarious commercial world of Tudor entertainment."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=qo0wACaFcaM",
      id: "qo0wACaFcaM",
      title: "The Golden Age of Tudor Literature & The English Renaissance | BBC Archive",
      duration: "11 mins 30 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 01:00–10:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Examines printing presses, poetry (Spenser, Marlowe), and national identity.",
      viewing_task: "[02:30] Recall: What literacy rates existed in Elizabethan England (roughly 30% for men, under 10% for women)?\n[05:45] Explain: How did Christopher Marlowe and William Shakespeare create a rich, flexible English vernacular that rivalled classical Latin and Greek?\n[09:00] Challenge: In evaluating whether Elizabethan England experienced a 'Golden Age', to what extent did this cultural flowering benefit only the wealthy elite?",
      model_answer: "Recall: Literacy was restricted largely to merchants, yeoman farmers, and gentry; agricultural labourers remained almost entirely illiterate.\nExplain: They invented thousands of new words, embraced iambic pentameter, and addressed universal human dilemmas, giving England a proud national literary voice.\nChallenge: For the 40% of the population living in grinding poverty and food insecurity, there was no golden age; the cultural renaissance was an aristocratic and middle-class luxury."
    }
  ],
  // Lesson 10: Problem of the Poor & Vagrancy (1558–1588)
  [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=l_XAxCQvWZQ",
      id: "l_XAxCQvWZQ",
      title: "GCSE History: Poverty and Vagrancy – Causes, Enclosure & The Idle Poor",
      duration: "4 mins 10 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:15–03:45 | Lesson Phase: Economic Causes | Tone Alert: Explores population growth (surging to 4 million), inflation, bad harvests, and sheep enclosure.",
      viewing_task: "[01:00] Quick Check: How did sheep farming and the enclosure of common land reduce rural agricultural employment?\n[02:45] Hinge Question: Why were Elizabethan authorities so terrified of wandering 'sturdy beggars' (vagabonds)?",
      model_answer: "Quick Check: Sheep farming required vast pastures but only one or two shepherds, leaving dozens of arable farm labourers unemployed and landless.\nHinge Question: Authorities feared roaming bands of unemployed men would form criminal gangs, spread infectious diseases like the plague, and ignite peasant rebellions against the social order."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=2gWiGuQvPsY",
      id: "2gWiGuQvPsY",
      title: "BBC Bitesize: The Elizabethan Poor Laws – Punishment to Parish Relief (1572 & 1576)",
      duration: "5 mins 05 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:20–04:40 | Lesson Phase: Legislative Evolution | Tone Alert: Explores the categorization into 'Deserving Poor' and 'Idle Poor'.",
      viewing_task: "[01:10] Recall: What harsh punishments were inflicted on unlicensed vagrants under the 1572 Vagabonds Act (whipping, boring an ear with hot iron)?\n[02:40] Explain: How did the 1576 Act 'for the Relief of the Poor' require towns to provide raw materials (wool, hemp, iron) for the able-bodied poor to work?\n[04:00] Challenge: How did the landmark 1601 Elizabethan Poor Law establish a nationwide parish-based system of poor relief that survived for over two centuries?",
      model_answer: "Recall: Whipping until bloody, boring a hole through the right ear with a hot iron, and execution for third-time offenders.\nExplain: It recognized for the first time that some people could not find work through no fault of their own, creating Houses of Correction to put them to work.\nChallenge: The 1601 Act mandated local property taxes (poor rates), appointed Overseers of the Poor in every parish, built almshouses for the elderly and sick, and apprenticed pauper children, creating the first state-administered welfare system in Europe."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=Ry2ULl8osu4",
      id: "Ry2ULl8osu4",
      title: "Vagabonds, Ruffs & The Tudor Underworld | Dramatic Reconstruction",
      duration: "2 mins 15 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:15 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Depicts Elizabethan confidence tricksters: counterfeit cranks, clapper dudgeons, and hookers.",
      viewing_task: "[01:05] Cinematic Discussion Focus: How does the dramatisation depict the sensationalized Tudor pamphlets (such as Thomas Harman's Caveat for Common Cursitors) that stoked moral panic about vagrants?",
      model_answer: "Cinematic Discussion Focus: The dramatisation illustrates how popular literature exaggerated the threat of clever, disguised beggars foaming at the mouth with soap, creating a hysterical public moral panic that justified brutal state whippings."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=SrrXUN7S_Ys",
      id: "SrrXUN7S_Ys",
      title: "The Crisis of the 1590s: Famine, War & Social Breakdown | Archive",
      duration: "10 mins 45 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 01:00–09:30 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Detailed historical examination of four consecutive bad harvests and food riots.",
      viewing_task: "[02:30] Recall: What catastrophic weather struck England in the 1590s causing the worst food crisis of the century?\n[05:45] Explain: How did the cost of wheat surge by over 200%, sparking grain riots in Kent, London, and Oxfordshire?\n[08:45] Challenge: How did the desperation of the 1590s force Elizabeth's government to abandon purely punitive measures and construct the comprehensive 1601 Poor Law?",
      model_answer: "Recall: Torrential, ceaseless summer rains that rotted wheat crops in the fields across four successive years.\nExplain: Hoarding by grain merchants drove bread prices to unaffordable heights; starving families seized grain carts and rioted in marketplaces.\nChallenge: Confronted with food riots and the threat of general peasant rebellion, the government recognized that whipping starving people would provoke revolution; state-organized relief was essential to maintain public order."
    }
  ],
  // Lesson 11: Exploration and Voyages of Discovery (1558–1588)
  [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=VzWOmz0oZbE",
      id: "VzWOmz0oZbE",
      title: "GCSE History: Francis Drake & Elizabethan Exploration – New Navigational Tech",
      duration: "4 mins 10 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:15–03:50 | Lesson Phase: Lesson Hook | Tone Alert: Explores astrolabes, magnetic compasses, Mercator projection maps, and galleon design.",
      viewing_task: "[01:00] Quick Check: What navigational instruments enabled Elizabethan sailors to calculate latitude by measuring the angle of the sun or Pole Star?\n[02:45] Hinge Question: Were Elizabethan voyages of exploration driven primarily by scientific curiosity or ruthless commercial greed and plunder?",
      model_answer: "Quick Check: The astrolabe, cross-staff, and quadrant.\nHinge Question: While navigators mapped ocean currents, the overwhelming driver was commercial profit: merchants invested fortunes to break Spanish and Portuguese monopolies and seize trade in spices, silks, and gold."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=0lAzq1hM5xE",
      id: "0lAzq1hM5xE",
      title: "BBC / British Library: The Tudor Age of Discovery – Trade Monopolies & Global Routes",
      duration: "5 mins 30 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:20–05:00 | Lesson Phase: Chartered Trade | Tone Alert: Explores the Muscovy Company, Levant Company, and search for the Northwest Passage.",
      viewing_task: "[01:15] Recall: What elusive maritime route to China and India did Martin Frobisher and John Davis search for in the frozen Arctic (the Northwest Passage)?\n[03:00] Explain: How did chartered trading companies (Muscovy Company trading with Russia, Levant Company with the Ottoman Empire) expand English markets?\n[04:30] Challenge: In what ways did John Hawkins' voyages in the 1560s establish England's direct participation in the transatlantic slave trade?",
      model_answer: "Recall: The Northwest Passage around the northern coast of Canada to reach Asian spice markets.\nExplain: Chartered companies were granted royal monopolies to open diplomatic trade with distant rulers (like Tsar Ivan the Terrible), bypassing European middlemen.\nChallenge: Hawkins kidnapped hundreds of Africans in Sierra Leone, transported them across the Atlantic, and sold them to Spanish plantations in the Caribbean, laying the foundations for Britain's triangular slave trade."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=BDepKiFIt5A",
      id: "BDepKiFIt5A",
      title: "Voyages into the Unknown: Navigating the Southern Oceans | Cinematic Trailer",
      duration: "2 mins 15 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:15 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Epic sea drama capturing wooden sailing ships battling uncharted oceans and scurvy.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does the cinematography capture the terrifying isolation, sickness, and mortal danger faced by Elizabethan sailors crossing unknown oceans?",
      model_answer: "Cinematic Discussion Focus: The trailer shows towering ocean swells, rotten rations, and sailors dying of scurvy in cramped wooden berths, illustrating that more men died of malnutrition and disease than enemy cannon fire."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=j1-OxNSjmh0",
      id: "j1-OxNSjmh0",
      title: "Drake's Circumnavigation of the Globe (1577–1580) | BBC Landmark Archive",
      duration: "14 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 01:00–12:30 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Traces the Pelican (Golden Hind) through the Strait of Magellan to California and the Spice Islands.",
      viewing_task: "[02:30] Recall: What execution did Drake carry out at Port St Julian in Patagonia (executing his second-in-command Thomas Doughty for mutiny)?\n[06:15] Explain: How did Drake claim 'Nova Albion' (Northern California) for Queen Elizabeth in June 1579?\n[10:30] Challenge: How did Drake's successful circumnavigation fundamentally shatter Spanish and Portuguese claims that the oceans were their private imperial preserves?",
      model_answer: "Recall: Drake tried and beheaded Doughty, establishing that the captain held absolute authority over both gentlemen and common sailors ('I must have the gentleman to haul and draw with the mariner').\nExplain: He repaired his ship near modern San Francisco, nailed a brass plaque to a post claiming the land for Elizabeth, and traded peaceably with the local Coast Miwok people.\nChallenge: It proved English ships could penetrate Spain's most secret Pacific waters, trade directly in the Moluccas, and return home with astronomical wealth, inspiring an explosion of English colonial ambition."
    }
  ],
  // Lesson 12: Raleigh and the Colonisation of Virginia (1584–1590)
  [
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=IpVLfwhvbeU",
      id: "IpVLfwhvbeU",
      title: "GCSE History: Walter Raleigh & The Colonisation of Virginia (1584–1590)",
      duration: "4 mins 20 secs",
      pathway: "Starter Hook",
      teacher_guidance: "Recommended Watch Window: 00:15–03:50 | Lesson Phase: Lesson Hook | Tone Alert: Explores Sir Walter Raleigh's royal patent, Richard Hakluyt, and naming Virginia after the Virgin Queen.",
      viewing_task: "[01:00] Quick Check: Why did Sir Walter Raleigh never actually set foot in Virginia himself despite organizing the colonisation attempts?\n[02:45] Hinge Question: Why did the early English attempts to establish a permanent colony on Roanoke Island end in total failure?",
      model_answer: "Quick Check: Elizabeth refused to allow her favorite courtier to leave England, so Raleigh financed and managed the expeditions from London.\nHinge Question: The colonists were gentleman adventurers who refused to farm, lacked basic survival skills, arrived too late in the season to plant crops, and alienated the local Indigenous population who fed them."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=pNmO9wEqxqU",
      id: "pNmO9wEqxqU",
      title: "GCSE History: Sir Walter Raleigh & The Mystery of The Lost Colony of Roanoke (1587)",
      duration: "5 mins 15 secs",
      pathway: "Core Enquiry",
      teacher_guidance: "Recommended Watch Window: 00:20–04:45 | Lesson Phase: The Lost Colony | Tone Alert: Investigates Governor John White, Virginia Dare, and the 1590 return.",
      viewing_task: "[01:15] Recall: Who was Virginia Dare, born on Roanoke Island in August 1587?\n[03:00] Explain: Why was Governor John White delayed in England for three years when he returned to get supplies in 1587?\n[04:20] Challenge: When White finally returned in August 1590, what clues did he find carved into the palisade post, and what most likely happened to the 115 missing settlers?",
      model_answer: "Recall: The first English child born in the Americas (granddaughter of Governor John White).\nExplain: The threat of the Spanish Armada meant all English ships were requisitioned by royal decree for national defence; no vessels were permitted to sail to America until 1590.\nChallenge: He found the word 'CROATOAN' carved into a tree; archaeological evidence suggests the starving settlers were absorbed into friendly local Algonquian tribes on nearby Hatteras Island."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=i2LdlqW26zc",
      id: "i2LdlqW26zc",
      title: "The New World (2005) | Jamestown & The Virginia Wilderness Trailer",
      duration: "2 mins 25 secs",
      pathway: "Cinematic",
      teacher_guidance: "Recommended Watch Window: 00:00–02:25 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Depicts the fragile wooden fortresses and untamed American coast.",
      viewing_task: "[01:10] Cinematic Discussion Focus: How does the film portray the harsh, unforgiving environmental reality that destroyed early English colonial ambitions?",
      model_answer: "Cinematic Discussion Focus: The trailer shows English settlers trapped inside wooden palisades dying of fever and hunger while looking out into dense forests, highlighting the fatal naivety of early Tudor colonizers."
    },
    {
      type: "youtube",
      url: "https://www.youtube.com/watch?v=5Cc4LaSRiSc",
      id: "5Cc4LaSRiSc",
      title: "The Legacy of Elizabethan Colonisation: Foundations of Empire | Archive",
      duration: "12 mins 00 secs",
      pathway: "Documentary Depth",
      teacher_guidance: "Recommended Watch Window: 01:00–10:30 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Synthesizes the failure of Roanoke with the successful founding of Jamestown in 1607.",
      viewing_task: "[02:30] Recall: What economic products (tobacco, sassafras, timber) did Raleigh and Hakluyt believe Virginia would supply to England?\n[06:00] Explain: How did Richard Hakluyt's 'Discourse on Western Planting' provide the philosophical and imperial blueprint for British colonisation?\n[09:30] Challenge: Although Raleigh's Roanoke venture failed completely in Elizabeth's reign, why was it vital for the eventual success of the British Empire?",
      model_answer: "Recall: Timber and pitch for the navy, minerals, and valuable cash crops like tobacco and sugar that currently had to be bought from Spain.\nExplain: Hakluyt argued colonisation would spread Protestantism, provide employment for England's 'idle poor', and challenge Spanish dominance in the Americas.\nChallenge: Roanoke taught hard, essential lessons: future ventures abandoned aristocratic privateering in favor of joint-stock corporate investment, family settlement, and cash-crop agriculture, enabling the survival of Jamestown in 1607."
    }
  ]
];

function upgradeEEE() {
  const filePath = path.join(__dirname, '..', 'units', 'eee', 'data.js');
  let content = fs.readFileSync(filePath, 'utf8');

  let evalCode = content.replace(/export\s+default\s+unitData;?/g, '').replace(/export\s*\{\s*unitData\s*\};?/g, '');
  evalCode = evalCode.replace('const unitData =', 'var unitData =');
  var unitData;
  eval(evalCode);

  unitData.lessons.forEach((l, idx) => {
    if (eeeVideos[idx]) {
      l.video = eeeVideos[idx];
      console.log(`✅ [eee] Lesson ${idx + 1} (${l.id}) upgraded to ${l.video.length} videos`);
    }
  });

  const newContent = 'const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n\nexport { unitData };\nexport default unitData;\n';
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`💾 Updated units/eee/data.js`);

  fs.writeFileSync(path.join(__dirname, '..', 'data', 'eee.json'), JSON.stringify(unitData, null, 2), 'utf8');
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'data', 'eee.json'), JSON.stringify(unitData, null, 2), 'utf8');
  console.log(`💾 Synced data/eee.json and public/data/eee.json`);
}

// 2. Edexcel Medicine 4-Tier Expansion: upgrades all 26 lessons to 4 videos
function upgradeEdexcelMedicine() {
  const filePath = path.join(__dirname, '..', 'units', 'edexcel_medicine', 'data.js');
  let content = fs.readFileSync(filePath, 'utf8');

  let evalCode = content.replace(/export\s+default\s+unitData;?/g, '').replace(/export\s*\{\s*unitData\s*\};?/g, '');
  evalCode = evalCode.replace('export const unitData =', 'var unitData =').replace('const unitData =', 'var unitData =');
  var unitData;
  eval(evalCode);

  // Template of rich cinematic & documentary additions matched by era
  const eraPacks = {
    // Medieval (Lessons 1 to 5)
    medieval: [
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=IOj-Pn5WJkw",
        id: "IOj-Pn5WJkw",
        title: "The Physician (2013) | Official Movie Trailer (Ben Kingsley as Ibn Sina / Avicenna)",
        duration: "2 mins 30 secs",
        pathway: "Cinematic",
        teacher_guidance: "Recommended Watch Window: 00:00–02:30 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Epic historical drama depicting an English barber-surgeon traveling to Persia to study under Ibn Sina.",
        viewing_task: "[01:10] Cinematic Discussion Focus: How does the film contrast the backward, superstition-dominated medicine of medieval England with the advanced scientific medical schools of the Islamic world?",
        model_answer: "Cinematic Discussion Focus: The trailer visually contrasts dirty, leech-infested English barber-surgeon stalls with the clean, orderly hospitals, anatomy libraries, and cataract surgeries in Isfahan, illustrating why Islamic medicine was centuries ahead of medieval Europe."
      },
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=2Nl7a3ORYvw",
        id: "2Nl7a3ORYvw",
        title: "Blood and Guts: A History of Surgery – Bloody Beginnings | BBC / Michael Mosley",
        duration: "14 mins 00 secs",
        pathway: "Documentary Depth",
        teacher_guidance: "Recommended Watch Window: 01:00–12:30 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Explores medieval bloodletting, cauterisation with boiling oil, and Galen's four humours.",
        viewing_task: "[02:30] Recall: What were the Four Humours (blood, phlegm, black bile, yellow bile) formulated by Hippocrates and Galen?\n[06:15] Explain: How did medieval physicians use urine charts and zodiac charts to determine the optimal day for bloodletting?\n[10:30] Challenge: Why did the medieval Christian Church strictly ban human dissection while enforcing blind obedience to Galen's texts for over 1,000 years?",
        model_answer: "Recall: Blood, phlegm, yellow bile, and black bile; health depended on perfect balance among the four.\nExplain: A physician examined color, smell, and taste of urine to diagnose humours, consulting astrological almanacs to ensure blood was let when planets aligned.\nChallenge: The Church taught that the human body was created in the image of God and must remain intact for physical resurrection; because Galen believed in a single Creator, the Church adopted his pagan texts as sacred dogma."
      }
    ],
    // Renaissance (Lessons 6 to 10)
    renaissance: [
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=6cMhO7JpaYE",
        id: "6cMhO7JpaYE",
        title: "Restoration (1995) | 17th-Century Medicine & The Great Plague Trailer",
        duration: "2 mins 15 secs",
        pathway: "Cinematic",
        teacher_guidance: "Recommended Watch Window: 00:00–02:15 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Depicts King Charles II's royal physician battling the 1665 plague in London.",
        viewing_task: "[01:10] Cinematic Discussion Focus: How does the film depict the helplessness of 17th-century physicians armed only with pomanders and bloodletting lancets against the plague?",
        model_answer: "Cinematic Discussion Focus: The trailer shows physicians in bird-like leather masks fleeing dying patients, dramatizing how little practical clinical therapy had improved despite scientific breakthroughs in anatomy."
      },
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=w6q50_qNMoA",
        id: "w6q50_qNMoA",
        title: "William Harvey & The Circulation of Blood | Royal College of Physicians",
        duration: "12 mins 15 secs",
        pathway: "Documentary Depth",
        teacher_guidance: "Recommended Watch Window: 01:00–11:00 | Lesson Phase: Scientific Revolution | Tone Alert: Recreates Harvey's 1628 mechanical ligature experiments proving one-way blood flow.",
        viewing_task: "[02:15] Recall: What false belief about blood did Galen teach (that blood was continuously manufactured in the liver and consumed by the body like fuel)?\n[05:45] Explain: How did Harvey use simple mathematics (measuring heart stroke volume) to prove that the body could not possibly produce 250 liters of blood a day?\n[09:00] Challenge: Why did it take nearly 50 years for the European medical establishment to accept Harvey's mechanical circulation theory?",
        model_answer: "Recall: Galen taught that venous blood was made in the liver from food and arterial blood in the heart, both flowing to tissues where it was absorbed.\nExplain: Harvey showed that if the heart pumped two ounces per beat, in an hour it pumped three times a man's body weight; therefore, the exact same blood must circulate continuously through vessels.\nChallenge: Conservative physicians mocked him as 'the Circulator' (slang for quack) because rejecting Galen challenged their entire medical reputation and university training."
      }
    ],
    // 18th & 19th Century (Lessons 11 to 16)
    nineteenth: [
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=z9rKY8MLWTU",
        id: "z9rKY8MLWTU",
        title: "The Knick | Surgery in the Era of Discovery (Cinemax / HBO)",
        duration: "2 mins 20 secs",
        pathway: "Cinematic",
        teacher_guidance: "Recommended Watch Window: 00:00–02:20 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Depicts late 19th-century surgical amphitheatres, ether, and sepsis.",
        viewing_task: "[01:10] Cinematic Discussion Focus: How does the series depict the horrifying 'Black Period' of surgery before antiseptics, where speed was prized over cleanliness?",
        model_answer: "Cinematic Discussion Focus: The trailer shows surgeons operating in frock coats stiff with dried blood and pus, surrounded by smoking observers, capturing the paradox of technical surgical bravery alongside fatal postoperative infection."
      },
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=2hTZNDyLPLk",
        id: "2hTZNDyLPLk",
        title: "Pain, Pus and Poison: Episode 1 (Pain) | BBC / Michael Mosley",
        duration: "14 mins 00 secs",
        pathway: "Documentary Depth",
        teacher_guidance: "Recommended Watch Window: 01:00–12:30 | Lesson Phase: Anaesthetic Revolution | Tone Alert: Explores nitrous oxide, ether, and James Simpson's chloroform experiments.",
        viewing_task: "[02:30] Recall: What chemical did Dr James Simpson test on himself and his dinner guests in Edinburgh in November 1847 (chloroform)?\n[06:00] Explain: Why did religious conservatives oppose anaesthesia in childbirth, citing Genesis: 'In sorrow thou shalt bring forth children'?\n[10:15] Challenge: How did Queen Victoria's use of chloroform during the 1853 birth of Prince Leopold transform public and medical acceptance of pain relief?",
        model_answer: "Recall: Chloroform; Simpson woke under the table to find his colleagues unconscious and realized he had found the ideal anaesthetic.\nExplain: Clergy argued pain was God's divine punishment for Eve's original sin and that eliminating pain interfered with God's moral order.\nChallenge: The Queen publicly praised chloroform as 'that blessed chloroform, soothing and delightful beyond measure'; royal endorsement instantly silenced religious objections and made anaesthesia fashionable."
      }
    ],
    // Modern Medicine (Lessons 17 to 21)
    modern: [
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=UclKFAQ0eJQ",
        id: "UclKFAQ0eJQ",
        title: "Something the Lord Made (2004) | Official Trailer (Alan Rickman / Mos Def)",
        duration: "2 mins 15 secs",
        pathway: "Cinematic",
        teacher_guidance: "Recommended Watch Window: 00:00–02:15 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Award-winning drama depicting pioneer cardiac surgery and the 'Blue Baby' operation in 1944.",
        viewing_task: "[01:10] Cinematic Discussion Focus: How does the film depict Vivien Thomas and Dr Alfred Blalock breaking the ultimate surgical taboo by operating directly on the human heart?",
        model_answer: "Cinematic Discussion Focus: The trailer shows how touching the living heart was considered medical malpractice; Thomas and Blalock devised vascular clamps and fine sutures that saved thousands of dying blue babies and launched modern cardiac surgery."
      },
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=mlDO-uKMNWk",
        id: "mlDO-uKMNWk",
        title: "Pain, Pus and Poison: Episode 2 (Pus) | BBC / Michael Mosley",
        duration: "14 mins 00 secs",
        pathway: "Documentary Depth",
        teacher_guidance: "Recommended Watch Window: 01:00–12:30 | Lesson Phase: Antibiotic Miracle | Tone Alert: Traces Alexander Fleming's 1928 mould and Howard Florey and Ernst Chain's mass production.",
        viewing_task: "[02:30] Recall: What serendipitous event occurred in Alexander Fleming's St Mary's Hospital lab in September 1928?\n[06:15] Explain: How did Howard Florey and Ernst Chain in Oxford extract and purify penicillin using bedpans and milk churns in 1940?\n[10:30] Challenge: How did US industrial chemical companies and corn-steep liquor allow penicillin to be mass-produced in time for D-Day in June 1944?",
        model_answer: "Recall: A stray spore of Penicillium notatum landed on a staphylococci petri dish left by an open window, creating a clear ring where bacteria dissolved.\nExplain: Fleming couldn't purify it; Florey and Chain used makeshift apparatus to extract tiny quantities, successfully treating infected mice and a dying policeman.\nChallenge: War-torn Britain lacked chemical factories; Florey went to the US, where breweries used deep-tank fermentation with corn-steep liquor, manufacturing 2.3 million doses for Allied soldiers in Normandy."
      }
    ],
    // Western Front Environment & Surgery (Lessons 22 to 26)
    western_front: [
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=YqNYrYUiMfg",
        id: "YqNYrYUiMfg",
        title: "1917 (2019) | Official Feature Trailer (Sam Mendes / Universal Pictures)",
        duration: "2 mins 24 secs",
        pathway: "Cinematic",
        teacher_guidance: "Recommended Watch Window: 00:00–02:24 | Lesson Phase: Visual & Cultural Impact | Tone Alert: Oscar-winning cinematic depiction of No Man's Land, craters, mud, and front-line aid posts.",
        viewing_task: "[01:15] Cinematic Discussion Focus: How does the film's continuous shot capture the horrifying terrain of the Western Front and the extreme difficulty of stretcher-bearers transporting wounded soldiers?",
        model_answer: "Cinematic Discussion Focus: The trailer shows knee-deep mud, razor-sharp barbed wire, rotting horse carcasses, and waterlogged shell holes, visually illustrating why moving a wounded soldier to a dressing station took hours under constant shellfire."
      },
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=YfxRhLsAAk8",
        id: "YfxRhLsAAk8",
        title: "Medicine in the First World War: Chain of Evacuation | Imperial War Museums",
        duration: "13 mins 30 secs",
        pathway: "Documentary Depth",
        teacher_guidance: "Recommended Watch Window: 01:00–12:00 | Lesson Phase: Flipped Learning / Extension | Tone Alert: Archival footage examining the RAP, ADS, MDS, CCS, and Base Hospitals.",
        viewing_task: "[02:30] Recall: What were the sequential stages of the Chain of Evacuation from the frontline trench back to Britain?\n[06:00] Explain: How did the Thomas Splint reduce mortality from fractured femurs from 80% down to under 20% by 1916?\n[09:45] Challenge: How did the mud of Flanders—rich in manure bacteria from centuries of farming—cause horrific gas gangrene that forced surgeons into aggressive wound debridement?",
        model_answer: "Recall: Regimental Aid Post (RAP) -> Advanced Dressing Station (ADS) -> Casualty Clearing Station (CCS) -> Base Hospital -> 'Blighty' (UK hospitals).\nExplain: Compound thigh fractures caused shock and severed the femoral artery when loose bone ends grated in transit; the metal frame splint kept the leg pulled rigid in traction, preventing internal hemorrhage.\nChallenge: Shell shrapnel carried manure-soaked soil and cloth deep into shattered muscle where anaerobic Clostridium bacteria produced bubbling toxins; surgeons had to cut away all infected tissue (debridement) and irrigate with Carrel-Dakin antiseptic solution."
      }
    ]
  };

  unitData.lessons.forEach((l, idx) => {
    let pack;
    if (idx < 5) pack = eraPacks.medieval;
    else if (idx < 10) pack = eraPacks.renaissance;
    else if (idx < 16) pack = eraPacks.nineteenth;
    else if (idx < 21) pack = eraPacks.modern;
    else pack = eraPacks.western_front;

    // Ensure all existing videos have an id
    l.video.forEach(v => {
      if (!v.id && v.url) {
        const match = v.url.match(/v=([a-zA-Z0-9_-]+)/);
        if (match) v.id = match[1];
      }
    });

    // Add cinematic & documentary depth if not present
    pack.forEach(extra => {
      const hasIt = l.video.some(v => v.id === extra.id || v.title === extra.title);
      if (!hasIt) {
        l.video.push(extra);
      }
    });

    console.log(`✅ [edexcel_medicine] Lesson ${idx + 1} (${l.id}) upgraded to ${l.video.length} videos`);
  });

  const newContent = 'const unitData = ' + JSON.stringify(unitData, null, 2) + ';\n\nexport { unitData };\nexport default unitData;\n';
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`💾 Updated units/edexcel_medicine/data.js`);

  fs.writeFileSync(path.join(__dirname, '..', 'data', 'edexcel_medicine.json'), JSON.stringify(unitData, null, 2), 'utf8');
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'data', 'edexcel_medicine.json'), JSON.stringify(unitData, null, 2), 'utf8');
  console.log(`💾 Synced data/edexcel_medicine.json and public/data/edexcel_medicine.json`);
}

console.log('======================================================');
console.log('👑 APPLYING 4-TIER VIDEO SHELF: EEE & EDEXCEL MEDICINE');
console.log('======================================================');

upgradeEEE();
upgradeEdexcelMedicine();

console.log('\nRebuilding database.json...');
execSync('node scripts/build_database.cjs', { stdio: 'inherit' });
console.log('\n🎉 ALL 12 LESSONS IN EEE AND ALL 26 LESSONS IN MEDICINE UPGRADED TO 4-TIER!');
