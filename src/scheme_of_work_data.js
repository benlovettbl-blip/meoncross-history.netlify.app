/**
 * History Revision Hub — Schemes of Work Data Manifest
 *
 * Provides structured syllabus matrices and enquiry data for the interactive
 * Department Portal & Disciplinary Operations Command Center.
 *
 * Standards Enforced:
 * 1. 100% Institutional Neutrality & School Anonymity.
 * 2. Authentic Disciplinary History (Christine Counsell 4-Act Framework).
 * 3. Real Historical Figures with verified primary records (Zero AI imagery).
 * 4. Clean, universal KEY FIGURE badge.
 */

export const SCHEMES_OF_WORK_DATA = {
  medieval_england: {
    unitId: 'medieval_england',
    yearGroup: 'Year 7',
    keyStage: 'KS3',
    title: 'Medieval England & The Struggle for Power (1066–1485)',
    subtitle: 'Conquest, Feudal Control, Crown vs Church, Demography & Popular Revolt',
    overarchingEnquiry:
      'How was royal power constructed, contested, and transformed in medieval England between Hastings and Bosworth?',
    textbookPdf: '/pdfs/medieval_england_textbook_PUBLISHER.pdf',
    workbookPdf: '/pdfs/medieval_england_pupil_workbook_FINAL_V17.pdf',
    enquiries: [
      {
        num: 1,
        title: '1066 & The Battle of Hastings',
        enquiryQuestion: 'Why did William of Normandy win the Battle of Hastings in 1066?',
        disciplinaryFocus: 'Change & Continuity / Causal Interaction',
        sources: 'Bayeux Tapestry; Anglo-Saxon Chronicle (MS C); William of Poitiers',
        keyFigure: 'Duke William of Normandy',
        figureRole: 'Duke of Normandy & King of England',
        vocabulary: [
          'Housecarl',
          'Fyrd',
          'Witan',
          'Feigned Retreat',
          'Succession Crisis',
          'Shield Wall',
        ],
      },
      {
        num: 2,
        title: 'Castles, Terror & Domesday',
        enquiryQuestion:
          'How did William the Conqueror establish and maintain control over a hostile Anglo-Saxon population?',
        disciplinaryFocus: 'Dual-Source Utility & Provenance',
        sources: 'Bayeux Tapestry (Hastings motte); Orderic Vitalis; Domesday Book (Portchester)',
        keyFigure: 'Orderic Vitalis',
        figureRole: 'Anglo-Norman Monk & Chronicler',
        vocabulary: [
          'Motte-and-Bailey',
          'Castellan',
          'Harrying of the North',
          'Domesday Book',
          'Subjugation',
          'Feudal Tenure',
        ],
      },
      {
        num: 3,
        title: 'Crown vs Church: Henry II & Becket',
        enquiryQuestion:
          'Why did the legal dispute between Henry II and Thomas Becket culminate in murder in Canterbury Cathedral?',
        disciplinaryFocus: 'Causation & Transformation',
        sources:
          'Clause 3 Constitutions of Clarendon (1164); Edward Grim Eyewitness Account (1170)',
        keyFigure: 'Thomas Becket',
        figureRole: 'Archbishop of Canterbury & Martyr',
        vocabulary: [
          'Benefit of Clergy',
          'Criminous Clerks',
          'Excommunication',
          'Martyrdom',
          'Papal Supremacy',
          'Penance',
        ],
      },
      {
        num: 4,
        title: 'Magna Carta (1215): Liberty or Grab?',
        enquiryQuestion:
          'Was Magna Carta a revolutionary charter of human rights or a selfish baronial tax treaty?',
        disciplinaryFocus: 'Historical Significance & Anachronism',
        sources: 'Roger of Wendover; Magna Carta Clauses 12, 39, 61; Papal Annulment Bull',
        keyFigure: 'King John ("Lackland")',
        figureRole: 'King of England & Angevin Monarch',
        vocabulary: [
          'Scutage',
          'Baronial Oligarchy',
          'Due Process',
          'Habeas Corpus',
          'Annulment',
          'Constitutional Monarchy',
        ],
      },
      {
        num: 5,
        title: 'Doom Paintings, Tithes & Village Life',
        enquiryQuestion:
          'How did manorial serfdom and Catholic doctrine shape the mental and daily world of a medieval peasant?',
        disciplinaryFocus: 'Historiographical Debate & Social Structure',
        sources: 'Luttrell Psalter (1330); Bishop’s Waltham Pipe Rolls (1210); Doom Fresco',
        keyFigure: 'The Manorial Reeve',
        figureRole: 'Village Foreman & Peasant Supervisor',
        vocabulary: [
          'Villein / Serf',
          'Tithe',
          'Manorialism',
          'Open-Field System',
          'Doom Painting',
          'Corvée Labour',
        ],
      },
      {
        num: 6,
        title: '1348: Black Death & Social Shatter',
        enquiryQuestion:
          'How far did the demographic catastrophe of the Black Death shatter the feudal order of medieval England?',
        disciplinaryFocus: 'Turning Point Analysis & Demography',
        sources: 'Henry Knighton; Bishop Ralph of Shrewsbury; Statute of Labourers (1351)',
        keyFigure: 'Henry Knighton',
        figureRole: 'Augustinian Canon & Eyewitness Chronicler',
        vocabulary: [
          'Bubonic Plague',
          'Pneumonic Plague',
          'Miasma',
          'Flagellant',
          'Flagrant Scarcity',
          'Labourer Wage-Bargaining',
        ],
      },
      {
        num: 7,
        title: '1381: The Peasants’ Revolt',
        enquiryQuestion:
          'Why did the 1381 Peasants’ Revolt threaten the survival of royal government in London?',
        disciplinaryFocus: 'Historical Evidence & Forensic Extraction',
        sources: 'Jean Froissart (John Ball’s Sermon); Anonimalle Chronicle (Smithfield)',
        keyFigure: 'Wat Tyler & John Ball',
        figureRole: 'Leaders of the 1381 Great Uprising',
        vocabulary: [
          'Poll Tax',
          'Serfdom Abolition',
          'Radical Egalitarianism',
          'Charter Revocation',
          'Smithfield Climax',
          'Class Conflict',
        ],
      },
      {
        num: 8,
        title: 'Wars of the Roses & Bosworth (1455–1485)',
        enquiryQuestion:
          'Why did dynastic civil war consume the English nobility between 1455 and 1485?',
        disciplinaryFocus: 'Agency, Causation & Long-Term Legacy',
        sources: 'Crowland Chronicle; Chronicle of the Brut (Towton); Polydore Vergil',
        keyFigure: 'King Richard III',
        figureRole: 'Last Plantagenet King of England',
        vocabulary: [
          'Bastard Feudalism',
          'Dynastic Factionalism',
          'Usurpation',
          'Retinue',
          'Bosworth Field',
          'Tudor Settlement',
        ],
      },
    ],
  },

  early_modern_world: {
    unitId: 'early_modern_world',
    yearGroup: 'Year 8',
    keyStage: 'KS3',
    title: 'The Early Modern World & The English Civil War (1450–1750)',
    subtitle:
      'Global Encounters, Religious Reformation, Revolutionary Sovereignty & The Transatlantic Trade',
    overarchingEnquiry:
      'How did early modern commerce, religious conflict, and ideological revolution reshape Britain and the global balance of power between 1450 and 1750?',
    textbookPdf: '/pdfs/early_modern_world_textbook_PUBLISHER.pdf',
    workbookPdf: '/pdfs/early_modern_world_pupil_workbook_FINAL_V17.pdf',
    enquiries: [
      {
        num: 1,
        title: 'Constantinople 1453 & The Spice Routes',
        enquiryQuestion:
          'Why did the Ottoman capture of Constantinople in 1453 force European monarchs to look across the Atlantic?',
        disciplinaryFocus: 'Causation & Consequence / Geopolitics',
        sources: 'Catalan Atlas (Mansa Musa); Kritovoulos Chronicle on Mehmed II',
        keyFigure: 'Sultan Mehmed II (The Conqueror)',
        figureRole: 'Sultan of the Ottoman Empire',
        vocabulary: [
          'Ottoman Empire',
          'Levant',
          'Spice Routes',
          'Geopolitical Choke-Point',
          'Fall of Constantinople',
          'Renaissance',
        ],
      },
      {
        num: 2,
        title: 'The Age of Discovery & Spanish Silver',
        enquiryQuestion:
          'How did the discovery of American silver reshape European warfare and provoke English privateering?',
        disciplinaryFocus: 'Change & Continuity / Economic Causation',
        sources: 'Cantino Planisphere; Treaty of Tordesillas; Armada Portrait of Elizabeth I',
        keyFigure: 'Sir Francis Drake',
        figureRole: 'Naval Commander & Circumnavigator',
        vocabulary: [
          'Treaty of Tordesillas',
          'Bullion',
          'Privateering',
          'Spanish Armada',
          'Global Hegemony',
          'Potosí Silver',
        ],
      },
      {
        num: 3,
        title: 'The Kingdom of Benin & West African Trade',
        enquiryQuestion:
          'What does pre-colonial trade between Britain and Benin reveal about the balance of early modern power?',
        disciplinaryFocus: 'Historical Diversity & Mutual Diplomacy',
        sources: 'Benin Bronze Court Plaques; Sir Thomas Roe Embassy Journal',
        keyFigure: 'Oba Ewuare II of Benin',
        figureRole: 'Oba (King) of the Kingdom of Benin',
        vocabulary: [
          'Kingdom of Benin',
          'Brass Casting',
          'Oba',
          'Diplomatic Parity',
          'Mughal Empire',
          'Pre-Colonial Sovereignty',
        ],
      },
      {
        num: 4,
        title: 'The Gunpowder Plot (1605): Faith & Terror',
        enquiryQuestion:
          'Was the 1605 conspiracy a desperate act of religious resistance or a calculated act of domestic terrorism?',
        disciplinaryFocus: 'Evidence & Forensic Interrogation',
        sources: 'Monteagle Letter; Guy Fawkes Confession; Crispijn van de Passe Print',
        keyFigure: 'Robert Catesby',
        figureRole: 'Mastermind of the Gunpowder Plot',
        vocabulary: [
          'Recusancy',
          'Jesuit Underground',
          'Divine Right of Kings',
          'State Surveillance',
          'Treason',
          'Anti-Catholic Penal Laws',
        ],
      },
      {
        num: 5,
        title: 'The Civil War & The Trial of Charles I',
        enquiryQuestion:
          'Why did the struggle between King and Parliament lead to the unprecedented trial and public execution of Charles I in 1649?',
        disciplinaryFocus: 'Significance & Constitutional Transformation',
        sources: 'Putney Debates Record; King Charles I Death Warrant (1649)',
        keyFigure: 'Edward Sexby',
        figureRole: 'New Model Army Trooper, Elected Agitator & Leveller',
        vocabulary: [
          'New Model Army',
          'Putney Debates',
          'Regicide',
          'Parliamentary Sovereignty',
          'Levellers',
          'Absolute Monarchy',
        ],
      },
      {
        num: 6,
        title: 'The Commonwealth & Navigation Acts',
        enquiryQuestion:
          'How did the English Republic lay the commercial and naval foundations of the British Empire?',
        disciplinaryFocus: 'Causation & Imperial Commercial Strategy',
        sources: '1651 Navigation Act Text; 1651 Great Seal of the Commonwealth',
        keyFigure: 'Oliver Cromwell',
        figureRole: 'Lord Protector of the Commonwealth',
        vocabulary: [
          'Commonwealth',
          'Protectorate',
          'Western Design',
          'Navigation Acts',
          'Mercantilism',
          'Naval Monopolies',
        ],
      },
      {
        num: 7,
        title: 'The Transatlantic Slave Trade',
        enquiryQuestion:
          'How did the triangular slave trade operate, and why was it described as a machine for turning human lives into capital?',
        disciplinaryFocus: 'Historical Evidence & Forensic Extraction',
        sources: 'Alexander Falconbridge Account; Stowage Plan of the Brookes (1788)',
        keyFigure: 'Alexander Falconbridge',
        figureRole: 'Slave Ship Surgeon & Eyewitness Abolitionist',
        vocabulary: [
          'Middle Passage',
          'Triangular Trade',
          'Chattel Slavery',
          'Dehumanization',
          'Commodification',
          'Factory Forts',
        ],
      },
      {
        num: 8,
        title: 'Resistance, Maroons & Abolition',
        enquiryQuestion:
          'To what extent was the transatlantic slave trade ended by enslaved resistance rather than British parliamentary reformers?',
        disciplinaryFocus: 'Historical Agency & Interpretations',
        sources: '1739 British-Maroon Treaty; Olaudah Equiano Autobiography (1789)',
        keyFigure: 'Queen Nanny of the Maroons',
        figureRole: 'Leader of the Jamaican Windward Maroons',
        vocabulary: [
          'Maroons',
          'Guerrilla Ambushes',
          'Plantation Sabotage',
          'Abolition',
          'Olaudah Equiano',
          'Sovereign Autonomy',
        ],
      },
    ],
  },

  industrialisation_and_empire: {
    unitId: 'industrialisation_and_empire',
    yearGroup: 'Year 8',
    keyStage: 'KS3',
    title: 'Industrialisation, Empire & Power (1750–1901)',
    subtitle:
      'Steam Power, Urban Squalor, The Factory System, Imperial Hegemony & Democratic Reform',
    overarchingEnquiry:
      'How did industrial technology, colonial extraction, and popular radical protest transform Britain from an agrarian kingdom into the "Workshop of the World" between 1750 and 1901?',
    textbookPdf: '/pdfs/industrialisation_and_empire_textbook_PUBLISHER.pdf',
    workbookPdf: '/pdfs/industrialisation_and_empire_pupil_workbook_FINAL_V17.pdf',
    enquiries: [
      {
        num: 1,
        title: 'The Dawn of Steam & The Iron Revolution',
        enquiryQuestion:
          'How did Henry Cort’s puddling process at Funtley eliminate Britain’s strategic vulnerability and power the Industrial Revolution?',
        disciplinaryFocus: 'Technological Causation & National Security',
        sources: 'De Loutherbourg (Coalbrookdale by Night); Henry Cort Patent Drawings (1783–84)',
        keyFigure: 'Henry Cort',
        figureRole: 'Fareham Ironmaster & Metallurgical Pioneer',
        vocabulary: [
          'Pig Iron',
          'Wrought Iron',
          'Puddling Process',
          'Reverberatory Furnace',
          'Domestic System',
          'Grooved Rollers',
        ],
      },
      {
        num: 2,
        title: 'Factory Work & Child Labour',
        enquiryQuestion:
          'Why did early Victorian mill masters defend fourteen-hour child labour, and how was state regulation finally won?',
        disciplinaryFocus: 'Evidence & Forensic Interrogation',
        sources: 'Allom (Powerloom Weaving Shed); 1832 Sadler Committee (Matthew Crabtree)',
        keyFigure: 'Matthew Crabtree',
        figureRole: 'Former Child Labourer, Blanket Mill Apprentice & Parliamentary Witness',
        vocabulary: [
          'Factory System',
          'Laissez-Faire',
          'Scavenger',
          'Piecer',
          'Overlooker',
          'Ten Hours Act',
        ],
      },
      {
        num: 3,
        title: 'Urban Slums & Public Health',
        enquiryQuestion:
          'Why did it take the "Great Stink" of 1858 and repeated cholera epidemics for Parliament to fund civil sanitation?',
        disciplinaryFocus: 'Causation & Consequence / Public Policy',
        sources: 'Doré (Over London by Rail); John Leech (A Court for King Cholera, 1852)',
        keyFigure: 'Sir Edwin Chadwick',
        figureRole: 'Social Reformer & Sanitarian',
        vocabulary: [
          'Miasma Theory',
          'Back-to-Backs',
          'Cesspool',
          'Great Stink of 1858',
          'Arterial Sewers',
          'Public Health Act',
        ],
      },
      {
        num: 4,
        title: 'Empire Building & Naval Supremacy',
        enquiryQuestion:
          'How did industrial steam power and maritime gunboats transform Britain into a global imperial hegemon?',
        disciplinaryFocus: 'Historical Utility & Imperial Extraction',
        sources: 'Walter Crane (Imperial Federation Map); HMS Warrior; 1840 Bengal Report',
        keyFigure: 'Isambard Kingdom Brunel',
        figureRole: 'Civil & Mechanical Engineer',
        vocabulary: [
          'Gunboat Diplomacy',
          'Coaling Stations',
          'Free Trade Imperialism',
          'Mercantilism',
          'Naval Hegemony',
          'Deindustrialisation',
        ],
      },
      {
        num: 5,
        title: 'The 1857 Indian Rebellion',
        enquiryQuestion:
          'Was the 1857 uprising in India a localized military mutiny or a coordinated war of national independence?',
        disciplinaryFocus: 'Historiographical Debate & Causation',
        sources: 'Illustrated London News (Meerut); 1857 Azamgarh Rebel Proclamation',
        keyFigure: 'Rani Lakshmibai of Jhansi',
        figureRole: 'Rani of Jhansi & Rebel General',
        vocabulary: [
          'Doctrine of Lapse',
          'Sepoy Mutiny',
          'East India Company',
          'Crown Raj',
          'Princely States',
          'Anti-Colonial Resistance',
        ],
      },
      {
        num: 6,
        title: 'Radical Protest & Chartism',
        enquiryQuestion:
          'Why did working-class Britons demand the People’s Charter, and why did elites refuse to grant it in the 1840s?',
        disciplinaryFocus: 'Historical Significance & Resistance Strategies',
        sources: 'Kennington Common Photograph (1848); "Captain Swing" Hampshire Threat Letter',
        keyFigure: 'George Mellor',
        figureRole: 'Artisan Cloth Cropper & Yorkshire Luddite Leader',
        vocabulary: [
          'Chartism',
          'People’s Charter',
          'Moral Force',
          'Physical Force',
          'Universal Suffrage',
          'Swing Riots',
        ],
      },
      {
        num: 7,
        title: 'The Road to Democracy',
        enquiryQuestion:
          'How did Britain transition from corrupt rotten boroughs to a secret ballot and a mass electorate?',
        disciplinaryFocus: 'Change & Continuity / Political Transformation',
        sources: '1832 Rotten Boroughs Map; Cruikshank (The Reform Tree); 1869 Bribery Evidence',
        keyFigure: 'Charles Grey, 2nd Earl Grey',
        figureRole: 'Whig Prime Minister & Reformer',
        vocabulary: [
          'Rotten Borough',
          'Hustings',
          'Great Reform Act 1832',
          'Secret Ballot Act 1872',
          'Franchise',
          'Oligarchy',
        ],
      },
      {
        num: 8,
        title: 'The Imperial & Industrial Verdict',
        enquiryQuestion:
          'Did the 19th century represent unprecedented progress or brutal human sacrifice for the British working class and colonial subjects?',
        disciplinaryFocus: 'Synoptic Evaluation & Historiographical Debate',
        sources: 'Leech (Capital and Labour, 1843); 1851 Great Exhibition Official Catalogue',
        keyFigure: 'Queen Victoria',
        figureRole: 'Queen of the United Kingdom & Empress of India',
        vocabulary: [
          'Workshop of the World',
          'Optimist School',
          'Pessimist School',
          'Drain of Wealth',
          'Standard of Living',
          'Victorian Era',
        ],
      },
    ],
  },
};
