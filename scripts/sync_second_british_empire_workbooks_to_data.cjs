const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const dataFilePath = path.join(ROOT_DIR, 'units', 'second_british_empire', 'data.js');

// Load original data
const rawDataContent = fs.readFileSync(dataFilePath, 'utf8');
const cleanJsonMatch = rawDataContent.match(/export\s+const\s+unitData\s*=\s*(\{[\s\S]*\});\s*export\s+default\s+unitData;/);
if (!cleanJsonMatch) {
  throw new Error('Could not parse units/second_british_empire/data.js JSON structure');
}
const unitData = JSON.parse(cleanJsonMatch[1]);

const sbeExamPractice = [
  // Lesson 1: Engines of Empire (12m Explain Why)
  {
    title: 'Key Stage 3 Disciplinary Writing: Maritime Supremacy & Industrial Dockyards',
    tariff: '12 marks (Explain Why Causal Analysis)',
    questions: [
      {
        tariff: '12 marks',
        type: 'explain_why_12m',
        question: 'Explain why maritime naval supremacy and industrial dockyards were vital for sustaining the British Empire in the 19th century. [12 marks]',
        stimulus: [
          'The industrial manufacturing capacity of Portsmouth Royal Dockyard',
          'The technological breakthrough of HMS Warrior (1860) and the Two-Power Standard'
        ],
        prompt: 'Explain three distinct causal reasons showing how naval power, industrial shipyards, and technological dominance protected global trade routes and established the Pax Britannica. Structure your answer using PEEL paragraphs.',
        model: 'One major reason maritime naval supremacy was vital was the absolute necessity of safeguarding global merchant trade routes. Under the economic doctrine of mercantilism, the British Empire depended upon raw materials imported from colonies and manufactured goods exported worldwide. The Royal Navy enforced the "Pax Britannica", securing choke points such as Gibraltar, Malta, and Singapore against piracy and rival European fleets. Without uncontested command of the seas, British merchant shipping would have been vulnerable to interdiction, collapsing the domestic economy.<br><br>Furthermore, a second crucial reason was the unmatched manufacturing and engineering capacity of royal dockyards like Portsmouth. Portsmouth was transformed into the world’s largest industrial complex, pioneering all-metal dry docks and steam-powered block mills designed by Marc Brunel. This colossal infrastructure enabled the British Admiralty to build, repair, and maintain global fleets faster than any rival power. When steam and iron replaced sail and wood, Portsmouth constructed revolutionary warships like HMS Warrior in 1860, ensuring that Britain retained immediate technological deterrence.<br><br>Finally, naval supremacy was vital for enforcing diplomatic dominance through the "Two-Power Standard" established in 1889. By legally mandating that the Royal Navy must equal or exceed the combined strength of the world’s next two largest navies, Britain deterred potential coalitions between France and Russia. Consequently, this decisive naval superiority ensured imperial security without maintaining a massive continental standing army, allowing industrial capital to be invested in domestic economic growth.',
        scaffolding: {
          acronym: '3-Paragraph Causal Analysis (PEEL)',
          acronym_title: '12-Mark Explain Why Standard',
          steps: [
            { letter: 'REASON 1', name: 'Global Trade Security (Pax Britannica)', prompt: 'Explain how naval command protected trade routes, raw materials, and strategic choke points.', starter: 'One main reason maritime naval supremacy was vital was...' },
            { letter: 'REASON 2', name: 'Industrial Shipyards (Portsmouth & Warrior)', prompt: 'Explain how Portsmouth Dockyard and HMS Warrior created unmatched industrial capability.', starter: 'Furthermore, a second crucial reason was...' },
            { letter: 'REASON 3', name: 'Two-Power Standard & Deterrence', prompt: 'Explain how the 1889 Naval Defence Act deterred rival coalitions and secured hegemony.', starter: 'Finally, an underlying reason was...' }
          ],
          sentence_starters: [
            'One main reason was that...',
            'For example, in the case of...',
            'This was important because...',
            'Another key factor was...',
            'In particular, this meant that...',
            'Overall, the most decisive reason was... because...'
          ],
          connectives_bank: ['Portsmouth Dockyard', 'HMS Warrior', 'Two-Power Standard', 'mercantilism', 'ironclad', 'Royal Navy', 'Pax Britannica', 'naval supremacy']
        }
      }
    ]
  },

  // Lesson 2: De-industrialisation of India (12m Explain Why)
  {
    title: 'Key Stage 3 Disciplinary Writing: The De-industrialisation of India',
    tariff: '12 marks (Explain Why Causal Analysis)',
    questions: [
      {
        tariff: '12 marks',
        type: 'explain_why_12m',
        question: 'Explain why the Indian textile industry experienced rapid de-industrialisation between 1757 and 1850. [12 marks]',
        stimulus: [
          'The invention of steam-powered cotton spinning and weaving in Lancashire',
          'The unequal tariff regime imposed by the British Parliament'
        ],
        prompt: 'Explain three distinct causal factors that dismantled traditional Indian handloom weaving, including British industrial mass production, discriminatory trade tariffs, and the East India Company monopoly.',
        model: 'One primary reason for the de-industrialisation of India was the technological revolution in British textile manufacturing. During the Industrial Revolution, inventors in Lancashire developed steam-powered machinery such as Arkwright’s water frame and Crompton’s spinning mule. British mechanized factories could produce vast quantities of cotton cloth far faster and cheaper than traditional Indian handloom weavers. Consequently, British manufacturers flooded Indian markets with cheap, mass-produced Manchester cotton, severely undercutting local artisan production.<br><br>Furthermore, a second decisive factor was the highly unequal and protectionist tariff regime imposed by the British Parliament. To protect domestic manufacturers, Britain levied heavy import duties of up to 70–80% on fine Indian muslins and calicos entering Britain. Conversely, British manufactured textiles were forced into India virtually duty-free (at nominal tariffs of 2–3%). This deliberate asymmetry made Indian exports uncompetitive in Europe while dismantling domestic protections, devastating historic weaving hubs like Dhaka and Murshidabad.<br><br>Finally, the monopolistic commercial practices of the British East India Company dismantled local artisanal independence. Following the 1765 Treaty of Allahabad, Company officials dictated procurement prices, forced master weavers into debt bondage, and restricted traditional internal trade networks. India was systematically converted from the world’s leading exporter of finished textiles into an exporter of agricultural raw materials—such as raw cotton and indigo—to feed British factories. Consequently, millions of skilled weavers were forced to abandon their looms and retreat into subsistence agriculture.',
        scaffolding: {
          acronym: '3-Paragraph Causal Analysis (PEEL)',
          acronym_title: '12-Mark Explain Why Standard',
          steps: [
            { letter: 'REASON 1', name: 'Lancashire Mechanisation & Mass Production', prompt: 'Explain how steam spinning and factory weaving produced cheaper cloth than handlooms.', starter: 'One primary reason for the de-industrialisation of India was...' },
            { letter: 'REASON 2', name: 'Discriminatory Tariff Regimes', prompt: 'Explain the 70–80% duties on Indian cloth in Britain vs duty-free British cloth in India.', starter: 'Furthermore, a second decisive factor was...' },
            { letter: 'REASON 3', name: 'Company Monopoly & Raw Material Conversion', prompt: 'Explain Company price-fixing, debt bondage, and conversion of India into a raw cotton exporter.', starter: 'Finally, monopolistic commercial practices ensured that...' }
          ],
          sentence_starters: [
            'One primary reason was that...',
            'For example, the introduction of...',
            'This led directly to de-industrialisation because...',
            'A second critical factor was...',
            'Consequently, this meant that...',
            'Ultimately, this resulted in...'
          ],
          connectives_bank: ['Handloom weavers', 'Dhaka muslin', 'East India Company', 'Lancashire mills', 'tariffs', 'de-industrialisation', 'raw cotton exports', 'monopoly']
        }
      }
    ]
  },

  // Lesson 3: 1857 Indian Rebellion (12m Explain Why)
  {
    title: 'Key Stage 3 Disciplinary Writing: The 1857 Indian Rebellion & The Raj',
    tariff: '12 marks (Explain Why Causal Analysis)',
    questions: [
      {
        tariff: '12 marks',
        type: 'explain_why_12m',
        question: 'Explain why the 1857 Indian Rebellion broke out and spread rapidly across northern India. [12 marks]',
        stimulus: [
          'Lord Dalhousie’s Doctrine of Lapse and the annexation of Awadh',
          'The introduction of the greased Enfield rifle cartridge in 1857'
        ],
        prompt: 'Explain three distinct causal factors that ignited the rebellion: the immediate spark of the greased Enfield cartridges, long-term political grievances over the Doctrine of Lapse, and widespread fears of forced religious conversion and economic exploitation.',
        model: 'One immediate reason for the outbreak of the 1857 Rebellion was the acute religious offence caused by the introduction of the new Enfield rifle. The paper cartridges for the Enfield had to be bitten open to release gunpowder. Widespread intelligence spread among sepoy regiments that the grease used on the cartridges was derived from tallow (beef fat) and lard (pork fat), defiling both Hindu soldiers (for whom cows are sacred) and Muslim soldiers (for whom pigs are forbidden). When soldiers at Meerut were sentenced to ten years’ hard labour for refusing to handle the cartridges, their comrades mutinied on 10 May 1857, viewing the regulation as a deliberate British conspiracy to forcibly convert them to Christianity.<br><br>Furthermore, a deeper political catalyst was Governor-General Lord Dalhousie’s aggressive policy of territorial annexation, especially through the "Doctrine of Lapse". Under this law, the Company seized sovereign Indian princely states whenever a ruler died without a direct biological male heir, disallowing the traditional practice of adopted succession. This policy dispossessed royal houses like Jhansi—prompting Rani Lakshmibai to lead armed resistance. The resentment peaked with the 1856 annexation of Awadh (Oudh), the homeland of over 75,000 Company sepoys, which alienated both the regional aristocracy (talukdars) and the military rank-and-file.<br><br>Finally, the rapid spread of the uprising was fueled by widespread socio-economic discontent and heavy taxation. British revenue assessments placed crippling tax burdens on rural peasant cultivators, while Company courts replaced customary village law with punitive debt recovery systems that favoured moneylenders. Consequently, when mutinous sepoys marched on Delhi and proclaimed the aged Mughal Emperor Bahadur Shah Zafar as the legitimate sovereign of Hindustan, the military revolt rapidly transformed into a broad popular insurrection across northern and central India.',
        scaffolding: {
          acronym: '3-Paragraph Causal Analysis (PEEL)',
          acronym_title: '12-Mark Explain Why Standard',
          steps: [
            { letter: 'REASON 1', name: 'Enfield Cartridge Religious Spark', prompt: 'Explain the beef and pork grease, Meerut mutiny, and fears of forced Christian conversion.', starter: 'One immediate reason for the outbreak was...' },
            { letter: 'REASON 2', name: 'Doctrine of Lapse & Annexation of Awadh', prompt: 'Explain Dalhousie dispossessing adopted heirs (Jhansi) and annexing Awadh in 1856.', starter: 'Furthermore, a deeper political catalyst was...' },
            { letter: 'REASON 3', name: 'Economic Grievances & Delhi Proclamation', prompt: 'Explain land revenue burdens, sepoys rallying to Bahadur Shah Zafar in Delhi.', starter: 'Finally, the rapid spread across northern India occurred because...' }
          ],
          sentence_starters: [
            'One immediate catalyst was that...',
            'Specifically, this caused outrage because...',
            'A deeper underlying political cause was...',
            'In particular, this dispossessed...',
            'Consequently, this transformed into a popular rebellion because...'
          ],
          connectives_bank: ['Sepoy', 'Doctrine of Lapse', 'Awadh', 'Enfield rifle', 'Rani Lakshmibai', 'Bahadur Shah Zafar', 'Azamgarh Proclamation', 'British Raj', 'Queen Victoria']
        }
      }
    ]
  },

  // Lesson 4: The Scramble for Africa (12m Explain Why)
  {
    title: 'Key Stage 3 Disciplinary Writing: The Scramble for Africa & Imperial Ideology',
    tariff: '12 marks (Explain Why Causal Analysis)',
    questions: [
      {
        tariff: '12 marks',
        type: 'explain_why_12m',
        question: 'Explain why European powers were able to partition and conquer 90% of Africa between 1884 and 1914. [12 marks]',
        stimulus: [
          'The rules established at the 1884–85 Berlin West Africa Conference',
          'Technological breakthroughs including the Maxim machine gun and quinine'
        ],
        prompt: 'Explain three distinct causal factors that enabled the rapid European partition of Africa: diplomatic rules of effective occupation, decisive industrial and military technologies, and economic motives for raw materials and captive markets.',
        model: 'One major reason European powers partitioned Africa was the diplomatic framework established at the 1884–85 Berlin Conference. Convened by German Chancellor Otto von Bismarck, fourteen European nations met to avoid warring among themselves over African territory. The conference established the principle of "Effective Occupation", ruling that a power could only claim sovereign colonial control if it established physical administrative posts and garrisons on the ground. This triggered an urgent, competitive rush by Britain, France, and Germany to sign treaties with local rulers and hoist national flags, dividing the continent with arbitrary straight-line borders without African consultation.<br><br>Furthermore, a second decisive reason was the overwhelming technological asymmetry created by the Industrial Revolution. In military technology, the invention of the Maxim machine gun in 1884 allowed small European expeditionary forces to slaughter large African armies armed with traditional spears or obsolete muskets, as seen at the Battle of Omdurman in 1898 where 11,000 Sudanese warriors were killed in hours. In medicine, the extraction of quinine from cinchona bark allowed Europeans to survive malaria, opening the previously fatal African interior to permanent exploration and conquest.<br><br>Finally, the partition was accelerated by intense economic pressures for raw materials and captive imperial markets. Following the Long Depression of 1873, European industrial economies faced domestic overproduction and falling profits. African territories offered vast, unexploited supplies of vital industrial resources—including rubber, copper, cotton, palm oil, and gold. Ideologically justified by racist notions of the "civilising mission" and Rudyard Kipling’s "White Man’s Burden", European governments granted royal charters to private trading companies to exploit African labor and resources, ensuring rapid territorial subjugation.',
        scaffolding: {
          acronym: '3-Paragraph Causal Analysis (PEEL)',
          acronym_title: '12-Mark Explain Why Standard',
          steps: [
            { letter: 'REASON 1', name: 'Berlin Conference & Effective Occupation', prompt: 'Explain Bismarck, 14 nations, avoiding European conflict, and the scramble to claim land.', starter: 'One major diplomatic reason was that...' },
            { letter: 'REASON 2', name: 'Technological & Military Superiority', prompt: 'Explain the Maxim machine gun (Omdurman), quinine against malaria, and steam riverboats.', starter: 'Furthermore, a second decisive reason was...' },
            { letter: 'REASON 3', name: 'Economic Motives & Civilising Ideology', prompt: 'Explain rubber, palm oil, copper, captive markets, and the "civilising mission" justification.', starter: 'Finally, the partition was driven by intense economic demands for...' }
          ],
          sentence_starters: [
            'One major reason was that...',
            'For example, the 1884 Berlin Conference established...',
            'This led directly to the partition because...',
            'A second critical factor was technological superiority, such as...',
            'Consequently, European forces were able to...',
            'Ultimately, this resulted in...'
          ],
          connectives_bank: ['Scramble for Africa', 'Berlin Conference', 'Effective Occupation', 'Maxim gun', 'quinine', 'Battle of Omdurman', 'Rudyard Kipling', 'E. D. Morel', 'resource extraction']
        }
      }
    ]
  },

  // Lesson 5: The Imperial Verdict (12m Explain Why)
  {
    title: 'Key Stage 3 Disciplinary Writing: Historiographical Debate on the British Empire',
    tariff: '12 marks (Explain Why Causal Analysis)',
    questions: [
      {
        tariff: '12 marks',
        type: 'explain_why_12m',
        question: 'Explain why the overall impact of the British Empire remains a subject of intense historical debate today. [12 marks]',
        stimulus: [
          'The construction of modern global infrastructure including railways, telegraphs, and ports',
          'Dadabhai Naoroji’s Drain of Wealth theory and recurring late Victorian colonial famines'
        ],
        prompt: 'Explain three distinct reasons why historians disagree fundamentally over the legacy of the British Empire: the argument for modern infrastructure and legal systems, the counter-argument for economic plunder and famine mortality, and conflicting modern political and national identities.',
        model: 'One primary reason the impact of the British Empire remains fiercely contested is the existence of two fundamentally conflicting historical interpretations: the "Imperial Optimist" view and the "Critical/Anti-Colonial" view. Imperial apologists highlight the construction of monumental global infrastructure, arguing that British rule brought modern railways, telegraph lines, deep-water ports, and English common law to colonized nations. They contend that events like the 1851 Great Exhibition at the Crystal Palace showcased Britain as a benevolent "workshop of the world" that integrated diverse regions into the modern global economy.<br><br>Conversely, a second decisive reason for enduring debate is the extensive empirical evidence of economic extraction and humanitarian catastrophe. Early nationalist thinkers like Dadabhai Naoroji formulated the "Drain of Wealth" theory, demonstrating through statistical analysis that Britain extracted millions of pounds annually from India in tax revenue and raw materials without equivalent domestic investment. Furthermore, critics point to catastrophic late Victorian famines—such as the Great Famine of 1876–1878 in India, where millions perished while British authorities continued exporting grain under strict free-market laissez-faire dogma. Consequently, anti-colonial historians argue that imperial rule was inherently coercive, extractive, and racially stratified.<br><br>Finally, the debate remains acute because modern national identities, restitution claims, and school curricula are directly shaped by imperial memory. For multicultural Britain, confronting imperial history raises profound questions about slavery, colonial plunder (such as the Benin Bronzes and the Koh-i-Noor diamond), and systemic racism. In formerly colonized nations, the lasting legacies of arbitrary borders, ethnic conflict, and economic underdevelopment continue to influence contemporary politics. Because the historical evidence supports both infrastructural modernisation and devastating human exploitation, the British Empire remains an unresolved ethical and historiographical battleground.',
        scaffolding: {
          acronym: '3-Paragraph Causal Analysis (PEEL)',
          acronym_title: '12-Mark Explain Why Standard',
          steps: [
            { letter: 'REASON 1', name: 'Optimist Argument (Infrastructure & Law)', prompt: 'Explain railways, telegraph networks, ports, common law, and global integration.', starter: 'One primary reason for intense historical debate is...' },
            { letter: 'REASON 2', name: 'Pessimist Counter-Evidence (Drain & Famines)', prompt: 'Explain Dadabhai Naoroji, Drain of Wealth, laissez-faire famines, and human costs.', starter: 'Conversely, a second decisive reason for debate is...' },
            { letter: 'REASON 3', name: 'Modern Politics, Restitution & Memory', prompt: 'Explain post-colonial legacies, arbitrary borders, looted treasures, and national identity.', starter: 'Finally, the debate remains unresolved today because...' }
          ],
          sentence_starters: [
            'One primary reason for intense debate is...',
            'On the one hand, historians point to...',
            'Conversely, other historians emphasize...',
            'In particular, evidence such as...',
            'Consequently, this means that the impact was...',
            'Ultimately, this explains why the debate continues because...'
          ],
          connectives_bank: ['Drain of Wealth', 'Dadabhai Naoroji', 'Crystal Palace', 'Great Exhibition', 'famine', 'infrastructure', 'railways', 'Optimist vs Pessimist', 'historiography']
        }
      }
    ]
  }
];

// Inject into unitData.lessons
unitData.lessons.forEach((lesson, idx) => {
  if (sbeExamPractice[idx]) {
    lesson.exam_practice = sbeExamPractice[idx];
  }
});

// Serialize back to units/second_british_empire/data.js
const serialized = `export const unitData = ${JSON.stringify(unitData, null, 2)};\nexport default unitData;\n`;
fs.writeFileSync(dataFilePath, serialized, 'utf8');
console.log('✅ Successfully synchronized all 5 lessons of Second British Empire with workbook examination practice!');
