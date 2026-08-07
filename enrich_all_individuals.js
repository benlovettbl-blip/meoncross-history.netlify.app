const fs = require('fs');

async function expandAllIndividuals() {
  const file = 'early_modern_world/data.js';
  const m = await import('./early_modern_world/data.js');
  const data = m.unitData || m.default || Object.values(m)[0];

  const enrichedData = {
    "Niccolò Barbaro": {
      "actions": "<ul><li>Served as a medical professional (surgeon/physician) for the Venetian fleet during the 1453 siege.</li><li>Kept a daily, detailed eyewitness diary of the Ottoman bombardment and the final fall of Constantinople.</li></ul>",
      "achievements": ["His diary remains one of the most vital primary sources for European historians studying the siege.", "Provides a unique, on-the-ground perspective of 15th-century warfare and medicine."],
      "limitations": "His account is highly biased; he viewed the Ottomans as 'infidels' and often blamed the Genoese for the city's fall, requiring historians to cross-reference his claims."
    },
    "Sultan Mehmed II": {
      "actions": "<ul><li>Orchestrated the 53-day siege of Constantinople in 1453 using massive cannons and a huge land/sea force.</li><li>Transformed the conquered city into Istanbul, the new capital of the Ottoman Empire.</li><li>Centralised state administration and codified Ottoman law.</li></ul>",
      "achievements": ["Destroyed the 1,000-year-old Byzantine Empire at just 21 years old.", "Expanded the Ottoman Empire deeply into Eastern Europe and the Balkans.", "Fostered a cultural and intellectual renaissance by inviting scholars and artists to Istanbul."],
      "limitations": "His relentless military campaigns drained the Ottoman treasury and provoked endless conflicts with European powers like Venice and Hungary."
    },
    "Mansa Musa": {
      "actions": "<ul><li>Ruled the vast Mali Empire, controlling key trans-Saharan trade routes for gold and salt.</li><li>Undertook a legendary, lavish pilgrimage (Hajj) to Mecca in 1324, distributing massive amounts of gold.</li><li>Brought back Islamic scholars, architects, and bureaucrats to transform Timbuktu.</li></ul>",
      "achievements": ["Built Timbuktu into a globally renowned centre of Islamic learning and commerce.", "Put West Africa on the map for European cartographers (literally, as seen in the Catalan Atlas of 1375).", "Considered by many historians to be the wealthiest individual in human history."],
      "limitations": "His immense wealth distribution in Cairo during his Hajj accidentally caused severe hyperinflation, devastating the local Egyptian economy for a decade."
    },
    "Martin Luther": {
      "actions": "<ul><li>Nailed his '95 Theses' to the church door in Wittenberg in 1517, protesting the sale of indulgences.</li><li>Translated the Bible from Latin into vernacular German so ordinary people could read it.</li><li>Refused to recant his writings at the Diet of Worms (1521), standing against the Holy Roman Emperor.</li></ul>",
      "achievements": ["Sparked the Protestant Reformation, permanently shattering the unity of Western Christianity.", "Pioneered the use of the newly invented printing press to mass-distribute religious propaganda.", "Fundamentally changed European politics, leading to centuries of religious wars."],
      "limitations": "His fiery rhetoric accidentally inspired the violent German Peasants' War (which he then brutally condemned), and his later writings were violently anti-Semitic."
    },
    "Sir Francis Drake": {
      "actions": "<ul><li>Conducted relentless privateering (state-sponsored piracy) raids against Spanish treasure fleets in the Americas.</li><li>Became the first Englishman to circumnavigate the globe (1577-1580).</li><li>Served as Vice-Admiral of the English fleet during the defeat of the Spanish Armada in 1588.</li></ul>",
      "achievements": ["Brought back massive wealth to England, heavily enriching Queen Elizabeth I's treasury.", "Shattered the myth of Spanish naval invincibility.", "Pioneered English global maritime exploration and challenged the Iberian monopoly on global trade."],
      "limitations": "To the Spanish, he was merely a violent pirate ('El Draque'). He was also heavily involved in the early, brutal stages of the English transatlantic slave trade alongside John Hawkins."
    },
    "Queen Elizabeth I": {
      "actions": "<ul><li>Established the Elizabethan Religious Settlement (1559) to stabilise a religiously divided England.</li><li>Secretly funded privateers like Drake to weaken the Spanish Empire's monopoly.</li><li>Rallied English troops at Tilbury before the Spanish Armada with her famous 'heart and stomach of a king' speech.</li></ul>",
      "achievements": ["Oversaw a 'Golden Age' of English culture, literature (Shakespeare), and exploration.", "Successfully defended England against the existential threat of the 1588 Spanish Armada.", "Granted the royal charter to the East India Company in 1600, laying the foundations for the British Empire."],
      "limitations": "She refused to marry or name an heir, creating severe anxiety about the succession. Her policies in Ireland were also aggressively colonial and brutal."
    },
    "Pocahontas": {
      "actions": "<ul><li>Acted as a crucial diplomatic liaison and peacemaker between the Powhatan Confederacy and the struggling Jamestown colonists.</li><li>Allegedly saved the life of English Captain John Smith from execution (though this narrative is debated by historians).</li><li>Married John Rolfe in 1614 (creating the 'Peace of Pocahontas') and travelled to London as a diplomatic symbol.</li></ul>",
      "achievements": ["Her intervention and food provisions were instrumental in the survival of the Jamestown colony during its starving years.", "Challenged English stereotypes of Indigenous peoples during her celebrated tour of London society."],
      "limitations": "Her story was heavily romanticised and weaponised as colonial propaganda by the English. She tragically died of European disease at Gravesend at just 21 years old."
    },
    "King Charles I": {
      "actions": "<ul><li>Ruled without Parliament for 11 years (the 'Personal Rule' or 'Eleven Years Tyranny').</li><li>Attempted to force a new English prayer book on Presbyterian Scotland, sparking the Bishops' Wars.</li><li>Stormed Parliament in 1642 to arrest five MPs, which triggered the English Civil War.</li></ul>",
      "achievements": ["Was a major patron of the arts, assembling one of the greatest art collections in Europe.", "His execution in 1649 established the radical precedent that a monarch could be tried and killed by their own people for treason."],
      "limitations": "His absolute belief in the 'Divine Right of Kings' made him dangerously uncompromising, ultimately destroying his own monarchy and plunging the British Isles into a devastating, bloody civil war."
    },
    "Oliver Cromwell": {
      "actions": "<ul><li>Reorganised the Parliamentarian forces into the highly disciplined and effective New Model Army.</li><li>Signed King Charles I's death warrant and oversaw the abolition of the monarchy.</li><li>Ruled England, Scotland, and Ireland as 'Lord Protector', acting as a military dictator.</li></ul>",
      "achievements": ["Won the English Civil War, defeating Royalist forces at key battles like Naseby.", "Temporarily established the only republican government in British history.", "Aggressively expanded English naval and commercial power against the Dutch and Spanish."],
      "limitations": "His brutal military campaign in Ireland (including the massacres at Drogheda and Wexford) left a legacy of deep, enduring hatred. His puritanical regime banned popular pastimes like theatre and Christmas."
    },
    "Olaudah Equiano": {
      "actions": "<ul><li>Survived the horrors of the Middle Passage and enslavement in the Caribbean and Americas.</li><li>Purchased his own freedom in 1766 for £40 after working as a merchant seaman.</li><li>Published 'The Interesting Narrative of the Life of Olaudah Equiano' in 1789 and toured the UK speaking against slavery.</li></ul>",
      "achievements": ["His autobiography became a massive bestseller, providing irrefutable, first-hand evidence of the brutal realities of slavery.", "Became a leading figure in the British abolitionist movement, working closely with the Sons of Africa.", "Fundamentally shifted British public opinion against the Transatlantic Slave Trade."],
      "limitations": "Despite his immense influence, he died in 1797, ten years before the British Parliament finally abolished the slave trade in 1807."
    }
  };

  data.key_individuals.forEach(person => {
    const enrichment = enrichedData[person.name];
    if (enrichment) {
      person.actions = enrichment.actions;
      person.achievements = enrichment.achievements;
      person.limitations = enrichment.limitations;
    }
  });

  const output = `export const unitData = ${JSON.stringify(data, null, 2)};`;
  fs.writeFileSync(file, output);
  console.log("Successfully enriched all individuals.");
}

expandAllIndividuals().catch(console.error);
