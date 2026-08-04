const fs = require('fs');
const path = require('path');

const publicUnitsDir = path.join(__dirname, 'public', 'units');

if (!fs.existsSync(publicUnitsDir)) {
  console.log('Public units directory not found.');
  process.exit(1);
}

const allDirs = fs.readdirSync(publicUnitsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

let deletedCount = 0;

for (const unitId of allDirs) {
  const unitPath = path.join(publicUnitsDir, unitId);
  const staleWorkbookPath = path.join(unitPath, 'workbook.html');

  if (fs.existsSync(staleWorkbookPath)) {
    try {
      fs.unlinkSync(staleWorkbookPath);
      console.log(`Deleted stale workbook: ${staleWorkbookPath}`);
      deletedCount++;
    } catch (e) {
      console.error(`Failed to delete ${staleWorkbookPath}: ${e.message}`);
    }
  }
}

if (deletedCount === 0) {
  console.log('No stale workbook.html files found.');
} else {
  console.log(`Successfully deleted ${deletedCount} stale workbook.html file(s).`);
}
