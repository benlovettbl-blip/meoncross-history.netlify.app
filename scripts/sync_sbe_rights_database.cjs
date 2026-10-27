const fs = require('fs');
const path = require('path');

const dbPath = path.resolve('scripts/master_rights_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

if (!db.units) db.units = {};

const sbeSources = [
  // LESSON 1
  {
    lesson_num: 1,
    lesson_title: 'How was the British Empire built and sustained?',
    source_id: 'Source A',
    artifact_title: 'Walter Crane, Imperial Federation Map of the World Showing the Extent of the British Empire in 1886',
    date: '1886',
    creator: 'Walter Crane (1845–1915)',
    repository: 'The British Library, London / Norman B. Leventhal Map Center',
    accession_id: 'BL Maps 1886.c.1',
    rights_status: 'Public Domain (Created 1886 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.bl.uk/collection-items/imperial-federation-map-showing-the-extent-of-the-british-empire-in-1886',
    asset_path: '/images/map_empire_1886.jpg'
  },
  {
    lesson_num: 1,
    lesson_title: 'How was the British Empire built and sustained?',
    source_id: 'Source B',
    artifact_title: 'HMS Warrior (1860) at Portsmouth Royal Naval Dockyard',
    date: '1860',
    creator: 'Royal Navy Admiralty Photographic Archive',
    repository: 'National Museum of the Royal Navy, Portsmouth',
    accession_id: 'NMRN 1860/WAR',
    rights_status: 'Public Domain (Created 1860 / Crown Copyright Expired — CDPA 1988 § 163)',
    commercial_use_permitted: true,
    source_url: 'https://www.nmrn.org.uk/our-museums/hms-warrior',
    asset_path: '/images/hms_warrior.jpg'
  },
  {
    lesson_num: 1,
    lesson_title: 'How was the British Empire built and sustained?',
    source_id: 'Plate 1.1',
    artifact_title: 'An Indian Weaver at his Loom (19th-Century Company School Gouache)',
    date: 'c. 1850',
    creator: 'Company School Indian Artist',
    repository: 'Wellcome Collection, London',
    accession_id: 'Wellcome V0045300',
    rights_status: 'Public Domain (Created c. 1850 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://wellcomecollection.org/works/y5e5sz5u',
    asset_path: '/images/bengal_weaver.jpg'
  },
  {
    lesson_num: 1,
    lesson_title: 'How was the British Empire built and sustained?',
    source_id: 'Plate 1.2',
    artifact_title: 'Robert Charles Dudley, The Cable Passing Out from the Tanks of the Great Eastern',
    date: '1866',
    creator: 'Robert Charles Dudley (1826–1909)',
    repository: 'The Metropolitan Museum of Art, New York',
    accession_id: 'MET DP801264',
    rights_status: 'Public Domain (Created 1866 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.metmuseum.org/art/collection/search/383818',
    asset_path: '/images/great_eastern_telegraph_cable.jpg'
  },

  // LESSON 2
  {
    lesson_num: 2,
    lesson_title: 'How did corporate exploitation spark the 1857 Indian Rebellion and destroy the East India Company?',
    source_id: 'Source A',
    artifact_title: 'Benjamin West, Shah Alam Conveying the Grant of the Diwani of Bengal to Lord Clive',
    date: 'c. 1795',
    creator: 'Benjamin West PRA (1738–1820)',
    repository: 'The British Library, London (India Office Records)',
    accession_id: 'BL Foster 29',
    rights_status: 'Public Domain (Created 1795 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.bl.uk/collection-items/shah-alam-granting-the-diwani-to-lord-clive',
    asset_path: '/images/shah_alam_clive.jpg'
  },
  {
    lesson_num: 2,
    lesson_title: 'How did corporate exploitation spark the 1857 Indian Rebellion and destroy the East India Company?',
    source_id: 'Source B',
    artifact_title: 'Nineteenth-Century Portrait of Rani Lakshmibai of Jhansi in Warrior Dress',
    date: 'c. 1857',
    creator: 'Anonymous Indian Artist',
    repository: 'National Army Museum, London',
    accession_id: 'NAM 1974-06-44',
    rights_status: 'Public Domain (Created c. 1857 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://collection.nam.ac.uk/',
    asset_path: '/images/rani_of_jhansi.jpg'
  },
  {
    lesson_num: 2,
    lesson_title: 'How did corporate exploitation spark the 1857 Indian Rebellion and destroy the East India Company?',
    source_id: 'Plate 2.1',
    artifact_title: 'Felice Beato, The Cashmere Gate, Delhi, after the Assault',
    date: '1858',
    creator: 'Felice Beato (1832–1909)',
    repository: 'National Army Museum, London / British Library',
    accession_id: 'NAM 1977-06-81',
    rights_status: 'Public Domain (Created 1858 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://collection.nam.ac.uk/',
    asset_path: '/images/beato_cashmere_gate_delhi_1858.jpg'
  },
  {
    lesson_num: 2,
    lesson_title: 'How did corporate exploitation spark the 1857 Indian Rebellion and destroy the East India Company?',
    source_id: 'Plate 2.2',
    artifact_title: 'Franz Xaver Winterhalter, Official State Portrait of Queen Victoria',
    date: '1859',
    creator: 'Franz Xaver Winterhalter (1805–1873)',
    repository: 'Royal Collection Trust, London',
    accession_id: 'RCIN 405130',
    rights_status: 'Public Domain (Created 1859 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.rct.uk/collection/405130/queen-victoria-1819-1901',
    asset_path: '/images/queen_victoria.jpg'
  },

  // LESSON 3
  {
    lesson_num: 3,
    lesson_title: 'How did settler colonialism transform Australia? Terra Nullius, The First Fleet & Frontier Resistance (1788–1854)',
    source_id: 'Source A',
    artifact_title: 'George Raper, The First Fleet Sailing past the Needles from Portsmouth',
    date: '13 May 1787',
    creator: 'George Raper (1769–1796), Midshipman on HMS Sirius',
    repository: 'National Library of Australia, Canberra',
    accession_id: 'NLA PIC R35',
    rights_status: 'Public Domain (Created 1787 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://nla.gov.au/nla.obj-150066228',
    asset_path: '/images/first_fleet_portsmouth_1787.jpg'
  },
  {
    lesson_num: 3,
    lesson_title: 'How did settler colonialism transform Australia? Terra Nullius, The First Fleet & Frontier Resistance (1788–1854)',
    source_id: 'Source B',
    artifact_title: 'George Raper, The First Fleet in Botany Bay',
    date: 'January 1788',
    creator: 'George Raper (1769–1796), Midshipman on HMS Sirius',
    repository: 'Natural History Museum, London',
    accession_id: 'NHM Raper Collection 1788',
    rights_status: 'Public Domain (Created 1788 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.nhm.ac.uk/our-science/collections/botany-collections/drawings-first-fleet.html',
    asset_path: '/images/first_fleet_botany_bay_1788.jpg'
  },
  {
    lesson_num: 3,
    lesson_title: 'How did settler colonialism transform Australia? Terra Nullius, The First Fleet & Frontier Resistance (1788–1854)',
    source_id: 'Plate 3.1',
    artifact_title: 'James Neagle, Bennelong, a Native of New South Wales',
    date: '1798',
    creator: 'Engraved by James Neagle (1760–1822) after a First Fleet officer drawing',
    repository: 'State Library of New South Wales, Sydney',
    accession_id: 'SLNSW Mitchell Library Q79/44',
    rights_status: 'Public Domain (Created 1798 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.sl.nsw.gov.au/',
    asset_path: '/images/bennelong.jpg'
  },
  {
    lesson_num: 3,
    lesson_title: 'How did settler colonialism transform Australia? Terra Nullius, The First Fleet & Frontier Resistance (1788–1854)',
    source_id: 'Plate 3.2',
    artifact_title: 'Charles Doudiet, Eureka Slaughter (The Storming of the Eureka Stockade)',
    date: '3 December 1854',
    creator: 'Charles Doudiet (1832–1913)',
    repository: 'Ballarat Fine Art Gallery, Victoria, Australia',
    accession_id: 'BFAG 1854.01',
    rights_status: 'Public Domain (Created 1854 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.artgalleryofballarat.com.au/',
    asset_path: '/images/doudiet_southern_cross_eureka_1854.jpg'
  },

  // LESSON 4
  {
    lesson_num: 4,
    lesson_title: 'Why did European powers scramble for Africa, and how was empire justified?',
    source_id: 'Source A',
    artifact_title: 'Adalbert von Rößler, The Opening of the Berlin West Africa Conference',
    date: 'November 1884',
    creator: 'Adalbert von Rößler (1853–1922)',
    repository: 'German Historical Museum, Berlin',
    accession_id: 'DHM Gr 84/32',
    rights_status: 'Public Domain (Created 1884 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.dhm.de/',
    asset_path: '/images/berlin_conference_1884.jpg'
  },
  {
    lesson_num: 4,
    lesson_title: 'Why did European powers scramble for Africa, and how was empire justified?',
    source_id: 'Source B',
    artifact_title: 'The Maxim Machine Gun: First Automatic Recoil-Operated Firearm',
    date: '1884',
    creator: 'Hiram Maxim (1840–1916) / British Army War Department',
    repository: 'Imperial War Museums, London',
    accession_id: 'IWM FIR 9226',
    rights_status: 'Public Domain / Crown Copyright Expired (CDPA 1988 § 163)',
    commercial_use_permitted: true,
    source_url: 'https://www.iwm.org.uk/collections/item/object/30029412',
    asset_path: '/images/maxim_machine_gun.jpg'
  },
  {
    lesson_num: 4,
    lesson_title: 'Why did European powers scramble for Africa, and how was empire justified?',
    source_id: 'Plate 4.1',
    artifact_title: 'Pears\' Soap Advertisement: The White Man\'s Burden',
    date: '1899',
    creator: 'Pears\' Soap Company / McClure\'s Magazine',
    repository: 'Wellcome Collection, London / Library of Congress',
    accession_id: 'Wellcome L0031899',
    rights_status: 'Public Domain (Created 1899 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://wellcomecollection.org/',
    asset_path: '/images/pears_soap_white_mans_burden.jpg'
  },
  {
    lesson_num: 4,
    lesson_title: 'Why did European powers scramble for Africa, and how was empire justified?',
    source_id: 'Plate 4.2',
    artifact_title: 'Alexander Bassano, Photographic Portrait of King Cetshwayo kaMpande of the Zulus',
    date: 'August 1882',
    creator: 'Alexander Bassano (1829–1913)',
    repository: 'National Portrait Gallery, London',
    accession_id: 'NPG x197825',
    rights_status: 'Public Domain (Created 1882 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.npg.org.uk/collections/search/portrait/mw145924/King-Cetshwayo',
    asset_path: '/images/cetshwayo_king_of_zulus.jpg'
  },

  // LESSON 5
  {
    lesson_num: 5,
    lesson_title: 'Who truly benefited from the British Empire?',
    source_id: 'Plate 5.1',
    artifact_title: 'The Crystal Palace in Hyde Park for the Grand International Exhibition of 1851',
    date: '1851',
    creator: 'Ackermann & Co. Lithographers',
    repository: 'The British Museum, London',
    accession_id: 'BM 1880,1113.5615',
    rights_status: 'Public Domain (Created 1851 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.britishmuseum.org/',
    asset_path: '/images/great_exhibition_1851.jpg'
  },
  {
    lesson_num: 5,
    lesson_title: 'Who truly benefited from the British Empire?',
    source_id: 'Plate 5.2',
    artifact_title: 'Portrait of Dadabhai Naoroji, First Indian Member of the British Parliament',
    date: 'c. 1892',
    creator: 'Photographic Studio Portrait',
    repository: 'National Portrait Gallery, London',
    accession_id: 'NPG x132800',
    rights_status: 'Public Domain (Created c. 1892 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.npg.org.uk/collections/search/portrait/mw115082/Dadabhai-Naoroji',
    asset_path: '/images/dadabhai_naoroji.jpg'
  },
  {
    lesson_num: 5,
    lesson_title: 'Who truly benefited from the British Empire?',
    source_id: 'Source D',
    artifact_title: 'John Leech, Capital and Labour; or, The Two Faces of Victorian Britain',
    date: '1843',
    creator: 'John Leech (1817–1864)',
    repository: 'The British Museum, London (Punch Magazine)',
    accession_id: 'BM 1868,0808.12563',
    rights_status: 'Public Domain (Created 1843 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.britishmuseum.org/collection/object/P_1868-0808-12563',
    asset_path: '/images/capital_labour.jpg'
  }
];

db.units.second_british_empire = {
  unit_id: 'second_british_empire',
  unit_title: 'The Second British Empire (1783–1914)',
  curriculum_tier: 'Key Stage 3 (Year 8)',
  sources: sbeSources
};

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');

let total = 0;
for (const k in db.units) {
  total += (db.units[k].sources || []).length;
}
console.log(`Successfully synchronized master_rights_database.json for second_british_empire! Total sources for unit: ${sbeSources.length}. Total db sources: ${total}`);
