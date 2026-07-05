// State Management
const appState = {
  currentTab: "lessonsSection",
  theme: localStorage.getItem("was_theme") || "light",
  userXP: Number(localStorage.getItem("was_user_xp")) || 0,
  timelineFilter: "all",
  timelineSearchQuery: "",
  timelineSortMode: "topic",
  activeQuestionType: "describe", // 'describe' | 'explain' | 'essay'
  activePracticePanel: "workspace", // 'workspace' | 'model' | 'rubric'
  selectedIndexes: {
    describe: 0,
    explain: 0,
    essay: 0
  },
  userDrafts: (() => {
    const saved = localStorage.getItem("elizabethan_user_drafts");
    return saved ? JSON.parse(saved) : {};
  })(),
  lessonsMastered: (() => {
    const saved = localStorage.getItem("elizabethan_lessons_mastered");
    return saved ? JSON.parse(saved) : {};
  })(),
  mockExam: null,
  activePastPaper: null,
  quiz: {
    activeTopicIndex: -1, // -1 means setup screen, 0-11 represent topics
    currentQuestionIndex: 0,
    score: 0,
    isFlipped: false,
    themeIndex: 0,
    activeQueue: [],
    masteredCount: 0,
    xp: 0,
    streak: 0,
    bestStreak: 0,
    totalAttempts: 0,
    verificationActive: false,
    verificationOptions: [],
    verificationAnswered: false,
    verificationSelectedIndex: -1,
    verificationCorrect: false,
    masteryStates: (() => {
      const saved = localStorage.getItem("elizabethan_mastery_states");
      return saved ? JSON.parse(saved) : {};
    })()
  }
};

const examQuestionFacts = {
  // Describe (Q1)
  "ex-desc-1": "Privy Council had ~19 members; led by Secretary of State William Cecil; met almost daily.",
  "ex-desc-2": "Elizabeth received a Humanist education; spoke Latin, Greek, Italian, and French; mastered court patronage.",
  "ex-desc-3": "Mary I left a Crown debt of £300,000; £100,000 was owed to Antwerp Exchange at 14% interest.",
  "ex-desc-4": "Act of Supremacy (1559) established Elizabeth as 'Supreme Governor'; required all clergy to swear an oath of supremacy.",
  "ex-desc-5": "Church Courts judged moral crimes (slander, wills, marriage); priests required royal licensing to preach.",
  "ex-desc-6": "Vestment Controversy (1566) led to the dismissal of 37 Puritan priests; Puritans viewed vestments as Catholic 'idols'.",
  "ex-desc-7": "Pope instructed boycotted services in 1566; recusancy fine was 1 shilling per week (about a week's wages for a laborer).",
  "ex-desc-8": "Margaret Tudor line; Mary, Queen of Scots was Elizabeth's second cousin; viewed as legitimate Catholic heir.",
  "ex-desc-9": "Casket Letters presented at York Conference (1568-69); Elizabeth reached no verdict to keep Mary held without charge.",
  "ex-desc-10": "Durham Cathedral captured in Nov 1569; mass celebrated; 4,600 rebels; 800 rebels executed afterwards.",
  "ex-desc-11": "Walsingham used agents provocateurs, double agents, and code-breakers (Thomas Phelippes) to trap conspirators.",
  "ex-desc-12": "Mary executed Feb 1587 at Fotheringhay Castle; enabled by 1585 Act for the Preservation of the Queen's Safety.",
  "ex-desc-13": "Philip II signed Treaty of Joinville with French Catholic League in 1584, creating a joint anti-Protestant alliance.",
  "ex-desc-14": "Elizabeth privately funded sailors like Francis Drake to plunder Spanish treasure ships, returning huge profits.",
  "ex-desc-15": "Treaty of Nonsuch (1585) committed 7,400 English soldiers under Robert Dudley to fight the Spanish army.",
  "ex-desc-16": "April 1587 raid destroyed ~30 Spanish ships and thousands of barrel staves; delayed the Spanish Armada by a full year.",
  "ex-desc-17": "Armada consisted of 130 ships, 30,000 men; led by Duke of Medina Sidonia; Duke of Parma had 27,000 troops in Netherlands.",
  "ex-desc-18": "Eight fireships launched at Calais (6 Aug 1588) to scatter crescent; Battle of Gravelines (8 Aug) won by fast race-built galleons.",
  "ex-desc-19": "72 new fee-paying grammar schools opened; male literacy rose to 30%, female literacy remained at ~10%.",
  "ex-desc-20": "The Globe and The Rose theatres opened in London suburbs to avoid civic bans; drew huge, socially mixed crowds.",
  "ex-desc-21": "Fencing off common land for sheep farming reduced arable fields, causing rural unemployment and depopulation.",
  "ex-desc-22": "Vagabonds Act (1572) ordered whipping and boring a hole in the ear for beggars; established national poor rate tax.",
  "ex-desc-23": "Gerardus Mercator's 1569 Map; astrolabe and quadrant; English wool market in Antwerp collapsed forcing new trade routes.",
  "ex-desc-24": "Francis Drake circumnavigated (1577-80); returned with £400,000 treasure; knighted on deck of Golden Hind in 1581.",
  "ex-desc-25": "Walter Raleigh was granted a royal charter to colonise Virginia; organised expeditions and promoted colony to investors.",
  "ex-desc-26": "Sir Walter Raleigh funded Roanoke; supply ship Tiger breached in 1585 storm; Chief Wingina killed in 1586; abandoned 1586.",

  // Explain (Q2)
  "ex-exp-1": "• Paragraph 1 (Stimulus 1): The immediate military threat from the 'Auld Alliance' (French troops stationed in Scotland).\n• Paragraph 2 (Stimulus 2): The £300,000 debt inherited from Mary I severely limited her ability to govern, raise armies, or defend borders.\n• Paragraph 3 (Own Knowledge): Her questionable legitimacy (Henry VIII's marriage to Anne Boleyn unrecognized by the Pope) or the patriarchal society's belief that a female monarch was too weak to rule.",
  "ex-exp-2": "• Paragraph 1 (Stimulus 1): Puritans strongly objected to wearing elaborate Catholic-style vestments (robes), believing priests should wear plain clothing.\n• Paragraph 2 (Stimulus 2): The Act of Uniformity forced them to follow rules they believed lacked biblical purity, such as bowing or kneeling during services.\n• Paragraph 3 (Own Knowledge): The 'Crucifix Controversy' where Puritan bishops threatened to resign because they viewed crucifixes as sinful idols.",
  "ex-exp-3": "• Paragraph 1 (Stimulus 1): Traditional northern Catholic nobles (Northumberland and Westmorland) felt sidelined and politically humiliated when Elizabeth gave local power to loyal southern Protestants like William Cecil.\n• Paragraph 2 (Stimulus 2): The North remained staunchly Catholic and deeply resented Elizabeth imposing Protestantism and appointing Protestant bishops.\n• Paragraph 3 (Own Knowledge): The sudden arrival of Mary, Queen of Scots in 1568, which provided the Earls with a legitimate, Tudor-bloodline Catholic heir to put on the throne.",
  "ex-exp-4": "• Paragraph 1 (Stimulus 1): The Privy Council constantly pressured Elizabeth, eventually passing the 'Act for the Preservation of the Queen's Safety' to legally force Mary's death warrant.\n• Paragraph 2 (Stimulus 2): Mary's legitimate Tudor bloodline meant she was a constant, living threat around whom English Catholics rallied.\n• Paragraph 3 (Own Knowledge): The Babington Plot (1586) where Walsingham's spies intercepted coded letters proving Mary explicitly agreed to Elizabeth's assassination.",
  "ex-exp-5": "• Paragraph 1 (Stimulus 1): Philip II actively supported Catholic treason in England, including Spanish ambassadors funding and helping coordinate the Ridolfi and Babington plots.\n• Paragraph 2 (Stimulus 2): Spain disrupted the vital English cloth trade in Antwerp, and Elizabeth retaliated by secretly funding Dutch Protestant rebels.\n• Paragraph 3 (Own Knowledge): The actions of Sir Francis Drake; his privateering in the New World and the theft of £400,000 of Spanish gold deeply humiliated and angered Philip II.",
  "ex-exp-6": "• Paragraph 1 (Stimulus 1): Drake's 1587 raid on Cadiz ('singeing the King of Spain's beard') destroyed ~30 Spanish ships and thousands of barrel staves, causing Spanish food supplies to rot.\n• Paragraph 2 (Stimulus 2): The English launched fire ships into the Spanish fleet while anchored at Calais, breaking their defensive crescent formation and causing widespread panic.\n• Paragraph 3 (Own Knowledge): The catastrophic weather (the 'Protestant Wind' storms) that wrecked the surviving Spanish ships off the coasts of Scotland and Ireland.",
  "ex-exp-7": "• Paragraph 1 (Stimulus 1): Humanist philosophy shifted the purpose of education away from just training priests, towards fulfilling human potential and creating a civilized society.\n• Paragraph 2 (Stimulus 2): The growing merchant class (the 'middling sort') desperately needed their sons to be literate and numerate to navigate complex business contracts.\n• Paragraph 3 (Own Knowledge): The Protestant religion actively encouraged basic literacy so that ordinary people could read the Bible in English for themselves.",
  "ex-exp-8": "• Paragraph 1 (Stimulus 1): Wealthy landowners fenced off traditional common land (Enclosure), meaning the rural poor lost their ability to forage or graze animals to survive.\n• Paragraph 2 (Stimulus 2): The shift from growing crops to highly profitable sheep farming, which required far fewer workers and caused mass rural unemployment.\n• Paragraph 3 (Own Knowledge): Massive population growth (from 3 to 4.2 million) which drove wages down while simultaneously causing severe inflation and rising food prices.",
  "ex-exp-9": "• Paragraph 1 (Stimulus 1): New technology like the astrolabe, quadrant, and the Mercator Map made highly dangerous open-ocean voyages much safer and more accurate.\n• Paragraph 2 (Stimulus 2): The collapse of the traditional cloth trade in Antwerp forced merchants to explore the Americas and Asia to find new markets to survive.\n• Paragraph 3 (Own Knowledge): The financial motivation of privateering; Drake’s 4700% profit proved that attacking the Spanish monopoly in the New World could make investors incredibly rich.",
  "ex-exp-10": "• Paragraph 1 (Stimulus 1): Initial friendly relations with the Algonquians turned hostile due to English demands for food and the spread of deadly European diseases, leading to war.\n• Paragraph 2 (Stimulus 2): The breach of the ship 'The Tiger' ruined the colonists' vital seeds and perishable food, leaving them starving before winter even began.\n• Paragraph 3 (Own Knowledge): Poor planning; the expedition mostly consisted of soldiers and gentlemen seeking gold, not the skilled farmers needed to build a self-sustaining colony.",
  "ex-exp-11": "• Paragraph 1 (Stimulus 1): Mary I had sold off Crown Lands to fund wars, reducing Elizabeth's regular income from rents.\n• Paragraph 2 (Stimulus 2): Henry VIII and Edward VI had debased the coinage, which caused massive inflation and meant Elizabeth's money was worth less.\n• Paragraph 3 (Own Knowledge): Inherited £300,000 Crown debt, including high-interest loans (14%) owed to the Antwerp Exchange.",
  "ex-exp-12": "• Paragraph 1 (Stimulus 1): Deep religious divisions existed (staunch Catholics in the North vs radical Protestants returning from exile in Europe) threatening civil war.\n• Paragraph 2 (Stimulus 2): Desire to create a 'Middle Way' compromise (Acts of Supremacy and Uniformity) to bring peace and establish her royal authority.\n• Paragraph 3 (Own Knowledge): Threat of foreign Catholic powers; she needed to avoid an extreme settlement that would trigger an immediate invasion from Spain or France.",
  "ex-exp-13": "• Paragraph 1 (Stimulus 1): 1570 Papal Bull excommunicated Elizabeth, effectively giving English Catholics religious permission to commit treason.\n• Paragraph 2 (Stimulus 2): 1571 Ridolfi Plot escalated the threat by showing that foreign armies (Alba's 10,000 Spanish troops) were actively planning to invade.\n• Paragraph 3 (Own Knowledge): The arrival of Mary, Queen of Scots in 1568 (legitimate Catholic figurehead) and secret Jesuit missionary priests turning the population against the Queen.",
  "ex-exp-14": "• Paragraph 1 (Stimulus 1): Mary transitioned from a refugee to an active conspirator, culminating in the Babington Plot (1586) where she explicitly agreed to Elizabeth's assassination.\n• Paragraph 2 (Stimulus 2): Deteriorating relations with Spain meant Philip II was increasingly willing to fund and support plots to put Mary on the throne.\n• Paragraph 3 (Own Knowledge): The Papal Bull (1570) made Mary the only legitimate monarch in the eyes of strict Catholics, driving plots like Ridolfi (1571) and Throckmorton (1583).",
  "ex-exp-15": "• Paragraph 1 (Stimulus 1): Elizabeth's signing of the Treaty of Nonsuch (1585) sending 7,400 English troops to the Netherlands was viewed by Spain as a direct act of war.\n• Paragraph 2 (Stimulus 2): Drake's privateering in the New World and his 1587 Cadiz raid ('singeing the King of Spain's beard') destroyed ~30 ships and cost Spain millions.\n• Paragraph 3 (Own Knowledge): Philip's religious duty as a devout Catholic to stamp out Protestantism, triggered finally by the execution of Mary, Queen of Scots in 1587.",
  "ex-exp-16": "• Paragraph 1 (Stimulus 1): 1584 Treaty of Joinville allied Catholic France and Spain, leaving Protestant England dangerously isolated.\n• Paragraph 2 (Stimulus 2): The assassination of Dutch rebel leader William of Orange in 1584 meant the Dutch Revolt was about to collapse, freeing the Spanish army to attack England.\n• Paragraph 3 (Own Knowledge): Economic necessity to protect the vital English cloth trade routes that relied heavily on Dutch ports.",
  "ex-exp-17": "• Paragraph 1 (Stimulus 1): Cheap entry fees (1 penny for 'groundlings' in the open pit) made it an affordable mass entertainment for the poor, while covered galleries appealed to the rich.\n• Paragraph 2 (Stimulus 2): Patronage of powerful nobles (e.g. Earl of Leicester funding Leicester's Men) protected actors from vagrancy laws and made the theatre respectable.\n• Paragraph 3 (Own Knowledge): The Protestant shift away from Catholic 'mystery plays' to exciting, secular, modern comedies and tragedies written by playwrights like Shakespeare.",
  "ex-exp-18": "• Paragraph 1 (Stimulus 1): Fear of vagrants causing crime and social rebellion forced government action, introducing harsh deterrents like the Vagabonds Act (1572).\n• Paragraph 2 (Stimulus 2): The failure of voluntary local church charity forced the introduction of a compulsory national 'Poor Rate' tax to fund local poor relief.\n• Paragraph 3 (Own Knowledge): Changing attitudes recognizing the 'deserving poor' (unemployed through no fault of their own), leading to the 1576 Act providing raw materials for work.",
  "ex-exp-19": "• Paragraph 1 (Stimulus 1): Financial motivation to plunder unprotected Spanish colonies on the Pacific coast, eventually returning with £400,000 in treasure for investors and the Queen.\n• Paragraph 2 (Stimulus 2): Drake's intense desire for revenge following the Spanish ambush of his cousin John Hawkins' fleet at San Juan de Ulúa (1568).\n• Paragraph 3 (Own Knowledge): Political motivation to challenge the Pope's decree that the Americas belonged to Spain, claiming California (Nova Albion) for Elizabeth in 1579.",
  "ex-exp-20": "• Paragraph 1 (Stimulus 1): 16th-century patriarchal society viewed female rulers as too weak to govern or lead armies, placing pressure to marry which risked court rivalries.\n• Paragraph 2 (Stimulus 2): Immediate military threat from France; Calais was lost in 1558, and French troops were stationed in Scotland (the Auld Alliance) on the northern border.\n• Paragraph 3 (Own Knowledge): Questionable legitimacy due to Henry VIII's contested divorce, plus deep religious divisions left behind by Mary I.",

  // Essay (Q3)
  "ex-essay-1": "• Paragraph 1 (Introduction): State clear thesis immediately (e.g. Papacy provided permission, but Mary/Spain provided opportunity/force).\n• Paragraph 2 (Agree): 1570 Papal Bull excommunicated Elizabeth, commanding English Catholics to rebel and assassinate her.\n• Paragraph 3 (Disagree - Stimulus): Mary, Queen of Scots arrived in 1568, offering a legitimate Catholic figurehead to rally around.\n• Paragraph 4 (Disagree - Own Knowledge): Radical Jesuit missionary priests arriving from Europe actively preaching treason and turning Catholics against the Queen.\n• Paragraph 5 (Conclusion): Weigh the factors. Conclude whether Mary's presence or the Pope's commands were more critical to the increase in opposition.",
  "ex-essay-2": "• Paragraph 1 (Introduction): State thesis on whether Cadiz was his main achievement or other voyages/battles were.\n• Paragraph 2 (Agree): Cadiz raid (1587) destroyed ~30 Spanish ships and critical barrel staves, delaying the Armada invasion by a full year.\n• Paragraph 3 (Disagree - Stimulus): Privateering and 1577-80 circumnavigation returned with £400,000 in treasure, enriching the crown.\n• Paragraph 4 (Disagree - Own Knowledge): Drake's crucial role in the Armada battles of 1588 (launching fireships at Calais, capturing Rosario ship).\n• Paragraph 5 (Conclusion): Evaluate Cadiz (tactical delay) vs. his global explorer/privateer achievements.",
  "ex-essay-3": "• Paragraph 1 (Introduction): State clear thesis immediately. Decide if the bloodline claim or her active plots caused the most tension.\n• Paragraph 2 (Agree): Mary's Tudor bloodline directly threatened Elizabeth's security since Catholics viewed Elizabeth as illegitimate.\n• Paragraph 3 (Disagree - Stimulus): Active conspiracies (Mary explicitly approving Elizabeth's assassination in the 1586 Babington Plot letters).\n• Paragraph 4 (Disagree - Own Knowledge): Religious tension; Mary was a Catholic heir in a Protestant nation, backed by Spain and France.\n• Paragraph 5 (Conclusion): Conclude whether her claim was only dangerous because it was weaponized in plots to take the throne.",
  "ex-essay-4": "• Paragraph 1 (Introduction): Decide if education changed significantly overall, or only for certain classes.\n• Paragraph 2 (Agree - Own Knowledge): Little change for the laboring poor and women; illiteracy remained extremely high (~70% males, 90% females).\n• Paragraph 3 (Disagree - Stimulus 1): Opening of 72 new fee-paying grammar schools for the 'middling sort' (merchants, yeomen).\n• Paragraph 4 (Disagree - Stimulus 2): Humanist education and Renaissance ideas shifting the purpose of schooling to secular leadership and classical study.\n• Paragraph 5 (Conclusion): Weigh major middle-class progress vs. zero change for the rural poor.",
  "ex-essay-5": "• Paragraph 1 (Introduction): Compare the 1569 domestic rebellion with later foreign-backed assassination plots.\n• Paragraph 2 (Agree): Earl of Northumberland and Westmorland raised a private army of 4,600 men, captured Durham, and held the North.\n• Paragraph 3 (Disagree - Stimulus): Babington Plot (1586) was more significant; it targeted Elizabeth's life directly and forced Mary's execution.\n• Paragraph 4 (Disagree - Own Knowledge): Ridolfi (1571) or Throckmorton (1583) plots involved massive foreign invasion plans (10,000 Spanish troops).\n• Paragraph 5 (Conclusion): Compare domestic military uprising (Earls) with later plots combining treason with foreign superpowers.",
  "ex-essay-6": "• Paragraph 1 (Introduction): State thesis (e.g. direct threat of invasion was more critical than Protestantism or cloth trade).\n• Paragraph 2 (Agree): Strategic threat; conquering the Netherlands would give the Spanish army a direct port to invade England.\n• Paragraph 3 (Disagree - Stimulus): Protestantism; pressure to defend fellow Dutch Protestants from the Spanish Catholic Inquisition.\n• Paragraph 4 (Disagree - Own Knowledge): Economics; protecting vital English trade routes (Antwerp cloth market) that English merchants relied on.\n• Paragraph 5 (Conclusion): Conclude if national military survival (anti-invasion) was more important than trade or religion.",
  "ex-essay-7": "• Paragraph 1 (Introduction): Decide if technology was the main driver, or if economic crisis and wealth motivated them more.\n• Paragraph 2 (Agree): New navigational tools (astrolabe, quadrant, lateen sails, Mercator maps) made long voyages safer.\n• Paragraph 3 (Disagree - Stimulus): Global privateers like Drake; Drake's massive 4700% return on circumnavigation triggered intense greed.\n• Paragraph 4 (Disagree - Own Knowledge): Economic crisis; collapse of the Antwerp wool market forced merchants to find new trading routes.\n• Paragraph 5 (Conclusion): Technology provided the tools, but trade collapse and gold plunder provided the actual motivation.",
  "ex-essay-8": "• Paragraph 1 (Introduction): Decide if poor laws transformed day-to-day lives, or if poverty remained unchanged.\n• Paragraph 2 (Agree): Vagrants were still treated brutally (whipped, ears bored) under the Vagabonds Act, showing continuity of harsh attitudes.\n• Paragraph 3 (Disagree - Stimulus): 1576 Act provided raw materials (wool, hemp) to JPs to let the unemployed work, showing a major policy shift.\n• Paragraph 4 (Disagree - Own Knowledge): 1572 Poor Rate tax established national state-funded relief, moving away from voluntary church alms.\n• Paragraph 5 (Conclusion): Policy changed significantly on paper, but actual starvation and poverty remained a daily reality.",
  "ex-essay-9": "• Paragraph 1 (Introduction): State whether theatre was a shared class experience, or if classes preferred separate pastimes.\n• Paragraph 2 (Agree): Highly accessible; groundlings paid 1 penny to stand in the open pit, while covered galleries sat the wealthy.\n• Paragraph 3 (Disagree - Stimulus): Patronage; highest nobles (e.g. Earl of Leicester) sponsored troupes to perform privately at court.\n• Paragraph 4 (Disagree - Own Knowledge): Other pastimes; bear-baiting/cock-fighting were just as popular for all, while hunting/tennis were elite-only.\n• Paragraph 5 (Conclusion): Conclude if theatre was the only shared space, or if the class divide in leisure remained dominant.",
  "ex-essay-10": "• Paragraph 1 (Introduction): State whether Mary's presence was the primary root of instability, or if the Papacy and Spain were.\n• Paragraph 2 (Agree): Mary's presence from 1568 provided the necessary legitimate Catholic heir for the Northern Earls, Ridolfi, and Babington plots.\n• Paragraph 3 (Disagree - Stimulus): 1570 Papal Bull was the main cause, as it formally excommunicated Elizabeth and commanded Catholics to rebel.\n• Paragraph 4 (Disagree - Own Knowledge): Philip II of Spain and his military force (Alba's army, Armada) were the actual forces threat.\n• Paragraph 5 (Conclusion): Conclude if Mary was the figurehead spark, but Spain and the Papacy provided the real fuel and threat."
};

const quizResultThemes = [
  {
    name: "Spy Network",
    tiers: [
      { trophy: "🕵️‍♂️⚠️", title: "Captured Plotter", desc: "Disaster! Walsingham's spies intercepted your letters. You are heading to the Tower of London." },
      { trophy: "📜", title: "Clumsy Informant", desc: "You survived the interrogation, but your intelligence is weak. Walsingham does not trust you." },
      { trophy: "🔑🔓", title: "Master Code-Breaker", desc: "Excellent work! Like Thomas Phelippes, you deciphered the Babington ciphers with ease." },
      { trophy: "👑👁️", title: "The Queen's Spymaster", desc: "Brilliant! Like Sir Francis Walsingham himself, you hold the secrets of Europe in your hand." }
    ]
  },
  {
    name: "The Globe Theatre",
    tiers: [
      { trophy: "🎭⚠️", title: "The Whipped Vagabond", desc: "A poor performance! Under the 1572 Act, you are branded as an idle vagrant and punished." },
      { trophy: "🎟️", title: "The Penniless Groundling", desc: "You watched the play from the crowded pit for a single penny, but learned very little." },
      { trophy: "🏰✨", title: "The Wealthy Noble", desc: "Splendid! You enjoy the performance from the covered, covered galleries." },
      { trophy: "👑🎭", title: "The Royal Patron", desc: "Masterful! Like Queen Elizabeth herself, your patronage secures the future of English theatre." }
    ]
  },
  {
    name: "The Royal Court",
    tiers: [
      { trophy: "⛪❌", title: "The Excommunicated Rebel", desc: "Treason! The 1570 Papal Bull has excommunicated you for direct defiance of the Crown." },
      { trophy: "🏛️", title: "The Hesitant MP", desc: "You sit in the House of Commons, but fear challenging the Queen's Royal Prerogative." },
      { trophy: "💼👑", title: "Trusted Privy Councillor", desc: "Superb! You advise the Queen daily alongside William Cecil on critical matters of state." },
      { trophy: "👑🗡️", title: "The Supreme Governor", desc: "Absolute Rule! You command the Church of England and the Crown with absolute authority." }
    ]
  },
  {
    name: "The High Seas",
    tiers: [
      { trophy: "⛵⚠️", title: "Lost at Sea", desc: "A disaster. Like the first settlers at Roanoke, your transatlantic expedition has failed." },
      { trophy: "⚓", title: "Ordinary Sailor", desc: "You survived the long voyage, but your share of the plundered Spanish silver is pitiful." },
      { trophy: "⚔️💰", title: "Successful Privateer", desc: "A highly profitable raid! You have successfully plundered the Spanish Main." },
      { trophy: "👑⚓", title: "Knighted on the Golden Hind!", desc: "A legendary voyage! Like Sir Francis Drake, you have been knighted by the Queen!" }
    ]
  },
  {
    name: "Fareham Chimney Sweep Inc.",
    tiers: [
      { trophy: "🧹💨", title: "Apprentice Sweep", desc: "Keep practicing! Don't get stuck in the flue. A lot of Victorian soot is still blocking your recall." },
      { trophy: "🧱🔥", title: "Master Hearth-Tender", desc: "Splendid job! You stoked the fires of memory and cleared the grate completely." },
      { trophy: "🧹✨", title: "Clean Flue Master", desc: "Perfect! Zero soot detected in your revision channels. A clean flue and a clear mind!" },
      { trophy: "👑🧹", title: "Lord of the Chimneys", desc: "Masterful! Brushing away historical ignorance one flue at a time. The chimney sweep trade is proud of you!" }
    ]
  }
];

let sharedAudioCtx = null;
function getAudioContext() {
  if (!sharedAudioCtx) {
    sharedAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return sharedAudioCtx;
}

let currentWheelRotation = 0;

// DOM Elements
const themeToggleBtn = document.getElementById("themeToggleBtn");
const navTabs = document.querySelectorAll(".nav-tab");
const tabContents = document.querySelectorAll(".tab-content");
const timelineList = document.getElementById("timelineList");
const timelineSearchInput = document.getElementById("timelineSearch");
const filterTags = document.querySelectorAll(".filter-tag");
const examWorkspace = document.getElementById("examWorkspace");
const quizAppContainer = document.getElementById("quizAppContainer");

// Initialize App
function init() {
  setupTheme();
  setupNavigation();
  setupTimeline();
  setupExamPractice();
  setupQuiz();
  setupPeelLinker();
  updateLessonSelectorUI();
  rotateChimneyTaglines();
  initChronologyGame();
  setupXPWidget();
  loadFlashcardDeck(1);
  loadCausationWebChallenge("cw-1.1");
  if (localStorage.getItem("elizabethan_pres_mode") === "true") {
    document.documentElement.classList.add("presentation-mode");
  }
}

// 1. Theme Configuration
function setupTheme() {
  const savedTheme = appState.theme;
  document.documentElement.setAttribute("data-theme", savedTheme);
  if (themeToggleBtn) {
    themeToggleBtn.style.display = "flex";
    themeToggleBtn.addEventListener("click", () => {
      let nextTheme = "light";
      if (appState.theme === "light") {
        nextTheme = "dark";
      } else if (appState.theme === "dark") {
        nextTheme = "royal";
      } else {
        nextTheme = "light";
      }
      document.documentElement.setAttribute("data-theme", nextTheme);
      appState.theme = nextTheme;
      localStorage.setItem("elizabethan_theme", nextTheme);
    });
  }
}

function updateThemeIcon() {
  // Theme toggle has standard icons.
}

// 2. Navigation Control
function setupNavigation() {
  navTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      navTabs.forEach(t => t.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      tab.classList.add("active");
      const targetId = tab.getAttribute("data-target");
      document.getElementById(targetId).classList.add("active");
      appState.currentTab = targetId;
      
      if (targetId === "causationWebSection" && currentCausationChallenge) {
        setTimeout(() => {
          clearCausationLines();
          Object.keys(matchedCausationPairs).forEach(causeId => {
            drawCausationLinkLine(causeId);
          });
        }, 50);
      }
    });
  });
}

// 3. Timeline Functionality
function setupTimeline() {
  renderTimeline();

  // Search input change handler
  timelineSearchInput.addEventListener("input", (e) => {
    appState.timelineSearchQuery = e.target.value.toLowerCase().trim();
    renderTimeline();
  });

  // Filter button handlers
  filterTags.forEach(tag => {
    tag.addEventListener("click", () => {
      filterTags.forEach(t => t.classList.remove("active"));
      tag.classList.add("active");
      appState.timelineFilter = tag.getAttribute("data-filter");
      renderTimeline();
    });
  });

  // Expand/Collapse all buttons
  const expandAllBtn = document.getElementById("expandAllBtn");
  const collapseAllBtn = document.getElementById("collapseAllBtn");
  if (expandAllBtn && collapseAllBtn) {
    expandAllBtn.addEventListener("click", () => {
      document.querySelectorAll(".event-item").forEach(item => {
        item.classList.add("expanded");
      });
    });
    collapseAllBtn.addEventListener("click", () => {
      document.querySelectorAll(".event-item").forEach(item => {
        item.classList.remove("expanded");
      });
    });
  }
}

function getEventYear(evt) {
  for (const dateStr of evt.dates) {
    const match = dateStr.match(/\d{4}/);
    if (match) return parseInt(match[0], 10);
  }
  if (evt.subtitle) {
    const subMatch = evt.subtitle.match(/\d{4}/);
    if (subMatch) return parseInt(subMatch[0], 10);
  }
  if (evt.text) {
    const textMatch = evt.text.match(/\d{4}/);
    if (textMatch) return parseInt(textMatch[0], 10);
  }
  return 1558;
}

