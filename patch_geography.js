const fs = require('fs');

const path = './early_modern_world/data.js';
let content = fs.readFileSync(path, 'utf8');

// Parse the file: we strip "window.unitData = " and parse JSON, then stringify and prepend again.
const dataStr = content.substring(content.indexOf('{')).replace(/;\s*$/, '');
let data = JSON.parse(dataStr);

const newLocations = [
    {
      "name": "Calicut",
      "region": "India",
      "coordinates": "11° 15' N, 75° 46' E",
      "description": "A major trading city on the Malabar Coast of India. In 1498, Vasco da Gama arrived here, becoming the first European to reach India by sea and bypassing the Ottoman Empire.",
      "image": "/images/locations/calicut.jpg",
      "mapQuery": "Kozhikode, Kerala, India",
      "timeline": [
        "1498 - Portuguese explorer Vasco da Gama arrives.",
        "1500 - Pedro Álvares Cabral arrives and establishes a factory.",
        "1502 - Da Gama returns and bombards the city.",
        "1509 - Portuguese establish naval dominance in the Indian Ocean."
      ]
    },
    {
      "name": "Tenochtitlan",
      "region": "Aztec Empire (Modern Mexico)",
      "coordinates": "19° 26' N, 99° 8' W",
      "description": "The capital of the Aztec Empire, built on an island in Lake Texcoco. It was larger and cleaner than any European city at the time before being conquered by Hernan Cortes.",
      "image": "/images/locations/tenochtitlan.jpg",
      "mapQuery": "Mexico City, Mexico",
      "timeline": [
        "1325 - City founded by the Mexica people.",
        "1519 - Hernán Cortés arrives with Spanish conquistadors.",
        "1520 - La Noche Triste: Spaniards driven from the city.",
        "1521 - City falls after a brutal 93-day siege and smallpox outbreak."
      ]
    },
    {
      "name": "Elmina Castle",
      "region": "Gold Coast (Modern Ghana)",
      "coordinates": "5° 4' N, 1° 20' W",
      "description": "Originally built by the Portuguese in 1482 as a trading post, it became one of the most important stops on the route of the transatlantic slave trade.",
      "image": "/images/locations/elmina.jpg",
      "mapQuery": "Elmina Castle, Ghana",
      "timeline": [
        "1482 - Built by the Portuguese as São Jorge da Mina.",
        "1637 - Captured by the Dutch West India Company.",
        "18th Century - Serves as a major hub for holding enslaved Africans before the Middle Passage.",
        "1872 - Transferred to the British Empire."
      ]
    },
    {
      "name": "Malacca",
      "region": "Malaysian Peninsula",
      "coordinates": "2° 11' N, 102° 15' E",
      "description": "A wealthy sultanate and the most important choke point for the global spice trade, connecting the Indian Ocean to the South China Sea.",
      "image": "/images/locations/malacca.jpg",
      "mapQuery": "Malacca City, Malaysia",
      "timeline": [
        "1400 - Founded by Parameswara, becoming a major trading port.",
        "1511 - Conquered by Afonso de Albuquerque for Portugal.",
        "1641 - Captured by the Dutch East India Company (VOC).",
        "1795 - Briefly taken over by the British."
      ]
    },
    {
      "name": "Roanoke Island",
      "region": "North America",
      "coordinates": "35° 53' N, 75° 40' W",
      "description": "The site of Sir Walter Raleigh's attempt to establish a permanent English settlement in the Americas, which mysteriously disappeared.",
      "image": "/images/locations/roanoke.jpg",
      "mapQuery": "Roanoke Island, North Carolina",
      "timeline": [
        "1585 - First colony established by Ralph Lane, but abandoned.",
        "1587 - John White leads a second attempt with 115 colonists.",
        "1587 - Virginia Dare born, the first English child born in the Americas.",
        "1590 - John White returns to find the colony deserted with the word 'CROATOAN' carved."
      ]
    }
];

const updates = {
    "Constantinople (Istanbul)": {
        "mapQuery": "Istanbul, Turkey",
        "timeline": [
            "330 AD - Founded as the new capital of the Roman Empire by Constantine.",
            "1453 - Conquered by Sultan Mehmed II of the Ottoman Empire.",
            "1453 - Hagia Sophia converted into a mosque.",
            "16th Century - Reaches its peak of wealth and power under Suleiman the Magnificent."
        ]
    },
    "Guangzhou (Canton)": {
        "mapQuery": "Guangzhou, China",
        "timeline": [
            "1517 - Portuguese arrive and attempt to establish trade.",
            "1757 - The Canton System is established by the Qing Dynasty.",
            "18th Century - Becomes the sole port for European merchants trading tea and silk.",
            "1839 - Destruction of British opium triggers the First Opium War."
        ]
    },
    "Jamestown": {
        "mapQuery": "Jamestown, Virginia",
        "timeline": [
            "1607 - Founded by the Virginia Company.",
            "1609-1610 - 'The Starving Time' kills the majority of colonists.",
            "1612 - John Rolfe introduces a successful strain of tobacco.",
            "1619 - The first enslaved Africans are brought to the colony."
        ]
    },
    "Potosí": {
        "mapQuery": "Potosí, Bolivia",
        "timeline": [
            "1545 - Founded after the discovery of massive silver deposits.",
            "1570s - The brutal 'mita' forced labor system is implemented by Viceroy Toledo.",
            "17th Century - Becomes one of the largest and wealthiest cities in the world.",
            "18th Century - Silver output declines as the easiest ores are depleted."
        ]
    },
    "Timbuktu": {
        "mapQuery": "Timbuktu, Mali",
        "timeline": [
            "14th Century - Becomes a major center under the Mali Empire (Mansa Musa).",
            "15th Century - Conquered by the Songhai Empire.",
            "16th Century - Reaches its intellectual peak with the Sankore University.",
            "1591 - Conquered by a Moroccan army, leading to decline."
        ]
    }
};

if (data.geographical_locations) {
    // Update existing
    data.geographical_locations = data.geographical_locations.map(loc => {
        if (updates[loc.name]) {
            return {
                ...loc,
                mapQuery: updates[loc.name].mapQuery,
                timeline: updates[loc.name].timeline
            };
        }
        return loc;
    });

    // Add new ones
    for (let newLoc of newLocations) {
        if (!data.geographical_locations.find(l => l.name === newLoc.name)) {
            data.geographical_locations.push(newLoc);
        }
    }
}

const finalStr = "window.unitData = " + JSON.stringify(data, null, 2) + ";";
fs.writeFileSync(path, finalStr, 'utf8');
console.log("Updated early_modern_world/data.js with new geographical locations and timelines.");
