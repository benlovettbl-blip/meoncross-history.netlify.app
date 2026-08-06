const fs = require('fs');

const content = fs.readFileSync('early_modern_world/data.js', 'utf8');
const jsonStr = content.replace('export const unitData = ', '').trim().replace(/;$/, '');
const unit = eval('(' + jsonStr + ')');

const map = {
  '/images/early_mod_l1_banner.jpg': {
    alt: 'Catalan Atlas (1375) - Mansa Musa',
    caption: "Detail from the Catalan Atlas (1375) by Abraham Cresques. It depicts Mansa Musa, the wealthy ruler of the Mali Empire, holding a gold coin, illustrating West Africa's vast gold reserves and its integration into medieval global trade networks."
  },
  '/images/global_canton.jpg': {
    alt: 'View of the Thirteen Factories in Canton (c. 1800)',
    caption: "An early 19th-century painting by an unknown Chinese artist showing the Thirteen Factories in Canton (Guangzhou). This was the only area where foreign merchants (including the British East India Company) were permitted to trade with Qing dynasty China."
  },
  '/images/ottoman_1453.jpg': {
    alt: 'Fresco of the Siege of Constantinople (1537)',
    caption: "A 1537 fresco from the Moldovița Monastery in Romania depicting the 1453 Siege of Constantinople. The fall of the city to the Ottoman Turks severely disrupted European access to the Silk Road, forcing Christian nations to seek alternative maritime routes to Asia."
  },
  '/images/benin_bronze.jpg': {
    alt: '16th-Century Benin Bronze Plaque',
    caption: "A 16th-century brass plaque from the Kingdom of Benin (modern-day Nigeria). Crafted by the Edo people, such plaques decorated the royal palace of the Oba. They demonstrate the highly advanced metallurgical skills and complex societal structure of West African kingdoms prior to European colonization."
  },
  '/images/silk_road.jpg': {
    alt: 'Map of the Silk Road Trade Routes',
    caption: "A modern historical map illustrating the vast network of Eurasian trade routes known as the Silk Road. Before 1450, these overland routes were the primary arteries for luxury goods, spices, and technologies flowing from Asia into the Mediterranean."
  },
  '/images/early_mod_l2_banner.jpg': {
    alt: 'Map of the Spanish Armada Route (1588)',
    caption: "An expedition map showing the route of the Spanish Armada in 1588. King Philip II of Spain launched the massive fleet to overthrow the Protestant Queen Elizabeth I, but it was defeated by English naval tactics and severe storms."
  },
  '/images/francis_drake.jpg': {
    alt: 'Portrait of Sir Francis Drake (1591)',
    caption: "Portrait of Sir Francis Drake (1591), attributed to Marcus Gheeraerts the Younger. Drake was an English privateer whose raiding of Spanish treasure ships and successful circumnavigation of the globe (1577–1580) helped transform England into a formidable maritime power."
  },
  '/images/global_mercator.jpg': {
    alt: 'Mercator World Map (1569)',
    caption: "The 1569 world map by Gerardus Mercator. His revolutionary cylindrical projection allowed sailors to chart courses as straight lines, greatly facilitating the explosive growth of global European navigation and exploration."
  },
  '/images/martin_luther_portrait.jpg': {
    alt: 'Portrait of Martin Luther (1529)',
    caption: "Portrait of Martin Luther by Lucas Cranach the Elder (1529). Luther was a German monk whose 1517 Ninety-five Theses sparked the Protestant Reformation, permanently shattering the religious unity of Western Europe and triggering decades of conflict."
  },
  '/images/tordesillas_map_new.png': {
    alt: 'Map of the Treaty of Tordesillas (1494)',
    caption: "A historical map depicting the Line of Demarcation established by the Treaty of Tordesillas in 1494. Blessed by the Pope, it audaciously divided the newly discovered non-Christian world exclusively between the rival Catholic powers of Spain and Portugal."
  },
  '/images/armada_portrait.jpg': {
    alt: 'The Armada Portrait of Queen Elizabeth I (c. 1588)',
    caption: "The Armada Portrait of Queen Elizabeth I (c. 1588), attributed to George Gower. The Queen rests her hand on a globe, symbolizing England's rising imperial ambitions, while the background depicts the miraculous defeat of the Spanish Armada."
  },
  'Panoramic painting of the Fort St. George at Madras (Chennai) or the East India Company docks at Surat.': {
    url: '/images/early_mod_l3_banner.jpg',
    alt: 'East India Company Fort St. George',
    caption: "Historical depiction representing the early colonial trading outposts established by the East India Company in the 17th century, serving as highly fortified bases for securing lucrative spice and textile monopolies."
  },
  '/images/pocahontas.jpg': {
    alt: 'Engraving of Pocahontas (1616)',
    caption: "A 1616 engraving of Matoaka (Pocahontas) by Simon van de Passe. She was dressed in English court fashion and presented to London society as 'Lady Rebecca'—a deliberate piece of propaganda by the Virginia Company to project success and secure financial investment for the struggling Jamestown colony."
  },
  '/images/sir_thomas_roe.jpg': {
    alt: 'Sir Thomas Roe at the Mughal Court (1615)',
    caption: "A depiction of Sir Thomas Roe, an English diplomat, presenting his credentials to the powerful Mughal Emperor Jahangir in 1615. Roe successfully negotiated exclusive trading rights for the East India Company, laying the foundation for British dominance in India."
  },
  '/images/jamestown_fort.jpg': {
    alt: 'Plan of James Fort in Virginia (1607)',
    caption: "A historical plan of the triangular James Fort built in 1607. It was the first permanent English settlement in the Americas, heavily fortified to defend against both the indigenous Powhatan Confederacy and potential attacks from rival Spanish ships."
  },
  '/images/early_mod_l4_banner.jpg': {
    alt: 'Coat of Arms of Great Britain (1714)',
    caption: "The Coat of Arms of Great Britain following the Hanoverian succession in 1714. This era saw the stabilization of a constitutional monarchy where Parliament, rather than the King, held ultimate financial and political authority."
  },
  '/images/charles_i_execution.jpg': {
    alt: 'Execution of King Charles I (1649)',
    caption: "A contemporary engraving by John Weesop depicting the execution of King Charles I outside the Banqueting House in Whitehall, 1649. His trial and execution for high treason marked a radical shift in power, proving that an English monarch could be held legally accountable by his own subjects."
  },
  '/images/royal_exchange.jpg': {
    alt: 'The Royal Exchange, London (1644)',
    caption: "An engraving of the Royal Exchange in London by Wenceslaus Hollar (1644). Established as a center for commerce, it became the beating heart of England's financial revolution, where merchants traded stocks, commodities, and funded global colonial ventures."
  },
  '/images/oliver_cromwell.jpg': {
    alt: 'Portrait of Oliver Cromwell (1656)',
    caption: "Portrait of Oliver Cromwell by Samuel Cooper (1656). Following the English Civil War, Cromwell ruled as Lord Protector of the Commonwealth, enforcing strict Puritan values and aggressively expanding English naval power."
  },
  '/images/sources/east_india_docks.jpg': {
    alt: 'East India Company Docks (c. 1730)',
    caption: "An 18th-century painting by Samuel Scott depicting the bustling East India Company docks in London. The immense volume of imported global goods transformed London into the wealthiest maritime trading hub in the world."
  },
  'The horizontal fold-out cross-section diagram of the Slave Ship Brooks (1788).': {
    url: '/images/early_mod_l5_banner.jpg',
    alt: 'Diagram of the Slave Ship Brookes (1788)',
    caption: "The infamous 1788 abolitionist poster showing a cross-section of the slave ship Brookes. It vividly exposed the horrific overcrowding and inhumane conditions enslaved Africans endured during the brutal Middle Passage, galvanizing public outrage in Britain."
  },
  '/images/jamaica_maroons.jpg': {
    alt: 'Map of Jamaica (1775)',
    caption: "A 1775 map of Jamaica by Thomas Jefferys. The island's rugged, mountainous interior provided sanctuary for Maroon communities—escaped enslaved Africans who waged a highly successful, decades-long guerrilla war against British colonial forces."
  },
  '/images/triangular_trade.png': {
    alt: 'Diagram of the Triangular Trade',
    caption: "A map illustrating the Triangular Trade system. British manufactured goods were traded for enslaved Africans, who were transported under horrific conditions to the Americas to produce cash crops like sugar and tobacco, which were then shipped back to Europe."
  },
  '/images/equiano.jpg': {
    alt: 'Portrait of Olaudah Equiano (1789)',
    caption: "Frontispiece portrait of Olaudah Equiano from his 1789 autobiography. As a formerly enslaved man who purchased his own freedom, his vivid first-hand account of the horrors of slavery became a crucial piece of evidence in the British abolitionist movement."
  },
  '/images/brookes_ship.jpg': {
    alt: 'Diagram of the Slave Ship Brookes (1788)',
    caption: "The infamous 1788 abolitionist poster showing a cross-section of the slave ship Brookes. It vividly exposed the horrific overcrowding and inhumane conditions enslaved Africans endured during the brutal Middle Passage."
  },
  '/images/early_mod_l6_banner.jpg': {
    alt: 'London Bridge from St Olaf Stairs (1632)',
    caption: "A 1632 painting by Claude de Jongh showing London Bridge. By the 18th century, the River Thames was choked with global merchant shipping, reflecting London's explosion in population and its status as the center of a global empire."
  },
  '/images/gin_lane.jpg': {
    alt: "William Hogarth's Gin Lane (1751)",
    caption: "William Hogarth's 1751 engraving 'Gin Lane' depicts the horrifying social decay, poverty, and alcohol addiction rampant in 18th-century London slums. Hogarth created this print as a direct piece of propaganda to support the Gin Act, seeking to reduce the mass consumption of cheap spirits."
  },
  '/images/global_britannia.jpg': {
    alt: 'The East Offering its Riches to Britannia (1778)',
    caption: "A 1778 ceiling painting by Spiridione Roma titled 'The East Offering its Riches to Britannia,' commissioned for the East India Company headquarters. It is a prime example of imperial propaganda, portraying Britain as a majestic and benevolent ruler receiving willing global tribute."
  },
  '/images/turnpike_map.jpg': {
    alt: "John Rocque's Map of London (1746)",
    caption: "A detail from John Rocque's highly accurate 1746 Map of London. It highlights the rapid urban sprawl and the complex network of turnpike roads required to supply the massive, booming population of the capital during the early Industrial Revolution."
  }
};

unit.lessons.forEach(l => {
  let sourceIndex = 0;
  l.narrative_blocks.forEach(b => {
    if (b.images) {
      b.images.forEach(img => {
        let key = img.src || img.image;
        if (map[key]) {
          if (map[key].url) img.src = map[key].url;
          img.image_alt = map[key].alt;
          img.image_caption = map[key].caption;
        } else {
           console.log("Not found in map:", key);
        }
        img.source_letter = String.fromCharCode(65 + sourceIndex);
        sourceIndex++;
      });
    } else if (b.image) {
      let key = b.image;
      if (map[key]) {
        if (map[key].url) b.image = map[key].url;
        b.image_alt = map[key].alt;
        b.image_caption = map[key].caption;
      } else {
         console.log("Not found in map:", key);
      }
      b.source_letter = String.fromCharCode(65 + sourceIndex);
      sourceIndex++;
    }
  });
});

const output = 'export const unitData = ' + JSON.stringify(unit, null, 2) + ';\n';
fs.writeFileSync('early_modern_world/data.js', output, 'utf8');
console.log('Successfully updated early_modern_world/data.js');
