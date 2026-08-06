const sharp = require('sharp');

async function createCollage() {
    const width = 1200;
    const height = 800;
    const halfW = 600;
    const halfH = 400;
    
    try {
        const img1 = await sharp('public/images/global_britannia.jpg').resize(halfW, halfH).toBuffer();
        const img2 = await sharp('public/images/global_canton.jpg').resize(halfW, halfH).toBuffer();
        const img3 = await sharp('public/images/global_thames.jpg').resize(halfW, halfH).toBuffer();
        const img4 = await sharp('public/images/global_mercator.jpg').resize(halfW, halfH).toBuffer();
        
        await sharp({
            create: { width, height, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } }
        })
        .composite([
            { input: img1, top: 0, left: 0 },
            { input: img2, top: 0, left: halfW },
            { input: img3, top: halfH, left: 0 },
            { input: img4, top: halfH, left: halfW }
        ])
        .toFile('public/images/global_cover_collage.jpg');
        console.log("Collage created!");
    } catch (e) {
        console.error(e);
    }
}
createCollage();
