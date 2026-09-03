const fs = require('fs');
const path = require('path');
const { PATHS } = require('./config.cjs');
function extractUnit(unitId, sourceDir, targetBaseDir) {
  console.log(`Extracting ${unitId}...`);
  const indexPath = path.join(sourceDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error(`No index.html found in ${sourceDir}`);
    return;
  }

  const html = fs.readFileSync(indexPath, 'utf8');

  // Extract Metadata
  let titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  let title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'Unknown Unit';

  let enquiryMatch = html.match(/Unit Enquiry:\s*(.*?)\s*<\/span>/);
  let enquiry = enquiryMatch ? enquiryMatch[1].trim() : '';

  let badgeMatch = html.match(/<span class="badge[^>]*>(.*?)<\/span>/);
  let badge = badgeMatch ? badgeMatch[1].trim() : '';

  // Extract Tabs
  const tabs = [];
  
  if (unitId === 'water_and_sanitation') {
    const tabRegex = /<button class="nav-tab[^"]*" data-target="([^"]+)"[^>]*>([\s\S]*?)<\/button>/g;
    let match;
    while ((match = tabRegex.exec(html)) !== null) {
      // Clean up icon/span tags if present
      const label = match[2].replace(/<[^>]+>/g, '').trim();
      tabs.push({ id: match[1], label: label });
    }
  } else {
    // Default to golden template (great_war) logic
    const tabRegex = /<button class="tb-tab nav-tab[^"]*" data-tab="([^"]+)">([^<]+)<\/button>/g;
    let match;
    while ((match = tabRegex.exec(html)) !== null) {
      tabs.push({ id: match[1], label: match[2].trim() });
    }
  }

  let content = '';
  let workbookStart = html.indexOf('<div class="workbook-container"');
  if (workbookStart === -1) workbookStart = html.indexOf('<div class="workbook-container">');
  if (workbookStart !== -1) {
    let openDivs = 0;
    let removeEnd = -1;
    let divStart = html.indexOf('<div', workbookStart);
    for (let i = divStart; i < html.length; i++) {
      if (html.substr(i, 4) === '<div') openDivs++;
      if (html.substr(i, 5) === '</div') {
        openDivs--;
        if (openDivs === 0) {
          removeEnd = i;
          break;
        }
      }
    }
    if (removeEnd !== -1) {
      content = html.substring(workbookStart, removeEnd + 6);
      content = content.replace(/<div class="workbook-container"[^>]*>/, '');
      content = content.replace(/<\/div>\s*$/, '');
    }
  }

  // Generate output files
  try {
    const unitTargetDir = path.join(targetBaseDir, unitId);
    fs.mkdirSync(unitTargetDir, { recursive: true });
    fs.mkdirSync(path.join(unitTargetDir, 'assets'), { recursive: true });

    // We need to parse data.js directly since we don't have a reliable JSON export yet.
    const sourceData = path.join(sourceDir, 'data.js');
    if (fs.existsSync(sourceData)) {
      fs.copyFileSync(sourceData, path.join(unitTargetDir, 'data.js'));
      const contentData = fs.readFileSync(sourceData, 'utf8');
      const titleMatch = contentData.match(/title:\s*['"]([^'"]+)['"]/);
      if (titleMatch) title = titleMatch[1];
    }
  
    // Write data.json
    const data = {
      id: unitId,
      title,
      enquiry,
      badge,
      tabs,
      contentUrl: `/units/${unitId}/content.html`
    };
   try {
    fs.writeFileSync(path.join(unitTargetDir, 'data.json'), JSON.stringify(data, null, 2));
    fs.writeFileSync(path.join(unitTargetDir, 'content.html'), content.trim());
  } catch (err) {
    console.error(`❌ Failed to write extracted unit data for ${unitId}`, err.message);
  }
  
    // Copy styles
    const sourceStyles = path.join(sourceDir, 'styles.css');
    if (fs.existsSync(sourceStyles)) {
      fs.copyFileSync(sourceStyles, path.join(unitTargetDir, 'styles.css'));
    }

    // Copy extra HTML tools (Quiz Pack, Workbooks, Answer Keys)
    // Copy extra HTML tools (Quiz Pack, Answer Keys, Cheat Sheets, and ALL workbooks)
    const filesToCopy = ['quiz_pack.html', 'answer_key.html', 'biographies.json', 'flashcards.html', 'cheat_sheet.html'];
    const allFiles = fs.readdirSync(sourceDir);
    allFiles.forEach(f => {
      if ((f.startsWith('workbook') || f.startsWith('mock_')) && f.endsWith('.html')) {
        filesToCopy.push(f);
      }
    });
    filesToCopy.forEach(file => {
      const sourceFile = path.join(sourceDir, file);
      if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, path.join(unitTargetDir, file));
      }
    });
  

  } catch (err) {
    console.error(err);
  }

  console.log(`Successfully extracted ${unitId} to ${path.join(targetBaseDir, unitId)}`);
}

// Define Target Directories
const publicUnitsDir = PATHS.UNITS;

// Automatically find all valid unit directories (must have index.html)
const ignoredDirs = ['node_modules', 'public', '.git', '.agents', 'dist'];
let allDirs = fs.readdirSync(PATHS.ROOT, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && !ignoredDirs.includes(dirent.name))
  .map(dirent => dirent.name);

const targetUnit = process.argv[2];
if (targetUnit) {
  let sourceDir = path.join(PATHS.ROOT, targetUnit);
  if (!fs.existsSync(sourceDir)) {
    sourceDir = path.join(PATHS.ROOT, 'units', targetUnit);
  }
  
  if (fs.existsSync(sourceDir)) {
    console.log(`\n🎯 Targeting single unit: ${targetUnit}`);
    extractUnit(targetUnit, sourceDir, publicUnitsDir);
    process.exit(0);
  } else {
    console.error(`\n❌ Error: Unit directory "${targetUnit}" not found.`);
    process.exit(1);
  }
}

allDirs.forEach(dirName => {
  const indexPath = path.join(PATHS.ROOT, dirName, 'index.html');
  // Extract units if they have an index.html (they might use local app.js or core_app.js)
  if (fs.existsSync(indexPath)) {
    extractUnit(dirName, path.join(PATHS.ROOT, dirName), publicUnitsDir);
  }
});
