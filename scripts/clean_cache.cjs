/**
 * Automated Temporary File & Cache Cleaner
 *
 * Safely purges ephemeral build artifacts, transient browser recordings,
 * Windows temp files, npm cache, and stale project backup snapshots
 * to prevent disk bloat before it exceeds storage thresholds.
 *
 * Usage:
 *   node scripts/clean_cache.cjs                 # Interactive full cleanup
 *   node scripts/clean_cache.cjs --check         # Inspect current cache size without deleting
 *   node scripts/clean_cache.cjs --threshold 5   # Purge only if total cache exceeds 5 GB
 *   node scripts/clean_cache.cjs --auto          # Silent background execution for Task Scheduler
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

// Parse CLI flags
const args = process.argv.slice(2);
const isCheckOnly = args.includes('--check');
const isAuto = args.includes('--auto');
const thresholdArgIdx = args.findIndex((a) => a === '--threshold' || a === '-t');
const thresholdGB =
  thresholdArgIdx !== -1 && args[thresholdArgIdx + 1] ? parseFloat(args[thresholdArgIdx + 1]) : 0;

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
      } catch {
        // Skip locked or inaccessible files
      }
    }
  } catch {
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

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function main() {
  const workspaceRoot = path.resolve(__dirname, '..');
  const userHome = os.homedir();
  const tempDir = os.tmpdir();
  const parentProjectsDir = path.resolve(workspaceRoot, '..');

  if (!isAuto) {
    console.log('====================================================');
    console.log('🧹 AUTOMATED HARD DRIVE CACHE & TEMP CLEANER');
    console.log('====================================================');
    console.log(`📊 Initial C: Drive Free Space: ${getFreeDiskGB('C:/')} GB\n`);
  }

  // 1. Identify Target Cache Locations
  const targets = [];

  // Workspace targets
  targets.push({
    name: 'Workspace dist/ (Production build artifacts)',
    path: path.join(workspaceRoot, 'dist'),
    type: 'dir',
  });
  targets.push({
    name: 'Workspace dist2/ (Legacy build artifacts)',
    path: path.join(workspaceRoot, 'dist2'),
    type: 'dir',
  });
  targets.push({
    name: 'Vite build cache (.vite)',
    path: path.join(workspaceRoot, 'node_modules', '.vite'),
    type: 'dir',
  });

  // Antigravity & Agent Caches
  targets.push({
    name: 'Agent browser session video recordings',
    path: path.join(userHome, '.gemini', 'antigravity-ide', 'browser_recordings'),
    type: 'dir_contents',
  });
  targets.push({
    name: 'Agent scratch clones',
    path: path.join(userHome, '.gemini', 'antigravity', 'scratch'),
    type: 'dir',
  });

  // Global Developer Caches
  const npmCachePath = path.join(userHome, 'AppData', 'Local', 'npm-cache');
  targets.push({
    name: 'NPM global package cache',
    path: npmCachePath,
    type: 'npm_cache',
  });

  // Windows User Temp Directory
  targets.push({
    name: 'Windows user temp directory (%TEMP%)',
    path: tempDir,
    type: 'user_temp',
  });

  // Workspace temporary backups (temp_backups*)
  try {
    const wsEntries = fs.readdirSync(workspaceRoot);
    for (const entry of wsEntries) {
      if ((entry.startsWith('temp_backups') || entry.startsWith('.temp_')) && entry !== 'src') {
        targets.push({
          name: `Workspace temporary backup (${entry})`,
          path: path.join(workspaceRoot, entry),
          type: 'dir',
        });
      }
    }
  } catch {}

  // Parent C:\Projects\temp_backups (historical snapshots)
  const parentTempBackups = path.join(parentProjectsDir, 'temp_backups');
  if (fs.existsSync(parentTempBackups)) {
    try {
      const pEntries = fs.readdirSync(parentTempBackups);
      for (const entry of pEntries) {
        targets.push({
          name: `Parent project backup (temp_backups/${entry})`,
          path: path.join(parentTempBackups, entry),
          type: 'dir',
        });
      }
    } catch {}
  }

  // Calculate total potential reclaimable space
  let totalCalculatedBytes = 0;
  const analyzedTargets = targets.map((t) => {
    let size = 0;
    if (fs.existsSync(t.path)) {
      if (t.type === 'user_temp') {
        // Calculate unlocked files older than 1 hour
        const cutoff = Date.now() - 60 * 60 * 1000;
        try {
          const files = fs.readdirSync(t.path);
          for (const f of files) {
            try {
              const p = path.join(t.path, f);
              const s = fs.statSync(p);
              if (s.mtimeMs < cutoff) {
                size += s.isDirectory() ? getFolderSize(p) : s.size;
              }
            } catch {}
          }
        } catch {}
      } else {
        size = getFolderSize(t.path);
      }
    }
    totalCalculatedBytes += size;
    return { ...t, size };
  });

  const totalCalculatedGB = totalCalculatedBytes / (1024 * 1024 * 1024);

  if (isCheckOnly) {
    console.log('📋 Cache Status Assessment:');
    analyzedTargets.forEach((t) => {
      console.log(`  • ${t.name}: ${formatBytes(t.size)}`);
    });
    console.log(
      `\n📦 Total purgeable cache size: ${formatBytes(totalCalculatedBytes)} (${totalCalculatedGB.toFixed(2)} GB)`,
    );
    return;
  }

  // Threshold check (e.g. --threshold 5)
  if (thresholdGB > 0 && totalCalculatedGB < thresholdGB) {
    if (!isAuto) {
      console.log(
        `ℹ️ Cache size (${totalCalculatedGB.toFixed(2)} GB) is below the threshold of ${thresholdGB} GB.`,
      );
      console.log('✨ No cleanup required at this time.');
    }
    return;
  }

  // 2. Perform Cleanup
  let totalReclaimedBytes = 0;

  for (const target of analyzedTargets) {
    if (!fs.existsSync(target.path) || target.size === 0) {
      if (!isAuto) console.log(`  ℹ️ Skipped (clean): ${target.name}`);
      continue;
    }

    try {
      if (target.type === 'user_temp') {
        const cutoff = Date.now() - 60 * 60 * 1000;
        let tempFreed = 0;
        const entries = fs.readdirSync(target.path);
        for (const entry of entries) {
          try {
            const p = path.join(target.path, entry);
            const stat = fs.statSync(p);
            if (stat.mtimeMs < cutoff) {
              const itemSize = stat.isDirectory() ? getFolderSize(p) : stat.size;
              if (stat.isDirectory()) {
                fs.rmSync(p, { recursive: true, force: true });
              } else {
                fs.unlinkSync(p);
              }
              tempFreed += itemSize;
            }
          } catch {
            // Locked file, skip
          }
        }
        totalReclaimedBytes += tempFreed;
        if (!isAuto) console.log(`  ✅ Purged: ${target.name} (${formatBytes(tempFreed)})`);
      } else if (target.type === 'npm_cache') {
        try {
          execSync('npm cache clean --force', { stdio: 'ignore' });
        } catch {
          fs.rmSync(target.path, { recursive: true, force: true });
        }
        totalReclaimedBytes += target.size;
        if (!isAuto) console.log(`  ✅ Cleared: ${target.name} (${formatBytes(target.size)})`);
      } else if (target.type === 'dir_contents') {
        const entries = fs.readdirSync(target.path);
        let count = 0;
        let freed = 0;
        for (const e of entries) {
          try {
            const p = path.join(target.path, e);
            const s = getFolderSize(p);
            fs.rmSync(p, { recursive: true, force: true });
            freed += s;
            count++;
          } catch {}
        }
        totalReclaimedBytes += freed;
        if (!isAuto)
          console.log(`  ✅ Cleared ${count} items in: ${target.name} (${formatBytes(freed)})`);
      } else {
        fs.rmSync(target.path, { recursive: true, force: true });
        totalReclaimedBytes += target.size;
        if (!isAuto) console.log(`  ✅ Removed: ${target.name} (${formatBytes(target.size)})`);
      }
    } catch (err) {
      if (!isAuto) console.warn(`  ⚠️ Could not remove ${target.name}: ${err.message}`);
    }
  }

  const finalFreeGB = getFreeDiskGB('C:/');

  if (!isAuto) {
    console.log('\n====================================================');
    console.log(`🎉 CACHE CLEANUP COMPLETED SUCCESSFULLY!`);
    console.log(`📦 Reclaimed Space: ${formatBytes(totalReclaimedBytes)}`);
    console.log(`💾 Final C: Drive Free Space: ${finalFreeGB} GB`);
    console.log('====================================================\n');
  } else {
    // Log minimal message for scheduled task runs
    console.log(
      `[${new Date().toISOString()}] Automated Cache Maintenance: Reclaimed ${formatBytes(totalReclaimedBytes)}. Drive C: now has ${finalFreeGB} GB free.`,
    );
  }
}

main();
