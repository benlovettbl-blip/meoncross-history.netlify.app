const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
const tokens = JSON.parse(fs.readFileSync('tokens.json', 'utf8'));
const config = credentials.installed || credentials.web;

const oauth2Client = new google.auth.OAuth2(
  config.client_id,
  config.client_secret,
  'http://localhost:3000'
);
oauth2Client.setCredentials(tokens);

// Automatically save refreshed tokens
oauth2Client.on('tokens', (newTokens) => {
  const currentTokens = JSON.parse(fs.readFileSync('tokens.json', 'utf8'));
  const updatedTokens = { ...currentTokens, ...newTokens };
  fs.writeFileSync('tokens.json', JSON.stringify(updatedTokens, null, 2));
  console.log('[Auth] Refreshed and saved OAuth access tokens.');
});

const videos = [
  {
    topicId: "subtopic_1_1",
    filePath: "G:\\My Drive\\AAMX\\RESOURCES\\CME\\2mincmevideos\\2min brief Creation_of_Israel.mp4",
    title: "GCSE History Revision: Conflict in the Middle East - The Creation of Israel",
    description: "Rapid 2-minute overview video covering the British withdrawal, the creation of Israel, and the 1948–49 War."
  },
  {
    topicId: "subtopic_1_2",
    filePath: "G:\\My Drive\\AAMX\\RESOURCES\\CME\\2mincmevideos\\1.2 2 min brief Reshaping_the_Middle_East.mp4",
    title: "GCSE History Revision: Conflict in the Middle East - Reshaping the Middle East",
    description: "Rapid 2-minute overview video covering the aftermath of the 1948-49 war, borders, and regional changes."
  },
  {
    topicId: "subtopic_1_3",
    filePath: "G:\\My Drive\\AAMX\\RESOURCES\\CME\\2mincmevideos\\1.3 2 min brief Nasser_&_The_Suez_Crisis.mp4",
    title: "GCSE History Revision: Conflict in the Middle East - Nasser & The Suez Crisis",
    description: "Rapid 2-minute overview video covering the rise of Nasser, nationalisation of the Suez Canal, and the 1956 Suez Crisis."
  },
  {
    topicId: "subtopic_2_1",
    filePath: "G:\\My Drive\\AAMX\\RESOURCES\\CME\\2mincmevideos\\2.1 2 min brief The_Six_Day_War.mp4",
    title: "GCSE History Revision: Conflict in the Middle East - The Six Day War",
    description: "Rapid 2-minute overview video covering the causes, events, and immediate consequences of the Six-Day War (1967)."
  },
  {
    topicId: "subtopic_2_2",
    filePath: "G:\\My Drive\\AAMX\\RESOURCES\\CME\\2mincmevideos\\2min brief The_Aftermath_of_1967.mp4",
    title: "GCSE History Revision: Conflict in the Middle East - The Aftermath of 1967",
    description: "Rapid 2-minute overview video covering UN Resolution 242, the War of Attrition, and the rise of Palestinian nationalism."
  },
  {
    topicId: "subtopic_2_3",
    filePath: "G:\\My Drive\\AAMX\\RESOURCES\\CME\\2mincmevideos\\2min brief Israel_&_Egypt__War_to_Peace.mp4",
    title: "GCSE History Revision: Conflict in the Middle East - Israel & Egypt: War to Peace",
    description: "Rapid 2-minute overview video covering the Yom Kippur War (1973), Kissinger's shuttle diplomacy, and the Camp David Accords."
  },
  {
    topicId: "subtopic_3_1",
    filePath: "G:\\My Drive\\AAMX\\RESOURCES\\CME\\2mincmevideos\\2 min brief Oil_Crisis_to_Peace_Treaty.mp4",
    title: "GCSE History Revision: Conflict in the Middle East - Oil Crisis to Peace Treaty",
    description: "Rapid 2-minute overview video covering the 1973 Oil Crisis, diplomatic negotiations, and the 1979 Egypt-Israel Peace Treaty."
  },
  {
    topicId: "subtopic_3_2",
    filePath: "G:\\My Drive\\AAMX\\RESOURCES\\CME\\2mincmevideos\\2min brief Lebanon_&_The_First_Intifada.mp4",
    title: "GCSE History Revision: Conflict in the Middle East - Lebanon & The First Intifada",
    description: "Rapid 2-minute overview video covering the 1982 Lebanon War, the PLO's expulsion, and the First Intifada (1987-1993)."
  },
  {
    topicId: "subtopic_3_3",
    filePath: "G:\\My Drive\\AAMX\\RESOURCES\\CME\\2mincmevideos\\2min brief The_Oslo_Accords.mp4",
    title: "GCSE History Revision: Conflict in the Middle East - The Oslo Accords",
    description: "Rapid 2-minute overview video covering the secret negotiations, Oslo I (1993), Oslo II (1995), and the peace process aftermath."
  }
];

function uploadToYouTube(filePath, title, description) {
  return new Promise(async (resolve, reject) => {
    try {
      const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
      const fileStream = fs.createReadStream(filePath);
      
      const res = await youtube.videos.insert({
        part: 'snippet,status',
        requestBody: {
          snippet: {
            title: title,
            description: description,
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

async function run() {
  const mapping = {};
  const mappingPath = '../cme_youtube_mapping.json';
  
  if (fs.existsSync(mappingPath)) {
    try {
      Object.assign(mapping, JSON.parse(fs.readFileSync(mappingPath, 'utf8')));
      console.log("Loaded existing video mappings:", mapping);
    } catch (e) {}
  }
  
  for (const video of videos) {
    if (mapping[video.topicId]) {
      console.log(`Skipping already uploaded: ${video.topicId} -> ${mapping[video.topicId]}`);
      continue;
    }
    
    if (!fs.existsSync(video.filePath)) {
      console.error(`ERROR: File does not exist at ${video.filePath}`);
      continue;
    }
    
    console.log(`Uploading ${video.topicId} (${path.basename(video.filePath)})...`);
    try {
      const youtubeId = await uploadToYouTube(video.filePath, video.title, video.description);
      mapping[video.topicId] = `https://youtu.be/${youtubeId}`;
      fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2), 'utf8');
      console.log(`Success: ${video.topicId} uploaded! ID: ${youtubeId}`);
      // Wait 2 seconds between uploads to be safe
      await new Promise(r => setTimeout(r, 2000));
    } catch (err) {
      console.error(`Failed to upload ${video.topicId}:`, err.message);
    }
  }
  
  console.log("All uploads complete. Final mapping:", mapping);
}

run();
