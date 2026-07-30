const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const { exec } = require('child_process');
const { google } = require('googleapis');

const WATCH_DIR = 'G:\\My Drive\\AAMX\\RESOURCES\\EEE\\eee 2min videos';
const STATE_FILE = path.join(__dirname, 'processed_videos.json');

// Hardcoded topic ID to name mapping for clean YouTube video titles
const topicNames = {
  '1.1': "The situation on Elizabeth's accession",
  '1.2': "The 'Settlement' of Religion",
  '1.3': "Challenges to the Religious Settlement",
  '1.4': "The Problem of Mary, Queen of Scots",
  '2.1': "Plots and Revolts at Home",
  '2.2': "Relations with Spain",
  '2.3': "Outbreak of War with Spain (1585–88)",
  '2.4': "The Spanish Armada (1588)",
  '3.1': "Education and Leisure",
  '3.2': "The 'Problem' of the Poor",
  '3.3': "Exploration and Voyages of Discovery",
  '3.4': "Attempted Colonisation of Virginia"
};

// Queue variables to ensure sequential file processing (avoids HTML write corruption or concurrent upload issues)
const uploadQueue = [];
let isProcessingQueue = false;

// 1. Initial State Check
if (!fs.existsSync('credentials.json') || !fs.existsSync('tokens.json')) {
  console.error("ERROR: Missing credentials.json or tokens.json! Please run 'node auth.js' first.");
  process.exit(1);
}

// Load Google API OAuth Client
const credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
const tokens = JSON.parse(fs.readFileSync('tokens.json', 'utf8'));
const config = credentials.installed || credentials.web;

const oauth2Client = new google.auth.OAuth2(
  config.client_id,
  config.client_secret,
  'http://localhost:3000'
);
oauth2Client.setCredentials(tokens);

// Listen to token refresh events and save updated tokens persistently
oauth2Client.on('tokens', (newTokens) => {
  const currentTokens = JSON.parse(fs.readFileSync('tokens.json', 'utf8'));
  const updatedTokens = { ...currentTokens, ...newTokens };
  fs.writeFileSync('tokens.json', JSON.stringify(updatedTokens, null, 2));
  console.log('[Auth] Refreshed and saved OAuth access tokens.');
});

// Load upload state
let state = {};
if (fs.existsSync(STATE_FILE)) {
  try {
    state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  } catch (e) {
    console.error("Failed to parse state file, starting fresh:", e.message);
  }
}

function saveState() {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
}

// 2. Main File Processing Logic
async function processFile(filePath) {
  const fileName = path.basename(filePath);
  const stats = fs.statSync(filePath);
  
  // Skip if already processed in database
  if (state[filePath] && state[filePath].size === stats.size) {
    return;
  }

  // Parse Key Topic from filename (e.g. KT1.1 or KT 1.1)
  const match = fileName.match(/KT\s*(\d+\.\d+)/i);
  if (!match) {
    console.warn(`[Watcher] Ignored file (no Key Topic match): ${fileName}`);
    return;
  }

  const topicId = match[1];
  const topicName = topicNames[topicId] || "GCSE History Overview";
  
  console.log('==========================================');
  console.log(`[Queue] Processing: ${fileName}`);
  console.log(`[Queue] Key Topic Identified: ${topicId}`);
  console.log(`[Queue] Starting YouTube Upload (unlisted)...`);
  
  try {
    const youtubeId = await uploadToYouTube(filePath, topicId, topicName);
    console.log(`[YouTube] Successfully uploaded! Video ID: ${youtubeId}`);
    
    console.log(`[HTML] Updating revision component in index.html...`);
    updateHtmlComponent(topicId, youtubeId);
    
    console.log(`[Build] Triggering app build & compilation...`);
    await runBuildCommands();
    
    // Save to processed list
    state[filePath] = {
      youtubeId: youtubeId,
      topicId: topicId,
      uploadedAt: new Date().toISOString(),
      size: stats.size
    };
    saveState();
    
    console.log(`[Success] Synced and compiled topic ${topicId}!`);
    console.log('==========================================');
  } catch (err) {
    console.error(`[Error] Failed to process ${fileName}:`, err);
  }
}

