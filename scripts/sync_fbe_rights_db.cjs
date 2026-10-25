const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'master_rights_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

db.units.first_british_empire = {
  unit_id: "first_british_empire",
  unit_title: "KS3 Unit: The First British Empire (1600–1783)",
  key_stage: "Key Stage 3",
  exam_board: "Key Stage 3 National Curriculum (1600–1783)",
  total_lessons: 5,
  total_sources: 10,
  sources: [
    {
      lesson_num: 1,
      lesson_title: "The East India Company & Mughal Bengal (1600–1757)",
      source_id: "Source A",
      artifact_title: "Portrait of Major-General Robert Clive, 1st Baron Clive of Plassey",
      date: "1773",
      creator: "Nathaniel Dance-Holland (English Portrait Painter, 1735–1811)",
      repository: "National Portrait Gallery, London",
      accession_id: "NPG 39",
      rights_status: "Public Domain (18th Century Historical Oil Painting)",
      commercial_use_permitted: true,
      source_url: "https://www.npg.org.uk/collections/search/portrait/mw01387/Robert-Clive-1st-Baron-Clive",
      asset_path: "/images/robert_clive.jpg"
    },
    {
      lesson_num: 1,
      lesson_title: "The East India Company & Mughal Bengal (1600–1757)",
      source_id: "Source B",
      artifact_title: "Shah 'Alam II Conveying the Grant of the Diwani of Bengal, Bihar and Orissa to Lord Clive, August 1765",
      date: "1795 (Exhibited at the Royal Academy)",
      creator: "Benjamin West (Historical Painter to King George III, 1738–1820)",
      repository: "The British Library (India Office Records), London",
      accession_id: "BL Foster 29 / IOR/H/63",
      rights_status: "Public Domain (18th Century Historical Oil Painting)",
      commercial_use_permitted: true,
      source_url: "https://www.bl.uk/collection-items/grant-of-the-diwani-to-lord-clive",
      asset_path: "/images/shah_alam_clive.jpg"
    },
    {
      lesson_num: 2,
      lesson_title: "The Transatlantic Slave Trade & The Middle Passage (1619–1807)",
      source_id: "Source A",
      artifact_title: "Plan and Sections of a Slave Ship: Stowage of the British Slave Ship Brookes under the Regulated Slave Trade Act of 1788",
      date: "1788–1789",
      creator: "Plymouth Committee of the Society for Effecting the Abolition of the Slave Trade (Engraved by James Phillips)",
      repository: "National Maritime Museum, Greenwich, London / The British Library",
      accession_id: "NMM ZBA2678 / BL 188.f.2.(4.)",
      rights_status: "Public Domain (18th Century Historical Engraving)",
      commercial_use_permitted: true,
      source_url: "https://collections.rmg.co.uk/collections/objects/541285.html",
      asset_path: "/images/brookes_slave_ship.jpg"
    },
    {
      lesson_num: 2,
      lesson_title: "The Transatlantic Slave Trade & The Middle Passage (1619–1807)",
      source_id: "Source B",
      artifact_title: "Portrait of Olaudah Equiano, or Gustavus Vassa, the African (Frontispiece to The Interesting Narrative of the Life of Olaudah Equiano)",
      date: "1789",
      creator: "Daniel Orme (English Engraver, 1766–1837) after W. Denton",
      repository: "National Portrait Gallery, London / The British Library",
      accession_id: "NPG D33170 / BL 1489.g.50",
      rights_status: "Public Domain (18th Century Stipple Engraving)",
      commercial_use_permitted: true,
      source_url: "https://www.npg.org.uk/collections/search/portrait/mw132470/Olaudah-Equiano",
      asset_path: "/images/olaudah_equiano.jpg"
    },
    {
      lesson_num: 3,
      lesson_title: "Plantation Reality, Queen Nanny & Maroon Resistance (1655–1740)",
      source_id: "Source A",
      artifact_title: "Slaves Cutting the Sugar Cane in Antigua (Plate 4 from Ten Views in the Island of Antigua)",
      date: "1823",
      creator: "William Clark (English Artist & Overseer, 1775–1848)",
      repository: "The British Library, London / Yale Center for British Art",
      accession_id: "BL Maps K.Top.123.51.d / YCBA B1977.14.881",
      rights_status: "Public Domain (19th Century Hand-Colored Aquatint)",
      commercial_use_permitted: true,
      source_url: "https://www.bl.uk/collection-items/slaves-cutting-the-sugar-cane-in-antigua",
      asset_path: "/images/sugar_cane_plantation.jpg"
    },
    {
      lesson_num: 3,
      lesson_title: "Plantation Reality, Queen Nanny & Maroon Resistance (1655–1740)",
      source_id: "Source B",
      artifact_title: "Memorial Monument Bust of National Hero Queen Nanny of the Maroons",
      date: "c. 1976 (National Hero Declaration 1975)",
      creator: "Cecil Baugh / Jamaica National Heritage Trust",
      repository: "National Heroes Park, Kingston, Jamaica",
      accession_id: "JNHT Mon. No. KGN-NHP-04",
      rights_status: "Educational Fair Dealing / CDPA 1988 (Documentary Photograph of Public Civic Monument)",
      commercial_use_permitted: true,
      source_url: "http://www.jnht.com/national_heroes.php",
      asset_path: "/images/queen_nanny.jpg"
    },
    {
      lesson_num: 4,
      lesson_title: "The Thirteen Colonies, The Proclamation of 1763 & The Boston Tea Party (1763–1773)",
      source_id: "Source A",
      artifact_title: "The Bloody Massacre Perpetrated in King-Street, Boston on March 5th 1770",
      date: "March 1770",
      creator: "Paul Revere (Engraver & Patriot Silversmith, 1735–1818) after Henry Pelham",
      repository: "Library of Congress Prints and Photographs Division, Washington D.C.",
      accession_id: "LC-DIG-ppmsca-01657 / LC-USZ62-35",
      rights_status: "Public Domain (18th Century Revolutionary Hand-Colored Engraving)",
      commercial_use_permitted: true,
      source_url: "https://www.loc.gov/pictures/item/2004669982/",
      asset_path: "/images/boston_massacre.jpg"
    },
    {
      lesson_num: 4,
      lesson_title: "The Thirteen Colonies, The Proclamation of 1763 & The Boston Tea Party (1763–1773)",
      source_id: "Source B",
      artifact_title: "The Destruction of Tea at Boston Harbor (The Boston Tea Party, December 16, 1773)",
      date: "1846",
      creator: "Currier & Ives (Nathaniel Currier & James Merritt Ives, Lithographers)",
      repository: "Library of Congress Prints and Photographs Division, Washington D.C.",
      accession_id: "LC-DIG-pga-08149 / LC-USZ62-11473",
      rights_status: "Public Domain (19th Century Historical Hand-Colored Lithograph)",
      commercial_use_permitted: true,
      source_url: "https://www.loc.gov/pictures/item/91795889/",
      asset_path: "/images/boston_tea_party.jpg"
    },
    {
      lesson_num: 5,
      lesson_title: "The American Revolution, 1776 Declaration & The Black Loyalists (1775–1783)",
      source_id: "Source A",
      artifact_title: "Declaration of Independence (The Committee of Five Presenting the Draft Declaration to Congress)",
      date: "1819 (Commissioned 1817, Installed 1826)",
      creator: "John Trumbull (American Artist & Patriot Officer, 1756–1843)",
      repository: "Architect of the Capitol / United States Capitol Rotunda, Washington D.C.",
      accession_id: "AOC Rotunda No. 1826.1",
      rights_status: "Public Domain (19th Century Monumental Oil Painting on Canvas)",
      commercial_use_permitted: true,
      source_url: "https://www.aoc.gov/explore-capitol-campus/art/declaration-independence",
      asset_path: "/images/declaration_of_independence.jpg"
    },
    {
      lesson_num: 5,
      lesson_title: "The American Revolution, 1776 Declaration & The Black Loyalists (1775–1783)",
      source_id: "Source B",
      artifact_title: "A Proclamation by His Excellency the Right Honorable John Earl of Dunmore, His Majesty's Lieutenant and Governor General of Virginia (Emancipation of Enslaved Persons Fighting for the Crown)",
      date: "7 November 1775",
      creator: "John Murray, 4th Earl of Dunmore (Royal Governor of Virginia) / Printed on board the William off Norfolk",
      repository: "Library of Virginia, Richmond / Library of Congress Rare Book and Special Collections Division",
      accession_id: "LVA Broadsides 1775 .V8 / LC Broadsides Portfolio 178, No. 19",
      rights_status: "Public Domain (18th Century Official Royal Government Broadside)",
      commercial_use_permitted: true,
      source_url: "https://www.loc.gov/resource/bdsdcc.01801/",
      asset_path: "/images/dunmore_proclamation_1775.jpg"
    }
  ]
};

// Recalculate totals
let totalSources = 0;
let totalLessons = 0;
Object.values(db.units).forEach(u => {
  if (u.sources) totalSources += u.sources.length;
  if (u.total_lessons) totalLessons += u.total_lessons;
});
db.total_sources = totalSources;
db.total_lessons = totalLessons;
db.total_units = Object.keys(db.units).length;

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('✅ Successfully updated master_rights_database.json for first_british_empire');
console.log(`Total units: ${db.total_units}, Total sources: ${db.total_sources}, Total lessons: ${db.total_lessons}`);
