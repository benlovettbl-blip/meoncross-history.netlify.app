const fs = require('fs');
const https = require('https');

const broken = JSON.parse(fs.readFileSync('broken_sources.json', 'utf8'));

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function searchWiki(query) {
    return new Promise((resolve) => {
        const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=1&prop=pageimages&pithumbsize=500&format=json`;
        https.get(url, { headers: { 'User-Agent': 'AntigravityIDE/4.0' } }, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 429) {
                    console.log(`Rate limited for: ${query}. Retrying in 5s...`);
                    setTimeout(() => searchWiki(query).then(resolve), 5000);
                    return;
                }
                try {
                    const json = JSON.parse(data);
                    if (json.query && json.query.pages) {
                        const page = Object.values(json.query.pages)[0];
                        if (page.thumbnail && page.thumbnail.source) {
                            resolve(page.thumbnail.source);
                            return;
                        }
                    }
                } catch (e) {}
                resolve(null);
            });
        }).on('error', () => resolve(null));
    });
}

async function run() {
    let dataCode = fs.readFileSync('edexcel_medicine/data.js', 'utf8');
    let dataObjStr = dataCode.replace(/^export\s+default\s+/, '').replace(/;$/, '');
    const lastBrace = dataObjStr.lastIndexOf('}');
    const dataObj = eval('(' + dataObjStr.substring(0, lastBrace + 1) + ')');

    for (let item of broken) {
        console.log(`Searching for: ${item.title}`);
        let url = await searchWiki(item.title);
        if (!url) {
            // Fallback to broader searches for specific ones if they fail
            if (item.title === 'The Hotel-Dieu Hospital') url = await searchWiki('The Hôtel Dieu, Paris; interior showing patients being nurse Wellcome');
            else if (item.title === 'The Tournai Mass Burial (1349)') url = await searchWiki('Tournai citizens burying the dead during the black death');
            else if (item.title === 'Stretcher Bearers in Mud') url = await searchWiki('Stretcher bearers in the mud, Passchendaele, August 1917');
            else if (item.title === 'Horse-Drawn Ambulance') url = await searchWiki('A horse-drawn ambulance wagon on the Western Front. Q32228');
            else if (item.title === 'The Thomas Splint') url = await searchWiki('A Thomas splint in use on a wounded soldier, France. Wellcome L0014769');
            else if (item.title === 'Vintage Cigarette Advertisement') url = await searchWiki('Camel Cigarettes Ad - More Doctors Smoke Camels');
            else if (item.title === 'Modern Anti-Smoking Warning') url = await searchWiki('Cigarette warning label Canada');
            else if (item.title === 'Early Gas Masks') url = await searchWiki('British soldiers with gas masks, First World War');
            else if (item.title === 'Shrapnel X-Ray') url = await searchWiki('X-ray of shrapnel in the arm of a soldier, WWI Wellcome L0014768');
        }

        if (url) {
            console.log(`Found: ${url}`);
            const lesson = dataObj.lessons.find(l => l.id === item.lessonId);
            lesson.starters[item.index].source = url;
        } else {
            console.log(`Failed to find thumbnail for: ${item.title}`);
        }
        await delay(3000); // 3 second delay to avoid 429
    }

    const newDataCode = 'export default ' + JSON.stringify(dataObj, null, 2) + ';';
    fs.writeFileSync('edexcel_medicine/data.js', newDataCode, 'utf8');
    console.log('Successfully patched edexcel_medicine/data.js');
}

run();