// 3. YouTube Upload API
function uploadToYouTube(filePath, topicId, topicName) {
  return new Promise(async (resolve, reject) => {
    try {
      const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
      
      const fileStream = fs.createReadStream(filePath);
      
      const res = await youtube.videos.insert({
        part: 'snippet,status',
        requestBody: {
          snippet: {
            title: `GCSE History Revision: Key Topic ${topicId} - ${topicName}`,
            description: `Rapid 2-minute overview video covering Key Topic ${topicId} ("${topicName}") of the Edexcel GCSE Early Elizabethan England specification.`,
            categoryId: '27', // Education
            defaultLanguage: 'en'
          },
          status: {
            privacyStatus: 'unlisted',
            selfDeclaredMadeForKids: false
          }
        },
        media: {
          body: fileStream
        }
      });
      
      resolve(res.data.id);
    } catch (e) {
      reject(e);
    }
  });
}

// 4. HTML Modifier
function updateHtmlComponent(topicId, youtubeId) {
  let html = fs.readFileSync('index.html', 'utf8');
  
  // Find the block for this Key Topic
  const startTag = `<!-- Rapid Revision Video Component: KT ${topicId} -->`;
  const startIdx = html.indexOf(startTag);
  
  if (startIdx === -1) {
    console.error(`[HTML] Could not find start tag for topic ${topicId} in index.html!`);
    return;
  }
  
  // Locate the end of the parent container
  const videoIframeContainerIdx = html.indexOf('class="video-iframe-container"', startIdx);
  if (videoIframeContainerIdx === -1) {
    console.error(`[HTML] Could not find video-iframe-container in block for topic ${topicId}`);
    return;
  }
  const endContainerIdx = html.indexOf('</div>', videoIframeContainerIdx);
  const endParentIdx = html.indexOf('</div>', endContainerIdx + 6);
  const rangeEnd = endParentIdx + 6;
  
  const topicName = topicNames[topicId] || "GCSE History Overview";
  
  // Generate the new smart HTML block
  const newBlock = `<!-- Rapid Revision Video Component: KT ${topicId} -->
      <div class="rapid-video-parent" style="background-color: #e0e7ff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); padding: 20px; margin-bottom: 20px; font-family: sans-serif; line-height: 1.7;">
        <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; flex-shrink: 0;">
            <button onclick="const container = this.closest('.rapid-video-parent').querySelector('.video-iframe-container'); const isHidden = container.style.display === 'none'; container.style.display = isHidden ? 'block' : 'none'; if (isHidden) { const isEmbedAllowed = window.location.protocol === 'http:' || window.location.protocol === 'https:'; if (isEmbedAllowed) { container.innerHTML = \\\`<iframe src='https://www.youtube.com/embed/${youtubeId}?autoplay=1' style='position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;' allow='autoplay; fullscreen' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>\\\`; } else { container.innerHTML = \\\`<div style='position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #111827; padding: 20px; color: #ffffff; text-align: center; font-family: sans-serif;'><p style='margin: 0 0 10px 0; font-size: 1.1rem; color: #f3f4f6; font-weight: bold;'>⚠️ Local Playback Restricted</p><p style='margin: 0 0 15px 0; font-size: 0.85rem; color: #9ca3af; line-height: 1.4; max-width: 350px;'>To protect your system privacy, browsers block YouTube embeds when viewing apps directly from local files. Click below to watch this overview on YouTube:</p><a href='https://youtu.be/${youtubeId}' target='_blank' style='display: inline-block; background-color: #ef4444; color: white; font-weight: bold; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-size: 0.9rem; box-shadow: 0 2px 4px rgba(239,68,68,0.3);'>Open YouTube ↗️</a></div>\\\`; } this.innerText = '❌ Close Player'; this.style.backgroundColor = '#4b5563'; } else { container.innerHTML = ''; this.innerText = '▶️ Watch 2-Minute Overview'; this.style.backgroundColor = '#ef4444'; }" style="display: inline-block; background-color: #ef4444; color: #ffffff; font-weight: bold; padding: 12px 24px; border-radius: 30px; text-decoration: none; border: none; cursor: pointer; box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2); white-space: nowrap; font-family: sans-serif; font-size: 1rem; transition: background-color 0.2s ease;">▶️ Watch 2-Minute Overview</button>
            <a href="https://youtu.be/${youtubeId}" target="_blank" style="display: inline-block; color: #4f46e5; font-weight: bold; text-decoration: underline; font-size: 0.85rem; white-space: nowrap;">Watch on YouTube ↗️</a>
          </div>
          <div style="flex: 1; min-width: 250px;">
            <h3 style="margin: 0 0 6px 0; color: #1e1b4b; font-size: 1.2rem; font-weight: bold;">📺 Rapid Revision Overview: KT ${topicId} - ${topicName}</h3>
            <p style="margin: 0; font-style: italic; color: #3730a3; font-size: 0.95rem;">"Prime the pump! Watch this rapid 2-minute summary to lock in the core narrative before you dive into the detailed facts below."</p>
          </div>
        </div>
        <div class="video-iframe-container" style="display: none; margin-top: 15px; border-radius: 8px; overflow: hidden; position: relative; padding-bottom: 56.25%; height: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.15); background: #000;"></div>
      </div>`;
  
  // Insert rewritten block back
  html = html.substring(0, startIdx) + newBlock + html.substring(rangeEnd);
  fs.writeFileSync('index.html', html, 'utf8');
}

