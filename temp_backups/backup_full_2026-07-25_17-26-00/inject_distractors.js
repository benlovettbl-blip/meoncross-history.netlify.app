const fs = require('fs');

const distractorsMap = {
  "What technology did Roman engineers use to bring fresh water over miles into British towns?": [
    "Stone channels called conduits that utilized the natural pull of gravity",
    "Underground lead pipes powered by early steam engines",
    "Wooden buckets carried by slaves from local rivers",
    "Deep boreholes drilled directly into the chalk"
  ],
  "Where sat Roman soldiers side-by-side over water-flushed latrine channels?": [
    "Housesteads Fort on Hadrian's Wall",
    "The Colosseum in Rome",
    "Fishbourne Roman Palace",
    "The Tower of London"
  ],
  "What did Roman soldiers use to wipe themselves in communal latrines?": [
    "A wet sponge attached to the end of a shared wooden stick",
    "Pieces of imported Egyptian papyrus",
    "Smooth stones from the nearby riverbed",
    "Leaves collected from the surrounding forests"
  ],
  "What did Roman bathers experience inside a bathhouse like Bearsden?": [
    "Washing in sequence through cold, warm, and hot rooms",
    "Swimming in a single large unheated outdoor pool",
    "Taking individual private baths in their own cubicles",
    "Being washed with soap and hot towels by attendants"
  ],
  "What is a famous Roman bath complex located in Somerset, England?": [
    "Aquae Sulis (Bath)",
    "Londinium (London)",
    "Eboracum (York)",
    "Venta Belgarum (Winchester)"
  ],
  "What is a 'hypocaust' in Roman architecture?": [
    "An underfloor heating system used in bathhouses",
    "A large public fountain in the town square",
    "A type of curved roof tile to collect rainwater",
    "A communal toilet block"
  ],
  "What were Roman public toilets called?": [
    "Latrines",
    "Garderobes",
    "Privies",
    "Water Closets"
  ],
  "What Roman philosopher complained about the noise in a public bathhouse?": [
    "Seneca the Younger",
    "Marcus Aurelius",
    "Julius Caesar",
    "Pliny the Elder"
  ],
  "How did early Iron Age Britons dispose of waste safely?": [
    "By digging simple cesspits in spread-out roundhouse settlements",
    "By throwing it into the nearest river",
    "By building advanced underground sewer networks",
    "By burning all waste in large communal fires"
  ],
  "Why was Iron Age waste disposal effective?": [
    "Low population density meant waste didn't contaminate water supplies",
    "They used special chemicals to neutralize the waste",
    "They had natural immunity to waterborne diseases",
    "They boiled all their drinking water"
  ],
  "Why did medieval villages like Wharram Percy avoid major public health crises despite using simple cesspits?": [
    "The low population density meant waste did not build up enough to contaminate water supplies",
    "They had advanced medicine to treat diseases",
    "They built deep sewers underneath the village",
    "They only drank imported wine and ale"
  ],
  "On the twelfth-century plans of Canterbury Priory, what did the red lines represent?": [
    "Pipes carrying dirty waste water away to flush the toilets",
    "Fresh water pipes bringing drinking water from springs",
    "The paths of the monks to the church",
    "Boundary lines of the monastery property"
  ],
  "How did poorer townspeople get their fresh water if they did not own a private well?": [
    "They bought it from water sellers who hauled river water in barrels",
    "They collected rainwater in buckets",
    "They had piped water delivered directly to their homes",
    "They walked to the nearest monastery to use their fountains"
  ],
  "What material did archaeologists discover in medieval cesspits that shows how villagers wiped themselves?": [
    "Wild moss",
    "Toilet paper",
    "Sponges on sticks",
    "Old rags"
  ],
  "Why did medieval 'gongfermers' perform their job exclusively under the cover of darkness?": [
    "To avoid disrupting the busy town streets with terrible smells and waste carts",
    "Because it was illegal to do the work during the day",
    "To hide their valuable findings from other people",
    "Because the heat of the day made the waste too dangerous to handle"
  ],
  "What was the term for a medieval toilet, meaning 'wardrobe'?": [
    "Garderobe",
    "Latrine",
    "Privy",
    "Water Closet"
  ],
  "Where did garderobes in castles usually empty their waste?": [
    "Directly into the moat or a cesspit at the base of the wall",
    "Into a complex underground sewer system",
    "Into buckets that were emptied by servants daily",
    "Into a nearby river"
  ],
  "What organization in medieval times had the best access to clean piped water?": [
    "Monasteries and Priories",
    "Town Councils",
    "The Royal Palaces",
    "Merchant Guilds"
  ],
  "Who was employed to clean out medieval cesspits?": [
    "Gongfermers (or Gong Farmers)",
    "Nightmen",
    "Scavengers",
    "Sweepers"
  ],
  "What was the main source of water for early medieval towns before pipes were common?": [
    "Rivers, streams, and local wells",
    "Rainwater collected from roofs",
    "Deep artesian wells",
    "Aqueducts left over from Roman times"
  ],
  "Why did London's sanitation problems get worse during the Early Modern period?": [
    "The population grew rapidly, putting too much pressure on crowded town systems",
    "People forgot how to build cesspits",
    "The climate became hotter, causing more diseases",
    "There was a prolonged drought that dried up the rivers"
  ],
  "Which famous seventeenth-century Londoner wrote about his cellar being flooded by his neighbor's toilet waste?": [
    "Samuel Pepys",
    "William Shakespeare",
    "John Evelyn",
    "Christopher Wren"
  ],
  "Who invented the first water closet (flushing toilet) in Britain in 1596?": [
    "Sir John Harington",
    "Thomas Crapper",
    "Joseph Bazalgette",
    "Alexander Cumming"
  ],
  "Why was the 1596 flushing toilet not used by ordinary citizens?": [
    "Houses lacked running piped water and connections to street sewers",
    "It was too expensive to manufacture",
    "It was banned by the King",
    "People preferred to use traditional chamber pots"
  ],
  "What was a 'water seller's' job in an Early Modern town?": [
    "Transporting river water in large barrels on horseback to sell to homes",
    "Selling bottled mineral water from natural springs",
    "Maintaining the public conduits and fountains",
    "Digging new wells for wealthy citizens"
  ],
  "Who constructed the New River to bring fresh water to London?": [
    "Sir Hugh Myddelton",
    "Joseph Bazalgette",
    "Edwin Chadwick",
    "Isambard Kingdom Brunel"
  ],
  "In what year was the New River completed?": [
    "1613",
    "1596",
    "1666",
    "1750"
  ],
  "What were Early Modern 'conduits'?": [
    "Public water fountains where citizens could collect fresh water",
    "Underground sewers carrying waste to the river",
    "Wooden pipes carrying water to individual houses",
    "Large reservoirs storing water for the city"
  ],
  "Why did Samuel Pepys' cellar flood with waste?": [
    "His neighbor's cesspit overflowed directly into it",
    "The River Thames burst its banks",
    "A public sewer pipe broke outside his house",
    "He forgot to empty his own chamber pots"
  ],
  "What was a major consequence of overcrowded towns in the Early Modern period?": [
    "Cesspits overflowed and contaminated drinking water supplies",
    "People moved back to the countryside in large numbers",
    "The government banned new houses from being built",
    "Towns began to build modern sewer networks"
  ],
  "By how much did Britain's population grow during the century of industrialisation (1750–1850)?": [
    "It skyrocketed from 6 million to 21 million",
    "It doubled from 5 million to 10 million",
    "It remained relatively stable around 8 million",
    "It quadrupled from 2 million to 8 million"
  ],
  "How did working-class families living in terraced yards usually obtain their water?": [
    "From a shared pump in the street or yard that only ran for a few hours",
    "From a private tap inside their own house",
    "By walking to the nearest river to collect it",
    "From a water seller who came to their door every day"
  ],
  "What was the terrifying waterborne disease that first struck Britain in 1831, killing 31,000 people?": [
    "Cholera",
    "The Black Death",
    "Typhoid",
    "Dysentery"
  ],
  "What scientific theory did Victorian doctors believe in before they understood that cholera was spread by dirty water?": [
    "Miasma Theory (the belief that disease is spread by bad smells)",
    "Germ Theory (the belief that microscopic organisms cause disease)",
    "The Four Humours Theory",
    "The Spontaneous Generation Theory"
  ],
  "Why did cesspits under shared yard privies frequently overflow in industrial cities?": [
    "Landlords refused to pay for them to be emptied, and they were not connected to sewers",
    "There were no gongfermers left to empty them",
    "The cesspits were built too small for the houses",
    "Heavy rainfall constantly flooded the yards"
  ],
  "What was a 'back-to-back' house?": [
    "Cheap, crowded industrial housing with shared privies and no back gardens",
    "A large house split into two separate flats",
    "A house built directly against a factory wall",
    "A house with a front garden but no back garden"
  ],
  "Who published the 1842 Report on the Sanitary Condition of the Labouring Population?": [
    "Edwin Chadwick",
    "John Snow",
    "Joseph Bazalgette",
    "Robert Rawlinson"
  ],
  "What act was passed in 1848 as a result of Chadwick's report?": [
    "The Public Health Act 1848",
    "The Factory Act 1848",
    "The Poor Law Amendment Act",
    "The Sanitary Act 1866"
  ],
  "What was the main problem with the 1848 Public Health Act?": [
    "It was not compulsory, so many towns ignored it to save money",
    "It did not apply to London",
    "It only focused on cleaning the streets, not the water supply",
    "It was too expensive for the government to enforce"
  ],
  "What was the primary symptom of Cholera?": [
    "Severe diarrhea, dehydration, and blue skin",
    "A high fever and a red rash",
    "Coughing up blood and chest pains",
    "Swollen lymph nodes in the armpits and groin"
  ],
  "How did John Snow stop the Soho cholera outbreak of 1854?": [
    "He persuaded the local parish to remove the Broad Street pump handle",
    "He boiled all the water in the local area",
    "He ordered the streets to be cleaned of all rubbish",
    "He gave the local residents a new medicine he invented"
  ],
  "What event in the summer of 1858 finally forced politicians to fund London's sewer network?": [
    "The Great Stink of the River Thames",
    "A massive outbreak of cholera in Parliament",
    "The publication of John Snow's map",
    "A petition signed by 100,000 Londoners"
  ],
  "Which French scientist proved 'Germ Theory' in 1860, showing that microscopic organisms cause disease?": [
    "Louis Pasteur",
    "Robert Koch",
    "Alexander Fleming",
    "Edward Jenner"
  ],
  "What did the landmark 1875 Public Health Act force local councils to do?": [
    "Ensure all houses had piped clean water and proper sewer connections",
    "Provide free medical care to all citizens",
    "Build a hospital in every town",
    "Ban back-to-back housing completely"
  ],
  "How many miles of brick sewers did Joseph Bazalgette construct beneath London?": [
    "1,300 miles",
    "500 miles",
    "100 miles",
    "3,000 miles"
  ],
  "What was Joseph Bazalgette's profession?": [
    "Civil Engineer",
    "Doctor",
    "Politician",
    "Scientist"
  ],
  "What modern facility replaced the old, unhygienic shared privies by the late 19th century?": [
    "Flushing toilets connected to Bazalgette's sewer system",
    "Indoor chemical toilets",
    "Deep cesspits lined with concrete",
    "Public bathhouses with integrated toilets"
  ],
  "What happened to the River Thames during the Great Stink?": [
    "The river level dropped during a heatwave, exposing rotting sewage",
    "The river froze over, trapping all the waste",
    "The river flooded, washing sewage into the streets",
    "The river turned completely black from factory pollution"
  ],
  "Why did Parliament suddenly care about the Great Stink?": [
    "The smell was so terrible it reached the Houses of Parliament",
    "Queen Victoria complained about it",
    "They realized it was causing cholera",
    "The newspapers started blaming them for it"
  ],
  "How did John Snow map the 1854 Cholera outbreak?": [
    "He mapped the deaths and noticed they clustered around the Broad Street pump",
    "He mapped the sewers to find where they were leaking",
    "He mapped the factories to see which ones were polluting the air",
    "He mapped the poor areas to show where the disease was worst"
  ]
};

let content = fs.readFileSync('water_and_sanitation/data.js', 'utf8');
const jsonStr = content.replace('export const unitData = ', '').replace(/;\s*$/, '');
let data = JSON.parse(jsonStr);

// Apply options to the quiz pack
data.quizPack.forEach(q => {
  if (distractorsMap[q.q]) {
    q.options = distractorsMap[q.q]; // Ensure the first is the correct answer
  } else {
    // Fallback if missing
    q.options = [
      q.a,
      "A completely incorrect statement regarding this topic",
      "A partially correct but flawed assumption",
      "A common historical misconception"
    ];
  }
});

fs.writeFileSync('water_and_sanitation/data.js', 'export const unitData = ' + JSON.stringify(data, null, 2) + ';');
console.log('Successfully injected clever distractors into quizPack.');
