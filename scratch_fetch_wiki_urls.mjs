import https from 'https';

function fetchImageUrl(title) {
    return new Promise((resolve, reject) => {
        const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=500`;
        const options = {
            headers: {
                'User-Agent': 'MeoncrossHistory/1.0 (meoncross@example.com)'
            }
        };
        https.get(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    const pages = parsed.query.pages;
                    for (let key in pages) {
                        if (pages[key].thumbnail) {
                            resolve(pages[key].thumbnail.source);
                        } else {
                            resolve(null);
                        }
                    }
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function run() {
    try {
        const urls = {
            sarajevo: await fetchImageUrl('Assassination of Archduke Franz Ferdinand'),
            sarajevo2: await fetchImageUrl('Gavrilo Princip'),
            newspaper: await fetchImageUrl('World War I'),
            versailles: await fetchImageUrl('Treaty of Versailles'),
            munitions: await fetchImageUrl('Women in the First World War')
        };
        console.log(JSON.stringify(urls, null, 2));
    } catch(e) {
        console.error(e);
    }
}

run();