// 5. System Rebuild Script Spawning
function runBuildCommands() {
  return new Promise((resolve) => {
    // Run npm run build
    exec('npm run build', (err, stdout, stderr) => {
      if (err) {
        console.error('[Build Error] npm run build failed:', stderr);
      } else {
        console.log('[Build] Synced web assets to www/ folder.');
      }
      
      // Run bundle.ps1
      exec('powershell -ExecutionPolicy Bypass -File ./bundle.ps1', (err2, stdout2, stderr2) => {
        if (err2) {
          console.error('[Build Error] bundle.ps1 failed:', stderr2);
        } else {
          console.log('[Build] Standalone bundled_app.html compiled successfully.');
        }
        resolve();
      });
    });
  });
}

// 6. Queue manager
function addToQueue(filePath) {
  uploadQueue.push(filePath);
  triggerQueueProcessing();
}

async function triggerQueueProcessing() {
  if (isProcessingQueue) return;
  isProcessingQueue = true;
  
  while (uploadQueue.length > 0) {
    const filePath = uploadQueue.shift();
    try {
      // Add a small delay (1 second) to ensure file locks are fully released by Google Drive sync
      await new Promise(r => setTimeout(r, 1000));
      await processFile(filePath);
    } catch (err) {
      console.error(`[Queue Error] Failed to process file ${filePath}:`, err);
    }
  }
  
  isProcessingQueue = false;
}

// 7. Initialize Directory Watcher
console.log('==========================================');
console.log(`[Watcher] Initializing...`);
console.log(`[Watcher] Monitoring path: ${WATCH_DIR}`);
console.log('==========================================');

const watcher = chokidar.watch(WATCH_DIR, {
  persistent: true,
  ignoreInitial: false, // Ensures existing files in folder are scanned and processed on boot
  awaitWriteFinish: {   // Wait until the file size is stable for 3 seconds before processing (handles sync delays)
    stabilityThreshold: 3000,
    pollInterval: 100
  }
});

watcher.on('add', (filePath) => {
  if (path.extname(filePath).toLowerCase() === '.mp4') {
    addToQueue(filePath);
  }
});

watcher.on('error', (error) => {
  console.error(`[Watcher Error] Chokidar encountered error: ${error.message}`);
});
