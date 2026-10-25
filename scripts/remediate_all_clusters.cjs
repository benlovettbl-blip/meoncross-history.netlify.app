const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, searchStr, replaceStr) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return false;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes(searchStr)) {
    console.log(`Target not found in ${filePath}`);
    return false;
  }
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated: ${filePath}`);
  return true;
}

console.log('--- Remediating Cluster 1: Monarchy, Religion & Power ---');
// In units/monarchy_religion_power/data.js and public/units/monarchy_religion_power/data.js
// Harmonize line 1813 to "Source A: Contemporary Chart of Sir Francis Drake’s Raid on Cadiz (1587)"
const mrpPaths = [
  path.resolve('units/monarchy_religion_power/data.js'),
  path.resolve('public/units/monarchy_religion_power/data.js')
];

mrpPaths.forEach(p => {
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    // Replace short title with full title
    content = content.replace(
      /"title":\s*"Source A: Contemporary Chart of Drake’s Raid on Cadiz \(1587\)"/g,
      '"title": "Source A: Contemporary Chart of Sir Francis Drake’s Raid on Cadiz (1587)"'
    );
    fs.writeFileSync(p, content, 'utf8');
    console.log(`Harmonized Cadiz title in ${p}`);
  }
});

console.log('--- Remediating Cluster 2: Early Elizabethan England ---');
// In units/eee/data.js and public/units/eee/data.js
const eeePaths = [
  path.resolve('units/eee/data.js'),
  path.resolve('public/units/eee/data.js')
];

eeePaths.forEach(p => {
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    // Harmonize Cadiz
    content = content.replace(
      /"title":\s*"Source A: Drake’s Raid on Cadiz \(1587\)"/g,
      '"title": "Source A: Contemporary Chart of Sir Francis Drake’s Raid on Cadiz (1587)"'
    );
    // Harmonize Gravelines
    content = content.replace(
      /"title":\s*"Source A: The Battle of Gravelines and the Fireships \(8 August 1588\)"/g,
      '"title": "Source A: Philip James de Loutherbourg, The Battle of Gravelines (1588)"'
    );
    fs.writeFileSync(p, content, 'utf8');
    console.log(`Harmonized Cadiz & Gravelines in ${p}`);
  }
});

console.log('--- Remediating Cluster 3: Industrialisation & Empire and Edexcel Medicine ---');
// In units/industrialisation_and_empire/data.js
const iaePaths = [
  path.resolve('units/industrialisation_and_empire/data.js'),
  path.resolve('public/units/industrialisation_and_empire/data.js')
];

iaePaths.forEach(p => {
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    // Harmonize King Cholera to include September 1852
    content = content.replace(
      /"title":\s*"Source B: John Leech, A Court for King Cholera \(Punch, 1852\)"/g,
      '"title": "Source B: John Leech, A Court for King Cholera (Punch, September 1852)"'
    );
    fs.writeFileSync(p, content, 'utf8');
    console.log(`Harmonized King Cholera in ${p}`);
  }
});

// In units/edexcel_medicine/data.js and public/units/edexcel_medicine/data.js
const medPaths = [
  path.resolve('units/edexcel_medicine/data.js'),
  path.resolve('public/units/edexcel_medicine/data.js')
];

medPaths.forEach(p => {
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    // Harmonize King Cholera: "Source A: A Court for King Cholera (Punch, September 1852)" -> "Source A: John Leech, A Court for King Cholera (Punch, September 1852)"
    content = content.replace(
      /"title":\s*"Source A: A Court for King Cholera \(Punch, September 1852\)"/g,
      '"title": "Source A: John Leech, A Court for King Cholera (Punch, September 1852)"'
    );
    // Harmonize Bazalgette: "Source C: Joseph Bazalgette’s London Main Drainage Sewer Works (1860s)" -> "Source C: Sir Joseph Bazalgette’s London Interceptor Sewer Network Under Construction (1862)"
    content = content.replace(
      /"title":\s*"Source C: Joseph Bazalgette’s London Main Drainage Sewer Works \(1860s\)"/g,
      '"title": "Source C: Sir Joseph Bazalgette’s London Interceptor Sewer Network Under Construction (1862)"'
    );
    // Update Black Death Source B to Toggenburg Bible
    content = content.replace(
      /"title":\s*"Source B: Plague Victim with Groin and Armpit Buboes \(1497\)"/g,
      '"title": "Source B: Medieval Illumination of Bedridden Plague Victims with Boils and Sores (c. 1411)"'
    );
    content = content.replace(
      /"provenance":\s*"Woodcut of St\. Sebastian interceding for plague victims, Augsburg, 1497\."/g,
      '"provenance": "Toggenburg Bible (1411), Kupferstichkabinett Berlin • Illumination of plague boil victims."'
    );
    fs.writeFileSync(p, content, 'utf8');
    console.log(`Harmonized Medicine sources in ${p}`);
  }
});

// In units/water_and_sanitation/data.js and public/units/water_and_sanitation/data.js
const wsPaths = [
  path.resolve('units/water_and_sanitation/data.js'),
  path.resolve('public/units/water_and_sanitation/data.js')
];

wsPaths.forEach(p => {
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(
      /"title":\s*"Source A: Dr John Snow’s 1854 Cholera Spot Map of Soho"/g,
      '"title": "Source A: Dr John Snow’s Spot Map of the Broad Street Cholera Outbreak (1854)"'
    );
    fs.writeFileSync(p, content, 'utf8');
    console.log(`Harmonized Snow Spot Map in ${p}`);
  }
});

console.log('--- Remediating Cluster 4: The Shoah & Weimar Germany ---');
const shoahPaths = [
  path.resolve('units/the_shoah/data.js'),
  path.resolve('public/units/the_shoah/data.js')
];

shoahPaths.forEach(p => {
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(
      /"title":\s*"Source A \(Archival Photograph\): SA Stormtroopers Enforcing the Anti-Jewish Boycott in Berlin \(1 April 1933\)"/g,
      '"title": "Source A: SA Stormtroopers Enforcing the Nationwide Anti-Jewish Boycott (1 April 1933)"'
    );
    content = content.replace(
      /"title":\s*"Source B \(Official State Chart\): The Nuremberg Laws Racial Classification Diagram \(September 1935\)"/g,
      '"title": "Source B: Official Racial Classification Chart under the Nuremberg Laws (September 1935)"'
    );
    fs.writeFileSync(p, content, 'utf8');
    console.log(`Harmonized Shoah sources in ${p}`);
  }
});

console.log('🏁 All unit data files updated successfully!');
