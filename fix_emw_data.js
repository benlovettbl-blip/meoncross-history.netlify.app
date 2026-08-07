const fs = require('fs');
const https = require('https');

async function downloadImage(url, dest) {
  const fs = require('fs');
  const response = await fetch(url, { headers: { 'User-Agent': 'MeoncrossHistoryApp/1.0' } });
  if (!response.ok) throw new Error("Failed to fetch " + url + ": " + response.statusText);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buffer));
}

async function run() {
  // 1. Fetch Mansa Musa Image
  console.log("Fetching Mansa Musa image from Wikipedia...");
  const apiUrl = "https://en.wikipedia.org/w/api.php?action=query&titles=Mansa_Musa&prop=pageimages&format=json&pithumbsize=500";
  
  try {
    const response = await fetch(apiUrl, { headers: { 'User-Agent': 'MeoncrossHistoryApp/1.0' } });
    const jsonData = await response.json();
    const pages = jsonData.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pages[pageId].thumbnail) {
      const sourceUrl = pages[pageId].thumbnail.source;
      await downloadImage(sourceUrl, './public/images/mansa_musa.jpg');
      console.log("Successfully downloaded mansa_musa.jpg");
    }
  } catch (err) {
    console.error("Failed to download Mansa Musa image", err);
  }

  // 2. Load early_modern_world/data.js
  const dataPath = './early_modern_world/data.js';
  const content = fs.readFileSync(dataPath, 'utf8');
  const dataStr = content.substring(content.indexOf('{')).replace(/;\s*$/, '');
  const data = JSON.parse(dataStr);

  // 3. Fix Jamestown map query
  const jamestown = data.geographical_locations.find(loc => loc.name === "Jamestown");
  if (jamestown) {
    jamestown.mapQuery = "Historic Jamestowne, Virginia, USA";
  }

  // 4. Add new locations
  const newLocs = [
    {
      "name": "London",
      "region": "England",
      "coordinates": "51° 30' N, 0° 7' W",
      "description": "The capital of England and the heart of its growing commercial empire, housing the East India Company headquarters and the Bank of England.",
      "image": "/images/locations/london.jpg",
      "mapQuery": "City of London, UK",
      "timeline": [
        "1600 - East India Company receives its Royal Charter.",
        "1666 - The Great Fire of London destroys much of the medieval city.",
        "1694 - Bank of England established.",
        "1700s - Becomes the largest and wealthiest city in Europe."
      ]
    },
    {
      "name": "Kingdom of Kongo",
      "region": "Central Africa",
      "coordinates": "6° 16' S, 14° 17' E",
      "description": "A powerful Central African state that engaged in early diplomatic and trade relations with Portugal before being devastated by the transatlantic slave trade.",
      "image": "/images/locations/kongo.jpg",
      "mapQuery": "Mbanza-Kongo, Angola",
      "timeline": [
        "1483 - Portuguese explorer Diogo Cão arrives.",
        "1509 - King Afonso I converts to Christianity and expands the kingdom.",
        "1526 - Afonso I writes to the King of Portugal protesting the illegal kidnapping of his people for slavery.",
        "1665 - Battle of Mbwila; Kongo defeated by the Portuguese."
      ]
    },
    {
      "name": "Isfahan",
      "region": "Safavid Empire (Modern Iran)",
      "coordinates": "32° 39' N, 51° 40' E",
      "description": "The magnificent capital of the Safavid Empire under Shah Abbas I, serving as a cosmopolitan hub for Silk Road merchants, diplomats, and artisans.",
      "image": "/images/locations/isfahan.jpg",
      "mapQuery": "Isfahan, Iran",
      "timeline": [
        "1598 - Shah Abbas I makes Isfahan his capital.",
        "17th Century - Becomes one of the largest cities in the world, known as 'Half the World'.",
        "1600s - Becomes a major center for the global silk trade.",
        "1722 - Captured by Afghan invaders, leading to its decline."
      ]
    }
  ];

  newLocs.forEach(loc => {
    if (!data.geographical_locations.find(l => l.name === loc.name)) {
      data.geographical_locations.push(loc);
    }
  });

  // 5. Fix Lesson 1 Source issues
  const lesson1 = data.lessons.find(l => l.id === "lesson_1");
  if (lesson1) {
    lesson1.narrative_blocks.forEach(block => {
      // Fix Source A (Block 0)
      if (block.images && block.images[0] && block.images[0].source_letter === "A") {
        block.images[0].image = "/images/mansa_musa.jpg";
      }
      // Fix Block 1 Task (referring to Source B instead of Source A)
      if (block.title === "Macro-History: The Wealth of the East" && block.tasks) {
        block.tasks.forEach(task => {
          if (task.question && task.question.includes("Based on Source A")) {
            task.question = task.question.replace("Based on Source A", "Based on Source B");
          }
        });
      }
      
      // Fix Source Letters for Text Sources and Images to avoid conflict
      // Block 2 image (Constantinople) is Source C.
      // Block 3 image (Benin) is currently Source D.
      // Block 4 image (Silk Road) is currently Source E.
      
      // Block 5 text sources: currently labeled D and E. Change to F and G.
      if (block.title === "3. Primary Source Analysis") {
        block.text = block.text.replace("Source D:", "Source F:").replace("Source E:", "Source G:");
        if (block.tasks && block.tasks[0]) {
          block.tasks[0].text = block.tasks[0].text.replace("Sources D and E", "Sources F and G");
          block.tasks[0].model = block.tasks[0].model.replace("Source D", "Source F").replace("Source E", "Source G");
        }
      }

      // Block 8 (Side Quest) image: currently Source D. Change to Source H.
      if (block.title === "Side Quest: The English Peasant's Pottage") {
        block.text = block.text.replace("<strong>Source D:</strong>", "<strong>Source H:</strong>");
      }
    });
  }

  // 6. Generate missing hinge questions for all lessons
  // I will define a map of lesson IDs to hinge questions.
  const hingeMap = {
    "lesson_1": {
      question: "Which of the following best describes the position of Western Europe in 1450?",
      options: [
        "A wealthy, dominant global superpower.",
        "An isolated region, desperate for new trade routes to Asia.",
        "The center of the Silk Road network."
      ],
      answer: 1,
      explanation: "Europe was largely cut off from the wealth of Asia by the powerful Ottoman Empire."
    },
    "lesson_2": {
      question: "Why did European nations desperately want to find a sea route to Asia?",
      options: [
        "To spread democracy across the globe.",
        "To bypass the Ottoman Empire's heavy taxes on the overland Silk Road.",
        "Because they had run out of land in Europe."
      ],
      answer: 1,
      explanation: "The Ottoman control of Constantinople meant Europeans were heavily taxed on luxury goods."
    },
    "lesson_3": {
      question: "What was the most devastating consequence of the Columbian Exchange for the Indigenous peoples of the Americas?",
      options: [
        "The introduction of horses and cattle.",
        "The spread of Old World diseases like smallpox, which decimated populations.",
        "The exchange of new crops like potatoes and corn."
      ],
      answer: 1,
      explanation: "Millions of Indigenous people died because they had no immunity to European diseases."
    },
    "lesson_4": {
      question: "Why did the Spanish establish the 'mita' system in Potosí?",
      options: [
        "To provide a fair wage to local Indigenous miners.",
        "To force Indigenous populations to mine silver under brutal, deadly conditions.",
        "To build schools and hospitals in South America."
      ],
      answer: 1,
      explanation: "The mita system was a system of forced labor designed to extract maximum silver for Spain."
    },
    "lesson_5": {
      question: "What was the primary purpose of the British East India Company (EIC)?",
      options: [
        "To peacefully spread Christianity in Asia.",
        "To create a heavily armed corporate monopoly that could extract wealth and control trade.",
        "To share British technology with the Mughal Empire."
      ],
      answer: 1,
      explanation: "The EIC was a powerful joint-stock company focused on maximizing profit through trade and military force."
    },
    "lesson_6": {
      question: "How did the transatlantic slave trade differ from older forms of slavery in history?",
      options: [
        "It was entirely based on race and treated human beings purely as disposable economic cargo (chattel slavery).",
        "It allowed enslaved people to easily earn their freedom and become citizens.",
        "It only transported a few hundred people over its entire history."
      ],
      answer: 0,
      explanation: "Chattel slavery in the Americas permanently stripped individuals of their humanity, reducing them to property based on race."
    },
    "lesson_7": {
      question: "Which of the following is an example of active resistance by enslaved people?",
      options: [
        "Working hard on the plantation.",
        "Forming independent Maroon communities in the mountains to fight guerrilla wars against colonizers.",
        "Accepting their conditions peacefully."
      ],
      answer: 1,
      explanation: "Maroons fiercely resisted enslavement by escaping, building their own societies, and fighting back."
    },
    "lesson_8": {
      question: "What role did the Mughal Empire play in early interactions with the British East India Company?",
      options: [
        "The Mughals were completely conquered by the British immediately in 1600.",
        "The Mughals were a massive, powerful empire that initially forced the British to beg for trading rights.",
        "The Mughals refused to trade with anyone outside of India."
      ],
      answer: 1,
      explanation: "Early on, the British were far weaker than the Mughals and had to send ambassadors like Sir Thomas Roe to humbly request trade access."
    },
    "lesson_9": {
      question: "Why did the Qing Dynasty establish the Canton System?",
      options: [
        "To invite as many Europeans as possible into the Chinese interior.",
        "To strictly control and limit European merchants to one small trading zone in Guangzhou.",
        "To learn European languages and customs."
      ],
      answer: 1,
      explanation: "The Qing Emperor recognized the disruptive potential of Europeans and strictly contained them to Canton."
    },
    "lesson_10": {
      question: "How did the discovery of the Americas impact European geopolitics?",
      options: [
        "It brought immediate peace to Europe.",
        "It sparked fierce competition, wars, and piracy between Spain, Portugal, England, and France over global wealth.",
        "It caused Europeans to completely abandon trade with Asia."
      ],
      answer: 1,
      explanation: "The influx of wealth triggered an arms race and constant warfare, such as the battles between the Spanish Armada and English privateers."
    },
    "lesson_11": {
      question: "What was a significant consequence of the 'Financial Revolution' in 17th century Britain?",
      options: [
        "The creation of the Bank of England allowed the government to borrow massive amounts of money to fund its global wars and empire.",
        "Britain outlawed all banks and returned to the gold standard.",
        "The British government went bankrupt and collapsed."
      ],
      answer: 0,
      explanation: "The ability to manage national debt through institutions like the Bank of England gave Britain a huge military advantage."
    },
    "lesson_12": {
      question: "By 1750, how had Britain's position in the world changed compared to 1450?",
      options: [
        "Britain was still an isolated island with no global connections.",
        "Britain had transformed into a major global power, fueled by aggressive trade, colonial wealth, and a powerful navy.",
        "Britain had been conquered by the Ottoman Empire."
      ],
      answer: 1,
      explanation: "Through a combination of corporate monopolies, naval supremacy, and colonial extraction, Britain shifted from the periphery to the center of global power."
    }
  };

  data.lessons.forEach(lesson => {
    // Check if the lesson already has a hinge_question in any block
    let hasHinge = false;
    lesson.narrative_blocks.forEach(b => {
      if (b.hinge_question) hasHinge = true;
    });
    
    if (!hasHinge && hingeMap[lesson.id]) {
      // Find a good block to put it in. Block 2 is usually a good spot.
      const targetBlock = lesson.narrative_blocks.length > 2 ? lesson.narrative_blocks[2] : lesson.narrative_blocks[lesson.narrative_blocks.length - 1];
      targetBlock.hinge_question = hingeMap[lesson.id];
      console.log("Added hinge question to " + lesson.id);
    } else if (hasHinge) {
      console.log(lesson.id + " already has a hinge question.");
    }
  });

  const finalStr = "window.unitData = " + JSON.stringify(data, null, 2) + ";";
  fs.writeFileSync(dataPath, finalStr, 'utf8');
  console.log("Successfully updated early_modern_world/data.js");
}

run();
