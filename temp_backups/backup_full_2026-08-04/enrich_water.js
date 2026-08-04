const fs = require('fs');

const wsPath = './public/data/water_and_sanitation.json';
let ws = JSON.parse(fs.readFileSync(wsPath, 'utf8'));

// Lesson 2 replacements
const l2_blocks = [
  {
    text: "In rural villages, such as Wharram Percy in Yorkshire, ordinary peasants lived simple lives intimately tied to the changing seasons and the natural landscape. Securing clean water was a daily physical struggle that required backbreaking labor. Without any form of indoor plumbing, villagers had to collect their drinking and washing water by hand, carrying heavy wooden buckets from local springs, fast-flowing streams, or deep hand-dug communal wells. For their sanitation needs, peasants constructed rudimentary wooden outhouses situated over shallow earth pits at the bottom of their gardens, using handfuls of wild moss or leaves as natural toilet paper. Because medieval villages were small, sparsely populated, and surrounded by vast tracts of open land, these simple cesspits were highly practical. The natural soil effectively absorbed and filtered the waste, ensuring that it did not contaminate the local water supply or trigger major health crises.",
    level_4: "In rural villages, peasants lived simple lives connected to the land. To get water, they collected it by hand from local springs or streams. Since they had no indoor toilets, peasants built small wooden outhouses over earth holes in their gardens, using moss as toilet paper. Because villages were small and spread out, these simple cesspits worked well and did not cause health crises."
  },
  {
    text: "In stark contrast to the rustic simplicity of peasant villages, medieval monasteries were the absolute pinnacle of luxury and engineering sophistication in Medieval England. Christian monks were highly literate, exceptionally wealthy, and incredibly organized, managing vast agricultural estates. Crucially, they believed that physical cleanliness was a reflection of spiritual purity, bringing them closer to God and aiding their holy duties. Driven by this belief, monasteries designed and constructed highly complex water management systems using incredibly expensive imported lead and hollowed-out elm trunks for pipes. For example, surviving twelfth-century blueprints of Canterbury Priory reveal a sophisticated, gravity-fed network of green-colored pipes bringing fresh, pressurized spring water directly into the monastery for drinking and ceremonial washing. Meanwhile, a separate network of red-colored pipes was specifically designed to direct dirty wastewater away to continuously flush the communal latrines, keeping the air remarkably fresh.",
    level_4: "In stark contrast, medieval monasteries were the pinnacle of engineering luxury. Monks were highly literate, wealthy, and organized. Because they believed that cleanliness brought them closer to God, monasteries designed complex water systems using expensive lead pipes. For example, twelfth-century blueprints of Canterbury Priory show a network of green pipes bringing fresh water in, and red pipes directing dirty waste water away to flush the latrines."
  },
  {
    text: "The most severe and lethal sanitation crises of the era occurred in the rapidly growing and heavily overcrowded medieval towns, such as London and York. The high population density meant that thousands of people were crammed into tightly packed wooden houses lining narrow, unpaved streets. In these conditions, shared communal toilets overflowed rapidly, leaking raw human waste directly into the mud of the streets and seeping into nearby shallow wells. While wealthy merchants could afford to dig deep, private, stone-lined wells in their secure courtyards, poorer citizens faced a daily battle for clean water. They were often forced to buy expensive, unfiltered river water from professional 'water sellers'—laborers who hauled massive wooden barrels through the filthy streets on horseback, shouting to attract customers.",
    level_4: "The most severe sanitation crises occurred in rapidly growing medieval towns. High population density meant shared toilets overflowed easily, leaking human waste into the streets and nearby wells. While wealthy merchants had private wells, poorer citizens had to buy dirty river water from 'water sellers' who hauled barrels through the streets on horseback."
  },
  {
    text: "To prevent these rapidly expanding towns from literally drowning in their own filth, city councils were forced to employ highly specialized, well-paid laborers known as 'gongfermers.' These men performed one of the most vital, yet utterly revolting, jobs in medieval society. Working strictly under the cover of darkness to avoid offending the public with the smell, gongfermers climbed down into deep, barrel-lined cesspits beneath public latrines and private homes. Armed only with wooden shovels and buckets, they scooped out the accumulated human waste, loaded it onto heavy horse-drawn carts, and transported it outside the town walls to be dumped in designated rural fields, where it was often sold to local farmers as potent agricultural fertilizer.",
    level_4: "To keep towns from drowning in filth, councils employed specialized laborers called 'gongfermers.' Working strictly under the cover of night, these workers climbed into filthy, barrel-lined cesspits to shovel out human waste and cart it outside the town walls. They performed one of the most vital, yet utterly revolting, jobs in medieval society."
  },
  {
    text: "The situation in major cities became so desperate that even the monarchy was forced to intervene. In 1357, King Edward III personally sent a scathing letter to the Mayor of London, expressing his absolute horror at the state of the capital. The King warned that the overwhelming filth and decaying animal carcasses lying in the streets were infecting the air with a terrible stench, which medieval physicians believed was directly causing deadly sickness—a concept known as 'miasma'. Edward III ordered the immediate, forceful removal of all waste and the strict fining of anyone caught dumping garbage in the River Thames, marking a significant early instance of royal intervention to preserve public health.",
    level_4: "In 1357, King Edward III sent a letter to the Mayor of London warning that the filth lying in the streets was infecting the air and causing deadly sickness. He ordered the immediate removal of waste to preserve public health. This was an important early example of the royal government trying to improve sanitation."
  }
];

