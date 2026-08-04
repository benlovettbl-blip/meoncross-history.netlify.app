const fs = require('fs');
const http = require('http');
const url = require('url');
const { exec } = require('child_process');
const { google } = require('googleapis');

if (!fs.existsSync('credentials.json')) {
  console.error("==========================================");
  console.error("ERROR: credentials.json is missing!");
  console.error("Please place your downloaded OAuth client secrets file in the project root.");
  console.error("==========================================");
  process.exit(1);
}

const credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
const config = credentials.installed || credentials.web;

if (!config) {
  console.error("ERROR: Invalid credentials.json format!");
  process.exit(1);
}

const { client_id, client_secret } = config;
const port = 3000;
const redirectUri = `http://localhost:${port}`;

const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirectUri
);

const scopes = [
  'https://www.googleapis.com/auth/youtube.readonly'
];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline', // Required to receive a refresh token for persistent daemon use
  prompt: 'consent',     // Force consent to guarantee refresh token delivery
  scope: scopes
});

const server = http.createServer(async (req, res) => {
  try {
    const reqUrl = req.url;
    if (reqUrl.includes('code=')) {
      const q = url.parse(reqUrl, true).query;
      const code = q.code;
      
      console.log('Exchanging authorization code for tokens...');
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
      
      fs.writeFileSync('tokens.json', JSON.stringify(tokens, null, 2));
      console.log('==========================================');
      console.log('SUCCESS: Authentication completed successfully!');
      console.log('tokens.json has been written to the project root.');
      console.log('==========================================');
      
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <html>
          <body style="font-family: sans-serif; text-align: center; padding: 50px; background-color: #f0fdf4; color: #15803d;">
            <h1 style="font-size: 2.5rem; margin-bottom: 20px;">✓ Authentication Successful!</h1>
            <p style="font-size: 1.2rem; color: #166534;">You have authenticated successfully with Google/YouTube.</p>
            <p style="font-size: 1rem; color: #166534;">You can close this tab and return to the terminal now.</p>
          </body>
        </html>
      `);
      
      server.close(() => {
        console.log('OAuth helper server shut down.');
        process.exit(0);
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } catch (err) {
    console.error('Error during token exchange:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

server.listen(port, () => {
  console.log('==========================================');
  console.log(`Auth server running on http://localhost:${port}`);
  console.log('Opening default web browser to Google login page...');
  console.log('==========================================');
  console.log(`If the browser does not open automatically, copy/paste this URL into your browser:\n\n${authUrl}\n`);
  
  exec(`start "" "${authUrl}"`, (err) => {
    if (err) {
      console.warn("Failed to launch default browser. Please manually copy the URL above.");
    }
  });
});
