const fs = require('fs');
const path = require('path');

// Helper to parse CLI arguments
const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('Usage: node fetch_wikimedia_images.js "<search term>" "<output_filename.jpg>"');
    console.error('Example: node fetch_wikimedia_images.js "Aktion T4 poster" "t4_poster.jpg"');
    process.exit(1);
}

const searchTerm = args[0];
const outputFilename = args[1];
const outputDir = path.join(__dirname, 'public', 'images');
const outputPath = path.join(outputDir, outputFilename);

const USER_AGENT = 'MeoncrossHistoryApp/1.0 (https://meoncross-history.netlify.app; contact@meoncross.school)';

async function fetchJSON(url) {
    const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (!response.ok) throw new Error(`API returned ${response.status} ${response.statusText}`);
    return await response.json();
}

async function downloadImage(url, filepath) {
    // The native fetch API automatically follows HTTP redirects (301, 302)
    // which was the primary reason the older https.get method failed with 403s/429s.
    const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (!response.ok) {
        throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
    }
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));
}

async function run() {
    try {
        console.log(`Searching Wikimedia API for: "${searchTerm}"...`);
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchTerm)}&prop=pageimages&pithumbsize=500&format=json`;
        
        const data = await fetchJSON(searchUrl);
        const pages = data.query?.pages;
        
        if (!pages) {
            console.error(`❌ No images found for search term: "${searchTerm}"`);
            process.exit(1);
        }

        // Find the page with the lowest index that actually has a thumbnail
        const pageWithThumb = Object.values(pages)
            .filter(p => p.thumbnail)
            .sort((a, b) => (a.index || 99) - (b.index || 99))[0];
        
        if (!pageWithThumb) {
            console.error(`❌ No image thumbnails found for search term: "${searchTerm}"`);
            process.exit(1);
        }

        const imageUrl = pageWithThumb.thumbnail.source;
        console.log(`Found image: ${imageUrl}`);
        
        // Ensure the public/images directory exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        console.log(`Downloading to: ${outputPath}...`);
        await downloadImage(imageUrl, outputPath);
        
        console.log(`✅ Successfully downloaded image to ${outputPath}`);
    } catch (err) {
        console.error('❌ Error:', err.message);
    }
}

run();
