const fs = require('fs');
const path = require('path');

const dbPath = path.resolve('scripts/master_rights_database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const sources = [
  // LESSON 1
  {
    lesson_num: 1,
    lesson_title: 'What powered the Industrial Revolution, and how did a Fareham ironmaster change the world?',
    source_id: 'Source A',
    artifact_title: 'Philip James de Loutherbourg, Coalbrookdale by Night (1801)',
    date: '1801',
    creator: 'Philip James de Loutherbourg (1740–1812)',
    repository: 'Science Museum, London',
    accession_id: 'SMG 1952-446',
    rights_status: 'Public Domain (Created 1801 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://collection.sciencemuseumgroup.org.uk/objects/co68453/coalbrookdale-by-night-oil-painting',
    asset_path: '/images/coalbrookdale_by_night.jpg'
  },
  {
    lesson_num: 1,
    lesson_title: 'What powered the Industrial Revolution, and how did a Fareham ironmaster change the world?',
    source_id: 'Plate 1.1',
    artifact_title: 'Carl Frederik von Breda, Portrait of James Watt',
    date: '1792',
    creator: 'Carl Frederik von Breda (1759–1818)',
    repository: 'National Portrait Gallery, London',
    accession_id: 'NPG 186a',
    rights_status: 'Public Domain (Created 1792 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.npg.org.uk/collections/search/portrait/mw06622/James-Watt',
    asset_path: '/images/james_watt.jpg'
  },
  {
    lesson_num: 1,
    lesson_title: 'What powered the Industrial Revolution, and how did a Fareham ironmaster change the world?',
    source_id: 'Source B',
    artifact_title: 'Cort’s Reverberatory Puddling Furnace & Funtley Ironworks (1783)',
    date: '1783',
    creator: 'Henry Cort (1740–1800) / Patent Specification',
    repository: 'The National Archives, Kew, London',
    accession_id: 'TNA C 210/14',
    rights_status: 'Public Domain (Created 1783 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.nationalarchives.gov.uk/',
    asset_path: '/images/funtley_ironworks.jpg'
  },
  {
    lesson_num: 1,
    lesson_title: 'What powered the Industrial Revolution, and how did a Fareham ironmaster change the world?',
    source_id: 'Plate 1.2',
    artifact_title: 'Robert Howlett, Isambard Kingdom Brunel Standing Before the Launching Chains of the SS Great Eastern',
    date: '1857',
    creator: 'Robert Howlett (1831–1858)',
    repository: 'National Portrait Gallery, London',
    accession_id: 'NPG P110',
    rights_status: 'Public Domain (Created 1857 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.npg.org.uk/collections/search/portrait/mw00898/Isambard-Kingdom-Brunel',
    asset_path: '/images/isambard_kingdom_brunel.jpg'
  },
  {
    lesson_num: 1,
    lesson_title: 'What powered the Industrial Revolution, and how did a Fareham ironmaster change the world?',
    source_id: 'Source D',
    artifact_title: 'Contemporary Dedication Portrait of Henry Cort, Ironmaster of Funtley',
    date: 'c. 1780s',
    creator: 'Unknown English School',
    repository: 'Science Museum Group / Portsmouth City Museum Archive',
    accession_id: 'SMG 1928-1094',
    rights_status: 'Public Domain (Created c. 1780s / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://collection.sciencemuseumgroup.org.uk/',
    asset_path: '/images/henry_cort.jpg'
  },

  // LESSON 2
  {
    lesson_num: 2,
    lesson_title: 'Was industrial work progress or punishment?',
    source_id: 'Source A',
    artifact_title: 'Thomas Allom, Powerloom Weaving in a Cotton Mill (1835)',
    date: '1835',
    creator: 'Thomas Allom (1804–1872) / Engraved by J. Tingle',
    repository: 'The British Museum, London',
    accession_id: 'BM 1872,1012.3508',
    rights_status: 'Public Domain (Created 1835 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.britishmuseum.org/collection/object/P_1872-1012-3508',
    asset_path: '/images/19th_century_mill.jpg'
  },
  {
    lesson_num: 2,
    lesson_title: 'Was industrial work progress or punishment?',
    source_id: 'Plate 2.1',
    artifact_title: 'Samuel Crompton and the 1779 Spinning Mule',
    date: 'c. 1779 / 19th Century Engraving',
    creator: 'Unknown British Engraver',
    repository: 'Library of Congress Prints and Photographs Division, Washington D.C.',
    accession_id: 'LC-USZ62-96488',
    rights_status: 'Public Domain (Term Expired — 17 U.S.C. § 105)',
    commercial_use_permitted: true,
    source_url: 'https://www.loc.gov/resource/cph.3b42598/',
    asset_path: '/images/spinning_mule.jpg'
  },
  {
    lesson_num: 2,
    lesson_title: 'Was industrial work progress or punishment?',
    source_id: 'Plate 2.2',
    artifact_title: 'George Frederic Watts, Portrait of Anthony Ashley-Cooper, 7th Earl of Shaftesbury',
    date: '1862',
    creator: 'George Frederic Watts (1817–1904)',
    repository: 'National Portrait Gallery, London',
    accession_id: 'NPG 1012',
    rights_status: 'Public Domain (Created 1862 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.npg.org.uk/collections/search/portrait/mw05721/Anthony-Ashley-Cooper-7th-Earl-of-Shaftesbury',
    asset_path: '/images/lord_shaftesbury.jpg'
  },
  {
    lesson_num: 2,
    lesson_title: 'Was industrial work progress or punishment?',
    source_id: 'Source D',
    artifact_title: 'Contemporary Engraving of Child Labour: Piecers and Scavengers under Cotton Machinery',
    date: '1840',
    creator: 'Unknown Victorian Illustrator',
    repository: 'The National Archives, Kew, London',
    accession_id: 'TNA COPY 1/14',
    rights_status: 'Public Domain (Created 1840 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.nationalarchives.gov.uk/',
    asset_path: '/images/child_labour.jpg'
  },

  // LESSON 3
  {
    lesson_num: 3,
    lesson_title: 'Did industrialisation make British towns unlivable?',
    source_id: 'Source A',
    artifact_title: 'Gustave Doré, Over London by Rail (London: A Pilgrimage, 1872)',
    date: '1872',
    creator: 'Gustave Doré (1832–1883)',
    repository: 'The British Museum, London',
    accession_id: 'BM 1978,U.946',
    rights_status: 'Public Domain (Created 1872 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.britishmuseum.org/collection/object/P_1978-U-946',
    asset_path: '/images/victorian_slum.jpg'
  },
  {
    lesson_num: 3,
    lesson_title: 'Did industrialisation make British towns unlivable?',
    source_id: 'Source B',
    artifact_title: 'John Leech, A Court for King Cholera (Punch, 25 September 1852)',
    date: '1852',
    creator: 'John Leech (1817–1864)',
    repository: 'Wellcome Collection, London',
    accession_id: 'Wellcome Library no. 38481i',
    rights_status: 'Public Domain (Created 1852 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://wellcomecollection.org/works/y57j348c',
    asset_path: '/images/court_for_king_cholera.png'
  },
  {
    lesson_num: 3,
    lesson_title: 'Did industrialisation make British towns unlivable?',
    source_id: 'Plate 3.1',
    artifact_title: 'Dr. John Snow, Cholera Map of Broad Street and Golden Square, Soho',
    date: '1854',
    creator: 'Dr. John Snow (1813–1858) / C.F. Cheffins Lithographer',
    repository: 'Wellcome Collection, London',
    accession_id: 'Wellcome Library no. L0063431',
    rights_status: 'Public Domain (Created 1854 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://wellcomecollection.org/works/m56v2a59',
    asset_path: '/images/snow_cholera_map.jpg'
  },
  {
    lesson_num: 3,
    lesson_title: 'Did industrialisation make British towns unlivable?',
    source_id: 'Plate 3.2',
    artifact_title: 'Portrait of Sir Edwin Chadwick, Social and Sanitary Reformer',
    date: 'c. 1860',
    creator: 'Unknown Victorian Photographer / Engraver',
    repository: 'National Portrait Gallery, London',
    accession_id: 'NPG 1271',
    rights_status: 'Public Domain (Created c. 1860 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.npg.org.uk/collections/search/portrait/mw01248/Sir-Edwin-Chadwick',
    asset_path: '/images/chadwick.jpg'
  },
  {
    lesson_num: 3,
    lesson_title: 'Did industrialisation make British towns unlivable?',
    source_id: 'Source D',
    artifact_title: 'Sir Joseph Bazalgette’s London Interceptor Sewer Network Under Construction (1862)',
    date: '1862',
    creator: 'Metropolitan Board of Works Official Photographic Record',
    repository: 'London Metropolitan Archives (LMA)',
    accession_id: 'LMA Coll. SC/PHL/02/0644',
    rights_status: 'Public Domain (Created 1862 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://search.lma.gov.uk/',
    asset_path: '/images/bazalgette_sewer.jpg'
  },

  // LESSON 4
  {
    lesson_num: 4,
    lesson_title: 'How did ordinary people fight for a voice?',
    source_id: 'Plate 4.1',
    artifact_title: 'The Leader of the Luddites (Contemporary Satirical Etching)',
    date: 'May 1812',
    creator: 'Published by M. Jones, 5 Newgate Street, London',
    repository: 'The British Museum, London',
    accession_id: 'BM 1873,0712.809',
    rights_status: 'Public Domain (Created 1812 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.britishmuseum.org/collection/object/P_1873-0712-809',
    asset_path: '/images/leader_of_the_luddites.jpg'
  },
  {
    lesson_num: 4,
    lesson_title: 'How did ordinary people fight for a voice?',
    source_id: 'Source B',
    artifact_title: 'George Cruikshank, The Massacre of Peterloo or Britains in Search of Liberty (1819)',
    date: '1819',
    creator: 'George Cruikshank (1792–1878)',
    repository: 'The British Museum, London',
    accession_id: 'BM 1868,0808.8576',
    rights_status: 'Public Domain (Created 1819 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.britishmuseum.org/collection/object/P_1868-0808-8576',
    asset_path: '/images/peterloo_massacre_cruikshank.jpg'
  },
  {
    lesson_num: 4,
    lesson_title: 'How did ordinary people fight for a voice?',
    source_id: 'Source C',
    artifact_title: 'Authentic Threatening Letter Signed "Captain Swing" (November 1830)',
    date: 'November 1830',
    creator: 'Anonymous Hampshire Agricultural Labourers',
    repository: 'The National Archives, Kew, London',
    accession_id: 'TNA HO 52/6',
    rights_status: 'Public Domain / Crown Copyright Expired (CDPA 1988 § 163)',
    commercial_use_permitted: true,
    source_url: 'https://discovery.nationalarchives.gov.uk/details/r/C9078',
    asset_path: '/images/captain_swing_letter.jpg'
  },
  {
    lesson_num: 4,
    lesson_title: 'How did ordinary people fight for a voice?',
    source_id: 'Plate 4.2',
    artifact_title: 'An Original Portrait of Captain Swing (Contemporary Hand-Coloured Satirical Caricature)',
    date: 'December 1830',
    creator: 'Published by William Spooner, 259 Regent Street, London',
    repository: 'The British Museum, London',
    accession_id: 'BM 1948,0214.941',
    rights_status: 'Public Domain (Created 1830 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.britishmuseum.org/collection/object/P_1948-0214-941',
    asset_path: '/images/captain_swing_portrait.jpg'
  },

  // LESSON 5
  {
    lesson_num: 5,
    lesson_title: 'How did the road to democracy expand?',
    source_id: 'Source A',
    artifact_title: 'Parliamentary Representation Map of England & Wales & Unreformed Rotten Boroughs',
    date: '1832',
    creator: 'Robert Kearsley Dawson (1798–1861) / Parliamentary Boundary Commission',
    repository: 'The National Archives, Kew, London',
    accession_id: 'TNA ZLIB 15/1',
    rights_status: 'Public Domain / Crown Copyright Expired (CDPA 1988 § 163)',
    commercial_use_permitted: true,
    source_url: 'https://www.nationalarchives.gov.uk/',
    asset_path: '/images/map_rotten_boroughs.jpg'
  },
  {
    lesson_num: 5,
    lesson_title: 'How did the road to democracy expand?',
    source_id: 'Source B',
    artifact_title: 'The School of Reform (Satirical Lithograph on the 1832 Reform Bill)',
    date: 'May 1831',
    creator: 'Published by S. Gans, Southampton Street, Covent Garden',
    repository: 'The British Museum, London',
    accession_id: 'BM 1868,0808.12574',
    rights_status: 'Public Domain (Created 1831 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.britishmuseum.org/collection/object/P_1868-0808-12574',
    asset_path: '/images/school_of_reform.jpg'
  },
  {
    lesson_num: 5,
    lesson_title: 'How did the road to democracy expand?',
    source_id: 'Plate 5.1',
    artifact_title: 'Sir Thomas Lawrence, Portrait of Charles Grey, 2nd Earl Grey',
    date: 'c. 1828',
    creator: 'Sir Thomas Lawrence (1769–1830)',
    repository: 'National Portrait Gallery, London',
    accession_id: 'NPG 51',
    rights_status: 'Public Domain (Created c. 1828 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.npg.org.uk/collections/search/portrait/mw02720/Charles-Grey-2nd-Earl-Grey',
    asset_path: '/images/earl_grey.jpg'
  },
  {
    lesson_num: 5,
    lesson_title: 'How did the road to democracy expand?',
    source_id: 'Plate 5.2',
    artifact_title: 'Portrait of William Lovett, Author of the People’s Charter',
    date: 'c. 1840',
    creator: 'Unknown Chartist Portraitist',
    repository: 'National Portrait Gallery, London',
    accession_id: 'NPG 2977',
    rights_status: 'Public Domain (Created c. 1840 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.npg.org.uk/collections/search/portrait/mw03991/William-Lovett',
    asset_path: '/images/william_lovett.jpg'
  },
  {
    lesson_num: 5,
    lesson_title: 'How did the road to democracy expand?',
    source_id: 'Source D',
    artifact_title: 'William Edward Kilburn, The Chartist Mass Demonstration at Kennington Common',
    date: '10 April 1848',
    creator: 'William Edward Kilburn (1818–1891)',
    repository: 'Royal Collection Trust • Windsor Castle',
    accession_id: 'RCIN 2932484',
    rights_status: 'Public Domain (Created 1848 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.rct.uk/collection/2932484/the-chartist-meeting-on-kennington-common-10-april-1848',
    asset_path: '/images/chartist_demo.jpg'
  },
  {
    lesson_num: 5,
    lesson_title: 'How did the road to democracy expand?',
    source_id: 'Source E',
    artifact_title: 'The First Secret Ballot in the United Kingdom, Pontefract By-Election (1872)',
    date: 'August 1872',
    creator: 'Illustrated London News Special Artist',
    repository: 'Pontefract Museum / Wakefield Council Libraries and Museums',
    accession_id: 'WKM 1974.22',
    rights_status: 'Public Domain (Created 1872 / Term Expired — CDPA 1988)',
    commercial_use_permitted: true,
    source_url: 'https://www.wakefield.gov.uk/museums-and-castles/pontefract-museum/',
    asset_path: '/images/secret_ballot.jpg'
  }
];

db.units.industrialisation_and_empire = {
  unit_id: 'industrialisation_and_empire',
  unit_title: 'Industrialisation & Empire (1750–1901)',
  key_stage: 'Key Stage 3',
  exam_board: 'National Curriculum for England (KS3)',
  total_lessons: 5,
  total_sources: sources.length,
  sources: sources
};

let totalSrc = 0;
for (const k of Object.keys(db.units)) {
  totalSrc += db.units[k].sources.length;
}
db.total_registered_sources = totalSrc;
db.total_sources = totalSrc;

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log(`Successfully synchronized master_rights_database.json for industrialisation_and_empire! Total sources for unit: ${sources.length}. Total db sources: ${totalSrc}`);
