const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'units', 'second_british_empire', 'data.js');

const spinesByLessonId = {
  lesson_1: {
    title: 'Engines of Empire: Mercantilism, Naval Hegemony & Portsmouth Dockyard',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '1783–1805',
        title: 'Mercantilism & The Navigation Acts',
        actor: 'British Parliament & Merchant Guilds',
        tag: '⚖️ MERCANTILISM',
        trigger:
          'Parliament enforced the Navigation Acts, banning foreign vessels from colonial trade and requiring all goods to pass through British ports on British-crewed ships.',
        connective:
          'Guaranteed that colonial raw materials flowed directly into British factories, accumulating massive national bullion reserves.',
        question: 'Why did Britain rely on mercantilism and navigation laws?',
      },
      {
        step: 2,
        date: '1805–1815',
        title: 'Trafalgar & Global Naval Hegemony',
        actor: 'Admiral Lord Nelson & Royal Navy',
        tag: '⚓ NAVAL SUPREMACY',
        trigger:
          'Nelson annihilated the combined Franco-Spanish fleet at Trafalgar without losing a single ship, eliminating European naval competition for a century.',
        connective:
          'Established the Pax Britannica, allowing the Royal Navy to police global sea lanes and enforce gunboat diplomacy unhindered.',
        question: 'How did naval dominance at Trafalgar secure Britain’s maritime supremacy?',
      },
      {
        step: 3,
        date: '1815–1850',
        title: 'Portsmouth Dockyard & Industrial Automation',
        actor: 'Marc Brunel & Admiralty Engineers',
        tag: '🏭 INDUSTRIAL DOCKYARD',
        trigger:
          'Portsmouth Dockyard installed Marc Brunel’s steam-powered block mills, becoming the world’s first mass-production industrial manufacturing complex.',
        connective:
          'Supplied the fleet with 130,000 interchangeable wooden rigging blocks annually, keeping the Royal Navy operational across all global oceans.',
        question: 'Why was Portsmouth Royal Dockyard the industrial heart of global empire?',
      },
      {
        step: 4,
        date: '1860',
        title: 'HMS Warrior & The Ironclad Revolution',
        actor: 'Admiralty & Thames Ironworks',
        tag: '🛡️ HMS WARRIOR',
        trigger:
          'Britain launched HMS Warrior, an armoured warship with 4.5-inch wrought iron plates, steam screw propulsion, and rifled Armstrong guns.',
        connective:
          'Rendered every traditional wooden warship on Earth instantly obsolete overnight, maintaining Britain’s maritime technological supremacy.',
        question: 'How did HMS Warrior render all wooden naval fleets obsolete overnight?',
      },
      {
        step: 5,
        date: '1889',
        title: 'The Naval Defence Act & Two-Power Standard',
        actor: 'British Parliament & Royal Navy',
        tag: '📜 TWO-POWER STANDARD',
        trigger:
          'Parliament passed the Naval Defence Act 1889, legally mandating that the Royal Navy must maintain a battleship fleet equal to the next two strongest navies combined.',
        connective:
          'Institutionalised British naval supremacy into British law and triggered a massive late-Victorian naval building program.',
        question: 'How did the Two-Power Standard doctrine formalize British naval dominance?',
      },
    ],
  },
  lesson_2: {
    title: 'The De-industrialisation of India: The Company & Handloom Crisis',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '1700–1757',
        title: 'Mughal India: The World’s Textile Workshop',
        actor: 'Mughal Artisans & Village Weavers',
        tag: '🧵 TEXTILE WORKSHOP',
        trigger:
          'Mughal India produced 25% of the world’s manufactured goods, crafting exquisite handloom muslins and calicos that European traders purchased with gold and silver bullion.',
        connective:
          'Attracted European trading companies eager to tap into India’s vast commercial wealth and unmatched manufacturing skill.',
        question: 'Why was Mughal India the world’s leading textile workshop in 1700?',
      },
      {
        step: 2,
        date: '1721',
        title: 'The Protectionist Calico Acts',
        actor: 'British Parliament & Wool Merchants',
        tag: '⚖️ CALICO ACTS',
        trigger:
          'Responding to violent protests from domestic wool and silk guilds, Parliament passed the Calico Acts, legally banning the import and wearing of dyed Indian cottons in Britain.',
        connective:
          'Protected infant British textile manufacturing behind strict trade walls while hypocritically preaching free commerce abroad.',
        question: 'Why did the British Parliament pass the protectionist Calico Acts?',
      },
      {
        step: 3,
        date: '1765',
        title: 'The Diwani of Bengal & Revenue Inversion',
        actor: 'Robert Clive & East India Company',
        tag: '💰 BENGAL DIWANI',
        trigger:
          'The Treaty of Allahabad granted the East India Company the Diwani (tax-collecting rights) of wealthy Bengal, collecting millions in land revenue from Indian peasants.',
        connective:
          'Allowed the Company to purchase Indian textiles using taxes extracted from Indian peasants rather than importing British silver, draining local wealth.',
        question:
          'How did the Diwani of Bengal invert the financial flow between Britain and India?',
      },
      {
        step: 4,
        date: '1813–1835',
        title: 'Lancashire Steam Mills & Tariff Disparity',
        actor: 'Lancashire Cotton Barons & Parliament',
        tag: '⚙️ STEAM FACTORIES',
        trigger:
          'Lancashire steam mills mass-produced cheap machine cotton, while Parliament slapped prohibitive 70–80% duties on Indian cloth imports while forcing India to import British goods duty-free.',
        connective:
          'Decimated Indian handloom weaving by undercutting local village weavers with subsidised British factory cloth.',
        question: 'How did steam machinery and rigged tariffs dismantle Indian handloom weaving?',
      },
      {
        step: 5,
        date: '1834',
        title: 'Bentinck’s Report & Rural Destitution',
        actor: 'Governor-General William Bentinck',
        tag: '⚠️ DE-INDUSTRIALISATION',
        trigger:
          'Governor-General Bentinck reported that "the bones of the cotton-weavers are bleaching the plains of India" as historic loom cities like Dhaka collapsed into ghost towns.',
        connective:
          'Transformed India from the world’s foremost manufacturing exporter into an impoverished captive market supplying raw cotton and food crops.',
        question:
          'Why did Governor-General Bentinck write that "the bones of weavers bleach the plains"?',
      },
    ],
  },
  lesson_3: {
    title: 'The 1857 Indian Rebellion: Sepoy Grievance, Rani Lakshmibai & The Raj',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '1848–1856',
        title: 'The Doctrine of Lapse & Annexation of Awadh',
        actor: 'Governor-General Lord Dalhousie',
        tag: '👑 DOCTRINE OF LAPSE',
        trigger:
          'Lord Dalhousie annexed princely states lacking natural male heirs (Satara, Jhansi, Nagpur) and seized the rich kingdom of Awadh, home of most Bengal Army sepoys.',
        connective:
          'Outraged Indian royal dynasties and convinced sepoys that the British intended to extinguish traditional Indian sovereignty and land rights.',
        question: 'Why did Lord Dalhousie’s Doctrine of Lapse alienate Indian royal dynasties?',
      },
      {
        step: 2,
        date: 'Early 1857',
        title: 'The Greased Enfield Cartridge Crisis',
        actor: 'Bengal Army Sepoys',
        tag: '🔫 ENFIELD CARTRIDGE',
        trigger:
          'The British Army introduced paper cartridges greased with cow and pig fat, requiring soldiers to bite them open, violating sacred Hindu and Muslim dietary laws.',
        connective:
          'Sparked panic among troops that the Company was deliberately attempting to defile their religious purity and force conversion to Christianity.',
        question: 'Why was the Enfield rifle cartridge the explosive catalyst for rebellion?',
      },
      {
        step: 3,
        date: 'May 1857',
        title: 'The Mutiny at Meerut & March on Delhi',
        actor: 'Sepoy Mutineers & Bahadur Shah Zafar',
        tag: '⚡ MEERUT UPRISING',
        trigger:
          'Sepoys at Meerut broke into open revolt, executed British officers, and marched directly to Delhi to proclaim the elderly Mughal Emperor Bahadur Shah Zafar leader of all India.',
        connective:
          'Transformed an isolated military mutiny into a unified Hindu-Muslim national war of liberation against British colonial rule.',
        question: 'Why was the march from Meerut to Delhi a political masterstroke for the rebels?',
      },
      {
        step: 4,
        date: '1857–1858',
        title: 'Rani Lakshmibai & The Defence of Jhansi',
        actor: 'Rani Lakshmibai of Jhansi',
        tag: '🗡️ RANI LAKSHMIBAI',
        trigger:
          'Deprived of her adopted son’s throne, Rani Lakshmibai strapped her child to her back, drew her talwar sword, and led fierce cavalry charges against British forces until killed at Gwalior.',
        connective:
          'Became an enduring national martyr and symbol of anti-colonial resistance who was revered even by the British commanders who fought her.',
        question: 'How did Rani Lakshmibai of Jhansi become an enduring symbol of resistance?',
      },
      {
        step: 5,
        date: 'August 1858',
        title: 'The 1858 Act & Inauguration of the Raj',
        actor: 'Queen Victoria & British Parliament',
        tag: '👑 THE BRITISH RAJ',
        trigger:
          'Parliament passed the Government of India Act 1858, dissolving the East India Company and transferring sovereign authority directly to Queen Victoria and a royal Viceroy.',
        connective:
          'Abolished corporate mercenary rule, promising religious neutrality while reorganising the Indian army to prevent future uprisings.',
        question:
          'How did the Government of India Act 1858 permanently reshape British governance?',
      },
    ],
  },
  lesson_4: {
    title: 'The Scramble for Africa & Imperial Ideology: Maxim Guns & Plunder',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '1884–1885',
        title: 'The Berlin West Africa Conference',
        actor: 'Chancellor Otto von Bismarck & 14 Powers',
        tag: '🗺️ BERLIN CONFERENCE',
        trigger:
          'Fourteen European nations met in Berlin to carve up the African continent into colonial spheres of influence without a single African ruler or representative invited.',
        connective:
          'Legitimised the colonial partition of Africa under European international law and eliminated diplomatic friction between European imperial rivals.',
        question: 'Why did European powers convene the 1884 Berlin West Africa Conference?',
      },
      {
        step: 2,
        date: '1884',
        title: 'The Doctrine of Effective Occupation',
        actor: 'European Imperial Expeditions',
        tag: '🚩 EFFECTIVE OCCUPATION',
        trigger:
          'The Berlin Act decreed that European powers could claim territory only if they demonstrated "effective occupation" through physical administration, garrisons, and treaty treaties.',
        connective:
          'Accelerated an armed stampede of military columns into the interior to establish forts and claim rubber, mineral, and palm oil territories.',
        question: 'How did the principle of Effective Occupation accelerate military conquest?',
      },
      {
        step: 3,
        date: '1884–1898',
        title: 'The Maxim Gun, Quinine & Military Hegemony',
        actor: 'Hiram Maxim & British Imperial Forces',
        tag: '⚙️ MAXIM GUN & QUININE',
        trigger:
          'Hiram Maxim invented the automatic machine gun firing 600 rounds per minute, while quinine medicine neutralised deadly malaria in equatorial Africa.',
        connective:
          'Gave small European forces overwhelming technological superiority over brave African resistance armies, culminating in the 1898 Battle of Omdurman.',
        question: 'How did the Maxim gun and quinine make conquest militarily irresistible?',
      },
      {
        step: 4,
        date: '1899',
        title: 'The White Man’s Burden & Imperial Ideology',
        actor: 'Rudyard Kipling & Social Darwinists',
        tag: '📜 RACIAL IDEOLOGY',
        trigger:
          'Rudyard Kipling published "The White Man’s Burden", preaching that Europeans had a selfless moral obligation to civilise, educate, and convert non-white peoples.',
        connective:
          'Constructed a self-righteous moral facade that masked violent commercial exploitation under the guise of an enlightened civilising mission.',
        question: 'How did Rudyard Kipling construct the moral myth of "The White Man\'s Burden"?',
      },
      {
        step: 5,
        date: '1920',
        title: 'The Black Man’s Burden & Resource Theft',
        actor: 'E. D. Morel & African Reformers',
        tag: '⚠️ EXPOSING PLUNDER',
        trigger:
          'Journalist E. D. Morel published "The Black Man’s Burden", documenting how European companies engaged in forced labour, hostage-taking, and mutilation to loot rubber and ivory.',
        connective:
          'Exposed the hypocrisy of the civilising mission, proving that imperialism was an organised system of violent corporate theft.',
        question: 'How did E. D. Morel’s "The Black Man\'s Burden" expose colonial capitalism?',
      },
    ],
  },
  lesson_5: {
    title: 'The Imperial Verdict: Workshop of the World or Age of Exploitation?',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '1851',
        title: 'The Great Exhibition & Crystal Palace',
        actor: 'Prince Albert & Henry Cole',
        tag: '🏛️ GREAT EXHIBITION',
        trigger:
          'Prince Albert opened the Great Exhibition inside the monumental glass Crystal Palace, displaying 100,000 exhibits from across the British Empire to 6 million visitors.',
        connective:
          'Proclaimed Britain as the undisputed "Workshop of the World", showcasing steam engines, textiles, and colonial wealth as emblems of providential progress.',
        question: 'How did the 1851 Great Exhibition proclaim Britain the Workshop of the World?',
      },
      {
        step: 2,
        date: '1870–1900',
        title: 'Colonial Infrastructure & Administrative Order',
        actor: 'British Colonial Engineers & Rail Companies',
        tag: '🚂 IMPERIAL RAILWAYS',
        trigger:
          'British engineers constructed 25,000 miles of railway, electric telegraph networks, and massive canal irrigation systems across the Indian subcontinent.',
        connective:
          'Linked the interior to coastal ports, primarily designed to transport export crops to Britain and rapidly deploy imperial troops to suppress unrest.',
        question:
          'What modern infrastructure did British colonial administration construct across India?',
      },
      {
        step: 3,
        date: '1876–1900',
        title: 'Late-Victorian Famines & Free-Market Dogma',
        actor: 'Viceroy Lord Lytton & British Famine Commission',
        tag: '⚠️ FAMINE DISASTER',
        trigger:
          'Severe monsoons triggered massive famines, yet British authorities strictly enforced laissez-faire market doctrine, exporting millions of tons of wheat while peasants starved.',
        connective:
          'Resulted in the preventable deaths of over 10 million Indians and proved the callous brutality of rigid free-trade policies during humanitarian crises.',
        question: 'Why did catastrophic famines strike India while grain was exported to Britain?',
      },
      {
        step: 4,
        date: '1901',
        title: 'Naoroji’s "Drain of Wealth" & Economic Critique',
        actor: 'Dadabhai Naoroji (Westminster MP)',
        tag: '💰 DRAIN OF WEALTH',
        trigger:
          'Dadabhai Naoroji, the first Indian MP elected to the British Parliament, published "Poverty and Un-British Rule in India", calculating the vast annual drain of wealth to London.',
        connective:
          'Demolished the claim that British rule was financially benevolent, proving that India paid for its own conquest while its wealth was systematically siphoned off.',
        question: 'How did Dadabhai Naoroji calculate the systematic "Drain of Wealth" from India?',
      },
      {
        step: 5,
        date: 'Historiography',
        title: 'The Imperial Balance Sheet & Modern Verdict',
        actor: 'Modern Historians (Ferguson vs. Tharoor)',
        tag: '⚖️ HISTORICAL VERDICT',
        trigger:
          'Modern historians remain sharply divided between "Optimists" who highlight parliamentary law and infrastructure, and "Pessimists" who emphasize plunder, racism, and famine.',
        connective:
          'Challenges students to reach a nuanced historical evaluation: whether the British Empire was an engine of global modernization or a destructive force of imperial exploitation.',
        question: 'How do "Optimist" and "Pessimist" historians evaluate the British Empire today?',
      },
    ],
  },
};

let content = fs.readFileSync(dataPath, 'utf8');

for (const [lessonId, spineData] of Object.entries(spinesByLessonId)) {
  // Target each lesson's timeline_anchor: [ to inject causal_domino_spine right above it
  const lessonRegex = new RegExp(`(id:\\s*['"]${lessonId}['"][\\s\\S]*?)(timeline_anchor:\\s*\\[)`);
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
console.log('🎉 Successfully processed milestone spines for units/second_british_empire/data.js');
