const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'units', 'first_british_empire', 'data.js');

const spinesByLessonId = {
  lesson_1: {
    title: 'The East India Company & Mughal Bengal (1600–1757)',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '1600–1615',
        title: 'The Royal Charter & London Merchants',
        actor: 'Queen Elizabeth I & 218 Merchants',
        tag: '📜 ROYAL CHARTER',
        trigger:
          'Queen Elizabeth I granted a royal monopoly charter to 218 London merchants, incorporating the East India Company to trade in Asian spices, pepper, and fine calicos.',
        connective:
          'Combined private venture capital with royal authority, creating a protected commercial monopoly backed by the English state.',
        question: 'Why did Queen Elizabeth I grant a royal monopoly charter?',
      },
      {
        step: 2,
        date: '1615–1700',
        title: 'Fortified Coastal Factories in India',
        actor: 'Emperor Jahangir & Company Factors',
        tag: '🏭 TRADING FACTORIES',
        trigger:
          'Sir Thomas Roe secured imperial trade decrees from Mughal Emperor Jahangir, enabling the Company to construct fortified coastal warehouses at Surat, Madras, and Calcutta.',
        connective:
          'Established heavily defended territorial bridgeheads on the Indian subcontinent, garrisoned by privately hired sepoy troops.',
        question: 'How did the Company establish fortified coastal factories in India?',
      },
      {
        step: 3,
        date: '1756',
        title: 'Tensions Erupt: Nawab Siraj ud-Daulah',
        actor: 'Nawab of Bengal & Company Officials',
        tag: '⚔️ CALCUTTA CRISIS',
        trigger:
          'The new Nawab of Bengal, Siraj ud-Daulah, ordered the British to stop mounting unauthorized heavy artillery at Fort William, storming the settlement when they refused.',
        connective:
          'Triggered the British military expedition under Robert Clive, transforming a commercial dispute into an aggressive war for territorial conquest.',
        question: 'Why did tensions erupt into crisis with Nawab Siraj ud-Daulah?',
      },
      {
        step: 4,
        date: 'June 1757',
        title: 'The Battle of Plassey & Clive’s Victory',
        actor: 'Robert Clive & Mir Jafar',
        tag: '💥 PLASSEY VICTORY',
        trigger:
          'Robert Clive bribed the Nawab’s army commander Mir Jafar to betray his master, while British troops kept their gunpowder dry during a torrential monsoon downpour.',
        connective:
          'Annihilated the Nawab’s army, placing a puppet ruler on the throne and handing the Company sovereign political supremacy over Bengal.',
        question: 'How did Robert Clive achieve victory at the Battle of Plassey?',
      },
      {
        step: 5,
        date: '1765–1770',
        title: 'The 1765 Diwani & Bengal Taxation',
        actor: 'Emperor Shah Alam II & Lord Clive',
        tag: '👑 THE DIWANI TREATY',
        trigger:
          'Mughal Emperor Shah Alam II signed the Treaty of Allahabad, granting the Company the Diwani—the legal right to collect all agricultural taxes from 20 million Bengalis.',
        connective:
          'Transformed a commercial trading corporation into an imperial sovereign ruler, enabling ruthless tax extraction that worsened the devastating 1770 Famine.',
        question: 'How did the 1765 Diwani transform a company into a sovereign ruler?',
      },
    ],
  },
  lesson_2: {
    title: 'The Transatlantic Slave Trade & The Middle Passage (1619–1807)',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '1619–1672',
        title: 'The Mechanics of the Triangular Trade',
        actor: 'British Merchants & West African Rulers',
        tag: '🚢 TRIANGULAR TRADE',
        trigger:
          'British merchants established a vast triangular trade: carrying manufactured guns and brass to Africa, kidnapped human captives to the Americas, and raw sugar to Britain.',
        connective:
          'Enriched British port cities like Bristol and Liverpool, embedding colonial slavery into the core foundation of British maritime wealth.',
        question: 'How did the Triangular Trade connect Britain, Africa, and the Americas?',
      },
      {
        step: 2,
        date: '1672–1713',
        title: 'The Royal African Company & The Asiento',
        actor: 'King Charles II & Duke of York',
        tag: '📜 ROYAL MONOPOLY',
        trigger:
          'King Charles II granted a monopoly charter to the Royal African Company, whose ships branded captives with ‘RAC’, followed by Britain securing the Spanish Asiento contract.',
        connective:
          'Institutionalized human trafficking under royal protection, turning Britain into the world’s preeminent transatlantic slave-trading power.',
        question: 'How did royal monopolies and the Asiento expand British slaving?',
      },
      {
        step: 3,
        date: '1713–1781',
        title: 'The Horrors of the Middle Passage',
        actor: 'Slave Ship Captains & Enslaved Africans',
        tag: '⛓️ THE MIDDLE PASSAGE',
        trigger:
          'Enslaved Africans were crammed below decks on suffocating wooden shelves, shackled in pairs with iron leg-irons while enduring lethal dysentery and extreme trauma.',
        connective:
          'Resulted in the deaths of over 1.5 million people during oceanic transit, treating human beings as mere perishable commercial cargo.',
        question: 'What forensic conditions characterised the horrors of the Middle Passage?',
      },
      {
        step: 4,
        date: '1781',
        title: 'The Zong Massacre & Chattel Slavery',
        actor: 'Captain Luke Collingwood & London Courts',
        tag: '⚖️ ZONG MASSACRE',
        trigger:
          'Running low on water, Captain Luke Collingwood ordered 133 sick enslaved people thrown alive into the sea so the ship’s owners could claim £30 per head in insurance.',
        connective:
          'Exposed the barbaric reality of chattel slavery when London judges treated the atrocity as an ordinary commercial property insurance dispute.',
        question: 'How did the Zong massacre expose the dehumanising logic of chattel slavery?',
      },
      {
        step: 5,
        date: '1788–1807',
        title: 'The Brookes Diagram & Abolitionism',
        actor: 'Olaudah Equiano & Thomas Clarkson',
        tag: '🕊️ ABOLITION CAMPAIGN',
        trigger:
          'Abolitionists published the forensic cross-section diagram of the slave ship Brookes alongside Olaudah Equiano’s bestselling autobiography detailing the terrors of enslavement.',
        connective:
          'Galvanized British public opinion against the trade, forcing Parliament to pass the Abolition of the Slave Trade Act in 1807.',
        question: 'How did the Brookes diagram and Equiano’s voice ignite abolitionism?',
      },
    ],
  },
  lesson_3: {
    title: 'Plantation Reality, Queen Nanny & Maroon Resistance (1655–1740)',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '1655',
        title: 'Cromwell’s Conquest & The Birth of Maroons',
        actor: 'Oliver Cromwell & Escaped Africans',
        tag: '🌴 MAROON ORIGINS',
        trigger:
          'Oliver Cromwell launched the "Western Design" to conquer Jamaica from Spain, during which enslaved Africans escaped into the rugged, forested Blue Mountains.',
        connective:
          'Established independent, fortified Maroon settlements that resisted British colonial re-enslavement for over a century.',
        question: 'How did Cromwell’s conquest of Jamaica birth the Maroon communities?',
      },
      {
        step: 2,
        date: '1670–1730',
        title: 'Sugar Cane Monoculture & The Gang System',
        actor: 'Planters, Overseers & Enslaved Labourers',
        tag: '⚠️ SUGAR PLANTATION',
        trigger:
          'Planters cleared Jamaica for intensive sugar monoculture, dividing enslaved labourers into rigid gangs driven by the cowhide whip and dangerous boiling houses.',
        connective:
          'Created an agro-industrial regime so lethal that planters found it cheaper to replace dying workers with fresh African imports than sustain them.',
        question: 'Why was sugar cultivation described as an agro-industrial death machine?',
      },
      {
        step: 3,
        date: '1680–1720',
        title: 'Everyday Resistance & Cultural Preservation',
        actor: 'Enslaved Men and Women',
        tag: '✊ EVERYDAY RESISTANCE',
        trigger:
          'Enslaved people fought back daily by breaking hoe handles, sabotaging machinery, feigning sickness, and preserving African spiritual traditions like Obeah and Anansi stories.',
        connective:
          'Maintained cultural identity and human dignity in defiance of colonial legal codes that classified them as mere chattel.',
        question: 'How did enslaved labourers engage in daily sabotage and cultural survival?',
      },
      {
        step: 4,
        date: '1720–1734',
        title: 'Queen Nanny & The First Maroon War',
        actor: 'Queen Nanny & Windward Maroons',
        tag: '📯 GUERRILLA WARFARE',
        trigger:
          'Queen Nanny led the Windward Maroons, utilizing living branch camouflage, mountain ambush tactics, and the curved abeng horn to coordinate surprise attacks.',
        connective:
          'Humiliated British regular forces in the Blue Mountains, rendering the colonial militia incapable of conquering the interior.',
        question: 'How did Queen Nanny lead the Windward Maroons to military victory?',
      },
      {
        step: 5,
        date: '1739–1740',
        title: 'The 1739 Maroon Peace Treaty',
        actor: 'Governor Edward Trelawny & Maroon Leaders',
        tag: '📜 1739 PEACE TREATY',
        trigger:
          'Exhausted by warfare, the British governor sent a white flag to negotiate the 1739 Treaty, granting the Maroons 1,500 acres of sovereign land.',
        connective:
          'Recognized Maroon independence as free sovereign subjects, but forced them into a tragic compromise: agreeing to capture and return future runaway slaves.',
        question: 'Why was the 1739 Peace Treaty both a triumph and a painful compromise?',
      },
    ],
  },
  lesson_4: {
    title: 'The Thirteen Colonies, The Proclamation of 1763 & The Boston Tea Party (1763–1773)',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '1763',
        title: 'Seven Years’ War Debt & The Proclamation Line',
        actor: 'King George III & Parliament',
        tag: '📜 PROCLAMATION OF 1763',
        trigger:
          'Victorious in the Seven Years’ War but facing £133 million in war debt, Parliament passed the Proclamation Line of 1763, barring colonial settlement west of the Appalachians.',
        connective:
          'Infuriated colonial speculators and frontiersmen who felt cheated out of lands they had fought to conquer from France.',
        question: 'Why did British victory in the Seven Years’ War create imperial conflict?',
      },
      {
        step: 2,
        date: '1765–1766',
        title: 'The Stamp Act & "No Taxation Without Representation"',
        actor: 'Colonial Sons of Liberty & Parliament',
        tag: '⚖️ STAMP ACT CRISIS',
        trigger:
          'Parliament imposed direct stamp taxes on legal documents, newspapers, and dice, provoking riots, hanging of tax collectors in effigy, and widespread import boycotts.',
        connective:
          'United the thirteen colonies around a common constitutional slogan: that Englishmen could not be taxed without representation in Parliament.',
        question: 'Why did the Stamp Act provoke the cry "No taxation without representation"?',
      },
      {
        step: 3,
        date: 'March 1770',
        title: 'The Boston Massacre & Revolutionary Propaganda',
        actor: 'British Regulars & Boston Crowd',
        tag: '💥 BOSTON MASSACRE',
        trigger:
          'An angry crowd pelted British soldiers guarding the Boston Custom House with ice and stones; panicked troops fired, killing five colonists including Crispus Attucks.',
        connective:
          'Transformed by Paul Revere’s sensationalized engraving into a symbol of ruthless British tyranny, inflaming anti-imperial sentiment across America.',
        question: 'How was the Boston Massacre transformed into revolutionary propaganda?',
      },
      {
        step: 4,
        date: 'May 1773',
        title: 'The 1773 Tea Act & Corporate Monopoly',
        actor: 'Lord North & East India Company',
        tag: '☕ THE TEA ACT',
        trigger:
          'Parliament passed the Tea Act to bail out the bankrupt East India Company, granting it a monopoly to sell 18 million pounds of surplus tea directly to the colonies.',
        connective:
          'Alarmed colonial merchants that Parliament would grant monopolies over other trades and enforce its right to tax American consumers at will.',
        question: 'Why did the 1773 Tea Act provoke outrage even though it lowered tea prices?',
      },
      {
        step: 5,
        date: 'Dec 1773',
        title: 'The Boston Tea Party & The Coercive Acts',
        actor: 'Sons of Liberty & King George III',
        tag: '🌊 BOSTON TEA PARTY',
        trigger:
          'Disguised as Mohawk warriors, the Sons of Liberty boarded three merchant ships at Griffin’s Wharf, smashing open and dumping 342 crates of tea into the harbor.',
        connective:
          'Prompted King George III to pass the punitive Coercive Acts, shutting Boston harbor and pushing the thirteen colonies into open military rebellion.',
        question: 'How did the Boston Tea Party shatter relations between Britain and America?',
      },
    ],
  },
  lesson_5: {
    title: 'The American Revolution, 1776 Declaration & The Black Loyalists (1775–1783)',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '1775',
        title: 'Lexington, Concord & Dunmore’s Proclamation',
        actor: 'Colonial Minutemen & Lord Dunmore',
        tag: '⚔️ OUTBREAK OF WAR',
        trigger:
          'British redcoats clashed with colonial minutemen at Lexington and Concord, while Virginia’s royal governor Lord Dunmore offered freedom to any enslaved person joining the King’s army.',
        connective:
          'Ignited revolutionary war and terrified American rebel slaveholders, prompting thousands of Black Loyalists to fight for the British Crown.',
        question: 'How did Lexington, Concord, and Dunmore’s Proclamation start the war?',
      },
      {
        step: 2,
        date: 'July 1776',
        title: 'The Declaration of Independence & The Slavery Paradox',
        actor: 'Thomas Jefferson & Continental Congress',
        tag: '📜 1776 DECLARATION',
        trigger:
          'Thomas Jefferson drafted the Declaration proclaiming "all men are created equal", while forty-one of the fifty-six rebel signatories were themselves wealthy slaveholders.',
        connective:
          'Created a profound moral contradiction at the core of the new American Republic that British critics like Dr Samuel Johnson sharply ridiculed.',
        question: 'What central moral paradox lay at the heart of the 1776 Declaration?',
      },
      {
        step: 3,
        date: '1777–1780',
        title: 'Saratoga & The French Global Intervention',
        actor: 'General Burgoyne & King Louis XVI',
        tag: '🌍 GLOBAL COALITION',
        trigger:
          'The American victory at Saratoga convinced France, Spain, and the Dutch Republic to join the war, deploying battle fleets to threaten British Caribbean sugar islands.',
        connective:
          'Stretched the Royal Navy thin across the globe, preventing Britain from concentrating its military forces exclusively on North America.',
        question: 'How did Saratoga and the French alliance turn the rebellion into a global war?',
      },
      {
        step: 4,
        date: 'October 1781',
        title: 'The Siege of Yorktown & British Surrender',
        actor: 'General Cornwallis & French Fleet (De Grasse)',
        tag: '💥 YORKTOWN DEFEAT',
        trigger:
          'Admiral de Grasse’s French fleet won the Battle of the Chesapeake, trapping General Cornwallis on the Yorktown peninsula without naval rescue until he surrendered.',
        connective:
          'Shattered Britain’s political will to continue fighting, forcing Parliament to open peace negotiations and accept American independence.',
        question: 'How did French naval power force General Cornwallis to surrender at Yorktown?',
      },
      {
        step: 5,
        date: '1783',
        title: 'The Treaty of Paris & The Black Loyalist Exodus',
        actor: 'Sir Guy Carleton & 3,000 Black Loyalists',
        tag: '🕊️ TREATY OF PARIS',
        trigger:
          'The Treaty of Paris recognized American independence, while British Commander Sir Guy Carleton refused George Washington’s demands and evacuated 3,000 Black Loyalists to Nova Scotia.',
        connective:
          'Marked the dramatic collapse of the First British Empire in the Atlantic, turning Britain’s imperial attention eastward toward India and the Pacific.',
        question: 'How did the Treaty of Paris and the Black Loyalists conclude the First Empire?',
      },
    ],
  },
};

let content = fs.readFileSync(dataPath, 'utf8');

for (const [lessonId, spineData] of Object.entries(spinesByLessonId)) {
  // Target each lesson's did_you_know: to inject causal_domino_spine right above it
  const lessonRegex = new RegExp(
    `(\\bid:\\s*['"]${lessonId}['"](?:(?!\\bid:\\s*['"])[\\s\\S])*?)(did_you_know:\\s*)`,
  );
  const match = content.match(lessonRegex);
  if (match) {
    if (match[1].includes('causal_domino_spine:')) {
      console.log(`ℹ️ causal_domino_spine already present for ${lessonId}, skipping`);
      continue;
    }
    const formattedSpine = `causal_domino_spine: ${JSON.stringify(spineData, null, 6)},\n      $2`;
    content = content.replace(lessonRegex, `$1${formattedSpine}`);
    console.log(`✅ Injected causal_domino_spine for ${lessonId}`);
  } else {
    console.warn(`⚠️ Could not find injection point for ${lessonId}`);
  }
}

fs.writeFileSync(dataPath, content, 'utf8');
console.log('🎉 Successfully processed milestone spines for units/first_british_empire/data.js');
