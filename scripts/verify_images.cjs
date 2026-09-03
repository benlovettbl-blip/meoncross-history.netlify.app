const fs = require('fs');
const path = require('path');
const ROOT_DIR = path.join(__dirname, "..");

const imagesDir = path.join(ROOT_DIR, 'public', 'images');

function verifyImages() {
    console.log('🔍 Verifying image integrity in public/images/ ...');
    let errors = 0;
    
    if (!fs.existsSync(imagesDir)) {
        console.log('No images directory found.');
        return;
    }

    const files = fs.readdirSync(imagesDir);
    
    for (const file of files) {
        const filePath = path.join(imagesDir, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isDirectory()) continue;
        
        // Check 1: File size too small (under 3KB is suspicious for a history photograph)
        if (stats.size < 3000) {
            // Let's check if it's an HTML error page masquerading as an image
            const content = fs.readFileSync(filePath, 'utf8');
            if (content.includes('<!DOCTYPE html>') || content.includes('<html') || content.includes('Wikimedia Error') || content.includes('Please set a user-agent')) {
                console.error(`❌ CRITICAL ERROR: ${file} is a broken HTML error page (Size: ${stats.size} bytes).`);
                errors++;
            } else {
                console.warn(`⚠️ WARNING: ${file} is unusually small (${stats.size} bytes). Please verify manually.`);
            }
        }
    }
    
    if (errors > 0) {
        console.error(`\n🚨 Image verification failed! Found ${errors} broken image(s). Fix them before deploying.`);
        process.exit(1);
    } else {
        console.log('✅ All images verified successfully. No broken HTML masquerading as images found.');
    }
}

verifyImages();