// Lesson 3 replacements
const l3_blocks = [
  {
    text: "The conceptual leap toward modern sanitation arrived during the Tudor period when the first flushing toilet—known as the water closet—was invented in 1596 by a brilliant but eccentric courtier named Sir John Harington. Harington designed and installed this mechanical marvel in his manor house, and later built a working model for his godmother, Queen Elizabeth I, at Richmond Palace. The device used a system of valves and a cistern of water to wash away human waste into a vault below. Yet, despite its ingenuity, almost no one adopted it. For a flushing toilet to function safely, a house required a constant, pressurized supply of running water to fill the cistern and a connection to a sprawling underground sewer system to wash the waste away. Because Early Modern London completely lacked both of these municipal networks, Harington’s visionary invention remained a useless, foul-smelling luxury isolated to the royal court.",
    level_4: "The first flushing toilet—the water closet—was invented in 1596 by a courtier named Sir John Harington for his godmother, Queen Elizabeth I. Yet, almost no one used it. For a flushing toilet to function, a house needed a constant supply of pressurized, running water and a connection to a sewer system to wash the waste away. Early Modern London lacked these, making it a useless luxury."
  },
  {
    text: "However, monumental strides were being made in supplying the capital with fresh water. In 1613, a wealthy goldsmith and entrepreneur named Sir Hugh Myddelton successfully completed the 'New River' project. This was a colossal, highly ambitious engineering feat that involved digging an artificial waterway to bring fresh, clean spring water from Hertfordshire across 38 miles of countryside directly into North London. Relying entirely on gravity, the New River transformed the city's water infrastructure. It provided London with a relatively clean and reliable water supply to feed the houses of wealthy subscribers through an extensive network of hollowed-out wooden pipes laid beneath the city streets, vastly improving living standards for those who could afford the subscription fee.",
    level_4: "In 1613, the New River was opened, a massive engineering project that brought fresh spring water from Hertfordshire over 38 miles directly into North London using gravity. This project provided London with a clean water supply to feed the houses of wealthy subscribers through wooden pipes."
  },
  {
    text: "Despite the influx of fresh water, dealing with human waste remained a horrifying challenge in crowded 17th-century cities. To save space, many opportunistic landlords built indoor toilets known as 'houses of easement' that simply emptied directly into deep, unlined cellars immediately below the floorboards. In his world-famous diary entry on 20 October 1660, the wealthy government official Samuel Pepys recorded a disgusting reality of Early Modern urban life. He complained bitterly about the terrible, eye-watering stench of his neighbor's cellar privy, which had filled to bursting, leaked directly through the shared foundations, and completely flooded his own basement with raw human waste. It was a stark reminder that personal wealth could not protect citizens from the collective failure of urban sanitation.",
    level_4: "In crowded cities, many landlords built indoor toilets called 'houses of easement' which emptied directly into deep cellars below the floorboards. In his famous diary on 20 October 1660, the government official Samuel Pepys complained about the terrible stench of his neighbor's cellar privy leaking directly through the walls and flooding his own basement with waste."
  },
  {
    text: "By the year 1700, London's population had exploded to over 600,000, making it the largest city in Western Europe. Yet, the municipal systems to handle basic human needs completely failed to match this staggering, unprecedented growth. While the wealthy enjoyed piped water from the New River, poorer townspeople were left to struggle. They were forced to buy their drinking water from professional 'water sellers' who continued to haul large wooden barrels on horseback through the increasingly congested streets. Alternatively, women and children spent hours waiting in long, exhausting lines to gather a few precious buckets of water from public 'conduits'—communal lead cisterns that often ran dry during the hot summer months, leaving the poorest citizens vulnerable to thirst and disease.",
    level_4: "By 1700, London's population had exploded, yet municipal systems did not match this growth. Poorer townspeople still had to buy river water from water sellers who hauled large wooden barrels on horseback through the streets, or spend hours gathering water from public conduits."
  }
];

