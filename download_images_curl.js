const { execSync } = require('child_process');

const images = [
    { name: 'gw_clc.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Chinese_Labour_Corps.jpg/500px-Chinese_Labour_Corps.jpg' },
    { name: 'gw_arboretum.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Shot_at_Dawn_Memorial%2C_National_Memorial_Arboretum.jpg/500px-Shot_at_Dawn_Memorial%2C_National_Memorial_Arboretum.jpg' },
    { name: 'gw_wilfred_owen.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Wilfred_Owen_Plate_39.jpg/500px-Wilfred_Owen_Plate_39.jpg' },
    { name: 'gw_jessie_pope.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Jessie_Pope_circa_1915.jpg/500px-Jessie_Pope_circa_1915.jpg' },
    { name: 'gw_clemenceau.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Clemenceau_-_Nadars.jpg/500px-Clemenceau_-_Nadars.jpg' },
    { name: 'gw_woodrow_wilson.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/President_Woodrow_Wilson_portrait_December_2_1912.jpg/500px-President_Woodrow_Wilson_portrait_December_2_1912.jpg' },
    { name: 'gw_douglas_haig.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Douglas_Haig.jpg/500px-Douglas_Haig.jpg' },
    { name: 'gw_khudadad_khan.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Khudadad_Khan_VC.jpg/500px-Khudadad_Khan_VC.jpg' }
];

const agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

images.forEach(img => {
    console.log(`Downloading ${img.name}...`);
    try {
        execSync(`curl -sL -A "${agent}" -e "https://en.wikipedia.org/" -o public/images/${img.name} "${img.url}"`);
    } catch (e) {
        console.error(`Failed to download ${img.name}`);
    }
});
console.log('Done downloading via curl with full UA and Referer.');
