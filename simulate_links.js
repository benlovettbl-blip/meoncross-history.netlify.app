const fs = require('fs');
const https = require('https');
const http = require('http');

const units = [
    'public/data/edexcel_medicine.json',
    'public/data/great_war.json',
    'public/data/great_war_part2.json',
    'public/data/water_and_sanitation.json'
];

async function fetchUrl(urlStr) {
    return new Promise((resolve) => {
        const urlObj = new URL(urlStr);
        const reqMod = urlStr.startsWith('https') ? https : http;
        
        reqMod.get(urlStr, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                // Follow redirect once
                resolve(fetchUrl(res.headers.location));
                return;
            }
            
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const titleMatch = data.match(/<title[^>]*>(.*?)<\/title>/is);
                const actualTitle = titleMatch ? titleMatch[1].replace(/\n/g, '').replace(' - YouTube', '').trim() : 'Unknown';
                resolve({ status: res.statusCode, title: actualTitle });
            });
        }).on('error', (e) => {
            resolve({ status: 0, error: e.message });
        });
    });
}

async function run() {
    console.log("Starting Simulation and Link Testing...");
    for (const unit of units) {
        if (!fs.existsSync(unit)) continue;
        
        const db = JSON.parse(fs.readFileSync(unit, 'utf8'));
        const unitData = db.data || db; 
        const unitId = unit.split('/').pop().replace('.json', '');
        
        let lessonsToCheck = [];
        if (unitData.lessons) {
            lessonsToCheck = unitData.lessons;
        } else if (unitData.groupings) {
            unitData.groupings.forEach(g => {
                if (g.lessons) lessonsToCheck = lessonsToCheck.concat(g.lessons);
            });
        }
        
        for (const lesson of lessonsToCheck) {
            let allVideos = [];
            if (lesson.video) {
                if (Array.isArray(lesson.video)) allVideos = allVideos.concat(lesson.video);
                else allVideos.push(lesson.video);
            }
            if (lesson.extra_videos) {
                allVideos = allVideos.concat(lesson.extra_videos);
            }
            
            for (const v of allVideos) {
                if (v && v.url) {
                    const result = await fetchUrl(v.url);
                    if (result.status >= 200 && result.status < 400) {
                        console.log(`✅ [${unitId}] ${lesson.id || lesson.title}`);
                        console.log(`   URL: ${v.url}`);
                        console.log(`   Expected: ${v.title}`);
                        console.log(`   Actual: ${result.title.substring(0, 80)}`);
                    } else {
                        console.log(`❌ [${unitId}] ${lesson.id || lesson.title}`);
                        console.log(`   URL: ${v.url} returned status ${result.status} ${result.error || ''}`);
                    }
                }
            }
        }
    }
    console.log("Simulation Complete.");
}

run();
