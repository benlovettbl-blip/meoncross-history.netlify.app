const https = require('https');

function search(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&utf8=&format=json`;
  https.get(url, (res) => {
    let data = '';
    res.on('data', (c) => data += c);
    res.on('end', () => {
      const json = JSON.parse(data);
      console.log('--- ' + query + ' ---');
      json.query.search.slice(0, 5).forEach(r => console.log(r.title));
    });
  });
}

search('WW1 gas mask');
search('WW1 blood transfusion');
search('Oswald Robertson WW1');
search('gas attack WW1');
