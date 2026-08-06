const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'public', 'images', 'individuals');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const individualsList = [
  // Lesson 1: Who held global power in 1450?
  { name: "Niccolò Barbaro", search: "Niccolò Barbaro", group: "Lesson 1: Who held global power in 1450?", role: "Venetian merchant", bio: "Witnessed and recorded the fall of Constantinople in 1453." },
  { name: "Sultan Mehmed II", search: "Mehmed the Conqueror", group: "Lesson 1: Who held global power in 1450?", role: "Ottoman Sultan", bio: "Captured Constantinople in 1453, destroying the Byzantine Empire." },
  { name: "Mansa Musa", search: "Mansa Musa", group: "Lesson 1: Who held global power in 1450?", role: "Emperor of Mali", bio: "Renowned for his immense gold wealth and famous pilgrimage to Mecca." },
  { name: "Admiral Zheng He", search: "Zheng He", group: "Lesson 1: Who held global power in 1450?", role: "Ming Dynasty Admiral", bio: "Commanded massive Chinese treasure fleets across the Indian Ocean." },
  { name: "Christopher Columbus", search: "Christopher Columbus", group: "Lesson 1: Who held global power in 1450?", role: "Explorer", bio: "His 1492 voyage to the Americas initiated European global expansion." },
  
  // Lesson 2: What drove the European 'Age of Discovery'?
  { name: "Martin Luther", search: "Martin Luther", group: "Lesson 2: What drove the European 'Age of Discovery'?", role: "German Monk", bio: "His 1517 protests sparked the Protestant Reformation, dividing Europe." },
  { name: "Pope Alexander VI", search: "Pope Alexander VI", group: "Lesson 2: What drove the European 'Age of Discovery'?", role: "Pope", bio: "Issued the 1494 Treaty of Tordesillas dividing the Americas between Spain and Portugal." },
  { name: "King Philip II", search: "Philip II of Spain", group: "Lesson 2: What drove the European 'Age of Discovery'?", role: "King of Spain", bio: "Catholic monarch who launched the Spanish Armada against England." },
  { name: "Queen Elizabeth I", search: "Elizabeth I", group: "Lesson 2: What drove the European 'Age of Discovery'?", role: "Queen of England", bio: "Protestant Queen who authorized privateers and defeated the Spanish Armada." },
  { name: "Mary, Queen of Scots", search: "Mary, Queen of Scots", group: "Lesson 2: What drove the European 'Age of Discovery'?", role: "Queen of Scotland", bio: "Catholic monarch whose execution angered Philip II." },
  { name: "Henry VIII", search: "Henry VIII", group: "Lesson 2: What drove the European 'Age of Discovery'?", role: "King of England", bio: "Broke away from the Catholic Church in 1534." },

  // Lesson 3: Privateers, Companies, and the first English colonies
  { name: "Francis Drake", search: "Francis Drake", group: "Lesson 3: Privateers, Companies, and the first English colonies", role: "English Privateer", bio: "Circumnavigated the globe and heavily raided Spanish treasure ships." },
  { name: "John Hawkins", search: "John Hawkins (naval commander)", group: "Lesson 3: Privateers, Companies, and the first English colonies", role: "English Sea Captain", bio: "Cousin to Francis Drake and pioneer of the English slave trade." },
  { name: "Sir Walter Raleigh", search: "Walter Raleigh", group: "Lesson 3: Privateers, Companies, and the first English colonies", role: "English Explorer", bio: "Organized the first failed English colonization attempt at Roanoke." },
  { name: "Chief Powhatan", search: "Powhatan", group: "Lesson 3: Privateers, Companies, and the first English colonies", role: "Native American Leader", bio: "Leader of the Powhatan Confederacy who interacted with Jamestown settlers." },
  { name: "John Rolfe", search: "John Rolfe", group: "Lesson 3: Privateers, Companies, and the first English colonies", role: "English Settler", bio: "Introduced a profitable tobacco strain to Jamestown." },
  { name: "King James I", search: "James VI and I", group: "Lesson 3: Privateers, Companies, and the first English colonies", role: "King of England", bio: "Sent an ambassador to the Mughal Empire." },
  { name: "Sir Thomas Roe", search: "Thomas Roe", group: "Lesson 3: Privateers, Companies, and the first English colonies", role: "English Diplomat", bio: "Sent to the court of the Mughal Emperor in 1615 to secure trading rights." },
  { name: "Emperor Jahangir", search: "Jahangir", group: "Lesson 3: Privateers, Companies, and the first English colonies", role: "Mughal Emperor", bio: "Wealthy and powerful ruler who permitted early English trade in India." },

  // Lesson 4: How did the British Civil War create an Imperial Republic?
  { name: "King Charles I", search: "Charles I of England", group: "Lesson 4: How did the British Civil War create an Imperial Republic?", role: "King of England", bio: "Believed in the Divine Right of Kings; executed by Parliament in 1649." },
  { name: "Oliver Cromwell", search: "Oliver Cromwell", group: "Lesson 4: How did the British Civil War create an Imperial Republic?", role: "Lord Protector", bio: "Strict Puritan commander of the New Model Army." },
  { name: "John Bradshaw", search: "John Bradshaw (judge)", group: "Lesson 4: How did the British Civil War create an Imperial Republic?", role: "President of the High Court", bio: "Presided over the trial of King Charles I." },
  { name: "Martin Noell", search: "Martin Noell", group: "Lesson 4: How did the British Civil War create an Imperial Republic?", role: "London Merchant", bio: "Wealthy merchant, slave trader, and pamphleteer." },
  { name: "King Charles II", search: "Charles II of England", group: "Lesson 4: How did the British Civil War create an Imperial Republic?", role: "King of England", bio: "Returned to the throne during the Restoration in 1660." },

  // Lesson 5: What was the reality of the Transatlantic Slave Trade?
  { name: "Queen Nanny (Nanny of the Maroons)", search: "Nanny of the Maroons", group: "Lesson 5: What was the reality of the Transatlantic Slave Trade?", role: "Maroon Leader", bio: "Led the Jamaican Maroons in a successful guerrilla war against the British." },
  { name: "Olaudah Equiano", search: "Olaudah Equiano", group: "Lesson 5: What was the reality of the Transatlantic Slave Trade?", role: "Abolitionist", bio: "Formerly enslaved African who published a bestselling autobiography exposing slavery's horrors." },
  { name: "Thomas Thistlewood", search: "Thomas Thistlewood", group: "Lesson 5: What was the reality of the Transatlantic Slave Trade?", role: "Plantation Overseer", bio: "Jamaican sugar plantation overseer whose diary detailed brutal punishments and slave resistance." },

  // Lesson 6: How 'modern' was Britain by 1750? (Synthesis & Assessment)
  { name: "King George II", search: "George II of Great Britain", group: "Lesson 6: How 'modern' was Britain by 1750? (Synthesis & Assessment)", role: "King of Great Britain", bio: "Governed through a constitutional monarchy via Parliament." },
  { name: "Pierre-Jean Grosley", search: "Pierre-Jean Grosley", group: "Lesson 6: How 'modern' was Britain by 1750? (Synthesis & Assessment)", role: "French Aristocrat", bio: "Observed the extreme contrasts of wealth and poverty in London in 1750." },
  { name: "Henry Fielding", search: "Henry Fielding", group: "Lesson 6: How 'modern' was Britain by 1750? (Synthesis & Assessment)", role: "London Magistrate", bio: "Author who reported on rampant crime and poverty in 1751 London." },
  { name: "William Hogarth", search: "William Hogarth", group: "Lesson 6: How 'modern' was Britain by 1750? (Synthesis & Assessment)", role: "Artist", bio: "Famous for his 1751 engraving 'Gin Lane' depicting social decay." }
];

