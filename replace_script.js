const fs = require('fs');
let code = fs.readFileSync('water_and_sanitation/data.js', 'utf8');

const replacements = [
  ["Q1: Explain the significance of iron age settlements & cesspits in the development of sanitation.", "Q1: Identify how Iron Age communities managed their waste."],
  ["Iron Age settlements and cesspits were significant because...", "Iron Age communities managed their waste by..."],
  
  ["Q2: Explain the significance of roman conduits & water supply in the development of sanitation.", "Q2: Describe the purpose of Roman conduits and aqueducts."],
  ["Roman conduits were significant because...", "The purpose of Roman conduits and aqueducts was to..."],
  
  ["Q3: Explain the significance of bathhouses and latrines in the development of sanitation.", "Q3: Explain how bathhouses and latrines improved public health in Roman towns."],
  ["Bathhouses and latrines were significant because...", "Bathhouses and latrines improved public health because..."],
  
  ["Q4: Explain the significance of the roman withdrawal in the development of sanitation.", "Q4: Evaluate the impact of the Roman withdrawal on Britain's sanitation."],
  ["The Roman withdrawal was significant because...", "The Roman withdrawal significantly impacted sanitation because..."],
  
  ["Q1: Explain the significance of peasant cesspits (wharram percy) in the development of sanitation.", "Q1: Identify the main method of waste disposal in medieval villages like Wharram Percy."],
  ["Peasant cesspits in villages like Wharram Percy were significant because...", "The main method of waste disposal in medieval villages was..."],
  
  ["Q2: Explain the significance of monastic luxury (canterbury priory) in the development of sanitation.", "Q2: Describe the sanitation facilities found in medieval monasteries like Canterbury Priory."],
  ["Monastic sanitation, such as at Canterbury Priory, was significant because...", "Medieval monasteries had sanitation facilities such as..."],
  
  ["Q3: Explain the significance of urban filtration crisis in the development of sanitation.", "Q3: Explain why overcrowded medieval towns faced a filtration crisis."],
  ["The urban filtration crisis was significant because...", "Overcrowded medieval towns faced a filtration crisis because..."],
  
  ["Q4: Explain the significance of gongfermers and night-work in the development of sanitation.", "Q4: Explain the role of gongfermers in medieval towns."],
  ["Gongfermers and their night-work were significant because...", "The role of gongfermers was to..."],
  
  ["Q5: Explain the significance of edward iii's cleanliness mandate in the development of sanitation.", "Q5: Evaluate the significance of Edward III's cleanliness mandate in 1349."],
  ["Edward III's cleanliness mandate was significant because...", "Edward III's cleanliness mandate was significant because..."],
  
  ["Q1: Explain the significance of sir john harington's flushing toilet in the development of sanitation.", "Q1: Identify who invented the first flushing water closet."],
  ["Sir John Harington's flushing toilet was significant because...", "The first flushing water closet was invented by..."],
  
  ["Q3: Explain the significance of the new river (1613) in the development of sanitation.", "Q2: Describe the purpose of the New River project in 1613."],
  ["The New River project was significant because...", "The purpose of the New River project was to..."],
  
  ["Q2: Explain the significance of samuel pepys' diary (privy leak) in the development of sanitation.", "Q3: Explain what Samuel Pepys' diary reveals about Early Modern privies."],
  ["Samuel Pepys' diary entry was significant because...", "Samuel Pepys' diary reveals that Early Modern privies..."],
  
  ["Q4: Explain the significance of early modern water sellers in the development of sanitation.", "Q4: Evaluate the effectiveness of Early Modern water sellers for public health."],
  ["Early Modern water sellers were significant because...", "Early Modern water sellers were only partially effective because..."],
  
  ["Q1: Explain the significance of population surge and urbanization in the development of sanitation.", "Q1: Identify two effects of the industrial population surge on factory towns."],
  ["Population surge and urbanization were significant because...", "Two effects of the industrial population surge were..."],
  
  ["Q2: Explain the significance of back-to-backs and shared pumps in the development of sanitation.", "Q2: Describe the living conditions in industrial back-to-back housing."],
  ["Back-to-backs and shared pumps were significant because...", "Living conditions in industrial back-to-back housing were..."],
  
  ["Q3: Explain the significance of cholera epidemics (1831–1866) in the development of sanitation.", "Q3: Explain how the cholera epidemics forced the government to act."],
  ["Cholera epidemics were significant because...", "The cholera epidemics forced the government to act by..."],
  
  ["Q4: Explain the significance of edwin chadwick's report (1842) in the development of sanitation.", "Q4: Evaluate the significance of Edwin Chadwick's 1842 report."],
  ["Edwin Chadwick's 1842 report was significant because...", "Edwin Chadwick's 1842 report was significant because..."],
  
  ["Q1: Explain the significance of john snow's broad street map in the development of sanitation.", "Q1: Identify what John Snow's Broad Street map proved about cholera."],
  ["John Snow's Broad Street map was significant because...", "John Snow's Broad Street map proved that..."],
  
  ["Q2: Explain the significance of the great stink of london in the development of sanitation.", "Q2: Describe the impact of the Great Stink on Parliament in 1858."],
  ["The Great Stink of London was significant because...", "The Great Stink impacted Parliament by..."],
  
  ["Q3: Explain the significance of bazalgette's sewer system in the development of sanitation.", "Q3: Explain how Joseph Bazalgette's sewer system solved London's waste problem."],
  ["Joseph Bazalgette's sewer system was significant because...", "Joseph Bazalgette's sewer system solved the problem by..."],
  
  ["Q4: Explain the significance of pasteur's germ theory in the development of sanitation.", "Q4: Explain the link between Louis Pasteur's Germ Theory and sanitation."],
  ["Louis Pasteur's Germ Theory was significant because...", "Louis Pasteur's Germ Theory linked to sanitation because..."],
  
  ["Q5: Explain the significance of public health act of 1875 in the development of sanitation.", "Q5: Evaluate the significance of the 1875 Public Health Act for modern sanitation."],
];

replacements.forEach(([oldStr, newStr]) => {
  code = code.replace(oldStr, newStr);
});

fs.writeFileSync('water_and_sanitation/data.js', code);
console.log('Successfully updated data.js');
