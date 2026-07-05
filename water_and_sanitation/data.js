// Water and Sanitation Through Time Revision App Dataset
const timelineData = [
  {
    "id": "kt1-1",
    "section": "Lesson 1",
    "topic": "Water and Sanitation Through Time",
    "title": "Prehistoric and Roman Sanitation",
    "events": [
      {
        "subtitle": "Society and Government in the Iron Age",
        "text": "Long before modern indoor plumbing existed, the inhabitants of prehistoric Britain had to find clever ways to secure drinking water and dispose of human waste. During the British Iron Age (700 BC - AD 43), most people lived in roundhouse farming settlements like Silchester. They dug basic earthen cesspits for waste, and covered them over with soil once filled.",
        "dates": ["700 BC"],
        "names": ["Iron Age Britons"],
        "stats": ["Cesspit pits", "Roundhouse settlements"],
        "tags": ["Prehistoric", "Sanitation"],
        "significance": "Waste disposal was localized and primitive, requiring new trenches to be dug constantly."
      },
      {
        "subtitle": "Roman Conduits & Water Supply",
        "text": "The arrival of the Roman Empire in AD 43 completely transformed the British landscape. Roman engineers constructed massive stone channels called conduits. These conduits used gravity to carry clean water over vast distances directly into urban centres and military fortresses like Corbridge.",
        "dates": ["AD 43"],
        "names": ["Roman Engineers"],
        "stats": ["Gravity conduits"],
        "tags": ["Roman", "Engineering"],
        "significance": "Introduced the first centralized public utilities, bringing running water directly to towns."
      },
      {
        "subtitle": "Bathhouses and Latrines",
        "text": "In Roman towns, clean water fed public bathhouses (like Bearsden) and communal toilets called latrines. At military sites like Housesteads Fort on Hadrian's Wall, soldiers sat above deep channels where running water constantly flushed waste away into underground sewers.",
        "dates": ["AD 62"],
        "names": ["Seneca the Younger"],
        "stats": ["Bathhouses", "Latrines"],
        "tags": ["Roman", "Hygiene"],
        "significance": "Maintained sanitation and hygiene in crowded military and urban centers."
      },
      {
        "subtitle": "The Roman Withdrawal",
        "text": "When the Romans withdrew around AD 410, much of this advanced engineering was abandoned. Britain's sanitation slipped back into primitive patterns for centuries.",
        "dates": ["AD 410"],
        "names": ["Roman Legionaries"],
        "stats": ["Sanitation collapse"],
        "tags": ["Migration", "Decline"],
        "significance": "Marked a major technological decline in public health and sanitation services."
      }
    ]
  }
];

const quizData = [
  {
    "id": "q1",
    "question": "During which historical period did people in Britain use simple earthen holes called cesspits for waste disposal?",
    "answer": "The Iron Age",
    "distractors": ["The Roman Period", "The Victorian Era", "The Bronze Age"],
    "explanation": "Earthen holes called cesspits were standard during the Iron Age in Britain, dug and covered over once full."
  },
  {
    "id": "q2",
    "question": "Why do historians rely on archaeologists to understand sanitation in Iron Age Britain?",
    "answer": "There are no surviving written records from the Iron Age.",
    "distractors": ["Iron Age people only used stone tools which did not decay.", "Roman written records about the Iron Age were all destroyed in a fire.", "Iron Age people lived underground."],
    "explanation": "Since there are no written accounts from Iron Age Britain, excavation and material archaeology are the only ways to study their habits."
  },
  {
    "id": "q3",
    "question": "What were the stone channels built by Roman engineers to transport clean water over long distances called?",
    "answer": "Conduits",
    "distractors": ["Cesspits", "Latrines", "Aqueducts"],
    "explanation": "Conduits were stone channels engineered by the Romans to transport fresh spring water into fortresses and towns using gravity."
  },
  {
    "id": "q4",
    "question": "Which Roman military fort on Hadrian's Wall contains the remains of a public latrine block flushed by running water?",
    "answer": "Housesteads Fort",
    "distractors": ["Bearsden Fort", "Silchester Fort", "Corbridge Fort"],
    "explanation": "Housesteads Fort contains well-preserved remains of a Roman military latrine flushed by running water channels."
  },
  {
    "id": "q5",
    "question": "What happened to Britain's advanced Roman sanitation systems after the Romans withdrew around AD 410?",
    "answer": "The systems fell into disrepair and were abandoned.",
    "distractors": ["They were expanded by Anglo-Saxon engineers.", "They were purchased by private water companies.", "They were preserved exactly as they were."],
    "explanation": "Following the Roman withdrawal in AD 410, advanced sanitation systems were abandoned, and Britain returned to simpler, localized methods."
  }
];

const examData = {};
const elizabethanWheelData = { questions: [] };
const officialPastPapers = [];
const causationWebData = [];
const blurtingData = [
  {
    "lessonId": 1,
    "title": "Lesson 1: Prehistoric and Roman Sanitation",
    "facts": [
      {
        "keywords": ["cesspits", "Iron Age", "Silchester"],
        "fact": "During the British Iron Age, families disposed of waste in earthen holes called cesspits."
      },
      {
        "keywords": ["conduits", "gravity", "Roman"],
        "fact": "Roman engineers built stone conduits to transport clean water over long distances using gravity."
      },
      {
        "keywords": ["latrines", "Bearsden", "Housesteads Fort"],
        "fact": "Water flushed communal toilets called latrines, sweeping waste into sewers at Housesteads Fort."
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { timelineData, quizData, examData, elizabethanWheelData, officialPastPapers, causationWebData, blurtingData };
}
