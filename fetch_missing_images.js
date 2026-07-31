const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Data from user prompt
const individualsList = [
  // Tier 1
  { name: "King Henry VIII", search: "Henry VIII", group: "👑 Tier 1: The Monarchs (Sovereign Rulers)", bio: "King of England (1509–1547); Elizabeth's father whose marital changes created her legitimacy crisis." },
  { name: "Queen Mary I (Mary Tudor)", search: "Mary I of England", group: "👑 Tier 1: The Monarchs (Sovereign Rulers)", bio: "Queen of England (1553–1558); Elizabeth’s older Catholic sister and predecessor." },
  { name: "Queen Elizabeth I", search: "Elizabeth I", group: "👑 Tier 1: The Monarchs (Sovereign Rulers)", bio: "Queen of England (1558–1603); Supreme Governor of the Church of England." },
  { name: "King Philip II of Spain", search: "Philip II of Spain", group: "👑 Tier 1: The Monarchs (Sovereign Rulers)", bio: "Sovereign ruler of the global Spanish Empire; Elizabeth's chief Catholic rival." },
  { name: "Francis II", search: "Francis II of France", group: "👑 Tier 1: The Monarchs (Sovereign Rulers)", bio: "King of France; briefly King-consort of Scotland through his marriage to Mary, Queen of Scots." },
  { name: "Mary, Queen of Scots (Mary Stuart)", search: "Mary, Queen of Scots", group: "👑 Tier 1: The Monarchs (Sovereign Rulers)", bio: "Sovereign Queen of Scotland; Elizabeth's cousin and claimant to the English throne." },
  
  // Tier 2
  { name: "The Duke of Norfolk (Thomas Howard)", search: "Thomas Howard, 4th Duke of Norfolk", group: "🏰 Tier 2: The Nobility (Dukes, Earls, and Barons)", bio: "The highest-ranking nobleman in England; executed in 1572 for plotting to marry Mary, Queen of Scots." },
  { name: "The Duke of Alba", search: "Fernando Álvarez de Toledo, 3rd Duke of Alba", group: "🏰 Tier 2: The Nobility (Dukes, Earls, and Barons)", bio: "High-ranking Spanish nobleman and military commander sent by Philip II to crush the Dutch Revolt." },
  { name: "The Duke of Parma", search: "Alexander Farnese, Duke of Parma", group: "🏰 Tier 2: The Nobility (Dukes, Earls, and Barons)", bio: "Spanish nobleman and governor of the Netherlands; commander of the invasion force the Armada was sent to transport." },
  { name: "The Duke of Medina Sidonia", search: "Alonso Pérez de Guzmán, 7th Duke of Medina Sidonia", group: "🏰 Tier 2: The Nobility (Dukes, Earls, and Barons)", bio: "Spanish nobleman appointed to command the Spanish Armada." },
  { name: "The Duke of Guise", search: "Henry I, Duke of Guise", group: "🏰 Tier 2: The Nobility (Dukes, Earls, and Barons)", bio: "Powerful French Catholic noble who conspired to launch a French invasion of England." },
  { name: "Robert Dudley (Earl of Leicester)", search: "Robert Dudley, 1st Earl of Leicester", group: "🏰 Tier 2: The Nobility (Dukes, Earls, and Barons)", bio: "Elizabeth's favorite courtier and leading Privy Councillor; later Governor-General of the Low Countries." },
  { name: "The Earl of Northumberland (Thomas Percy)", search: "Thomas Percy, 7th Earl of Northumberland", group: "🏰 Tier 2: The Nobility (Dukes, Earls, and Barons)", bio: "Catholic noble who co-led the failed Revolt of the Northern Earls." },
  { name: "The Earl of Westmorland (Charles Neville)", search: "Charles Neville, 6th Earl of Westmorland", group: "🏰 Tier 2: The Nobility (Dukes, Earls, and Barons)", bio: "Catholic noble who co-led the Revolt of the Northern Earls." },
  { name: "Lord Darnley (Henry Stuart)", search: "Henry Stuart, Lord Darnley", group: "🏰 Tier 2: The Nobility (Dukes, Earls, and Barons)", bio: "Nobleman of royal blood; second husband of Mary, Queen of Scots." },
  { name: "Lady Jane Grey", search: "Lady Jane Grey", group: "🏰 Tier 2: The Nobility (Dukes, Earls, and Barons)", bio: "Briefly named Protestant Queen in 1553; cousin of Elizabeth." },

  // Tier 3
  { name: "Sir William Cecil (Lord Burghley)", search: "William Cecil, 1st Baron Burghley", group: "🛡️ Tier 3: The Gentry (Knights, Chief Ministers, and Landowners)", bio: "Elizabeth’s first Secretary of State and most trusted advisor." },
  { name: "Sir Francis Walsingham", search: "Francis Walsingham", group: "🛡️ Tier 3: The Gentry (Knights, Chief Ministers, and Landowners)", bio: "Elizabeth's Secretary of State and Spymaster." },
  { name: "Sir Walter Raleigh", search: "Walter Raleigh", group: "🛡️ Tier 3: The Gentry (Knights, Chief Ministers, and Landowners)", bio: "Courtier, explorer, and knight given the royal patent to colonize Virginia." },
  { name: "Sir Francis Drake", search: "Francis Drake", group: "🛡️ Tier 3: The Gentry (Knights, Chief Ministers, and Landowners)", bio: "Privateer, navigator, and naval commander; knighted in 1580." },
  { name: "Sir John Hawkins", search: "John Hawkins (naval commander)", group: "🛡️ Tier 3: The Gentry (Knights, Chief Ministers, and Landowners)", bio: "Merchant, privateer, and treasurer of the Royal Navy." },
  { name: "Sir Richard Grenville", search: "Richard Grenville", group: "🛡️ Tier 3: The Gentry (Knights, Chief Ministers, and Landowners)", bio: "Naval commander of the 1585 expedition to Roanoke." },
  { name: "Anthony Babington", search: "Anthony Babington", group: "🛡️ Tier 3: The Gentry (Knights, Chief Ministers, and Landowners)", bio: "A wealthy Catholic gentleman who led the Babington Plot." },
  { name: "Francis Throckmorton", search: "Francis Throckmorton", group: "🛡️ Tier 3: The Gentry (Knights, Chief Ministers, and Landowners)", bio: "A Catholic gentleman who acted as a key intermediary in the Throckmorton Plot." },

  // Tier 4
  { name: "James Pilkington", search: "James Pilkington (bishop)", group: "🎓 Tier 4: Professionals & High-Ranking Clergy", bio: "The Protestant Bishop of Durham appointed by Elizabeth." },
  { name: "Thomas Harriot", search: "Thomas Harriot", group: "🎓 Tier 4: Professionals & High-Ranking Clergy", bio: "Brilliant mathematician, navigator, and scholar who recorded the Roanoke voyage." },
  { name: "Thomas Phelippes", search: "Thomas Phelippes", group: "🎓 Tier 4: Professionals & High-Ranking Clergy", bio: "Walsingham’s chief cryptographer and codebreaker." },
  { name: "Gilbert Gifford", search: "Gilbert Gifford", group: "🎓 Tier 4: Professionals & High-Ranking Clergy", bio: "A Catholic priest who acted as Walsingham’s agent provocateur during the Babington Plot." },
  { name: "Edmund Campion", search: "Edmund Campion", group: "🎓 Tier 4: Professionals & High-Ranking Clergy", bio: "Highly educated Jesuit missionary priest executed for treason." },

  // Tier 5
  { name: "Roberto Ridolfi", search: "Roberto Ridolfi", group: "⚖️ Tier 5: The \"Middling Sort\" (Wealthy Merchants & Bankers)", bio: "An Italian banker based in London who used his financial networks to organize the Ridolfi Plot in 1571." },

  // Tier 6
  { name: "Chief Wingina", search: "Wingina", group: "🌍 Sovereign Status: Indigenous Leadership", bio: "The ruler (mandoac) of the local Algonquian tribe at Roanoke. While he did not fit into the European feudal hierarchy, he occupied the supreme position of political and military leadership within his own sovereign nation." }
];

