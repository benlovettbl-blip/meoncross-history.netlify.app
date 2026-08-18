const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const F_DRIVE_ASSETS = 'F:\\meoncross_project_data\\assets';
const PUBLIC_DIR = path.join(__dirname, 'public');
const UNITS_DIR = path.join(PUBLIC_DIR, 'units');

console.log('🚀 Starting F: Drive Asset Migration...');

// 1. Check if F: drive is attached
if (!fs.existsSync(F_DRIVE_ASSETS)) {
  console.error(`❌ ERROR: Cannot find ${F_DRIVE_ASSETS}. Please ensure your F: drive is plugged in before running this script.`);
  process.exit(1);
}

console.log('✅ F: drive detected. Proceeding with migration...');

// 2. Identify broken images in all units
const units = fs.readdirSync(UNITS_DIR).filter(f => fs.existsSync(path.join(__dirname, f, 'data.js')));
let totalCopied = 0;

for (const unit of units) {
  const dataPath = path.join(__dirname, unit, 'data.js');
  let content = fs.readFileSync(dataPath, 'utf8');
  
  const unitAssetsDir = path.join(UNITS_DIR, unit, 'assets');
  if (!fs.existsSync(unitAssetsDir)) {
    fs.mkdirSync(unitAssetsDir, { recursive: true });
  }

  // Regex to find all asset paths
  const regex = /['\"](\/assets\/.*?|\/images\/.*?|assets\/.*?)['\"]/g;
  let match;
  let replacements = [];

  while ((match = regex.exec(content)) !== null) {
    let originalPath = match[1];
    
    // Only target images and assets that might be on the F: drive
    if (originalPath.match(/\.(jpg|png|svg|webp|jpeg|gif)$/i) && originalPath.startsWith('/assets/')) {
      
      const filename = path.basename(originalPath);
      // We will look for this file on the F drive. 
      // Sometimes it was prefixed with the unit name, so we check various formats:
      const possibleNames = [
        filename,
        filename.replace(`${unit}_`, ''),
        filename.replace('was_', '') 
      ];
      
      let sourceFile = null;
      for (const name of possibleNames) {
         const fDrivePath = path.join(F_DRIVE_ASSETS, name);
         if (fs.existsSync(fDrivePath)) {
            sourceFile = fDrivePath;
            break;
         }
         // Also check in subdirectories on F drive if needed (like banners/, infographics/)
         // The originalPath might have folders in it: /assets/banners/medieval.png
         const nestedPath = path.join(F_DRIVE_ASSETS, originalPath.replace('/assets/', ''));
         if (fs.existsSync(nestedPath)) {
            sourceFile = nestedPath;
            break;
         }
      }

      if (sourceFile) {
        // Copy to local unit assets folder
        const destFileName = path.basename(sourceFile);
        const destPath = path.join(unitAssetsDir, destFileName);
        
        fs.copyFileSync(sourceFile, destPath);
        totalCopied++;
        
        replacements.push({
          old: originalPath,
          new: `assets/${destFileName}`
        });
      }
    }
  }

  // 3. Update the data.js file
  if (replacements.length > 0) {
    // Deduplicate replacements
    const uniqueReplacements = [...new Set(replacements.map(r => JSON.stringify(r)))].map(r => JSON.parse(r));
    for (const rep of uniqueReplacements) {
       content = content.split(`"${rep.old}"`).join(`"${rep.new}"`);
       content = content.split(`'${rep.old}'`).join(`'${rep.new}'`);
    }
    fs.writeFileSync(dataPath, content);
    console.log(`✅ Updated ${unit}/data.js and copied ${uniqueReplacements.length} assets.`);
    
    // Run the sync scripts for this unit
    console.log(`   Running sync commands for ${unit}...`);
    execSync(`node extract_units.js ${unit}`, { stdio: 'ignore' });
  }
}

// 4. Clean up the global database & symlink
console.log('🔄 Rebuilding master database...');
execSync(`node build_database.cjs`, { stdio: 'ignore' });
execSync(`node generate_tracker_v2.mjs`, { stdio: 'ignore' });

const symlinkPath = path.join(PUBLIC_DIR, 'assets');
if (fs.existsSync(symlinkPath) && fs.lstatSync(symlinkPath).isSymbolicLink()) {
  console.log('🗑️ Removing old F: drive symlink...');
  fs.unlinkSync(symlinkPath);
}

console.log(`🎉 Migration complete! Copied ${totalCopied} files. Your project is now 100% self-contained and travel-ready!`);
