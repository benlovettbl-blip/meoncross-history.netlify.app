const https = require('https');

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            'User-Agent':
              'AntigravityHistoryCurriculum/2.0 (contact: admin@the-history-revision-hub.internal)',
          },
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              reject(new Error('Parse error on ' + url + ': ' + data.substring(0, 100)));
            }
          });
        },
      )
      .on('error', reject);
  });
}

async function searchCommons(query) {
  const url =
    'https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=' +
    encodeURIComponent(query) +
    '&srnamespace=6&format=json&srlimit=8';
  const json = await fetchJson(url);
  return json.query && json.query.search ? json.query.search.map((s) => s.title) : [];
}

async function getImageInfo(title) {
  const url =
    'https://commons.wikimedia.org/w/api.php?action=query&titles=' +
    encodeURIComponent(title) +
    '&prop=imageinfo&iiprop=url|size|extmetadata&format=json';
  const json = await fetchJson(url);
  const pages = json.query.pages;
  const pageId = Object.keys(pages)[0];
  return pages[pageId].imageinfo ? pages[pageId].imageinfo[0] : null;
}

module.exports = { searchCommons, getImageInfo, delay, fetchJson };