async function fetchWikiImage(query) {
  try {
    const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(query)}&prop=pageimages&format=json&pithumbsize=500&redirects=1`, {
      headers: { 'User-Agent': 'MeoncrossHistoryApp/1.0 (school@meoncross.edu)' }
    });
    const parsed = await res.json();
    const pages = parsed.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId !== "-1" && pages[pageId].thumbnail) {
      return pages[pageId].thumbnail.source;
    }
  } catch (e) {
    console.error("Error fetching:", query, e);
  }
  return null;
}

async function downloadImage(url, filename) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'MeoncrossHistoryApp/1.0' }
    });
    if (!res.ok) return false;
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(filename, Buffer.from(buffer));
    return true;
  } catch (e) {
    console.error("Download error:", url, e);
    return false;
  }
}

async function run() {
  const resultData = [];
  
  for (const person of individualsList) {
    console.log(`Fetching image for: ${person.name}...`);
    const imgUrl = await fetchWikiImage(person.search);
    
    let localImagePath = "";
    if (imgUrl) {
      const cleanName = person.name.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/_$/, '');
      const ext = path.extname(new URL(imgUrl).pathname) || '.jpg';
      const filename = `${cleanName}${ext}`;
      const filepath = path.join(targetDir, filename);
      
      console.log(`Downloading ${imgUrl} to ${filename}...`);
      const success = await downloadImage(imgUrl, filepath);
      if (success) {
        localImagePath = `/images/individuals/${filename}`;
      }
    }
    
    resultData.push({
      name: person.name,
      group: person.group,
      role: person.role,
      bio: person.bio,
      image: localImagePath || ""
    });
    
    await new Promise(r => setTimeout(r, 300));
  }
  
  const destPath = path.join(__dirname, 'early_modern_world', 'biographies.json');
  fs.writeFileSync(destPath, JSON.stringify(resultData, null, 2));
  console.log(`Generated ${destPath} successfully.`);
}

run();
