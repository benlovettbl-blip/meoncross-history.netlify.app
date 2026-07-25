const fs = require('fs');
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

async function test() {
  try {
    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
    const res = await youtube.channels.list({
      part: 'snippet',
      mine: true
    });
    console.log("SUCCESS: Authorized channel name is:", res.data.items[0].snippet.title);
  } catch (err) {
    console.error("Auth test failed:", err.message);
  }
}
test();
