const https = require('https');
https.get('https://www.youtube.com/watch?v=WRTm7mw25WU', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const m = body.match(/"lengthSeconds":"(\d+)"/);
    if(m) {
      const s = parseInt(m[1]);
      console.log(Math.floor(s/60) + ' mins ' + (s%60) + ' secs');
    } else {
      console.log('Not found');
    }
  });
});
