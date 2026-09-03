const fs = require('fs');

const answersMap = {
  "Identify how Iron Age communities managed their waste.": "Iron Age communities usually lived near natural water sources such as rivers or springs. However, as settlements grew into towns, these natural sources became polluted or insufficient, leading to the need for engineered water systems.",
  "Describe the purpose of Roman conduits and aqueducts.": "Roman conduits and aqueducts were engineered to transport fresh, clean water from distant springs directly into towns and cities, providing a constant supply for public fountains, bathhouses, and private homes of the wealthy.",
  "Enquiry: How does this source demonstrate both the advancements and limitations of Roman public health?": "The source demonstrates advancement through its complex engineering, showing a sophisticated lead pipe system (plumbing) that supplied fresh water. However, it shows limitations because such advanced plumbing was a luxury reserved exclusively for the homes of wealthy elites, leaving the poor majority to rely on public fountains and less hygienic conditions.",
  "Based on what you have learned about Roman sanitation, why do you think a wealthy palace like Fishbourne would have its own private bathhouse and hypocaust system, while ordinary Romano-British people did not?": "A private bathhouse and hypocaust (underfloor heating) required immense resources, engineering skill, and slave labor to maintain the fires. Only the wealthiest elites, like the owner of Fishbourne Palace, could afford this level of luxury, while ordinary Romano-Britons lived in simple roundhouses and relied on communal Roman baths in nearby towns.",
  "How does the archaeological evidence at Fishbourne support the idea that elite Romans valued hygiene and comfort?": "The ruins at Fishbourne reveal extensive plumbing for fresh water and a sophisticated hypocaust heating system. This proves that wealthy elites went to great lengths and expense to ensure they had access to hot, clean water for daily bathing and comfortable living conditions, a hallmark of Roman civilization.",
  "Explain how bathhouses and latrines improved public health in Roman towns.": "<strong>Point 1: Hygiene and Cleanliness</strong><br>Bathhouses provided cheap, regular access to hot and cold baths for the public, which drastically improved personal hygiene and reduced skin diseases and pests like lice.<br><br><strong>Point 2: Waste Management</strong><br>Public latrines were often built over flowing water (sometimes the wastewater from the baths), meaning human waste was continuously flushed away into underground sewers, keeping the streets cleaner.<br><br><strong>Point 3: Social Hubs</strong><br>Beyond hygiene, bathhouses served as crucial social and exercise centers, promoting overall well-being and a sense of civilized community in Roman towns.",
  "Enquiry: According to Seneca, what does this source reveal about the social and commercial atmosphere inside a Roman bathhouse?": "Seneca's description reveals that the bathhouse was far more than just a place to wash. It was a loud, chaotic, and vibrant social hub filled with people exercising, getting massages, and vendors loudly selling food and drinks, demonstrating its central role in daily Roman life.",
  "Evaluate the impact of the Roman withdrawal on Britain's sanitation.": "The Roman withdrawal had a catastrophic impact on Britain's sanitation. The complex infrastructure of aqueducts, sewers, and bathhouses quickly fell into ruin because the Anglo-Saxons lacked the engineering knowledge and centralized government required to maintain them, returning Britain to primitive, unhygienic living conditions.",
  "Identify the main method of waste disposal in medieval villages like Wharram Percy.": "In medieval villages like Wharram Percy, the main method of waste disposal was using simple cesspits dug in the garden, or throwing waste directly onto a midden (rubbish heap) to be used later as fertilizer for the fields.",
  "Describe the sanitation facilities found in medieval monasteries like Canterbury Priory.": "Medieval monasteries often had highly advanced sanitation facilities compared to towns. They built complex systems of lead pipes to bring in fresh spring water, settling tanks to purify it, and built their latrines ('reredorters') over running streams to automatically flush waste away.",
  "Enquiry: What does this highly detailed plumbing plan suggest about the role of monasteries in preserving public health during the Medieval era?": "The detailed plumbing plan of Canterbury Priory suggests that monasteries were the primary preservers of Roman-style engineering and public health knowledge. Unlike the chaotic towns, monks possessed the wealth, literacy, and organizational skills necessary to build and maintain sophisticated, hygienic water systems.",
  "How does the water management system at Titchfield Abbey support the idea that monasteries were much healthier places to live than Medieval towns?": "Titchfield Abbey used an advanced system of fishponds, conduits, and running streams to ensure a constant supply of fresh water and effective waste removal. This separation of clean drinking water from sewage meant monks rarely suffered from the waterborne diseases that constantly ravaged the overcrowded, filthy medieval towns.",
  "Explain why overcrowded medieval towns faced a filtration crisis.": "<strong>Point 1: Population Density</strong><br>As towns grew rapidly inside defensive walls, houses were built close together, meaning cesspits were dug far too close to the shallow wells used for drinking water.<br><br><strong>Point 2: Permeable Soil</strong><br>Most cesspits were unlined, allowing raw human sewage to filter directly through the soil and contaminate the town's groundwater and drinking wells.<br><br><strong>Point 3: Lack of Infrastructure</strong><br>Unlike monasteries or Roman cities, medieval towns lacked centralized sewers or piped water, leaving them entirely reliant on these easily contaminated local sources, leading to deadly outbreaks of dysentery.",
  "Explain the role of gongfermers in medieval towns.": "Gongfermers played a crucial, albeit unpleasant, role in medieval towns by manually emptying overflowing cesspits during the night. They shoveled the human waste into carts and transported it outside the town walls to be sold as fertilizer, helping to prevent the towns from completely drowning in their own filth.",
  "Evaluate the significance of Edward III's cleanliness mandate in 1349.": "Edward III's 1349 mandate to clean the streets was significant as an early example of state intervention in public health. However, its effectiveness was severely limited because it was a desperate reaction to the Black Death based on the incorrect 'miasma' theory (bad air), and the king provided no funding or permanent infrastructure to actually solve the sanitation crisis.",
  "Identify who invented the first flushing water closet.": "The first flushing water closet was invented by Sir John Harington in 1596.",
  "Enquiry: Why do you think this brilliant invention failed to catch on in Early Modern Britain despite its obvious sanitary benefits?": "Harington's flushing toilet failed to catch on because Britain completely lacked the underground sewer infrastructure needed to make it work. Without a sewer to flush the waste into, the toilet simply flushed into an existing cesspit, meaning it offered no real advantage over a traditional privy for the massive cost of installation.",
  "Describe the purpose of the New River project in 1613.": "The New River project was an ambitious engineering feat designed to bring fresh, clean drinking water from springs in Hertfordshire over 20 miles directly into the heart of London, bypassing the heavily polluted River Thames.",
  "If you lived in the overcrowded, walled town of Tudor Portsmouth, what risks would you face from the lack of proper sewers and overflowing cesspits?": "Living in Tudor Portsmouth, you would face extreme risks of waterborne diseases like dysentery and typhoid because the overflowing cesspits constantly leaked into the town's drinking wells. The filthy streets, covered in human and animal waste, also created a foul miasma and attracted rats, increasing the risk of plague.",
  "Explain what Samuel Pepys' diary reveals about Early Modern privies.": "Pepys' diary reveals that Early Modern privies were often overflowing, poorly maintained, and deeply unhygienic. His account of stepping into his neighbor's sewage, which had flooded his own cellar, vividly illustrates how closely packed housing and inadequate cesspits created horrific living conditions even for wealthy citizens in London.",
  "Evaluate the effectiveness of Early Modern water sellers for public health.": "Early Modern water sellers (or 'cobs') provided a vital service by delivering water to households that had no local supply. However, their effectiveness for public health was very poor because the water they sold was often drawn directly from polluted rivers or contaminated conduits, meaning they were frequently distributing waterborne diseases directly to people's doors.",
  "Identify two effects of the industrial population surge on factory towns.": "1. Extreme overcrowding as landlords built cheap, back-to-back housing to cram in as many workers as possible.<br>2. A complete collapse of sanitation, with dozens of families forced to share a single, overflowing privy and a contaminated water pump.",
  "Describe the living conditions in industrial back-to-back housing.": "Back-to-back housing was cramped, poorly ventilated, and completely lacked indoor plumbing. Families often lived in a single damp room, and whole streets shared one outside toilet and a single water pump, which was frequently contaminated by the nearby overflowing cesspits.",
  "Why did rapid population growth in places like Portsea make the 1849 cholera outbreak so devastating for the local community?": "The rapid population growth in Portsea meant the town was severely overcrowded with inadequate sanitation. Thousands of people shared contaminated wells and lived in squalid, densely packed housing, creating the perfect conditions for cholera to spread rapidly through the water supply, resulting in an exceptionally high death toll.",
  "Explain how the cholera epidemics forced the government to act.": "<strong>Point 1: Sheer Scale of Death</strong><br>The terrifying mortality rates of the cholera epidemics (especially in 1831 and 1848) caused widespread panic, proving that the laissez-faire (leave alone) attitude was no longer sustainable.<br><br><strong>Point 2: Economic Impact</strong><br>The government realized that diseases were killing the workforce and leaving thousands of orphans, which massively increased the burden on the poor rates (workhouses), making public health a financial necessity.<br><br><strong>Point 3: Public Pressure and Reports</strong><br>Investigative reports, particularly by Edwin Chadwick, provided undeniable statistical proof that the filthy conditions were causing the disease, forcing Parliament to pass the first Public Health Act in 1848.",
  "Enquiry: How did Dr. Snow use this map to challenge the prevailing 'miasma' theory of disease?": "Dr. Snow used this 'Ghost Map' to plot the exact locations of cholera deaths, revealing a dense cluster around the Broad Street water pump. This provided irrefutable visual evidence that cholera was spread through contaminated water, not through 'bad air' (miasma) as the medical establishment incorrectly believed.",
  "Evaluate the significance of Edwin Chadwick's 1842 report.": "Edwin Chadwick's 1842 report was highly significant as it was the first time the government used statistical evidence to prove the direct link between poverty, squalor, and disease. It shattered the laissez-faire attitude and directly led to the 1848 Public Health Act, laying the foundation for modern state intervention in sanitation.",
  "Identify what John Snow's Broad Street map proved about cholera.": "John Snow's map proved that cholera was a waterborne disease spread by consuming contaminated water, rather than being spread by 'miasma' (bad air).",
  "Describe the impact of the Great Stink on Parliament in 1858.": "The Great Stink of 1858 created such an overpowering, putrid smell from the sewage-filled Thames that it forced Parliament to soak their curtains in chloride of lime. When that failed, they were finally driven to act, immediately passing legislation and providing £3 million to build a massive new sewer system.",
  "How did the construction of the Eastney Beam Engine House in 1887 solve the exact same public health crisis in Portsmouth that Bazalgette solved in London?": "Just like Bazalgette's system in London, the Eastney Beam Engine House used massive steam-powered pumps to intercept Portsmouth's raw sewage and physically pump it out into the Solent on the ebb tide. This prevented the sewage from backing up into the streets and contaminating the town, eliminating the risk of cholera.",
  "Explain how Joseph Bazalgette's sewer system solved London's waste problem.": "<strong>Point 1: Intercepting Sewers</strong><br>Bazalgette built 83 miles of massive intercepting sewers parallel to the Thames, which caught the raw sewage before it could flow into the river, immediately improving the river's water quality and eliminating the 'Great Stink'.<br><br><strong>Point 2: Steam Pumping Stations</strong><br>He designed magnificent pumping stations, like Crossness, to lift the sewage using powerful steam engines, allowing it to flow downhill out towards the Thames estuary.<br><br><strong>Point 3: Tidal Release</strong><br>The system stored the sewage in massive reservoirs and released it only on the ebbing (outgoing) tide, ensuring the waste was carried safely out to sea rather than washing back into the city.",
  "Enquiry: What does the sheer scale of this brickwork reveal about the Victorian government's response to the Great Stink of 1858?": "The colossal scale and high-quality engineering of the brickwork reveals that the Victorian government had completely abandoned laissez-faire attitudes. They were willing to invest unprecedented amounts of money and resources into permanent, monumental public infrastructure to permanently solve the sanitation crisis.",
  "Explain the link between Louis Pasteur's Germ Theory and sanitation.": "Pasteur's Germ Theory (1861) proved scientifically that microbes (germs) caused disease and decay. This provided the undeniable scientific backing needed to justify massive government spending on sanitation, proving that cleaning up filth and providing pure water would definitively stop the spread of deadly diseases like cholera and typhoid.",
  "Evaluate the significance of the 1875 Public Health Act for modern sanitation.": "The 1875 Public Health Act was immensely significant because it was the first time the government made sanitation *compulsory*. It forced local councils to provide clean water, build sewers, and employ Medical Officers of Health, fundamentally changing the role of the state and permanently eradicating cholera in Britain."
};

