import fs from 'fs';

async function getYT() {
  const res = await fetch('https://www.youtube.com/watch?v=DduN1cU2p9U');
  const text = await res.text();
  const titleMatch = text.match(/<title>(.*?) - YouTube<\/title>/);
  const lengthMatch = text.match(/"lengthSeconds":"(\d+)"/);
  console.log(titleMatch ? titleMatch[1] : 'No Title');
  console.log(lengthMatch ? lengthMatch[1] : 'No Length');
}
getYT();