async function fetchWikiImageREST(query) {
  try {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query.replace(/ /g, '_'))}`, {
      headers: { 'User-Agent': 'MeoncrossHistoryApp/1.0 (school@meoncross.edu)' }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.thumbnail ? data.thumbnail.source : null;
  } catch (e) {
    return null;
  }
}

async function downloadImage(url, filename) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'MeoncrossHistoryApp/1.0 (school@meoncross.edu)' }
    });
    if (!res.ok) return false;
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(filename, Buffer.from(buffer));
    return true;
  } catch (e) {
    return false;
  }
}

async function run() {
  const resultData = [];
  
  for (const person of individualsList) {
    let imgUrl = null;
    const cleanName = person.name.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/_$/, '');
    const defaultExt = '.jpg';
    let localImagePath = "";
    
    // Check if we already have it
    if (fs.existsSync(path.join(targetDir, cleanName + '.jpg'))) {
        localImagePath = `/images/${cleanName}.jpg`;
    } else if (fs.existsSync(path.join(targetDir, cleanName + '.png'))) {
        localImagePath = `/images/${cleanName}.png`;
    } else {
        console.log(`Fetching image for: ${person.name} (${person.search})...`);
        imgUrl = await fetchWikiImageREST(person.search);
        if (imgUrl) {
            const ext = path.extname(new URL(imgUrl).pathname) || '.jpg';
            const filename = `${cleanName}${ext}`;
            const filepath = path.join(targetDir, filename);
            
            console.log(`Downloading ${imgUrl} to ${filename}...`);
            const success = await downloadImage(imgUrl, filepath);
            if (success) {
                localImagePath = `/images/${filename}`;
            } else {
                console.log(`Failed to download image for ${person.name}`);
            }
        } else {
            console.log(`No Wikipedia image found for ${person.name}`);
        }
    }
    
    resultData.push({
      name: person.name,
      group: person.group,
      bio: person.bio,
      image: localImagePath || ""
    });
    
    // Delay to respect API limits
    await new Promise(r => setTimeout(r, 100));
  }
  
  fs.writeFileSync('new_key_individuals.json', JSON.stringify(resultData, null, 2));
  console.log("Generated new_key_individuals.json successfully.");
}

run();
