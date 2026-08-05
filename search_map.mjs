import fetch from 'node-fetch';

async function searchWiki(query) {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    console.log(searchData.query.search.slice(0, 5).map(r => r.title));
}
searchWiki("Ottoman Empire map");
