const fs = require('fs');
const { google } = require('googleapis');

async function main() {
  console.log("Loading credentials and tokens...");
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

  console.log("Fetching channel info...");
  const channelRes = await youtube.channels.list({
    mine: true,
    part: 'contentDetails,snippet'
  });

  if (!channelRes.data.items || channelRes.data.items.length === 0) {
    console.log("No channels found for this account.");
    return;
  }

  const channel = channelRes.data.items[0];
  console.log(`Channel Title: ${channel.snippet.title}`);
  const uploadsPlaylistId = channel.contentDetails.relatedPlaylists.uploads;
  console.log(`Uploads Playlist ID: ${uploadsPlaylistId}`);

  console.log("Fetching uploads playlist items...");
  const playlistItemsRes = await youtube.playlistItems.list({
    playlistId: uploadsPlaylistId,
    part: 'snippet',
    maxResults: 50
  });

  const items = playlistItemsRes.data.items || [];
  console.log(`\nFound ${items.length} videos in uploads:\n`);
  
  items.forEach((item, idx) => {
    const title = item.snippet.title;
    const desc = item.snippet.description;
    const videoId = item.snippet.resourceId.videoId;
    console.log(`[${idx + 1}] Title: ${title}`);
    console.log(`    Video ID: ${videoId}`);
    console.log(`    Description: ${desc.substring(0, 150).replace(/\n/g, ' ')}...`);
    console.log(`    URL: https://www.youtube.com/watch?v=${videoId}`);
    console.log("-".repeat(60));
  });
}

main().catch(err => {
  console.error("Error fetching videos:", err);
});
