const data = require('./great_war_part2/data.js');
let allMaps = [];
data.lessons.forEach(l => {
    let map = {};
    let c = 65;
    function p(o) {
        if(!o || typeof o !== 'object') return;
        ['image_caption', 'image_alt', 'caption', 'title', 'text'].forEach(k => {
            if(typeof o[k]==='string'){
                let ms = [...o[k].matchAll(/Source\s+([A-Z])\s*[:\-]/g)];
                ms.forEach(m => {
                    if(!map[m[1]]) {
                        map[m[1]] = String.fromCharCode(c++);
                    }
                });
            }
        });
        for(let k in o) {
            if(typeof o[k] === 'object') p(o[k]);
        }
    }
    p(l);
    allMaps.push(map);
});
console.log(allMaps[0]);
