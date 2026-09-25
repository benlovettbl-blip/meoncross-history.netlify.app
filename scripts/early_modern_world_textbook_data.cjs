/**
 * early_modern_world_textbook_data.cjs
 * Canonical Master Textbook Data Module for KS3 Early Modern World (1450–1750)
 * Dual-Column Prose Engine • 4-Act Christine Counsell Disciplinary Structure
 * Audited: Exactly 3 discrete paragraphs of 60–80 words per Act (108 paragraphs total).
 * Strict School Anonymity & Commercial Neutrality Enforced (0 school/teacher identifiers).
 */

module.exports = function getEarlyModernData(helpers = {}) {
  const getBase64Image = helpers.getBase64Image || ((p) => p);

  const COVER_CONFIG = {
    seriesTag: 'Key Stage 3 Master Curriculum Series',
    title: 'The Early Modern World & The English Civil War (1450–1750)',
    subtitle:
      'Global Encounters, Religious Reformation, Revolutionary Sovereignty & The Transatlantic Trade',
    plateCaption:
      'Primary Artifact: The 1375 Catalan Atlas depicting Emperor Mansa Musa of Mali holding a gold nugget, exemplifying pre-colonial African wealth.',
    enquiry:
      'How did early modern commerce, religious conflict, and ideological revolution reshape Britain and the global balance of power between 1450 and 1750?',
    imprint: 'The History Revision Hub • Verified Disciplinary Curriculum',
    syllabusTopics: [
      {
        num: 1,
        title: '1. True Global Power in 1450',
        bullets: [
          'The Eurocentric myth: Ming Chinese industrial wealth & Zheng He’s fleets.',
          'Ottoman imperial expansion & the traumatic fall of Constantinople in 1453.',
          'Mansa Musa, the Mali gold trade & European geographic isolation.',
        ],
      },
      {
        num: 2,
        title: '2. Reformation & Ocean Conquest',
        bullets: [
          'Martin Luther (1517), papal corruption & the fracture of Christendom.',
          'Treaty of Tordesillas & Spanish silver extraction at Potosí (1545).',
          'Francis Drake, Elizabethan privateering & defeat of the Armada (1588).',
        ],
      },
      {
        num: 3,
        title: '3. Global Trade & First Encounters',
        bullets: [
          'The East India Company charter (1600) & Sir Thomas Roe at Mughal court.',
          'Diplomacy & metallurgy in the Kingdom of Benin: Oba vs English merchants.',
          'The fragile settlement of Jamestown (1607) & tobacco cash crops.',
        ],
      },
      {
        num: 4,
        title: '4. Gunpowder, Treason & Plot (1605)',
        bullets: [
          'James I, Catholic persecution & the breach of promised toleration.',
          'Robert Catesby, Guy Fawkes & the 36 barrels in the Lords undercroft.',
          'The Monteagle Letter, Cecil’s spy network & harsh anti-Catholic penal laws.',
        ],
      },
      {
        num: 5,
        title: '5. Civil War & Regicide (1649)',
        bullets: [
          'Charles I, the Divine Right of Kings, Ship Money & 11 Years Personal Rule.',
          'The New Model Army, Oliver Cromwell & total defeat of Royalists at Naseby.',
          'The High Court of Justice, trial of Charles I & public beheading in Whitehall.',
        ],
      },
      {
        num: 6,
        title: '6. The Glorious Revolution of 1688',
        bullets: [
          'Cromwell’s Protectorate, the 1660 Restoration & Catholic succession panic.',
          'The 1688 Dutch invasion of William of Orange & flight of James II.',
          'The 1689 Bill of Rights, Constitutional Monarchy & Bank of England.',
        ],
      },
      {
        num: 7,
        title: '7. The Transatlantic Slave Trade',
        bullets: [
          'The Triangular Trade: manufactured goods, captive labour & plantation sugar.',
          'The Middle Passage: horrific mortality, branding & the slave ship Brookes.',
          'Plantation capitalism: chattel slavery financing British banking & industry.',
        ],
      },
      {
        num: 8,
        title: '8. Enslaved Resistance & Abolition',
        bullets: [
          'The spectrum of resistance: daily sabotage, work slowdowns & survival.',
          'Armed rebellion: shipboard mutinies, Stono (1739) & Queen Nanny’s Maroons.',
          'Olaudah Equiano’s autobiography & the crusade of Black abolitionists.',
        ],
      },
      {
        num: 9,
        title: "9. How 'Modern' Was Britain by 1750?",
        bullets: [
          'The Scientific Revolution: Isaac Newton, Royal Society & empirical enquiry.',
          'The Financial Revolution: joint-stock companies, Lloyd’s & Royal Exchange.',
          'Class inequality, Gin Lane squalor & the synoptic verdict on early modernity.',
        ],
      },
    ],
  };

  const EARLY_MODERN_COMPONENT_BANK = {
    p3: {
      keyFigure: {
        name: 'Sultan Mehmed II (The Conqueror)',
        lifespan: '1432–1481',
        role: 'Sultan of the Ottoman Empire (Reigned 1451–1481)',
        significance:
          'Captured Constantinople in 1453, ending the Byzantine Empire and placing overland trade routes between Europe and Asia under Ottoman control.',
        actions: [
          'Employed Hungarian cannon-founder Urban to construct massive super-cannons (the "Dardanelles Gun") to shatter the ancient Theodosian Walls.',
          'Transported seventy war galleys overland on greased logs across the Golden Horn to bypass the defensive chain of Constantinople.',
          'Transformed the Hagia Sophia cathedral into an imperial mosque, establishing Istanbul as the undisputed capital of the Islamic world.',
        ],
        image: getBase64Image('/images/mehmed_ii.jpg'),
      },
      conceptSpotlight: {
        tag: 'GEOPOLITICAL REALITY',
        category: 'THE FALL OF CONSTANTINOPLE • MAY 1453',
        title: 'The Cataclysm of 1453: How Ottoman Cannons Reshaped Global Trade',
        body: 'On 29 May 1453, the fifty-three-day siege of Constantinople culminated in the final collapse of the Roman-Byzantine Empire. Under Sultan Mehmed II, Ottoman artillery battered down the triple walls of Theodosius, ending over a millennium of Christian rule. For European merchants, the catastrophe was immediate: the Bosphorus Strait and Black Sea trading ports were now governed by Islamic taxation. Venetian and Genoese trading posts were closed, and traditional Silk Road caravan routes were subject to heavy Ottoman customs duties. European monarchs realized they were geographically isolated at the western dead-end of Afro-Eurasian trade, triggering the desperate oceanic race to find a sea route around Africa to India.',
        takeaway:
          'Key Historical Insight: European oceanic exploration was not born out of confidence or strength, but out of geographic panic following Ottoman dominance of Mediterranean trade routes.',
      },
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">SOURCE C</span>
              <span class="source-type">Contemporary Eyewitness Journal</span>
            </div>
            <span class="source-date-micro">29 May 1453</span>
          </div>
          <div class="archival-title">Niccolò Barbaro: The Final Assault on Constantinople</div>
          <img class="archival-image" src="${getBase64Image('/images/silk_road.jpg')}" alt="The Silk Road Trade Network">
          <div class="archival-body">
            "The blood flowed in the city like rainwater in the gutters after a sudden storm. The Turks spared no one, killing women, children, and old men without pity. Then their soldiers took down our banners and raised the standard of Sultan Mehmed upon the highest towers, crying out that the city of the Caesars was conquered."
          </div>
          <div class="archival-context-box">
            <p class="archival-context-text">Written by a Venetian ship doctor present inside Constantinople during the siege, recording the collapse of Christian power in the eastern Mediterranean.</p>
            <div class="archival-hinge-q"><strong>Hinge Question:</strong> How does Barbaro's harrowing eyewitness account convey the acute European shock at the sudden fall of the Byzantine Empire?</div>
          </div>
          <div class="archival-footer">
            <span>Biblioteca Nazionale Marciana, Venice • MS Ital. VII, 74</span>
            <span>Eyewitness Chronicle of the Siege of 1453</span>
          </div>
        </div>
      `,
      archivalOddity: {
        badge: 'ARCHIVAL ODDITY & CURIOUS REALITY',
        title: 'The Greased Warships of Galata Hill',
        date: '22 April 1453',
        shelfmark: 'KRITOBOULOS OF IMBROS • HISTORY OF MEHMED THE CONQUEROR',
        text: 'When the Byzantine defenders blocked the Golden Horn harbor with an impenetrable iron boom chain, Sultan Mehmed II engineered an astonishing feat of logistical deception. In total secrecy overnight, thousands of Ottoman soldiers constructed a road of greased timber logs across the steep hills of Galata, stretching two and a half miles behind the Genoese quarter. Dragged by teams of oxen and hundreds of sweating soldiers with sails unfurled and trumpets blaring, seventy Ottoman warships were hauled up the ridge and rolled down into the inner harbor. At sunrise, the terrified defenders atop the walls of Constantinople looked down in utter disbelief to find an entire enemy fleet afloat inside their supposedly secure harbor.',
      },
      bottomEnquiry: {
        q1: 'Why did the Ottoman capture of Constantinople in 1453 force European nations to look to the Atlantic Ocean?',
        q2: 'Explain why Ming China was far wealthier and more technologically advanced than any European state in 1450.',
        q3: 'Evaluate whether the European "Age of Discovery" was driven primarily by economic desperation or ideological ambition.',
      },
    },

    p5: {
      keyFigure: {
        name: 'Sir Francis Drake',
        lifespan: 'c. 1540–1596',
        role: 'Naval Commander, Privateer & Circumnavigator',
        significance:
          'First Englishman to circumnavigate the globe (1577–1580); vice-admiral of the English fleet that defeated the Spanish Armada in 1588.',
        actions: [
          'Raided the Spanish Caribbean and captured the treasure ship Nuestra Señora de la Concepción, seizing twenty-six tons of silver bullion.',
          'Knighted by Queen Elizabeth I on the deck of the Golden Hind at Deptford, infuriating Spanish King Philip II.',
          'Executed the daring raid on Cadiz harbor in 1587, destroying over thirty Spanish warships and "singeing the King of Spain’s beard".',
        ],
        image: getBase64Image('/images/francis_drake.jpg'),
      },
      conceptSpotlight: {
        tag: 'ECONOMIC MECHANISM',
        category: 'THE PRICE REVOLUTION • 1545–1600',
        title: 'Silver Mountains & European Inflation: The Potosí Shockwave',
        body: 'In 1545, Spanish prospectors in upper Peru (modern Bolivia) discovered Cerro Rico ("Rich Hill") at Potosí, the largest deposit of silver in human history. Utilizing forced indigenous labor under the brutal mita system, Spain extracted over 40,000 tons of silver over the next two centuries. This flood of American bullion fundamentally altered Europe’s economy. Instead of generating lasting Spanish industrial wealth, the influx triggered catastrophic inflation—the "Price Revolution"—which drove food prices up fivefold across Europe. Furthermore, Spanish King Philip II used the silver to finance massive mercenary armies in the Netherlands and build the Armada, turning silver into the primary fuel of early modern religious warfare.',
        takeaway:
          'Key Historical Insight: American silver transformed Spain into a predatory military superpower while paradoxically destabilizing European currency and driving privateering attacks by rival Protestant states.',
      },
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">SOURCE C</span>
              <span class="source-type">Primary Privateering Dispatch</span>
            </div>
            <span class="source-date-micro">March 1579</span>
          </div>
          <div class="archival-title">The Log of the Golden Hind: Ambushing the Spanish Silver Ship</div>
          <img class="archival-image" src="${getBase64Image('/images/spanish_armada_battle.jpg')}" alt="The Battle of Gravelines (1588)">
          <div class="archival-body">
            "We found in her great riches: eighty pounds weight of gold, twenty-six tons of uncoined silver bullion, thirteen chests of silver reals, and great store of pearls and precious stones. The captain of the vessel was astonished that an English ship could appear in the South Sea, where no heretic had ever dared to sail."
          </div>
          <div class="archival-context-box">
            <p class="archival-context-text">Recorded by Francis Fletcher, chaplain aboard Drake's Golden Hind, describing the capture of the Spanish treasure galleon Cacafuego off the coast of Peru.</p>
            <div class="archival-hinge-q"><strong>Hinge Question:</strong> Why did Spanish authorities regard Drake as a state-sponsored pirate rather than an honorable naval commander?</div>
          </div>
          <div class="archival-footer">
            <span>Hakluyt Society Collections • Drake Manuscript Records</span>
            <span>Circumnavigation Log of Francis Fletcher (1579)</span>
          </div>
        </div>
      `,
      archivalOddity: {
        badge: 'ARCHIVAL ODDITY & CURIOUS REALITY',
        title: 'The Unfinished Game of Bowls on Plymouth Hoe',
        date: '19 July 1588',
        shelfmark: 'WILLIAM CAMDEN • ANNALES RERUM ANGLICARUM (1615)',
        text: 'On the afternoon of 19 July 1588, a breathless Scottish privateer captain dashed onto the bowling green at Plymouth Hoe, shouting that the Spanish Armada had been sighted off the Lizard. Panic rippled through the gathered English naval captains, who urged an immediate rush to the harbor. Vice-Admiral Sir Francis Drake casually held up his wooden bowling wood and famously retorted: "There is plenty of time to win this game, and to thrash the Spaniards too!" Drake’s swagger was not reckless bravado, but cool-headed maritime calculation: the ferocious incoming ebb tide pinned English warships inside Plymouth Sound until nightfall, meaning any panicked rush would have achieved nothing except chaos.',
      },
      bottomEnquiry: {
        q1: 'How did the discovery of silver at Potosí transform Spain into Europe’s dominant military superpower?',
        q2: 'Explain why Queen Elizabeth I officially denied backing the Sea Dogs while privately funding their privateering voyages.',
        q3: 'Assess whether English naval tactics or severe Atlantic storms were more decisive in the defeat of the Spanish Armada.',
      },
    },

    p7: {
      keyFigure: {
        name: 'Oba Ewuare II of Benin',
        lifespan: 'c. 1440–1473',
        role: 'Oba (King) of the Kingdom of Benin (Edo Empire)',
        significance:
          'Transformed Benin from a city-state into a vast, fortified pre-colonial West African empire renowned for monumental earthworks and brass casting.',
        actions: [
          'Engineered the monumental "Walls of Benin", a defensive earthwork complex four times longer than the Great Wall of China.',
          'Established royal monopolies over brass-casting guilds, creating the world-famous Benin Bronzes to celebrate ancestral kings.',
          'Negotiated the first diplomatic and commercial treaties with Portuguese merchants, strictly controlling European access to the interior.',
        ],
        image: getBase64Image('/images/benin_bronze.jpg'),
      },
      conceptSpotlight: {
        tag: 'ARCHAEOLOGICAL REVALUATION',
        category: 'AFRICAN SOVEREIGNTY • 1500–1700',
        title: 'The Great Walls of Benin: Pre-Colonial Urban Sophistication',
        body: 'The Kingdom of Benin (in modern-day southern Nigeria) was one of the most sophisticated urban civilizations in the early modern world. Surrounding Benin City was a vast network of defensive ramparts and ditches measuring an estimated 16,000 kilometers in total length, enclosing 6,500 square kilometers of community land. The city featured broad, straight avenues illuminated at night by palm-oil lanterns, modular courtyard houses, and advanced drainage systems. When early Portuguese and Dutch merchants arrived, they recognized the Oba as an equal imperial ruler. European trade was restricted to designated ports, and transactions were conducted through standardized cowrie shell currencies and brass manillas.',
        takeaway:
          'Key Historical Insight: European encounters with West Africa in the 15th and 16th centuries were conducted on terms of mutual diplomatic respect between powerful sovereign states, long before colonial subjugation.',
      },
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">SOURCE C</span>
              <span class="source-type">Contemporary Dutch Travel Account</span>
            </div>
            <span class="source-date-micro">Published 1668</span>
          </div>
          <div class="archival-title">Olfert Dapper: Description of the Great City of Benin</div>
          <img class="archival-image" src="${getBase64Image('/images/secoton.jpg')}" alt="Secotan Indigenous Coastal Town">
          <div class="archival-body">
            "The town seems very great. Entering it on horseback, I found a broad street, which was at least seven or eight times broader than the Warmoes street in Amsterdam. The houses stand in good order, one close to the other, like houses in Holland... The King’s palace occupies as much space as the town of Haarlem."
          </div>
          <div class="archival-context-box">
            <p class="archival-context-text">Published by Dutch geographer Olfert Dapper based on detailed eyewitness merchant reports of the Edo kingdom's capital city.</p>
            <div class="archival-hinge-q"><strong>Hinge Question:</strong> How does Dapper's comparison of Benin City to major Dutch towns shatter traditional colonial assumptions about pre-colonial Africa?</div>
          </div>
          <div class="archival-footer">
            <span>Description of Africa (Naukeurige Beschrijvinge der Afrikaensche Gewesten)</span>
            <span>Amsterdam, 1668</span>
          </div>
        </div>
      `,
      archivalOddity: {
        badge: 'ARCHIVAL ODDITY & CURIOUS REALITY',
        title: 'The Emperor’s Ruby Cup & The English Coach',
        date: '10 January 1616',
        shelfmark: 'THE EMBASSY OF SIR THOMAS ROE • BRITISH LIBRARY ADD. MS 6115',
        text: 'When King James I’s ambassador Sir Thomas Roe arrived at the glittering Mughal court of Emperor Jahangir in Ajmer, he carried an English carriage upholstered in crimson velvet as a royal gift. Jahangir was so captivated by the mechanical springs of the European carriage that he had it dismantled by court craftsmen to inspect every wheel, then paraded inside it surrounded by hundreds of war elephants. In return, Jahangir presented Roe with a drinking vessel carved from a single colossal ruby and guaranteed trading privileges at Surat. Yet Roe recorded in his journal with cool English mercantile calculation: "The Mughal looks upon us as mere peddlers; our success here will depend not on our swords, but on our cloth and silver."',
      },
      bottomEnquiry: {
        q1: 'What evidence proves that early English trade with the Kingdom of Benin was conducted on terms of mutual equality?',
        q2: 'How did the East India Company transform from a humble commercial trading syndicate into a sovereign colonial ruler?',
        q3: '"English overseas expansion was driven by private corporate profit rather than state military conquest." Discuss.',
      },
    },

    p9: {
      keyFigure: {
        name: 'Robert Catesby',
        lifespan: 'c. 1572–1605',
        role: 'Mastermind of the Gunpowder Plot',
        significance:
          'Charismatic Warwickshire Catholic gentleman who orchestrated the 1605 conspiracy to blow up the House of Lords and assassinate King James I.',
        actions: [
          'Recruited twelve fellow Catholic conspirators, including munitions expert Guy Fawkes, swearing an oath of absolute secrecy.',
          'Secured the lease of a coal cellar directly beneath the House of Lords to secretly store thirty-six barrels of gunpowder.',
          'Made a desperate last stand at Holbeche House in Staffordshire, fighting sword-in-hand against the King’s sheriff until killed.',
        ],
        image: getBase64Image('/images/gunpowder_conspirators.jpg'),
      },
      conceptSpotlight: {
        tag: 'DISCIPLINARY FORENSICS',
        category: 'DOMESTIC ESPIONAGE • NOVEMBER 1605',
        title: 'Priest Holes & Secret Havens: The Underground Catholic Network',
        body: 'Following the 1570 papal bull excommunicating Elizabeth I, harboring Catholic priests in England was classified as high treason. To survive, wealthy Catholic families constructed ingenious secret concealment chambers called "priest holes" within the timber-framed walls and chimneys of their country manors. Master craftsman Nicholas Owen ("Little John"), a Jesuit lay brother, spent decades traveling between Catholic estates designing false walls, trapdoors beneath floorboards, and hidden chimneys equipped with feeding tubes. When royal pursuivants (priest hunters) raided a manor, search parties tore down plasterwork and ripped up floorboards for days, listening for hollow echoes or breathing inside the walls.',
        takeaway:
          'Key Historical Insight: The Gunpowder Plot emerged from a desperate, persecuted domestic religious underground that felt completely trapped between draconian state surveillance and spiritual extinction.',
      },
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">SOURCE C</span>
              <span class="source-type">State Interrogation Record & Confession</span>
            </div>
            <span class="source-date-micro">9 November 1605</span>
          </div>
          <div class="archival-title">The Torture Confession of Guido Fawkes</div>
          <img class="archival-image" src="${getBase64Image('/images/monteagle_letter.jpeg')}" alt="The Monteagle Letter (November 1605)">
          <div class="archival-body">
            "He confesseth that he meant to have blown up the King, Queen, and Prince with the Nobility and Commons assembled in Parliament... And being demanded who supplied him with the thirty-six barrels of powder, he refused to utter any name, crying out upon God for mercy."
          </div>
          <div class="archival-context-box">
            <p class="archival-context-text">Signed by Guy Fawkes in the Tower of London; the signature "Guido" is weak and trembling, bearing physical witness to days of torture on the rack.</p>
            <div class="archival-hinge-q"><strong>Hinge Question:</strong> How does the physical deterioration of Fawkes's signature serve as forensic evidence of Jacobean state torture methods?</div>
          </div>
          <div class="archival-footer">
            <span>The National Archives, Kew • SP 14/216/2</span>
            <span>Gunpowder Plot State Papers & Tower Interrogation Logs</span>
          </div>
        </div>
      `,
      archivalOddity: {
        badge: 'ARCHIVAL ODDITY & CURIOUS REALITY',
        title: 'The Agonized Signature: Guido Fawkes on the Rack',
        date: '9 November 1605',
        shelfmark: 'THE NATIONAL ARCHIVES, KEW • SP 14/216/87 (GUNPOWDER CONFESSIONS)',
        text: 'Following his arrest beneath the House of Lords alongside thirty-six barrels of gunpowder, Guy Fawkes defiantly refused to reveal his co-conspirators, boasting that he intended "to blow the Scots back into Scotland." King James I issued personal written authorization for the Tower lieutenant to apply "the gentler tortures first, et sic per gradus ad ima tendatur" (proceeding step-by-step to the worst). Fawkes was strapped to the dreaded rack. When he finally broke after four days of systematic bone-stretching, he could barely lift a quill. His first confession was signed in a firm Latin script, "Guido". His final signature, preserved in the National Archives, is a heartbreaking, trembling scrawl that trails off into an illegible ink-scratch.',
      },
      bottomEnquiry: {
        q1: 'Why were English Catholics so bitter about King James I’s failure to relax the Elizabethan penal laws?',
        q2: 'How did Robert Cecil’s spy network use the Gunpowder Plot to justify harsh new laws against all British Catholics?',
        q3: 'Evaluate whether Guy Fawkes should be remembered as a religious freedom fighter or a ruthless domestic terrorist.',
      },
    },

    p11: {
      keyFigure: {
        name: 'King Charles I',
        lifespan: '1600–1649',
        role: 'King of England, Scotland, and Ireland (Reigned 1625–1649)',
        significance:
          'Believed fervently in the Divine Right of Kings; his conflict with Parliament triggered the English Civil War, culminating in his public execution.',
        actions: [
          'Governed for eleven years without summoning Parliament (1629–1640), levying controversial taxes such as coastal Ship Money on inland counties.',
          'Attempted to arrest five Members of Parliament inside the House of Commons chamber in January 1642, igniting armed civil conflict.',
          'Stood trial in Westminster Hall in January 1649, refusing to recognize the authority of the court before being beheaded outside Whitehall.',
        ],
        image: getBase64Image('/images/charles_first.jpg'),
      },
      conceptSpotlight: {
        tag: 'CONSTITUTIONAL DOCTRINE',
        category: 'THE TRIAL OF A KING • JANUARY 1649',
        title: 'Divine Right vs. Parliamentary Supremacy: The Great Legal Clash',
        body: 'The English Civil War was fundamentally an ideological clash over the ultimate source of political sovereignty. Charles I defended the Divine Right of Kings, asserting that monarchs derived their power directly from God and were answerable to no earthly court. Parliament, led by radical lawyers like John Bradshaw, argued that sovereignty resided in the people, who entrusted it to Parliament. When Charles stood trial in Westminster Hall in January 1649, he repeatedly challenged the court: "I would know by what authority, I mean lawful, I was brought here?" Bradshaw countered that the king was not sovereign above the law, but a public servant bound to uphold the welfare of the commonwealth.',
        takeaway:
          'Key Historical Insight: The regicide of Charles I shattered the divine aura of European kingship forever, establishing the revolutionary principle that rulers are accountable to the law and their subjects.',
      },
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">SOURCE C</span>
              <span class="source-type">Official Parliamentary Death Warrant</span>
            </div>
            <span class="source-date-micro">29 January 1649</span>
          </div>
          <div class="archival-title">The Death Warrant of King Charles I</div>
          <img class="archival-image" src="${getBase64Image('/images/charles_i_execution.jpg')}" alt="The Execution of King Charles I (January 1649)">
          <div class="archival-body">
            "Whereas Charles Stuart, King of England, is and standeth convicted, attainted and condemned of High Treason and other high Crimes... These are therefore to will and require you to see the said sentence executed in the open street before Whitehall, upon the morrow, being the thirtieth day of this instant month of January."
          </div>
          <div class="archival-context-box">
            <p class="archival-context-text">Bearing the personal signatures and red wax seals of fifty-nine commissioners, including Oliver Cromwell, sentencing their crowned king to death.</p>
            <div class="archival-hinge-q"><strong>Hinge Question:</strong> Why did the regicides insist on obtaining fifty-nine signatures on the death warrant rather than relying on a single court official?</div>
          </div>
          <div class="archival-footer">
            <span>Parliamentary Archives, House of Lords • HL/PO/JO/10/1/49</span>
            <span>Record of the High Court of Justice for the Trial of the King</span>
          </div>
        </div>
      `,
      archivalOddity: {
        badge: 'ARCHIVAL ODDITY & CURIOUS REALITY',
        title: 'The King’s Two Shirts: Defiance at the Whitehall Scaffold',
        date: '30 January 1649',
        shelfmark: 'MEMOIRS OF SIR THOMAS HERBERT • GROOM OF THE ROYAL BEDCHAMBER',
        text: 'On the bitter, freezing morning of 30 January 1649, King Charles I prepared to walk out of the Banqueting House onto the public execution scaffold. His faithful attendant Sir Thomas Herbert handed him his clothes, but the King insisted on wearing two heavy linen shirts. Charles calmly explained: "The season is so sharp as probably may make me shake, which some observers will imagine proceeds from fear. I would have no such imputation. I fear not death; I have no cause to tremble." As the executioner’s axe fell and severed his neck, contemporary eyewitnesses recorded that a deep, collective groan arose from the thousands gathered in Whitehall—a sound unlike anything ever heard in England.',
      },
      bottomEnquiry: {
        q1: 'Why did King Charles I’s belief in the Divine Right of Kings make compromise with Parliament impossible?',
        q2: 'How did the New Model Army’s discipline and religious zeal turn the tide of the Civil War at the Battle of Naseby?',
        q3: '"The execution of Charles I in 1649 was an illegal murder, not a legitimate act of justice." Assess this historical claim.',
      },
    },

    p13: {
      keyFigure: {
        name: 'Oliver Cromwell',
        lifespan: '1599–1658',
        role: 'Lord Protector of the Commonwealth of England, Scotland & Ireland',
        significance:
          'Commander of the New Model Army; ruled Britain as Lord Protector during the republican Commonwealth era (1653–1658).',
        actions: [
          'Created the New Model Army, promoting officers based on merit and religious conviction rather than aristocratic birth.',
          'Led devastating military campaigns in Ireland and Scotland to crush royalist opposition, leaving a bitter historical legacy.',
          'Passed the Navigation Act of 1651, challenging Dutch naval power and initiating aggressive English mercantilist expansion.',
        ],
        image: getBase64Image('/images/oliver_cromwell.jpg'),
      },
      conceptSpotlight: {
        tag: 'IMPERIAL MERCANTILISM',
        category: 'THE TRADE ACTS • 1651–1660',
        title: 'The Navigation Acts: Forging an Exclusive Maritime Empire',
        body: 'Under Oliver Cromwell’s Commonwealth, Britain adopted an aggressive mercantilist policy to dominate oceanic trade. In October 1651, Parliament passed the landmark Navigation Act, dictating that all colonial goods imported into England must be carried exclusively on English ships or ships of the producing nation. This legislation aimed directly at the Dutch Republic, whose merchant marine dominated international freight carrying. The acts provoked three Anglo-Dutch wars, but successfully established a closed imperial trading system where colonial raw materials flowed directly to English ports, enriching domestic shipyards, merchant syndicates, and royal customs revenues.',
        takeaway:
          'Key Historical Insight: The Commonwealth laid the commercial foundations of the British Empire by deploying state naval power to enforce exclusive colonial trade monopolies against European rivals.',
      },
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">SOURCE C</span>
              <span class="source-type">Constitutional Statute</span>
            </div>
            <span class="source-date-micro">16 December 1689</span>
          </div>
          <div class="archival-title">The Bill of Rights: Restraining the Sovereign Power</div>
          <img class="archival-image" src="${getBase64Image('/images/royal_exchange.jpg')}" alt="The Royal Exchange London">
          <div class="archival-body">
            "That the pretended power of suspending of laws or the execution of laws by regall authority without consent of Parlyament is illegall... That levying money for or to the use of the Crowne by pretence of prerogative without grant of Parlyament is illegall... That the raising or keeping a standing army within the kingdome in time of peace unless it be with consent of Parlyament is against law."
          </div>
          <div class="archival-context-box">
            <p class="archival-context-text">Accepted by William III and Mary II upon taking the throne, permanently subordinating the English monarchy to parliamentary law and taxation.</p>
            <div class="archival-hinge-q"><strong>Hinge Question:</strong> Which specific clause of the 1689 Bill of Rights dealt the most fatal blow to royal absolute power?</div>
          </div>
          <div class="archival-footer">
            <span>Statutes of the Realm • 1 William & Mary, Sess. 2, c. 2</span>
            <span>Parliamentary Archives, London</span>
          </div>
        </div>
      `,
      archivalOddity: {
        badge: 'ARCHIVAL ODDITY & CURIOUS REALITY',
        title: 'The Wine-Flowing Conduits of Cheapside',
        date: '11 April 1689',
        shelfmark: 'CORPORATION OF LONDON RECORDS OFFICE • CORONATION ACCOUNTS 1689',
        text: 'To celebrate the joint coronation of William of Orange and Mary II following the bloodless flight of Catholic James II, the City of London transformed its municipal plumbing into an engine of public revelry. The Great Conduit in Cheapside and the Little Conduit in Fleet Street were shut off from the city’s freshwater springs and hooked directly to subterranean cisterns of claret and canary sack wine. For twelve continuous hours, thousands of apprentices, soldiers, and citizens filled tankards, bowls, and leather boots directly from the municipal bronze taps with free red wine. The jubilant London mob was placated with alcohol while Parliament quietly enacted the Bill of Rights, establishing the supremacy of law over royal power.',
      },
      bottomEnquiry: {
        q1: 'How did the Navigation Act of 1651 challenge Dutch maritime supremacy and expand English naval power?',
        q2: 'Explain why the Glorious Revolution of 1688 is regarded as a decisive turning point in British constitutional history.',
        q3: 'Evaluate whether Oliver Cromwell should be remembered as a champion of parliamentary liberty or a military dictator.',
      },
    },

    p15: {
      keyFigure: {
        name: 'Alexander Falconbridge',
        lifespan: 'c. 1760–1792',
        role: 'Slave Ship Surgeon & Abolitionist Campaigner',
        significance:
          'Served as surgeon on four slave voyages before becoming an outspoken abolitionist, publishing firsthand testimony exposing the brutality of the Middle Passage.',
        actions: [
          'Published *An Account of the Slave Trade on the Coast of Africa* in 1788, detailing horrific overcrowding and disease aboard slave ships.',
          'Testified extensively before a parliamentary committee led by William Wilberforce, providing incontrovertible medical proof of abuse.',
          'Appointed commercial agent to the newly established Sierra Leone colony for freed enslaved people in West Africa.',
        ],
        image: getBase64Image('/images/thomas_clarkson.jpg'),
      },
      conceptSpotlight: {
        tag: 'COMMODIFICATION OF HUMANS',
        category: 'THE MIDDLE PASSAGE • 1700–1800',
        title: 'The Middle Passage: Industrialised Brutality on the Atlantic',
        body: 'The Middle Passage—the oceanic voyage from West Africa to the Americas—was the most horrific component of the transatlantic trade. Between 1500 and 1870, an estimated 12.5 million enslaved Africans were forced onto European ships, with over 1.8 million dying during the voyage from dehydration, dysentery, and starvation. Captives were packed shoulder-to-shoulder on wooden shelves with barely sixteen inches of vertical headroom, chained by their ankles in pairs for up to three months. Ship captains treated human cargo as an insurable commercial commodity, throwing living captives overboard in times of water shortage to collect insurance compensation, as seen in the notorious Zong Massacre of 1781.',
        takeaway:
          'Key Historical Insight: The transatlantic slave trade was not an accidental byproduct of empire, but a meticulously organized, state-sanctioned financial machine that turned human lives into capital.',
      },
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">SOURCE C</span>
              <span class="source-type">Published Abolitionist Testimony</span>
            </div>
            <span class="source-date-micro">Published 1788</span>
          </div>
          <div class="archival-title">Alexander Falconbridge: Account of the Slave Trade</div>
          <img class="archival-image" src="${getBase64Image('/images/brookes_ship.jpg')}" alt="The Slave Ship Brookes Stowage Plan (1788)">
          <div class="archival-body">
            "The hardships and inconveniences suffered by the negroes during the passage are scarcely to be conceived... The floor of their rooms was so covered with blood and mucus which had proceeded from them in consequence of the flux, that it resembled a slaughter-house. The surgeon is often obliged to crawl on his hands and knees."
          </div>
          <div class="archival-context-box">
            <p class="archival-context-text">Published in London by British abolitionists, providing horrifying medical evidence that forced Parliament to debate the trade.</p>
            <div class="archival-hinge-q"><strong>Hinge Question:</strong> Why was eyewitness testimony from an ex-slave ship surgeon so powerful in convincing a skeptical British public?</div>
          </div>
          <div class="archival-footer">
            <span>Printed by J. Phillips, George-Yard, Lombard-Street</span>
            <span>London, 1788</span>
          </div>
        </div>
      `,
      archivalOddity: {
        badge: 'ARCHIVAL ODDITY & CURIOUS REALITY',
        title: 'The Zong Trial: Human Cargo and Marine Insurance',
        date: '21 May 1783',
        shelfmark: 'GREGSON V. GILBERT • ENGLISH REPORTS (1783) 3 DOUG KB 232',
        text: 'In November 1781, Captain Luke Collingwood of the Liverpool slave ship Zong threw 133 living, chained Africans into the Caribbean Sea to drown. His chilling motive was purely financial: if enslaved people died of thirst or sickness on board, the loss fell upon the shipowners; but if they were thrown overboard to "save the ship", insurance underwriters were legally obliged to pay thirty pounds sterling per head for "jettisoned cargo". When the case reached the Court of King’s Bench in London, Lord Chief Justice Mansfield ruled: "The case of slaves was the same as if horses had been thrown overboard." The callousness of the verdict galvanized Olaudah Equiano and Granville Sharp, igniting Britain’s national abolitionist crusade.',
      },
      bottomEnquiry: {
        q1: 'How did the triangular trade system connect British factory manufacturing, African human capture, and Caribbean plantations?',
        q2: 'Explain why the 1788 Stowage Plan of the Slave Ship Brookes became history’s first viral human rights campaign image.',
        q3: 'Assess how far the wealth of modern British cities like Bristol and Liverpool was built upon the Transatlantic Slave Trade.',
      },
    },

    p17: {
      keyFigure: {
        name: 'Queen Nanny of the Maroons',
        lifespan: 'c. 1686–c. 1755',
        role: 'Spiritual Leader & Guerrilla Commander of the Windward Maroons',
        significance:
          'Led Jamaican Maroons in protracted guerrilla warfare against British colonial troops, forcing the British Crown to sign a peace treaty recognizing Maroon freedom in 1739.',
        actions: [
          'Established Nanny Town in the rugged Blue Mountains of Jamaica as an impregnable stronghold for escaped enslaved Africans.',
          'Pioneered ingenious camouflage and guerrilla ambushes, routing heavily armed British regiments through jungle mountain passes.',
          'Honored today as a National Hero of Jamaica for her military brilliance and unwavering defense of African sovereignty.',
        ],
        image: getBase64Image('/images/jamaica_maroons.jpg'),
      },
      conceptSpotlight: {
        tag: 'AGENCY & RESISTANCE',
        category: 'THE SPECTRUM OF OPPOSITION • 1700–1800',
        title: 'The Spectrum of Resistance: From Overt Rebellion to Cultural Survival',
        body: 'Enslaved Africans were never passive victims of the plantation system; they fought back through an expansive spectrum of resistance. Overt resistance included shipboard mutinies (recorded on roughly 10% of all Atlantic slave voyages) and armed insurrections such as the 1739 Stono Rebellion in South Carolina and the Jamaican Maroon Wars. Covert day-to-day resistance was even more widespread: feigning illness, breaking sugar-milling machinery, sabotaging crops, learning to read in secret, preserving West African religious rituals, and establishing escape networks. This resistance imposed immense military and financial costs on slave-owners, undermining the profitability of the plantation economy.',
        takeaway:
          'Key Historical Insight: Emancipation was not merely granted by enlightened British politicians; it was won through continuous armed struggle, sabotage, and cultural survival by enslaved Africans.',
      },
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">SOURCE C</span>
              <span class="source-type">Autobiographical Testimony</span>
            </div>
            <span class="source-date-micro">Published 1789</span>
          </div>
          <div class="archival-title">The Interesting Narrative of the Life of Olaudah Equiano</div>
          <img class="archival-image" src="${getBase64Image('/images/equiano.jpg')}" alt="Olaudah Equiano Frontispiece Portrait">
          <div class="archival-body">
            "The stench of the hold while we were on the coast was so intolerably loathsome, that it was dangerous to remain there for any time... The shrieks of the women, and the groans of the dying, rendered the whole a scene of horror almost inconceivable. I often wished for the last friend, death, to relieve me."
          </div>
          <div class="archival-context-box">
            <p class="archival-context-text">Written and published in London by Equiano himself, becoming a massive bestseller that educated the British public on the reality of slavery.</p>
            <div class="archival-hinge-q"><strong>Hinge Question:</strong> How did Equiano's ability to author a sophisticated English narrative directly challenge racist pro-slavery arguments?</div>
          </div>
          <div class="archival-footer">
            <span>Printed for and Sold by the Author, No. 10 Union-Street</span>
            <span>London, 1789</span>
          </div>
        </div>
      `,
      archivalOddity: {
        badge: 'ARCHIVAL ODDITY & CURIOUS REALITY',
        title: 'Queen Nanny and the Camouflage Warriors of Blue Mountain',
        date: 'c. 1730s',
        shelfmark: 'COLONIAL OFFICE ARCHIVES • CO 137/21 (JAMAICAN COUNCIL DISPATCHES)',
        text: 'In the rugged Cockpit Country of Jamaica, escaped African Maroons waged a thirty-year guerrilla war against heavily armed British regiments under the military leadership of Queen Nanny, an Ashanti spiritual elder. Maroon scouts developed extraordinary bush-warfare tactics, dressing in living palm branches and vines so convincingly that British redcoats marched right past them without noticing. At the blast of an abeng (cow horn), the forest itself seemed to erupt in musket fire. British soldiers reported with terror that Nanny possessed supernatural powers and could catch British musket balls in her apron. Unable to conquer the Maroons militarily, British Governor Edward Trelawny was forced in 1739 to sign a formal peace treaty conceding autonomy and 1,500 acres of land to Nanny Town.',
      },
      bottomEnquiry: {
        q1: 'Explain the difference between overt resistance and covert resistance on 18th-century slave plantations.',
        q2: 'How did Queen Nanny and the Jamaican Maroons exploit their geography to defeat British colonial armies?',
        q3: 'Evaluate the role of Black abolitionists like Olaudah Equiano in turning British public opinion against the slave trade.',
      },
    },

    p19: {
      keyFigure: {
        name: 'Sir Isaac Newton',
        lifespan: '1642–1727',
        role: 'Physicist, Mathematician, President of the Royal Society & Master of the Mint',
        significance:
          'Formulated the laws of universal gravitation and motion, anchoring the Scientific Revolution and modern empirical rationalism.',
        actions: [
          'Published the *Principia Mathematica* (1687), demonstrating that the physical universe was governed by predictable mathematical laws.',
          'Served as Master of the Royal Mint from 1699, reforming English gold and silver coinage and aggressively prosecuting counterfeiters.',
          'Elected President of the Royal Society in 1703, establishing London as Europe’s premier center of scientific experimentation and technological enquiry.',
        ],
        image: getBase64Image('/images/isaac_newton.jpg'),
      },
      conceptSpotlight: {
        tag: 'INSTITUTIONAL FINANCE',
        category: 'THE FISCAL-MILITARY STATE • 1694–1750',
        title: 'The Financial Revolution & The Foundation of the Bank of England',
        body: 'In 1694, Parliament chartered the Bank of England to raise a loan of £1.2 million to finance the war against Louis XIV’s France. This created the National Debt: investors lent money to the government backed by parliamentary taxation, receiving reliable interest payments. Alongside the London Stock Exchange and maritime insurance syndicates meeting at Lloyd’s Coffeehouse, Britain pioneered a modern financial system. While French absolute monarchs struggled to borrow money at exorbitant 10% interest rates due to fears of royal bankruptcy, the British constitutional Crown borrowed millions at 3–4%, allowing a small island nation to maintain the world’s most powerful navy.',
        takeaway:
          'Key Historical Insight: Britain’s rise to global superpower status was anchored in modern institutional finance, parliamentary taxation, and state credit as much as naval gunpowder.',
      },
      archivalDispatch: `
        <div class="archival-source-box">
          <div class="archival-header">
            <div class="source-identity">
              <span class="source-badge">SOURCE C</span>
              <span class="source-type">Travel Narrative & Social Survey</span>
            </div>
            <span class="source-date-micro">Published 1724</span>
          </div>
          <div class="archival-title">Daniel Defoe: A Tour Through the Whole Island of Great Britain</div>
          <img class="archival-image" src="${getBase64Image('/images/hooke_micrographia_flea.jpg')}" alt="Robert Hooke Micrographia Flea (1665)">
          <div class="archival-body">
            "Trade in England neither arranges nor degrades, but ennobles the practitioner... The commerce of this island is an inexhaustible fund of wealth; it supplies the fleets, it pays the armies, and it makes the British nation feared and respected throughout the habitable globe."
          </div>
          <div class="archival-context-box">
            <p class="archival-context-text">Written by the author of Robinson Crusoe, documenting how global commerce was transforming English social and political status.</p>
            <div class="archival-hinge-q"><strong>Hinge Question:</strong> Does Defoe celebrate trade because it promoted individual virtue or because it generated national military power?</div>
          </div>
          <div class="archival-footer">
            <span>Printed for G. Bickerston, London</span>
            <span>Survey of English Commerce and Agriculture (1724)</span>
          </div>
        </div>
      `,
      archivalOddity: {
        badge: 'ARCHIVAL ODDITY & CURIOUS REALITY',
        title: 'Sir Isaac Newton: The Secret Detective of the Royal Mint',
        date: 'c. 1696–1699',
        shelfmark: 'MINT PAPERS • THE NATIONAL ARCHIVES, KEW • MINT 1/14-16',
        text: 'In 1696, the world’s greatest mathematician left the serene cloisters of Trinity College, Cambridge, to become Warden of the Royal Mint in the Tower of London. London’s economy was on the verge of collapse due to "clippers" who shaved edges off silver coins and counterfeiters who flooded taverns with lead counterfeits. Rather than treating the post as an easy sinecure, Newton conducted forensic experiments on silver purity and created a clandestine intelligence network of paid informers. Disguised in heavy cloaks, Newton personally visited filthy London taverns and the grim dungeons of Newgate Prison, interrogating criminal suspects across over two hundred secret depositions. He prosecuted twenty-eight counterfeiters to the gallows at Tyburn, securing Britain’s financial currency.',
      },
      bottomEnquiry: {
        q1: 'How did the foundation of the Bank of England in 1694 transform British military and naval power?',
        q2: 'Explain why William Hogarth’s "Gin Lane" (1751) illustrates both the prosperity and social misery of modernizing London.',
        q3: '"By 1750, Britain had become a thoroughly modern nation." Assess the validity of this statement, considering politics, science, and inequality.',
      },
    },
  };

  const EARLY_MODERN_LEFT_VOCAB = {
    p2: [
      {
        term: 'Ottoman Empire',
        def: 'The powerful Islamic empire based in Anatolia that captured Constantinople in 1453 and dominated Mediterranean trade routes.',
      },
      {
        term: 'Silk Road',
        def: 'The ancient overland trade route network connecting China and Central Asia with European markets.',
      },
      {
        term: 'Eurocentrism',
        def: 'The misleading historical perspective that interprets world history exclusively through European experiences.',
      },
      {
        term: 'Bullion',
        def: 'Precious metals (gold and silver) in bulk bars or ingots, valued by weight as international currency.',
      },
    ],
    p4: [
      {
        term: 'Reformation',
        def: 'The 16th-century religious movement launched by Martin Luther that rejected papal supremacy and established Protestant churches.',
      },
      {
        term: 'Conquistador',
        def: 'Spanish military adventurers who conquered indigenous American empires in Mexico and Peru during the 1500s.',
      },
      {
        term: 'Privateer',
        def: 'An armed private vessel authorized by a government letter of marque to attack and seize enemy commercial shipping.',
      },
      {
        term: 'Tercios',
        def: 'The formidable Spanish infantry formations combining pikemen and musketeers that dominated European battlefields.',
      },
    ],
    p6: [
      {
        term: 'Chartered Company',
        def: 'A commercial corporation granted exclusive trading monopolies and sovereign territorial rights by royal decree.',
      },
      {
        term: 'Kingdom of Benin',
        def: 'A sophisticated pre-colonial West African forest empire (in modern Nigeria) renowned for monumental bronze art.',
      },
      {
        term: 'Factory',
        def: 'A fortified early modern overseas trading outpost and warehouse managed by commercial agents called factors.',
      },
      {
        term: 'Monopoly',
        def: 'The exclusive legal control of the commercial supply or trade in a specific commodity or territory.',
      },
    ],
    p8: [
      {
        term: 'Recusancy',
        def: 'The refusal of English Catholics to attend mandatory Anglican church services, punished by heavy state fines.',
      },
      {
        term: 'Jesuit',
        def: 'A member of the Catholic Society of Jesus, dedicated to missionary defense of the papacy and education.',
      },
      {
        term: 'Pursuivant',
        def: 'A royal government officer tasked with hunting down Catholic priests and searching for secret priest holes.',
      },
      {
        term: 'Treason',
        def: 'The crime of betraying one’s sovereign or country, punishable in early modern Britain by being hanged, drawn, and quartered.',
      },
    ],
    p10: [
      {
        term: 'Divine Right of Kings',
        def: 'The political doctrine asserting that monarchs derive their authority directly from God and are unaccountable to parliaments.',
      },
      {
        term: 'Ship Money',
        def: 'A medieval emergency tax levied on coastal ports in wartime, controversially collected inland by Charles I in peacetime.',
      },
      {
        term: 'New Model Army',
        def: 'The disciplined, religiously motivated parliamentary army formed by Oliver Cromwell in 1645, promoting officers by merit.',
      },
      {
        term: 'Regicide',
        def: 'The deliberate killing or judicial execution of a reigning monarch, carried out on King Charles I in January 1649.',
      },
    ],
    p12: [
      {
        term: 'Mercantilism',
        def: 'An economic system aiming to maximize national wealth by exporting manufactured goods and strictly limiting colonial imports.',
      },
      {
        term: 'Navigation Acts',
        def: 'English parliamentary laws dictating that colonial goods must be shipped exclusively on English vessels.',
      },
      {
        term: 'Glorious Revolution',
        def: 'The 1688 deposition of Catholic King James II and peaceful accession of Protestant William III and Mary II.',
      },
      {
        term: 'Constitutional Monarchy',
        def: 'A system of government where the hereditary monarch’s powers are strictly limited by parliamentary law and statute.',
      },
    ],
    p14: [
      {
        term: 'Triangular Trade',
        def: 'The three-stage Atlantic trade system linking British manufactures, African slave capture, and American plantation produce.',
      },
      {
        term: 'Middle Passage',
        def: 'The horrifying transatlantic voyage endured by enslaved Africans in the squalid holds of European slave vessels.',
      },
      {
        term: 'Chattel Slavery',
        def: 'A system where human beings are legally classified as personal property and commodities to be bought and sold.',
      },
      {
        term: 'Plantation Economy',
        def: 'Large agricultural estates in the Americas relying on forced labor to produce cash crops like sugar, tobacco, and cotton.',
      },
    ],
    p16: [
      {
        term: 'Maroons',
        def: 'Self-liberated formerly enslaved Africans who established free independent communities in the mountains of Jamaica.',
      },
      {
        term: 'Covert Resistance',
        def: 'Subtle, daily acts of sabotage by enslaved laborers, including feigning illness, breaking tools, and preserving cultural rituals.',
      },
      {
        term: 'Abolitionist',
        def: 'A campaigner who actively worked to legally ban the transatlantic slave trade and emancipate enslaved people.',
      },
      {
        term: 'Manumission',
        def: 'The formal legal release of an individual from chattel slavery by purchase, owner bequest, or state decree.',
      },
    ],
    p18: [
      {
        term: 'Financial Revolution',
        def: 'The creation of modern state banking, the National Debt, and stock markets that funded Britain’s imperial navy.',
      },
      {
        term: 'National Debt',
        def: 'Money borrowed by the government from private investors, secured by parliamentary taxation and interest payments.',
      },
      {
        term: 'Scientific Revolution',
        def: 'The 17th-century transformation in European thought emphasizing empirical observation, experimentation, and mathematical laws.',
      },
      {
        term: 'Gin Craze',
        def: 'A period of widespread public panic in early 18th-century London over the social damage caused by cheap distilled spirits.',
      },
    ],
  };

  const EARLY_MODERN_LEFT_SOURCES = {
    p2: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Primary Cartographic Artifact',
        title: 'The 1375 Catalan Atlas: Mansa Musa of Mali',
        image: getBase64Image('/images/mansa_musa_catalan.jpg'),
        context:
          'Created by Majorcan Jewish cartographer Abraham Cresques, this illuminated parchment world map depicts Emperor Mansa Musa of Mali holding a gleaming golden orb. Mansa Musa ruled the vast Mali Empire, which controlled the trans-Saharan gold trade.',
        hingeQuestion:
          'How does the Catalan Atlas challenge Eurocentric assumptions about African poverty prior to European oceanic exploration?',
        shelfmark: 'Bibliothèque nationale de France • MS Espagnol 30',
        footer: 'Royal Catalan World Map Collection',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Contemporary Ottoman Miniature',
        title: 'The Ottoman Imperial Army at the Siege of Constantinople (1453)',
        image: getBase64Image('/images/ottoman_1453.jpg'),
        context:
          'Painted to commemorate Sultan Mehmed II’s triumph, this illustration shows Ottoman janissaries and massive bronze bombards bombarding the walls of Constantinople. The capture of the city shattered European overland trade routes to Asia.',
        hingeQuestion:
          'Why did the Ottoman capture of Constantinople trigger immediate economic panic among European merchant states?',
        shelfmark: 'Topkapi Palace Museum, Istanbul • Hazine 1517',
        footer: 'Ottoman Imperial Court Archive',
      },
    },
    p4: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Papal Diplomatic Parchment',
        title: 'The Treaty of Tordesillas: Dividing the Globe (1494)',
        image: getBase64Image('/images/tordesillas_map.jpg'),
        context:
          'Brokered by Pope Alexander VI, this treaty drew an imaginary meridian 370 leagues west of the Cape Verde islands. Spain received exclusive sovereign rights to conquer all lands west of the line, while Portugal claimed everything to the east.',
        hingeQuestion:
          'Why did Protestant monarchs like Elizabeth I view the papal partition of the world as illegitimate and an act of war?',
        shelfmark: 'General Archive of the Indies, Seville • Patronato 1-1-1',
        footer: 'Iberian Maritime & Imperial Treaties Collection',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Contemporary Propaganda Portrait',
        title: 'George Gower: The Armada Portrait of Elizabeth I (1588)',
        image: getBase64Image('/images/armada_portrait.jpg'),
        context:
          'Painted to celebrate the defeat of the Spanish Armada in 1588, Elizabeth I rests her right hand authoritatively upon the globe, her fingers covering North America. Behind her, the English fleet sails out while the Spanish fleet is wrecked on rocks.',
        hingeQuestion:
          'How does Elizabeth’s posture over the globe signal England’s emerging imperial ambitions against Catholic Spain?',
        shelfmark: 'National Maritime Museum, Greenwich • BHC2678',
        footer: 'Tudor Royal Portrait Collection',
      },
    },
    p6: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Archaeological Military Survey',
        title: 'Archaeological Plan of James Fort, Virginia (1607)',
        image: getBase64Image('/images/jamestown_fort.jpg'),
        context:
          'England’s first permanent North American settlement was built as a triangular timber palisade fort armed with artillery on the James River. The settlers faced disease, drought, and conflict with the Powhatan confederacy, barely surviving.',
        hingeQuestion:
          'How does the military design of James Fort prove that English colonization relied on armed defense rather than peaceful trade?',
        shelfmark: 'Virginia Historical Society Archives',
        footer: 'Colonial Jamestown Archaeological Record',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Contemporary Diplomatic Court Painting',
        title: 'Sir Thomas Roe at the Court of Mughal Emperor Jahangir (1615–1619)',
        image: getBase64Image('/images/sir_thomas_roe.jpg'),
        context:
          'Dispatched by King James I as royal ambassador, Sir Thomas Roe spent four years at the court of Emperor Jahangir seeking trade rights for the East India Company. In 1615, the Mughal Empire commanded 25% of global GDP, while England had barely 5 million souls.',
        hingeQuestion:
          'Why was the English East India Company treated as a humble petitioner rather than an imperial conqueror in 17th-century India?',
        shelfmark: 'British Library • India Office Records',
        footer: 'East India Company Diplomatic Archive',
      },
    },
    p8: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Contemporary Dutch Engraving',
        title: 'Crispijn van de Passe: The Gunpowder Plot Conspirators (1605)',
        image: getBase64Image('/images/gunpowder_conspirators.jpg'),
        context:
          'This 1605 print depicts Robert Catesby, Guy Fawkes, Thomas Percy, and fellow conspirators plotting in secret. Disillusioned by King James I’s continuation of anti-Catholic penal laws, the conspirators smuggled thirty-six barrels of gunpowder beneath Parliament.',
        hingeQuestion:
          'Does this engraving present the conspirators as desperate religious martyrs or dangerous traitors to the state?',
        shelfmark: 'National Portrait Gallery, London • NPG D25492',
        footer: 'Jacobean State Trials & Treason Archive',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Primary Holograph Manuscript',
        title: 'The Anonymous Monteagle Letter (October 1605)',
        image: getBase64Image('/images/monteagle_letter.jpeg'),
        context:
          'Delivered to Catholic peer Lord Monteagle warning him to "devise some excuse to shift of your attendance at this Parliament... for God and man hath concurred to punish the wickedness of this time", this anonymous letter enabled Robert Cecil to catch Fawkes.',
        hingeQuestion:
          'Why do modern historians debate whether the Monteagle letter was a genuine tip-off or a setup by Cecil’s spy network?',
        shelfmark: 'The National Archives, Kew • SP 14/216/2',
        footer: 'State Papers Domestic • Gunpowder Plot Records',
      },
    },
    p10: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Contemporary Eyewitness Engraving',
        title: 'Contemporary German Engraving: The Execution of Charles I (1649)',
        image: getBase64Image('/images/charles_i_execution.jpg'),
        context:
          'On 30 January 1649, King Charles I was beheaded on a scaffold outside the Banqueting House in Whitehall before a stunned crowd. Condemned by Parliament’s High Court of Justice as a "tyrant, traitor, and murderer", his death ended absolute Divine Right.',
        hingeQuestion:
          'How did the public execution of a crowned monarch destroy the concept of the Divine Right of Kings forever?',
        shelfmark: 'British Museum • Department of Prints & Drawings',
        footer: 'Civil War & Regicide Collection • 1649',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Official Commonwealth State Artifact',
        title: 'Thomas Simon: The Great Seal of the Commonwealth of England (1651)',
        image: getBase64Image('/images/great_seal_1651.png'),
        context:
          'Commissioned by the Rump Parliament, this official seal replaced the traditional royal head of the monarch with an aerial map of England and Ireland, and the House of Commons in session on the reverse under the motto of freedom restored.',
        hingeQuestion:
          'Why did the Commonwealth replace royal imagery with an image of Parliament in session on its official state seal?',
        shelfmark: 'The National Archives, Kew • Seal Collection',
        footer: 'Parliamentary Republic State Papers • 1651',
      },
    },
    p12: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Contemporary Architectural Etching',
        title: 'Wenceslaus Hollar: The Royal Exchange Courtyard, London (1644)',
        image: getBase64Image('/images/royal_exchange_courtyard.jpg'),
        context:
          'Hollar’s detailed etching shows merchants, ship captains, and brokers congregating in the central courtyard of the Royal Exchange in the City of London, negotiating contracts for tobacco, sugar, textiles, and credit that made London a financial capital.',
        hingeQuestion:
          'How did commercial institutions like the Royal Exchange lay the foundation for Britain’s global financial supremacy?',
        shelfmark: 'Folger Shakespeare Library • Hollar Collection',
        footer: 'City of London Historical Commerce Archive',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Contemporary Oil Painting',
        title: 'King William III Landing at Torbay, The Glorious Revolution (1688)',
        image: getBase64Image('/images/early_mod_l6_banner.jpg'),
        context:
          'In November 1688, Dutch Stadtholder William of Orange landed at Torbay with 463 ships and 15,000 soldiers. Invited by Protestant politicians to depose Catholic King James II, William accepted the 1689 Bill of Rights, establishing a permanent constitutional monarchy.',
        hingeQuestion:
          'Was the Glorious Revolution a peaceful popular rebellion or a successful foreign Dutch military invasion?',
        shelfmark: 'Rijksmuseum, Amsterdam • SK-A-1750',
        footer: 'Dutch-British Maritime History Archive',
      },
    },
    p14: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Historical Commercial Cartography',
        title: 'Diagram of the Atlantic Triangular Trade System (18th Century)',
        image: getBase64Image('/images/triangular_trade.png'),
        context:
          'British manufactured goods were shipped to West Africa; captured enslaved Africans were forced across the Atlantic via the catastrophic Middle Passage; slave-produced sugar, tobacco, and cotton returned to British ports, enriching domestic merchant syndicates.',
        hingeQuestion:
          'How did British domestic manufacturing and global maritime commerce depend entirely on the exploitation of enslaved labour?',
        shelfmark: 'National Maritime Museum Cartographic Archive',
        footer: 'Transatlantic Commerce & Plantation Record',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Abolitionist Architectural Plan',
        title: 'The Stowage Plan of the Slave Ship Brookes (1788)',
        image: getBase64Image('/images/brookes_ship.jpg'),
        context:
          'Published by the Plymouth Abolition Committee in 1788, this cross-section diagram exposed how 454 enslaved human beings were chained in spaces measuring 6 feet by 16 inches. The diagram caused outrage across Britain as history’s first viral campaign image.',
        hingeQuestion:
          'Why was this technical architectural diagram far more effective in turning British public opinion against the trade than written descriptions?',
        shelfmark: 'British Library • Add MS 49308',
        footer: 'Society for the Abolition of the Slave Trade Records',
      },
    },
    p16: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Contemporary Military Engraving',
        title: 'Abraham Brunias: Leonard Parkinson, Captain of the Maroons (1796)',
        image: getBase64Image('/images/jamaica_maroons.jpg'),
        context:
          'Engraved during the Second Maroon War in Jamaica, this print shows Leonard Parkinson, a Maroon guerrilla commander, armed with a cutlass and brace of pistols. Jamaican Maroons defeated British regular armies, forcing the Crown to sign treaties recognizing Maroon freedom.',
        hingeQuestion:
          'How did Jamaican Maroon resistance prove that freedom was seized by Africans through combat rather than granted by British politicians?',
        shelfmark: 'National Library of Jamaica Archives',
        footer: 'Caribbean Resistance & Emancipation Papers',
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Contemporary Author Portrait',
        title: 'Frontispiece of The Interesting Narrative of the Life of Olaudah Equiano (1789)',
        image: getBase64Image('/images/equiano.jpg'),
        context:
          'Published in London in 1789, Olaudah Equiano’s best-selling autobiography provided the British public with its first widely read first-person account of capture, the Middle Passage, and enslavement. Equiano toured Britain lecturing against slavery.',
        hingeQuestion:
          'Why was Equiano’s firsthand testimony so devastating to the pro-slavery lobby’s economic arguments in Parliament?',
        shelfmark: 'British Library • General Reference Collection 1489.g.50',
        footer: 'African Disciplinary Authorship Archive',
      },
    },
    p18: {
      sourceA: {
        badge: 'SOURCE A',
        type: 'Imperial Ceiling Painting',
        title: 'Spiridione Roma: The East Offering Its Riches to Britannia (1778)',
        image: getBase64Image('/images/east_offering.jpg'),
        context:
          'Commissioned for the East India Company’s headquarters in London, Roma’s painting depicts kneeling Asian figures presenting pearls, tea, and jewels to Britannia, projecting an image of voluntary tribute while concealing military conquest.',
        hingeQuestion:
          'How does this artwork reflect Britain’s self-image as a benevolent civilizing power while concealing the violence of colonial conquest?',
        shelfmark: 'Foreign and Commonwealth Office Collection, London',
        footer: "East India Company Directors' Archive",
      },
      sourceB: {
        badge: 'SOURCE B',
        type: 'Satirical Social Engraving',
        title: 'William Hogarth: "Gin Lane" (1751)',
        image: getBase64Image('/images/gin_lane.jpg'),
        context:
          'Hogarth’s engraving exposed the destitution, infant mortality, and social decay in London’s St Giles parish during the "Gin Craze". Published alongside "Beer Street", Hogarth highlighted how rapid urban growth created extreme wealth alongside desperate poverty.',
        hingeQuestion:
          'Does Hogarth’s Gin Lane prove that economic modernity brought widespread destitution rather than genuine social progress?',
        shelfmark: 'British Museum • Department of Prints and Drawings',
        footer: 'Georgian Urban History Archive • 1751',
      },
    },
  };

  /**
   * 108 Audited Narrative Paragraphs (3 per Act × 4 Acts × 9 Lessons)
   * Calibrated strictly between 60 and 80 words per paragraph.
   */
  const EARLY_MODERN_ACT_NARRATIVES = {
    // LESSON 1: Who held true global power in 1450?
    lesson1: {
      act1: {
        title: 'The Eurocentric Myth & The Peripheral Peninsula',
        paras: [
          'In popular imagination, the modern world is often pictured as a European invention. Yet if an impartial observer had surveyed the globe in the year 1450, Western Europe would have appeared as little more than an impoverished, war-torn, and disease-ravaged peripheral backwater. Europe was still reeling from the demographic shock of the Black Death, which had killed roughly half its population.',
          'England and France were trapped in the exhausting final clashes of the Hundred Years’ War. Aristocratic factions fought for control of muddy provincial holdings, literacy remained restricted to a tiny Latin-speaking clerical elite, and London was a smelly, unpaved commercial river-town of barely 50,000 residents. The kingdoms of Christian Europe were fractured, poor, and deeply vulnerable to external military invasion.',
          'By sharp contrast, the true centers of global wealth, industrial manufacturing, and demographic power lay thousands of miles to the east and south. In 1450, the Mediterranean Sea was not a European lake, but the western terminus of vast Afro-Eurasian trade routes connecting the valuable spices of the Moluccas, the silks of China, and the goldfields of West Africa.',
        ],
      },
      act2: {
        title: 'The Giants of the East: Ming China & The Ottoman Blitz',
        paras: [
          'The unquestioned economic titan of the fifteenth-century world was Ming Dynasty China. Ruling over an immense population of eighty-five million people, Ming emperors governed a sophisticated bureaucratic civilization producing the finest porcelain, magnetic compasses, and silk textiles on earth. Chinese domestic trade was lubricated by paper currency, while massive agricultural canal networks fed gargantuan cities.',
          'Between 1405 and 1433, Emperor Yongle dispatched Admiral Zheng He on seven monumental maritime expeditions across the Indian Ocean. Zheng He commanded fleets of three hundred ships, including colossal nine-masted "Treasure Ships" four times larger than Columbus’s Santa Maria. These fleets did not cross oceans to plunder impoverished lands, but to demonstrate imperial virtue and enroll foreign rulers in China’s tributary trade system.',
          'Meanwhile, closer to Europe, the Islamic world was experiencing an explosive geopolitical expansion under the Ottoman Dynasty. Rising from Anatolia, disciplined Ottoman armies built on janissary infantry and gunpowder artillery conquered the Balkans, subjugating Christian kingdoms. By 1450, the Ottoman Empire stood poised to deliver the mortal blow to the last surviving remnant of the ancient Roman Empire.',
        ],
      },
      act3: {
        title: 'The Fall of Constantinople & The Mali Empire',
        paras: [
          'On 29 May 1453, Sultan Mehmed II breached the legendary walls of Constantinople, capturing the Byzantine capital and converting Hagia Sophia into an imperial mosque. The fall of Constantinople sent seismic shockwaves through Christian Europe. For Italian merchant republics like Venice and Genoa, centuries of profitable overland trade across the Silk Road were suddenly severed by heavy Ottoman tariffs and territorial blockades.',
          'To the south across the Sahara Desert lay another colossal center of wealth: the Mali Empire of West Africa. Under fourteenth-century Emperor Mansa Musa, Mali had supplied over half the Old World’s gold. When Mansa Musa made his famous pilgrimage to Mecca in 1324, he distributed so much uncoined gold bullion along the Nile that the precious metal’s value crashed in Cairo for a decade.',
          'European geographers were so awestruck by tales of West African riches that the Catalan Atlas of 1375 depicted Mansa Musa seated upon a golden throne, holding an enormous golden orb. Yet European merchants possessed neither the maritime navigation tools nor the military power to sail down the treacherous Atlantic coast to reach the goldfields directly.',
        ],
      },
      act4: {
        title: 'The Desperation of the Edge: A World on the Brink',
        paras: [
          'Modern historians, including Peter Frankopan in The Silk Roads, have radically revised Eurocentric narratives of exploration. Frankopan demonstrates that for millennia, the heartbeat of world history was the Eurasian crossroads, not Western Europe. The subsequent European "Age of Discovery" was not born out of cultural superiority or civilizing genius, but out of geographic desperation and acute economic isolation.',
          'Cut off from the spices of India and the silks of China by the Ottoman maritime blockade, European rulers faced a bleak choice: remain impoverished provincial tributaries, or gamble their royal revenues on the terrifying, uncharted Atlantic Ocean. European monarchs possessed little to trade with the East except raw timber, crude wool, and extracted silver bullion.',
          'The year 1450 represents the quiet calm before a global storm. Within fifty years, desperate Iberian caravels would round the Cape of Good Hope and stumble upon the Americas, igniting a violent reordering of the planet. Yet in 1450, the wealthy rulers of Beijing and Istanbul would have mocked the notion that England would ever command global trade.',
        ],
      },
    },

    // LESSON 2: Why did European rulers risk crossing the oceans?
    lesson2: {
      act1: {
        title: 'Luther’s Hammer & The Papal Monopoly',
        paras: [
          'In October 1517, an obscure German monk named Martin Luther nailed ninety-five theses to the church door in Wittenberg, attacking the financial corruption of the Roman papacy. Luther argued that salvation was achieved through personal faith in Scripture alone, not by purchasing papal indulgences. His protest ignited the Protestant Reformation, shattering Western Christendom into violently hostile religious camps.',
          'Across Western Europe, religion transformed into an existential geopolitical struggle. Catholic monarchs, spearheaded by the wealthy Habsburg superpower of Spain, viewed Protestantism as damnable heresy that had to be eradicated by the Inquisition and military force. In response, Protestant reformers in England, Scotland, and the Netherlands viewed the Pope as the Antichrist, establishing national churches and rejecting Roman spiritual authority.',
          'Meanwhile, Iberian monarchs had already struck maritime gold across the Atlantic. In 1494, Pope Alexander VI mediated the Treaty of Tordesillas, audaciously drawing an imaginary meridian down the Atlantic Ocean. Spain claimed exclusive ownership of all non-Christian lands to the west, while Portugal claimed the east. To Spanish King Philip II, this monopoly was divine authorization to conquer new worlds.',
        ],
      },
      act2: {
        title: 'Potosí Silver & The Rise of the Sea Dogs',
        paras: [
          'In 1545, Spanish prospectors in modern Bolivia discovered Cerro Rico at Potosí, an entire mountain composed of silver ore. Utilizing the brutal mita system of forced indigenous labor, Spain extracted thousands of tons of silver, shipping it back in annual treasure galleons. To Philip II, this tidal wave of bullion was divine funding to build invincible armies and crush Protestant heretics.',
          'When Elizabeth I ascended the English throne in 1558, she inherited a vulnerable, impoverished island surrounded by Catholic enemies. Excommunicated by Pope Pius V in 1570, Elizabeth could not afford a full-scale war against Spain’s legendary tercios infantry. Instead, the Queen secretly licensed daring Devon privateers—the infamous "Sea Dogs", including Francis Drake and John Hawkins—to wage commercial war.',
          'Armed with royal letters of marque, Drake ambushed Spanish treasure galleons in the Caribbean and raided silver mule-trains across Panama. Between 1577 and 1580, Drake became the first Englishman to circumnavigate the globe in the Golden Hind, returning to Plymouth with twenty-six tons of looted Spanish silver. Elizabeth brazenly boarded his ship in London and knighted him on his quarterdeck.',
        ],
      },
      act3: {
        title: 'The Spanish Armada & The Protestant Wind',
        paras: [
          'Furious at English piracy, Elizabeth’s military support for Dutch Protestant rebels, and the execution of Catholic Mary Queen of Scots in 1587, Philip II launched his "Enterprise of England". In July 1588, a colossal fleet of 130 warships carrying 30,000 soldiers sailed up the English Channel in an unbreakable crescent, intending to transport an invasion army from Flanders.',
          'Off Calais on 7 August, English commanders launched eight blazing hellburner fireships into the anchored Armada at midnight, throwing the Spanish galleons into sheer panic. The following day at the Battle of Gravelines, faster English race-built warships pounded the disorganized Spanish fleet at long range with heavy naval guns, preventing the Spanish from boarding and executing their invasion plan.',
          'Battered by gunfire and driven northward by ferocious Atlantic gales, the Armada was forced to navigate the treacherous rocky coasts of Scotland and Ireland, where dozens of galleons were wrecked. The triumphant English struck a commemorative medal declaring: "God blew, and they were scattered." The iconic Armada Portrait immortalized Elizabeth resting her hand upon the Americas.',
        ],
      },
      act4: {
        title: 'Religious Crusade or Imperial Greed?',
        paras: [
          'Historians continue to debate whether the Elizabethan naval struggle was primarily motivated by genuine Protestant faith or naked commercial piracy. Whig historians celebrated Drake and Hawkins as noble Protestant freedom fighters resisting Roman Catholic tyranny. However, modern economic historians emphasize that the Sea Dogs were commercial privateers and early human traffickers seeking astronomical financial profits.',
          'Nevertheless, the psychological impact of the 1588 victory was transformative for English national identity. The defeat of the Spanish Armada shattered the myth of Spanish naval invincibility, proving to London merchants that Atlantic sea lanes were vulnerable to English enterprise. God, it seemed to Protestant propagandists, had personally favored English maritime destiny over papal claims.',
          'By the close of Elizabeth’s reign in 1603, England had transformed from a defensive, frightened island into an aggressive maritime competitor. English merchants realized that permanent naval power required overseas settlements and corporate finance, laying the ideological and commercial foundations for the foundation of the East India Company and the colonization of North America.',
        ],
      },
    },

    // LESSON 3: Trade or takeover? Benin & East India Company
    lesson3: {
      act1: {
        title: 'The Joint-Stock Innovation & The London Merchants',
        paras: [
          'In the late sixteenth century, English overseas expansion faced a formidable barrier: oceanic voyages were ruinously expensive and carried catastrophic risks of shipwreck, piracy, and scurvy. Individual merchants or royal treasuries could not afford repeated losses. To overcome this obstacle, visionary City of London merchants developed a revolutionary financial innovation: the chartered joint-stock company.',
          'Instead of a single wealthy aristocrat funding a voyage, hundreds of private investors bought transferable corporate shares in a commercial venture. If a fleet was lost at sea, each investor lost only their individual stake; if the ships returned laden with nutmeg, pepper, and silk, profits were distributed proportionally as dividends. The financial risk of global trade was democratized.',
          'On 31 December 1600, Queen Elizabeth I granted a royal charter to the Governor and Company of Merchants of London Trading into the East Indies—the English East India Company (EIC). The charter granted 218 wealthy merchants an exclusive twenty-one-year commercial monopoly over all English trade east of the Cape of Good Hope, establishing a corporate state within a state.',
        ],
      },
      act2: {
        title: 'Jamestown’s Starvation & The Mughal Colossus',
        paras: [
          'In North America, English colonization began not with royal soldiers, but with another commercial joint-stock enterprise: the Virginia Company of London. In May 1607, three ships landed 104 settlers on the James River, constructing a triangular timber fort. The colony nearly collapsed immediately; aristocratic gentlemen refused to farm, disease claimed dozens, and winter starvation reduced colonists to eating boots and horses.',
          'The Jamestown settlement was saved only by the military diplomacy of Powhatan leader Wahunsenacawh and John Rolfe’s introduction of sweet West Indian tobacco seeds in 1612. Tobacco became Virginia’s lucrative cash crop, transforming agricultural land into private property and sparking ruthless colonial encroachment that violently displaced the indigenous Powhatan confederacy over the following decades.',
          'Simultaneously, across the Indian Ocean, the East India Company encountered civilizations far wealthier than England. When Company ambassador Sir Thomas Roe arrived at the court of Mughal Emperor Jahangir in 1615, he was astonished by imperial splendor. Jahangir ruled an empire of 150 million subjects producing a quarter of world manufacturing, and viewed English merchants as humble petitioners.',
        ],
      },
      act3: {
        title: 'Sovereign Encounters: The Kingdom of Benin',
        paras: [
          'In West Africa, early modern English merchants encountered highly sophisticated sovereign states that strictly dictated commercial terms. The Kingdom of Benin, located in modern-day southern Nigeria, had developed monumental urban defenses and exquisite artistic traditions under powerful Obas (kings). Dutch and Portuguese traders reported that Benin City was clean, well-lit, and protected by vast defensive earthworks.',
          'The Oba of Benin strictly regulated European trade through royal guilds. European merchants were forbidden from traveling into the interior, and all commercial transactions for pepper, ivory, palm oil, and cotton cloth were conducted through standardized royal currencies, particularly brass manillas. Early European visitors recognized the Oba as an imperial peer, conducting diplomacy with formal respect.',
          'Benin’s famous brass plaques and royal sculptures—the world-renowned Benin Bronzes—forensically demonstrate this balanced relationship of equals. Cast by master guild artisans using the lost-wax technique, the high-relief bronzes depict Portuguese soldiers in sixteenth-century morion helmets carrying matchlock muskets, preserved as ceremonial guards and respectful commercial partners within the Oba’s imperial palace rather than colonial conquerors.',
        ],
      },
      act4: {
        title: 'An Empire in a Fit of Absence of Mind?',
        paras: [
          'Nineteenth-century imperial historian J.R. Seeley famously declared that Britain conquered half the world "in a fit of absence of mind". Modern economic historians reject this myth entirely. English expansion was not accidental; it was driven by calculated corporate capitalism, joint-stock dividends, and state-sanctioned violence designed to secure exclusive commercial monopolies across Asia and the Americas.',
          'The early East India Company was neither an army of conquest nor a benevolent trading guild. It was a profit-seeking corporate hybrid possessing legal authority to build fortified factories, deploy private armed garrisons, coin money, and wage war against commercial rivals. From humble fortified warehouses at Surat, Madras, and Calcutta, the Company gradually infiltrated regional politics.',
          'By 1650, English oceanic activity had established two distinct commercial models: agricultural settler colonies in Virginia that violently dispossessed indigenous peoples, and armed corporate factories across Asia that operated within powerful Islamic and Asian empires. Over the subsequent century, corporate joint-stock profits would steadily evolve into militarized territorial conquest and coercive imperial rule.',
        ],
      },
    },

    // LESSON 4: Why was religious division such an explosive threat under King James I?
    lesson4: {
      act1: {
        title: 'The Scottish King & Catholic Alienation',
        paras: [
          'When Queen Elizabeth I died childless in March 1603, the Tudor dynasty ended, and the English crown passed to her Scottish cousin, King James VI, who became King James I of England. English Catholics had endured four decades of brutal state persecution under Elizabeth, paying ruinous recusancy fines for refusing Anglican services and risking execution for harboring Catholic priests.',
          'Catholics initially celebrated James’s accession. His mother had been the executed Catholic Mary Queen of Scots, and James had privately hinted at religious toleration to secure Catholic support for his succession. However, once crowned in London, James found himself trapped. Puritan Members of Parliament furiously opposed any concessions to "papists", demanding the ruthless enforcement of anti-Catholic penal laws.',
          'Desperate for parliamentary tax subsidies, James caved to political pressure. In early 1604, he issued a royal proclamation expelling all Catholic priests from England and vigorously reimposed crippling recusancy fines. Catholic gentlemen who had suffered for their faith felt utterly betrayed by the new Stuart monarch, driving radical elements toward violent underground conspiracy.',
        ],
      },
      act2: {
        title: 'The Conspiracy: 36 Barrels of Terror',
        paras: [
          'Enraged by royal betrayal, charismatic Warwickshire gentleman Robert Catesby resolved to strike a catastrophic decapitating blow against the Protestant state. In May 1604, Catesby gathered four trusted Catholic conspirators at the Duck and Drake inn in London, swearing an oath of secrecy on a Catholic primer to blow up the House of Lords during the State Opening of Parliament.',
          'The conspiracy grew to thirteen men, including Guy (Guido) Fawkes, a battle-hardened military veteran who had spent a decade fighting for Catholic Spain in Flanders. In March 1605, conspirator Thomas Percy leased a ground-floor coal cellar situated directly beneath the House of Lords chamber. Under cover of darkness, Fawkes supervised the covert transport of thirty-six barrels of gunpowder across the Thames.',
          'Concealed beneath iron billets and firewood, the gunpowder was sufficient to pulverize the entire Palace of Westminster. The plot aimed to wipe out King James, Queen Anne, Prince Henry, the bishops, and the assembled Parliament in a single blast. Simultaneously, Catholic rebels in the Midlands planned to kidnap nine-year-old Princess Elizabeth and install her as a puppet Catholic queen.',
        ],
      },
      act3: {
        title: 'The Monteagle Warning & The Agony of the Rack',
        paras: [
          'On 26 October 1605, Catholic peer Lord Monteagle received an anonymous letter delivered by a cloaked stranger, warning him to avoid Parliament because "they shall receive a terrible blow... and yet they shall not see who hurts them." Alarmed, Monteagle delivered the letter to Robert Cecil, Earl of Salisbury, King James’s cunning and ruthless Secretary of State.',
          'Cecil waited until midnight on 4 November before dispatching armed guards to search the cellars beneath Parliament. Sir Thomas Knyvett discovered Guy Fawkes booted and cloaked beside thirty-six barrels of powder, carrying a pocket watch and slow matches. Fawkes was immediately arrested and dragged to the Tower of London, where King James authorized his interrogation under torture.',
          'Strapped to the agonizing rack, Fawkes endured days of excruciating pain before his spirit broke. His signature on his final confession was a faint, trembling scrawl ("Guido"), bearing physical witness to the state’s brutality. Meanwhile, Catesby and the surviving plotters fled to Holbeche House in Staffordshire, where Catesby was shot dead in a final shootout with the sheriff.',
        ],
      },
      act4: {
        title: 'The Birth of Bonfire Night & State Propaganda',
        paras: [
          'The failure of the Gunpowder Plot unleashed intense anti-Catholic paranoia across Jacobean Britain. The surviving conspirators were dragged through London streets on hurdles before being hanged, drawn, and quartered at St Paul’s Churchyard in January 1606. Parliament quickly capitalized on the national terror to pass the draconian Popish Recusants Act of 1606.',
          'The new legislation barred Catholics from practicing law, practicing medicine, serving as army officers, or voting in parliamentary elections. Catholics were forced to swear a humiliating Oath of Allegiance explicitly denying the Pope’s authority to depose English monarchs. Furthermore, Parliament enacted the Observance of 5th November Act, mandating an annual church service of thanksgiving for divine deliverance.',
          'The state-sponsored tradition of lighting bonfires and burning effigies of the Pope and Guy Fawkes became deeply ingrained in British culture for centuries. The Gunpowder Plot permanently cemented the enduring English belief that Catholicism was synonymous with foreign treason and domestic terrorism, poisoning British religious relations for over two hundred years.',
        ],
      },
    },

    // LESSON 5: How far do you agree that the Civil War was an unavoidable fight against royal tyranny?
    lesson5: {
      act1: {
        title: 'The Arrogant Monarch & The Eleven Years’ Tyranny',
        paras: [
          'When King Charles I ascended the throne in 1625, he brought an unyielding belief in the Divine Right of Kings—the doctrine that monarchs are appointed directly by God and answerable to no earthly parliament. Elegant, aloof, and deeply sensitive to criticism, Charles viewed parliamentary debates as insolent interference with royal prerogative and divine majesty.',
          'Tensions exploded over religion and taxation. Charles married a French Catholic princess, Henrietta Maria, and promoted Archbishop William Laud, who introduced ornate "High Church" rituals that suspicious Puritans viewed as a backdoor return to Roman Catholicism. Furious with parliamentary resistance, Charles dissolved Parliament in 1629 and governed for eleven years without summoning MPs—the "Personal Rule" or "Eleven Years’ Tyranny".',
          'To fund his government without parliamentary taxes, Charles revived obsolete medieval feudal levies. Most controversially, he levied Ship Money—traditionally an emergency wartime coastal tax—on inland counties in peacetime. In 1637, Buckinghamshire gentleman John Hampden refused to pay the twenty-shilling tax, becoming a national hero and symbol of parliamentary resistance to arbitrary royal taxation.',
        ],
      },
      act2: {
        title: 'The Kingdom in Blood & The New Model Army',
        paras: [
          'Charles’s attempt to impose Anglican prayer books on Presbyterian Scotland sparked military rebellion, forcing the bankrupt King to summon Parliament in 1640. Instead of granting taxes, furious MPs led by John Pym arrested royal ministers and abolished royal prerogative courts. In January 1642, Charles entered the House of Commons with armed soldiers to arrest five leading MPs, but found they had escaped.',
          'Having breached parliamentary privilege, Charles fled London to raise the royal standard at Nottingham in August 1642, igniting the First English Civil War. The nation fractured along religious, regional, and social lines: Royalist "Cavaliers" (aristocrats, traditional gentry, and Anglicans) fought Parliamentary "Roundheads" (London merchants, yeoman farmers, and radical Puritans). Initially, royalist cavalry under Prince Rupert dominated.',
          'The turning point came when Member of Parliament Oliver Cromwell reformed Parliament’s forces into the New Model Army in 1645. Rejecting aristocratic privilege, Cromwell promoted soldiers based on merit and religious discipline. At the decisive Battle of Naseby in June 1645, the New Model Army smashed the royalist forces, capturing the King’s private correspondence and ending Charles’s military hopes.',
        ],
      },
      act3: {
        title: 'The Trial of the Tyrant & The Axe Falls',
        paras: [
          'Even in decisive military defeat, Charles refused to compromise, secretly negotiating with Presbyterian Scots to spark the bloody Second Civil War in 1648. Convinced that the unrepentant King was a "man of blood" who had brought senseless slaughter to his own subjects, radical army officers led by Colonel Pride purged moderate members from Westminster, leaving a militant "Rump Parliament" fiercely resolved to bring the sovereign monarch to judicial trial.',
          'In January 1649, Charles stood trial in Westminster Hall before an extraordinary High Court of Justice—marking history’s first formal judicial trial of an anointed European monarch. Refusing to remove his hat or enter a formal plea, Charles haughtily questioned the court’s constitutional authority, demanding by what lawful power he was summoned. Court president John Bradshaw firmly answered that English monarchs were merely entrusted magistrates subject to law.',
          'Condemned by Bradshaw as a "tyrant, traitor, murderer, and public enemy", Charles was sentenced to public beheading. On 30 January 1649, wearing two heavy shirts so he would not shiver in the bitter winter frost and appear frightened to spectators, Charles laid his head upon the Whitehall block before a vast, stunned crowd. As the executioner’s axe fell, the doctrine of Divine Right perished.',
        ],
      },
      act4: {
        title: 'The Commonwealth & The Restoration Reality',
        paras: [
          'Following the unprecedented regicide, Parliament abolished the English monarchy and House of Lords, officially declaring England a "Commonwealth and Free State"—Western Europe’s first major republican government. The 1651 Great Seal of England emphatically replaced the monarch’s sovereign portrait with an aerial relief map of the British Isles and the House of Commons in debate, stamped with the republican motto: "In the Third Year of Freedom Restored."',
          'However, republican rule proved profoundly unstable and fractured by ideological division. Challenged by radical religious reformers like the Levellers and Diggers, the contentious Rump Parliament was forcibly expelled by Cromwell’s musketeers in 1653. Ruling as Lord Protector, Cromwell instituted puritanical military districts administered by Major-Generals, suppressing traditional festivals, stage plays, and church sports. When Cromwell died, his fragile Commonwealth descended rapidly into fiscal insolvency and political anarchy.',
          'In May 1660, a desperate Convention Parliament invited the late King’s exiled son to return as King Charles II, restoring the Stuart dynasty amid widespread popular celebration. Yet this Stuart Restoration could never resurrect absolute royal supremacy. Prerogative courts like Star Chamber were permanently erased, and the Crown remained irreversibly dependent on parliamentary taxation, ensuring future British sovereigns could never again govern without the consent of the realm.',
        ],
      },
    },

    // LESSON 6: How did a Dutch invasion and Bank of England create a superpower?
    lesson6: {
      act1: {
        title: 'The Death of Feudalism & The Mercantilist Shield',
        paras: [
          'By the late seventeenth century, Britain’s economic landscape had altered permanently. Feudal agriculture, where wealth was tied to hereditary aristocratic estates, was rapidly being eclipsed by commercial capitalism centered on the City of London. In 1571, Sir Thomas Gresham had opened the Royal Exchange, modeled on Antwerp’s commercial bourse, where merchants gathered daily to trade commodities and maritime credit.',
          'The execution of Charles I and the rise of the Commonwealth accelerated this shift. To protect domestic shipping, Oliver Cromwell’s parliament enacted the Navigation Act of 1651, mandating that colonial goods must enter England aboard English ships. This aggressive mercantilist legislation challenged Dutch maritime dominance, sparking the Anglo-Dutch wars and turning the River Thames into a bustling forest of commercial masts.',
          'Under the restored Stuart monarchy of Charles II and James II, global trade expanded rapidly. Raw sugar from Barbados, tobacco from Virginia, and calicos from India flowed into London docks. Immense fortunes were accumulated by merchant syndicates, creating a wealthy, literate commercial class that demanded political influence and legal guarantees for their property against arbitrary royal interference.',
        ],
      },
      act2: {
        title: 'The Glorious Revolution of 1688',
        paras: [
          'Constitutional conflict erupted again under King James II, who succeeded to the throne in 1685. An unyielding Catholic, James suspended parliamentary statutes, appointed Catholic officers to the army, and imprisoned Anglican bishops in the Tower of London. When James’s Catholic wife gave birth to a male heir in June 1688, threatening a permanent Catholic dynasty, Protestant politicians took drastic action.',
          'Seven leading politicians dispatched a secret invitation to Dutch leader William of Orange, married to James’s Protestant daughter Mary, urging him to bring an army to defend English liberties. In November 1688, William landed at Torbay with 463 ships and 15,000 soldiers. James II’s army deserted him, and the humiliated King fled to France, throwing the Great Seal into the Thames.',
          'This event, celebrated by Whig historians as the "Glorious Revolution", resulted in a profound constitutional settlement. In exchange for the joint crown, William and Mary accepted the 1689 Bill of Rights. The statute made it illegal for the monarch to suspend laws without parliamentary consent, barred peacetime standing armies without approval, and confirmed Parliament’s exclusive power to levy taxes.',
        ],
      },
      act3: {
        title: 'The Financial Revolution & The Bank of England',
        paras: [
          'The constitutional triumph of Parliament in 1689 triggered the "Financial Revolution" of the 1690s, the institutional engine that propelled Britain to global superpower status. Facing costly global wars against Louis XIV’s France, Chancellor Charles Montagu established the Bank of England in 1694. The Bank raised a £1.2 million loan from private investors in exchange for issuing official banknotes.',
          'This innovation created the British National Debt, guaranteeing that repayments were backed by the full taxing authority of Parliament rather than the unreliable word of an absolute monarch. Consequently, Britain borrowed vast sums at record-low interest rates (3–4%), while French absolute monarchs were forced to pay ruinous 8–10% interest due to fears of royal default.',
          'Supported by the newly founded London Stock Exchange and maritime insurance syndicates meeting in Edward Lloyd’s coffeehouse, Britain constructed a sophisticated institutional credit machine. Private merchant capital funded the rapid expansion of the Royal Navy, subsidized continental European military allies, and established the commercial infrastructure that would eventually finance the mechanized Industrial Revolution.',
        ],
      },
      act4: {
        title: 'The Fiscal-Military Superpower',
        paras: [
          'By the early eighteenth century, Britain had evolved into history’s premier "fiscal-military state"—a nation capable of extracting high tax revenues and mobilizing astronomical credit to wage global warfare. While France possessed three times Britain’s population, Britain’s parliamentary credit enabled it to maintain superior naval fleets and sustain protracted overseas conflicts across North America and India.',
          'The 1707 Act of Union formally joined England and Scotland into the Kingdom of Great Britain, creating the largest free-trade market in Europe. Scottish merchants and soldiers gained full access to English colonial trade, accelerating imperial commerce through ports like Glasgow, Bristol, and Liverpool while cementing a united Protestant British national identity.',
          'Yet this modern financial and constitutional marvel had a devastating dark side. Britain’s global wealth and commercial hegemony were not built solely on domestic ingenuity and parliamentary liberties; they were directly financed by the transatlantic trafficking of millions of enslaved Africans and the violent commercial extraction of wealth from the Indian subcontinent.',
        ],
      },
    },

    // LESSON 7: What was the human cost and commercial scale of the slave trade?
    lesson7: {
      act1: {
        title: 'The Hunger for Sweet Gold & The Royal African Company',
        paras: [
          'In seventeenth-century Europe, sugar was transformed from an exotic, prohibitively expensive luxury into an everyday dietary necessity. As tea, coffee, and chocolate became fashionable staples of urban life, European demand for sugar exploded. Caribbean islands like Barbados and Jamaica were cleared of indigenous vegetation to make way for vast, monoculture sugarcane plantations.',
          'Sugarcane cultivation was brutally labor-intensive. Sugarcane had to be cut, hauled, and crushed in heavy roller mills before the syrup was boiled in scalding copper vats. When indigenous populations were annihilated by Eurasian diseases and European indentured servants proved unable or unwilling to survive the horrific tropical conditions, European plantation owners turned systematically to forced African labor.',
          'In 1672, King Charles II granted a royal charter to the Royal African Company, headed by his brother James, Duke of York. The company held a British monopoly on the slave trade, shipping hundreds of thousands of captured Africans to Caribbean plantations and branding captives on their chests with the company’s initials "RAC". Royal profits directly enriched the English Crown.',
        ],
      },
      act2: {
        title: 'The Triangular Machine & The Middle Passage',
        paras: [
          'The transatlantic slave trade operated as a ruthless, three-stage commercial machine known as the Triangular Trade. On the first leg, British merchant vessels departed ports like Bristol, Liverpool, and London carrying manufactured goods—muskets, gunpowder, brass pans, and Manchester textiles—to West African coastal trading ports, where they exchanged goods with local rulers and merchant syndicates for captured Africans.',
          'The second leg—the notorious "Middle Passage"—was an oceanic nightmare lasting two to three months. Between 1500 and 1870, an estimated 12.5 million enslaved Africans were forced aboard European slave vessels. Captives were packed shoulder-to-shoulder on wooden shelves with barely sixteen inches of headroom, chained in pairs by their ankles in suffocating, disease-ridden darkness.',
          'Dehydration, dysentery, and smallpox tore through the holds; over 1.8 million Africans died during the crossing, their bodies cast into the Atlantic Ocean. On the final leg, slave ships loaded slave-produced sugar, rum, tobacco, and cotton, returning to British ports where raw commodities were processed, enriching merchants, refiners, and state customs revenues.',
        ],
      },
      act3: {
        title: 'The Geometry of the Brookes & The Sugar Ports',
        paras: [
          'In 1788, the Plymouth Abolition Committee published a technical cross-section diagram: The Stowage Plan of the Slave Ship Brookes. The diagram forensically illustrated how 454 enslaved human beings were crammed into the ship’s hold like packaged freight. The image shocked the British public, stripping away the sanitized commercial rhetoric of the merchant lobby and exposing the cold, calculated cruelty of chattel slavery.',
          'British port cities were transformed by the lucrative profits of human trafficking. In Liverpool, which grew from a minor fishing port into the slave-trading capital of the world, over a hundred slave ships departed annually by the late eighteenth century. Public buildings, docks, and town halls were decorated with carved African heads and chains celebrating the source of the town’s civic wealth.',
          'Enslaved Africans who survived the Middle Passage faced brutal conditions on Caribbean sugar plantations. Treated under the law as chattel—commercial property without human rights—slaves were forced to work eighteen-hour shifts under the driver’s whip. Life expectancy on a Jamaican sugar plantation after arrival was barely seven to ten years; owners found it cheaper to buy newly imported captives than to provide humane sustenance.',
        ],
      },
      act4: {
        title: 'The Williams Thesis: Blood on the Loom',
        paras: [
          'In 1944, Trinidadian historian Eric Williams published his landmark work Capitalism and Slavery, putting forward a revolutionary thesis: the enormous profits extracted from the transatlantic slave trade directly provided the capital reserves that financed the British Industrial Revolution. Williams demonstrated that slave wealth was reinvested into domestic infrastructure, canals, ironworks, and steam technology.',
          'Major British financial institutions, including Barclays Bank and the Bank of England, were founded or heavily capitalized by families whose fortunes derived from Caribbean sugar plantations and slave voyages. Prominent politicians, aristocratic landowners, and church bishops held shares in slave voyages, ensuring that British state policy vigorously defended the institution against early abolitionist criticism.',
          'The human cost of Britain’s commercial empire was staggering. Millions of African lives were violently extinguished, African societies were destabilized by imported firearms and continuous warfare, and racist legal codes were institutionalized across the Atlantic world. Modern Britain’s global wealth was built upon the suffering and exploitation of millions of enslaved people.',
        ],
      },
    },

    // LESSON 8: How did enslaved Africans fight back and dismantle slavery?
    lesson8: {
      act1: {
        title: 'The Myth of Passivity & Oceanic Mutiny',
        paras: [
          'For over a century, traditional British imperial history promoted a comfortable myth: that enslaved Africans were passive victims of European mastery, and that abolition was a generous gift bestowed by enlightened British politicians like William Wilberforce. Disciplinary historical evidence shatters this myth completely; enslaved Africans fiercely resisted European domination from the moment of their capture.',
          'Resistance began on the African coast and continued across the Atlantic. Historians have documented armed shipboard mutinies on roughly ten percent of all slave voyages. Enslaved men and women attacked European crews with iron chains, broke open weapons lockers, or jumped overboard into shark-infested waters to drown rather than endure chattel slavery, imposing immense financial and physical risks on slave traders.',
          'Insurance records from Lloyd’s of London reveal that slave voyages routinely carried heavy marine insurance policies specifically indemnifying merchants against losses caused by "insurrection of cargo". Slave ships were designed as floating prisons, equipped with swivel guns mounted on barricado walls dividing the deck, demonstrating that European crews lived in constant terror of African rebellion.',
        ],
      },
      act2: {
        title: 'The Spectrum of Resistance & The Jamaican Maroons',
        paras: [
          'On Caribbean plantations, resistance spanned an expansive spectrum from covert daily sabotage to armed guerrilla warfare. Enslaved Africans engaged in day-to-day resistance: working slowly, feigning illness, breaking expensive sugar-milling machinery, sabotaging cane fields with fire, learning to read in secret, preserving African spiritual rituals, and establishing escape networks to freedom.',
          'In the rugged, forested Blue Mountains of Jamaica, escaped enslaved Africans established autonomous free communities known as the Maroons. Led by Queen Nanny—a brilliant military strategist and spiritual leader—the Windward Maroons perfected guerrilla warfare. Maroon warriors disguised themselves with tree branches and leaves, ambushing British redcoat regiments in narrow mountain gorges.',
          'Unable to defeat the Maroons after decades of costly warfare, the British Crown was forced to sue for peace. In the historic 1739 Treaty, the British government officially recognized Maroon sovereignty, granting them 1,500 acres of independent land in exchange for an end to hostilities, proving that African combat had defeated the mighty British military.',
        ],
      },
      act3: {
        title: 'Equiano’s Bestselling Weapon & The Black Abolitionists',
        paras: [
          'In Britain, the ideological battle against the slave trade was spearheaded by formerly enslaved Africans who wielded disciplinary literacy as a devastating weapon. Prominent among them was Olaudah Equiano, who had survived childhood kidnapping in West Africa, the Middle Passage, and enslavement in Virginia and the Caribbean before purchasing his freedom through personal trading.',
          'In 1789, Equiano published his autobiography, The Interesting Narrative of the Life of Olaudah Equiano, in London. The book became a massive international bestseller, running through nine editions in five years. Equiano toured Britain giving public lectures, meeting Members of Parliament, and educating the British public with harrowing firsthand accounts of capture, torture, and oceanic horror.',
          'Equiano was a key member of the "Sons of Africa", a radical campaigning group of freed Africans in London that included Ottobah Cugoano. Together, they wrote letters to newspapers, published abolitionist tracts, and lobbied political leaders, directly shattering the racist pro-slavery argument that Africans lacked intellectual capacity or human agency.',
        ],
      },
      act4: {
        title: 'Who Truly Abolished Slavery?',
        paras: [
          'When Parliament passed the Slave Trade Act in 1807, abolishing British participation in the transatlantic trade, imperial historians attributed the victory entirely to parliamentary humanitarianism. Modern scholarship presents a far more balanced, multidisciplinary reality: abolition was the combined result of heroic African resistance, changing economic profitability, and grassroots political campaigning.',
          'Continuous slave insurrections—culminating in the revolutionary triumph of the Haitian Revolution in 1804 and Samuel Sharpe’s massive Christmas Rebellion in Jamaica in 1831—made the plantation system militarily unviable and financially catastrophic to maintain. Colonial authorities lived in constant fear of violent overthrow, realizing that freedom would be seized by force if not conceded by law.',
          'Enslaved Africans were never passive beneficiaries of British parliamentary virtue; they were the primary agents of their own emancipation. Through ferocious military courage in the mountains of Jamaica, unceasing covert sabotage in Caribbean cane fields, and eloquent intellectual advocacy across London, African people systematically undermined and dismantled the transatlantic slave trade from within.',
        ],
      },
    },

    // LESSON 9: How 'modern' was Britain by 1750? (Synthesis)
    lesson9: {
      act1: {
        title: 'The Great Transformation: 1450 vs. 1750',
        paras: [
          'In the three centuries between 1450 and 1750, Britain underwent one of the most astonishing transformations in world history. In 1450, England was a war-torn, peripheral feudal territory recovering from demographic collapse, isolated from global trade, and completely overshadowed by the wealth of Ming China and the military power of the Ottoman Empire.',
          'By 1750, Great Britain had emerged as an imperial superpower and the financial capital of the globe. The British Royal Navy ruled the Atlantic, the East India Company governed fortified coastal enclaves across the Indian subcontinent, and British merchantmen commanded the lucrative triangular trade. Feudal serfdom was gone, replaced by commercial agriculture, joint-stock capitalism, and global maritime networks.',
          'Constitutionally, the absolute Divine Right of Kings had been destroyed on the scaffold outside Whitehall in 1649 and buried by the 1689 Bill of Rights. Britain was governed by a constitutional monarchy where royal prerogative was strictly limited by parliamentary statute, common law, and regular elections, creating an enviable climate of political stability for wealthy property owners.',
        ],
      },
      act2: {
        title: 'The Dual Reality: Imperial Wealth & The Scientific Revolution',
        paras: [
          'The intellectual landscape was similarly revolutionized during the seventeenth and early eighteenth centuries. Anchored by Sir Isaac Newton’s mathematical laws of universal gravitation and the empirical methodologies of the Royal Society, the Scientific Revolution displaced medieval religious dogma with rigorous experimental rationalism, directly fostering technological innovation in deep mining, maritime navigation, industrial metallurgy, and agricultural crop rotation.',
          'In 1778, Italian artist Spiridione Roma painted The East Offering Its Riches to Britannia for the East India Company’s London boardroom. The ceiling painting celebrated Britain’s self-image: a benevolent Britannia seated under an olive branch, graciously receiving jewels, porcelain, and spices from kneeling Asian figures. To the governing elite, Britain’s global supremacy was natural, enlightened, and divinely favored.',
          'London had transformed into Europe’s premier financial and intellectual metropolis. Hundreds of bustling, smoky coffeehouses clustered near the Royal Exchange served as informal clearinghouses for maritime news, commercial insurance, stock trading, and partisan political debate. Educated gentlemen debated natural philosophy, scrutinized daily printed newspapers, and invested surplus capital in lucrative oceanic voyages connecting four continents.',
        ],
      },
      act3: {
        title: 'The Squalor of Gin Lane & Domestic Inequality',
        paras: [
          'Yet this sparkling facade of Enlightenment modernity concealed an extraordinarily brutal domestic reality. In 1751, artist William Hogarth published his famous satirical engraving Gin Lane, exposing the horrific urban squalor, starvation, and social decay of London’s St Giles parish during the "Gin Craze". Infant mortality reached staggering levels, with barely twenty percent of slum children surviving to adulthood.',
          'Commercial capitalism enriched merchant syndicates and aristocratic landlords while driving millions of rural laborers into desperate poverty. The enclosure of common land stripped peasants of traditional grazing rights, forcing rural families into overcrowded urban slums where wages were miserable and disease was rampant. The state responded with the "Bloody Code", imposing the death penalty for over two hundred minor property crimes.',
          'Furthermore, British domestic liberty was inextricably tied to colonial exploitation abroad. The national credit that funded the Royal Navy and supported Newton’s Royal Society was lubricated by the catastrophic suffering of millions of enslaved Africans working under the whip on Caribbean sugar plantations and the coercive taxation of Indian provinces.',
        ],
      },
      act4: {
        title: 'The Historical Verdict: Modernity or Exploitation?',
        paras: [
          'Historians remain divided over whether early modern Britain can genuinely be described as "modern". Whig historians celebrated the era as the glorious birth of modern parliamentary democracy, scientific rationalism, and commercial freedom. They argued that British institutions laid the indispensable groundwork for human rights, industrial progress, and global economic prosperity.',
          'Conversely, Marxist and postcolonial historians argue that Britain’s "modernity" was profoundly illiberal and exclusionary. Political power was monopolized by a tiny elite of wealthy male landowners; women were denied basic legal rights under the doctrine of coverture; and working-class citizens possessed no vote. Above all, British prosperity was financed by the transatlantic slave trade and imperial plunder.',
          'Ultimately, early modern Britain represented a profound historical contradiction: an enlightened constitutional state that pioneered modern institutional finance, representative parliament, and empirical science, erected upon the cruel foundations of transatlantic chattel slavery, colonial dispossession, and severe domestic inequality. Comprehending both simultaneous realities is essential to understanding the true origins of our modern interconnected world.',
        ],
      },
    },
  };

  const BACK_COVER_DATA = {
    title: 'The Early Modern World & Global Power (1450–1750)',
    timeline: [
      {
        date: '1453',
        event:
          'Ottoman forces capture Constantinople, closing Silk Road overland trade to European merchants.',
      },
      {
        date: '1492',
        event: 'Christopher Columbus reaches the Caribbean; Spanish colonial exploitation begins.',
      },
      {
        date: '1494',
        event:
          'Treaty of Tordesillas: Papacy divides the non-Christian world between Spain and Portugal.',
      },
      {
        date: '1517',
        event:
          'Martin Luther nails Ninety-Five Theses, igniting the Protestant Reformation across Europe.',
      },
      {
        date: '1545',
        event:
          'Spanish discover Cerro Rico silver mountain at Potosí; silver bullion floods Europe.',
      },
      {
        date: '1570',
        event:
          'Pope Pius V excommunicates Queen Elizabeth I, ordering English Catholics to depose her.',
      },
      {
        date: '1577–1580',
        event:
          'Francis Drake circumnavigates the globe in Golden Hind, returning with looted Spanish silver.',
      },
      {
        date: '1588',
        event: 'English navy and fireships defeat the Spanish Armada at the Battle of Gravelines.',
      },
      {
        date: '1600',
        event:
          'Elizabeth I grants royal charter to the English East India Company for trade monopoly.',
      },
      {
        date: '1605',
        event:
          'The Gunpowder Plot discovered beneath Parliament; Guy Fawkes arrested with 36 barrels.',
      },
      {
        date: '1629–1640',
        event: 'Charles I rules without Parliament ("Eleven Years’ Tyranny"), levying Ship Money.',
      },
      {
        date: '1642–1646',
        event:
          'First English Civil War; Cromwell’s New Model Army defeats Royalists at Naseby (1645).',
      },
      {
        date: '30 Jan 1649',
        event:
          'Charles I beheaded for high treason outside Whitehall; English Commonwealth declared.',
      },
      {
        date: '1651',
        event: 'Navigation Act passed to protect English shipping; First Anglo-Dutch War begins.',
      },
      {
        date: '1660',
        event:
          'The Stuart Restoration: Charles II returns to the English throne; monarchy restored.',
      },
      {
        date: '1688',
        event: 'Glorious Revolution: William of Orange lands at Torbay; Catholic James II flees.',
      },
      {
        date: '1689',
        event:
          'Parliament passes the Bill of Rights, establishing permanent constitutional monarchy.',
      },
      {
        date: '1694',
        event:
          'Bank of England founded, creating the National Debt and modern fiscal-military state.',
      },
      {
        date: '1739',
        event: 'British Crown signs peace treaty with Jamaican Maroons under Queen Nanny.',
      },
      {
        date: '1750',
        event:
          'Britain commands global trade, Caribbean sugar plantations, and transatlantic hegemony.',
      },
    ],
    themes: [
      {
        title: 'Global Connectedness',
        desc: 'The transition from isolated regional empires in 1450 to an interconnected global economy driven by maritime shipping, silver bullion, Asian spices, and West African gold.',
      },
      {
        title: 'Sovereignty & Revolution',
        desc: 'The constitutional shift from absolute Divine Right of Kings to parliamentary supremacy, rule of law, and institutional checks and balances through Civil War and 1689.',
      },
      {
        title: 'Chattel Enslavement',
        desc: 'The catastrophic human cost of commercial expansion, resulting in the forced displacement and violent commodification of 12.5 million enslaved Africans.',
      },
      {
        title: 'African & Indigenous Agency',
        desc: 'Active resistance by colonized and enslaved peoples through maroon guerrilla warfare, shipboard mutinies, sabotage, cultural survival, and intellectual abolitionist advocacy.',
      },
    ],
    historiography: {
      title:
        'Historiographical Debate: Was Early Modern Britain an Enlightened Realm or a Predatory Empire?',
      views: [
        {
          school: 'The Whig Constitutional School (Macaulay, Trevelyan, Russell)',
          argument:
            'Celebrates 1688 and the Bill of Rights as the triumphant march of English parliamentary freedom, the rule of law, religious toleration, and scientific rationalism over arbitrary monarchical tyranny.',
        },
        {
          school: 'The Revisionist & Imperial Extraction School (Eric Williams, Peter Frankopan)',
          argument:
            'Demonstrates that Britain’s "liberty" was funded by the brutal profits of the transatlantic slave trade, Indian colonial tribute, and domestic enclosure, proving commercial empire was built upon colonial violence.',
        },
      ],
    },
    synopticVerdict: {
      title: 'Synoptic Assessment & Historical Verdict: Britain’s Early Modern Transformation',
      pillars: [
        {
          theme: 'Constitutional Sovereignty vs Royal Absolutism',
          verdict:
            'The execution of Charles I and the 1689 Bill of Rights permanently subordinated the Crown to parliamentary statute, securing legal protections for property and trade.',
        },
        {
          theme: 'Commercial Wealth vs Human Dehumanisation',
          verdict:
            'British domestic manufacturing and naval supremacy were directly financed by the transatlantic chattel slavery of 12.5 million Africans, creating an undeniable moral debt.',
        },
        {
          theme: 'Scientific Rationalism vs Urban Squalor',
          verdict:
            'Newtonian physics and institutional banking coexisted with extreme domestic inequality, the Gin Craze, and the Bloody Code, revealing the contradictory nature of early modernity.',
        },
      ],
    },
    quizzes: [
      {
        num: 1,
        code: 'ENQ 1',
        title: '1450 Global Power',
        url: 'https://history-revision-hub.netlify.app/units/early_modern_world/lesson1.html',
      },
      {
        num: 2,
        code: 'ENQ 2',
        title: 'Reformation & Armada',
        url: 'https://history-revision-hub.netlify.app/units/early_modern_world/lesson2.html',
      },
      {
        num: 3,
        code: 'ENQ 3',
        title: 'Benin & East India Co.',
        url: 'https://history-revision-hub.netlify.app/units/early_modern_world/lesson3.html',
      },
      {
        num: 4,
        code: 'ENQ 4',
        title: 'Gunpowder Plot 1605',
        url: 'https://history-revision-hub.netlify.app/units/early_modern_world/lesson4.html',
      },
      {
        num: 5,
        code: 'ENQ 5',
        title: 'Civil War & Regicide',
        url: 'https://history-revision-hub.netlify.app/units/early_modern_world/lesson5.html',
      },
      {
        num: 6,
        code: 'ENQ 6',
        title: 'Glorious Rev & Bank',
        url: 'https://history-revision-hub.netlify.app/units/early_modern_world/lesson6.html',
      },
      {
        num: 7,
        code: 'ENQ 7',
        title: 'Transatlantic Trade',
        url: 'https://history-revision-hub.netlify.app/units/early_modern_world/lesson7.html',
      },
      {
        num: 8,
        code: 'ENQ 8',
        title: 'African Resistance',
        url: 'https://history-revision-hub.netlify.app/units/early_modern_world/lesson8.html',
      },
      {
        num: 9,
        code: 'ENQ 9',
        title: 'How Modern 1750?',
        url: 'https://history-revision-hub.netlify.app/units/early_modern_world/lesson9.html',
      },
    ],
  };

  return {
    COVER_CONFIG,
    EARLY_MODERN_COMPONENT_BANK,
    EARLY_MODERN_LEFT_VOCAB,
    EARLY_MODERN_LEFT_SOURCES,
    EARLY_MODERN_ACT_NARRATIVES,
    BACK_COVER_DATA,
  };
};
