const fs = require('fs');
const path = require('path');

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

  // Rewrite asset paths
  content = content.replace(/src="assets\//g, `src="units/${unitId}/assets/`);
  content = content.replace(/url\(['"]?assets\//g, `url('units/${unitId}/assets/`);

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
    fs.writeFileSync(path.join(unitTargetDir, 'data.json'), JSON.stringify(data, null, 2));
  
    // Write content.html
    fs.writeFileSync(path.join(unitTargetDir, 'content.html'), content.trim());
  
    // Copy assets if they exist
    const sourceAssets = path.join(sourceDir, 'assets');
    if (fs.existsSync(sourceAssets)) {
      fs.cpSync(sourceAssets, path.join(unitTargetDir, 'assets'), { recursive: true });
    }
  
    // Copy styles
    const sourceStyles = path.join(sourceDir, 'styles.css');
    if (fs.existsSync(sourceStyles)) {
      fs.copyFileSync(sourceStyles, path.join(unitTargetDir, 'styles.css'));
    }

    // Copy extra HTML tools (Quiz Pack, Workbooks, Answer Keys)
    // Copy extra HTML tools (Quiz Pack, Answer Keys, and ALL workbooks)
    const filesToCopy = ['quiz_pack.html', 'answer_key.html', 'biographies.json'];
    const allFiles = fs.readdirSync(sourceDir);
    allFiles.forEach(f => {
      if (f.startsWith('workbook') && f.endsWith('.html')) {
        filesToCopy.push(f);
      }
    });
    filesToCopy.forEach(file => {
      const sourceFile = path.join(sourceDir, file);
      if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, path.join(unitTargetDir, file));
      }
    });
  
    // Copy app.js -> unit_script.js and patch DOMContentLoaded
    const sourceJs = path.join(sourceDir, 'app.js');
    if (fs.existsSync(sourceJs)) {
      let jsContent = fs.readFileSync(sourceJs, 'utf8');
      // Patch initialization logic
      jsContent = jsContent.replace(/document\.addEventListener\(['"]DOMContentLoaded['"], \(\) => \{/g, 'window.initUnit = function() {');
      jsContent = jsContent.replace(/window\.addEventListener\(['"]DOMContentLoaded['"], async \(\) => \{/g, 'window.initUnit = async function() {');
      
      // Also patch water_and_sanitation's inner tab logic that relies on `.nav-tab` clicks since AppEngine manages nav-tabs now!
      jsContent = jsContent.replace(/#workbookTabs \.tb-tab/g, '#engine-tabs-container .tb-tab');
      jsContent = jsContent.replace(/\.was-main-nav/g, '#engine-tabs-container');
      
      // Patch the target container for the new gamified architecture
      jsContent = jsContent.replace(/document\.getElementById\(['"]content-area['"]\)/g, "document.getElementById('engine-workbook-container')");
      
      // Fix the closing brace for the new app.js structure
      jsContent = jsContent.replace(/window\.renderDashboard\(\);\s*\n\}\);/, "window.renderDashboard();\n};");
      
      // Legacy backwards compatibility
      jsContent = jsContent.replace(/selectTab\('cover'\);\s*\n\}\);/, "selectTab('cover');\n};");
      jsContent = jsContent.replace(/if \(lessonsTab\) lessonsTab\.click\(\);\s*\n\}\);/, "if (lessonsTab) lessonsTab.click();\n};");
      
      fs.writeFileSync(path.join(unitTargetDir, 'unit_script.js'), jsContent);
    }
  } catch (err) {
    console.error(err);
  }

  console.log(`Successfully extracted ${unitId} to ${path.join(targetBaseDir, unitId)}`);
}

const publicUnitsDir = path.join(__dirname, 'public', 'units');

// Automatically find all valid unit directories (must have index.html)
const ignoredDirs = ['node_modules', 'public', '.git', '.agents', 'dist'];
const allDirs = fs.readdirSync(__dirname, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && !ignoredDirs.includes(dirent.name))
  .map(dirent => dirent.name);

allDirs.forEach(dirName => {
  const indexPath = path.join(__dirname, dirName, 'index.html');
  const appJsPath = path.join(__dirname, dirName, 'app.js');
  // Only extract KS3-style units which have both index.html and app.js
  if (fs.existsSync(indexPath) && fs.existsSync(appJsPath)) {
    extractUnit(dirName, path.join(__dirname, dirName), publicUnitsDir);
  }
});
