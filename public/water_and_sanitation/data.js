// Water and Sanitation Through Time Revision App Dataset
const timelineData = [
  {
    "id": "kt1-1",
    "section": "Lesson 1",
    "topic": "Water and Sanitation Through Time",
    "title": "Prehistoric and Roman Sanitation",
    "events": [
      {
        "subtitle": "Iron Age Settlements & Cesspits",
        "text": "It is easy to assume that people in the past did not care about cleanliness, but Iron Age communities developed highly practical systems that suited their way of life. Because farming roundhouses were spread out across the countryside, digging simple, temporary cesspits was a safe, hygienic, and sustainable way to manage waste without polluting nearby drinking water. During the British Iron Age (700 BC - AD 43), most families lived in circular wooden homes called roundhouses, such as those discovered by archaeologists at Silchester. Because the people of this era left no written documents behind, historians must rely on physical clues unearthed from the ground—a field of study known as archaeology. These physical discoveries show that Iron Age communities intentionally built their settlements near fresh springs, streams, or hand-dug wells to secure their daily water supply.",
        "dates": ["700 BC"],
        "names": ["Iron Age Britons"],
        "stats": ["Cesspit pits", "Roundhouse settlements"],
        "tags": ["Prehistoric", "Sanitation"],
        "significance": "Waste disposal was localized and primitive, requiring new trenches to be dug constantly."
      },
      {
        "subtitle": "Roman Conduits & Water Supply",
        "text": "This simple way of life was completely transformed in AD 43 when the Roman Empire invaded Britain. The Romans brought revolutionary sanitation technology and a strong belief that clean, flowing water was vital for keeping a society healthy. To bring vast amounts of clean water into their newly built stone towns and military outposts, such as Corbridge, Roman engineers constructed stone channels called conduits. These conduits used the natural pull of gravity to transport fresh water over miles from distant natural springs directly into urban centres.",
        "dates": ["AD 43"],
        "names": ["Roman Engineers"],
        "stats": ["Gravity conduits"],
        "tags": ["Roman", "Engineering"],
        "significance": "Introduced the first centralized public utilities, bringing running water directly to towns."
      },
      {
        "subtitle": "Bathhouses and Latrines",
        "text": "In Roman Britain, this water supplied grand public bathhouses, such as the famous complex at Bearsden. Bathhouses were bustling social spaces where citizens exercised, relaxed, and washed themselves by walking in sequence through cold rooms, warm rooms, and steaming hot chambers. Clean water also constantly flushed through communal public toilets, known as latrines. At Housesteads Fort on Hadrian's Wall, soldiers sat side-by-side on stone benches built over deep, stone-lined channels. A continuous stream of water beneath the seats swept human waste directly into underground sewers, keeping the fort clean and preventing the spread of deadly diseases. To wipe themselves, Roman soldiers used a wet sponge attached to the end of a shared wooden stick.",
        "dates": ["AD 62"],
        "names": ["Seneca the Younger"],
        "stats": ["Bathhouses", "Latrines"],
        "tags": ["Roman", "Hygiene"],
        "significance": "Maintained sanitation and hygiene in crowded military and urban centers."
      },
      {
        "subtitle": "The Roman Withdrawal",
        "text": "When the Romans finally left Britain around AD 410, much of this advanced engineering was abandoned, and sanitation slipped back into primitive patterns for centuries.",
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
    "question": "Why do historians rely on archaeology to study sanitation in Iron Age Britain?",
    "answer": "There are no surviving written records from Iron Age Britain.",
    "distractors": ["Iron Age people lived entirely underground in caves.", "Roman invaders destroyed all the books written by Iron Age people.", "Iron Age people only used stone tools."],
    "explanation": "Since there are no written accounts from Iron Age Britain, excavation and material archaeology are the only ways to study their habits."
  },
  {
    "id": "q2",
    "question": "How did Iron Age people manage their cesspits once they became full?",
    "answer": "They covered them with soil and dug a new pit nearby.",
    "distractors": ["They used lead pipes to flush the waste into local rivers.", "They hired specialized gongfermers to empty them.", "They set them on fire."],
    "explanation": "Simple, temporary cesspits were buried with soil when full, and a new trench was dug nearby."
  },
  {
    "id": "q3",
    "question": "What engineering method did Roman conduits use to transport fresh water over miles?",
    "answer": "Gravity pulling water down a slight slope",
    "distractors": ["Underground steam-powered pressure pumps", "Hand-operated wooden waterwheels", "Electric water pumps"],
    "explanation": "Conduits were sloped channels that relied on the natural pull of gravity to move water over long distances."
  },
  {
    "id": "q4",
    "question": "Which Roman fort along Hadrian's Wall contains the archaeological remains of a flushing communal latrine?",
    "answer": "Housesteads Fort",
    "distractors": ["Bearsden Fort", "Silchester Fort", "Corbridge Fort"],
    "explanation": "Housesteads Fort contains well-preserved remains of a Roman military latrine flushed by running water channels."
  },
  {
    "id": "q5",
    "question": "What did Roman bathers experience inside a bathhouse like Bearsden?",
    "answer": "Washing in sequence through cold, warm, and hot rooms",
    "distractors": ["Swimming in deep reservoirs filled with rainwater", "Paying water sellers to pour buckets of cold river water over them", "Sitting in a single room with a fireplace"],
    "explanation": "Bathers washed in sequence through unheated, warm, and steaming hot chambers."
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
