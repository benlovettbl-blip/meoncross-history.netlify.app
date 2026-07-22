const fs = require('fs');
const path = require('path');

async function extractWesternFront() {
  const medicineDataPath = path.join(__dirname, '../edexcel_medicine/data.js');
  const westernFrontDataPath = path.join(__dirname, '../western_front/data.js');
  
  // Backup edexcel_medicine/data.js
  const backupDir = path.join(__dirname, '../temp_backups');
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);
  const timestamp = Date.now();
  fs.copyFileSync(medicineDataPath, path.join(backupDir, `edexcel_medicine_data_${timestamp}.js`));
  
  // Import medicine data
  const dataJsStr = fs.readFileSync(medicineDataPath, 'utf8');
  const match = dataJsStr.match(/export default (\{[\s\S]+\});/);
  if (!match) throw new Error("Could not parse edexcel_medicine/data.js");
  
  const unitData = eval('(' + match[1] + ')');
  
  // Split lessons
  const kt5Lessons = unitData.lessons.filter(l => l.title.startsWith("KT5"));
  const coreLessons = unitData.lessons.filter(l => !l.title.startsWith("KT5"));
  
  if (kt5Lessons.length === 0) {
    console.log("No KT5 lessons found to extract.");
    return;
  }
  
  // Create Western Front unit data
  const westernFrontData = {
    ...unitData,
    id: "western_front",
    title: "The British Sector of the Western Front",
    subtitle: "Injuries, treatment and the trenches (1914–1918)",
    theme_color: "#78350F", // A dark muddy/trench color
    lessons: kt5Lessons
  };
  
  // Write western_front/data.js
  let newWfDataStr = `const unitData = ${JSON.stringify(westernFrontData, null, 2)};\n\nexport default unitData;`;
  fs.writeFileSync(westernFrontDataPath, newWfDataStr);
  console.log("Successfully wrote western_front/data.js");
  
  // Update edexcel_medicine data
  unitData.lessons = coreLessons;
  let newMedDataStr = `const unitData = ${JSON.stringify(unitData, null, 2)};\n\nexport default unitData;`;
  fs.writeFileSync(medicineDataPath, newMedDataStr);
  console.log("Successfully removed KT5 from edexcel_medicine/data.js");
}

extractWesternFront().catch(console.error);
