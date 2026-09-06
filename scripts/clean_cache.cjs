/**
 * Automated Temporary File & Cache Cleaner
 * Safely removes ephemeral build artifacts, transient browser recordings,
 * and old scratch directories to maintain healthy C: drive space.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

function getFolderSize(dirPath) {
  let totalBytes = 0;
  if (!fs.existsSync(dirPath)) return 0;

  try {
    const stat = fs.statSync(dirPath);
    if (!stat.isDirectory()) return stat.size;

    const items = fs.readdirSync(dirPath);
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      try {
        const itemStat = fs.statSync(fullPath);
        if (itemStat.isDirectory()) {
          totalBytes += getFolderSize(fullPath);
        } else {
          totalBytes += itemStat.size;
        }
      } catch (err) {
        // Skip locked or inaccessible files
      }
    }
  } catch (err) {
    // Skip if directory cannot be read
  }

  return totalBytes;
}

function getFreeDiskGB(drivePath = 'C:/') {
  try {
    const stat = fs.statfsSync(drivePath);
    return ((stat.bfree * stat.bsize) / (1024 * 1024 * 1024)).toFixed(2);
  } catch {
    return 'N/A';
  }
}

function cleanTempFiles() {
  console.log('====================================================');
  console.log('🧹 RUNNING AUTOMATED TEMPORARY & CACHE CLEANER');
  console.log('====================================================');

  const startFreeGB = getFreeDiskGB('C:/');
  console.log(`📊 Initial C: Drive Free Space: ${startFreeGB} GB\n`);

  const workspaceRoot = path.resolve(__dirname, '..');
  const userHome = os.homedir();

  // Define cleanup targets
  const cleanupTargets = [
    // Workspace transient builds & temp caches
    { name: 'Workspace dist/ directory', path: path.join(workspaceRoot, 'dist') },
    { name: 'Workspace dist2/ directory', path: path.join(workspaceRoot, 'dist2') },
    { name: 'Vite build cache', path: path.join(workspaceRoot, 'node_modules', '.vite') },

    // Agent video recordings (transient WebP captures)
    {
      name: 'Agent browser session recordings',
      path: path.join(userHome, '.gemini', 'antigravity-ide', 'browser_recordings'),
    },

    // Agent scratch mirrors
    {
      name: 'Agent scratch directory clones',
      path: path.join(userHome, '.gemini', 'antigravity', 'scratch'),
    },
  ];

  // Also discover any dynamic temp_backups* folders in workspace
  try {
    const entries = fs.readdirSync(workspaceRoot);
    for (const entry of entries) {
      if (entry.startsWith('temp_backups') || entry.startsWith('.temp_')) {
        cleanupTargets.push({
          name: `Temporary backup (${entry})`,
          path: path.join(workspaceRoot, entry),
        });
      }
    }
  } catch (err) {
    // Ignore workspace read errors
  }

  let totalReclaimedBytes = 0;

  for (const target of cleanupTargets) {
    if (fs.existsSync(target.path)) {
      const sizeBytes = getFolderSize(target.path);
      const sizeMB = (sizeBytes / (1024 * 1024)).toFixed(1);

      try {
        if (target.name.includes('browser session recordings')) {
          // Clean individual files inside to avoid root folder locks
          const files = fs.readdirSync(target.path);
          let cleanedCount = 0;
          for (const f of files) {
            try {
              fs.rmSync(path.join(target.path, f), { recursive: true, force: true });
              cleanedCount++;
            } catch (fileErr) {
              // Ignore currently locked recording
            }
          }
          console.log(`  ✅ Cleaned ${cleanedCount} files in: ${target.name} (${sizeMB} MB)`);
        } else {
          fs.rmSync(target.path, { recursive: true, force: true });
          console.log(`  ✅ Removed: ${target.name} (${sizeMB} MB)`);
        }
        totalReclaimedBytes += sizeBytes;
      } catch (err) {
        console.warn(`  ⚠️ Could not fully remove ${target.name}: ${err.message}`);
      }
    } else {
      console.log(`  ℹ️ Skipped (not present): ${target.name}`);
    }
  }

  const endFreeGB = getFreeDiskGB('C:/');
  const totalReclaimedMB = (totalReclaimedBytes / (1024 * 1024)).toFixed(1);
  const totalReclaimedGB = (totalReclaimedBytes / (1024 * 1024 * 1024)).toFixed(2);

  console.log('\n====================================================');
  console.log(`🎉 CLEANUP COMPLETE!`);
  console.log(`📦 Total Space Reclaimed: ${totalReclaimedMB} MB (${totalReclaimedGB} GB)`);
  console.log(`💾 Final C: Drive Free Space: ${endFreeGB} GB`);
  console.log('====================================================\n');
}

cleanTempFiles();
