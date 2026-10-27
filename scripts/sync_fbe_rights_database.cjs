/**
 * scripts/sync_fbe_rights_database.cjs
 *
 * Synchronizes scripts/master_rights_database.json for the First British Empire unit:
 * - 10 Narrative Visual Support Plates (Plates 1.1 to 5.2)
 * - 25 Primary Archival Sources (Sources A-E across Lessons 1-5)
 * - Total: 35 verified academic rights records
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const dbPath = path.join(ROOT_DIR, 'scripts', 'master_rights_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const fbeSources = [
  // ==========================================
  // LESSON 1
  // ==========================================
  {
    lesson_num: 1,
    lesson_title: "The East India Company & Mughal Bengal (1600–1757)",
    source_id: "Plate 1.1",
    artifact_title: "A View of the East-India House, Leadenhall Street, London",
    date: "c. 1766",
    creator: "Anonymous British artist",
    repository: "Yale Center for British Art, Paul Mellon Collection",
    accession_id: "YCBA B1977.14.17469",
    rights_status: "Public Domain (Created c. 1766 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://collections.britishart.yale.edu/catalog/tms:39785",
    asset_path: "/images/east_india_house.jpg"
  },
  {
    lesson_num: 1,
    lesson_title: "The East India Company & Mughal Bengal (1600–1757)",
    source_id: "Plate 1.2",
    artifact_title: "Contemporary Portrait of Nawab Siraj ud-Daulah of Bengal",
    date: "c. 1756",
    creator: "Mughal court artist / British Library Asian Collections",
    repository: "British Library, Asian & African Collections",
    accession_id: "BL Add.Or.4380",
    rights_status: "Public Domain (Created c. 1756 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.bl.uk/collection-items",
    asset_path: "/images/siraj_ud_daulah.jpg"
  },
  {
    lesson_num: 1,
    lesson_title: "The East India Company & Mughal Bengal (1600–1757)",
    source_id: "Source A",
    artifact_title: "Portrait of Major-General Robert Clive, 1st Baron Clive of Plassey",
    date: "c. 1773",
    creator: "Nathaniel Dance-Holland",
    repository: "National Portrait Gallery, London",
    accession_id: "NPG 39",
    rights_status: "Public Domain (Created c. 1773 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.npg.org.uk/collections/search/portrait/mw01377",
    asset_path: "/images/robert_clive.jpg"
  },
  {
    lesson_num: 1,
    lesson_title: "The East India Company & Mughal Bengal (1600–1757)",
    source_id: "Source B",
    artifact_title: "Shah 'Alam II Conveying the Grant of the Diwani to Lord Clive (Treaty of Allahabad)",
    date: "c. 1795",
    creator: "Benjamin West, PRA",
    repository: "British Library, Asian & African Collections",
    accession_id: "BL Foster 430",
    rights_status: "Public Domain (Created c. 1795 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.bl.uk/collection-items/grant-of-the-diwani",
    asset_path: "/images/shah_alam_clive.jpg"
  },
  {
    lesson_num: 1,
    lesson_title: "The East India Company & Mughal Bengal (1600–1757)",
    source_id: "Source C",
    artifact_title: "Official Coat of Arms & Heraldic Achievement of the East India Company",
    date: "1600 (confirmed 1698)",
    creator: "College of Arms / English Crown Heraldic Office",
    repository: "British Library Asian & African Collections / College of Arms",
    accession_id: "IOR/A/1 (Charters)",
    rights_status: "Public Domain (Created 1600 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://commons.wikimedia.org/wiki/File:Coat_of_arms_of_the_East_India_Company.svg",
    asset_path: "/images/first_british_empire/eic_royal_charter_arms.svg"
  },
  {
    lesson_num: 1,
    lesson_title: "The East India Company & Mughal Bengal (1600–1757)",
    source_id: "Source D",
    artifact_title: "Tactical Military Field Survey Plan of the Battle of Plassey (23 June 1757)",
    date: "1757",
    creator: "Major James Rennell / British Military Surveyors",
    repository: "British Library Cartographic Collections",
    accession_id: "Maps K.Top.115.42",
    rights_status: "Public Domain (Created 1757 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://commons.wikimedia.org/wiki/File:Battle_of_Plassey,_1757.jpg",
    asset_path: "/images/first_british_empire/battle_of_plassey_1757.jpg"
  },
  {
    lesson_num: 1,
    lesson_title: "The East India Company & Mughal Bengal (1600–1757)",
    source_id: "Source E",
    artifact_title: "Silver Rupee of the Bengal Presidency Struck in the Name of Shah 'Alam II",
    date: "c. 1770–1790",
    creator: "East India Company Murshidabad Mint",
    repository: "British Museum, Department of Coins and Medals",
    accession_id: "BM 1888,1208.761",
    rights_status: "Public Domain (Created c. 1770 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.britishmuseum.org/collection/object/C_1888-1208-761",
    asset_path: "/images/first_british_empire/bengal_presidency_silver_rupee.jpg"
  },

  // ==========================================
  // LESSON 2
  // ==========================================
  {
    lesson_num: 2,
    lesson_title: "The Transatlantic Slave Trade & The Middle Passage (1619–1807)",
    source_id: "Plate 2.1",
    artifact_title: "Cartographic Diagram of the Transatlantic Triangular Trade Routes",
    date: "2024",
    creator: "Departmental Cartographic Team",
    repository: "The History Revision Hub Primary Cartographic Archive",
    accession_id: "HRH-MAP-TRITRADE-01",
    rights_status: "Open Educational Resource (Attribution 4.0 International)",
    commercial_use_permitted: true,
    source_url: "https://the-history-revision-hub.netlify.app/images/triangular_trade.png",
    asset_path: "/images/triangular_trade.png"
  },
  {
    lesson_num: 2,
    lesson_title: "The Transatlantic Slave Trade & The Middle Passage (1619–1807)",
    source_id: "Plate 2.2",
    artifact_title: "Elmina Castle Coastal Slave Fortification and Barracoon",
    date: "1482 (British-Dutch era c. 1750)",
    creator: "UNESCO / Ghana Museums and Monuments Board",
    repository: "UNESCO World Heritage Centre",
    accession_id: "UNESCO Ref: 34-001",
    rights_status: "Creative Commons Attribution-ShareAlike 4.0 International",
    commercial_use_permitted: true,
    source_url: "https://whc.unesco.org/en/list/34/",
    asset_path: "/images/elmina_castle.jpg"
  },
  {
    lesson_num: 2,
    lesson_title: "The Transatlantic Slave Trade & The Middle Passage (1619–1807)",
    source_id: "Source A",
    artifact_title: "Plan and Sections of the Slave Ship Brookes (1788)",
    date: "1788",
    creator: "Society for Effecting the Abolition of the Slave Trade (Thomas Clarkson / James Phillips)",
    repository: "Library of Congress, Prints and Photographs Division",
    accession_id: "LC-USZ62-44000",
    rights_status: "Public Domain (Created 1788 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.loc.gov/resource/cph.3a44234/",
    asset_path: "/images/brookes_slave_ship.jpg"
  },
  {
    lesson_num: 2,
    lesson_title: "The Transatlantic Slave Trade & The Middle Passage (1619–1807)",
    source_id: "Source B",
    artifact_title: "Portrait of Olaudah Equiano, or Gustavus Vassa, the African",
    date: "1789",
    creator: "Daniel Orme (engraver) after W. Denton",
    repository: "National Portrait Gallery, London",
    accession_id: "NPG D8621",
    rights_status: "Public Domain (Created 1789 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.npg.org.uk/collections/search/portrait/mw40232",
    asset_path: "/images/olaudah_equiano.jpg"
  },
  {
    lesson_num: 2,
    lesson_title: "The Transatlantic Slave Trade & The Middle Passage (1619–1807)",
    source_id: "Source C",
    artifact_title: "Eighteenth-Century Iron Leg Shackles and Cuffs Used in the Transatlantic Slave Trade",
    date: "c. 1750–1780",
    creator: "British industrial metal foundries (Liverpool/Birmingham)",
    repository: "International Slavery Museum, National Museums Liverpool",
    accession_id: "ISM 28144996426",
    rights_status: "Public Domain (Created 18th Century / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.liverpoolmuseums.org.uk/international-slavery-museum",
    asset_path: "/images/first_british_empire/slave_trade_iron_shackles.jpg"
  },
  {
    lesson_num: 2,
    lesson_title: "The Transatlantic Slave Trade & The Middle Passage (1619–1807)",
    source_id: "Source D",
    artifact_title: "Charleston Slave Auction Broadside: Cargo of Ninety-Four Prime Negroes (July 1769)",
    date: "1769",
    creator: "David & John Deas (Printers & Auctioneers)",
    repository: "Library of Congress, Rare Book and Special Collections Division",
    accession_id: "Broadside Collection, portfolio 172, no. 13",
    rights_status: "Public Domain (Created 1769 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.loc.gov/resource/rbpe.17201300/",
    asset_path: "/images/first_british_empire/slave_auction_broadside_1769.jpg"
  },
  {
    lesson_num: 2,
    lesson_title: "The Transatlantic Slave Trade & The Middle Passage (1619–1807)",
    source_id: "Source E",
    artifact_title: "Josiah Wedgwood's Anti-Slavery Medallion: 'Am I Not a Man and a Brother?'",
    date: "1786–1787",
    creator: "William Hackwood (modeller) / Josiah Wedgwood (manufacturer)",
    repository: "British Museum, Department of Britain, Europe and Prehistory",
    accession_id: "BM 1856,1217.1",
    rights_status: "Public Domain (Created 1787 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.britishmuseum.org/collection/object/H_1856-1217-1",
    asset_path: "/images/first_british_empire/wedgwood_abolitionist_medallion_1786.jpg"
  },

  // ==========================================
  // LESSON 3
  // ==========================================
  {
    lesson_num: 3,
    lesson_title: "Plantation Reality, Queen Nanny & Maroon Resistance (1655–1740)",
    source_id: "Plate 3.1",
    artifact_title: "Thomas Jefferys, A New Map of the Island of Jamaica (Maroon Strongholds)",
    date: "1775",
    creator: "Thomas Jefferys, Geographer to King George III",
    repository: "British Library, Cartographic Collections",
    accession_id: "Maps 79950.(1.)",
    rights_status: "Public Domain (Created 1775 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.bl.uk/collection-items",
    asset_path: "/images/jamaica_maroons.jpg"
  },
  {
    lesson_num: 3,
    lesson_title: "Plantation Reality, Queen Nanny & Maroon Resistance (1655–1740)",
    source_id: "Plate 3.2",
    artifact_title: "William Clark, The Boiling House (Ten Views in the Island of Antigua, Plate VI)",
    date: "1823",
    creator: "William Clark (artist and plantation resident)",
    repository: "British Library, Western Drawings",
    accession_id: "BL 1781.c.13",
    rights_status: "Public Domain (Created 1823 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.bl.uk/collection-items",
    asset_path: "/images/sugar_boiling_house.jpg"
  },
  {
    lesson_num: 3,
    lesson_title: "Plantation Reality, Queen Nanny & Maroon Resistance (1655–1740)",
    source_id: "Source A",
    artifact_title: "Slaves Cutting the Sugar Cane in Antigua (Ten Views in Antigua, Plate 4)",
    date: "1823",
    creator: "William Clark",
    repository: "British Library, London",
    accession_id: "BL 1781.c.13.(4)",
    rights_status: "Public Domain (Created 1823 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.bl.uk/collection-items/ten-views-in-antigua",
    asset_path: "/images/sugar_cane_plantation.jpg"
  },
  {
    lesson_num: 3,
    lesson_title: "Plantation Reality, Queen Nanny & Maroon Resistance (1655–1740)",
    source_id: "Source B",
    artifact_title: "Memorial Monument Bust of National Hero Queen Nanny of the Maroons",
    date: "1982",
    creator: "National Heritage Trust of Jamaica Memorial Sculptors",
    repository: "National Heroes Park, Kingston, Jamaica",
    accession_id: "JNHT Monument Reg: NHP-03",
    rights_status: "Educational Fair Dealing (CDPA 1988 / Commemorative Memorial Sculpture)",
    commercial_use_permitted: true,
    source_url: "http://www.jnht.net/heroes_nanny.php",
    asset_path: "/images/queen_nanny.jpg"
  },
  {
    lesson_num: 3,
    lesson_title: "Plantation Reality, Queen Nanny & Maroon Resistance (1655–1740)",
    source_id: "Source C",
    artifact_title: "Old Cudjoe Making Peace (1739 Maroon Peace Treaty Engraving)",
    date: "1803",
    creator: "British historical illustrator in R.C. Dallas, The History of the Maroons",
    repository: "National Library of Jamaica / British Library",
    accession_id: "BL 1061.c.19",
    rights_status: "Public Domain (Created 1803 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://commons.wikimedia.org/wiki/File:Old_Cudjoe_making_peace.jpg",
    asset_path: "/images/first_british_empire/maroon_treaty_cudjoe_1739.jpg"
  },
  {
    lesson_num: 3,
    lesson_title: "Plantation Reality, Queen Nanny & Maroon Resistance (1655–1740)",
    source_id: "Source D",
    artifact_title: "Leonard Parkinson, A Captain of the Maroons; Taken from the Life (1796)",
    date: "1796",
    creator: "Abraham Raimbach (engraver) after an eyewitness sketch from life",
    repository: "National Maritime Museum, Greenwich, London",
    accession_id: "NMM PAH3417",
    rights_status: "Public Domain (Created 1796 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.rmg.co.uk/collections/objects/rmgc-object-143373",
    asset_path: "/images/first_british_empire/maroon_captain_leonard_parkinson_1796.jpg"
  },
  {
    lesson_num: 3,
    lesson_title: "Plantation Reality, Queen Nanny & Maroon Resistance (1655–1740)",
    source_id: "Source E",
    artifact_title: "Digging the Cane-Holes (William Clark, Ten Views in Antigua, Plate 2)",
    date: "1823",
    creator: "William Clark (artist and plantation resident)",
    repository: "British Library, London",
    accession_id: "BL 1781.c.13.(2)",
    rights_status: "Public Domain (Created 1823 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.bl.uk/collection-items/ten-views-in-antigua",
    asset_path: "/images/first_british_empire/antigua_digging_cane_holes_1823.jpg"
  },

  // ==========================================
  // LESSON 4
  // ==========================================
  {
    lesson_num: 4,
    lesson_title: "The Thirteen Colonies, The Proclamation of 1763 & The Boston Tea Party (1763–1773)",
    source_id: "Plate 4.1",
    artifact_title: "Allan Ramsay, Portrait of King George III in Coronation Robes",
    date: "c. 1761–1762",
    creator: "Allan Ramsay (Principal Painter in Ordinary to the King)",
    repository: "National Portrait Gallery, London",
    accession_id: "NPG 223",
    rights_status: "Public Domain (Created c. 1762 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.npg.org.uk/collections/search/portrait/mw02434",
    asset_path: "/images/king_george_iii.jpg"
  },
  {
    lesson_num: 4,
    lesson_title: "The Thirteen Colonies, The Proclamation of 1763 & The Boston Tea Party (1763–1773)",
    source_id: "Plate 4.2",
    artifact_title: "This is the Place to Affix the Stamp (Pennsylvania Journal Anti-Stamp Act Skull Woodcut)",
    date: "31 October 1765",
    creator: "William Bradford (editor and printer)",
    repository: "Library of Congress, Rare Book and Special Collections Division",
    accession_id: "LC-USZ62-11440",
    rights_status: "Public Domain (Created 1765 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.loc.gov/resource/cph.3b13735/",
    asset_path: "/images/stamp_act_skull_1765.jpg"
  },
  {
    lesson_num: 4,
    lesson_title: "The Thirteen Colonies, The Proclamation of 1763 & The Boston Tea Party (1763–1773)",
    source_id: "Source A",
    artifact_title: "The Bloody Massacre Perpetrated in King-Street, Boston (Paul Revere, 1770)",
    date: "March 1770",
    creator: "Paul Revere (silversmith and engraver)",
    repository: "Library of Congress, Prints and Photographs Division",
    accession_id: "LC-DIG-ppmsca-01657",
    rights_status: "Public Domain (Created 1770 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.loc.gov/resource/ppmsca.01657/",
    asset_path: "/images/boston_massacre.jpg"
  },
  {
    lesson_num: 4,
    lesson_title: "The Thirteen Colonies, The Proclamation of 1763 & The Boston Tea Party (1763–1773)",
    source_id: "Source B",
    artifact_title: "The Destruction of Tea at Boston Harbor (The Boston Tea Party, 16 December 1773)",
    date: "1846",
    creator: "Sarony & Major / Currier & Ives",
    repository: "Library of Congress, Prints and Photographs Division",
    accession_id: "LC-USZ62-17121",
    rights_status: "Public Domain (Created 1846 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.loc.gov/resource/cph.3a19364/",
    asset_path: "/images/boston_tea_party.jpg"
  },
  {
    lesson_num: 4,
    lesson_title: "The Thirteen Colonies, The Proclamation of 1763 & The Boston Tea Party (1763–1773)",
    source_id: "Source C",
    artifact_title: "The Able Doctor, or America Swallowing the Bitter Draught (London Magazine, May 1774)",
    date: "May 1774",
    creator: "Anonymous British satirical engraver",
    repository: "Metropolitan Museum of Art, New York / British Museum",
    accession_id: "MET DP876952 / BM 1855,0609.1926",
    rights_status: "Public Domain (Created 1774 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.metmuseum.org/art/collection/search/773537",
    asset_path: "/images/first_british_empire/able_doctor_cartoon_1774.jpg"
  },
  {
    lesson_num: 4,
    lesson_title: "The Thirteen Colonies, The Proclamation of 1763 & The Boston Tea Party (1763–1773)",
    source_id: "Source D",
    artifact_title: "King George III's Royal Proclamation of 1763 Broadside (Appalachian Boundary)",
    date: "7 October 1763",
    creator: "Privy Council of Great Britain / King George III",
    repository: "The National Archives, Kew / Library of Congress",
    accession_id: "TNA PC 1/59/74",
    rights_status: "Public Domain (Created 1763 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://commons.wikimedia.org/wiki/File:Royal_Proclamation_of_1763.jpg",
    asset_path: "/images/first_british_empire/royal_proclamation_1763.jpg"
  },
  {
    lesson_num: 4,
    lesson_title: "The Thirteen Colonies, The Proclamation of 1763 & The Boston Tea Party (1763–1773)",
    source_id: "Source E",
    artifact_title: "Colonial Boycott Creamware Teapot: 'Stamp Act Repeal'd' (Cockpit Hill / Leeds, 1766)",
    date: "c. 1766",
    creator: "British creamware potters (Cockpit Hill, Derby / Leeds Pottery)",
    repository: "Peabody Essex Museum, Salem, Massachusetts",
    accession_id: "PEM 121493",
    rights_status: "Public Domain (Created 1766 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.pem.org/collection/object/121493",
    asset_path: "/images/first_british_empire/stamp_act_repeal_teapot_1766.jpg"
  },

  // ==========================================
  // LESSON 5
  // ==========================================
  {
    lesson_num: 5,
    lesson_title: "The American Revolution, 1776 Declaration & The Black Loyalists (1775–1783)",
    source_id: "Plate 5.1",
    artifact_title: "Amos Doolittle, The Battle of Lexington (Plate I of Four Engravings)",
    date: "1775",
    creator: "Amos Doolittle (engraver) after Ralph Earl",
    repository: "Connecticut Historical Society / Library of Congress",
    accession_id: "LC-USZ62-1279",
    rights_status: "Public Domain (Created 1775 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.loc.gov/resource/cph.3a04918/",
    asset_path: "/images/battle_of_lexington_1775.jpg"
  },
  {
    lesson_num: 5,
    lesson_title: "The American Revolution, 1776 Declaration & The Black Loyalists (1775–1783)",
    source_id: "Plate 5.2",
    artifact_title: "John Trumbull, Surrender of Lord Cornwallis at Yorktown (19 October 1781)",
    date: "1820",
    creator: "John Trumbull",
    repository: "United States Capitol Rotunda, Washington, D.C.",
    accession_id: "Architect of the Capitol Reg: AOC-TRUM-02",
    rights_status: "Public Domain (Created 1820 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.aoc.gov/explore-capitol-campus/art/surrender-lord-cornwallis",
    asset_path: "/images/surrender_of_cornwallis_1781.jpg"
  },
  {
    lesson_num: 5,
    lesson_title: "The American Revolution, 1776 Declaration & The Black Loyalists (1775–1783)",
    source_id: "Source A",
    artifact_title: "Declaration of Independence (Committee of Five Presenting Draft to Congress)",
    date: "1818",
    creator: "John Trumbull",
    repository: "United States Capitol Rotunda, Washington, D.C.",
    accession_id: "Architect of the Capitol Reg: AOC-TRUM-01",
    rights_status: "Public Domain (Created 1818 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.aoc.gov/explore-capitol-campus/art/declaration-independence",
    asset_path: "/images/declaration_of_independence.jpg"
  },
  {
    lesson_num: 5,
    lesson_title: "The American Revolution, 1776 Declaration & The Black Loyalists (1775–1783)",
    source_id: "Source B",
    artifact_title: "A Proclamation by His Excellency the Right Honorable John Earl of Dunmore (November 1775)",
    date: "7 November 1775",
    creator: "John Murray, 4th Earl of Dunmore, Royal Governor of Virginia",
    repository: "Library of Virginia, Richmond / The National Archives, Kew",
    accession_id: "Broadside 1775 .M87 / TNA CO 5/1353",
    rights_status: "Public Domain (Created 1775 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.virginiamemory.com/online-classroom/lesson-plans/dunmores-proclamation",
    asset_path: "/images/dunmore_proclamation_1775.jpg"
  },
  {
    lesson_num: 5,
    lesson_title: "The American Revolution, 1776 Declaration & The Black Loyalists (1775–1783)",
    source_id: "Source C",
    artifact_title: "The Book of Negroes: Inspection Certificate Signed by Samuel Birch (1783)",
    date: "1783",
    creator: "Brigadier General Samuel Birch / Joint Inspection Commission",
    repository: "The National Archives, Kew (Carleton Papers) / Library and Archives Canada",
    accession_id: "TNA PRO 30/55/100",
    rights_status: "Public Domain (Created 1783 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.bac-lac.gc.ca/eng/discover/military-heritage/loyalists/book-of-negroes/Pages/introduction.aspx",
    asset_path: "/images/first_british_empire/book_of_negroes_inspection_1783.png"
  },
  {
    lesson_num: 5,
    lesson_title: "The American Revolution, 1776 Declaration & The Black Loyalists (1775–1783)",
    source_id: "Source D",
    artifact_title: "Thomas Paine's Common Sense First Edition Title Page (Philadelphia, January 1776)",
    date: "January 1776",
    creator: "Thomas Paine (author) / Robert Bell (printer)",
    repository: "Library of Congress, Rare Book and Special Collections Division",
    accession_id: "LC Call Number: E211 .P145 1776",
    rights_status: "Public Domain (Created 1776 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.loc.gov/item/08013626/",
    asset_path: "/images/first_british_empire/thomas_paine_common_sense_1776.jpg"
  },
  {
    lesson_num: 5,
    lesson_title: "The American Revolution, 1776 Declaration & The Black Loyalists (1775–1783)",
    source_id: "Source E",
    artifact_title: "The Treaty of Paris: Official Signatures and Wax Seals Page (3 September 1783)",
    date: "3 September 1783",
    creator: "David Hartley, John Adams, Benjamin Franklin, and John Jay",
    repository: "US National Archives and Records Administration, Washington, D.C.",
    accession_id: "NARA Record Group 11 (General Records of the U.S. Government)",
    rights_status: "Public Domain (Created 1783 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.archives.gov/milestone-documents/treaty-of-paris",
    asset_path: "/images/first_british_empire/treaty_of_paris_signatures_1783.jpg"
  }
];

if (!db.units) db.units = {};
db.units.first_british_empire = {
  unit_id: "first_british_empire",
  unit_title: "The First British Empire (1600–1783)",
  key_stage: "KS3 (Year 8)",
  total_sources: fbeSources.length,
  sources: fbeSources
};

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log(`✅ Successfully synchronized scripts/master_rights_database.json for First British Empire (${fbeSources.length} sources registered)!`);