// Lesson 4 replacements
const l4_blocks = [
  {
    text: "Between 1750 and 1850, the Industrial Revolution triggered an unprecedented demographic explosion, causing Britain's population to skyrocket from roughly 6 million to over 21 million. Desperate for employment and a better life, thousands of rural agricultural families flooded into rapidly expanding, smoke-filled cities like Manchester, Leeds, and London to work in enormous steam-powered textile factories and deep coal mines. This resulted in an era of rapid, totally unregulated urbanization. Cities expanded so violently that local governments were entirely overwhelmed. Without any planning laws or building regulations, the sheer speed of this migration resulted in intense, suffocating crowding, transforming once-small market towns into sprawling industrial metropolises choked with soot and desperate workers.",
    level_4: "Between 1750 and 1850, Britain's population skyrocketed from 6 million to 21 million. Thousands of rural families flooded into expanding cities to work in steam-powered factories and coal mines. This resulted in rapid urbanization and intense crowding, as cities grew without any planning or rules."
  },
  {
    text: "To maximize their profits from this desperate influx of workers, opportunistic landlords hastily built cheap, structurally unsound 'back-to-back' terraced brick housing blocks. These rows of houses shared three walls with their neighbors, meaning they had no rear windows, absolutely zero cross-ventilation, and trapped the damp, polluted air inside. Crucially, these poorer families did not have the luxury of indoor running water or private toilets. Instead, entire streets of up to 100 people had to rely on a single, shared outdoor street pump and perhaps two communal privies located in a filthy shared yard. The street pumps only supplied water for a few unpredictable hours a day, and this water was often visibly brown, foul-tasting, and highly polluted by industrial runoff and human waste leaking from the adjacent privies.",
    level_4: "Landlords built cheap, back-to-back terraced brick housing blocks with shared yards. Poorer families did not have indoor running water, relying on shared street pumps which only supplied water for a few hours a day. This water was often brown and polluted by nearby overflowing toilets."
  },
  {
    text: "This catastrophic lack of sanitation created the perfect breeding ground for disease. Cholera, a terrifying and agonizing waterborne bacterial infection, struck Britain for the first time in 1831, having spread along global trade routes from India. The disease caused rapid, uncontrollable diarrhea and vomiting, leading to severe dehydration; victims' skin would turn a ghastly shade of blue before they died, often within 24 hours of showing the first symptoms. Over 31,000 people died in the horrifying first epidemic alone. Because doctors falsely believed the disease was spread by 'miasma'—bad, foul-smelling air—their attempts to fight it by burning tar in the streets were useless. The terrifying speed of the deaths triggered mass national panic and starkly highlighted the catastrophic, deadly failure of municipal public health.",
    level_4: "Cholera, a terrifying waterborne disease, struck Britain for the first time in 1831, causing rapid dehydration and death. Over 31,000 people died in the first epidemic. It triggered national panic and highlighted the failure of public health, as doctors falsely believed it was spread by bad smells (miasma)."
  },
  {
    text: "In response to the mounting death toll and public outcry, a dedicated civil servant named Edwin Chadwick launched a massive, pioneering investigation into the living conditions of the poor. In 1842, he published his landmark 'Report on the Sanitary Condition of the Labouring Population.' Using rigorous statistical data, Chadwick explicitly documented the horrific filth, suffocating damp, and overcrowded conditions of the industrial working class. He forcefully argued that poverty and disease were not caused by laziness, but by the horrific physical environment. Chadwick strongly advocated for a unified, national system of deep arterial drainage and a constant, pressurized supply of clean water to every home, laying the intellectual foundation for the modern public health movement.",
    level_4: "Poor Law Commissioner Edwin Chadwick published his landmark Report on the Sanitary Condition of the Labouring Population, documenting the filth, damp, and overcrowded conditions of the working class. He used statistics to prove that bad environments caused disease, advocating for better drainage and clean water."
  }
];