window.setTimelineSortMode = function(mode) {
  appState.timelineSortMode = mode;
  
  const topicBtn = document.getElementById("timelineSortTopicBtn");
  const chronoBtn = document.getElementById("timelineSortChronoBtn");
  
  if (topicBtn) {
    topicBtn.classList.toggle("active", mode === "topic");
  }
  if (chronoBtn) {
    chronoBtn.classList.toggle("active", mode === "chrono");
  }
  
  renderTimeline();
};

function renderTimeline() {
  timelineList.innerHTML = "";

  const query = appState.timelineSearchQuery;
  const filter = appState.timelineFilter;

  if (appState.timelineSortMode === "chrono") {
    // Flatten all events
    let allEvents = [];
    timelineData.forEach(card => {
      card.events.forEach(evt => {
        allEvents.push({
          ...evt,
          parentSection: card.section,
          parentTitle: card.title,
          parentTopic: card.topic
        });
      });
    });

    // Filter events
    const filteredEvents = allEvents.filter(event => {
      const matchFilter = filter === "all" || event.tags.includes(filter);
      
      const textMatch = event.text.toLowerCase().includes(query) ||
                        event.subtitle.toLowerCase().includes(query) ||
                        event.names.some(name => name.toLowerCase().includes(query)) ||
                        event.stats.some(stat => stat.toLowerCase().includes(query)) ||
                        event.dates.some(date => date.toLowerCase().includes(query));

      return matchFilter && textMatch;
    });

    if (filteredEvents.length === 0) {
      timelineList.innerHTML = `<div style="text-align: center; padding: 3rem; color: var(--text-muted);">
        <p>No specification points match your current search/filters.</p>
      </div>`;
      return;
    }

    // Sort chronologically
    filteredEvents.sort((a, b) => getEventYear(a) - getEventYear(b));

    const cardEl = document.createElement("div");
    cardEl.className = "kt-card";
    cardEl.innerHTML = `
      <div class="kt-header" style="background: linear-gradient(135deg, var(--primary), #4f46e5); color: #ffffff; padding: 1.25rem;">
        <h3 class="kt-title" style="margin: 0; color: #ffffff; font-family: var(--font-title); font-size: 1.2rem; font-weight: 800;">📅 Chronological Timeline Flow</h3>
        <span style="font-size: 0.78rem; opacity: 0.9; font-weight: 600;">Events sorted sequentially from 1558 to 1588</span>
      </div>
      <div class="events-list"></div>
    `;

    const eventsContainer = cardEl.querySelector(".events-list");

    filteredEvents.forEach(evt => {
      const eventItem = document.createElement("div");
      eventItem.className = "event-item";
      
      eventItem.innerHTML = `
        <div class="event-summary">
          <div class="event-meta">
            <span class="event-date-badge">${evt.dates.join(', ')}</span>
            <span class="event-subtitle" style="font-weight: 600;">${evt.subtitle}</span>
            <span class="kt-badge" style="font-size: 0.65rem; margin-left: 0.5rem; background: rgba(99,102,241,0.15); color: var(--primary); font-weight: 700; border: none; text-transform: uppercase;">${evt.parentSection}</span>
          </div>
          <svg class="chevron-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="event-details" style="padding: 1rem 1.25rem 1.25rem 1.25rem;">
          <p style="margin: 0; font-size: 0.95rem; line-height: 1.6; text-align: left;">
            <span style="color: #5b7fff;">${parseMarkdownBold(evt.text)}</span>
            <span style="color: #d1a15c; font-style: italic;"> Significance: ${evt.significance}</span>
          </p>
          ${evt.names && evt.names.length > 0 ? `
            <div class="event-people-chips" style="margin-top: 0.75rem; display: flex; gap: 0.35rem; flex-wrap: wrap; align-items: center;">
              <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); display: inline-flex; align-items: center; gap: 0.2rem; margin-right: 0.25rem;"><i class="fa-solid fa-user-tag" style="font-size: 0.7rem;"></i> Figures:</span>
              ${evt.names.map(name => `<span class="people-chip" onclick="event.stopPropagation(); window.showFigureModal('${name.replace(/'/g, "\\'")}')" style="font-size: 0.7rem; padding: 0.15rem 0.45rem; background: rgba(var(--primary-rgb), 0.08); border: 1px solid rgba(var(--primary-rgb), 0.15); border-radius: 12px; color: var(--primary); font-weight: 600; cursor: pointer; transition: all 0.2s;">${name}</span>`).join('')}
            </div>
          ` : ''}
          <div style="margin-top: 0.75rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
            <button class="btn" style="font-size: 0.72rem; padding: 0.3rem 0.6rem; display: inline-flex; align-items: center; gap: 0.3rem; background: rgba(59, 130, 246, 0.12); border: 1px solid rgba(59, 130, 246, 0.25); color: var(--primary);" onclick="event.stopPropagation(); window.navigateToLesson(getLessonNumFromSection('${evt.parentSection}'))">
              📖 Go to Study Lesson (${evt.parentSection})
            </button>
            <button class="btn btn-primary" style="font-size: 0.75rem; padding: 0.3rem 0.6rem; display: inline-flex; align-items: center; gap: 0.3rem;" onclick="event.stopPropagation(); bridgeTimelineToQuiz('${evt.parentSection}')">
              ⚡ Test Recall for ${evt.parentSection}
            </button>
          </div>
        </div>
      `;

      eventItem.querySelector(".event-summary").addEventListener("click", () => {
        eventItem.classList.toggle("expanded");
      });

      eventsContainer.appendChild(eventItem);
    });

    timelineList.appendChild(cardEl);
    return;
  }

  // Otherwise, default to syallbus grouped view
  const filteredData = timelineData.map(topicCard => {
    const matchedEvents = topicCard.events.filter(event => {
      const matchFilter = filter === "all" || event.tags.includes(filter);
      
      const textMatch = event.text.toLowerCase().includes(query) ||
                        event.subtitle.toLowerCase().includes(query) ||
                        event.names.some(name => name.toLowerCase().includes(query)) ||
                        event.stats.some(stat => stat.toLowerCase().includes(query)) ||
                        event.dates.some(date => date.toLowerCase().includes(query));

      return matchFilter && textMatch;
    });

    if (matchedEvents.length > 0) {
      return {
        ...topicCard,
        events: matchedEvents
      };
    }
    return null;
  }).filter(Boolean);

  if (filteredData.length === 0) {
    timelineList.innerHTML = `<div style="text-align: center; padding: 3rem; color: var(--text-muted);">
      <p>No specification points match your current search/filters.</p>
    </div>`;
    return;
  }

  filteredData.forEach(card => {
    const cardEl = document.createElement("div");
    cardEl.className = "kt-card";
    
    cardEl.innerHTML = `
      <div class="kt-header">
        <span class="kt-badge">${card.section}</span>
        <h3 class="kt-title">${card.title}</h3>
        <span class="kt-topic">${card.topic}</span>
      </div>
      <div class="events-list"></div>
    `;

    const eventsContainer = cardEl.querySelector(".events-list");

    card.events.forEach(evt => {
      const eventItem = document.createElement("div");
      eventItem.className = "event-item";
      
      eventItem.innerHTML = `
        <div class="event-summary">
          <div class="event-meta">
            <span class="event-date-badge">${evt.dates.join(', ')}</span>
            <span class="event-subtitle">${evt.subtitle}</span>
          </div>
          <svg class="chevron-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="event-details" style="padding: 1rem 1.25rem 1.25rem 1.25rem;">
          <p style="margin: 0; font-size: 0.95rem; line-height: 1.6; text-align: left;">
            <span style="color: #5b7fff;">${parseMarkdownBold(evt.text)}</span>
            <span style="color: #d1a15c; font-style: italic;"> Significance: ${evt.significance}</span>
          </p>
          ${evt.names && evt.names.length > 0 ? `
            <div class="event-people-chips" style="margin-top: 0.75rem; display: flex; gap: 0.35rem; flex-wrap: wrap; align-items: center;">
              <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); display: inline-flex; align-items: center; gap: 0.2rem; margin-right: 0.25rem;"><i class="fa-solid fa-user-tag" style="font-size: 0.7rem;"></i> Figures:</span>
              ${evt.names.map(name => `<span class="people-chip" onclick="event.stopPropagation(); window.showFigureModal('${name.replace(/'/g, "\\'")}')" style="font-size: 0.7rem; padding: 0.15rem 0.45rem; background: rgba(var(--primary-rgb), 0.08); border: 1px solid rgba(var(--primary-rgb), 0.15); border-radius: 12px; color: var(--primary); font-weight: 600; cursor: pointer; transition: all 0.2s;">${name}</span>`).join('')}
            </div>
          ` : ''}
          <div style="margin-top: 0.75rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
            <button class="btn" style="font-size: 0.72rem; padding: 0.3rem 0.6rem; display: inline-flex; align-items: center; gap: 0.3rem; background: rgba(59, 130, 246, 0.12); border: 1px solid rgba(59, 130, 246, 0.25); color: var(--primary);" onclick="event.stopPropagation(); window.navigateToLesson(getLessonNumFromSection('${card.section}'))">
              📖 Go to Study Lesson (${card.section})
            </button>
            <button class="btn btn-primary" style="font-size: 0.75rem; padding: 0.3rem 0.6rem; display: inline-flex; align-items: center; gap: 0.3rem;" onclick="event.stopPropagation(); bridgeTimelineToQuiz('${card.section}')">
              ⚡ Test Recall for ${card.section}
            </button>
          </div>
        </div>
      `;

      eventItem.querySelector(".event-summary").addEventListener("click", () => {
        eventItem.classList.toggle("expanded");
      });

      eventsContainer.appendChild(eventItem);
    });

    timelineList.appendChild(cardEl);
  });
}

function toggleFiguresDirectory() {
  const content = document.getElementById("figuresDirectoryContent");
  const icon = document.getElementById("directoryToggleIcon");
  if (!content) return;
  
  if (content.style.display === "none" || !content.style.display) {
    content.style.display = "block";
    if (icon) icon.textContent = "Hide Directory [Collapse]";
  } else {
    content.style.display = "none";
    if (icon) icon.textContent = "Show Directory [Expand]";
  }
}

function filterTimelineByFigure(name) {
  const searchInput = document.getElementById("timelineSearch");
  if (searchInput) {
    searchInput.value = name;
    searchInput.dispatchEvent(new Event("input"));
    
    // Smooth scroll down to timeline list to show results
    const list = document.getElementById("timelineList");
    if (list) {
      list.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

// Attach directory functions to window for onclick handlers
window.toggleFiguresDirectory = toggleFiguresDirectory;
window.filterTimelineByFigure = filterTimelineByFigure;

const historicalFiguresInfo = {
  "Elizabeth I": {
    role: "Queen of England (1558–1603)",
    category: "👑 The English Monarchy & Court",
    desc: "Queen Elizabeth I ascended to the throne in November 1558 following the death of her Catholic sister, Mary I. Known as the 'Virgin Queen' because she chose to remain unmarried to avoid sharing English power with a foreign suitor. She established the Elizabethan Religious Settlement (the 'Middle Way') to find a compromise between Protestants and Catholics, and successfully defended England against the Revolt of the Northern Earls, multiple Catholic plots, and the Spanish Armada in 1588."
  },
  "Mary I": {
    role: "Queen of England (1553–1558)",
    category: "👑 The English Monarchy & Court",
    desc: "Elizabeth's older half-sister and predecessor on the throne. As a devout Catholic, Mary I restored papal authority and carried out severe executions of Protestants (earning her the nickname 'Bloody Mary'). She left the country in a precarious financial state upon her death in 1558, saddling Elizabeth's new government with a massive £300,000 national debt and a military threat from French troops stationed on the Scottish border."
  },
  "Henry VIII": {
    role: "King of England (1509–1547)",
    category: "👑 The English Monarchy & Court",
    desc: "Elizabeth's father, who initiated the English Reformation. His desire to divorce Catherine of Aragon to marry Anne Boleyn led him to break away from the Catholic Church and establish the Church of England. Devout Catholics never recognized his divorce, meaning they viewed Elizabeth (his daughter with Anne Boleyn) as illegitimate and argued she had no right to succeed to the throne."
  },
  "Anne Boleyn": {
    role: "Queen of England (1533–1536)",
    category: "👑 The English Monarchy & Court",
    desc: "Elizabeth's mother and the second wife of King Henry VIII. Anne Boleyn was a key figure in the political and religious upheaval that marked the start of the English Reformation. She was executed in 1536 for treason, and her marriage to Henry was declared invalid by the English church, leading to long-term questions regarding Elizabeth's legitimacy among Catholic traditionalists."
  },
  "Catherine of Aragon": {
    role: "Queen of England (1509–1533)",
    category: "👑 The English Monarchy & Court",
    desc: "Henry VIII's first wife and the mother of Mary I. Henry's decision to dissolve his marriage to Catherine of Aragon caused the break with the Roman Catholic Church. In Catholic eyes, Catherine remained Henry's only lawful wife until her death, rendering Henry's subsequent marriage to Anne Boleyn adulterous and Elizabeth illegitimate."
  },
  "William Cecil": {
    role: "Secretary of State & Chief Advisor",
    category: "👑 The English Monarchy & Court",
    desc: "Elizabeth's most trusted advisor, appointed Secretary of State immediately upon her accession in 1558. Elevated to Lord Burghley in 1571. Cecil was a highly skilled Protestant administrator who guided the Queen through religious divisions, foreign threats, and economic stabilization, working closely with her to design the Religious Settlement and administer the country for over 40 years."
  },
  "Walsingham": {
    role: "Secretary of State & Spymaster",
    category: "👑 The English Monarchy & Court",
    desc: "Sir Francis Walsingham served as Elizabeth's Secretary of State from 1573 and ran England's first highly sophisticated intelligence network. Through double-agents, code-breakers (such as Thomas Phelippes), and mail interception (such as hiding coded letters in beer barrels), he uncovered and dismantled the Ridolfi, Throckmorton, and Babington plots, securing the vital evidence required to execute Mary, Queen of Scots for treason in 1587."
  },
  "Robert Dudley": {
    role: "Earl of Leicester & Commander",
    category: "👑 The English Monarchy & Court",
    desc: "Elizabeth's favourite courtier and a prominent Protestant noble. He served as a Privy Councillor and was heavily involved in military affairs. When sent to lead English forces in the Netherlands against Spain in 1585 under the Treaty of Nonsuch, Dudley accepted the title of Governor-General of the Low Countries without Elizabeth's permission, which furious Elizabeth viewed as a challenge to her royal authority."
  },
  "Mary, Queen of Scots": {
    role: "Queen of Scotland (1542–1567)",
    category: "🌍 Rival Monarchs & Foreign Leaders",
    desc: "Elizabeth's Catholic cousin who held a direct and highly legitimate claim to the English throne. After Scottish Protestant lords rebelled against her, she fled to England in 1568, where Elizabeth kept her under house arrest for 19 years. Due to her Catholic faith, Mary became the focal figurehead for multiple assassination plots against Elizabeth (Northern Earls, Ridolfi, Throckmorton, Babington). She was executed for treason in February 1587."
  },
  "Philip II": {
    role: "King of Spain (1556–1598)",
    category: "🌍 Rival Monarchs & Foreign Leaders",
    desc: "The powerful Catholic King of Spain and formerly husband to Mary I. Philip II viewed himself as the global defender of the Catholic faith. He grew increasingly hostile to Elizabeth due to her Religious Settlement, Drake's privateering raids on Spanish gold, and English intervention in the Netherlands (Treaty of Nonsuch). Following the execution of Mary, Queen of Scots, Philip launched the Spanish Armada in 1588 in a failed attempt to invade England."
  },
  "Mary of Guise": {
    role: "Regent of Scotland (1554–1560)",
    category: "🌍 Rival Monarchs & Foreign Leaders",
    desc: "The mother of Mary, Queen of Scots. A member of the powerful Catholic Guise family of France, she ruled Scotland as regent and stationed French troops near the English border. This posed a severe geographical military threat to Elizabeth immediately upon her accession in 1558 (the 'Auld Alliance' threat)."
  },
  "Francis II": {
    role: "King of France (1559–1560)",
    category: "🌍 Rival Monarchs & Foreign Leaders",
    desc: "The heir (Dauphin) to the French throne who married Mary, Queen of Scots in 1558. He briefly ruled France as King Francis II until his sudden death in 1560. His marriage briefly united the French and Scottish crowns, creating a Catholic threat of French expansion that deeply worried Elizabeth's early administration."
  },
  "William of Orange": {
    role: "Dutch Rebel Leader (1533–1584)",
    category: "🌍 Rival Monarchs & Foreign Leaders",
    desc: "The leader of the Protestant Dutch Revolt against Spanish rule in the Netherlands. Known as William the Silent. His fight was heavily supported by English Protestants who feared Spanish expansion. His assassination in 1584 by a Catholic fanatic deeply alarmed Elizabeth, forcing her to sign the Treaty of Nonsuch (1585) to commit English troops to protect the Dutch rebels."
  },
  "Alba": {
    role: "The Duke of Alba",
    category: "🌍 Rival Monarchs & Foreign Leaders",
    desc: "The ruthless Spanish general sent by King Philip II in 1567 to crush the Dutch Protestant Revolt in the Netherlands. Alba established the brutal 'Council of Troubles' (nicknamed the 'Council of Blood') and stationed a massive Spanish army directly across the English Channel, causing severe panic in England and inspiring local Catholic plotters who hoped Alba would invade."
  },
  "Parma": {
    role: "The Duke of Parma",
    category: "🌍 Rival Monarchs & Foreign Leaders",
    desc: "Alexander Farnese, the Duke of Parma, was a highly successful Spanish military commander in the Netherlands. In 1588, Philip II's invasion plan for the Spanish Armada relied on Medina Sidonia securing the English Channel so that Parma's 30,000 highly trained Spanish troops in Flanders could be transported across to England on barges."
  },
  "Medina Sidonia": {
    role: "Commander of the Spanish Armada",
    category: "🌍 Rival Monarchs & Foreign Leaders",
    desc: "The Spanish nobleman appointed by Philip II to lead the Spanish Armada in 1588, despite having no naval background and suffering from severe sea-sickness. Although a capable administrator, his lack of naval experience and tactical hesitation contributed to the fleet's failure to join up with Parma's troops at Calais, leading to the Armada's eventual defeat."
  },
  "Duke of Guise": {
    role: "French Catholic Nobleman",
    category: "🌍 Rival Monarchs & Foreign Leaders",
    desc: "Henry I, Duke of Guise, was a radical Catholic leader in France and a cousin to Mary, Queen of Scots. He plotted with Philip II and the Pope to launch a French invasion of England during the Throckmorton Plot in 1583. His aim was to assassinate Elizabeth, free Mary, and restore Catholicism, but Walsingham's spies uncovered the plot."
  },
  "Drake": {
    role: "Sir Francis Drake (Explorer & Privateer)",
    category: "🧭 Explorers, Privateers & Colonisers",
    desc: "Famous English explorer, privateer, and navigator. He circumnavigated the globe between 1577 and 1580 in the *Golden Hind*, returning with £400,000 in Spanish gold (earning him a knighthood). He launched the daring 'Singeing of the King of Spain's Beard' raid on Cadiz in 1587, destroying ~30 Spanish ships and delaying the Armada by a year. He then served as vice-admiral during the battle against the Spanish Armada in 1588."
  },
  "Raleigh": {
    role: "Sir Walter Raleigh (Courtier & Coloniser)",
    category: "🧭 Explorers, Privateers & Colonisers",
    desc: "A prominent Elizabethan courtier and explorer. In 1584, Elizabeth granted him a royal patent to explore and colonise the lands of North America, which he named 'Virginia' in her honour. Although Raleigh never personally sailed to the region, he successfully organised, funded, and promoted the Roanoke expeditions of 1585 and 1587, which ultimately failed catastrophically."
  },
  "Hawkins": {
    role: "Sir John Hawkins (Privateer & Ship Designer)",
    category: "🧭 Explorers, Privateers & Colonisers",
    desc: "A leading English shipbuilder, privateer, and merchant who pioneered the highly profitable transatlantic slave trade. As Treasurer of the Navy, Hawkins completely redesigned the English fleet, constructing new, fast 'race-built' galleons with lower castles and long-range culverin cannons. This structural modernization was crucial to defeating the Spanish Armada in 1588."
  },
  "Grenville": {
    role: "Sir Richard Grenville (Expedition Commander)",
    category: "🧭 Explorers, Privateers & Colonisers",
    desc: "The quick-tempered English naval commander who led the 1585 expedition to establish Walter Raleigh's first colony at Roanoke. When their flagship, the *Tiger*, ran aground and flooded, destroying all their seeds and grain, Grenville left the colonists under Ralph Lane and returned to England for supplies, leaving them starving and vulnerable to tribal conflicts."
  },
  "Harriot": {
    role: "Thomas Harriot (Mathematician & Scientist)",
    category: "🧭 Explorers, Privateers & Colonisers",
    desc: "An outstanding English mathematician, astronomer, and cartographer who sailed on the 1585 Roanoke expedition. Harriot made detailed studies of the Algonquian language, mapped the geography of Virginia, and published reports on navigational methods, mapping, and map-making technologies, helping to advance Elizabethan maritime exploration."
  },
  "Ridolfi": {
    role: "Roberto Ridolfi (Conspirator)",
    category: "🗡️ Rebels, Plotters & Others",
    desc: "An Italian banker based in London who masterminded the Ridolfi Plot in 1571. Operating on behalf of Pope Pius V, Ridolfi conspired to assassinate Elizabeth, launch a Spanish invasion under the Duke of Alba, and place Mary, Queen of Scots on the English throne married to the Duke of Norfolk. Walsingham's agents intercepted coded letters carried by Charles Baillie, exposing the plot."
  },
  "Throckmorton": {
    role: "Francis Throckmorton (Conspirator)",
    category: "🗡️ Rebels, Plotters & Others",
    desc: "A young English Catholic who acted as the key intermediary in the Throckmorton Plot of 1583. He carried messages between Mary, Queen of Scots, the French Ambassador, and Spanish funders to organize a Catholic invasion led by the Duke of Guise. Walsingham's agents observed Throckmorton's visits to the French embassy, raided his house, and found a list of Catholic conspirators. He was tortured on the rack and executed."
  },
  "Babington": {
    role: "Anthony Babington (Conspirator)",
    category: "🗡️ Rebels, Plotters & Others",
    desc: "The Catholic page who initiated the Babington Plot in 1586. He plotted to rescue Mary, Queen of Scots, and assassinate Elizabeth. Walsingham's intelligence agents used Gilbert Gifford to intercept coded letters hidden inside beer barrels sent to Mary. When Mary sent a coded reply explicitly giving her approval to assassinate the Queen, Walsingham pounced and arrested Babington and his co-conspirators."
  },
  "Norfolk": {
    role: "The Duke of Norfolk (Thomas Howard)",
    category: "🗡️ Rebels, Plotters & Others",
    desc: "The wealthiest and most senior noble in England, and a cousin to Elizabeth. Because of his stature, Catholic plotters repeatedly planned to marry him to Mary, Queen of Scots to legitimize their claim to the throne. He was implicated in the Revolt of the Northern Earls (1569) and the Ridolfi Plot (1571), leading to his arrest and eventual execution for treason in 1572."
  },
  "Northumberland": {
    role: "Earls of Northumberland & Westmorland",
    category: "🗡️ Rebels, Plotters & Others",
    desc: "Thomas Percy (Earl of Northumberland) and Charles Neville (Earl of Westmorland) were Catholic northern nobles who led the failed Revolt of the Northern Earls in 1569. Angered by their loss of political power to Protestant 'new men' like Cecil and determined to restore Catholicism, they marched south, took Durham Cathedral, and celebrated Catholic Mass. Northumberland was captured and executed, while Westmorland escaped into exile."
  },
  "Darnley": {
    role: "Lord Darnley (Henry Stuart)",
    category: "🗡️ Rebels, Plotters & Others",
    desc: "The second husband of Mary, Queen of Scots, and father of King James VI/I. Darnley was a weak and vain nobleman. In February 1567, he was mysteriously murdered when his house at Kirk o' Field in Edinburgh was blown up in a massive explosion. Mary's suspected involvement in his murder outraged Scottish Protestant lords, leading to her forced abdication and flight to England."
  },
  "Pius V": {
    role: "Pope Pius V (Head of Catholic Church)",
    category: "🗡️ Rebels, Plotters & Others",
    desc: "The Pope who issued the famous Papal Bull *Regnans in Excelsis* in 1570. This decree officially excommunicated Elizabeth, declaring her a heretic and releasing all English Catholics from their oaths of loyalty to her. This forced Catholics to choose between their religion and their Queen, encouraging multiple subsequent plots and prompting Elizabeth's government to enact harsh recusancy laws."
  },
  "Campion": {
    role: "Edmund Campion (Catholic Jesuit Priest)",
    category: "🗡️ Rebels, Plotters & Others",
    desc: "A famous English Catholic Jesuit priest. Campion smuggled himself into England in 1580 as part of a secret Catholic mission to sustain the faith of English recusants. He traveled in disguise, preaching to Catholic households. He was captured by Walsingham's agents in 1581, imprisoned in the Tower of London, tortured on the rack, and executed for treason."
  },
  "Wingina": {
    role: "Chief Wingina (Algonquian Leader)",
    category: "🗡️ Rebels, Plotters & Others",
    desc: "The leader of the local Secotan branch of the Algonquian tribe on Roanoke Island. Initially, Wingina welcomed and supported Sir Walter Raleigh's starving colonists. However, as the colonists demanded food and resources during a famine, tensions mounted. Believing Wingina was planning an attack, Ralph Lane's men ambushed and killed Chief Wingina in June 1586, destroying the colony's relations with the natives."
  }
};

// Decorate historical figures with authentic portrait paths (where they exist)
const figureImageMapping = {
  "Elizabeth I": "elizabeth_i.jpg",
  "Mary I": "mary_i.jpg",
  "Henry VIII": "henry_viii.jpg",
  "Anne Boleyn": "anne_boleyn.jpg",
  "Catherine of Aragon": "catherine_of_aragon.jpg",
  "William Cecil": "william_cecil.jpg",
  "Walsingham": "walsingham.jpg",
  "Robert Dudley": "robert_dudley.jpg",
  "Mary, Queen of Scots": "mary_qos.jpg",
  "Philip II": "philip_ii.jpg",
  "Mary of Guise": "mary_of_guise.jpg",
  "Francis II": "francis_ii.jpg",
  "William of Orange": "william_of_orange.jpg",
  "Alba": "alba.jpg",
  "Parma": "parma.png",
  "Medina Sidonia": "medina_sidonia.jpg",
  "Duke of Guise": "duke_of_guise.jpg",
  "Drake": "drake.jpg",
  "Raleigh": "raleigh.jpg",
  "Hawkins": "hawkins.jpg",
  "Grenville": "grenville.jpg",
  "Harriot": "harriot.jpg",
  "Babington": "babington.jpg",
  "Norfolk": "norfolk.jpg",
  "Northumberland": "northumberland.jpg",
  "Darnley": "darnley.jpg",
  "Pius V": "pius_v.jpg",
  "Campion": "campion.jpg"
};

for (const key in figureImageMapping) {
  if (historicalFiguresInfo[key]) {
    historicalFiguresInfo[key].image = "assets/portraits/" + figureImageMapping[key];
  }
}

function showFigureModal(name) {
  let data = historicalFiguresInfo[name];
  if (!data) {
    const key = Object.keys(historicalFiguresInfo).find(
      k => k.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(k.toLowerCase())
    );
    if (key) {
      name = key;
      data = historicalFiguresInfo[key];
    }
  }
  
  if (!data) return;
  
  const modal = document.getElementById("figureDetailModal");
  const nameEl = document.getElementById("figureModalName");
  const badgeEl = document.getElementById("figureModalRoleBadge");
  const bodyEl = document.getElementById("figureModalBody");
  
  if (nameEl) nameEl.textContent = name;
  if (badgeEl) {
    badgeEl.innerHTML = `
      <span style="font-size: 0.7rem; padding: 0.2rem 0.5rem; background: rgba(var(--primary-rgb), 0.1); border-radius: 12px; font-weight: 700; color: var(--primary); text-transform: uppercase;">${data.category}</span>
      <span style="font-size: 0.72rem; font-weight: 600; color: var(--text-muted); margin-left: 0.5rem;">${data.role}</span>
    `;
  }
  if (bodyEl) {
    const hasImage = data.image ? true : false;
    bodyEl.innerHTML = `
      <div style="display: flex; gap: 1.25rem; flex-wrap: wrap; align-items: flex-start;">
        ${hasImage ? `
          <div style="flex: 0 0 120px; width: 120px; border-radius: 8px; overflow: hidden; border: 1px solid var(--border-color); box-shadow: var(--shadow-sm); background: var(--bg-surface-alt);">
            <img src="${data.image}" alt="${name}" style="width: 100%; height: 160px; object-fit: cover; display: block;" onerror="this.parentNode.style.display='none'; document.getElementById('figureDetailModal').querySelector('.modal-content').style.maxWidth='480px';" />
          </div>
        ` : ''}
        <div style="flex: 1; min-width: 220px;">
          <p style="margin: 0; line-height: 1.6; font-size: 0.92rem; color: var(--text-main);">${data.desc}</p>
        </div>
      </div>
      <div style="margin-top: 1.5rem; border-top: 1px solid var(--border-color); padding-top: 0.75rem; display: flex; justify-content: flex-end; gap: 0.5rem;">
        <button class="btn" style="font-size: 0.78rem; padding: 0.4rem 0.8rem;" onclick="window.closeFigureModal()">Close</button>
        <button class="btn btn-primary" style="font-size: 0.78rem; padding: 0.4rem 0.8rem; display: inline-flex; align-items: center; gap: 0.35rem;" onclick="window.filterTimelineByFigure('${name.replace(/'/g, "\\'")}'); window.closeFigureModal();">
          <i class="fa-solid fa-filter"></i> Filter Timeline
        </button>
      </div>
    `;
  }
  
  if (modal) {
    const modalContent = modal.querySelector(".modal-content");
    if (modalContent) {
      modalContent.style.maxWidth = data.image ? "560px" : "480px";
    }
    modal.style.display = "flex";
  }
}

function closeFigureModal() {
  const modal = document.getElementById("figureDetailModal");
  if (modal) modal.style.display = "none";
}

function getLessonNumFromSection(section) {
  if (!section) return 1;
  const match = section.match(/KT\s*(\d+)\.(\d+)/i);
  if (match) {
    const kt = parseInt(match[1], 10);
    const sub = parseInt(match[2], 10);
    if (kt === 1) return sub; 
    if (kt === 2) return 4 + sub; 
    if (kt === 3) return 8 + sub; 
  }
  return 1;
}

function navigateToLesson(lessonNum) {
  const tabButton = document.querySelector(`.nav-tab[data-target="lessonsSection"]`);
  if (tabButton) {
    tabButton.click();
  }
  if (typeof switchActiveLesson === 'function') {
    switchActiveLesson(lessonNum);
  }
}

// Bind to window for global access
window.showFigureModal = showFigureModal;
window.closeFigureModal = closeFigureModal;
window.navigateToLesson = navigateToLesson;

// Attach directory functions to window for onclick handlers
window.toggleFiguresDirectory = toggleFiguresDirectory;
window.filterTimelineByFigure = filterTimelineByFigure;

function parseMarkdownBold(text) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

// 4. Exam Practice Area Logic
function setupExamPractice() {
  const sidebarButtons = document.querySelectorAll(".exam-nav-btn");
  sidebarButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      sidebarButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      appState.activeQuestionType = btn.getAttribute("data-qtype");
      appState.activePracticePanel = "workspace"; // Reset panel to workspace on switch
      renderExamWorkspace();
    });
  });

  renderExamWorkspace();
}

