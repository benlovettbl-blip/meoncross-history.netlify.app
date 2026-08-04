import fs from 'fs';
import sharp from 'sharp';

async function createBanner() {
    try {
        console.log('Resizing and compositing...');
        // Resize both to 500x500, cover mode
        const left = await sharp('public/images/img1.jpg').resize(500, 500, { fit: 'cover' }).toBuffer();
        const right = await sharp('public/images/img2.jpg').resize(500, 500, { fit: 'cover' }).toBuffer();
        
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
        .toFile('public/images/bg_great_war_part2.jpg');
        
        console.log('Banner created at public/images/bg_great_war_part2.jpg');
        
        // Clean up
        fs.unlinkSync('public/images/img1.jpg');
        fs.unlinkSync('public/images/img2.jpg');
    } catch (e) {
        console.error(e);
    }
}

createBanner();
