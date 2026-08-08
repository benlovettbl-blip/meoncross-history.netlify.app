const https = require('https');

async function search() {
    const query = "The Inside View of the Royal Exchange at LONDON Bowles";
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&srnamespace=6`;
    const searchRes = await fetch(searchUrl, { headers: { 'User-Agent': 'MeoncrossHistory/1.0' } });
    const searchData = await searchRes.json();
    console.log(searchData.query.search);
}
search();
