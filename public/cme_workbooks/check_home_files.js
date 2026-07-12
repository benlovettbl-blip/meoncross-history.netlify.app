const fs = require('fs');
const paths = [
  'C:\\Users\\fives\\credentials.json',
  'C:\\Users\\fives\\tokens.json',
  'C:\\Users\\fives\\client_secret.json',
  'C:\\Users\\fives\\youtube_token.json',
  'C:\\Users\\fives\\.youtube_token.json'
];
paths.forEach(p => {
  if (fs.existsSync(p)) {
    console.log(`FOUND: ${p}`);
  }
});
