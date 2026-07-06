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
    "question": "Why was digging cesspits in the Iron Age a hygienic way to manage waste?",
    "answer": "Roundhouse settlements were spread out and temporary pits kept waste away from springs",
    "distractors": [
      "Waste was collected daily by town sweepers and recycled as crop fertilizer",
      "Roman military engineers oversaw the cleaning of public clay sewers",
      "Peasants built stone-lined channels to sweep waste directly into clean rivers"
    ],
    "explanation": "Because farming roundhouses were spread out, digging localized, temporary cesspits was safe and prevented pollution of fresh water."
  },
  {
    "question": "What technology did Roman engineers use to bring fresh water over miles into British towns?",
    "answer": "Stone channels called conduits that utilized the natural pull of gravity",
    "distractors": [
      "Cast-iron pumps driven by high-pressure steam power",
      "Deep underground wells equipped with wooden hand windlasses",
      "Large clay pipes carrying water driven by electric siphons"
    ],
    "explanation": "Roman engineers constructed stone conduits that used gravity to transport fresh spring water into urban centers."
  },
  {
    "question": "Where sat Roman soldiers side-by-side over water-flushed latrine channels?",
    "answer": "Housesteads Fort on Hadrian's Wall",
    "distractors": [
      "Silchester farming roundhouse village",
      "Bearsden public bathing sequence",
      "Fareham chimney sweep academy"
    ],
    "explanation": "At Housesteads Fort, soldiers sat over deep, stone-lined channels flushed constantly by a stream of water."
  },
  {
    "question": "What did Roman soldiers use to wipe themselves in communal latrines?",
    "answer": "A wet sponge attached to the end of a shared wooden stick",
    "distractors": [
      "Bundles of dried straw or coarse wool",
      "High-pressure water jets and linen towels",
      "Broad green leaves gathered from local woods"
    ],
    "explanation": "Roman soldiers used a shared sponge on a stick, kept wet in the running latrine water."
  },
  {
    "question": "What did Roman bathers experience inside a bathhouse like Bearsden?",
    "answer": "Washing in sequence through cold, warm, and hot rooms",
    "distractors": [
      "Swimming in deep reservoirs filled with rainwater",
      "Paying water sellers to pour buckets of cold river water over them",
      "Sitting in a single room with a fireplace"
    ],
    "explanation": "Bathers washed in sequence through unheated, warm, and steaming hot chambers."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { timelineData, quizData };
}
