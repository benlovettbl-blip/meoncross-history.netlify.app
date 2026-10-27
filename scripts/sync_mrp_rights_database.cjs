/**
 * scripts/sync_mrp_rights_database.cjs
 *
 * Synchronizes scripts/master_rights_database.json for the Crown, Church, or Parliament (1517–1689) unit:
 * - 10 Narrative Visual Support Plates (Plates 1.1 to 5.2)
 * - 25 Primary Archival Sources (Sources A-E across Lessons 1-5)
 * - Total: 35 verified academic rights records
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const dbPath = path.join(ROOT_DIR, 'scripts', 'master_rights_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const mrpSources = [
  // ==========================================
  // LESSON 1
  // ==========================================
  {
    lesson_num: 1,
    lesson_title: "The Reformation & The Break with Rome (1517–1547)",
    source_id: "Plate 1.1",
    artifact_title: "Portrait of Cardinal Thomas Wolsey, Lord Chancellor of England",
    date: "c. 1590 (after early 16th-century prototype)",
    creator: "Sampson Strong / Anonymous English artist",
    repository: "National Portrait Gallery, London",
    accession_id: "NPG 320",
    rights_status: "Public Domain (Created 16th Century / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.npg.org.uk/collections/search/portrait/mw06894",
    asset_path: "/images/cardinal_wolsey.jpg"
  },
  {
    lesson_num: 1,
    lesson_title: "The Reformation & The Break with Rome (1517–1547)",
    source_id: "Plate 1.2",
    artifact_title: "Portrait of Thomas Cromwell, 1st Earl of Essex",
    date: "1532–1533",
    creator: "Hans Holbein the Younger",
    repository: "The Frick Collection, New York",
    accession_id: "Frick 1915.1.79",
    rights_status: "Public Domain (Created 1533 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://collections.frick.org/objects/109/thomas-cromwell",
    asset_path: "/images/thomas_cromwell.jpg"
  },
  {
    lesson_num: 1,
    lesson_title: "The Reformation & The Break with Rome (1517–1547)",
    source_id: "Source A",
    artifact_title: "Martin Luther in Academic Doctor's Robes",
    date: "1529",
    creator: "Lucas Cranach the Elder",
    repository: "Uffizi Gallery, Florence",
    accession_id: "Uffizi Inv. 1890 n. 1150",
    rights_status: "Public Domain (Created 1529 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.uffizi.it/en/artworks/portrait-of-martin-luther",
    asset_path: "/images/martin_luther_portrait.jpg"
  },
  {
    lesson_num: 1,
    lesson_title: "The Reformation & The Break with Rome (1517–1547)",
    source_id: "Source B",
    artifact_title: "The Family of Henry VIII: An Allegory of the Tudor Succession",
    date: "c. 1545",
    creator: "Unknown English / Flemish Whitehall court artist",
    repository: "Royal Collection Trust, Hampton Court Palace",
    accession_id: "RCIN 405796",
    rights_status: "Public Domain (Created c. 1545 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.rct.uk/collection/405796/the-family-of-henry-viii-an-allegory-of-the-tudor-succession",
    asset_path: "/images/family_of_henry_viii_c1545.jpg"
  },
  {
    lesson_num: 1,
    lesson_title: "The Reformation & The Break with Rome (1517–1547)",
    source_id: "Source C",
    artifact_title: "Portrait of King Henry VIII (Hans Holbein the Younger Whitehall Prototype)",
    date: "c. 1537",
    creator: "Workshop of Hans Holbein the Younger",
    repository: "Walker Art Gallery, National Museums Liverpool",
    accession_id: "WAG 1350",
    rights_status: "Public Domain (Created c. 1537 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.liverpoolmuseums.org.uk/artifact/henry-viii-hans-holbein-younger",
    asset_path: "/images/henry_viii.jpg"
  },
  {
    lesson_num: 1,
    lesson_title: "The Reformation & The Break with Rome (1517–1547)",
    source_id: "Source D",
    artifact_title: "Title Page of the Great Bible (1539)",
    date: "April 1539",
    creator: "Hans Holbein the Younger",
    repository: "British Library, Rare Books Collections",
    accession_id: "BL C.18.d.10",
    rights_status: "Public Domain (Created 1539 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.bl.uk/collection-items/the-great-bible",
    asset_path: "/images/great_bible_frontispiece.jpg"
  },
  {
    lesson_num: 1,
    lesson_title: "The Reformation & The Break with Rome (1517–1547)",
    source_id: "Source E",
    artifact_title: "The Ruined Nave and Tower of Fountains Abbey (North Yorkshire)",
    date: "1132–1539 (photographed 2005)",
    creator: "English Heritage / National Trust Photographic Survey",
    repository: "Historic England / National Trust",
    accession_id: "HE Heritage List: 1000094",
    rights_status: "Creative Commons Attribution-ShareAlike 3.0 Unported",
    commercial_use_permitted: true,
    source_url: "https://commons.wikimedia.org/wiki/File:Fountains_Abbey_view_crop1_2005-08-27.jpg",
    asset_path: "/images/monarchy_religion_power/fountains_abbey_ruins.jpg"
  },

  // ==========================================
  // LESSON 2
  // ==========================================
  {
    lesson_num: 2,
    lesson_title: "Elizabeth I & The Middle Way (1558–1588)",
    source_id: "Plate 2.1",
    artifact_title: "Title Page of the Book of Common Prayer (1559 Elizabethan Settlement)",
    date: "1559",
    creator: "Richard Grafton (King's Printer) / Church of England",
    repository: "British Library, Rare Books Collections",
    accession_id: "BL C.25.m.7",
    rights_status: "Public Domain (Created 1559 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.bl.uk/collection-items",
    asset_path: "/images/book_of_common_prayer_1559.jpg"
  },
  {
    lesson_num: 2,
    lesson_title: "Elizabeth I & The Middle Way (1558–1588)",
    source_id: "Plate 2.2",
    artifact_title: "Papal Bull Regnans in Excelsis Excommunicating Elizabeth I (Pope Pius V)",
    date: "25 February 1570",
    creator: "Vatican Secret Archives / Pope Pius V",
    repository: "Archivum Secretum Vaticanum",
    accession_id: "ASV Reg. Vat. 204",
    rights_status: "Public Domain (Created 1570 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.nationalarchives.gov.uk/education/resources/elizabeth-monarchy/",
    asset_path: "/images/regnans_in_excelsis_1570.jpg"
  },
  {
    lesson_num: 2,
    lesson_title: "Elizabeth I & The Middle Way (1558–1588)",
    source_id: "Source A",
    artifact_title: "Queen Elizabeth I Carried in Royal Procession (Robert Peake the Elder)",
    date: "c. 1601",
    creator: "Robert Peake the Elder",
    repository: "Sherborne Castle, Dorset (Wingfield Digby Collection)",
    accession_id: "SC Inv: 1908.4",
    rights_status: "Public Domain (Created c. 1601 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://artuk.org/discover/artworks/queen-elizabeth-i-in-procession-58832",
    asset_path: "/images/elizabeth_procession_1601.jpg"
  },
  {
    lesson_num: 2,
    lesson_title: "Elizabeth I & The Middle Way (1558–1588)",
    source_id: "Source B",
    artifact_title: "Portrait of Queen Mary I / Mary Tudor (Hans Eworth)",
    date: "1554",
    creator: "Hans Eworth",
    repository: "National Portrait Gallery, London",
    accession_id: "NPG 4827",
    rights_status: "Public Domain (Created 1554 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.npg.org.uk/collections/search/portrait/mw04273",
    asset_path: "/images/queen_mary_i_mary_tudor.jpg"
  },
  {
    lesson_num: 2,
    lesson_title: "Elizabeth I & The Middle Way (1558–1588)",
    source_id: "Source C",
    artifact_title: "The Armada Portrait of Queen Elizabeth I (George Gower)",
    date: "1588",
    creator: "George Gower (Serjeant Painter to Queen Elizabeth I)",
    repository: "Woburn Abbey / National Maritime Museum, Greenwich",
    accession_id: "NMM ZBA8540",
    rights_status: "Public Domain (Created 1588 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.rmg.co.uk/stories/topics/armada-portrait-elizabeth-i",
    asset_path: "/images/armada_portrait.jpg"
  },
  {
    lesson_num: 2,
    lesson_title: "Elizabeth I & The Middle Way (1558–1588)",
    source_id: "Source D",
    artifact_title: "The Burning of Bishops Latimer and Ridley at Oxford (Foxe's Book of Martyrs)",
    date: "1563",
    creator: "John Foxe (author) / John Day (printer)",
    repository: "British Library, General Reference",
    accession_id: "BL G.12101",
    rights_status: "Public Domain (Created 1563 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://commons.wikimedia.org/wiki/File:Foxe%27s_Book_of_Martyrs_-_Latimer_%26_Ridley.jpg",
    asset_path: "/images/monarchy_religion_power/latimer_ridley_oxford_1555.jpg"
  },
  {
    lesson_num: 2,
    lesson_title: "Elizabeth I & The Middle Way (1558–1588)",
    source_id: "Source E",
    artifact_title: "The Execution of Mary, Queen of Scots at Fotheringhay Castle (1587)",
    date: "1587",
    creator: "Contemporary Northern European / Dutch Protestant engraver",
    repository: "National Portrait Gallery, London / Scottish National Portrait Gallery",
    accession_id: "SNPG SP II 102.1",
    rights_status: "Public Domain (Created 1587 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://commons.wikimedia.org/wiki/File:Mary_Queen_of_Scots_Execution.jpg",
    asset_path: "/images/mary_queen_of_scots_execution_fotheringhay_1587.jpg"
  },

  // ==========================================
  // LESSON 3
  // ==========================================
  {
    lesson_num: 3,
    lesson_title: "The Spanish Armada & Naval Warfare (1588)",
    source_id: "Plate 3.1",
    artifact_title: "Portrait of King Philip II of Spain in Damascened Armor",
    date: "1551",
    creator: "Titian (Tiziano Vecellio)",
    repository: "Museo del Prado, Madrid",
    accession_id: "Prado P000411",
    rights_status: "Public Domain (Created 1551 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.museodelprado.es/en/the-collection/art-work/philip-ii/c632863a-bbce-4552-b883-200a74775d7e",
    asset_path: "/images/philip_ii.jpg"
  },
  {
    lesson_num: 3,
    lesson_title: "The Spanish Armada & Naval Warfare (1588)",
    source_id: "Plate 3.2",
    artifact_title: "The English Flagship Ark Royal (Ark Ralegh)",
    date: "c. 1588",
    creator: "Contemporary English woodcut illustrator",
    repository: "British Museum, Department of Prints and Drawings",
    accession_id: "BM 1868,0808.3260",
    rights_status: "Public Domain (Created 1588 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.britishmuseum.org/collection/object/P_1868-0808-3260",
    asset_path: "/images/ark_royal.jpg"
  },
  {
    lesson_num: 3,
    lesson_title: "The Spanish Armada & Naval Warfare (1588)",
    source_id: "Source A",
    artifact_title: "Sir Francis Drake Singeing the King of Spain's Beard at Cadiz (April 1587)",
    date: "17th Century",
    creator: "British naval historical painter",
    repository: "National Maritime Museum, Greenwich, London",
    accession_id: "NMM BHC0262",
    rights_status: "Public Domain (Created 17th Century / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.rmg.co.uk/collections/objects/rmgc-object-11667",
    asset_path: "/images/drake_cadiz_1587.jpg"
  },
  {
    lesson_num: 3,
    lesson_title: "The Spanish Armada & Naval Warfare (1588)",
    source_id: "Source B",
    artifact_title: "The Battle of Gravelines (8 August 1588)",
    date: "c. 1600",
    creator: "Hendrick Cornelisz Vroom",
    repository: "Tiroler Landesmuseum Ferdinandeum, Innsbruck / Royal Museums Greenwich",
    accession_id: "TLMF Inv: Gem-412",
    rights_status: "Public Domain (Created c. 1600 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.rmg.co.uk/collections/objects/rmgc-object-11668",
    asset_path: "/images/battle_of_gravelines_1588.jpg"
  },
  {
    lesson_num: 3,
    lesson_title: "The Spanish Armada & Naval Warfare (1588)",
    source_id: "Source C",
    artifact_title: "Chart of the Armada Off Gravelines (Robert Adams and Augustine Ryther, 1590)",
    date: "1590",
    creator: "Robert Adams (cartographer) / Augustine Ryther (engraver)",
    repository: "British Library, Maps Collections",
    accession_id: "Maps C.7.c.1 (Plate X)",
    rights_status: "Public Domain (Created 1590 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.bl.uk/collection-items/armada-charts",
    asset_path: "/images/armada_gravelines_chart_1590.jpg"
  },
  {
    lesson_num: 3,
    lesson_title: "The Spanish Armada & Naval Warfare (1588)",
    source_id: "Source D",
    artifact_title: "The Launch of Fireships Against the Spanish Armada at Calais (Midnight 7–8 August 1588)",
    date: "17th Century",
    creator: "British marine historical painter",
    repository: "Royal Museums Greenwich, London",
    accession_id: "RMG BHC0263",
    rights_status: "Public Domain (Created 17th Century / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://commons.wikimedia.org/wiki/File:Launch_of_fireships_against_the_Spanish_Armada,_7_August_1588_RMG_BHC0263.jpg",
    asset_path: "/images/monarchy_religion_power/armada_fireships_calais_1588.jpg"
  },
  {
    lesson_num: 3,
    lesson_title: "The Spanish Armada & Naval Warfare (1588)",
    source_id: "Source E",
    artifact_title: "Naval Reward Medal of Queen Elizabeth I: 'God Blew and They Were Scattered' (1588)",
    date: "1588",
    creator: "Royal Mint engravers / Queen Elizabeth I",
    repository: "Metropolitan Museum of Art, New York / British Museum",
    accession_id: "MET DP-180-159 / BM M.7011",
    rights_status: "Public Domain (Created 1588 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.metmuseum.org/art/collection/search/207038",
    asset_path: "/images/monarchy_religion_power/armada_victory_medal_1588.jpg"
  },

  // ==========================================
  // LESSON 4
  // ==========================================
  {
    lesson_num: 4,
    lesson_title: "The Civil War, Regicide & The Bill of Rights (1642–1689)",
    source_id: "Plate 4.1",
    artifact_title: "Portrait of William Laud, Archbishop of Canterbury",
    date: "c. 1636",
    creator: "Sir Anthony van Dyck",
    repository: "The Fitzwilliam Museum, Cambridge",
    accession_id: "Fitzwilliam M.22",
    rights_status: "Public Domain (Created c. 1636 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://artuk.org/discover/artworks/william-laud-archbishop-of-canterbury-4963",
    asset_path: "/images/archbishop_laud.jpg"
  },
  {
    lesson_num: 4,
    lesson_title: "The Civil War, Regicide & The Bill of Rights (1642–1689)",
    source_id: "Plate 4.2",
    artifact_title: "Portrait of Oliver Cromwell, Lord Protector of England",
    date: "1653",
    creator: "Samuel Cooper (miniaturist)",
    repository: "National Portrait Gallery, London",
    accession_id: "NPG 5188",
    rights_status: "Public Domain (Created 1653 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.npg.org.uk/collections/search/portrait/mw01579",
    asset_path: "/images/oliver_cromwell.jpg"
  },
  {
    lesson_num: 4,
    lesson_title: "The Civil War, Regicide & The Bill of Rights (1642–1689)",
    source_id: "Source A",
    artifact_title: "King Charles I in Three Positions (Triple Portrait for Bernini)",
    date: "1635–1636",
    creator: "Sir Anthony van Dyck",
    repository: "Royal Collection Trust, Windsor Castle",
    accession_id: "RCIN 404420",
    rights_status: "Public Domain (Created 1636 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.rct.uk/collection/404420/charles-i-1600-1649",
    asset_path: "/images/charles_first.jpg"
  },
  {
    lesson_num: 4,
    lesson_title: "The Civil War, Regicide & The Bill of Rights (1642–1689)",
    source_id: "Source B",
    artifact_title: "The Battle of Naseby (14 June 1645)",
    date: "18th/19th Century",
    creator: "Edward Radclyffe (engraver)",
    repository: "Yale Center for British Art, Paul Mellon Collection",
    accession_id: "YCBA B1998.14.672",
    rights_status: "Public Domain (Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://collections.britishart.yale.edu/catalog/tms:48821",
    asset_path: "/images/monarchy_religion_power/battle_of_naseby_1645.jpg"
  },
  {
    lesson_num: 4,
    lesson_title: "The Civil War, Regicide & The Bill of Rights (1642–1689)",
    source_id: "Source C",
    artifact_title: "The Execution of King Charles I Outside the Banqueting House, Whitehall (30 January 1649)",
    date: "1649",
    creator: "Contemporary German/Dutch broadsheet engraver",
    repository: "National Portrait Gallery, London / British Museum",
    accession_id: "NPG D27003 / BM 1868,0808.3262",
    rights_status: "Public Domain (Created 1649 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.britishmuseum.org/collection/object/P_1868-0808-3262",
    asset_path: "/images/charles_i_execution.jpg"
  },
  {
    lesson_num: 4,
    lesson_title: "The Civil War, Regicide & The Bill of Rights (1642–1689)",
    source_id: "Source D",
    artifact_title: "The Death Warrant of King Charles I Signed by 59 Commissioners (29 January 1649)",
    date: "29 January 1649",
    creator: "High Court of Justice / Parliamentary Commissioners",
    repository: "UK Parliamentary Archives, London",
    accession_id: "HL/PO/JO/10/1/297",
    rights_status: "Public Domain (Created 1649 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.parliament.uk/about/living-heritage/evolutionofparliament/parliamentaryauthority/civilwar/collections/deathwarrant/",
    asset_path: "/images/monarchy_religion_power/death_warrant_charles_i_1649.jpg"
  },
  {
    lesson_num: 4,
    lesson_title: "The Civil War, Regicide & The Bill of Rights (1642–1689)",
    source_id: "Source E",
    artifact_title: "Roundhead Propaganda Pamphlet: Prince Rupert and His Dog 'Boye' (1643)",
    date: "1643",
    creator: "Anonymous London Parliamentary propagandist",
    repository: "British Library, Thomason Tracts",
    accession_id: "BL E.100[13]",
    rights_status: "Public Domain (Created 1643 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://commons.wikimedia.org/wiki/File:Boy_and_roundhead-propaganda_pamphlet_1643.png",
    asset_path: "/images/monarchy_religion_power/prince_rupert_boye_propaganda_1643.png"
  },

  // ==========================================
  // LESSON 5
  // ==========================================
  {
    lesson_num: 5,
    lesson_title: "Crown, Church, or Parliament? (1517–1689)",
    source_id: "Plate 5.1",
    artifact_title: "Great Seal of the Commonwealth of England (1651)",
    date: "1651",
    creator: "Thomas Simon (Chief Engraver to the Royal Mint)",
    repository: "British Museum, Department of Coins and Medals",
    accession_id: "BM 1881,0404.1",
    rights_status: "Public Domain (Created 1651 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.britishmuseum.org/collection/object/C_1881-0404-1",
    asset_path: "/images/great_seal_1651.png"
  },
  {
    lesson_num: 5,
    lesson_title: "Crown, Church, or Parliament? (1517–1689)",
    source_id: "Plate 5.2",
    artifact_title: "Portrait of King James I (James VI of Scotland)",
    date: "c. 1621",
    creator: "Daniel Mytens",
    repository: "National Portrait Gallery, London",
    accession_id: "NPG 109",
    rights_status: "Public Domain (Created c. 1621 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.npg.org.uk/collections/search/portrait/mw03417",
    asset_path: "/images/james_i.jpg"
  },
  {
    lesson_num: 5,
    lesson_title: "Crown, Church, or Parliament? (1517–1689)",
    source_id: "Source A",
    artifact_title: "The Bill of Rights Parchment Roll (16 December 1689)",
    date: "1689",
    creator: "Convention Parliament / Clerk of the Parliaments",
    repository: "UK Parliamentary Archives, London",
    accession_id: "HL/PO/PU/1/1689/1W&Ms2n2",
    rights_status: "Public Domain (Created 1689 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.parliament.uk/about/living-heritage/evolutionofparliament/parliamentaryauthority/revolution/collections/billofrights/",
    asset_path: "/images/bill_of_rights.jpg"
  },
  {
    lesson_num: 5,
    lesson_title: "Crown, Church, or Parliament? (1517–1689)",
    source_id: "Source B",
    artifact_title: "The Landing of William III, Prince of Orange, at Torbay (5 November 1688)",
    date: "c. 1689",
    creator: "Circle of Willem van de Velde the Younger",
    repository: "Royal Collection Trust, Hampton Court Palace",
    accession_id: "RCIN 404847",
    rights_status: "Public Domain (Created c. 1689 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.rct.uk/collection/404847/the-landing-of-william-iii-at-brixham-torbay-5-november-1688",
    asset_path: "/images/william_landing_1688.jpg"
  },
  {
    lesson_num: 5,
    lesson_title: "Crown, Church, or Parliament? (1517–1689)",
    source_id: "Source C",
    artifact_title: "Presentation of the Declaration of Rights to William and Mary (13 February 1689)",
    date: "19th Century",
    creator: "British parliamentary historical painter",
    repository: "Palace of Westminster Collection / UK Parliamentary Art Collection",
    accession_id: "WOA 2588",
    rights_status: "Public Domain (Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://www.parliament.uk/art/search-the-collection/",
    asset_path: "/images/william_mary_declaration_of_rights_1689.jpg"
  },
  {
    lesson_num: 5,
    lesson_title: "Crown, Church, or Parliament? (1517–1689)",
    source_id: "Source D",
    artifact_title: "Frontispiece of Thomas Hobbes' Leviathan (Abraham Bosse, 1651)",
    date: "1651",
    creator: "Abraham Bosse (engraver) / Thomas Hobbes (philosopher)",
    repository: "British Library, Rare Books Collections",
    accession_id: "BL C.59.i.11",
    rights_status: "Public Domain (Created 1651 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://commons.wikimedia.org/wiki/File:Leviathan_frontispiece_cropped_British_Library.jpg",
    asset_path: "/images/monarchy_religion_power/hobbes_leviathan_frontispiece_1651.jpg"
  },
  {
    lesson_num: 5,
    lesson_title: "Crown, Church, or Parliament? (1517–1689)",
    source_id: "Source E",
    artifact_title: "The Trial of the Seven Bishops in the Court of King's Bench (June 1688)",
    date: "1688",
    creator: "Contemporary British court engraver",
    repository: "UK Parliamentary Art Collection / British Museum",
    accession_id: "BM 1877,1013.916",
    rights_status: "Public Domain (Created 1688 / Term Expired — CDPA 1988)",
    commercial_use_permitted: true,
    source_url: "https://commons.wikimedia.org/wiki/File:TrialSevenBishops.jpg",
    asset_path: "/images/monarchy_religion_power/trial_of_seven_bishops_1688.jpg"
  }
];

if (!db.units) db.units = {};
db.units.monarchy_religion_power = {
  unit_id: "monarchy_religion_power",
  unit_title: "Crown, Church, or Parliament (1517–1689)",
  key_stage: "KS3 (Year 8)",
  total_sources: mrpSources.length,
  sources: mrpSources
};

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log(`✅ Successfully synchronized scripts/master_rights_database.json for Crown, Church, or Parliament (${mrpSources.length} sources registered)!`);
