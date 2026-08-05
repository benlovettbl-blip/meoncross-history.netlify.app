const fs = require('fs');
const path = require('path');
const https = require('https');

const images = [
    { name: 'martin_luther_portrait.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Lucas_Cranach_d.%C3%84._-_Martin_Luther%2C_1528_%28Veste_Coburg%29.jpg/500px-Lucas_Cranach_d.%C3%84._-_Martin_Luther%2C_1528_%28Veste_Coburg%29.jpg' },
    { name: 'francis_drake.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Gheeraerts_Francis_Drake_1591.jpg/500px-Gheeraerts_Francis_Drake_1591.jpg' },
    { name: 'armada_portrait.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Elizabeth_I_%28Armada_Portrait%29.jpg/500px-Elizabeth_I_%28Armada_Portrait%29.jpg' }
];

images.forEach(img => {
    const dest = path.join(__dirname, 'public', 'images', img.name);
    const file = fs.createWriteStream(dest);
    https.get(img.url, { headers: { 'User-Agent': 'AntigravityAgent/1.0 (test@example.com)' } }, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${img.name}`);
        });
    }).on('error', (err) => {
        fs.unlink(dest, () => {});
        console.error(`Error downloading ${img.name}: ${err.message}`);
    });
});
