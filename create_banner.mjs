import fs from 'fs';
import https from 'https';
import sharp from 'sharp';

const url1 = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/DC-1914-27-d-Sarajevo-cropped.jpg/500px-DC-1914-27-d-Sarajevo-cropped.jpg";
const url2 = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Treaty_of_Versailles%2C_English_version.jpg/500px-Treaty_of_Versailles%2C_English_version.jpg";

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        const request = https.get(url, {
            headers: {
                'User-Agent': 'MeoncrossHistory/1.0 (meoncross@example.com)'
            }
        }, function(response) {
            response.pipe(file);
            file.on('finish', function() {
                file.close(resolve);  // close() is async, call cb after close completes.
            });
        }).on('error', function(err) { // Handle errors
            fs.unlink(dest, () => {}); // Delete the file async. (But we don't check the result)
            reject(err);
        });
    });
}

async function createBanner() {
    try {
        console.log('Downloading image 1...');
        await download(url1, 'img1.jpg');
        console.log('Downloading image 2...');
        await download(url2, 'img2.jpg');
        
        console.log('Resizing and compositing...');
        // Resize both to 500x500, cover mode
        const left = await sharp('img1.jpg').resize(500, 500, { fit: 'cover' }).toBuffer();
        const right = await sharp('img2.jpg').resize(500, 500, { fit: 'cover' }).toBuffer();
        
        // Create an empty canvas 1000x500
        await sharp({
            create: {
                width: 1000,
                height: 500,
                channels: 3,
                background: { r: 0, g: 0, b: 0 }
            }
        })
        .composite([
            { input: left, left: 0, top: 0 },
            { input: right, left: 500, top: 0 }
        ])
        .toFile('public/images/great_war_part2_banner.jpg');
        
        console.log('Banner created at public/images/great_war_part2_banner.jpg');
        
        // Clean up
        fs.unlinkSync('img1.jpg');
        fs.unlinkSync('img2.jpg');
    } catch (e) {
        console.error(e);
    }
}

createBanner();