function renderGradeComparison(question, qType) {
  if (!question.modelAnswer) {
    return `
      <div style="padding: 2rem; text-align: center; color: var(--text-muted);">
        <p>Model answer details are being compiled for this question. In the meantime, use the <strong>💨 Send up a Smoke Signal</strong> button in the workspace tab for paragraph-by-paragraph scaffolding.</p>
      </div>
    `;
  }

  let grade5Text = "";
  let grade9Text = "";
  let grade5Annotations = [];
  let grade9Annotations = [];

  const renderText = (t) => parseMarkdownBold(t || "");

  if (qType === "describe") {
    const featureClean = (question.modelAnswer.feature || "").replace(/\b(15\d{2}|[A-Z][a-z]+(\s[A-Z][a-z]+)*)\b/g, "the church leaders").replace(/\s*;\s*$/, "");
    grade5Text = `<p>One key feature was ${featureClean.toLowerCase()} This was a major change at the time.</p>`;
    
    grade9Text = `
      <p style="margin-bottom: 0.5rem;">
        <span class="hl-feature">${renderText(question.modelAnswer.feature)}</span>
        <span class="hl-evidence">${renderText(question.modelAnswer.detail)}</span>
      </p>
    `;

    grade5Annotations = [
      "⚠️ <strong>Score: 1/2 Marks (Grade 4 to 6 Standard)</strong>",
      "• 1 mark is gained for identifying a basic correct feature or fact.",
      "• The second mark is missed because no additional related fact is provided."
    ];

    grade9Annotations = [
      "🏆 <strong>Score: 2/2 Marks (Grade 9 Standard)</strong>",
      "• 1 mark is gained for identifying the basic correct feature or fact.",
      "• The second mark is gained for simply providing an additional related fact."
    ];
  } else {
    if (question.modelAnswer.grade5) {
      grade5Text = question.modelAnswer.grade5.split("\n\n").map(p => `<p style="margin-bottom: 1rem;">${renderText(p)}</p>`).join("");
    } else {
      let paragraphs5 = [];
      if (question.modelAnswer.intro) {
        paragraphs5.push("I think there were several reasons for this. The first reason was the one in the question, but there were also other things like " + (question.prompts ? question.prompts.join(" and ") : "the main events") + ". In this essay I will explain why.");
      }
      
      if (question.modelAnswer.paragraphs) {
        question.modelAnswer.paragraphs.forEach((p) => {
          let pointClean = p.point || "";
          if (pointClean) {
            // Lowercase the first letter so it doesn't match proper nouns regex
            pointClean = pointClean.charAt(0).toLowerCase() + pointClean.slice(1);
            // Replace proper nouns and dates with "the government"
            pointClean = pointClean.replace(/\b(15\d{2}|[A-Z][a-z]+(\s[A-Z][a-z]+)*)\b/g, "the government");
            // Clean up any double "the the government" that may result
            pointClean = pointClean.replace(/\bthe the government\b/g, "the government");
            // Capitalize the first letter again for the sentence start
            pointClean = pointClean.charAt(0).toUpperCase() + pointClean.slice(1);
          }
          paragraphs5.push(`${pointClean} This was a big problem at the time and people in England were very worried about it. It caused a lot of problems for the Queen and meant she had to make changes. This shows it was a very important reason why it happened.`);
        });
      }

      if (question.modelAnswer.conclusion) {
        paragraphs5.push("In conclusion, I think that the reasons I have talked about were all very important, but the first one was probably the biggest cause because it had the most impact on people in the country.");
      }

      grade5Text = paragraphs5.map(p => `<p style="margin-bottom: 1rem;">${p}</p>`).join("");
    }

    let paragraphs9 = [];
    if (question.modelAnswer.intro) {
      paragraphs9.push(`<p style="margin-bottom:0.5rem; font-style: italic; color:var(--text-muted); font-size:0.85rem;">Introductory Paragraph:</p><p style="margin-bottom: 1rem; border-left: 2px solid var(--border-color); padding-left: 0.5rem;">${renderText(question.modelAnswer.intro)}</p>`);
    }

    if (question.modelAnswer.paragraphs) {
      question.modelAnswer.paragraphs.forEach((p, idx) => {
        paragraphs9.push(`
          <p style="margin-bottom:0.35rem; font-style: italic; color:var(--text-muted); font-size:0.85rem;">Paragraph ${idx + 1}:</p>
          <p style="margin-bottom: 1.25rem;">
            <span class="hl-feature">${renderText(p.point)}</span>
            <span class="hl-evidence">${renderText(p.evidence)}</span>
            <span class="hl-explanation">${renderText(p.explanation)}</span>
            <span class="hl-link">${renderText(p.link)}</span>
          </p>
        `);
      });
    }

    if (question.modelAnswer.conclusion) {
      paragraphs9.push(`<p style="margin-bottom:0.35rem; font-style: italic; color:var(--text-muted); font-size:0.85rem;">Concluding Paragraph:</p><p style="border-left: 2px solid var(--border-color); padding-left: 0.5rem;">${renderText(question.modelAnswer.conclusion)}</p>`);
    }

    grade9Text = paragraphs9.join("");

    if (qType === "explain") {
      grade5Annotations = [
        "⚠️ <strong>Score: ~6-7 Marks (Grade 4 to 6 Standard)</strong>",
        question.modelAnswer.grade5Commentary ? `✍️ <strong>Examiner Commentary:</strong> ${question.modelAnswer.grade5Commentary}` : "• Paragraphs focus on relevant factors but remain mostly descriptive.",
        "• Lacks deeper analysis linking facts to consequences."
      ];

      grade9Annotations = [
        "🏆 <strong>Score: 11-12 Marks (Grade 9 Standard)</strong>",
        question.modelAnswer.grade9Commentary ? `✍️ <strong>Examiner Commentary:</strong> ${question.modelAnswer.grade9Commentary}` : "• Consistent, analytical focus directly addressing the 'Why' of the question (AO2).",
        "• Highly detailed, accurate knowledge injected into every paragraph (AO1)."
      ];
    } else {
      grade5Annotations = [
        "⚠️ <strong>Score: ~7-8 Marks (Grade 4 to 6 Standard)</strong>",
        question.modelAnswer.grade5Commentary ? `✍️ <strong>Examiner Commentary:</strong> ${question.modelAnswer.grade5Commentary}` : "• Simple essay structure present with a basic introduction and conclusion.",
        "• Mostly descriptive writing that fails to cover both sides of the debate evenly."
      ];

      grade9Annotations = [
        "🏆 <strong>Score: 15-16 Marks (Grade 9 Standard)</strong>",
        question.modelAnswer.grade9Commentary ? `✍️ <strong>Examiner Commentary:</strong> ${question.modelAnswer.grade9Commentary}` : "• Sophisticated introduction setting up a clear thesis and criteria for evaluation.",
        "• Balanced debate examining both sides (Agree/Disagree) with highly precise evidence (AO1)."
      ];
    }
  }

  return `
    <div class="comparative-answers-grid">
      <div class="compare-answer-box grade-5">
        <div class="compare-badge">Grade 4 to 6 Standard</div>
        <div class="compare-answer-text">${grade5Text}</div>
        <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
          ${grade5Annotations.map(annot => `<div class="compare-annot-item">${annot}</div>`).join('')}
        </div>
      </div>
      <div class="compare-answer-box grade-9">
        <div class="compare-badge">Grade 9 Standard</div>
        <div class="compare-answer-text">${grade9Text}</div>
        <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
          ${grade9Annotations.map(annot => `<div class="compare-annot-item">${annot}</div>`).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderExamWorkspace() {
  const qType = appState.activeQuestionType;
  
  if (qType === "wheel") {
    // Generate Wheel SVG programmatically
    const getWheelSVG = () => {
      let paths = "";
      const colors = ["#131b2e", "#e11d48", "#b45309", "#6366f1", "#1e293b", "#be123c", "#eab308", "#4f46e5", "#0b0f19", "#f43f5e", "#ca8a04", "#4338ca"];
      const labels = ["KT 1.1", "KT 1.2", "KT 1.3", "KT 1.4", "KT 2.1", "KT 2.2", "KT 2.3", "KT 2.4", "KT 3.1", "KT 3.2", "KT 3.3", "KT 3.4"];
      
      for (let i = 0; i < 12; i++) {
        const angle = 30;
        const startAngle = i * angle - 90;
        const endAngle = (i + 1) * angle - 90;
        
        const rad1 = (startAngle * Math.PI) / 180;
        const rad2 = (endAngle * Math.PI) / 180;
        
        const x1 = 160 + 150 * Math.cos(rad1);
        const y1 = 160 + 150 * Math.sin(rad1);
        const x2 = 160 + 150 * Math.cos(rad2);
        const y2 = 160 + 150 * Math.sin(rad2);
        
        paths += `<path d="M160,160 L${x1},${y1} A150,150 0 0,1 ${x2},${y2} Z" fill="${colors[i]}" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>`;
        
        const textAngle = startAngle + 15;
        const textRad = (textAngle * Math.PI) / 180;
        const tx = 160 + 95 * Math.cos(textRad);
        const ty = 160 + 95 * Math.sin(textRad);
        
        paths += `<text x="${tx}" y="${ty}" fill="#ffffff" font-size="9" font-weight="bold" font-family="Outfit" text-anchor="middle" transform="rotate(${textAngle + 90}, ${tx}, ${ty})">${labels[i]}</text>`;
      }
      return `<svg class="wheel-svg" id="wheelSvg" viewBox="0 0 320 320">${paths}</svg>`;
    };

    examWorkspace.innerHTML = `
      <div class="wheel-container">
        <h3 style="font-family: var(--font-title); font-size: 1.4rem; font-weight: 800; text-align: center;">🎡 Specification Roulette</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); text-align: center; max-width: 500px; margin-bottom: 0.5rem;">
          Spin the wheel to choose a random sub-topic and exam-style question. Test your recall and scaffolded structure knowledge!
        </p>
        
        <div class="wheel-wrapper">
          <div class="wheel-pointer"></div>
          ${getWheelSVG()}
          <button class="wheel-center-btn" id="spinBtn" onclick="spinElizabethanWheel()">SPIN</button>
        </div>
        
        <div class="wheel-question-card" id="wheelQuestionCard">
          <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-gold); font-weight: bold; margin-bottom: 0.25rem; letter-spacing: 0.05em;" id="wheelQTopic"></div>
          <h4 style="font-family: var(--font-title); font-size: 1.15rem; margin-bottom: 0.75rem; color: var(--primary);" id="wheelQType"></h4>
          <p style="font-size: 0.95rem; line-height: 1.6; font-weight: 500; padding: 0.75rem; background: var(--bg-main); border: 1px solid var(--border-color); border-radius: var(--radius-sm); white-space: pre-line;" id="wheelQText"></p>
          <div class="wheel-tip-box" id="wheelQTip"></div>
          <button class="btn btn-primary" style="margin-top: 1.25rem; width: 100%; justify-content: center; display: inline-flex;" id="attemptBtn">Attempt this Question</button>
        </div>
      </div>
    `;
    return;
  }

  if (qType === "mock") {
    if (!appState.mockExam) {
      examWorkspace.innerHTML = `
        <div class="mock-exam-landing-card" style="text-align: center; padding: 3rem 2rem; max-width: 600px; margin: 2rem auto; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color); box-shadow: var(--shadow-lg);">
          <div style="font-size: 3.5rem; margin-bottom: 1.5rem;">📝</div>
          <h2 style="font-family: var(--font-title); font-size: 1.8rem; font-weight: 800; margin-bottom: 0.75rem; color: #10b981;">Pearson Edexcel GCSE History</h2>
          <h3 style="font-family: var(--font-title); font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: var(--text-muted);">Paper 2, Booklet B4: Early Elizabethan England, 1558–88</h3>
          <p style="font-size: 0.95rem; color: var(--text-main); margin-bottom: 2rem; line-height: 1.6;">
            Practice with curated mock exams designed to target key gaps in the specification without topic overlaps, or generate a custom 32-mark examination paper under the updated Edexcel 2025 format.
          </p>
          
          <div style="margin-bottom: 2rem; display: flex; flex-direction: column; gap: 1rem; align-items: center; justify-content: center;">
            <select id="mockPaperSelect" class="search-bar" style="max-width: 380px; padding: 0.5rem 0.75rem; font-family: var(--font-title); font-size: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); background: var(--bg-main); color: var(--text-main); font-weight: 600; cursor: pointer; width: 100%;">
              <option value="random">🎲 Randomly Generated Paper</option>
              <option value="mock1">📝 Mock 1: The "High Probability" Paper</option>
              <option value="mock2">📝 Mock 2: The "Moderate Probability" Paper</option>
              <option value="mock3">📝 Mock 3: The "Mixed Threat" Paper</option>
              <option value="mock4">📝 Mock 4: The "Least Likely" Paper</option>
            </select>
            <button class="btn btn-primary" onclick="startSelectedMockExam(document.getElementById('mockPaperSelect').value)" style="font-size: 1.1rem; padding: 0.75rem 1.5rem; margin: 0 auto; justify-content: center; width: 100%; max-width: 280px; display: inline-flex;">
              📝 Take This Mock Exam
            </button>
          </div>
        </div>
      `;
      return;
    }

    const { q1a, q1b, q2, q3, q4 } = appState.mockExam;

    examWorkspace.innerHTML = `
      <!-- STRICT SPECIFICATION CONSTRAINT: All question texts below are pulled directly from syllabus banks and cannot be edited -->
      <div class="mock-exam-paper-container" style="max-width: 800px; margin: 0 auto; padding: 2rem; background: var(--bg-card); border-radius: var(--radius-md); border: 2px solid var(--border-color); box-shadow: var(--shadow-lg); font-family: 'Inter', sans-serif;">
        <!-- Exam Header -->
        <div class="exam-paper-header" style="border-bottom: 3px double var(--border-color); padding-bottom: 1.5rem; margin-bottom: 2rem; text-align: center;">
          <h2 style="font-family: var(--font-title); font-size: 1.6rem; font-weight: 800; margin-bottom: 0.25rem; letter-spacing: 0.02em; color: var(--text-main);">${appState.mockExam.isCurated ? appState.mockExam.title : 'Pearson Edexcel GCSE (9–1)'}</h2>
          <h3 style="font-family: var(--font-title); font-size: 1.25rem; font-weight: 700; color: var(--text-gold); margin-bottom: 0.5rem;">Booklet B4: Early Elizabethan England, 1558–88</h3>
          <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-main); padding: 0.5rem 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.85rem; font-weight: 600;">
            <span style="color: var(--text-muted);">Paper Reference: 1HI0/2B (2025 Format)</span>
            <span style="color: var(--accent-indigo);">Total Marks: 32</span>
          </div>
        </div>

        <div style="font-size: 0.9rem; font-style: italic; color: var(--text-muted); margin-bottom: 2rem; padding: 0.75rem; background: rgba(99, 102, 241, 0.05); border-left: 3px solid var(--primary); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; line-height: 1.5;">
          <strong>Answer three questions:</strong> Question 1(a), Question 1(b), Question 2 and EITHER Question 3 OR Question 4.
        </div>

        <!-- QUESTION 1(a) -->
        <div class="mock-question-section" style="margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 1px solid var(--border-color);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
            <h4 style="font-family: var(--font-title); font-size: 1.15rem; font-weight: 700; margin: 0; color: var(--primary);">Question 1(a)</h4>
            <span style="font-size: 0.8rem; background: var(--primary); padding: 0.15rem 0.4rem; border-radius: 3px; font-weight: bold; color: white;">2 Marks</span>
          </div>
          <p style="font-size: 1.05rem; font-weight: 600; line-height: 1.5; margin-bottom: 0.75rem; color: var(--text-main);">${q1a.question}</p>
          
          <div style="margin-top: 0.75rem; margin-bottom: 1rem;">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
              <button class="btn" id="hintBtn-${q1a.id}" onclick="toggleMockExamHint('${q1a.id}')" style="font-size: 0.75rem; padding: 0.35rem 0.7rem;">💨 Send up a Smoke Signal</button>
              <button class="btn btn-secondary" id="modelAnswerBtn-${q1a.id}" onclick="toggleMockExamModelAnswer('${q1a.id}', 'describe')" style="font-size: 0.75rem; padding: 0.35rem 0.7rem; background: var(--bg-surface); border: 1px solid var(--border-color); color: var(--text-main);">📖 View Model Answer</button>
            </div>
            <div id="hintBox-${q1a.id}" style="display: none; margin-top: 0.75rem; font-size: 0.85rem; color: var(--text-muted); background: rgba(234, 179, 8, 0.05); padding: 0.5rem 0.75rem; border-left: 2px solid var(--text-gold); border-radius: 0 4px 4px 0; margin-bottom: 0.5rem;">
              <strong>Key Factual Hints:</strong><br>${(examQuestionFacts[q1a.id] || q1a.clue || "").replace(/\n/g, "<br>")}
            </div>
            <div id="modelAnswerBox-${q1a.id}" style="display: none; margin-top: 0.75rem; font-size: 0.9rem; color: var(--text-main); background: rgba(16, 185, 129, 0.05); padding: 1rem; border-left: 3px solid #10b981; border-radius: 0 4px 4px 0; line-height: 1.6;"></div>
          </div>
        </div>

        <!-- QUESTION 1(b) -->
        <div class="mock-question-section" style="margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 1px solid var(--border-color);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
            <h4 style="font-family: var(--font-title); font-size: 1.15rem; font-weight: 700; margin: 0; color: var(--primary);">Question 1(b)</h4>
            <span style="font-size: 0.8rem; background: var(--primary); padding: 0.15rem 0.4rem; border-radius: 3px; font-weight: bold; color: white;">2 Marks</span>
          </div>
          <p style="font-size: 1.05rem; font-weight: 600; line-height: 1.5; margin-bottom: 0.75rem; color: var(--text-main);">${q1b.question}</p>
          
          <div style="margin-top: 0.75rem; margin-bottom: 1rem;">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
              <button class="btn" id="hintBtn-${q1b.id}" onclick="toggleMockExamHint('${q1b.id}')" style="font-size: 0.75rem; padding: 0.35rem 0.7rem;">💨 Send up a Smoke Signal</button>
              <button class="btn btn-secondary" id="modelAnswerBtn-${q1b.id}" onclick="toggleMockExamModelAnswer('${q1b.id}', 'describe')" style="font-size: 0.75rem; padding: 0.35rem 0.7rem; background: var(--bg-surface); border: 1px solid var(--border-color); color: var(--text-main);">📖 View Model Answer</button>
            </div>
            <div id="hintBox-${q1b.id}" style="display: none; margin-top: 0.75rem; font-size: 0.85rem; color: var(--text-muted); background: rgba(234, 179, 8, 0.05); padding: 0.5rem 0.75rem; border-left: 2px solid var(--text-gold); border-radius: 0 4px 4px 0; margin-bottom: 0.5rem;">
              <strong>Key Factual Hints:</strong><br>${(examQuestionFacts[q1b.id] || q1b.clue || "").replace(/\n/g, "<br>")}
            </div>
            <div id="modelAnswerBox-${q1b.id}" style="display: none; margin-top: 0.75rem; font-size: 0.9rem; color: var(--text-main); background: rgba(16, 185, 129, 0.05); padding: 1rem; border-left: 3px solid #10b981; border-radius: 0 4px 4px 0; line-height: 1.6;"></div>
          </div>
        </div>

        <!-- QUESTION 2 -->
        <div class="mock-question-section" style="margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 1px solid var(--border-color);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
            <h4 style="font-family: var(--font-title); font-size: 1.15rem; font-weight: 700; margin: 0; color: var(--primary);">Question 2</h4>
            <span style="font-size: 0.8rem; background: var(--primary); padding: 0.15rem 0.4rem; border-radius: 3px; font-weight: bold; color: white;">12 Marks</span>
          </div>
          <p style="font-size: 1.05rem; font-weight: 600; line-height: 1.5; margin-bottom: 0.75rem; color: var(--text-main);">${q2.question}</p>
          
          <div style="background: var(--bg-main); padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm); margin-bottom: 1rem;">
            <span style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-gold); font-weight: 700; display: block; margin-bottom: 0.5rem;">You may use the following in your answer:</span>
            <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.95rem; line-height: 1.6; color: var(--text-main);">
              ${q2.prompts ? q2.prompts.map(p => `<li>${p}</li>`).join('') : ''}
            </ul>
            <span style="font-size: 0.9rem; font-style: italic; color: var(--text-muted); display: block; margin-top: 0.5rem;">You must also use information of your own.</span>
          </div>

          <div style="margin-top: 0.75rem; margin-bottom: 1rem;">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
              <button class="btn" id="hintBtn-${q2.id}" onclick="toggleMockExamHint('${q2.id}')" style="font-size: 0.75rem; padding: 0.35rem 0.7rem;">💨 Send up a Smoke Signal</button>
              <button class="btn btn-secondary" id="modelAnswerBtn-${q2.id}" onclick="toggleMockExamModelAnswer('${q2.id}', 'explain')" style="font-size: 0.75rem; padding: 0.35rem 0.7rem; background: var(--bg-surface); border: 1px solid var(--border-color); color: var(--text-main);">📖 View Model Answer</button>
            </div>
            <div id="hintBox-${q2.id}" style="display: none; margin-top: 0.75rem; font-size: 0.85rem; color: var(--text-muted); background: rgba(234, 179, 8, 0.05); padding: 0.5rem 0.75rem; border-left: 2px solid var(--text-gold); border-radius: 0 4px 4px 0; margin-bottom: 0.5rem;">
              <strong>Key Factual Hints:</strong><br>${(examQuestionFacts[q2.id] || "").replace(/\n/g, "<br>")}
            </div>
            <div id="modelAnswerBox-${q2.id}" style="display: none; margin-top: 0.75rem; font-size: 0.9rem; color: var(--text-main); background: rgba(16, 185, 129, 0.05); padding: 1rem; border-left: 3px solid #10b981; border-radius: 0 4px 4px 0; line-height: 1.6;"></div>
          </div>
        </div>

        <!-- CHOICE DIVIDER -->
        <div style="text-align: center; margin: 3rem 0; padding: 1.25rem; border: 2px dashed rgba(16, 185, 129, 0.3); background: rgba(16, 185, 129, 0.03); border-radius: var(--radius-sm);">
          <span style="font-family: var(--font-title); font-size: 1rem; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.25rem;">Answer EITHER Question 3 OR Question 4</span>
          <span style="font-size: 0.85rem; color: var(--text-muted); font-style: italic;">Indicate which question you are answering by marking a cross in the box.</span>
        </div>

        <!-- QUESTION 3 -->
        <div class="mock-question-section" style="margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 1px solid var(--border-color);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
            <h4 style="font-family: var(--font-title); font-size: 1.15rem; font-weight: 700; margin: 0; color: var(--primary);">Question 3</h4>
            <span style="font-size: 0.8rem; background: var(--primary); padding: 0.15rem 0.4rem; border-radius: 3px; font-weight: bold; color: white;">16 Marks</span>
          </div>
          <p style="font-size: 1.05rem; font-weight: 600; line-height: 1.5; margin-bottom: 0.75rem; color: var(--text-main);">${q3.question}</p>
          
          <div style="background: var(--bg-main); padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm); margin-bottom: 1rem;">
            <span style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-gold); font-weight: 700; display: block; margin-bottom: 0.5rem;">You may use the following in your answer:</span>
            <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.95rem; line-height: 1.6; color: var(--text-main);">
              ${q3.prompts ? q3.prompts.map(p => `<li>${p}</li>`).join('') : ''}
            </ul>
            <span style="font-size: 0.9rem; font-style: italic; color: var(--text-muted); display: block; margin-top: 0.5rem;">You must also use information of your own.</span>
          </div>

          <div style="margin-top: 0.75rem; margin-bottom: 1rem;">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
              <button class="btn" id="hintBtn-${q3.id}" onclick="toggleMockExamHint('${q3.id}')" style="font-size: 0.75rem; padding: 0.35rem 0.7rem;">💨 Send up a Smoke Signal</button>
              <button class="btn btn-secondary" id="modelAnswerBtn-${q3.id}" onclick="toggleMockExamModelAnswer('${q3.id}', 'essay')" style="font-size: 0.75rem; padding: 0.35rem 0.7rem; background: var(--bg-surface); border: 1px solid var(--border-color); color: var(--text-main);">📖 View Model Answer</button>
            </div>
            <div id="hintBox-${q3.id}" style="display: none; margin-top: 0.75rem; font-size: 0.85rem; color: var(--text-muted); background: rgba(234, 179, 8, 0.05); padding: 0.5rem 0.75rem; border-left: 2px solid var(--text-gold); border-radius: 0 4px 4px 0; margin-bottom: 0.5rem;">
              <strong>Key Factual Hints:</strong><br>${(examQuestionFacts[q3.id] || "").replace(/\n/g, "<br>")}
            </div>
            <div id="modelAnswerBox-${q3.id}" style="display: none; margin-top: 0.75rem; font-size: 0.9rem; color: var(--text-main); background: rgba(16, 185, 129, 0.05); padding: 1rem; border-left: 3px solid #10b981; border-radius: 0 4px 4px 0; line-height: 1.6;"></div>
          </div>
        </div>

        <!-- QUESTION 4 -->
        <div class="mock-question-section" style="margin-bottom: 2.5rem; padding-bottom: 2rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
            <h4 style="font-family: var(--font-title); font-size: 1.15rem; font-weight: 700; margin: 0; color: var(--primary);">Question 4</h4>
            <span style="font-size: 0.8rem; background: var(--primary); padding: 0.15rem 0.4rem; border-radius: 3px; font-weight: bold; color: white;">16 Marks</span>
          </div>
          <p style="font-size: 1.05rem; font-weight: 600; line-height: 1.5; margin-bottom: 0.75rem; color: var(--text-main);">${q4.question}</p>
          
          <div style="background: var(--bg-main); padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm); margin-bottom: 1rem;">
            <span style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-gold); font-weight: 700; display: block; margin-bottom: 0.5rem;">You may use the following in your answer:</span>
            <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.95rem; line-height: 1.6; color: var(--text-main);">
              ${q4.prompts ? q4.prompts.map(p => `<li>${p}</li>`).join('') : ''}
            </ul>
            <span style="font-size: 0.9rem; font-style: italic; color: var(--text-muted); display: block; margin-top: 0.5rem;">You must also use information of your own.</span>
          </div>

          <div style="margin-top: 0.75rem; margin-bottom: 1rem;">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
              <button class="btn" id="hintBtn-${q4.id}" onclick="toggleMockExamHint('${q4.id}')" style="font-size: 0.75rem; padding: 0.35rem 0.7rem;">💨 Send up a Smoke Signal</button>
              <button class="btn btn-secondary" id="modelAnswerBtn-${q4.id}" onclick="toggleMockExamModelAnswer('${q4.id}', 'essay')" style="font-size: 0.75rem; padding: 0.35rem 0.7rem; background: var(--bg-surface); border: 1px solid var(--border-color); color: var(--text-main);">📖 View Model Answer</button>
            </div>
            <div id="hintBox-${q4.id}" style="display: none; margin-top: 0.75rem; font-size: 0.85rem; color: var(--text-muted); background: rgba(234, 179, 8, 0.05); padding: 0.5rem 0.75rem; border-left: 2px solid var(--text-gold); border-radius: 0 4px 4px 0; margin-bottom: 0.5rem;">
              <strong>Key Factual Hints:</strong><br>${(examQuestionFacts[q4.id] || "").replace(/\n/g, "<br>")}
            </div>
            <div id="modelAnswerBox-${q4.id}" style="display: none; margin-top: 0.75rem; font-size: 0.9rem; color: var(--text-main); background: rgba(16, 185, 129, 0.05); padding: 1rem; border-left: 3px solid #10b981; border-radius: 0 4px 4px 0; line-height: 1.6;"></div>
          </div>
        </div>

        <!-- Footer Control -->
        <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
          <button class="btn" onclick="clearActiveMockExam()" style="font-size: 1rem; padding: 0.6rem 1.25rem; border: 1px solid var(--border-color); background: var(--bg-main); color: var(--text-main);">
            🔙 Back to Selection
          </button>
          <button class="btn btn-primary" onclick="generateMockPaper()" style="font-size: 1rem; padding: 0.6rem 1.25rem;">
            🔄 Generate Random Mock Paper
          </button>
        </div>
      </div>
    `;
    return;
  }

  if (qType === "past-paper") {
    if (!appState.activePastPaper) {
      // Render landing/selection view
      const paperOptions = officialPastPapers.map(p => `<option value="${p.series}">${p.series}</option>`).join('');
      examWorkspace.innerHTML = `
        <div class="past-paper-landing-card" style="text-align: center; padding: 3rem 2rem; max-width: 600px; margin: 2rem auto; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color); box-shadow: var(--shadow-lg);">
          <div style="font-size: 3.5rem; margin-bottom: 1.5rem;">📄</div>
          <h2 style="font-family: var(--font-title); font-size: 1.8rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--accent-indigo);">Official Edexcel Past Papers</h2>
          <h3 style="font-family: var(--font-title); font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: var(--text-muted);">Early Elizabethan England, 1558–88</h3>
          <p style="font-size: 0.95rem; color: var(--text-main); margin-bottom: 2rem; line-height: 1.6;">
            Practice with authentic questions, stimulus points, and topics sourced directly from official Edexcel GCSE History exams (2019–2025). Select a specific year below or take a random paper.
          </p>
          
          <div style="margin-bottom: 2rem; display: flex; flex-direction: column; gap: 1rem; align-items: center; justify-content: center;">
            <select id="pastPaperSelect" class="search-bar" style="max-width: 320px; padding: 0.5rem; font-family: var(--font-title); font-size: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); background: var(--bg-main); color: var(--text-main); font-weight: 600;">
              ${paperOptions}
            </select>
            <div style="display: flex; gap: 1rem; width: 100%; max-width: 450px; justify-content: center;">
              <button class="btn btn-primary" onclick="generateHistoricalPaper(document.getElementById('pastPaperSelect').value)" style="font-size: 1rem; padding: 0.65rem 1.25rem; flex: 1; justify-content: center; display: inline-flex;">
                📄 Take This Paper
              </button>
              <button class="btn" onclick="generateHistoricalPaper()" style="font-size: 1rem; padding: 0.65rem 1.25rem; flex: 1; justify-content: center; display: inline-flex; border: 1px solid var(--border-color);">
                🎲 Random Paper
              </button>
            </div>
          </div>
        </div>
      `;
      return;
    }

    const paper = appState.activePastPaper;
    const q1aId = findQuestionId(paper.q1a.text);
    const q1bId = findQuestionId(paper.q1b.text);
    const q2Id = findQuestionId(paper.q2.text);
    const q3Id = findQuestionId(paper.q3.text);
    const q4Id = findQuestionId(paper.q4.text);

    const formatPrompts = (qText) => {
      const parts = qText.split('\nStimulus:');
      if (parts.length > 1) {
        return parts[1].split('/').map(p => `<li>${p.trim()}</li>`).join('');
      }
      return '';
    };

    const getCleanQuestionText = (qText) => {
      return qText.split('\nStimulus:')[0].trim();
    };

    examWorkspace.innerHTML = `
      <div class="mock-exam-paper-container" style="max-width: 800px; margin: 0 auto; padding: 2rem; background: var(--bg-card); border-radius: var(--radius-md); border: 2px solid var(--border-color); box-shadow: var(--shadow-lg); font-family: 'Inter', sans-serif;">
        <!-- Exam Header -->
        <div class="exam-paper-header" style="border-bottom: 3px double var(--border-color); padding-bottom: 1.5rem; margin-bottom: 2rem; text-align: center;">
          <h2 style="font-family: var(--font-title); font-size: 1.6rem; font-weight: 800; margin-bottom: 0.25rem; letter-spacing: 0.02em; color: var(--text-main);">🏆 OFFICIAL PAST PAPER: ${paper.series}</h2>
          <h3 style="font-family: var(--font-title); font-size: 1.25rem; font-weight: 700; color: var(--text-gold); margin-bottom: 0.5rem;">Booklet B4: Early Elizabethan England, 1558–88</h3>
          <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-main); padding: 0.5rem 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.85rem; font-weight: 600;">
            <span style="color: var(--text-muted);">Pearson Edexcel GCSE (9–1)</span>
            <span style="color: var(--accent-indigo);">Total Marks: 32</span>
          </div>
        </div>

        <div style="font-size: 0.9rem; font-style: italic; color: var(--text-muted); margin-bottom: 2rem; padding: 0.75rem; background: rgba(99, 102, 241, 0.05); border-left: 3px solid var(--primary); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; line-height: 1.5;">
          <strong>Answer three questions:</strong> Question 1(a), Question 1(b), Question 2 and EITHER Question 3 OR Question 4.
        </div>

        <!-- QUESTION 1(a) -->
        <div class="mock-question-section" style="margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 1px solid var(--border-color);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
            <h4 style="font-family: var(--font-title); font-size: 1.15rem; font-weight: 700; margin: 0; color: var(--primary);">Question 1(a)</h4>
            <span style="font-size: 0.8rem; background: var(--primary); padding: 0.15rem 0.4rem; border-radius: 3px; font-weight: bold; color: white;">2 Marks</span>
          </div>
          <p style="font-size: 1.05rem; font-weight: 600; line-height: 1.5; margin-bottom: 0.75rem; color: var(--text-main);">${getCleanQuestionText(paper.q1a.text)}</p>
          
          <div style="margin-top: 0.75rem; margin-bottom: 1rem;">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
              <button class="btn" id="hintBtn-${q1aId || 'pp-q1a'}" onclick="toggleMockExamHint('${q1aId || 'pp-q1a'}')" style="font-size: 0.75rem; padding: 0.35rem 0.7rem;">💨 Send up a Smoke Signal</button>
              ${q1aId ? `<button class="btn btn-secondary" id="modelAnswerBtn-${q1aId}" onclick="toggleMockExamModelAnswer('${q1aId}', 'describe')" style="font-size: 0.75rem; padding: 0.35rem 0.7rem; background: var(--bg-surface); border: 1px solid var(--border-color); color: var(--text-main);">📖 View Model Answer</button>` : ''}
            </div>
            <div id="hintBox-${q1aId || 'pp-q1a'}" style="display: none; margin-top: 0.75rem; font-size: 0.85rem; color: var(--text-muted); background: rgba(234, 179, 8, 0.05); padding: 0.5rem 0.75rem; border-left: 2px solid var(--text-gold); border-radius: 0 4px 4px 0; margin-bottom: 0.5rem;">
              <strong>Key Factual Hints:</strong><br>${(examQuestionFacts[q1aId] || "State a key feature and support with specific detail/evidence.").replace(/\n/g, "<br>")}
            </div>
            ${q1aId ? `<div id="modelAnswerBox-${q1aId}" style="display: none; margin-top: 0.75rem; font-size: 0.9rem; color: var(--text-main); background: rgba(16, 185, 129, 0.05); padding: 1rem; border-left: 3px solid #10b981; border-radius: 0 4px 4px 0; line-height: 1.6;"></div>` : ''}
          </div>
        </div>

        <!-- QUESTION 1(b) -->
        <div class="mock-question-section" style="margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 1px solid var(--border-color);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
            <h4 style="font-family: var(--font-title); font-size: 1.15rem; font-weight: 700; margin: 0; color: var(--primary);">Question 1(b)</h4>
            <span style="font-size: 0.8rem; background: var(--primary); padding: 0.15rem 0.4rem; border-radius: 3px; font-weight: bold; color: white;">2 Marks</span>
          </div>
          <p style="font-size: 1.05rem; font-weight: 600; line-height: 1.5; margin-bottom: 0.75rem; color: var(--text-main);">${getCleanQuestionText(paper.q1b.text)}</p>
          
          <div style="margin-top: 0.75rem; margin-bottom: 1rem;">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
              <button class="btn" id="hintBtn-${q1bId || 'pp-q1b'}" onclick="toggleMockExamHint('${q1bId || 'pp-q1b'}')" style="font-size: 0.75rem; padding: 0.35rem 0.7rem;">💨 Send up a Smoke Signal</button>
              ${q1bId ? `<button class="btn btn-secondary" id="modelAnswerBtn-${q1bId}" onclick="toggleMockExamModelAnswer('${q1bId}', 'describe')" style="font-size: 0.75rem; padding: 0.35rem 0.7rem; background: var(--bg-surface); border: 1px solid var(--border-color); color: var(--text-main);">📖 View Model Answer</button>` : ''}
            </div>
            <div id="hintBox-${q1bId || 'pp-q1b'}" style="display: none; margin-top: 0.75rem; font-size: 0.85rem; color: var(--text-muted); background: rgba(234, 179, 8, 0.05); padding: 0.5rem 0.75rem; border-left: 2px solid var(--text-gold); border-radius: 0 4px 4px 0; margin-bottom: 0.5rem;">
              <strong>Key Factual Hints:</strong><br>${(examQuestionFacts[q1bId] || "State a key feature and support with specific detail/evidence.").replace(/\n/g, "<br>")}
            </div>
            ${q1bId ? `<div id="modelAnswerBox-${q1bId}" style="display: none; margin-top: 0.75rem; font-size: 0.9rem; color: var(--text-main); background: rgba(16, 185, 129, 0.05); padding: 1rem; border-left: 3px solid #10b981; border-radius: 0 4px 4px 0; line-height: 1.6;"></div>` : ''}
          </div>
        </div>

        <!-- QUESTION 2 -->
        <div class="mock-question-section" style="margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 1px solid var(--border-color);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
            <h4 style="font-family: var(--font-title); font-size: 1.15rem; font-weight: 700; margin: 0; color: var(--primary);">Question 2</h4>
            <span style="font-size: 0.8rem; background: var(--primary); padding: 0.15rem 0.4rem; border-radius: 3px; font-weight: bold; color: white;">12 Marks</span>
          </div>
          <p style="font-size: 1.05rem; font-weight: 600; line-height: 1.5; margin-bottom: 0.75rem; color: var(--text-main);">${getCleanQuestionText(paper.q2.text)}</p>
          
          <div style="background: var(--bg-main); padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm); margin-bottom: 1rem;">
            <span style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-gold); font-weight: 700; display: block; margin-bottom: 0.5rem;">You may use the following in your answer:</span>
            <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.95rem; line-height: 1.6; color: var(--text-main);">
              ${formatPrompts(paper.q2.text)}
            </ul>
            <span style="font-size: 0.9rem; font-style: italic; color: var(--text-muted); display: block; margin-top: 0.5rem;">You must also use information of your own.</span>
          </div>

          <div style="margin-top: 0.75rem; margin-bottom: 1rem;">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
              <button class="btn" id="hintBtn-${q2Id || 'pp-q2'}" onclick="toggleMockExamHint('${q2Id || 'pp-q2'}')" style="font-size: 0.75rem; padding: 0.35rem 0.7rem;">💨 Send up a Smoke Signal</button>
              ${q2Id ? `<button class="btn btn-secondary" id="modelAnswerBtn-${q2Id}" onclick="toggleMockExamModelAnswer('${q2Id}', 'explain')" style="font-size: 0.75rem; padding: 0.35rem 0.7rem; background: var(--bg-surface); border: 1px solid var(--border-color); color: var(--text-main);">📖 View Model Answer</button>` : ''}
            </div>
            <div id="hintBox-${q2Id || 'pp-q2'}" style="display: none; margin-top: 0.75rem; font-size: 0.85rem; color: var(--text-muted); background: rgba(234, 179, 8, 0.05); padding: 0.5rem 0.75rem; border-left: 2px solid var(--text-gold); border-radius: 0 4px 4px 0; margin-bottom: 0.5rem;">
              <strong>Key Factual Hints:</strong><br>${(examQuestionFacts[q2Id] || "PEEL structured points: write three paragraphs (two matching the prompts, one of your own knowledge).").replace(/\n/g, "<br>")}
            </div>
            ${q2Id ? `<div id="modelAnswerBox-${q2Id}" style="display: none; margin-top: 0.75rem; font-size: 0.9rem; color: var(--text-main); background: rgba(16, 185, 129, 0.05); padding: 1rem; border-left: 3px solid #10b981; border-radius: 0 4px 4px 0; line-height: 1.6;"></div>` : ''}
          </div>
        </div>

        <!-- CHOICE DIVIDER -->
        <div style="text-align: center; margin: 3rem 0; padding: 1.25rem; border: 2px dashed rgba(16, 185, 129, 0.3); background: rgba(16, 185, 129, 0.03); border-radius: var(--radius-sm);">
          <span style="font-family: var(--font-title); font-size: 1rem; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.25rem;">Answer EITHER Question 3 OR Question 4</span>
          <span style="font-size: 0.85rem; color: var(--text-muted); font-style: italic;">Indicate which question you are answering by marking a cross in the box.</span>
        </div>

        <!-- QUESTION 3 -->
        <div class="mock-question-section" style="margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 1px solid var(--border-color);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
            <h4 style="font-family: var(--font-title); font-size: 1.15rem; font-weight: 700; margin: 0; color: var(--primary);">Question 3</h4>
            <span style="font-size: 0.8rem; background: var(--primary); padding: 0.15rem 0.4rem; border-radius: 3px; font-weight: bold; color: white;">16 Marks</span>
          </div>
          <p style="font-size: 1.05rem; font-weight: 600; line-height: 1.5; margin-bottom: 0.75rem; color: var(--text-main);">${getCleanQuestionText(paper.q3.text)}</p>
          
          <div style="background: var(--bg-main); padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm); margin-bottom: 1rem;">
            <span style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-gold); font-weight: 700; display: block; margin-bottom: 0.5rem;">You may use the following in your answer:</span>
            <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.95rem; line-height: 1.6; color: var(--text-main);">
              ${formatPrompts(paper.q3.text)}
            </ul>
            <span style="font-size: 0.9rem; font-style: italic; color: var(--text-muted); display: block; margin-top: 0.5rem;">You must also use information of your own.</span>
          </div>

          <div style="margin-top: 0.75rem; margin-bottom: 1rem;">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
              <button class="btn" id="hintBtn-${q3Id || 'pp-q3'}" onclick="toggleMockExamHint('${q3Id || 'pp-q3'}')" style="font-size: 0.75rem; padding: 0.35rem 0.7rem;">💨 Send up a Smoke Signal</button>
              ${q3Id ? `<button class="btn btn-secondary" id="modelAnswerBtn-${q3Id}" onclick="toggleMockExamModelAnswer('${q3Id}', 'essay')" style="font-size: 0.75rem; padding: 0.35rem 0.7rem; background: var(--bg-surface); border: 1px solid var(--border-color); color: var(--text-main);">📖 View Model Answer</button>` : ''}
            </div>
            <div id="hintBox-${q3Id || 'pp-q3'}" style="display: none; margin-top: 0.75rem; font-size: 0.85rem; color: var(--text-muted); background: rgba(234, 179, 8, 0.05); padding: 0.5rem 0.75rem; border-left: 2px solid var(--text-gold); border-radius: 0 4px 4px 0; margin-bottom: 0.5rem;">
              <strong>Key Factual Hints:</strong><br>${(examQuestionFacts[q3Id] || "16-mark essay layout: Introduction, Agree paragraph, Disagree paragraph, Own Knowledge, and Conclusion.").replace(/\n/g, "<br>")}
            </div>
            ${q3Id ? `<div id="modelAnswerBox-${q3Id}" style="display: none; margin-top: 0.75rem; font-size: 0.9rem; color: var(--text-main); background: rgba(16, 185, 129, 0.05); padding: 1rem; border-left: 3px solid #10b981; border-radius: 0 4px 4px 0; line-height: 1.6;"></div>` : ''}
          </div>
        </div>

        <!-- QUESTION 4 -->
        <div class="mock-question-section" style="margin-bottom: 2.5rem; padding-bottom: 2rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
            <h4 style="font-family: var(--font-title); font-size: 1.15rem; font-weight: 700; margin: 0; color: var(--primary);">Question 4</h4>
            <span style="font-size: 0.8rem; background: var(--primary); padding: 0.15rem 0.4rem; border-radius: 3px; font-weight: bold; color: white;">16 Marks</span>
          </div>
          <p style="font-size: 1.05rem; font-weight: 600; line-height: 1.5; margin-bottom: 0.75rem; color: var(--text-main);">${getCleanQuestionText(paper.q4.text)}</p>
          
          <div style="background: var(--bg-main); padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm); margin-bottom: 1rem;">
            <span style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-gold); font-weight: 700; display: block; margin-bottom: 0.5rem;">You may use the following in your answer:</span>
            <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.95rem; line-height: 1.6; color: var(--text-main);">
              ${formatPrompts(paper.q4.text)}
            </ul>
            <span style="font-size: 0.9rem; font-style: italic; color: var(--text-muted); display: block; margin-top: 0.5rem;">You must also use information of your own.</span>
          </div>

          <div style="margin-top: 0.75rem; margin-bottom: 1rem;">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
              <button class="btn" id="hintBtn-${q4Id || 'pp-q4'}" onclick="toggleMockExamHint('${q4Id || 'pp-q4'}')" style="font-size: 0.75rem; padding: 0.35rem 0.7rem;">💨 Send up a Smoke Signal</button>
              ${q4Id ? `<button class="btn btn-secondary" id="modelAnswerBtn-${q4Id}" onclick="toggleMockExamModelAnswer('${q4Id}', 'essay')" style="font-size: 0.75rem; padding: 0.35rem 0.7rem; background: var(--bg-surface); border: 1px solid var(--border-color); color: var(--text-main);">📖 View Model Answer</button>` : ''}
            </div>
            <div id="hintBox-${q4Id || 'pp-q4'}" style="display: none; margin-top: 0.75rem; font-size: 0.85rem; color: var(--text-muted); background: rgba(234, 179, 8, 0.05); padding: 0.5rem 0.75rem; border-left: 2px solid var(--text-gold); border-radius: 0 4px 4px 0; margin-bottom: 0.5rem;">
              <strong>Key Factual Hints:</strong><br>${(examQuestionFacts[q4Id] || "16-mark essay layout: Introduction, Agree paragraph, Disagree paragraph, Own Knowledge, and Conclusion.").replace(/\n/g, "<br>")}
            </div>
            ${q4Id ? `<div id="modelAnswerBox-${q4Id}" style="display: none; margin-top: 0.75rem; font-size: 0.9rem; color: var(--text-main); background: rgba(16, 185, 129, 0.05); padding: 1rem; border-left: 3px solid #10b981; border-radius: 0 4px 4px 0; line-height: 1.6;"></div>` : ''}
          </div>
        </div>

        <!-- Footer Control -->
        <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
          <button class="btn btn-primary" onclick="clearActivePastPaper()" style="font-size: 1rem; padding: 0.6rem 1.25rem;">
            🔄 Take a Different Past Paper
          </button>
        </div>
      </div>
    `;
    return;
  }

  const list = examData[qType];
  const selectedIdx = appState.selectedIndexes[qType] || 0;
  const question = list[selectedIdx] || list[0];

  if (!question) {
    examWorkspace.innerHTML = `<p>No practice questions available for this type.</p>`;
    return;
  }

  // Ensure draft memory is initialized for this unique question ID
  if (!appState.userDrafts[question.id]) {
    if (qType === "describe") {
      appState.userDrafts[question.id] = { feature: "", detail: "" };
    } else if (qType === "explain") {
      appState.userDrafts[question.id] = { answer: "" };
    } else if (qType === "essay") {
      appState.userDrafts[question.id] = { answer: "" };
    }
  }

  const currentDraft = appState.userDrafts[question.id];
  if (qType === "essay" && (!currentDraft || currentDraft.answer === undefined)) {
    appState.userDrafts[question.id] = { answer: "" };
  }
  const currentDraftClean = appState.userDrafts[question.id];

  // Question Selector Dropdown HTML
  let selectorHTML = `
    <div class="scaffold-group">
      <label for="questionSelector" style="font-weight: 700; color: var(--primary);">Choose a Practice Question (${list.length} available):</label>
      <select id="questionSelector" class="text-input" style="font-family: var(--font-title); font-weight: 600; margin-bottom: 1.5rem; border-color: rgba(99, 102, 241, 0.4);">
        ${list.map((q, idx) => `<option value="${idx}" ${idx === selectedIdx ? 'selected' : ''}>Q${idx + 1}: [${q.topic || 'Spec'}] ${q.question}</option>`).join('')}
      </select>
    </div>
  `;

  // Workspace sub-tabs (Your Answer, Model Answer, Rubric)
  let workspaceTabHeaders = `
    <div class="practice-tabs">
      <button class="practice-tab ${appState.activePracticePanel === 'workspace' ? 'active' : ''}" data-panel="workspace">Your Answer</button>
      <button class="practice-tab ${appState.activePracticePanel === 'model' ? 'active' : ''}" data-panel="model">Model Answer</button>
      <button class="practice-tab ${appState.activePracticePanel === 'rubric' ? 'active' : ''}" data-panel="rubric">Self-Assessment</button>
    </div>
  `;

  let workspaceContent = "";

  if (qType === "describe") {
    workspaceContent = `
      <div class="workspace-panel ${appState.activePracticePanel === 'workspace' ? 'active' : ''}" id="panel-workspace">
        <div class="exam-q-box">
          <h4>${question.question}</h4>
          <span style="font-size: 0.8rem; background: var(--primary); padding: 0.15rem 0.4rem; border-radius: 3px; font-weight: bold; color: white;">2 Marks</span>
          <div style="margin-top: 0.75rem;">
            <button class="btn" id="hintToggleBtn" onclick="toggleExamHint()" style="font-size: 0.75rem; padding: 0.35rem 0.7rem;">💨 Send up a Smoke Signal</button>
            <div id="examHintBox" style="display: none; margin-top: 0.75rem; font-size: 0.85rem; color: var(--text-muted); font-style: normal; background: rgba(234, 179, 8, 0.05); padding: 0.5rem 0.75rem; border-left: 2px solid var(--text-gold); border-radius: 0 4px 4px 0;">
              <strong>Key Factual Hints:</strong><br>${(examQuestionFacts[question.id] || question.clue || "").replace(/\n/g, "<br>")}
            </div>
          </div>
        </div>
        <div class="scaffold-group">
          <label>1. Feature Statement (1 Mark)</label>
          <input type="text" class="text-input" id="desc-stmt" placeholder="State one feature clearly (e.g., 'One key feature of the Act was...')" value="${currentDraft.feature}">
        </div>
        <div class="scaffold-group">
          <label>2. Supporting Detail / Evidence (1 Mark)</label>
          <textarea class="text-area" id="desc-detail" placeholder="Provide supporting historical detail/stats...">${currentDraft.detail}</textarea>
        </div>
        <div style="margin-top: 1rem; display: flex; justify-content: flex-end;">
          <button class="btn" onclick="window.copyToClipboard('', 'Feature: ' + document.getElementById('desc-stmt').value + '\nDetail: ' + document.getElementById('desc-detail').value)" style="font-size: 0.8rem; padding: 0.4rem 0.8rem; display: flex; align-items: center; gap: 0.4rem;">
            📋 Copy to Clipboard
          </button>
        </div>
      </div>

      <div class="workspace-panel ${appState.activePracticePanel === 'model' ? 'active' : ''}" id="panel-model">
        ${renderGradeComparison(question, qType)}
      </div>

      <div class="workspace-panel ${appState.activePracticePanel === 'rubric' ? 'active' : ''}" id="panel-rubric">
        <h4>Self-Assessment Rubric (2 Marks Total)</h4>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">Tick off items to self-assess your draft response:</p>
        <div class="rubric-checklist">
          <label class="rubric-item">
            <input type="checkbox" id="chk-desc-1">
            <div class="rubric-item-text">
              <h5>Feature Statement (1 Mark)</h5>
              <p>Stated a valid, distinct historical feature directly answering the question.</p>
              <div class="reflective-prompt" style="font-size: 0.78rem; font-style: italic; color: var(--text-gold); margin-top: 0.3rem; border-left: 2px solid var(--text-gold); padding-left: 0.4rem;">
                🤔 Reflective Check: Does this statement identify a specific, clear fact/concept (e.g. 'the Privy Council') rather than a broad generalization?
              </div>
            </div>
          </label>
          <label class="rubric-item">
            <input type="checkbox" id="chk-desc-2">
            <div class="rubric-item-text">
              <h5>Supporting Detail / Evidence (1 Mark)</h5>
              <p>Elaborated with accurate supporting historical detail (e.g. details, names, stats).</p>
              <div class="reflective-prompt" style="font-size: 0.78rem; font-style: italic; color: var(--text-gold); margin-top: 0.3rem; border-left: 2px solid var(--text-gold); padding-left: 0.4rem;">
                🤔 Reflective Check: Have you named at least one specific historical figure, statistic, or date (e.g. 'William Cecil' or '19 men')?
              </div>
            </div>
          </label>
        </div>
        <div style="margin-top: 1.5rem; font-weight: bold; font-family: var(--font-title); font-size: 1.1rem;" id="rubricScoreDisplay">
          Estimated Score: 0/2 Marks
        </div>
      </div>
    `;
  } else if (qType === "explain") {
    workspaceContent = `
      <div class="workspace-panel ${appState.activePracticePanel === 'workspace' ? 'active' : ''}" id="panel-workspace">
        <div class="exam-q-box">
          <h4>${question.question}</h4>
          <span style="font-size: 0.8rem; background: var(--primary); padding: 0.15rem 0.4rem; border-radius: 3px; font-weight: bold; color: white;">12 Marks</span>
          <div class="stimulus-container">
            <span style="font-size: 0.8rem; color: var(--text-muted); align-self: center;">Stimulus points:</span>
            ${question.prompts.map(p => `<span class="stimulus-item">${p}</span>`).join('')}
            <span class="stimulus-item" style="border-style: dashed; color: var(--text-gold);">+ Your own knowledge</span>
          </div>
          <div style="margin-top: 0.75rem;">
            <button class="btn" id="hintToggleBtn" onclick="toggleExamHint()" style="font-size: 0.75rem; padding: 0.35rem 0.7rem;">💨 Send up a Smoke Signal</button>
            <div id="examHintBox" style="display: none; margin-top: 0.75rem; font-size: 0.85rem; color: var(--text-muted); font-style: normal; background: rgba(234, 179, 8, 0.05); padding: 0.5rem 0.75rem; border-left: 2px solid var(--text-gold); border-radius: 0 4px 4px 0;">
              <strong>Key Factual Hints:</strong><br>${(examQuestionFacts[question.id] || "").replace(/\n/g, "<br>")}
            </div>
          </div>
        </div>

        <div class="explain-split-layout" style="display: grid; grid-template-columns: 260px 1fr; gap: 1.5rem; margin-top: 1rem;">
          <!-- Left Column: Paragraph Structure Guidance -->
          <div class="guidance-panel" style="background: rgba(99, 102, 241, 0.03); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem;">
            <h4 style="font-family: var(--font-title); font-size: 1rem; color: var(--primary); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; margin: 0; font-weight: 800;">📝 Paragraph Guide</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4; margin: 0;">For a <strong>12-Mark "Explain Why"</strong> question, structure your essay into <strong>3 PEEL paragraphs</strong>:</p>
            
            <div style="display: flex; flex-direction: column; gap: 0.85rem; font-size: 0.8rem; line-height: 1.45;">
              <div>
                <strong style="color: var(--accent-crimson); display: block; font-family: var(--font-title); font-weight: 700;">📍 Point</strong>
                <span style="color: var(--text-muted)">State a clear reason or factor directly answering the question.</span>
              </div>
              <div>
                <strong style="color: var(--accent-gold); display: block; font-family: var(--font-title); font-weight: 700;">📖 Evidence</strong>
                <span style="color: var(--text-muted)">Incorporate specific historical details (dates, names, statistics).</span>
              </div>
              <div>
                <strong style="color: var(--primary); display: block; font-family: var(--font-title); font-weight: 700;">💡 Explanation</strong>
                <span style="color: var(--text-muted)">Explain exactly <em>how</em> or <em>why</em> this factor caused the outcome.</span>
              </div>
              <div>
                <strong style="color: var(--accent-green); display: block; font-family: var(--font-title); font-weight: 700;">🔗 Link</strong>
                <span style="color: var(--text-muted)">Conclude the paragraph by tying the factor back to the main question.</span>
              </div>
            </div>
          </div>

          <!-- Right Column: Single Answer Input Area -->
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <label for="explain-answer-input" style="font-weight: 700; font-family: var(--font-title); color: var(--text-main);">Your Answer Workspace:</label>
            <textarea id="explain-answer-input" class="text-area" style="min-height: 380px; line-height: 1.6; font-family: var(--font-body); font-size: 0.95rem; padding: 1rem; border-radius: var(--radius-md); border-color: rgba(99, 102, 241, 0.3);" placeholder="Write your full 3-paragraph response here...">${currentDraft.answer || ""}</textarea>
            <div style="margin-top: 0.5rem; display: flex; justify-content: flex-end;">
              <button class="btn" onclick="window.copyToClipboard('explain-answer-input')" style="font-size: 0.8rem; padding: 0.4rem 0.8rem; display: flex; align-items: center; gap: 0.4rem;">
                📋 Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="workspace-panel ${appState.activePracticePanel === 'model' ? 'active' : ''}" id="panel-model">
        ${renderGradeComparison(question, qType)}
      </div>

      <div class="workspace-panel ${appState.activePracticePanel === 'rubric' ? 'active' : ''}" id="panel-rubric">
        <h4>Self-Assessment Rubric (12 Marks Total)</h4>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">Tick off items to self-assess your draft response:</p>
        <div class="rubric-checklist">
          <label class="rubric-item">
            <input type="checkbox" id="chk-exp-1">
            <div class="rubric-item-text">
              <h5>Structure (3 Paragraphs)</h5>
              <p>Response is laid out into 3 distinct explanation sections.</p>
              <div class="reflective-prompt" style="font-size: 0.78rem; font-style: italic; color: var(--text-gold); margin-top: 0.3rem; border-left: 2px solid var(--text-gold); padding-left: 0.4rem;">
                🤔 Reflective Check: Have you separated your answer into 3 clear blocks (either paragraphs or clearly demarcated sections)?
              </div>
            </div>
          </label>
          <label class="rubric-item">
            <input type="checkbox" id="chk-exp-2">
            <div class="rubric-item-text">
              <h5>Stimulus &amp; Own Knowledge Integration</h5>
              <p>Addressed the two provided bullet points and brought in a third separate point from own knowledge.</p>
              <div class="reflective-prompt" style="font-size: 0.78rem; font-style: italic; color: var(--text-gold); margin-top: 0.3rem; border-left: 2px solid var(--text-gold); padding-left: 0.4rem;">
                🤔 Reflective Check: Did you include a third factor that is NOT one of the two stimulus points listed in the question?
              </div>
            </div>
          </label>
          <label class="rubric-item">
            <input type="checkbox" id="chk-exp-3">
            <div class="rubric-item-text">
              <h5>AO1: Level 4 Accurate Knowledge Detail</h5>
              <p>Injected specific names (e.g. Dudley, Cecil), dates (1559, 1569), or detailed stats.</p>
              <div class="reflective-prompt" style="font-size: 0.78rem; font-style: italic; color: var(--text-gold); margin-top: 0.3rem; border-left: 2px solid var(--text-gold); padding-left: 0.4rem;">
                🤔 Reflective Check: Look at your text. Can you identify and highlight at least 3 distinct concrete facts (dates, numbers, or proper names)?
              </div>
            </div>
          </label>
          <label class="rubric-item">
            <input type="checkbox" id="chk-exp-4">
            <div class="rubric-item-text">
              <h5>AO2: Analytical Focus ('So What?')</h5>
              <p>Consistently explained why the factors directly led to the event (causation analysis rather than description).</p>
              <div class="reflective-prompt" style="font-size: 0.78rem; font-style: italic; color: var(--text-gold); margin-top: 0.3rem; border-left: 2px solid var(--text-gold); padding-left: 0.4rem;">
                🤔 Reflective Check: Does every paragraph explain exactly *why* this caused the outcome? (Have you used analytical connectives like *'this meant that'*, *'as a result'*, or *'consequently'*?)
              </div>
            </div>
          </label>
        </div>
        <div style="margin-top: 1.5rem; font-weight: bold; font-family: var(--font-title); font-size: 1.1rem;" id="rubricScoreDisplay">
          Estimated Level: Level 1 (1-3 Marks)
        </div>
      </div>
    `;
  } else if (qType === "essay") {
    workspaceContent = `
      <div class="workspace-panel ${appState.activePracticePanel === 'workspace' ? 'active' : ''}" id="panel-workspace">
        <div class="exam-q-box">
          <h4>${question.question}</h4>
          <span style="font-size: 0.8rem; background: var(--primary); padding: 0.15rem 0.4rem; border-radius: 3px; font-weight: bold; color: white;">16 Marks</span>
          <div class="stimulus-container">
            <span style="font-size: 0.8rem; color: var(--text-muted); align-self: center;">Stimulus points:</span>
            ${question.prompts.map(p => `<span class="stimulus-item">${p}</span>`).join('')}
            <span class="stimulus-item" style="border-style: dashed; color: var(--text-gold);">+ Your own knowledge</span>
          </div>
          <div style="margin-top: 0.75rem;">
            <button class="btn" id="hintToggleBtn" onclick="toggleExamHint()" style="font-size: 0.75rem; padding: 0.35rem 0.7rem;">💨 Send up a Smoke Signal</button>
            <div id="examHintBox" style="display: none; margin-top: 0.75rem; font-size: 0.85rem; color: var(--text-muted); font-style: normal; background: rgba(234, 179, 8, 0.05); padding: 0.5rem 0.75rem; border-left: 2px solid var(--text-gold); border-radius: 0 4px 4px 0;">
              <strong>Key Factual Hints:</strong><br>${(examQuestionFacts[question.id] || "").replace(/\n/g, "<br>")}
            </div>
          </div>
        </div>

        <div class="explain-split-layout" style="display: grid; grid-template-columns: 260px 1fr; gap: 1.5rem; margin-top: 1rem;">
          <!-- Left Column: Paragraph Structure Guidance -->
          <div class="guidance-panel" style="background: rgba(99, 102, 241, 0.03); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem;">
            <h4 style="font-family: var(--font-title); font-size: 1rem; color: var(--primary); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; margin: 0; font-weight: 800;">📝 Essay Guide</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4; margin: 0;">For a <strong>16-Mark "How Far Do You Agree"</strong> question, structure your essay into the following paragraphs:</p>
            
            <div style="display: flex; flex-direction: column; gap: 0.85rem; font-size: 0.8rem; line-height: 1.45;">
              <div>
                <strong style="color: var(--accent-indigo); display: block; font-family: var(--font-title); font-weight: 700;">1. Introduction</strong>
                <span style="color: var(--text-muted)">State your thesis immediately and outline the key factors.</span>
              </div>
              <div>
                <strong style="color: var(--accent-crimson); display: block; font-family: var(--font-title); font-weight: 700;">2. Agree Paragraph</strong>
                <span style="color: var(--text-muted)">Write a PEEL paragraph supporting the factor in the statement.</span>
              </div>
              <div>
                <strong style="color: var(--accent-gold); display: block; font-family: var(--font-title); font-weight: 700;">3. Disagree Paragraph</strong>
                <span style="color: var(--text-muted)">Write a PEEL paragraph examining an alternative factor (stimulus 2).</span>
              </div>
              <div>
                <strong style="color: var(--primary); display: block; font-family: var(--font-title); font-weight: 700;">4. Own Knowledge</strong>
                <span style="color: var(--text-muted)">Write a PEEL paragraph introducing a third factor from your own knowledge.</span>
              </div>
              <div>
                <strong style="color: var(--accent-green); display: block; font-family: var(--font-title); font-weight: 700;">5. Conclusion</strong>
                <span style="color: var(--text-muted)">Provide a final judgment, clearly explaining which factor was most important and why.</span>
              </div>
            </div>
          </div>

          <!-- Right Column: Single Answer Input Area -->
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <label for="essay-answer-input" style="font-weight: 700; font-family: var(--font-title); color: var(--text-main);">Your Essay Workspace:</label>
            <textarea id="essay-answer-input" class="text-area" style="min-height: 420px; line-height: 1.6; font-family: var(--font-body); font-size: 0.95rem; padding: 1rem; border-radius: var(--radius-md); border-color: rgba(99, 102, 241, 0.3);" placeholder="Write your full 5-paragraph response here (Introduction, Agree, Disagree, Own Knowledge, Conclusion)...">${currentDraftClean.answer || ""}</textarea>
            <div style="margin-top: 0.5rem; display: flex; justify-content: flex-end;">
              <button class="btn" onclick="window.copyToClipboard('essay-answer-input')" style="font-size: 0.8rem; padding: 0.4rem 0.8rem; display: flex; align-items: center; gap: 0.4rem;">
                📋 Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="workspace-panel ${appState.activePracticePanel === 'model' ? 'active' : ''}" id="panel-model">
        ${renderGradeComparison(question, qType)}
      </div>

      <div class="workspace-panel ${appState.activePracticePanel === 'rubric' ? 'active' : ''}" id="panel-rubric">
        <h4>Self-Assessment Rubric (16 Marks Total)</h4>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">Tick off items to self-assess your draft response:</p>
        <div class="rubric-checklist">
          <label class="rubric-item">
            <input type="checkbox" id="chk-ess-1">
            <div class="rubric-item-text">
              <h5>Covers Both Sides of the Argument</h5>
              <p>Includes points that support the prompt factor (agree) and points showing counter-factors (disagree).</p>
              <div class="reflective-prompt" style="font-size: 0.78rem; font-style: italic; color: var(--text-gold); margin-top: 0.3rem; border-left: 2px solid var(--text-gold); padding-left: 0.4rem;">
                🤔 Reflective Check: Have you written one full paragraph agreeing with the prompt factor, and at least one other paragraph analyzing alternative factors?
              </div>
            </div>
          </label>
          <label class="rubric-item">
            <input type="checkbox" id="chk-ess-2">
            <div class="rubric-item-text">
              <h5>Precise Historical Detail (AO1)</h5>
              <p>Integrates names, dates, or specifications (e.g. Walter Raleigh, chief Wingina, the supply ship Tiger, 1585).</p>
              <div class="reflective-prompt" style="font-size: 0.78rem; font-style: italic; color: var(--text-gold); margin-top: 0.3rem; border-left: 2px solid var(--text-gold); padding-left: 0.4rem;">
                🤔 Reflective Check: Can you spot at least 4-5 precise historical details (e.g., specific treaties, battles, explorers, or acts)?
              </div>
            </div>
          </label>
          <label class="rubric-item">
            <input type="checkbox" id="chk-ess-3">
            <div class="rubric-item-text">
              <h5>Clear Explanations &amp; Linkages (AO2)</h5>
              <p>Analysed how the factors directly caused the failure/success of the event.</p>
              <div class="reflective-prompt" style="font-size: 0.78rem; font-style: italic; color: var(--text-gold); margin-top: 0.3rem; border-left: 2px solid var(--text-gold); padding-left: 0.4rem;">
                🤔 Reflective Check: Have you explicitly linked the end of each paragraph back to the overall judgment? (Avoid just summarizing; focus on relative importance.)
              </div>
            </div>
          </label>
          <label class="rubric-item">
            <input type="checkbox" id="chk-ess-4">
            <div class="rubric-item-text">
              <h5>Reasoned Concluding Judgement</h5>
              <p>Finished with a clear judgement weighing the factors and highlighting which factor is most crucial, going beyond simple summary.</p>
              <div class="reflective-prompt" style="font-size: 0.78rem; font-style: italic; color: var(--text-gold); margin-top: 0.3rem; border-left: 2px solid var(--text-gold); padding-left: 0.4rem;">
                🤔 Reflective Check: Does your conclusion make a clear choice on what was the *most* important factor, and explain *why* it outweighs the others?
              </div>
            </div>
          </label>
        </div>
        <div style="margin-top: 1.5rem; font-weight: bold; font-family: var(--font-title); font-size: 1.1rem;" id="rubricScoreDisplay">
          Estimated Level: Level 1 (1-4 Marks)
        </div>
      </div>
    `;
  }

  // Inject the Selector, Tabs and Content
  examWorkspace.innerHTML = `
    ${selectorHTML}
    ${workspaceTabHeaders}
    ${workspaceContent}
  `;

  // Attach change listener to the dropdown question select element
  const questionSelector = document.getElementById("questionSelector");
  if (questionSelector) {
    questionSelector.addEventListener("change", (e) => {
      appState.selectedIndexes[qType] = parseInt(e.target.value);
      renderExamWorkspace();
    });
  }

  // Attach tab switching events inside workspace
  const practiceTabs = examWorkspace.querySelectorAll(".practice-tab");
  practiceTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      appState.activePracticePanel = tab.getAttribute("data-panel");
      renderExamWorkspace();
    });
  });

  // Attach keypress event tracking to keep draft state
  bindInputStateTracking(qType, question.id);

  // If in rubric panel, attach scoring event tracking
  if (appState.activePracticePanel === "rubric") {
    bindRubricScoring(qType);
  }

  // Bind sub-accordions inside workspace if any exist
  const accordions = examWorkspace.querySelectorAll(".event-summary");
  accordions.forEach(acc => {
    acc.addEventListener("click", () => {
      const parent = acc.closest(".event-item");
      parent.classList.toggle("expanded");
    });
  });
}

function saveUserDrafts() {
  localStorage.setItem("elizabethan_user_drafts", JSON.stringify(appState.userDrafts));
}

function bindInputStateTracking(qType, questionId) {
  const currentDraft = appState.userDrafts[questionId];
  if (!currentDraft) return;

  if (qType === "describe") {
    const featureIn = document.getElementById("desc-stmt");
    const detailIn = document.getElementById("desc-detail");
    if (featureIn && detailIn) {
      featureIn.addEventListener("input", (e) => {
        currentDraft.feature = e.target.value;
        saveUserDrafts();
      });
      detailIn.addEventListener("input", (e) => {
        currentDraft.detail = e.target.value;
        saveUserDrafts();
      });
    }
  } else if (qType === "explain") {
    const answerIn = document.getElementById("explain-answer-input");
    if (answerIn) {
      answerIn.addEventListener("input", (e) => {
        currentDraft.answer = e.target.value;
        saveUserDrafts();
      });
    }
  } else if (qType === "essay") {
    const answerIn = document.getElementById("essay-answer-input");
    if (answerIn) {
      answerIn.addEventListener("input", (e) => {
        const question = examData.essay[appState.selectedIndexes.essay || 0] || examData.essay[0];
        appState.userDrafts[question.id].answer = e.target.value;
        saveUserDrafts();
      });
    }
  }
}

function bindRubricScoring(qType) {
  const display = document.getElementById("rubricScoreDisplay");
  
  if (qType === "describe") {
    const chk1 = document.getElementById("chk-desc-1");
    const chk2 = document.getElementById("chk-desc-2");

    const updateDescribeScore = () => {
      let score = 0;
      if (chk1.checked) score++;
      if (chk2.checked) score++;
      display.textContent = `Estimated Score: ${score}/2 Marks`;
    };

    chk1.addEventListener("change", updateDescribeScore);
    chk2.addEventListener("change", updateDescribeScore);
  } else if (qType === "explain") {
    const chk1 = document.getElementById("chk-exp-1");
    const chk2 = document.getElementById("chk-exp-2");
    const chk3 = document.getElementById("chk-exp-3");
    const chk4 = document.getElementById("chk-exp-4");

    const updateExplainScore = () => {
      let count = 0;
      if (chk1.checked) count++;
      if (chk2.checked) count++;
      if (chk3.checked) count++;
      if (chk4.checked) count++;

      let levelText = "";
      if (count === 0) levelText = "Level 1 (0-3 Marks)";
      else if (count === 1) levelText = "Level 2 (4-6 Marks)";
      else if (count === 2 || count === 3) levelText = "Level 3 (7-9 Marks)";
      else if (count === 4) levelText = "Level 4 (10-12 Marks) - Excellent!";

      display.textContent = `Estimated Level: ${levelText}`;
    };

    chk1.addEventListener("change", updateExplainScore);
    chk2.addEventListener("change", updateExplainScore);
    chk3.addEventListener("change", updateExplainScore);
    chk4.addEventListener("change", updateExplainScore);
  } else if (qType === "essay") {
    const chk1 = document.getElementById("chk-ess-1");
    const chk2 = document.getElementById("chk-ess-2");
    const chk3 = document.getElementById("chk-ess-3");
    const chk4 = document.getElementById("chk-ess-4");

    const updateEssayScore = () => {
      let count = 0;
      if (chk1.checked) count++;
      if (chk2.checked) count++;
      if (chk3.checked) count++;
      if (chk4.checked) count++;

      let levelText = "";
      if (count === 0) levelText = "Level 1 (0-4 Marks)";
      else if (count === 1) levelText = "Level 2 (5-8 Marks)";
      else if (count === 2 || count === 3) levelText = "Level 3 (9-12 Marks)";
      else if (count === 4) levelText = "Level 4 (13-16 Marks) - Grade 9 Standard!";

      display.textContent = `Estimated Level: ${levelText}`;
    };

    chk1.addEventListener("change", updateEssayScore);
    chk2.addEventListener("change", updateEssayScore);
    chk3.addEventListener("change", updateEssayScore);
    chk4.addEventListener("change", updateEssayScore);
  }
}

// 5. Recall Quiz Engine
function setupQuiz() {
  renderQuiz();
}

function renderQuiz() {
  if (!quizAppContainer) return;
  
  const qState = appState.quiz;
  
  if (qState.activeTopicIndex === -1) {
    // Helper function to render a grouped Key Topic container
    const renderTopicGroup = (title, startIndex, endIndex) => {
      let groupData = quizData.slice(startIndex, endIndex + 1);
      let itemsHTML = groupData.map((t, index) => {
        const absoluteIndex = startIndex + index;
        let mastered = 0;
        t.questions.forEach((q, qIdx) => {
          const key = `${absoluteIndex}_${qIdx}`;
          if (qState.masteryStates[key] === 5) {
            mastered++;
          }
        });
        return `
          <button class="exam-nav-btn" style="text-align: left; width: 100%; display: block; margin-bottom: 0.5rem;" onclick="startQuizTopic(${absoluteIndex})">
            <h3 style="color: var(--text-gold); margin-bottom: 0.25rem; font-size: 0.85rem;">${t.section}</h3>
            <p style="font-size: 0.82rem; line-height: 1.4; color: var(--text-main); font-weight: 500;">${t.topic}</p>
            <span style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.25rem; display: block;">
              🏆 ${mastered} / ${t.questions.length} Mastered (Box 5)
            </span>
          </button>
        `;
      }).join('');
      
      return `
        <div class="kt-group-container">
          <h3 style="font-family: var(--font-title); font-size: 1.1rem; color: var(--primary); border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 1rem; text-align: left; font-weight: 800;">
            ${title}
          </h3>
          <div style="display: flex; flex-direction: column; gap: 0.25rem;">
            ${itemsHTML}
          </div>
        </div>
      `;
    };

    let kt1HTML = renderTopicGroup("Key Topic 1: Queen, Government & Religion, 1558–69", 0, 3);
    let kt2HTML = renderTopicGroup("Key Topic 2: Challenges to Elizabeth, 1569–88", 4, 7);
    let kt3HTML = renderTopicGroup("Key Topic 3: Elizabethan Society & Exploration, 1558–88", 8, 11);
    
    quizAppContainer.innerHTML = `
      <div class="quiz-setup-panel">
        <div class="quiz-icon">✨</div>
        <h2 style="font-family: var(--font-title); font-size: 1.8rem; margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem; flex-wrap: wrap;">
          Active Recall Flashcards
          <span style="font-size: 0.7rem; background: rgba(234, 179, 8, 0.1); color: var(--text-gold); border: 1px solid rgba(234, 179, 8, 0.3); padding: 0.2rem 0.5rem; border-radius: var(--radius-sm); font-family: var(--font-body); font-weight: 700;">🛡️ Double-Check MCQ Active</span>
        </h2>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size: 0.95rem; max-width: 700px; margin-left: auto; margin-right: auto;">
          Select a sub-topic from the three Key Topics below to start your active recall session.
        </p>
        <div class="quiz-setup-grid">
          ${kt1HTML}
          ${kt2HTML}
          ${kt3HTML}
        </div>
      </div>
    `;
  } else {
    const topicData = quizData[qState.activeTopicIndex];
    
    if (qState.activeQueue.length > 0) {
      const qData = qState.activeQueue[0];
      
      quizAppContainer.innerHTML = `
        <div class="quiz-container" style="max-width: 600px; margin: 0 auto;">
          <div class="quiz-header" style="display: block; margin-bottom: 1rem;">
            <!-- Progress Bar Info -->
            ${(() => {
              const boxCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
              topicData.questions.forEach((q, idx) => {
                const key = `${qState.activeTopicIndex}_${idx}`;
                const box = qState.masteryStates[key] || 1;
                boxCounts[box]++;
              });
              
              const totalCards = topicData.questions.length;
              const strengthPercent = Math.round(
                ((boxCounts[1] * 0 + boxCounts[2] * 25 + boxCounts[3] * 50 + boxCounts[4] * 75 + boxCounts[5] * 100) / (totalCards * 100)) * 100
              );
              
              return `
                <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); font-weight: bold; margin-bottom: 0.4rem; letter-spacing: 0.05em; display: flex; justify-content: space-between; align-items: center; width: 100%;">
                  <span>Knowledge Strength: ${strengthPercent}%</span>
                  <span>${qState.masteredCount} / ${totalCards} Mastered</span>
                </div>
                <!-- Progress Bar Fill -->
                <div class="progress-bar-container" style="width: 100%; height: 10px; background: rgba(255,255,255,0.08); border-radius: 5px; margin-bottom: 0.75rem; overflow: hidden; border: 1px solid var(--border-color);">
                  <div class="progress-bar-fill" style="width: ${strengthPercent}%; height: 100%; background: linear-gradient(90deg, var(--primary), #10b981); transition: width 0.3s ease;"></div>
                </div>
                
                <!-- Leitner Box Distribution Stats Panel -->
                <div style="display: flex; gap: 0.25rem; width: 100%; font-size: 0.68rem; margin-bottom: 1.25rem; font-weight: bold; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
                  <span style="color: var(--text-muted);">Box 1 (New): ${boxCounts[1]}</span>
                  <span style="color: var(--primary);">Box 2: ${boxCounts[2]}</span>
                  <span style="color: var(--text-gold);">Box 3: ${boxCounts[3]}</span>
                  <span style="color: #6366f1;">Box 4: ${boxCounts[4]}</span>
                  <span style="color: #10b981;">🏆 Box 5: ${boxCounts[5]}</span>
                </div>
              `;
            })()}
            
            <!-- Gamified Stats Row -->
            <div class="quiz-status-row" style="display: flex; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap;">
              <span style="background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.25); padding: 0.35rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.8rem; font-weight: 700; font-family: var(--font-title); display: inline-flex; align-items: center; gap: 0.3rem;">🏆 Mastered: ${qState.masteredCount}/${topicData.questions.length}</span>
              <span style="background: rgba(99, 102, 241, 0.1); color: var(--primary); border: 1px solid rgba(99, 102, 241, 0.25); padding: 0.35rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.8rem; font-weight: 700; font-family: var(--font-title); display: inline-flex; align-items: center; gap: 0.3rem;">✨ XP: ${qState.xp}</span>
              <span style="background: rgba(234, 179, 8, 0.1); color: var(--text-gold); border: 1px solid rgba(234, 179, 8, 0.25); padding: 0.35rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.8rem; font-weight: 700; font-family: var(--font-title); display: inline-flex; align-items: center; gap: 0.3rem;">🔥 Streak: ${qState.streak} (Best: ${qState.bestStreak})</span>
            </div>
          </div>
          
          <h4 style="font-family: var(--font-title); font-size: 0.9rem; color: var(--text-muted); text-align: center; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.05em; border-top: 1px solid var(--border-color); padding-top: 1rem;">
            ${topicData.topic}
          </h4>
          
          <div class="flashcard-wrapper">
            <div class="flashcard ${qState.isFlipped ? 'flipped' : ''}" onclick="flipLeitnerCard()">
              <!-- Front of Flashcard -->
              <div class="card-face card-front">
                <div class="card-question">${qData.question}</div>
                <button class="btn btn-primary" style="margin-top: 1rem; pointer-events: none;">Reveal Answer</button>
                <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 1.5rem;">💡 Click card to flip</p>
              </div>
              <!-- Back of Flashcard -->
              <div class="card-face card-back" onclick="event.stopPropagation();">
                <div class="card-question" style="font-size: 1.1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem; margin-bottom: 1rem; width: 100%;">${qData.question}</div>
                
                ${qState.verificationActive ? `
                  ${!qState.verificationAnswered ? `
                    <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-gold); margin-bottom: 0.75rem; text-align: center; text-transform: uppercase; letter-spacing: 0.05em;">Double Check: Which statement is correct?</div>
                    <div style="display: flex; flex-direction: column; width: 100%; text-align: left; margin-bottom: 0.5rem;">
                      ${qState.verificationOptions.map((opt, index) => `
                        <button class="verification-option-btn" onclick="submitVerificationAnswer(${index})">
                          ${opt.text}
                        </button>
                      `).join('')}
                    </div>
                  ` : `
                    <div style="font-size: 0.95rem; font-weight: 800; text-align: center; margin-bottom: 0.75rem; color: ${qState.verificationCorrect ? '#10b981' : 'var(--accent-crimson)'};">
                      ${qState.verificationCorrect ? '✅ Correct! Answer Verified.' : '❌ Incorrect! Answer Not Verified.'}
                    </div>
                    <div style="display: flex; flex-direction: column; width: 100%; text-align: left; margin-bottom: 1rem;">
                      ${qState.verificationOptions.map((opt, index) => {
                        let extraClass = '';
                        if (opt.isCorrect) {
                          extraClass = 'correct';
                        } else if (index === qState.verificationSelectedIndex) {
                          extraClass = 'incorrect';
                        }
                        return `
                          <button class="verification-option-btn ${extraClass}" disabled>
                            ${opt.text}
                          </button>
                        `;
                      }).join('')}
                    </div>
                    <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: bold; margin-bottom: 0.25rem;">Detailed Answer:</div>
                    <div class="card-answer" style="font-size: 0.9rem; margin-bottom: 1.25rem; border-left: 2px solid var(--border-color); padding-left: 0.5rem; color: var(--text-main); font-weight: 500;">
                      ${qData.answer}
                    </div>
                    <div class="quiz-controls" style="justify-content: center;">
                      <button class="btn btn-primary" onclick="advanceVerification()" style="min-width: 150px; justify-content: center;">
                        Continue ➔
                      </button>
                    </div>
                  `}
                ` : `
                  <div class="card-answer">${qData.answer}</div>
                  
                  <div class="quiz-controls">
                    <button class="btn btn-danger" onclick="assessAnswer(false)">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                      💨 Needs Sweeping
                    </button>
                    <button class="btn btn-success" onclick="assessAnswer(true)">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      🔥 Shovel into the Furnace
                    </button>
                  </div>
                `}
              </div>
            </div>
          </div>

          <!-- Leitner box progress -->
          <div class="leitner-progress" style="display: flex; justify-content: center; align-items: center; gap: 0.35rem; margin-top: 1rem; margin-bottom: 1rem; background: rgba(255,255,255,0.02); padding: 0.6rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); flex-wrap: wrap;">
            <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-right: 0.4rem;">Leitner Box:</span>
            ${[1, 2, 3, 4, 5].map(b => {
              const isActive = b === qData.box;
              const isMastered = b === 5;
              let bg = "rgba(255, 255, 255, 0.05)";
              let border = "1px solid var(--border-color)";
              let color = "var(--text-muted)";
              
              if (isActive) {
                bg = isMastered ? "rgba(16, 185, 129, 0.15)" : "rgba(99, 102, 241, 0.15)";
                border = isMastered ? "1px solid #10b981" : "1px solid var(--primary)";
                color = isMastered ? "#10b981" : "var(--primary)";
              }
              
              return `<span style="background: ${bg}; border: ${border}; color: ${color}; font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: bold; transition: all 0.2s ease;">Box ${b}${isMastered ? ' 🏆' : ''}</span>`;
            }).join('<span style="color: var(--border-color); font-size: 0.8rem;">➔</span>')}
          </div>
          
          <!-- Dynamic Learning Connection Fact -->
          ${(() => {
            if (qData.fact) {
              return `
                <div class="quiz-extra-fact" style="margin-top: 1.5rem; padding: 1rem; background: rgba(99, 102, 241, 0.03); border-left: 4px solid var(--primary); border-radius: var(--radius-md); text-align: left; border: 1px solid var(--border-color); border-left-width: 4px; box-shadow: var(--shadow-lg);">
                  <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-gold); font-weight: bold; margin-bottom: 0.4rem; letter-spacing: 0.05em; display: flex; align-items: center; gap: 0.4rem;">
                    <span>💡 Fact Box</span>
                  </div>
                  <p style="font-size: 0.85rem; line-height: 1.5; color: var(--text-main); margin-bottom: 0; font-weight: 500;">${qData.fact}</p>
                </div>
              `;
            }
            const activeTopicSection = topicData.section; // e.g. "KT 1.1"
            const matchingTimelineCard = timelineData.find(card => card.section === activeTopicSection);
            if (matchingTimelineCard && matchingTimelineCard.events.length > 0) {
              // Rotate facts based on mastered count to keep it dynamic and fresh
              const event = matchingTimelineCard.events[qState.masteredCount % matchingTimelineCard.events.length];
              return `
                <div class="quiz-extra-fact" style="margin-top: 1.5rem; padding: 1rem; background: rgba(99, 102, 241, 0.03); border-left: 4px solid var(--primary); border-radius: var(--radius-md); text-align: left; border: 1px solid var(--border-color); border-left-width: 4px; box-shadow: var(--shadow-lg);">
                  <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-gold); font-weight: bold; margin-bottom: 0.4rem; letter-spacing: 0.05em; display: flex; align-items: center; gap: 0.4rem;">
                    <span>💡 Timeline Connection (${event.dates.join(', ')})</span>
                  </div>
                  <p style="font-size: 0.85rem; line-height: 1.5; color: var(--text-main); margin-bottom: 0.4rem;">${event.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
                  <div style="font-size: 0.8rem; font-style: italic; color: var(--text-muted); border-top: 1px dashed var(--border-color); padding-top: 0.4rem; margin-top: 0.4rem;">
                    <strong>Historical Significance:</strong> ${event.significance}
                  </div>
                </div>
              `;
            }
            return '';
          })()}

          <div style="text-align: right; margin-top: 0.5rem; margin-bottom: 1.5rem;">
            <button class="btn" style="font-size: 0.75rem; padding: 0.25rem 0.6rem; text-decoration: none; display: inline-flex; align-items: center; gap: 0.3rem; border: 1px solid rgba(99, 102, 241, 0.3);" onclick="bridgeQuizToTimeline('${topicData.section}')">
              📖 View ${topicData.section} in Chronological Timeline
            </button>
          </div>
          
          <div style="text-align: center; margin-top: 1rem; display: flex; justify-content: center; gap: 0.5rem; flex-wrap: wrap;">
            <button class="btn" onclick="exitQuiz()" style="font-size: 0.85rem; padding: 0.4rem 0.8rem;">Exit Quiz</button>
            <button class="btn" onclick="resetTopicMastery(${qState.activeTopicIndex})" style="font-size: 0.85rem; padding: 0.4rem 0.8rem; border-color: rgba(239, 68, 68, 0.4); color: var(--accent-crimson);">🧹 Clear the Grate (Reset)</button>
            <button class="btn btn-primary" onclick="skipToResults()" style="font-size: 0.85rem; padding: 0.4rem 0.8rem;">Skip to Results</button>
          </div>
        </div>
      `;
    } else {
      // Quiz Complete - Render a clean, next-step panel
      quizAppContainer.innerHTML = `
        <div class="quiz-result-card" style="text-align: center; padding: 2rem; max-width: 500px; margin: 0 auto;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
          <h2 style="font-family: var(--font-title); font-size: 1.5rem; margin-bottom: 0.5rem; color: #10b981;">Topic Completed!</h2>
          <p class="result-text" style="font-weight: 600; margin-bottom: 1.5rem; color: var(--text-main);">
            Successfully Mastered All ${topicData.questions.length} Recall Cards in ${topicData.section}!
          </p>
          
          <div style="display: flex; flex-direction: column; gap: 0.75rem; max-width: 380px; margin: 0 auto; width: 100%;">
            <button class="btn btn-primary" style="justify-content: center;" onclick="bridgeQuizToPractice('${topicData.section}')">
              📝 Attempt Exam Practice for ${topicData.section}
            </button>
            <button class="btn" style="justify-content: center; border-color: var(--primary); color: var(--primary);" onclick="bridgeQuizToRoulette()">
              🎡 Spin the Exam Roulette Wheel
            </button>
            <button class="btn" style="justify-content: center;" onclick="exitQuiz()">
              🔙 Return to Sub-topics Lobby
            </button>
          </div>
        </div>
      `;
    }
  }
}

window.bridgeQuizToPractice = function(sectionCode) {
  const tab = document.querySelector('.nav-tab[data-target="practiceSection"]');
  if (tab) tab.click();
  
  appState.activeQuestionType = "describe";
  const describeList = examData.describe;
  const idx = describeList.findIndex(q => q.topic.includes(sectionCode));
  if (idx !== -1) {
    appState.selectedIndexes.describe = idx;
  }
  appState.activePracticePanel = "workspace";
  renderExamWorkspace();
};

window.bridgeQuizToRoulette = function() {
  const tab = document.querySelector('.nav-tab[data-target="practiceSection"]');
  if (tab) tab.click();
  appState.activeQuestionType = "wheel";
  renderExamWorkspace();
};

// Global functions attached to window for click triggers
window.startQuizTopic = function(topicIdx) {
  const topicData = quizData[topicIdx];
  const qState = appState.quiz;
  qState.activeTopicIndex = topicIdx;
  qState.currentQuestionIndex = 0;
  qState.score = 0;
  qState.isFlipped = false;
  qState.verificationActive = false;
  qState.verificationOptions = [];
  qState.verificationAnswered = false;
  qState.verificationSelectedIndex = -1;
  qState.verificationCorrect = false;
  
  // Load card states with Leitner boxes (1 to 5)
  let mastered = 0;
  const queue = [];
  topicData.questions.forEach((q, idx) => {
    const key = `${topicIdx}_${idx}`;
    const box = qState.masteryStates[key] || 1;
    if (box === 5) {
      mastered++;
    } else {
      queue.push({
        ...q,
        key: key,
        box: box
      });
    }
  });
  
  // If all cards are already mastered, automatically reset the topic to study again!
  if (queue.length === 0) {
    topicData.questions.forEach((q, idx) => {
      const key = `${topicIdx}_${idx}`;
      qState.masteryStates[key] = 1;
      queue.push({
        ...q,
        key: key,
        box: 1
      });
    });
    localStorage.setItem("elizabethan_mastery_states", JSON.stringify(qState.masteryStates));
    mastered = 0;
  }
  
  qState.masteredCount = mastered;
  qState.activeQueue = queue;
  qState.xp = 0;
  qState.streak = 0;
  qState.bestStreak = 0;
  qState.totalAttempts = 0;
  renderQuiz();
};

window.flipLeitnerCard = function() {
  if (appState.quiz.verificationActive) return;
  appState.quiz.isFlipped = !appState.quiz.isFlipped;
  renderQuiz();
};

window.assessAnswer = function(gotIt) {
  const qState = appState.quiz;
  
  if (qState.activeQueue.length > 0) {
    const currentCard = qState.activeQueue[0];
    
    if (gotIt) {
      // Trigger verification MCQ double check
      generateVerificationOptions(currentCard);
      qState.verificationActive = true;
      renderQuiz();
    } else {
      // Demote immediately on Needs Sweeping
      qState.totalAttempts++;
      qState.streak = 0;
      const prevBox = currentCard.box || 1;
      const nextBox = Math.max(prevBox - 1, 1);
      qState.masteryStates[currentCard.key] = nextBox;
      
      const card = qState.activeQueue.shift();
      card.box = nextBox;
      qState.activeQueue.push(card);
      
      localStorage.setItem("elizabethan_mastery_states", JSON.stringify(qState.masteryStates));
      qState.isFlipped = false;
      setTimeout(() => {
        renderQuiz();
      }, 400);
    }
  }
};

window.generateSmartDistractors = function(correctText, pool, questionText) {
  const correct = correctText.trim();
  const lowerCorrect = correct.toLowerCase();

  // Helper to check if string is Title Case
  function isTitleCase(str) {
    const words = str.split(/\s+/);
    if (words.length === 0 || str === "") return false;
    const lowerConjs = ["of", "the", "in", "and", "to", "for", "a", "an", "but", "or", "by", "from", "on", "with", "at", "de", "von"];
    return words.every((word, idx) => {
      if (word === "") return true;
      const firstChar = word[0];
      if (idx === 0) {
        return firstChar === firstChar.toUpperCase() && /[a-zA-Z]/.test(firstChar);
      }
      if (lowerConjs.includes(word.toLowerCase())) return true;
      return firstChar === firstChar.toUpperCase() && /[a-zA-Z]/.test(firstChar);
    });
  }

  // Helper to count words
  function getWordCount(str) {
    return str.trim().split(/\s+/).filter(w => w.length > 0).length;
  }

  // 1. Year Match (4 digits)
  const yearRegex = /^\d{4}$/;
  if (yearRegex.test(correct)) {
    const yearVal = parseInt(correct, 10);
    let poolYears = pool
      .filter(ans => yearRegex.test(ans))
      .map(ans => parseInt(ans, 10))
      .filter(y => y !== yearVal);
    poolYears = Array.from(new Set(poolYears));
    if (poolYears.length >= 3) {
      poolYears.sort((a, b) => Math.abs(a - yearVal) - Math.abs(b - yearVal));
      const topClosest = poolYears.slice(0, 8);
      const chosen = topClosest.sort(() => Math.random() - 0.5).slice(0, 3);
      return chosen.map(y => String(y));
    } else {
      const generated = new Set();
      const offsets = [-1, 1, -2, 2, -3, 3, -4, 4, -5, 5, -10, 10, -15, 15];
      const shuffledOffsets = offsets.sort(() => Math.random() - 0.5);
      for (let offset of shuffledOffsets) {
        const generatedYear = yearVal + offset;
        if (generatedYear !== yearVal && generatedYear > 0) {
          generated.add(String(generatedYear));
          if (generated.size === 3) break;
        }
      }
      while (generated.size < 3) {
        generated.add(String(yearVal + Math.floor(Math.random() * 20) - 10));
      }
      return Array.from(generated);
    }
  }

  // 2. Percentage Match (e.g. 58%)
  const pctRegex = /^(\d+(?:\.\d+)?)\s*%$/;
  if (pctRegex.test(correct)) {
    const match = correct.match(pctRegex);
    const val = parseFloat(match[1]);
    let poolPcts = pool
      .filter(ans => pctRegex.test(ans))
      .map(ans => {
        const m = ans.match(pctRegex);
        return { original: ans, value: parseFloat(m[1]) };
      })
      .filter(item => item.value !== val);
    
    const seenVals = new Set();
    const uniquePoolPcts = [];
    for (let item of poolPcts) {
      if (!seenVals.has(item.value)) {
        seenVals.add(item.value);
        uniquePoolPcts.push(item);
      }
    }

    if (uniquePoolPcts.length >= 3) {
      uniquePoolPcts.sort((a, b) => Math.abs(a.value - val) - Math.abs(b.value - val));
      const topClosest = uniquePoolPcts.slice(0, 8);
      const chosen = topClosest.sort(() => Math.random() - 0.5).slice(0, 3);
      return chosen.map(item => item.original);
    } else {
      const generated = new Set();
      const isInteger = !correct.includes('.');
      const hasSpace = correct.includes(' ');
      const pctChar = hasSpace ? ' %' : '%';
      
      const offsets = [-5, 5, -10, 10, -15, 15, -20, 20, -25, 25, -30, 30];
      const shuffledOffsets = offsets.sort(() => Math.random() - 0.5);
      for (let offset of shuffledOffsets) {
        let generatedVal = val + offset;
        if (generatedVal > 0 && generatedVal <= 100 && generatedVal !== val) {
          const formatted = isInteger ? Math.round(generatedVal) : generatedVal.toFixed(1);
          generated.add(formatted + pctChar);
          if (generated.size === 3) break;
        }
      }
      while (generated.size < 3) {
        let generatedVal = Math.max(1, Math.min(100, Math.round(val + Math.random() * 30 - 15)));
        if (generatedVal !== val) {
          generated.add(generatedVal + pctChar);
        }
      }
      return Array.from(generated);
    }
  }

  // 3. Simple digits / numeric with optional comma / currency symbol (e.g. 58,000)
  const numberRegex = /^[£$]?\d{1,3}(?:,\d{3})+(?:\s*[a-zA-Z]+)?$/;
  const rawDigitsRegex = /^\d+$/;
  
  function cleanNumber(str) {
    const match = str.replace(/[£$,]/g, '').match(/\d+(?:\.\d+)?/);
    return match ? parseFloat(match[0]) : null;
  }

  const isRawDigits = rawDigitsRegex.test(correct);
  const isFormattedNumber = numberRegex.test(correct);

  if (isRawDigits || isFormattedNumber) {
    const val = cleanNumber(correct);
    if (val !== null && val !== 0) {
      let poolNums = pool
        .filter(ans => {
          const v = cleanNumber(ans);
          return v !== null && v !== val && (rawDigitsRegex.test(ans) || numberRegex.test(ans));
        })
        .map(ans => ({ original: ans, value: cleanNumber(ans) }));
      
      const seenVals = new Set();
      const uniquePoolNums = [];
      for (let item of poolNums) {
        if (!seenVals.has(item.value)) {
          seenVals.add(item.value);
          uniquePoolNums.push(item);
        }
      }

      if (uniquePoolNums.length >= 3) {
        uniquePoolNums.sort((a, b) => Math.abs(a.value - val) - Math.abs(b.value - val));
        const topClosest = uniquePoolNums.slice(0, 8);
        const chosen = topClosest.sort(() => Math.random() - 0.5).slice(0, 3);
        return chosen.map(item => item.original);
      } else {
        const generated = new Set();
        const hasComma = correct.includes(',');
        const prefix = correct.startsWith('$') ? '$' : (correct.startsWith('£') ? '£' : '');
        const suffixMatch = correct.match(/\s*[a-zA-Z]+$/);
        const suffix = suffixMatch ? suffixMatch[0] : '';
        
        const multipliers = [0.5, 0.8, 1.2, 1.5, 0.7, 1.3, 0.9, 1.1, 2];
        const shuffledMults = multipliers.sort(() => Math.random() - 0.5);
        for (let mult of shuffledMults) {
          let genVal = Math.round(val * mult);
          if (genVal === val || genVal <= 0) continue;
          
          let formatted = String(genVal);
          if (hasComma) {
            formatted = genVal.toLocaleString('en-US');
          }
          generated.add(prefix + formatted + suffix);
          if (generated.size === 3) break;
        }
        while (generated.size < 3) {
          let genVal = Math.round(val * (0.5 + Math.random()));
          if (genVal !== val && genVal > 0) {
            let formatted = String(genVal);
            if (hasComma) {
              formatted = genVal.toLocaleString('en-US');
            }
            generated.add(prefix + formatted + suffix);
          }
        }
        return Array.from(generated);
      }
    }
  }

  // 4. Month-Year Date
  const monthYearRegex = /^(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{4}$/i;
  if (monthYearRegex.test(correct)) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let poolDates = pool.filter(ans => monthYearRegex.test(ans) && ans.toLowerCase() !== lowerCorrect);
    poolDates = Array.from(new Set(poolDates));
    if (poolDates.length >= 3) {
      const shuffled = poolDates.sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 3);
    } else {
      const parts = correct.split(/\s+/);
      const yearPart = parseInt(parts[1], 10);
      const generated = new Set();
      
      const offsets = [-1, 1, -2, 2, 0];
      const shuffledOffsets = offsets.sort(() => Math.random() - 0.5);
      for (let offset of shuffledOffsets) {
        const randomMonth = months[Math.floor(Math.random() * months.length)];
        const genYear = yearPart + offset;
        const formatted = randomMonth + " " + genYear;
        if (formatted.toLowerCase() !== lowerCorrect) {
          generated.add(formatted);
          if (generated.size === 3) break;
        }
      }
      while (generated.size < 3) {
        const randomMonth = months[Math.floor(Math.random() * months.length)];
        const genYear = yearPart + Math.floor(Math.random() * 5) - 2;
        const formatted = randomMonth + " " + genYear;
        if (formatted.toLowerCase() !== lowerCorrect) {
          generated.add(formatted);
        }
      }
      return Array.from(generated);
    }
  }

  // 5. Acronym Match (2 to 6 capital letters / digits)
  const acronymRegex = /^[A-Z0-9]{2,6}$/;
  if (acronymRegex.test(correct)) {
    let poolAcronyms = pool.filter(ans => acronymRegex.test(ans) && ans !== correct);
    poolAcronyms = Array.from(new Set(poolAcronyms));
    if (poolAcronyms.length >= 3) {
      return poolAcronyms.sort(() => Math.random() - 0.5).slice(0, 3);
    }
  }

  // 6. Proper Nouns / Title Case vs Lowercase / Scoring system
  const isCorrectTitleCase = isTitleCase(correct);
  const correctWordCount = getWordCount(correct);
  const uniquePool = Array.from(new Set(pool.filter(ans => ans.toLowerCase() !== lowerCorrect)));
  
  const scoredPool = uniquePool.map(ans => {
    let score = 0;
    const wordCount = getWordCount(ans);
    const isAnsTitleCase = isTitleCase(ans);
    
    if (isCorrectTitleCase === isAnsTitleCase) {
      score += 8;
    }
    if (correctWordCount === wordCount) {
      score += 10;
    } else if (Math.abs(correctWordCount - wordCount) === 1) {
      score += 5;
    }
    const lenDiff = Math.abs(correct.length - ans.length);
    if (lenDiff <= 5) {
      score += 4;
    } else if (lenDiff <= 10) {
      score += 2;
    }

    const personKeywords = ["who", "president", "leader", "general", "secretary", "advisor", "minister", "commander", "governor", "queen", "king", "earl", "duke"];
    const qTextLower = (questionText || "").toLowerCase();
    const hasPersonKeyword = personKeywords.some(kw => qTextLower.includes(kw));
    
    if (hasPersonKeyword && isCorrectTitleCase && isAnsTitleCase) {
      if (wordCount === 2 || wordCount === 3) {
        score += 5;
      }
    }
    return { original: ans, score: score };
  });

  scoredPool.sort((a, b) => b.score - a.score);
  const maxScore = scoredPool.length > 0 ? scoredPool[0].score : 0;
  const highQualityCandidates = scoredPool.filter(item => item.score >= Math.max(maxScore - 6, 0));
  
  if (highQualityCandidates.length >= 3) {
    const chosen = highQualityCandidates.sort(() => Math.random() - 0.5).slice(0, 3);
    return chosen.map(item => item.original);
  } else {
    const top3 = scoredPool.slice(0, 3);
    if (top3.length === 3) {
      return top3.map(item => item.original);
    } else {
      const distractors = [];
      const shuffledUnique = uniquePool.sort(() => Math.random() - 0.5);
      for (let ans of shuffledUnique) {
        distractors.push(ans);
        if (distractors.length === 3) break;
      }
      let idx = 1;
      while (distractors.length < 3) {
        distractors.push("Alternative Option " + idx++);
      }
      return distractors;
    }
  }
};

window.generateVerificationOptions = function(currentCard) {
  const qState = appState.quiz;
  const correctText = currentCard.answer;
  
  let distractors = [];
  if (currentCard.distractors && Array.isArray(currentCard.distractors) && currentCard.distractors.length === 3) {
    distractors = currentCard.distractors;
  } else {
    // Gather all potential distractors from quizData
    let allAnswers = [];
    quizData.forEach(topic => {
      topic.questions.forEach(q => {
        if (q.answer && q.answer.trim() !== correctText.trim()) {
          allAnswers.push(q.answer);
        }
      });
    });
    
    // Keep unique answers
    allAnswers = [...new Set(allAnswers)];
    distractors = window.generateSmartDistractors(correctText, allAnswers, currentCard.question);
  }
  
  // Assemble the 4 options
  const options = [
    { text: correctText, isCorrect: true },
    ...distractors.map(text => ({ text: text, isCorrect: false }))
  ];
  
  // Shuffle options array using Fisher-Yates
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  
  qState.verificationOptions = options;
  qState.verificationAnswered = false;
  qState.verificationSelectedIndex = -1;
  qState.verificationCorrect = false;
};

window.submitVerificationAnswer = function(optionIndex) {
  const qState = appState.quiz;
  if (qState.verificationAnswered) return;
  
  qState.verificationAnswered = true;
  qState.verificationSelectedIndex = optionIndex;
  
  const selectedOption = qState.verificationOptions[optionIndex];
  const isCorrect = selectedOption.isCorrect;
  qState.verificationCorrect = isCorrect;
  
  if (typeof playChronologyFeedbackTone === 'function') {
    playChronologyFeedbackTone(isCorrect);
  }
  
  if (isCorrect) {
    // Show green highlight for visual feedback
    renderQuiz();
    // Auto-advance after 600ms delay so user can hear/see result
    setTimeout(() => {
      advanceVerification();
    }, 600);
  } else {
    // Wrong choice: render review panel with detailed answer and manual Continue button
    renderQuiz();
  }
};

window.advanceVerification = function() {
  const qState = appState.quiz;
  qState.totalAttempts++;
  
  if (qState.activeQueue.length > 0) {
    const currentCard = qState.activeQueue[0];
    const gotIt = qState.verificationCorrect;
    
    if (gotIt) {
      qState.score++;
      const nextBox = Math.min(currentCard.box + 1, 5);
      qState.masteryStates[currentCard.key] = nextBox;
      
      qState.xp += 10 + Math.min(qState.streak, 5) * 2;
      qState.streak++;
      qState.bestStreak = Math.max(qState.bestStreak, qState.streak);
      
      if (nextBox === 5) {
        qState.masteredCount++;
        qState.xp += 20; // Mastery bonus
        qState.activeQueue.shift(); // Remove mastered card
      } else {
        const card = qState.activeQueue.shift();
        card.box = nextBox;
        qState.activeQueue.push(card); // Move to the back
      }
    } else {
      qState.streak = 0;
      const prevBox = currentCard.box || 1;
      const nextBox = Math.max(prevBox - 1, 1);
      qState.masteryStates[currentCard.key] = nextBox;
      
      const card = qState.activeQueue.shift();
      card.box = nextBox;
      qState.activeQueue.push(card); // Move to the back
    }
    
    localStorage.setItem("elizabethan_mastery_states", JSON.stringify(qState.masteryStates));
  }
  
  // Clear states
  qState.verificationActive = false;
  qState.verificationOptions = [];
  qState.verificationAnswered = false;
  qState.verificationSelectedIndex = -1;
  qState.verificationCorrect = false;
  
  qState.isFlipped = false;
  
  setTimeout(() => {
    renderQuiz();
  }, 400);
};

window.copyToClipboard = function(elementId, textOverride = null) {
  let text = "";
  if (textOverride !== null) {
    text = textOverride;
  } else {
    const el = document.getElementById(elementId);
    if (el) text = el.value;
  }
  
  if (!text.trim()) {
    alert("Nothing to copy yet!");
    return;
  }
  
  navigator.clipboard.writeText(text).then(() => {
    // Attempt to locate a button with onclick reference or any button inside the workspace column
    const btn = document.activeElement;
    if (btn && btn.tagName === "BUTTON") {
      const originalText = btn.innerHTML;
      btn.innerHTML = "✅ Copied!";
      setTimeout(() => {
        btn.innerHTML = originalText;
      }, 2000);
    } else {
      alert("Answer copied to clipboard!");
    }
  }).catch(err => {
    console.error("Could not copy text: ", err);
    alert("Copy failed. Please manually select and copy.");
  });
};

// Global bridging functions
window.bridgeTimelineToQuiz = function(sectionCode) {
  const quizTopicIdx = quizData.findIndex(t => t.section === sectionCode);
  if (quizTopicIdx !== -1) {
    // Switch active tab to quizSection
    const tab = document.querySelector('.nav-tab[data-target="quizSection"]');
    if (tab) tab.click();
    // Start the quiz
    startQuizTopic(quizTopicIdx);
  }
};

window.bridgeQuizToTimeline = function(sectionCode) {
  // Switch tab to timelineSection
  const tab = document.querySelector('.nav-tab[data-target="timelineSection"]');
  if (tab) tab.click();
  
  // Set timeline filter to all and search query to sectionCode
  appState.timelineFilter = "all";
  appState.timelineSearchQuery = sectionCode.toLowerCase();
  
  // Update filter active tags in DOM
  const filterTags = document.querySelectorAll(".filter-tag");
  filterTags.forEach(t => {
    if (t.getAttribute("data-filter") === "all") {
      t.classList.add("active");
    } else {
      t.classList.remove("active");
    }
  });
  
  const timelineSearchInput = document.getElementById("timelineSearch");
  if (timelineSearchInput) {
    timelineSearchInput.value = sectionCode;
  }
  
  renderTimeline();
  
  // Scroll to the card containing the section code
  setTimeout(() => {
    const cards = document.querySelectorAll(".kt-card");
    for (let card of cards) {
      const badge = card.querySelector(".kt-badge");
      if (badge && badge.textContent.trim() === sectionCode) {
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        // Expand events list
        card.querySelectorAll(".event-item").forEach(item => item.classList.add("expanded"));
        break;
      }
    }
  }, 100);
};

window.resetTopicMastery = function(topicIdx) {
  const topicData = quizData[topicIdx];
  const qState = appState.quiz;
  topicData.questions.forEach((q, idx) => {
    const key = `${topicIdx}_${idx}`;
    qState.masteryStates[key] = 1;
  });
  localStorage.setItem("elizabethan_mastery_states", JSON.stringify(qState.masteryStates));
  startQuizTopic(topicIdx);
};

window.exitQuiz = function() {
  appState.quiz.activeTopicIndex = -1;
  appState.quiz.currentQuestionIndex = 0;
  appState.quiz.score = 0;
  appState.quiz.isFlipped = false;
  appState.quiz.activeQueue = [];
  appState.quiz.masteredCount = 0;
  appState.quiz.xp = 0;
  appState.quiz.streak = 0;
  appState.quiz.bestStreak = 0;
  appState.quiz.totalAttempts = 0;
  appState.quiz.verificationActive = false;
  appState.quiz.verificationOptions = [];
  appState.quiz.verificationAnswered = false;
  appState.quiz.verificationSelectedIndex = -1;
  appState.quiz.verificationCorrect = false;
  renderQuiz();
};

window.skipToResults = function() {
  const topicData = quizData[appState.quiz.activeTopicIndex];
  if (topicData) {
    appState.quiz.masteredCount = topicData.questions.length;
    appState.quiz.activeQueue = [];
    renderQuiz();
  }
};

function findQuestionId(arg1, arg2) {
  let qType = null;
  let qText = "";
  if (arg2 !== undefined) {
    qType = arg1;
    qText = arg2;
  } else {
    qText = arg1;
  }

  if (!qText) return "";

  const clean = (t) => t.toLowerCase().replace(/[^a-z0-9]/g, "");

  let qTypeKey = null;
  if (qType) {
    if (qType.toLowerCase().includes("feature") || qType.toLowerCase().includes("describe")) qTypeKey = "describe";
    else if (qType.toLowerCase().includes("explain")) qTypeKey = "explain";
    else qTypeKey = "essay";
  }

  const searchInList = (list) => {
    const target = clean(qText);
    for (const q of list) {
      if (clean(q.question) === target) return q.id;
    }
    const normalizedTarget = target
      .replace(/twofeaturesof/g, "onefeatureof")
      .replace(/threefeaturesof/g, "onefeatureof");
    for (const q of list) {
      const cleanQ = clean(q.question).replace(/twofeaturesof/g, "onefeatureof").replace(/threefeaturesof/g, "onefeatureof");
      if (cleanQ.includes(normalizedTarget) || normalizedTarget.includes(cleanQ)) {
        return q.id;
      }
    }
    return null;
  };

  if (qTypeKey) {
    const matchedId = searchInList(examData[qTypeKey]);
    if (matchedId) return matchedId;
  } else {
    for (const key of ["describe", "explain", "essay"]) {
      const matchedId = searchInList(examData[key]);
      if (matchedId) return matchedId;
    }
  }

  const manualMap = {
    "describeonefeatureofearlyelizabethansociety": "ex-desc-22",
    "describeonefeatureofexplorationintheyears155888": "ex-desc-25",
    "explainwhytherewasanincreaseinpovertyinelizabethanengland155888stimulusenclosuresheepfarming": "ex-exp-8",
    "theenglishdefeatedthespanisharmadabeacuseofsuperiorshipdesignandnavaltacticshowfardoyouagreeexplainyouranswerstimulusenglishcannonsweather": "ex-essay-6",
    "elizabethsreligioussettlementwassuccessfullyestablishedintheyears155969howfardoyouagreeexplainyouranswerstimulusthemiddlewaycatholicrebels": "ex-essay-2",
    "describeonefeatureofeducationinearlyelizabethanengland": "ex-desc-21",
    "describeonefeatureofthepuritanchallengetothereligioussettlement": "ex-desc-6",
    "explainwhythespanisharmadawasdefeatedstimulussirfrancisdraketheuseoffireships": "ex-exp-6",
    "themostsignificantchallengetoelizabethisreligioussettlementintheyears155868camefromenglishcatholicshowfardoyouagreeexplainyouranswerstimulusrecusancyfinesthepuritancampaignagainstcrucifixes": "ex-essay-3",
    "poorplanningwasthemainreasonwhythefirstcolonyinvirginiafailedhowfardoyouagreeexplainyouranswerstimulussirwalterraleighlackoffoodsupplies": "ex-essay-8",
    "describeonefeatureofgovernmentinearlyelizabethanengland": "ex-desc-1"
  };

  const cleanTarget = clean(qText)
    .replace(/twofeaturesof/g, "onefeatureof")
    .replace(/threefeaturesof/g, "onefeatureof");

  return manualMap[cleanTarget] || "";
}

window.spinElizabethanWheel = function() {
  const wheelSvg = document.getElementById("wheelSvg");
  const spinBtn = document.getElementById("spinBtn");
  const card = document.getElementById("wheelQuestionCard");
  
  if (!wheelSvg || !spinBtn || spinBtn.disabled) return;
  
  // Disable button during spin
  spinBtn.disabled = true;
  spinBtn.style.opacity = "0.7";
  spinBtn.textContent = "SPINNING";
  card.classList.remove("visible");
  
  // Choose random topic (0 to 11)
  const selectedTopicIdx = Math.floor(Math.random() * elizabethanWheelData.length);
  // Choose random question within that topic (0 to 2)
  const selectedQIdx = Math.floor(Math.random() * 3);
  
  const topicData = elizabethanWheelData[selectedTopicIdx];
  const questionData = topicData.questions[selectedQIdx];
  
  // Spin calculations - Cumulative degrees clockwise spin
  const sliceDeg = 30; // 360 / 12
  const targetSliceAngle = 360 - (selectedTopicIdx * sliceDeg);
  const currentNormalized = currentWheelRotation % 360;
  let angleDiff = targetSliceAngle - currentNormalized;
  if (angleDiff <= 0) {
    angleDiff += 360;
  }
  const spinRotation = 2160 + angleDiff;
  currentWheelRotation += spinRotation;
  
  // Apply rotation
  wheelSvg.style.transform = `rotate(${currentWheelRotation}deg)`;
  
  // Play sound effect using Web Audio API (shared context to avoid pool saturation)
  try {
    const audioCtx = getAudioContext();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    let count = 0;
    const interval = setInterval(() => {
      if (count > 30) {
        clearInterval(interval);
        return;
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(250 + (30 - count) * 12, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
      count++;
    }, 100);
  } catch (e) {
    // Audio context unsupported
  }
  
  setTimeout(() => {
    // Re-enable button
    spinBtn.disabled = false;
    spinBtn.style.opacity = "1";
    spinBtn.textContent = "SPIN";
    
    // Fill in question card
    document.getElementById("wheelQTopic").textContent = topicData.topic;
    document.getElementById("wheelQType").textContent = questionData.type;
    document.getElementById("wheelQText").textContent = questionData.text;
    
    // Set tip based on type
    const tipEl = document.getElementById("wheelQTip");
    const qId = findQuestionId(questionData.type, questionData.text);
    const facts = qId ? examQuestionFacts[qId] : null;
    if (facts) {
      tipEl.innerHTML = `<strong>💡 Key Factual Hints:</strong><br>${facts.replace(/\n/g, '<br>')}`;
    } else {
      if (questionData.type.includes("Feature")) {
        tipEl.innerHTML = `<strong>💡 Exam Tip (4 Marks):</strong> Identify <strong>two</strong> valid features and support each with a specific historical detail.`;
      } else if (questionData.type.includes("Explain")) {
        tipEl.innerHTML = `<strong>💡 Exam Tip (12 Marks):</strong> Structure your essay into <strong>3 PEEL paragraphs</strong> using specific evidence.`;
      } else {
        tipEl.innerHTML = `<strong>💡 Exam Tip (16 Marks):</strong> Construct a balanced essay with arguments for and against, concluding with a judgment.`;
      }
    }
    
    // Bind attempt button click
    const attemptBtn = document.getElementById("attemptBtn");
    if (attemptBtn) {
      attemptBtn.onclick = () => {
        attemptWheelQuestion(questionData.type, topicData.topic, questionData.text);
      };
    }
    
    // Show card
    card.classList.add("visible");
  }, 3500);
};

window.attemptWheelQuestion = function(qType, topicLabel, questionText) {
  let qTypeKey = "";
  if (qType.includes("Feature")) qTypeKey = "describe";
  else if (qType.includes("Explain")) qTypeKey = "explain";
  else qTypeKey = "essay";
  
  const examList = examData[qTypeKey];
  let matchedIdx = 0;
  
  // Clean wheel text to find matching question in examData
  const firstLine = questionText.split('\n')[0];
  const cleanWheelText = firstLine.replace(/[‘’'":\?\.\-]/g, "")
                                  .replace(/two features of/g, "one feature of")
                                  .replace(/three features of/g, "one feature of")
                                  .replace(/\s+/g, "")
                                  .toLowerCase();
  
  for (let i = 0; i < examList.length; i++) {
    const examText = examList[i].question.replace(/[‘’'":\?\.\-]/g, "").replace(/\s+/g, "").toLowerCase();
    if (examText.includes(cleanWheelText) || cleanWheelText.includes(examText)) {
      matchedIdx = i;
      break;
    }
  }
  
  // Update state to load this question
  appState.activeQuestionType = qTypeKey;
  appState.selectedIndexes[qTypeKey] = matchedIdx;
  appState.activePracticePanel = "workspace";
  
  // Update sidebar buttons active classes
  const sidebarButtons = document.querySelectorAll(".exam-nav-btn");
  sidebarButtons.forEach(btn => {
    if (btn.getAttribute("data-qtype") === qTypeKey) {
      sidebarButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    }
  });
  
  // Render workspace panel
  renderExamWorkspace();
};

window.toggleExamHint = function() {
  const hintBox = document.getElementById("examHintBox");
  const hintBtn = document.getElementById("hintToggleBtn");
  if (hintBox && hintBtn) {
    if (hintBox.style.display === "none") {
      hintBox.style.display = "block";
      hintBtn.innerHTML = "💨 Clear Smoke Signal";
    } else {
      hintBox.style.display = "none";
      hintBtn.innerHTML = "💨 Send up a Smoke Signal";
    }
  }
};

const curatedMockPapers = {
  "mock1": {
    "title": "Mock Exam 1: The 'High Probability' Paper",
    "q1a": "ex-desc-11",
    "q1b": "ex-desc-5",
    "q2": "ex-exp-12",
    "q3": "ex-essay-4",
    "q4": "ex-essay-19"
  },
  "mock2": {
    "title": "Mock Exam 2: The 'Moderate Probability' Paper",
    "q1a": "ex-desc-1",
    "q1b": "ex-desc-16",
    "q2": "ex-exp-5",
    "q3": "ex-essay-20",
    "q4": "ex-essay-11"
  },
  "mock3": {
    "title": "Mock Exam 3: The 'Mixed Threat' Paper",
    "q1a": "ex-desc-20",
    "q1b": "ex-desc-10",
    "q2": "ex-exp-4",
    "q3": "ex-essay-3",
    "q4": "ex-essay-12"
  },
  "mock4": {
    "title": "Mock Exam 4: The 'Least Likely' Paper",
    "q1a": "ex-desc-22",
    "q1b": "ex-desc-17",
    "q2": "ex-exp-6",
    "q3": "ex-essay-7",
    "q4": "ex-essay-8"
  }
};

window.startSelectedMockExam = function(value) {
  if (value === "random") {
    generateMockPaper();
  } else {
    const paperDef = curatedMockPapers[value];
    if (paperDef) {
      const findQ = (list, id) => list.find(q => q.id === id);
      const q1a = findQ(examData.describe, paperDef.q1a);
      const q1b = findQ(examData.describe, paperDef.q1b);
      const q2 = findQ(examData.explain, paperDef.q2);
      const q3 = findQ(examData.essay, paperDef.q3);
      const q4 = findQ(examData.essay, paperDef.q4);

      if (q1a && q1b && q2 && q3 && q4) {
        appState.mockExam = { q1a, q1b, q2, q3, q4, isCurated: true, title: paperDef.title };
        renderExamWorkspace();
      } else {
        console.error("Failed to load curated paper questions", paperDef);
      }
    }
  }
};

window.clearActiveMockExam = function() {
  appState.mockExam = null;
  renderExamWorkspace();
};

window.generateMockPaper = function() {
  const features = examData.describe;
  const explains = examData.explain;
  const essays = examData.essay;

  const q1a = features[Math.floor(Math.random() * features.length)];
  let q1b = features[Math.floor(Math.random() * features.length)];
  while (q1b.id === q1a.id) {
    q1b = features[Math.floor(Math.random() * features.length)];
  }

  const q2 = explains[Math.floor(Math.random() * explains.length)];

  // Choose two different essay questions
  let q3 = essays[Math.floor(Math.random() * essays.length)];
  let q4 = essays[Math.floor(Math.random() * essays.length)];
  while (q3.id === q4.id) {
    q4 = essays[Math.floor(Math.random() * essays.length)];
  }

  appState.mockExam = { q1a, q1b, q2, q3, q4 };
  renderExamWorkspace();
};

window.toggleMockExamHint = function(qId) {
  const hintBox = document.getElementById(`hintBox-${qId}`);
  const hintBtn = document.getElementById(`hintBtn-${qId}`);
  if (hintBox && hintBtn) {
    if (hintBox.style.display === "none") {
      hintBox.style.display = "block";
      hintBtn.innerHTML = "💨 Clear Smoke Signal";
    } else {
      hintBox.style.display = "none";
      hintBtn.innerHTML = "💨 Send up a Smoke Signal";
    }
  }
};

window.toggleMockExamModelAnswer = function(id, qType) {
  const box = document.getElementById("modelAnswerBox-" + id);
  const btn = document.getElementById("modelAnswerBtn-" + id);
  if (box && btn) {
    const isHidden = box.style.display === "none";
    if (isHidden) {
      // Find question
      const examList = examData[qType];
      const q = examList.find(item => item.id === id);
      if (q && q.modelAnswer) {
        let html = "";
        if (qType === "describe") {
          html = `
            <p style="font-weight: 700; color: #10b981; margin-bottom: 0.5rem;">Grade 9 Model Answer (2 Marks):</p>
            <p><span class="hl-feature" style="background: rgba(99, 102, 241, 0.15); padding: 0.15rem 0.3rem; border-radius: 3px; font-weight: 600;">${q.modelAnswer.feature}</span> <span class="hl-evidence" style="background: rgba(234, 179, 8, 0.15); padding: 0.15rem 0.3rem; border-radius: 3px; font-weight: 600;">${q.modelAnswer.detail}</span></p>
          `;
        } else {
          // Explain or Essay
          html = `
            <p style="font-weight: 700; color: #10b981; margin-bottom: 0.75rem;">Grade 9 Model Plan:</p>
            ${q.modelAnswer.intro ? `<p style="font-style: italic; margin-bottom: 1rem;"><strong>Intro:</strong> ${q.modelAnswer.intro}</p>` : ""}
            <div style="display: flex; flex-direction: column; gap: 1rem;">
          `;
          if (q.modelAnswer.paragraphs) {
            q.modelAnswer.paragraphs.forEach((p, idx) => {
              html += `
                <div style="padding-bottom: 0.75rem; border-bottom: 1px dashed var(--border-color);">
                  <strong style="color: var(--primary);">PEEL ${idx + 1}:</strong>
                  <ul style="margin: 0.25rem 0 0 0; padding-left: 1.25rem; font-size: 0.85rem; line-height: 1.5;">
                    <li><strong>Point:</strong> ${p.point}</li>
                    <li><strong>Evidence:</strong> ${p.evidence}</li>
                    <li><strong>Explanation:</strong> ${p.explanation}</li>
                    <li><strong>Link:</strong> ${p.link}</li>
                  </ul>
                </div>
              `;
            });
          }
          if (q.modelAnswer.conclusion) {
            html += `<p style="font-style: italic; margin-top: 0.5rem;"><strong>Conclusion:</strong> ${q.modelAnswer.conclusion}</p>`;
          }
          html += `</div>`;
        }
        box.innerHTML = html;
      } else {
        box.innerHTML = `<p style="font-style: italic; color: var(--text-muted);">Model answer is being compiled.</p>`;
      }
      box.style.display = "block";
      btn.textContent = "📖 Hide Model Answer";
      btn.style.borderColor = "#10b981";
      btn.style.color = "#10b981";
    } else {
      box.style.display = "none";
      btn.textContent = "📖 View Model Answer";
      btn.style.borderColor = "var(--border-color)";
      btn.style.color = "var(--text-main)";
    }
  }
};

// findQuestionId is now defined as a unified function at line 1725

window.generateHistoricalPaper = function(seriesName) {
  let paper;
  if (seriesName) {
    paper = officialPastPapers.find(p => p.series === seriesName);
  } else {
    paper = officialPastPapers[Math.floor(Math.random() * officialPastPapers.length)];
  }
  
  if (paper) {
    appState.activePastPaper = paper;
    renderExamWorkspace();
  }
};

window.clearActivePastPaper = function() {
  appState.activePastPaper = null;
  renderExamWorkspace();
};

/* --- GCSE Core Mastery Lessons Handlers --- */
window.toggleHardMode = function() {
  const container = document.getElementById("lessonContainer");
  const toggleBtn = document.getElementById("hardModeToggle");
  if (container && toggleBtn) {
    const isActive = container.classList.toggle("hard-mode-active");
    toggleBtn.classList.toggle("active", isActive);
    
    const strongs = container.querySelectorAll("strong, b");
    strongs.forEach(el => {
      if (isActive) {
        el.setAttribute("title", "Hover/click to reveal fact");
      } else {
        el.removeAttribute("title");
      }
    });
  }
};

let selectedPeelOrder = [];
window.clickPeelBox = function(el) {
  if (el.classList.contains("correct")) return;

  const order = parseInt(el.getAttribute("data-order"));
  const badge = el.querySelector(".peel-box-badge");
  const container = el.parentNode;
  const message = container.parentNode.querySelector("#peelMessage");
  const expectedNext = selectedPeelOrder.length + 1;

  if (order === expectedNext) {
    selectedPeelOrder.push(order);
    el.classList.add("correct");
    if (badge) {
      const labels = ["Point (1)", "Evidence (2)", "Explanation (3)", "Link (4)"];
      badge.textContent = labels[order - 1];
      badge.style.background = "#10b981";
      badge.style.color = "white";
      badge.style.borderColor = "#10b981";
    }

    // Update dynamic preview box
    const resultDiv = container.parentNode.querySelector(".peel-result-paragraph");
    if (resultDiv) {
      const textEl = resultDiv.querySelector(".peel-result-paragraph-text");
      if (textEl) {
        const boxes = Array.from(container.querySelectorAll(".peel-box"));
        const correctTexts = [];
        for (let i = 1; i <= selectedPeelOrder.length; i++) {
          const box = boxes.find(b => parseInt(b.getAttribute("data-order")) === i);
          if (box) {
            const textSpan = box.querySelector("span:not(.peel-box-badge)");
            correctTexts.push(textSpan ? textSpan.innerHTML : box.innerText);
          }
        }
        textEl.style.color = "var(--text-main)";
        textEl.innerHTML = correctTexts.join(" ");
      }
    }

    if (selectedPeelOrder.length === 4) {
      if (resultDiv) {
        resultDiv.classList.add("completed");
      }
      if (message) {
        message.style.color = "#10b981";
        message.textContent = "🎉 Excellent! You have built a perfect PEEL paragraph. You started with a clear Point (P), backed it up with Evidence (E), provided an Explanation (E) of its impact, and finished with a strong Link (L) beginning with 'Therefore' to answer the question directly!";
      }
    } else {
      if (message) {
        message.style.color = "var(--accent-indigo)";
        message.textContent = `Correct! Now select paragraph item ${expectedNext + 1}...`;
      }
    }
  } else {
    selectedPeelOrder = [];
    const boxes = container.querySelectorAll(".peel-box");
    boxes.forEach(box => {
      box.classList.remove("correct");
      const bBadge = box.querySelector(".peel-box-badge");
      if (bBadge) {
        bBadge.textContent = "Click to select";
        bBadge.style.background = "";
        bBadge.style.color = "";
        bBadge.style.borderColor = "";
      }
    });
    // Reset dynamic preview box
    const resultDiv = container.parentNode.querySelector(".peel-result-paragraph");
    if (resultDiv) {
      resultDiv.classList.remove("completed");
      const textEl = resultDiv.querySelector(".peel-result-paragraph-text");
      if (textEl) {
        textEl.style.color = "var(--text-muted)";
        textEl.innerHTML = "As you click the cards in the correct order, your paragraph will be built here...";
      }
    }
    if (message) {
      message.style.color = "var(--accent-crimson)";
      message.textContent = "Incorrect order! The PEEL structure requires Point first, then Evidence, then Explanation, and finally the Link. Try again!";
    }
  }
};

window.toggleHistorianAnswer = function(el) {
  el.classList.toggle("expanded");
  const icon = el.querySelector(".historian-question i");
  if (icon) {
    icon.classList.toggle("fa-chevron-down", !el.classList.contains("expanded"));
    icon.classList.toggle("fa-chevron-up", el.classList.contains("expanded"));
  }
};

window.toggleSkillCard = function(el) {
  el.classList.toggle("expanded");
  const icon = el.querySelector(".skill-card-front i");
  if (icon) {
    icon.classList.toggle("fa-chevron-down", !el.classList.contains("expanded"));
    icon.classList.toggle("fa-chevron-up", el.classList.contains("expanded"));
  }
};

window.jumpToExamQuestion = function(qType, questionId) {
  const list = examData[qType];
  const matchedIdx = list.findIndex(q => q.id === questionId);
  if (matchedIdx === -1) return;

  appState.currentTab = "practiceSection";
  appState.activeQuestionType = qType;
  appState.selectedIndexes[qType] = matchedIdx;
  appState.activePracticePanel = "workspace";

  const navTabs = document.querySelectorAll(".nav-tab");
  const tabContents = document.querySelectorAll(".tab-content");
  navTabs.forEach(t => {
    t.classList.toggle("active", t.getAttribute("data-target") === "practiceSection");
  });
  tabContents.forEach(c => {
    c.classList.toggle("active", c.getAttribute("id") === "practiceSection");
  });

  const sidebarButtons = document.querySelectorAll(".exam-nav-btn");
  sidebarButtons.forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-qtype") === qType);
  });

  renderExamWorkspace();
  
  setTimeout(() => {
    const selector = document.getElementById("questionSelector");
    if (selector) selector.value = matchedIdx;
  }, 50);
};

function updateLessonSelectorUI() {
  for (let i = 1; i <= 12; i++) {
    const btn = document.getElementById(`btnLesson${i}`);
    if (btn) {
      const isMastered = appState.lessonsMastered[`lesson_${i}`];
      const icon = btn.querySelector("i");
      if (icon) {
        if (isMastered) {
          icon.className = "fa-solid fa-circle-check";
          icon.style.color = "#10b981";
        } else {
          icon.className = "fa-solid fa-book-open";
          icon.style.color = "";
        }
      }
    }
  }
}

window.masterLesson = function(btn) {
  const lessonKey = `lesson_${currentLessonNum}`;
  appState.lessonsMastered[lessonKey] = true;
  localStorage.setItem("elizabethan_lessons_mastered", JSON.stringify(appState.lessonsMastered));
  
  updateLessonSelectorUI();

  btn.textContent = "✅ Mastered!";
  btn.style.background = "#10b981";
  btn.style.borderColor = "#10b981";
  
  // Smooth scroll back to the lesson selector bar so they can choose another lesson
  setTimeout(() => {
    const selectorBar = document.querySelector(".lesson-selector-bar");
    if (selectorBar) {
      selectorBar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    
    // Reset button style
    btn.textContent = "✅ Mark as Mastered";
    btn.style.background = "";
    btn.style.borderColor = "";
  }, 1000);
};

const peelChallenges = [
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"One reason why Elizabeth faced challenges to her rule in 1558 was her financial weakness..."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "The inherited Crown debt." },
      { order: 2, text: "She inherited a massive debt of <strong>£300,000</strong> from her sister, <strong>Mary I</strong>." },
      { order: 3, text: "This severely limited her ability to raise an army or fight foreign wars, leaving England vulnerable to invasion." },
      { order: 4, text: "Therefore, financial weakness was a primary domestic challenge because it left the new queen unable to defend her realm." }
    ]
  },
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"One reason why Elizabeth faced challenges to her rule in 1558 was the military threat from France..."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "The hostile military alliance on England's borders." },
      { order: 2, text: "The Auld Alliance meant French troops were stationed in Scotland, and France had just captured Calais in 1558." },
      { order: 3, text: "This forced Elizabeth to sign the Treaty of Cateau-Cambrésis in 1559, accepting the humiliating loss of Calais to avoid an invasion." },
      { order: 4, text: "Therefore, the French military threat forced Elizabeth into diplomatic compromise to secure her borders." }
    ]
  },
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"One reason why Elizabeth faced challenges to her rule in 1558 was doubts over her legitimacy..."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "Her status as an illegitimate female ruler in the eyes of many." },
      { order: 2, text: "Henry VIII had legally declared her illegitimate in 1536, and many Catholics viewed Mary, Queen of Scots as the rightful heir." },
      { order: 3, text: "This undermined her authority from the outset, encouraging Catholic plots to replace her and raising pressure on her to marry." },
      { order: 4, text: "Therefore, legitimacy doubts remained a constant threat by continually providing a political justification for rebellion." }
    ]
  }
];

const peelChallengesLesson2 = [
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"One reason why Elizabeth introduced a Religious Settlement in 1559 was to bring peace to a divided country..."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "One reason was to establish a 'Middle Way' to bring peace to a deeply divided country." },
      { order: 2, text: "After Mary I burned 300 Protestants, religious tension was extremely high between Catholics and returning radical Protestants (Marian Exiles)." },
      { order: 3, text: "By compromising on features like vestments while demanding an English Bible, Elizabeth avoided a religious civil war." },
      { order: 4, text: "Therefore, the Religious Settlement was designed to secure political stability by offering a compromise that both sides could tolerate." }
    ]
  },
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"One reason why Elizabeth chose the title \'Supreme Governor\' was to satisfy religious factions..."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "Elizabeth chose the title 'Supreme Governor' to appease both moderate Catholics and strict Puritans." },
      { order: 2, text: "The 1559 Act of Supremacy deliberately avoided the title 'Supreme Head', which her father Henry VIII had used." },
      { order: 3, text: "This led to greater acceptance across society, as Catholics could believe the Pope was spiritual head, and Puritans could believe only Christ was the head." },
      { order: 4, text: "Therefore, the careful choice of title defused opposition by allowing different religious groups to interpret her authority acceptably." }
    ]
  },
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"One reason why the Church of England was important in early Elizabethan society was to maintain control..."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "The Church was a vital tool for government propaganda and maintaining social control." },
      { order: 2, text: "Parish priests were required to read government-approved <strong>Homilies</strong> (sermons) and repeat prayers of obedience for the Queen in their services." },
      { order: 3, text: "This resulted in the constant reinforcement of the social hierarchy and ensured the monarch's message reached every village." },
      { order: 4, text: "Therefore, the Church served as a powerful instrument of royal control by continuously instilling loyalty in the population." }
    ]
  }
];

let currentPeelIndex = 0;
let currentLessonNum = 1;

const peelChallengesLesson3 = [
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"One reason why the Puritans challenged Elizabeth’s religious settlement was opposition to clerical dress..."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "One reason was their intense opposition to the rules regarding clerical dress." },
      { order: 2, text: "The 1559 Act of Uniformity dictated that all priests had to wear special, elaborate Catholic-style <strong>vestments</strong> during services." },
      { order: 3, text: "Because Puritans believed priests should be plain and simple, this rule <span class=\"analytical-link-highlight\">caused</span> outrage, leading to the 1566 Vestment Controversy where 37 priests were sacked." },
      { order: 4, text: "Therefore, clerical dress became a symbol of compromise that Puritans rejected as an unacceptable compromise with Catholic superstition." }
    ]
  },
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"One reason why the Catholic challenge was a serious threat to Elizabeth was Papal support..."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "The Catholic challenge was serious because it was actively encouraged by the Papacy." },
      { order: 2, text: "In <strong>1566</strong>, the Pope issued an instruction forbidding Catholics from attending Protestant services, and in <strong>1570</strong> he issued a Papal Bull excommunicating her." },
      { order: 3, text: "This <span class=\"analytical-link-highlight\">led to</span> domestic Catholics shifting from quiet survival to active treason, as the Pope had legally commanded them to overthrow the Queen." },
      { order: 4, text: "Therefore, Papal backing transformed the Catholic challenge into a highly dangerous national security threat." }
    ]
  },
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"One reason why the Puritan threat was considered less dangerous than the Catholic threat was foreign support..."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "The Puritan threat was limited because they lacked international military backing." },
      { order: 2, text: "Unlike English Catholics who could rely on the massive wealth and armies of <strong>Spain</strong> and <strong>France</strong>, Puritans had no foreign superpowers to ally with." },
      { order: 3, text: "This meant that while Puritans were a noisy political nuisance in Parliament, they could never <span class=\"analytical-link-highlight\">cause</span> a foreign invasion to overthrow Elizabeth like the Catholics could." },
      { order: 4, text: "Therefore, the lack of foreign support ensured that Puritan opposition never posed a genuine existential threat to the Crown." }
    ]
  }
];

const peelChallengesLesson4 = [
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why Mary\'s arrival in England in 1568 was a problem for Elizabeth."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "One reason was that Mary possessed a highly legitimate claim to the English crown." },
      { order: 2, text: "Mary was the granddaughter of <strong>Margaret Tudor</strong>, and strict English Catholics believed Elizabeth was illegitimate because they did not recognize Henry VIII's divorce." },
      { order: 3, text: "This <span class=\"analytical-link-highlight\">caused</span> the Catholic threat to suddenly become real, as English traitors now had a living, legitimate figurehead they could put on the throne." },
      { order: 4, text: "Therefore, Mary's arrival created an immediate domestic threat by giving Catholics a viable alternative monarch." }
    ]
  },
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why Elizabeth decided to keep Mary in captivity rather than returning her."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "One reason was that all other diplomatic options posed a direct military threat to England." },
      { order: 2, text: "If she sent her back to Scotland, her Protestant allies might be <span class=\"analytical-link-highlight\">provoked</span>, and if she let her go to France, she could raise a Catholic invasion force." },
      { order: 3, text: "Therefore, keeping her under comfortable house arrest at places like <strong>Tutbury Castle</strong> was the only option that <span class=\"analytical-link-highlight\">prevented</span> Mary from actively raising armies against England." },
      { order: 4, text: "Therefore, imprisonment was the only logical choice to prevent Mary from becoming an active military leader for Elizabeth's enemies." }
    ]
  },
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why the York Conference was held in 1568."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "One reason was to legally justify Elizabeth's decision to imprison an anointed queen." },
      { order: 2, text: "The inquiry was officially set up to examine the <strong>'Casket Letters'</strong> and determine if Mary was guilty of murdering <strong>Lord Darnley</strong>." },
      { order: 3, text: "By reaching a 'verdict of nothing', Elizabeth <span class=\"analytical-link-highlight\">created</span> the perfect political excuse: she couldn't release Mary because she wasn't innocent, but couldn't execute her because she wasn't proven guilty." },
      { order: 4, text: "Therefore, the York Conference served to buy Elizabeth time and establish a legal pretext for keeping Mary detained." }
    ]
  }
];

const peelChallengesLesson5 = [
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why the Revolt of the Northern Earls took place in 1569."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "One major reason was the Earls' loss of political power and influence at Court." },
      { order: 2, text: "The Earls of <strong>Northumberland and Westmorland</strong> were furious that Elizabeth bypassed them and gave important northern government roles to Protestant 'new men' like <strong>William Cecil</strong>." },
      { order: 3, text: "This <span class=\"analytical-link-highlight\">led to</span> deep resentment and a desire to rebel, as the ancient nobility felt they were being intentionally stripped of their traditional political authority by the Queen." },
      { order: 4, text: "Therefore, the rebellion was triggered by the northern nobility's exclusion from national government and local influence." }
    ]
  },
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why Catholic plots against Elizabeth failed."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "The main reason for their failure was the highly effective spy network run by Sir Francis Walsingham." },
      { order: 2, text: "Walsingham employed cipher experts like <strong>Thomas Phelippes</strong> who successfully intercepted and decoded the secret messages hidden in beer barrels during the <strong>1586 Babington Plot</strong>." },
      { order: 3, text: "Because Walsingham could read the plotters' exact plans before they acted, this <span class=\"analytical-link-highlight\">resulted in</span> him being able to arrest the traitors and prevent foreign invasions from ever launching." },
      { order: 4, text: "Therefore, intelligence gathering and codebreaking were the primary reasons Catholic conspiracies never succeeded." }
    ]
  },
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why Mary, Queen of Scots was executed in 1587."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "Mary was executed because Elizabeth's government finally obtained undeniable proof of her treason." },
      { order: 2, text: "During the <strong>Babington Plot (1586)</strong>, Mary wrote a coded letter explicitly agreeing to the assassination of Elizabeth, which was intercepted by Walsingham." },
      { order: 3, text: "Because the <strong>1584 Act for the Preservation of the Queen's Safety</strong> demanded the death of anyone plotting against Elizabeth, this intercepted letter legally <span class=\"analytical-link-highlight\">forced</span> Elizabeth to sign the death warrant." },
      { order: 4, text: "Therefore, the execution of Mary was the direct result of Walsingham securing concrete, written proof of her complicity in assassination." }
    ]
  }
];

const peelChallengesLesson6 = [
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why commercial rivalry in the New World caused tension with Spain."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "One reason was that Spain's strict trade monopoly led to violent clashes with English merchants." },
      { order: 2, text: "Because Spain outlawed foreign trade, English merchants like <strong>John Hawkins</strong> were treated as pirates, leading to the Spanish ambumbing and destroying his fleet at <strong>San Juan de Ulúa in 1568</strong>." },
      { order: 3, text: "This <span class=\"analytical-link-highlight\">caused</span> deep resentment in England and shifted English tactics towards aggressive privateering to seek revenge against Spanish shipping." },
      { order: 4, text: "Therefore, Spanish protectionism and the attack at San Juan de Ulúa pushed England toward state-sanctioned piracy." }
    ]
  },
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why Drake\'s circumnavigation worsened relations."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "A major reason was the massive theft of Spanish wealth and Elizabeth's public approval of it." },
      { order: 2, text: "Drake captured <strong>£400,000</strong> in stolen Spanish treasure, and upon his return in <strong>1581</strong>, Elizabeth knighted him on his ship, the <em>Golden Hind</em>." },
      { order: 3, text: "This directly <span class=\"analytical-link-highlight\">provoked</span> Philip II, as Elizabeth was openly rewarding and celebrating a man Spain viewed as a common thief and pirate." },
      { order: 4, text: "Therefore, Drake's knighthood convinced Philip II that Elizabeth actively supported piracy against the Spanish Empire." }
    ]
  },
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why political and religious rivalry caused tension."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "Tension increased because Philip II actively supported treason against Elizabeth." },
      { order: 2, text: "As a strict Catholic, Philip allowed his ambassadors to fund and support plots to replace Elizabeth with Mary, Queen of Scots, such as the <strong>Ridolfi Plot (1571)</strong> and the <strong>Throckmorton Plot (1583)</strong>." },
      { order: 3, text: "This <span class=\"analytical-link-highlight\">led to</span> Elizabeth viewing Spain not just as a religious rival, but as an active, existential military threat to her life and throne." },
      { order: 4, text: "Therefore, Spain's financial and political backing of Catholic plots made direct military conflict inevitable." }
    ]
  }
];

const peelChallengesLesson7 = [
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why Elizabeth signed the Treaty of Nonsuch in 1585."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "One reason was the strategic fear that Spain was about to completely conquer the Netherlands." },
      { order: 2, text: "Following the assassination of <strong>William of Orange</strong> in <strong>1584</strong>, the Dutch Protestant rebellion was collapsing." },
      { order: 3, text: "This <span class=\"analytical-link-highlight\">forced</span> Elizabeth to send <strong>7,400 troops</strong> because she knew if Spain secured the ports directly across the Channel, they would use them as a launchpad to invade England." },
      { order: 4, text: "Therefore, the threat of a Spanish invasion launched from a conquered Netherlands forced Elizabeth into direct military intervention." }
    ]
  },
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why Robert Dudley angered Elizabeth in the Netherlands."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "Dudley angered Elizabeth by politically overstepping his authority and acting like a king." },
      { order: 2, text: "In <strong>1586</strong>, Dudley accepted the official title of <strong>'Governor-General of the Netherlands'</strong> from the Dutch rebels." },
      { order: 3, text: "This <span class=\"analytical-link-highlight\">caused</span> Elizabeth's fury because she only wanted to protect English trade, not legally replace Philip II, which unnecessarily <span class=\"analytical-link-highlight\">provoked</span> Spain into a total war." },
      { order: 4, text: "Therefore, Dudley's unauthorized actions undermined Elizabeth's diplomatic strategy and escalated tensions with Spain." }
    ]
  },
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why Drake\'s raid on Cadiz was significant."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "The raid was highly significant because it severely crippled Spanish invasion preparations." },
      { order: 2, text: "In April <strong>1587</strong>, Drake destroyed around <strong>30 Spanish ships</strong> and thousands of crucial wooden <strong>barrel staves</strong> at the port of Cadiz." },
      { order: 3, text: "This <span class=\"analytical-link-highlight\">resulted in</span> the Armada being delayed by a whole year, while the loss of the barrels meant the Spanish soldiers' food rotted during their eventual voyage in 1588." },
      { order: 4, text: "Therefore, the raid on Cadiz bought England critical time to prepare its defenses by disrupting the Armada's logistics." }
    ]
  }
];

const peelChallengesLesson8 = [
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why the Spanish Armada was defeated (Tactics)."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "One reason the Armada was defeated was the superior, devastating naval tactics used by the English." },
      { order: 2, text: "On the night of <strong>7 August 1588</strong>, the English deliberately sent <strong>8 burning fireships</strong> into the anchored Spanish fleet at Calais." },
      { order: 3, text: "This <span class=\"analytical-link-highlight\">caused</span> mass panic, leading the Spanish to cut their anchors and scatter, which destroyed their defensive crescent formation and allowed the English to finally attack them at Gravelines." },
      { order: 4, text: "Therefore, the use of fireships was the turning point that broke the Armada's defensive formation and exposed them to defeat." }
    ]
  },
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why the Spanish Armada was defeated (Ship Design)."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "A major reason for the English victory was their superior ship design and weaponry." },
      { order: 2, text: "<strong>John Hawkins</strong> had designed 'race-built' galleons that were much faster than the bulky Spanish ships, and armed them with long-range cannons called <strong>culverins</strong>." },
      { order: 3, text: "This <span class=\"analytical-link-highlight\">resulted in</span> the English being able to stay out of range of the Spanish grappling hooks while simultaneously inflicting massive structural damage to the Armada with constant cannon fire." },
      { order: 4, text: "Therefore, superior English ship design enabled them to control the tactical range and destroy Spanish ships from afar." }
    ]
  },
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why Philip II launched the Armada in 1588."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "Philip was provoked into launching the Armada by direct English military interference." },
      { order: 2, text: "In <strong>1585</strong>, Elizabeth had signed the <strong>Treaty of Nonsuch</strong>, sending <strong>7,400 troops</strong> under the Earl of Leicester to fight against Spain in the Netherlands." },
      { order: 3, text: "By directly funding a war against Spain's empire, Elizabeth officially ended the 'Cold War' and <span class=\"analytical-link-highlight\">forced</span> Philip to invade England to stop them helping the Dutch." },
      { order: 4, text: "Therefore, the Treaty of Nonsuch was the decisive act that convinced Philip II that only an invasion of England could secure his empire." }
    ]
  }
];

const peelChallengesLesson9 = [
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why education changed in early Elizabethan England."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "One major reason for educational change was the rapid growth of trade and the economy." },
      { order: 2, text: "The 'middling sort', such as merchants and yeomen, increasingly needed their sons to be literate and numerate so they could navigate complex business contracts and keep accounts." },
      { order: 3, text: "This economic necessity <span class=\"analytical-link-highlight\">led to</span> a massive expansion in schooling for the middle classes, resulting in <strong>72 new Grammar Schools</strong> being founded to teach these vital skills." },
      { order: 4, text: "Therefore, the rise of a commercial economy was the primary catalyst for the expansion of grammar school education." }
    ]
  },
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why the theatre was so popular for all classes."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "The theatre was immensely popular because it was physically and financially accessible to everyone in society." },
      { order: 2, text: "The poorest citizens could pay just <strong>1 penny</strong> to stand as 'groundlings' in the pit, while the wealthy could pay more to sit comfortably in the tiered galleries." },
      { order: 3, text: "This <span class=\"analytical-link-highlight\">caused</span> the purpose-built theatres like The Rose to become the ultimate social hub, as it was one of the only places the rigid class system mixed to enjoy the same entertainment." },
      { order: 4, text: "Therefore, low ticket prices turned the theatre into a rare space where all social classes shared a common culture." }
    ]
  },
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why sport and pastimes highlighted the class divide."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "Leisure activities highlighted the divide because most sports were restricted by wealth and free time." },
      { order: 2, text: "The nobility played exclusive, expensive sports like <strong>Real Tennis</strong> and <strong>hawking</strong>, whereas the laboring poor played violent, rule-free games of <strong>village football</strong>." },
      { order: 3, text: "This <span class=\"analytical-link-highlight\">resulted in</span> a society where the rich enjoyed highly refined, skilled hobbies, while the poor, who had little money or free time, engaged in chaotic and brutal village brawls." },
      { order: 4, text: "Therefore, sports and pastimes reinforced the Elizabethan class hierarchy by reflecting differences in wealth and status." }
    ]
  }
];

const peelChallengesLesson10 = [
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why there was an increase in poverty (Enclosure)."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "One major reason for increased poverty was the changing use of land through the system of enclosure." },
      { order: 2, text: "Wealthy landowners increasingly fenced off traditional common land to shift from crop farming to highly profitable <strong>sheep farming</strong>." },
      { order: 3, text: "This <span class=\"analytical-link-highlight\">forced</span> ordinary rural workers off the land, leaving them unable to grow their own food or forage to survive, leading to mass rural unemployment and vagabondage." },
      { order: 4, text: "Therefore, enclosure directly caused poverty by displacing agricultural workers in favor of less labor-intensive sheep farming." }
    ]
  },
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why there was an increase in poverty (Population)."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "Poverty increased dramatically due to an unprecedented population boom that outpaced food production." },
      { order: 2, text: "The population of England skyrocketed from roughly <strong>3 million to 4.2 million</strong> during Elizabeth's reign." },
      { order: 3, text: "This massive growth <span class=\"analytical-link-highlight\">caused</span> wages to plummet while the demand for food drove prices up (inflation), resulting in widespread starvation for the lower classes." },
      { order: 4, text: "Therefore, rapid population growth created severe economic pressure by depressing wages and raising food costs." }
    ]
  },
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why policies towards the poor changed."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "The government changed its policies to actively provide for the poor because they feared that mass starvation would lead to rebellion." },
      { order: 2, text: "The <strong>1576 Poor Relief Act</strong> required local <strong>JPs</strong> to provide raw materials like wool and hemp so the unemployed had a way to earn a living in 'Houses of Correction'." },
      { order: 3, text: "This <span class=\"analytical-link-highlight\">resulted in</span> a significant shift from merely punishing the poor to the government taking national responsibility to keep them fed and pacified." },
      { order: 4, text: "Therefore, the fear of social disorder led to the first national system of state-sponsored poor relief." }
    ]
  }
];

const peelChallengesLesson11 = [
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why there was an increase in exploration (Technology)."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "One major reason for increased exploration was the development of superior ship design." },
      { order: 2, text: "English shipbuilders developed the <strong>galleon</strong>, which was significantly faster and possessed a much larger cargo hold for supplies than older ships." },
      { order: 3, text: "Because these larger ships were more stable and could carry heavy <strong>culverin cannons</strong>, this <span class=\"analytical-link-highlight\">allowed</span> sailors to safely undertake dangerous transatlantic voyages without fear of sinking or pirate attacks." },
      { order: 4, text: "Therefore, advancements in ship design provided explorers with the safety and range needed to undertake long voyages." }
    ]
  },
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why there was an increase in exploration (Trade)."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "Exploration increased because English merchants were desperately seeking new markets for their goods." },
      { order: 2, text: "Spanish interference during the Dutch Revolt severely disrupted the traditional English cloth trade through the vital European port of <strong>Antwerp</strong>." },
      { order: 3, text: "This economic crisis <span class=\"analytical-link-highlight\">forced</span> merchants to fund new, risky expeditions to places like the Americas and Asia to find new trade partners and avoid financial ruin." },
      { order: 4, text: "Therefore, the collapse of trade in Antwerp forced merchants to finance voyages to find new markets." }
    ]
  },
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why Drake\'s circumnavigation was significant."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "The circumnavigation was highly significant because it drastically worsened diplomatic relations with Spain." },
      { order: 2, text: "Drake returned in <strong>1580</strong> with <strong>£400,000</strong> in stolen Spanish treasure, and Elizabeth controversially knighted him aboard the <em>Golden Hind</em>." },
      { order: 3, text: "By publicly rewarding a man who had stolen Spanish wealth, Elizabeth deeply humiliated King Philip II, which <span class=\"analytical-link-highlight\">provoked</span> him further down the path towards war." },
      { order: 4, text: "Therefore, Drake's achievement escalated hostilities by proving English state support for attacks on Spanish ships." }
    ]
  }
];

const peelChallengesLesson12 = [
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why the English attempted to colonise Virginia."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "One reason for the attempted colonisation was to find new commercial markets for trade." },
      { order: 2, text: "The Virginia territory was rich in resources that could not be grown in Europe, such as <strong>tobacco and sugar cane</strong>." },
      { order: 3, text: "Because their main trading port at <strong>Antwerp</strong> had been disrupted by the Spanish, establishing a colony <span class=\"analytical-link-highlight\">created</span> a massive new opportunity to sell English cloth to native populations and bring back valuable goods." },
      { order: 4, text: "Therefore, colonisation was attempted to secure raw materials and offset the loss of traditional European markets." }
    ]
  },
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why Sir Walter Raleigh was significant to the Virginia project."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "Raleigh was highly significant because he provided the crucial organisation and funding required to make the expedition happen." },
      { order: 2, text: "After receiving his royal patent in <strong>1584</strong>, Raleigh successfully raised vast amounts of money from investors and recruited expert sailors like <strong>Richard Grenville</strong> to lead the fleet." },
      { order: 3, text: "This <span class=\"analytical-link-highlight\">led to</span> the voyage actually becoming a reality, because without his influence at court to persuade wealthy merchants to invest, the expensive ships and supplies could never have been purchased." },
      { order: 4, text: "Therefore, Raleigh's financial planning and court connections were the primary drivers behind the Roanoke expedition." }
    ]
  },
  {
    question: 'Construct a PEEL paragraph for a causation essay statement: <em>"Explain why the first Virginia colony failed."</em>. Click the scrambled cards below in the correct order: <strong>Point ➔ Evidence ➔ Explanation ➔ Link</strong>.',
    items: [
      { order: 1, text: "A major reason for the failure of the colony was the disastrous loss of vital supplies." },
      { order: 2, text: "As the fleet arrived at Roanoke Island in <strong>1585</strong>, the flagship, the <strong>Tiger</strong>, struck a sandbank and seawater flooded the hull." },
      { order: 3, text: "This completely ruined their winter food and crop seeds, which <span class=\"analytical-link-highlight\">caused</span> the starving colonists to aggressively demand food from the local Native Americans, ultimately <span class=\"analytical-link-highlight\">provoking</span> a war." },
      { order: 4, text: "Therefore, the loss of provisions doomed the settlement by forcing conflict with the local population to survive." }
    ]
  }
];

window.switchActiveLesson = function(lessonNum) {
  currentLessonNum = lessonNum;
  const container = document.getElementById("lessonContainer");
  const template = document.getElementById(`lesson` + lessonNum + `Template`);
  if (container && template) {
    container.innerHTML = template.innerHTML;
    
    // Update active button state
    const btn1 = document.getElementById("btnLesson1");
    const btn2 = document.getElementById("btnLesson2");
    const btn3 = document.getElementById("btnLesson3");
    const btn4 = document.getElementById("btnLesson4");
    const btn5 = document.getElementById("btnLesson5");
    const btn6 = document.getElementById("btnLesson6");
    const btn7 = document.getElementById("btnLesson7");
    const btn8 = document.getElementById("btnLesson8");
    const btn9 = document.getElementById("btnLesson9");
    const btn10 = document.getElementById("btnLesson10");
    const btn11 = document.getElementById("btnLesson11");
    const btn12 = document.getElementById("btnLesson12");
    if (btn1) btn1.classList.toggle("active", lessonNum === 1);
    if (btn2) btn2.classList.toggle("active", lessonNum === 2);
    if (btn3) btn3.classList.toggle("active", lessonNum === 3);
    if (btn4) btn4.classList.toggle("active", lessonNum === 4);
    if (btn5) btn5.classList.toggle("active", lessonNum === 5);
    if (btn6) btn6.classList.toggle("active", lessonNum === 6);
    if (btn7) btn7.classList.toggle("active", lessonNum === 7);
    if (btn8) btn8.classList.toggle("active", lessonNum === 8);
    if (btn9) btn9.classList.toggle("active", lessonNum === 9);
    if (btn10) btn10.classList.toggle("active", lessonNum === 10);
    if (btn11) btn11.classList.toggle("active", lessonNum === 11);
    if (btn12) btn12.classList.toggle("active", lessonNum === 12);
    
    // Sync mobile select dropdown
    const mobileSelect = document.getElementById("mobileLessonSelect");
    if (mobileSelect) {
      mobileSelect.value = lessonNum;
    }
    
    // Reset Hard Mode
    container.classList.remove("hard-mode-active");
    const toggleBtn = document.getElementById("hardModeToggle");
    if (toggleBtn) toggleBtn.classList.remove("active");
    
    // Reset PEEL
    currentPeelIndex = 0;
    renderPeelChallenge(0);
    
    // Initialize In-Lesson Chronology game
    initActiveLessonGame(lessonNum);
  }
};

window.loadNextPeelChallenge = function() {
  const activeChallenges = currentLessonNum === 1 ? peelChallenges : (currentLessonNum === 2 ? peelChallengesLesson2 : (currentLessonNum === 3 ? peelChallengesLesson3 : (currentLessonNum === 4 ? peelChallengesLesson4 : (currentLessonNum === 5 ? peelChallengesLesson5 : (currentLessonNum === 6 ? peelChallengesLesson6 : (currentLessonNum === 7 ? peelChallengesLesson7 : (currentLessonNum === 8 ? peelChallengesLesson8 : (currentLessonNum === 9 ? peelChallengesLesson9 : (currentLessonNum === 10 ? peelChallengesLesson10 : (currentLessonNum === 11 ? peelChallengesLesson11 : peelChallengesLesson12))))))))));
  currentPeelIndex = (currentPeelIndex + 1) % activeChallenges.length;
  renderPeelChallenge(currentPeelIndex);
};

function renderPeelChallenge(index) {
  selectedPeelOrder = [];
  const activeChallenges = currentLessonNum === 1 ? peelChallenges : (currentLessonNum === 2 ? peelChallengesLesson2 : (currentLessonNum === 3 ? peelChallengesLesson3 : (currentLessonNum === 4 ? peelChallengesLesson4 : (currentLessonNum === 5 ? peelChallengesLesson5 : (currentLessonNum === 6 ? peelChallengesLesson6 : (currentLessonNum === 7 ? peelChallengesLesson7 : (currentLessonNum === 8 ? peelChallengesLesson8 : (currentLessonNum === 9 ? peelChallengesLesson9 : (currentLessonNum === 10 ? peelChallengesLesson10 : (currentLessonNum === 11 ? peelChallengesLesson11 : peelChallengesLesson12))))))))));
  const challenge = activeChallenges[index];
  
  const activeLessonContainer = document.getElementById("lessonContainer");
  const qText = activeLessonContainer ? activeLessonContainer.querySelector("#peelQuestionText") : null;
  const msg = activeLessonContainer ? activeLessonContainer.querySelector("#peelMessage") : null;
  const container = activeLessonContainer ? activeLessonContainer.querySelector("#peelLinker") : null;

  if (qText) {
    qText.innerHTML = challenge.question;
  }
  if (msg) {
    msg.textContent = "";
  }

  // Clone and shuffle items
  const items = [...challenge.items];
  let shuffled;
  do {
    shuffled = items.sort(() => Math.random() - 0.5);
  } while (shuffled[0].order === 1 && shuffled[1].order === 2); // Make sure it's not already in correct order

  if (container) {
    container.innerHTML = shuffled.map(item => `
      <div class="peel-box" data-order="${item.order}" onclick="clickPeelBox(this)">
        <span class="peel-box-badge" id="badge-${item.order}">Click to select</span>
        <span>${item.text}</span>
      </div>
    `).join('');

    // Ensure the result paragraph preview box exists right below the peelLinker container
    let resultDiv = container.parentNode.querySelector(".peel-result-paragraph");
    if (!resultDiv) {
      resultDiv = document.createElement("div");
      resultDiv.className = "peel-result-paragraph";
      container.parentNode.insertBefore(resultDiv, container.nextSibling);
    }
    resultDiv.innerHTML = `
      <div class="peel-result-paragraph-title">Paragraph Preview</div>
      <div class="peel-result-paragraph-text" style="color: var(--text-muted);">As you click the cards in the correct order, your paragraph will be built here...</div>
    `;
    resultDiv.classList.remove("completed");
  }
}

function setupPeelLinker() {
  // Load Lesson 1 automatically on initial start
  switchActiveLesson(1);
}

// Onboarding Controller
let currentOnboardingSlide = 1;

window.checkFirstTimeUser = function() {
  const isFirstTime = localStorage.getItem('firstTimeUser') === null;
  if (isFirstTime) {
    const modal = document.getElementById('onboardingModal');
    if (modal) modal.style.display = 'flex';
  }
};

window.closeOnboarding = function() {
  const modal = document.getElementById('onboardingModal');
  if (modal) modal.style.display = 'none';
  localStorage.setItem('firstTimeUser', 'false');
};

window.moveOnboardingSlide = function(direction) {
  const slides = document.querySelectorAll('.onboarding-slide');
  if (slides.length === 0) return;
  
  if (currentOnboardingSlide === slides.length && direction === 1) {
    window.closeOnboarding();
    return;
  }
  
  slides[currentOnboardingSlide - 1].classList.remove('active');
  currentOnboardingSlide += direction;
  if (currentOnboardingSlide < 1) currentOnboardingSlide = 1;
  if (currentOnboardingSlide > slides.length) currentOnboardingSlide = slides.length;
  
  slides[currentOnboardingSlide - 1].classList.add('active');
  
  const stepIndicator = document.querySelector('.step-indicator');
  if (stepIndicator) {
    stepIndicator.innerText = `Step ${currentOnboardingSlide} of ${slides.length}`;
  }
  
  const prevBtn = document.querySelector('.prev-btn');
  if (prevBtn) {
    prevBtn.style.visibility = currentOnboardingSlide === 1 ? 'hidden' : 'visible';
  }
  
  const nextBtn = document.querySelector('.next-btn');
  if (nextBtn) {
    if (currentOnboardingSlide === slides.length) {
      nextBtn.innerText = 'Get Started';
    } else {
      nextBtn.innerText = 'Next';
    }
  }
};

window.showOnboarding = function() {
  const modal = document.getElementById('onboardingModal');
  if (!modal) return;
  
  const slides = document.querySelectorAll('.onboarding-slide');
  if (slides.length === 0) return;
  
  // Reset active slide
  slides.forEach((slide) => slide.classList.remove('active'));
  currentOnboardingSlide = 1;
  slides[0].classList.add('active');
  
  // Reset buttons and indicator
  const stepIndicator = document.querySelector('.step-indicator');
  if (stepIndicator) {
    stepIndicator.innerText = `Step 1 of ${slides.length}`;
  }
  
  const prevBtn = document.querySelector('.prev-btn');
  if (prevBtn) {
    prevBtn.style.visibility = 'hidden';
  }
  
  const nextBtn = document.querySelector('.next-btn');
  if (nextBtn) {
    nextBtn.innerText = 'Next';
  }
  
  modal.style.display = 'flex';
};

// Trigger initial load
window.addEventListener("DOMContentLoaded", init);
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(window.checkFirstTimeUser, 1000);
});

function getTrophyForTopic(topicIdx) {
  let themeIndex = 4; // Default to Fareham Chimney Sweep Inc.!
  if ([0, 3].includes(topicIdx)) themeIndex = 0; // Spy Network
  else if ([8].includes(topicIdx)) themeIndex = 1; // Globe Theatre
  else if ([1, 2].includes(topicIdx)) themeIndex = 2; // Royal Court
  else if ([10, 11].includes(topicIdx)) themeIndex = 3; // High Seas
  
  const theme = quizResultThemes[themeIndex];
  const tierIdx = Math.floor(Math.random() * 3) + 1; // Pick random tier (1, 2, or 3)
  return theme.tiers[tierIdx] || theme.tiers[0];
}

const farehamChimneyQuotes = [
  "Much like the Spanish Armada, a blocked flue will quickly go up in smoke! Sweep clean to avoid your own fireship disaster at Calais!",
  "Sir Francis Drake circumnavigated the globe for gold; we navigate your chimney for soot. Both require brave men and long brushes!",
  "Mary Queen of Scots' plots were tightly sealed, but unlike a blocked chimney, Walsingham always found the opening. Keep your flues clear and your treasons sparse!",
  "Elizabeth I inherited £300,000 of debt; neglecting your chimney will land you in even deeper financial ruins. Clean your flues to save your pocket!",
  "Finding the 'Middle Way' in the 1559 Religious Settlement was tricky, but finding the sweet spot in a double-flue is our specialty! No half-measures allowed!",
  "The Puritans hated fancy vestments and ceremonial clutter; we hate fancy soot build-ups and cluttered pipes. Keep it clean and unadorned!",
  "Enclosure of common land left rural peasants with nowhere to graze; a blocked chimney leaves soot with nowhere to escape. Keep the vents open!",
  "Raleigh's Roanoke colony failed because of poor supplies and terrible luck; don't let your heating system suffer the same catastrophic fate!",
  "The Pope's Papal Bull excommunicated Elizabeth in 1570, releasing subjects from loyalty. But no bull can release you from the duty of sweeping your chimney!",
  "Brushing away historical ignorance, one flue at a time.",
  "We get into the tight spaces so your historical knowledge can expand.",
  "Black soot, clear minds, can't lose.",
  "Because a blocked chimney is bad, but a blocked memory is catastrophic.",
  "Keeping your grades high and your carbon emissions locally compliant since 1842."
];

let chimneyQuoteTimeout = null;

function rotateChimneyTaglines() {
  const bar = document.getElementById("topMetaBar");
  const el = document.getElementById("chimneyQuoteDisplay");
  if (!bar || !el) return;
  
  // Fade in the entire bar immediately and make it interactive
  bar.style.opacity = "1";
  bar.style.pointerEvents = "auto";
  el.style.opacity = "1";
  
  const randomIndex = Math.floor(Math.random() * farehamChimneyQuotes.length);
  el.innerText = `"${farehamChimneyQuotes[randomIndex]}"`;
  
  if (chimneyQuoteTimeout) {
    clearTimeout(chimneyQuoteTimeout);
  }
  
  // Fade out the entire bar after 5 seconds
  chimneyQuoteTimeout = setTimeout(() => {
    bar.style.opacity = "0";
    bar.style.pointerEvents = "none";
  }, 5000);
}

// Add global listener to change quote on every click in the app
document.addEventListener("click", () => {
  rotateChimneyTaglines();
});


// ==========================================
// CUSTOM KEY STAGE 3 PEDAGOGICAL FUNCTIONS
// ==========================================

window.toggleDoNowAnswers = function(event) {
  const answers = document.querySelectorAll('.do-now-answer');
  const btn = event.currentTarget || document.getElementById('toggleDoNowAnswersBtn');
  if (!btn) return;
  let isCurrentlyHidden = true;

  answers.forEach(ans => {
    if (ans.style.display === 'none' || ans.style.display === '') {
      ans.style.display = 'inline';
      isCurrentlyHidden = false;
    } else {
      ans.style.display = 'none';
      isCurrentlyHidden = true;
    }
  });

  if (isCurrentlyHidden) {
    btn.innerHTML = '<i class="fa-solid fa-eye"></i> Reveal Do Now Answers';
  } else {
    btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Hide Do Now Answers';
  }
};

window.toggleModelAnswers = function(event) {
  const block = document.getElementById('modelAnswersBlock');
  const btn = event.currentTarget;
  if (!block || !btn) return;
  
  if (block.style.display === 'none' || block.style.display === '') {
    block.style.display = 'block';
    btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Hide Model Answers & Marking Guide';
  } else {
    block.style.display = 'none';
    btn.innerHTML = '<i class="fa-solid fa-eye"></i> Show Model Answers & Marking Guide';
  }
};

let quickQuizState = {
  currentQuestionIndex: 0,
  selectedAnswer: null,
  isSubmitted: false
};

window.selectQuickQuizOption = function(ansIndex) {
  if (quickQuizState.isSubmitted) return;
  quickQuizState.selectedAnswer = ansIndex;
  
  const options = document.querySelectorAll('.quick-quiz-option-btn');
  options.forEach((btn, idx) => {
    if (idx === ansIndex) {
      btn.style.borderColor = 'var(--primary)';
      btn.style.background = 'rgba(var(--primary-rgb), 0.08)';
    } else {
      btn.style.borderColor = 'var(--border-color)';
      btn.style.background = 'var(--bg-surface)';
    }
  });
  
  const submitBtn = document.getElementById('quickQuizSubmitBtn');
  if (submitBtn) submitBtn.disabled = false;
};

window.submitQuickQuizAnswer = function() {
  if (quickQuizState.isSubmitted || quickQuizState.selectedAnswer === null) return;
  quickQuizState.isSubmitted = true;
  
  const q = quizData[quickQuizState.currentQuestionIndex];
  const selectedText = document.querySelectorAll('.quick-quiz-option-btn')[quickQuizState.selectedAnswer].getAttribute('data-val');
  const isCorrect = (selectedText === q.answer);
  
  const feedbackBlock = document.getElementById('quickQuizFeedback');
  feedbackBlock.style.display = 'block';
  if (isCorrect) {
    feedbackBlock.style.borderColor = 'var(--success)';
    feedbackBlock.style.background = 'rgba(16, 185, 129, 0.04)';
    feedbackBlock.innerHTML = `<span style="color: var(--success); font-weight: 800;">✓ Correct!</span><p style="margin: 4px 0 0 0; font-size: 0.85rem;">${q.explanation}</p>`;
    if (typeof playChronologyFeedbackTone === 'function') playChronologyFeedbackTone(true);
    
    // XP gain
    appState.userXP += 50;
    localStorage.setItem("was_user_xp", appState.userXP);
    updateXPBadge();
  } else {
    feedbackBlock.style.borderColor = 'var(--error)';
    feedbackBlock.style.background = 'rgba(239, 68, 68, 0.04)';
    feedbackBlock.innerHTML = `<span style="color: var(--error); font-weight: 800;">✗ Incorrect.</span><p style="margin: 4px 0 0 0; font-size: 0.85rem;">The correct answer is: <strong>${q.answer}</strong>.<br>${q.explanation}</p>`;
    if (typeof playChronologyFeedbackTone === 'function') playChronologyFeedbackTone(false);
  }
  
  const submitBtn = document.getElementById('quickQuizSubmitBtn');
  if (quickQuizState.currentQuestionIndex < quizData.length - 1) {
    submitBtn.innerHTML = 'Next Question <i class="fa-solid fa-arrow-right"></i>';
    submitBtn.setAttribute('onclick', 'window.nextQuickQuizQuestion()');
  } else {
    submitBtn.innerHTML = 'Quiz Completed! 🎉';
    submitBtn.disabled = true;
  }
};

window.nextQuickQuizQuestion = function() {
  quickQuizState.currentQuestionIndex++;
  quickQuizState.selectedAnswer = null;
  quickQuizState.isSubmitted = false;
  window.renderLessonQuickQuiz();
};

window.renderLessonQuickQuiz = function() {
  const container = document.getElementById('quickQuizQuestionContainer');
  if (!container) return;
  
  const q = quizData[quickQuizState.currentQuestionIndex];
  if (!q) return;
  
  const options = [q.answer, ...q.distractors];
  
  let optionsHtml = '';
  options.forEach((opt, idx) => {
    optionsHtml += `<button class="quick-quiz-option-btn" data-val="${opt.replace(/"/g, '&quot;')}" onclick="window.selectQuickQuizOption(${idx})" style="display: block; width: 100%; text-align: left; padding: 10px 14px; margin-bottom: 8px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); background: var(--bg-surface); font-family: var(--font-body); font-size: 0.9rem; cursor: pointer; transition: all 0.2s;">
      ${opt}
    </button>`;
  });
  
  container.innerHTML = `
    <div style="font-size: 0.95rem; font-weight: 700; margin-bottom: 12px; font-family: var(--font-title);">
      Question ${quickQuizState.currentQuestionIndex + 1} of ${quizData.length}:
      <span style="font-weight: 500; font-family: var(--font-body); display: block; margin-top: 6px;">${q.question}</span>
    </div>
    
    <div style="margin-bottom: 16px;">
      ${optionsHtml}
    </div>
    
    <div id="quickQuizFeedback" style="display: none; padding: 10px 14px; border-left: 4px solid; border-radius: var(--radius-sm); margin-bottom: 16px; font-family: var(--font-body);"></div>
    
    <button class="btn btn-primary" id="quickQuizSubmitBtn" onclick="window.submitQuickQuizAnswer()" disabled style="width: 100%;">
      Submit Answer
    </button>`;
};

// ==========================================
// SEND SUPPORT: TEXT-TO-SPEECH READ ALOUD
// ==========================================

let readAloudState = {
  isSpeaking: false,
  utterances: [],
  currentIndex: 0,
  blocks: []
};

window.toggleReadAloud = function(event) {
  const btn = event.currentTarget || document.getElementById('readAloudBtn');
  if (!btn) return;
  
  if (readAloudState.isSpeaking) {
    window.speechSynthesis.cancel();
    readAloudState.isSpeaking = false;
    btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Listen';
    btn.style.background = 'rgba(var(--primary-rgb), 0.05)';
    
    readAloudState.blocks.forEach(block => {
      block.style.background = 'transparent';
      block.style.boxShadow = 'none';
    });
  } else {
    readAloudState.blocks = Array.from(document.querySelectorAll('.narrative-para-block'));
    if (readAloudState.blocks.length === 0) return;
    
    readAloudState.isSpeaking = true;
    readAloudState.currentIndex = 0;
    btn.innerHTML = '<i class="fa-solid fa-circle-stop"></i> Stop';
    btn.style.background = 'rgba(239, 68, 68, 0.1)';
    
    speakCurrentBlock(btn);
  }
};

function speakCurrentBlock(btn) {
  if (!readAloudState.isSpeaking || readAloudState.currentIndex >= readAloudState.blocks.length) {
    readAloudState.isSpeaking = false;
    if (btn) {
      btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Listen';
      btn.style.background = 'rgba(var(--primary-rgb), 0.05)';
    }
    readAloudState.blocks.forEach(block => {
      block.style.background = 'transparent';
      block.style.boxShadow = 'none';
    });
    return;
  }
  
  readAloudState.blocks.forEach((block, idx) => {
    if (idx === readAloudState.currentIndex) {
      block.style.background = 'rgba(234, 179, 8, 0.12)';
      block.style.boxShadow = '0 0 0 4px rgba(234, 179, 8, 0.05)';
      block.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      block.style.background = 'transparent';
      block.style.boxShadow = 'none';
    }
  });
  
  const textToSpeak = readAloudState.blocks[readAloudState.currentIndex].textContent;
  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  
  // High-quality voice selection
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => 
    v.name.includes('Google US English') || 
    v.name.includes('Google UK English Female') || 
    v.name.includes('Microsoft Zira') || 
    v.name.toLowerCase().includes('female')
  );
  if (preferredVoice) utterance.voice = preferredVoice;
  
  utterance.onend = function() {
    readAloudState.currentIndex++;
    speakCurrentBlock(btn);
  };
  
  utterance.onerror = function() {
    readAloudState.isSpeaking = false;
    btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Listen';
    btn.style.background = 'rgba(var(--primary-rgb), 0.05)';
    readAloudState.blocks.forEach(block => {
      block.style.background = 'transparent';
      block.style.boxShadow = 'none';
    });
  };
  
  window.speechSynthesis.speak(utterance);
}

// Cancel speech if tab is switched
const prevNavTabs = document.querySelectorAll(".nav-tab");
prevNavTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    if (readAloudState.isSpeaking) {
      window.speechSynthesis.cancel();
      readAloudState.isSpeaking = false;
      const btn = document.getElementById('readAloudBtn');
      if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Listen';
        btn.style.background = 'rgba(var(--primary-rgb), 0.05)';
      }
      readAloudState.blocks.forEach(block => {
        block.style.background = 'transparent';
        block.style.boxShadow = 'none';
      });
    }
  });
});

// ==========================================
// SEND SUPPORT: TEXT SIMPLIFIER
// ==========================================

let isSimplifiedActive = false;

window.toggleSimplifyText = function(event) {
  const btn = event.currentTarget || document.getElementById('simplifyTextBtn');
  const standardBlock = document.getElementById('standardNarrativeBlock');
  const simplifiedBlock = document.getElementById('simplifiedNarrativeBlock');
  if (!btn || !standardBlock || !simplifiedBlock) return;

  isSimplifiedActive = !isSimplifiedActive;

  if (isSimplifiedActive) {
    standardBlock.style.display = 'none';
    simplifiedBlock.style.display = 'block';
    btn.innerHTML = '<i class="fa-solid fa-expand"></i> Standard Text';
    btn.style.background = 'rgba(var(--primary-rgb), 0.12)';
  } else {
    standardBlock.style.display = 'block';
    simplifiedBlock.style.display = 'none';
    btn.innerHTML = '<i class="fa-solid fa-compress"></i> Simplify Text';
    btn.style.background = 'rgba(var(--primary-rgb), 0.05)';
  }

  if (typeof window.toggleReadAloud === 'function' && readAloudState.isSpeaking) {
    window.toggleReadAloud();
  }
};

// Intercept window.switchActiveLesson to auto-render quiz
const prevSwitch = window.switchActiveLesson;
window.switchActiveLesson = function(lessonNum) {
  if (typeof prevSwitch === 'function') prevSwitch(lessonNum);
  setTimeout(() => {
    window.renderLessonQuickQuiz();
  }, 150);
};

// Also trigger on first load
setTimeout(() => {
  window.renderLessonQuickQuiz();
}, 500);