let content = fs.readFileSync('units/water_and_sanitation/data.js', 'utf8');
let changes = 0;

for (const [qText, aText] of Object.entries(answersMap)) {
  const targetDouble = '"' + qText + '",';
  const targetSingle = "'" + qText + "',";
  const targetNoComma = '"' + qText + '"'; // maybe it's the last item
  
  const formattedAnswer = aText.replace(/\"/g, '\\\\\"');
  const injectString = '\n              answer: "' + formattedAnswer + '",';
  
  if (content.includes(targetDouble)) {
    content = content.replace(targetDouble, targetDouble + injectString);
    changes++;
  } else if (content.includes(targetSingle)) {
    content = content.replace(targetSingle, targetSingle + injectString);
    changes++;
  } else if (content.includes(targetNoComma)) {
    content = content.replace(targetNoComma, targetNoComma + ',' + injectString);
    changes++;
  } else {
    // robust match
    const i = content.indexOf(qText);
    if (i !== -1) {
       const substringFromText = content.substring(i + qText.length);
       let endQuoteIndex = substringFromText.indexOf('"');
       let endQuoteSingle = substringFromText.indexOf("'");
       let eq = -1;
       if (endQuoteIndex !== -1 && endQuoteSingle !== -1) {
           eq = Math.min(endQuoteIndex, endQuoteSingle);
       } else {
           eq = Math.max(endQuoteIndex, endQuoteSingle);
       }
       
       if (eq !== -1 && eq < 10) { 
          let endComma = substringFromText.indexOf(',', eq);
          if (endComma !== -1 && endComma < 15) {
             const before = content.substring(0, i + qText.length + endComma + 1);
             const after = content.substring(i + qText.length + endComma + 1);
             content = before + injectString + after;
             changes++;
          }
       }
    } else {
      console.log("Could not find:", qText.substring(0, 30) + '...');
    }
  }
}

fs.writeFileSync('units/water_and_sanitation/data.js', content);
console.log("Injected " + changes + " missing answers.");
