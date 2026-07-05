const fs = require('fs');
const { google } = require('googleapis');

async function main() {
  const credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
  const tokens = JSON.parse(fs.readFileSync('tokens.json', 'utf8'));
  const config = credentials.installed || credentials.web;

  const oauth2Client = new google.auth.OAuth2(
    config.client_id,
    config.client_secret,
    'http://localhost:3000'
  );
  oauth2Client.setCredentials(tokens);

  const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

  const channelRes = await youtube.channels.list({
    mine: true,
    part: 'contentDetails'
  });

  const uploadsPlaylistId = channelRes.data.items[0].contentDetails.relatedPlaylists.uploads;

  let nextPageToken = '';
  const allCmeVideos = [];

  console.log("Searching all uploads for CME videos...");
  do {
    const playlistItemsRes = await youtube.playlistItems.list({
      playlistId: uploadsPlaylistId,
      part: 'snippet',
      maxResults: 50,
      pageToken: nextPageToken
    });

    const items = playlistItemsRes.data.items || [];
    items.forEach(item => {
      const title = item.snippet.title;
      if (title.toLowerCase().includes('conflict in the middle east')) {
        allCmeVideos.push({
          title: title,
          id: item.snippet.resourceId.videoId,
          desc: item.snippet.description
        });
      }
    });

    nextPageToken = playlistItemsRes.data.nextPageToken || '';
  } while (nextPageToken);

  console.log(`Found ${allCmeVideos.length} CME videos.`);
  
  let outputText = '';
  allCmeVideos.forEach((vid, idx) => {
    outputText += `[${idx + 1}] Title: ${vid.title}\n`;
    outputText += `    Video ID: ${vid.id}\n`;
    outputText += `    URL: https://www.youtube.com/watch?v=${vid.id}\n`;
    outputText += `    Description: ${vid.desc.trim()}\n`;
    outputText += "-".repeat(60) + "\n";
  });

  fs.writeFileSync('cme_uploaded_videos.txt', outputText, 'utf8');
  console.log("Saved results to cme_uploaded_videos.txt");
}

main().catch(err => {
  console.error("Error:", err);
});
