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
      const targetEl = document.getElementById(targetId); if (targetEl) targetEl.classList.add("active");
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
  if (timelineSearchInput) timelineSearchInput.addEventListener("input", (e) => {
    appState.timelineSearchQuery = e.target.value.toLowerCase().trim();
    renderTimeline();
  });

  // Filter button handlers
  if (filterTags) filterTags.forEach(tag => {
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
    desc: "An outstan