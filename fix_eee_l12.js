const fs = require('fs');
let content = fs.readFileSync('eee/data.js', 'utf8');

// Find Chief Wingina and remove the sources array
const searchStr = '      "image": "/images/chief_wingina.jpg"\n,\n      "sources": [\n        {\n          "title": "Source A: Roanoke Colony",\n          "src": "/images/roanoke.jpg",\n          "caption": "A map of the failed Roanoke colony in Virginia."\n        }\n      ]';
content = content.replace(searchStr, '      "image": "/images/chief_wingina.jpg"');

// Find the end of lesson_3_4
const l34Idx = content.indexOf('"id": "lesson_3_4"');
if (l34Idx !== -1) {
    const keyIndivIdx = content.indexOf('"key_individuals"', l34Idx);
    if (keyIndivIdx !== -1) {
        const blockString = content.slice(l34Idx, keyIndivIdx);
        const lastBraceIdx = blockString.lastIndexOf('    }');
        if (lastBraceIdx !== -1) {
            const injectPos = l34Idx + lastBraceIdx;
            const sources = [
              {
                "title": "Source A: Roanoke Colony",
                "src": "/images/roanoke.jpg",
                "caption": "A map of the failed Roanoke colony in Virginia."
              }
            ];
            const injectStr = `,\n      "sources": ${JSON.stringify(sources, null, 2).replace(/\\n/g, '\\n      ')}`;
            content = content.slice(0, injectPos) + injectStr + content.slice(injectPos);
        }
    }
}

fs.writeFileSync('eee/data.js', content, 'utf8');