// Lesson 5 replacements
const l5_blocks = [
  {
    text: "For decades, the medical establishment stubbornly clung to the 'Miasma Theory,' believing that all diseases were spread by foul-smelling, invisible clouds of bad air. However, during the devastating 1854 cholera outbreak in the Soho district of London, a brilliant physician named Dr. John Snow fundamentally challenged this assumption. By painstakingly mapping the precise locations of hundreds of cholera deaths on a street map, Snow noticed a terrifying cluster centered around a single, highly popular water pump on Broad Street. He proved that the victims were not breathing the same air, but drinking the same contaminated water, which was secretly drawing from a nearby leaking cesspit. By physically removing the pump's handle so the public could no longer drink the infected water, Snow single-handedly stopped the Soho outbreak, scientifically proving that cholera was waterborne.",
    level_4: "During the 1854 cholera outbreak in Soho, Dr. John Snow mapped locations of deaths and traced the infection directly to the Broad Street pump. He proved cholera was waterborne rather than spread by miasma (bad air). Removing the pump handle stopped the Soho outbreak, saving hundreds of lives."
  },
  {
    text: "Despite John Snow's brilliant statistical proof, the government remained paralyzed by the enormous cost of rebuilding London's sewers. It took an overwhelming environmental crisis to force them into action. During the unusually hot and dry summer of 1858, the River Thames—which received the raw, untreated sewage of over two million Londoners—began to literally bake in the sun. The resulting stench was so incredibly overpowering and nauseating that it became known as 'The Great Stink.' The smell completely disrupted parliamentary meetings in the newly built Palace of Westminster, forcing politicians to flee the building with handkerchiefs soaked in chloride of lime pressed to their faces. Terrified by the stench and finally personally affected by the crisis, Parliament rapidly passed emergency legislation to fund a complete rebuild of the capital's sanitation networks.",
    level_4: "A hot summer in 1858 caused the raw sewage in the River Thames to smell so overpowering that it became known as 'The Great Stink'. It disrupted parliamentary meetings, forcing politicians to flee. Terrified by the smell, they finally voted to fund a complete rebuild of the capital's sanitation networks."
  },
  {
    text: "Tasked with this monumental challenge, the visionary Chief Engineer of the Metropolitan Board of Works, Joseph Bazalgette, designed and constructed one of the greatest engineering marvels of the 19th century. Between 1858 and 1865, his massive army of 'navvies' (laborers) excavated millions of tons of earth to build a spectacular, interconnected network of 1,300 miles of deep, enclosed brick sewers beneath London. Bazalgette utilized revolutionary Portland cement to ensure the tunnels were entirely watertight. This ingenious system successfully intercepted the city's waste before it could reach the Thames, using massive steam-powered pumping stations to divert it far downstream toward the sea. Bazalgette's sewers virtually eliminated cholera in the capital, saving tens of thousands of working-class lives.",
    level_4: "Between 1858 and 1865, engineer Joseph Bazalgette designed and constructed a spectacular network of 1,300 miles of brick sewers beneath London. This massive engineering project diverted waste away from the River Thames and out to sea, virtually eliminating cholera and saving thousands of lives."
  },
  {
    text: "While British engineers were building massive physical barriers against disease, scientists on the continent were finally uncovering the invisible biological culprits. In 1861, the brilliant French microbiologist Louis Pasteur definitively proved 'Germ Theory' through a series of elegant experiments with swan-necked flasks. Pasteur demonstrated that microscopic, living organisms—bacteria—were responsible for the decay of organic matter and the spread of infections. This groundbreaking discovery completely destroyed the old Miasma theory. It provided the definitive, undeniable scientific backing that reformers like Chadwick and Snow had lacked, proving that advanced sanitation, sterile medical environments, and strict public hygiene were absolute necessities to stop the transmission of deadly germs.",
    level_4: "French scientist Louis Pasteur proved Germ Theory in 1861, showing that microscopic organisms (bacteria) cause disease rather than bad smells. This groundbreaking discovery finally destroyed the miasma theory, providing definitive scientific backing for sanitation and modern hygiene."
  },
  {
    text: "Armed with the irrefutable scientific truth of Germ Theory and the undeniable success of Bazalgette’s sewer system, the British government decisively abandoned its old policy of 'laissez-faire' (leaving things alone). In 1875, Parliament passed a landmark, uncompromising Public Health Act. This revolutionary legislation legally forced every local municipal council in the country to take strict, inescapable responsibility for the physical well-being of its citizens. The Act mandated that councils must provide clean, piped water, ensure the safe disposal of all sewage, pave and clean the streets, and employ specialized Medical Officers of Health to inspect poor housing. It marked a permanent, fundamental shift in the relationship between the state and the people, establishing the modern expectation that the government must protect public health.",
    level_4: "In 1875, Parliament passed a landmark Public Health Act, forcing local councils to take legal responsibility for their citizens' health. Councils were now legally required to provide clean piped water, build sewers, and clean the streets. This officially ended the old policy of laissez-faire."
  }
];

let lesson2 = ws.data.lessons.find(l => l.id === 'lesson_2');
let lesson3 = ws.data.lessons.find(l => l.id === 'lesson_3');
let lesson4 = ws.data.lessons.find(l => l.id === 'lesson_4');
let lesson5 = ws.data.lessons.find(l => l.id === 'lesson_5');

function updateBlocks(lesson, newBlocks) {
  if (!lesson || !lesson.narrative_blocks) return;
  lesson.narrative_blocks.forEach((block, i) => {
    if (newBlocks[i]) {
      block.text = newBlocks[i].text;
      block.level_4 = newBlocks[i].level_4;
    }
  });
}

updateBlocks(lesson2, l2_blocks);
updateBlocks(lesson3, l3_blocks);
updateBlocks(lesson4, l4_blocks);
updateBlocks(lesson5, l5_blocks);

fs.writeFileSync(wsPath, JSON.stringify(ws, null, 2));
console.log('Successfully enriched water_and_sanitation.json with detailed historical narratives.');
