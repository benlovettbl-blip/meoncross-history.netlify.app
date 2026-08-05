const fs = require('fs');

const brokenUrls = [
    'https://www.youtube.com/watch?v=R9_mG-j569s',
    'https://www.youtube.com/watch?v=H74tq3wV0jA',
    'https://www.youtube.com/watch?v=4y54B8L00wE',
    'https://www.youtube.com/watch?v=gTtb3cTfUms',
    'https://www.youtube.com/watch?v=b0O-L2iXyT4',
    'https://www.youtube.com/watch?v=KzXkC2_F0Lg',
    'https://www.youtube.com/watch?v=1FhW3D3qX6o',
    'https://www.youtube.com/watch?v=9g0HihOqBBE',
    'https://www.youtube.com/watch?v=J8n0-d8GsmE',
    'https://www.youtube.com/watch?v=GZGIcfoaX9c'
];

function removeBroken(unitPath) {
    if (!fs.existsSync(unitPath)) return;
    
    const dataStr = fs.readFileSync(unitPath, 'utf8');
    const jsonStartIndex = dataStr.indexOf('{');
    const preText = dataStr.substring(0, jsonStartIndex);
    
    let jsonStr = dataStr.substring(jsonStartIndex);
    let suffix = '';
    if (jsonStr.endsWith(';\n')) {
        jsonStr = jsonStr.slice(0, -2);
        suffix = ';\n';
    } else if (jsonStr.endsWith(';')) {
        jsonStr = jsonStr.slice(0, -1);
        suffix = ';';
    }
    
    const data = JSON.parse(jsonStr);
    let removedCount = 0;
    
    if (data.lessons) {
        data.lessons.forEach(l => {
            if (l.video) {
                const originalLength = Array.isArray(l.video) ? l.video.length : 1;
                
                if (Array.isArray(l.video)) {
                    l.video = l.video.filter(v => !brokenUrls.includes(v.url));
                } else if (brokenUrls.includes(l.video.url)) {
                    l.video = [];
                }
                
                // If it became an empty array, maybe delete it or keep it
                if (Array.isArray(l.video) && l.video.length === 0) {
                    delete l.video;
                }
                
                const newLength = l.video ? (Array.isArray(l.video) ? l.video.length : 1) : 0;
                removedCount += (originalLength - newLength);
            }
        });
    }
    
    fs.writeFileSync(unitPath, preText + JSON.stringify(data, null, 2) + suffix, 'utf8');
    console.log(`Removed ${removedCount} broken videos from ${unitPath}`);
}

removeBroken('edexcel_medicine/data.js');
removeBroken('great_war/data.js');
