const fs = require('fs');
const path = require('path');

const pathsToCheck = [
  'C:\\Users\\fives\\.gemini\\antigravity\\cme_youtube_mapping.json',
  'C:\\Users\\fives\\.gemini\\antigravity\\usa_youtube_mapping.json',
  'C:\\Users\\fives\\.gemini\\antigravity\\tokens.json',
  'C:\\Users\\fives\\.gemini\\antigravity\\youtube_token.json',
  'C:\\Users\\fives\\.gemini\\antigravity\\credentials.json',
  'C:\\Users\\fives\\.gemini\\antigravity\\client_secret.json',
  'C:\\Users\\fives\\.gemini\\antigravity\\scratch\\cme_youtube_mapping.json',
  'C:\\Users\\fives\\.gemini\\antigravity\\scratch\\usa_youtube_mapping.json',
  'C:\\Users\\fives\\.gemini\\antigravity\\scratch\\tokens.json',
  'C:\\Users\\fives\\.gemini\\antigravity\\scratch\\youtube_token.json',
  'C:\\Users\\fives\\.gemini\\antigravity\\scratch\\credentials.json',
  'C:\\Users\\fives\\.gemini\\antigravity\\scratch\\client_secret.json',
  'C:\\Users\\fives\\.gemini\\antigravity\\scratch\\gcse-elizabethan-revision\\cme_youtube_mapping.json',
  'C:\\Users\\fives\\.gemini\\antigravity\\scratch\\gcse-elizabethan-revision\\usa_youtube_mapping.json',
  'C:\\Users\\fives\\.gemini\\antigravity\\scratch\\gcse-elizabethan-revision\\tokens.json',
  'C:\\Users\\fives\\.gemini\\antigravity\\scratch\\gcse-elizabethan-revision\\youtube_token.json',
  'C:\\Users\\fives\\.gemini\\antigravity\\scratch\\gcse-elizabethan-revision\\credentials.json',
  'C:\\Users\\fives\\.gemini\\antigravity\\scratch\\gcse-elizabethan-revision\\client_secret.json',
  'C:\\Users\\fives\\.gemini\\antigravity\\scratch\\edexcelgcsehistorycme.netlify.app\\cme_youtube_mapping.json',
  'C:\\Users\\fives\\.gemini\\antigravity\\scratch\\edexcelgcsehistorycme.netlify.app\\usa_youtube_mapping.json',
  'C:\\Users\\fives\\.gemini\\antigravity\\scratch\\edexcelgcsehistorycme.netlify.app\\tokens.json',
  'C:\\Users\\fives\\.gemini\\antigravity\\scratch\\edexcelgcsehistorycme.netlify.app\\youtube_token.json',
  'C:\\Users\\fives\\.gemini\\antigravity\\scratch\\edexcelgcsehistorycme.netlify.app\\credentials.json',
  'C:\\Users\\fives\\.gemini\\antigravity\\scratch\\edexcelgcsehistorycme.netlify.app\\client_secret.json'
];

pathsToCheck.forEach(p => {
  if (fs.existsSync(p)) {
    console.log(`EXISTS: ${p} (${fs.statSync(p).size} bytes)`);
  } else {
    // console.log(`NOT FOUND: ${p}`);
  }
});
