const https = require('https'); 
https.get('https://html.duckduckgo.com/html/?q=site:wikimedia.org+"Great+Seal+of+England"+1651', res => { 
  let data = ''; 
  res.on('data', chunk => data += chunk); 
  res.on('end', () => console.log(data.match(/File:[^\"\']+/g))); 
});
