const fs = require('fs');

const contextMap = {
  "Catalan Atlas (1375) - Mansa Musa": "Observe the gold coin held by Mansa Musa and the intricate trade routes spanning the Sahara. This vividly illustrates that West Africa was a spectacularly wealthy and integral part of the global economy long before European maritime dominance. **Hinge Question:** Why would a mapmaker in Europe in 1375 depict an African king with such prominent symbols of wealth?",
  
  "Fresco of the Siege of Constantinople (1537)": "Observe the massive defensive walls of the city being breached by Ottoman cannons. The fall of Constantinople was a seismic shock to Christian Europe, not just religiously, but economically. With the Ottoman Empire now controlling the vital land routes to Asia, European merchants were suddenly cut off from the lucrative Silk Road. **Hinge Question:** How did the fall of this city directly force Europeans to begin exploring the oceans?",
  
  "16th-Century Benin Bronze Plaque": "Look closely at the intricate details of the figures, their weapons, and their ceremonial clothing. This is not primitive art; it requires highly advanced metallurgical skills (lost-wax casting) that rivalled or exceeded anything in Europe at the time. It serves as powerful evidence of the complex, wealthy, and highly organized societies that existed in West Africa. **Hinge Question:** How does this bronze plaque challenge traditional Eurocentric views of pre-colonial African societies?",
  
  "Map of the Silk Road Trade Routes": "Trace the sprawling network of red lines stretching from China, across Central Asia, and into the Mediterranean. Before the era of global maritime empires, this was the economic superhighway of the world. Europe was merely a peripheral terminus at the far western edge of this vast Eurasian trading system, entirely dependent on Asian and Middle Eastern middlemen. **Hinge Question:** Why was controlling these overland routes so incredibly profitable for empires like the Ottomans?",

  "Map of the Spanish Armada Route (1588)": "Trace the chaotic route of the Spanish fleet around the rugged coasts of Scotland and Ireland. This map highlights how the Armada was defeated not just by English naval tactics, but by disastrous weather (the 'Protestant Wind') and poor logistical planning. **Hinge Question:** Does this map suggest the English victory was due to superior skill, or lucky geography and weather?",

  "Portrait of Sir Francis Drake (1591)": "Notice Drake's confident posture and the hand resting on a globe. To the English, he was a heroic explorer and a symbol of their growing naval power. To the Spanish, however, he was 'El Draque' (The Dragon)—a ruthless pirate who terrorized their galleons. **Hinge Question:** How can the exact same historical figure be remembered as both a national hero and a criminal pirate?",

  "Portrait of Gerardus Mercator (1574)": "Look at the globes and measuring instruments surrounding Mercator. His revolutionary map projection (1569) allowed sailors to plot straight-line courses across the oceans, drastically accelerating the age of global exploration and European empire-building. **Hinge Question:** How did advances in mathematics and map-making directly contribute to the growth of the British Empire?",

  "Portrait of Martin Luther (1529)": "Observe Luther's serious, unidealized expression and his firm grip on the Bible. By translating the Bible into everyday German, he democratized religion and shattered the absolute authority of the Catholic Church, plunging Europe into centuries of violent conflict. **Hinge Question:** Why was the act of translating the Bible into a common language considered so dangerous by the Church?",

  "Map of the Treaty of Tordesillas (1494)": "Look at the bold, straight line slicing through the Atlantic Ocean and South America. In an act of staggering arrogance, the Pope literally divided the entire undiscovered world between just two Catholic superpowers: Spain and Portugal. **Hinge Question:** How do you think Protestant nations like England reacted to being entirely left out of this global division?",

  "The Armada Portrait of Queen Elizabeth I (c. 1588)": "Notice Elizabeth's hand resting firmly on a globe, specifically covering the Americas, while the defeated Spanish fleet sinks in the background. This is a masterful piece of royal propaganda, projecting an image of divine victory, unyielding power, and global ambition. **Hinge Question:** What specific symbols in this portrait suggest that Elizabeth I intended for England to become a global superpower?",

  "East India Company Fort St. George": "Observe the heavily fortified walls and the orderly, European-style buildings planted firmly on the Indian coast. This wasn't just a trading post; it was a militarized foothold. It shows how the EIC operated more like an independent nation with its own army than a simple business. **Hinge Question:** Why would a trading company need to build massive military fortresses in a foreign country?",

  "Engraving of Pocahontas (1616)": "Notice that Pocahontas is dressed entirely in elite, formal English aristocratic clothing, not traditional Powhatan attire. This engraving was deliberately circulated in London as propaganda to prove that Native Americans could be 'civilized' and assimilated into English culture, encouraging more investment in the Virginia colony. **Hinge Question:** Does this portrait tell us more about Pocahontas's actual identity, or about what the English wanted to see?",

  "Sir Thomas Roe at the Mughal Court (1615)": "Look at the contrast between the modest English ambassador, Sir Thomas Roe, and the staggering, overwhelming opulence of the Mughal Emperor Jahangir. In 1615, the Mughal Empire was vastly wealthier and more powerful than England, and Roe had to beg for trading rights. **Hinge Question:** How does this image completely contradict the idea that the English were naturally dominant when they first arrived in India?",

  "Plan of James Fort in Virginia (1607)": "Observe the tight, triangular wooden palisades surrounding the tiny settlement. This defensive structure reveals the extreme paranoia and vulnerability of the early English colonists, who were completely dependent on, yet deeply fearful of, the surrounding Powhatan Confederacy. **Hinge Question:** What does the shape and structure of this fort suggest about the relationship between the English settlers and the Indigenous population?",

  "Coat of Arms of Great Britain (1714)": "Look at the blending of the English lion and the Scottish unicorn. This heraldic symbol represents the 1707 Act of Union, which formally joined England and Scotland into a single political entity: Great Britain. **Hinge Question:** Why was it so important for the monarch to create a single, unified visual identity for the newly formed nation?",

  "Execution of King Charles I (1649)": "Observe the massive, chaotic crowd witnessing the unthinkable: the public beheading of a divinely appointed monarch. This shocking event permanently shattered the concept of the 'Divine Right of Kings' in England and sent shockwaves of terror through every royal court in Europe. **Hinge Question:** How did the execution of Charles I permanently change the balance of power between the Monarchy and Parliament?",

  "The Royal Exchange, London (1644)": "Notice the bustling courtyard packed with merchants in various international dress. This was the beating heart of early modern capitalism, where global goods were traded, joint-stock companies were formed, and the foundations of the British Empire's financial dominance were laid. **Hinge Question:** How did the creation of centralized financial markets like the Royal Exchange accelerate global exploration?",

  "Portrait of Oliver Cromwell (1656)": "Look at Cromwell's austere, practical armor, entirely lacking the velvet and jewels typical of royal portraits. He deliberately cultivated a 'warts and all' image to project stern Puritan virtue, military strength, and a stark rejection of royal extravagance. **Hinge Question:** Why would a leader who had as much absolute power as a king refuse to be painted looking like one?",

  "East India Company Docks (c. 1730)": "Observe the forest of ship masts and the warehouses overflowing with global commodities. This scene captures the immense, staggering scale of the East India Company's monopoly, which transformed London into the undisputed center of global maritime trade. **Hinge Question:** How did the wealth flowing through these docks fundamentally change the daily lives and diets of ordinary British people?",

  "Map of Jamaica (1775)": "Look closely at the grid-like division of the land into massive sugar estates. The island's geography was entirely reshaped to serve the brutal efficiency of the plantation economy, completely wiping out indigenous landscapes to maximize sugar production for European markets. **Hinge Question:** How does a map like this hide the human suffering and enslaved labor required to make those estates profitable?",

  "Diagram of the Triangular Trade": "Trace the continuous, cyclical flow of goods, enslaved people, and raw materials across the Atlantic. This diagram reduces the horrors of the Middle Passage to a sanitized economic model, showing how European industrial growth was directly fueled by the exploitation of African labor and American land. **Hinge Question:** Who benefited the most from this system, and who bore the ultimate cost?",

  "Portrait of Olaudah Equiano (1789)": "Notice Equiano's refined gentleman's clothing and the Bible in his hand. He deliberately presented himself as an educated, devout, and respectable British citizen to force European audiences to recognize his humanity and to directly challenge the racist justifications for slavery. **Hinge Question:** Why was it so important for Equiano to present himself this way when campaigning for abolition?",

  "Diagram of the Slave Ship Brookes (1788)": "Look at the horrifying, mathematical precision with which human beings were packed tightly into the hold of the ship. This diagram was arguably the most effective piece of visual propaganda in history, mass-produced by abolitionists to shock the British public into confronting the true, industrial cruelty of the Middle Passage. **Hinge Question:** Why was a cold, technical diagram more effective at changing public opinion than an emotional painting might have been?",

  "London Bridge from St Olaf Stairs (1632)": "Observe the dense, chaotic jumble of timber-framed houses crowding the bridge. This reveals the severely overcrowded, unsanitary, and highly flammable nature of Early Modern London, making it a perfect breeding ground for both the Great Plague and the Great Fire. **Hinge Question:** What were the major risks of living in such densely packed, unregulated urban environments?",

  "William Hogarth's Gin Lane (1751)": "Notice the horrific details: a mother dropping her baby, starvation, suicide, and collapsing buildings. Hogarth created this satirical engraving as propaganda to expose the devastating social decay, poverty, and misery caused by the unchecked 'Gin Craze' among London's poorest classes. **Hinge Question:** Is this image a reliable reflection of daily life in 1751, or an exaggerated moral panic designed to shock the viewer?",

  "The East Offering its Riches to Britannia (1778)": "Observe Britannia sitting elevated on a throne, passively receiving jewels, spices, and silks from subservient figures representing Asia, Africa, and India. This allegorical ceiling painting is pure imperial propaganda, designed to justify the Empire by portraying Britain as the natural, divinely ordained ruler of the world's wealth. **Hinge Question:** How does this painting attempt to make the violent realities of empire building look peaceful and natural?",

  "John Rocque's Map of London (1746)": "Look at the vast, sprawling, densely packed streets spreading out in all directions. By 1746, London had exploded into the largest and wealthiest metropolis in the world, fueled by global trade, but this rapid expansion also created unprecedented extremes of wealth and poverty. **Hinge Question:** What challenges would a government face when trying to police and provide sanitation for a city growing this rapidly?"
};

const filePath = 'early_modern_world/data.js';
let dataStr = fs.readFileSync(filePath, 'utf8');

// We need to parse dataStr as a string and insert the image_context properly.
// Since data.js contains many objects, we can use a regex to find "image_alt": "..." and insert "image_context": "..." right after it.
let replacedCount = 0;

for (const [altText, contextText] of Object.entries(contextMap)) {
  // Escape regex specials in altText
  const safeAltText = altText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  
  // Find "image_alt": "altText"
  // It could be followed by a comma, or a closing brace.
  const regex = new RegExp(`("image_alt"\\s*:\\s*"${safeAltText}"\\s*,?)`, 'g');
  
  if (regex.test(dataStr)) {
    dataStr = dataStr.replace(regex, `$1\n            "image_context": ${JSON.stringify(contextText)},`);
    replacedCount++;
  } else {
    console.log("Could not find:", altText);
  }
}

fs.writeFileSync(filePath, dataStr);
console.log(`Successfully injected ${replacedCount} image contexts into data.js.`);
